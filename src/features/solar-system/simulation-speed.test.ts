import { describe, expect, it } from "vitest";
import {
  DEFAULT_SIMULATION_SPEED,
  DEFAULT_SIMULATION_SPEED_INDEX,
  MAX_SIMULATION_SPEED,
  MIN_SIMULATION_SPEED,
  SIMULATION_SPEED_OPTIONS,
  clampSimulationSpeed,
} from "./simulation-speed";

describe("solar-system simulation speed", () => {
  it("offers slow, normal, and fast visual simulation speeds", () => {
    expect(MIN_SIMULATION_SPEED).toBe(0.1);
    expect(SIMULATION_SPEED_OPTIONS[DEFAULT_SIMULATION_SPEED_INDEX]).toBe(DEFAULT_SIMULATION_SPEED);
    expect(MAX_SIMULATION_SPEED).toBe(10);
  });

  it("clamps invalid or unsafe multipliers", () => {
    expect(clampSimulationSpeed(0)).toBe(MIN_SIMULATION_SPEED);
    expect(clampSimulationSpeed(24)).toBe(MAX_SIMULATION_SPEED);
    expect(clampSimulationSpeed(Number.NaN)).toBe(DEFAULT_SIMULATION_SPEED);
    expect(clampSimulationSpeed(5)).toBe(5);
  });
});
