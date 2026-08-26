import { describe, expect, it } from "vitest";
import {
  MAX_SIMULATION_TIMESTAMP_MS,
  MIN_SIMULATION_TIMESTAMP_MS,
  SIMULATED_DAY_MS,
  SimulationClock,
  cameraTransitionProgress,
  formatSimulationDateTime,
  parseSimulationDateTime,
} from "./simulation-time";

describe("SimulationClock", () => {
  it("freezes on pause and resumes from the same timestamp at the retained speed", () => {
    const initial = Date.parse("2026-08-25T00:00:00.000Z");
    const clock = new SimulationClock(initial);
    clock.setSpeed(5);
    clock.setPaused(true);
    expect(clock.advance(3)).toBe(initial);

    clock.setPaused(false);
    expect(clock.advance(1)).toBe(initial + 5 * SIMULATED_DAY_MS);
    expect(clock.getSpeed()).toBe(5);
  });

  it("advances 10x ten times as far as 1x", () => {
    const initial = Date.parse("2026-08-25T00:00:00.000Z");
    const normal = new SimulationClock(initial);
    const fast = new SimulationClock(initial);
    normal.setSpeed(1);
    fast.setSpeed(10);

    expect(fast.advance(0.5) - initial).toBe(10 * (normal.advance(0.5) - initial));
  });

  it("does not accumulate material drift across frame-sized advances", () => {
    const initial = Date.parse("2026-08-25T00:00:00.000Z");
    const clock = new SimulationClock(initial);
    const frameSeconds = 1 / 59.94;
    for (let frame = 0; frame < 600; frame += 1) {
      clock.advance(frameSeconds);
    }

    const expected = initial + 600 * frameSeconds * SIMULATED_DAY_MS;
    expect(Math.abs(clock.getTimestamp() - expected)).toBeLessThan(600);
  });

  it("sets Now close to actual system UTC time", () => {
    const clock = new SimulationClock(MIN_SIMULATION_TIMESTAMP_MS);
    const before = Date.now();
    const now = clock.setToNow();
    const after = Date.now();

    expect(now).toBeGreaterThanOrEqual(before);
    expect(now).toBeLessThanOrEqual(after);
  });

  it("clamps the product-supported range", () => {
    const clock = new SimulationClock(MIN_SIMULATION_TIMESTAMP_MS - SIMULATED_DAY_MS);
    expect(clock.getTimestamp()).toBe(MIN_SIMULATION_TIMESTAMP_MS);
    clock.setTimestamp(MAX_SIMULATION_TIMESTAMP_MS + SIMULATED_DAY_MS);
    expect(clock.getTimestamp()).toBe(MAX_SIMULATION_TIMESTAMP_MS);
  });
});

describe("simulation date/time conversion", () => {
  it("formats a frame-derived fractional epoch without throwing", () => {
    expect(formatSimulationDateTime(
      Date.parse("2026-08-25T00:30:00.000Z") + 0.75,
      "Asia/Ho_Chi_Minh",
    )).toEqual({ date: "2026-08-25", time: "07:30" });
  });

  it("round-trips local input through an IANA timezone", () => {
    const timestamp = parseSimulationDateTime(
      { date: "2026-08-25", time: "07:30" },
      "Asia/Ho_Chi_Minh",
    );
    expect(timestamp).toBe(Date.parse("2026-08-25T00:30:00.000Z"));
    expect(formatSimulationDateTime(timestamp!, "Asia/Ho_Chi_Minh")).toEqual({
      date: "2026-08-25",
      time: "07:30",
    });
  });

  it("keeps camera progress independent from simulation speed", () => {
    expect(cameraTransitionProgress(1_000, 1_500, 1_000)).toBe(0.5);
    expect(cameraTransitionProgress(1_000, 2_500, 1_000)).toBe(1);
  });
});
