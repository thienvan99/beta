import { describe, expect, it } from "vitest";
import {
  MAX_SIMULATION_TIMESTAMP_MS,
  MIN_SIMULATION_TIMESTAMP_MS,
} from "../features/solar-system/simulation-time";
import { evaluateObserverCapability } from "../features/solar-system/observer-capability";
import type { BirthData } from "./birth-data";
import { calculateBirthTime } from "./birth-time";
import {
  createObservationContext,
  type ObservationContext,
  type ObservationContextInput,
} from "./observation-context";

const vietnamInput = {
  birthDate: "1990-01-15",
  hour: "8",
  minute: "30",
  latitude: "10.8231",
  longitude: "106.6297",
  timezone: "Asia/Ho_Chi_Minh",
} satisfies ObservationContextInput;

function contextAt(timestampUtcMs: number): ObservationContext {
  const instantUtc = new Date(timestampUtcMs).toISOString();
  return {
    instantUtc,
    timestampUtcMs,
    latitude: 0,
    longitude: 0,
    elevationMeters: 0,
    timezone: {
      ianaName: "America/Cambridge_Bay",
      localDateTime: instantUtc.slice(0, 19),
      utcOffset: "+00:00",
      provenance: "birth-time-pipeline",
    },
  };
}

describe("createObservationContext", () => {
  it("creates the canonical Vietnam context from the existing birth-time pipeline", () => {
    const context = createObservationContext(vietnamInput);

    expect(context).toEqual({
      instantUtc: "1990-01-15T01:30:00Z",
      timestampUtcMs: Date.parse("1990-01-15T01:30:00Z"),
      latitude: 10.8231,
      longitude: 106.6297,
      elevationMeters: 0,
      timezone: {
        ianaName: "Asia/Ho_Chi_Minh",
        localDateTime: "1990-01-15T08:30:00",
        utcOffset: "+07:00",
        provenance: "birth-time-pipeline",
      },
    });
    expect(Date.parse(context!.instantUtc)).toBe(context!.timestampUtcMs);
    expect(evaluateObserverCapability(context!)).toEqual({ supported: true });
  });

  it("inherits the existing DST resolution instead of resolving time independently", () => {
    const input: ObservationContextInput = {
      ...vietnamInput,
      birthDate: "2024-07-15",
      hour: "12",
      minute: "0",
      timezone: "Europe/London",
    };
    const resolved = calculateBirthTime({
      birthDate: input.birthDate,
      hour: input.hour,
      minute: input.minute,
      timeZone: input.timezone,
    });
    const context = createObservationContext(input);

    expect(resolved).toMatchObject({
      utcOffset: "+01:00",
      utcDateTime: "2024-07-15T11:00:00Z",
    });
    expect(context).toMatchObject({
      instantUtc: resolved!.utcDateTime,
      timestampUtcMs: Date.parse(resolved!.utcDateTime),
      timezone: {
        localDateTime: resolved!.localDateTime,
        utcOffset: resolved!.utcOffset,
      },
    });
  });

  it.each([
    ["skipped", "2024-03-10", "2", "30", "2024-03-10T07:30:00Z", "-04:00"],
    ["ambiguous", "2024-11-03", "1", "30", "2024-11-03T05:30:00Z", "-04:00"],
  ])(
    "inherits compatible disambiguation for %s local time",
    (_label, birthDate, hour, minute, instantUtc, utcOffset) => {
      const context = createObservationContext({
        ...vietnamInput,
        birthDate,
        hour,
        minute,
        timezone: "America/New_York",
      });

      expect(context).toMatchObject({
        instantUtc,
        timestampUtcMs: Date.parse(instantUtc),
        timezone: { utcOffset },
      });
    },
  );

  it.each<[string, Partial<ObservationContextInput>]>([
    ["blank latitude", { latitude: "" }],
    ["non-finite latitude", { latitude: Number.NaN }],
    ["latitude above range", { latitude: 90.0001 }],
    ["longitude below range", { longitude: -180.0001 }],
    ["invalid timezone", { timezone: "Mars/Olympus" }],
    ["invalid hour", { hour: "24" }],
    ["invalid calendar date", { birthDate: "2024-02-30" }],
  ])("returns null for %s", (_label, override) => {
    expect(createObservationContext({ ...vietnamInput, ...override })).toBeNull();
  });

  it("accepts validated BirthData directly while excluding gender from its contract and output", () => {
    const male: BirthData = { ...vietnamInput, gender: "male" };
    const female: BirthData = { ...vietnamInput, gender: "female" };
    const maleContext = createObservationContext(male);
    const femaleContext = createObservationContext(female);

    expect(maleContext).toEqual(femaleContext);
    expect(maleContext).not.toHaveProperty("gender");
  });

  it("builds headlessly without a browser or session storage", () => {
    expect(typeof window).toBe("undefined");
    expect(createObservationContext(vietnamInput)).not.toBeNull();
  });
});

describe("evaluateObserverCapability", () => {
  it.each([
    ["lower", MIN_SIMULATION_TIMESTAMP_MS],
    ["upper", MAX_SIMULATION_TIMESTAMP_MS],
  ])("includes the exact %s UTC boundary", (_label, timestampUtcMs) => {
    expect(evaluateObserverCapability(contextAt(timestampUtcMs))).toEqual({
      supported: true,
    });
  });

  it.each([
    ["before lower", MIN_SIMULATION_TIMESTAMP_MS - 1],
    ["after upper", MAX_SIMULATION_TIMESTAMP_MS + 1],
  ])("rejects %s without mutating the factual instant", (_label, timestampUtcMs) => {
    const context = contextAt(timestampUtcMs);
    const originalInstantUtc = context.instantUtc;
    const originalTimestampUtcMs = context.timestampUtcMs;

    expect(evaluateObserverCapability(context)).toEqual({
      supported: false,
      reason: "outside-supported-range",
    });
    expect(context.instantUtc).toBe(originalInstantUtc);
    expect(context.timestampUtcMs).toBe(originalTimestampUtcMs);
  });

  it("checks the resolved UTC instant instead of the local calendar date", () => {
    const context = createObservationContext({
      birthDate: "1600-01-01",
      hour: "0",
      minute: "0",
      latitude: 10.8231,
      longitude: 106.6297,
      timezone: "Asia/Ho_Chi_Minh",
    });
    const resolvedByExistingPipeline = calculateBirthTime({
      birthDate: "1600-01-01",
      hour: "0",
      minute: "0",
      timeZone: "Asia/Ho_Chi_Minh",
    });

    expect(context).not.toBeNull();
    expect(context!.instantUtc).toBe(resolvedByExistingPipeline!.utcDateTime);
    expect(context!.timestampUtcMs).toBe(Date.parse(resolvedByExistingPipeline!.utcDateTime));
    expect(context!.timestampUtcMs).toBeLessThan(MIN_SIMULATION_TIMESTAMP_MS);
    expect(evaluateObserverCapability(context!)).toEqual({
      supported: false,
      reason: "outside-supported-range",
    });
    expect(context!.instantUtc).toBe(resolvedByExistingPipeline!.utcDateTime);
  });
});
