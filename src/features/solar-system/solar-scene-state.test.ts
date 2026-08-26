import { describe, expect, it } from "vitest";
import type { ObservationContext } from "../../lib/observation-context";
import {
  MAX_SIMULATION_TIMESTAMP_MS,
  MIN_SIMULATION_TIMESTAMP_MS,
  SimulationClock,
} from "./simulation-time";
import {
  advanceSolarSceneClock,
  beginBirthSnapshot,
  createPlanetFocusState,
  handoffBirthEarthToObserver,
  isBirthSnapshotState,
  returnToSolarOverview,
  setSolarScenePaused,
  setSolarSceneTimestamp,
  setSolarSceneToNow,
  type BirthSnapshotClock,
  type SolarSceneClock,
  type SolarSceneState,
} from "./solar-scene-state";

function contextAt(timestampUtcMs: number): ObservationContext {
  return {
    instantUtc: new Date(timestampUtcMs).toISOString(),
    timestampUtcMs,
    latitude: 10.8231,
    longitude: 106.6297,
    elevationMeters: 0,
    timezone: {
      ianaName: "Asia/Ho_Chi_Minh",
      localDateTime: "1990-01-15T08:30:00+07:00[Asia/Ho_Chi_Minh]",
      utcOffset: "+07:00",
      provenance: "birth-time-pipeline",
    },
  };
}

