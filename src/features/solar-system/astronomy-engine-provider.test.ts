import { describe, expect, it } from "vitest";
import { AstronomyEngineProvider } from "./astronomy-engine-provider";

const provider = new AstronomyEngineProvider();

describe("AstronomyEngineProvider", () => {
  it("returns deterministic heliocentric state for a fixed UTC timestamp", () => {
    const timestamp = Date.parse("2026-08-25T00:00:00.000Z");
    const first = provider.getPhysicalState(timestamp);
    const second = provider.getPhysicalState(timestamp);

    expect(first).toEqual(second);
    expect(first.planets.earth.heliocentric).toMatchObject({
      x: expect.any(Number),
      y: expect.any(Number),
      z: expect.any(Number),
    });
    expect(first.planets.mars.heliocentric).not.toEqual(first.planets.earth.heliocentric);
  });

  it("changes planetary state when the date changes", () => {
    const first = provider.getPhysicalState(Date.parse("2026-08-25T00:00:00.000Z"));
    const second = provider.getPhysicalState(Date.parse("2026-09-25T00:00:00.000Z"));

    expect(second.planets.mars.heliocentric).not.toEqual(first.planets.mars.heliocentric);
  });

  it("constructs Moon heliocentric state from Earth plus the Earth-relative Moon vector", () => {
    const state = provider.getPhysicalState(Date.parse("2000-01-01T12:00:00.000Z"));
    const expected = {
      x: state.planets.earth.heliocentric.x + state.moon.geocentric.x,
      y: state.planets.earth.heliocentric.y + state.moon.geocentric.y,
      z: state.planets.earth.heliocentric.z + state.moon.geocentric.z,
    };

    expect(state.moon.heliocentric.x).toBeCloseTo(expected.x, 14);
    expect(state.moon.heliocentric.y).toBeCloseTo(expected.y, 14);
    expect(state.moon.heliocentric.z).toBeCloseTo(expected.z, 14);
  });
});