describe("Solar → Earth → Observer semantic state", () => {
  it("classifies only natal semantic modes as frozen birth snapshots", () => {
    const context = contextAt(Date.parse("1990-01-15T01:30:00.000Z"));
    const cases: readonly [SolarSceneState, boolean][] = [
      [{ mode: "birth-earth", context }, true],
      [{ mode: "birth-observer", context }, true],
      [{ mode: "western-projection", context }, true],
      [{ mode: "solar-overview" }, false],
      [{ mode: "planet-focus", planetId: "earth" }, false],
    ];
    for (const [state, expected] of cases) {
      expect(isBirthSnapshotState(state)).toBe(expected);
    }
  });

  it("keeps normal Earth focus independent from birth-Earth mode", () => {
    expect(createPlanetFocusState("earth")).toEqual({ mode: "planet-focus", planetId: "earth" });
    expect(returnToSolarOverview()).toEqual({ mode: "solar-overview" });
  });

  it("atomically pauses and sets the exact supported birth instant", () => {
    const context = contextAt(Date.parse("1990-01-15T01:30:00.000Z"));
    const clock = new SimulationClock(Date.parse("2026-08-25T00:00:00.000Z"));
    const result = beginBirthSnapshot(context, clock);

    expect(result).toEqual({ ok: true, state: { mode: "birth-earth", context } });
    expect(clock.isPaused()).toBe(true);
    expect(clock.getTimestamp()).toBe(context.timestampUtcMs);
    expect(clock.advance(86_400)).toBe(context.timestampUtcMs);
  });

  it("blocks every drift path after entering a supported birth snapshot", () => {
    const context = contextAt(Date.parse("1990-01-15T01:30:00.000Z"));
    const clock = new SimulationClock(Date.parse("2026-08-25T00:00:00.000Z"));
    const result = beginBirthSnapshot(context, clock);
    if (!result.ok) {
      throw new Error(`Expected supported birth snapshot, received ${result.reason}.`);
    }

    expect(setSolarScenePaused(result.state, clock, false)).toBe(false);
    expect(setSolarSceneTimestamp(
      result.state,
      clock,
      Date.parse("2000-01-01T12:00:00.000Z"),
    )).toBe(false);
    expect(setSolarSceneToNow(result.state, clock)).toBe(false);
    expect(advanceSolarSceneClock(result.state, clock, 86_400)).toBe(false);
    expect(clock.isPaused()).toBe(true);
    expect(clock.getTimestamp()).toBe(context.timestampUtcMs);

    expect(setSolarScenePaused(result.state, clock, true)).toBe(true);
    clock.setPaused(false);
    expect(advanceSolarSceneClock(result.state, clock, 86_400)).toBe(false);
    expect(clock.getTimestamp()).toBe(context.timestampUtcMs);
  });

  it.each<SolarSceneState>([
    { mode: "solar-overview" },
    { mode: "planet-focus", planetId: "earth" },
  ])("keeps generic Solar controls available in $mode", (state) => {
    const calls: string[] = [];
    const clock: SolarSceneClock = {
      getTimestamp: () => 0,
      isPaused: () => true,
      setPaused: (paused) => { calls.push(`paused:${paused}`); },
      setTimestamp: (timestamp) => { calls.push(`time:${timestamp}`); return timestamp; },
      setToNow: () => { calls.push("now"); return 1; },
      advance: (delta) => { calls.push(`advance:${delta}`); return 2; },
    };

    expect(setSolarScenePaused(state, clock, false)).toBe(true);
    expect(setSolarSceneTimestamp(state, clock, 123)).toBe(true);
    expect(setSolarSceneToNow(state, clock)).toBe(true);
    expect(advanceSolarSceneClock(state, clock, 0.5)).toBe(true);
    expect(calls).toEqual(["paused:false", "time:123", "now", "advance:0.5"]);
  });

  it.each([MIN_SIMULATION_TIMESTAMP_MS, MAX_SIMULATION_TIMESTAMP_MS])(
    "accepts the exact capability boundary %s",
    (timestamp) => {
      const clock = new SimulationClock(Date.parse("2000-01-01T12:00:00.000Z"));
      expect(beginBirthSnapshot(contextAt(timestamp), clock).ok).toBe(true);
      expect(clock.getTimestamp()).toBe(timestamp);
      expect(clock.isPaused()).toBe(true);
    },
  );

  it.each([MIN_SIMULATION_TIMESTAMP_MS - 1, MAX_SIMULATION_TIMESTAMP_MS + 1])(
    "rejects unsupported time %s without touching clock state",
    (timestamp) => {
      const calls: string[] = [];
      const initialTimestamp = Date.parse("2000-01-01T12:00:00.000Z");
      const clock: BirthSnapshotClock = {
        getTimestamp: () => initialTimestamp,
        isPaused: () => false,
        setPaused: (paused) => { calls.push(`paused:${paused}`); },
        setTimestamp: (value) => { calls.push(`time:${value}`); return value; },
      };
      expect(beginBirthSnapshot(contextAt(timestamp), clock)).toEqual({
        ok: false,
        reason: "outside-supported-range",
      });
      expect(calls).toEqual([]);
    },
  );

  it("rejects invalid context without mutation and rolls back a non-exact clock", () => {
    const calls: string[] = [];
    const initialTimestamp = Date.parse("2000-01-01T12:00:00.000Z");
    let currentTimestamp = initialTimestamp;
    let paused = false;
    const clock: BirthSnapshotClock = {
      getTimestamp: () => currentTimestamp,
      isPaused: () => paused,
      setPaused: (value) => { paused = value; calls.push(`paused:${value}`); },
      setTimestamp: (value) => {
        currentTimestamp = value === initialTimestamp ? value : value - 1;
        calls.push(`time:${value}`);
        return currentTimestamp;
      },
    };
    const invalid = { ...contextAt(initialTimestamp), latitude: 91 };
    expect(beginBirthSnapshot(invalid, clock)).toEqual({
      ok: false,
      reason: "invalid-observation-context",
    });
    expect(calls).toEqual([]);

    const exactContext = contextAt(Date.parse("1990-01-15T01:30:00.000Z"));
    expect(beginBirthSnapshot(exactContext, clock)).toEqual({
      ok: false,
      reason: "clock-rejected-exact-time",
    });
    expect(currentTimestamp).toBe(initialTimestamp);
    expect(paused).toBe(false);
  });

  it("hands off only birth-Earth to birth-Observer with the same immutable context", () => {
    const context = Object.freeze(contextAt(Date.parse("1990-01-15T01:30:00.000Z")));
    const observer = handoffBirthEarthToObserver({ mode: "birth-earth", context });
    expect(observer).toEqual({ mode: "birth-observer", context });
    expect(observer?.context).toBe(context);
    expect(handoffBirthEarthToObserver({ mode: "planet-focus", planetId: "earth" })).toBeNull();
    expect(handoffBirthEarthToObserver({ mode: "western-projection", context })).toBeNull();
  });
});
