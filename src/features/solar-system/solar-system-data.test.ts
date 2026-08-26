import { describe, expect, it } from "vitest";
import { PLANETS, PLANET_IDS } from "./solar-system-data";

describe("solar-system data", () => {
  it("defines the eight planets once and in order", () => {
    expect(PLANETS.map((planet) => planet.id)).toEqual(PLANET_IDS);
    expect(new Set(PLANETS.map((planet) => planet.id)).size).toBe(8);
    expect(PLANETS.map((planet) => planet.order)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it("keeps display facts separate from visual simulation values", () => {
    for (const planet of PLANETS) {
      expect(planet.radiusKm).toBeGreaterThan(0);
      expect(planet.distanceMillionKm).toBeGreaterThan(0);
      expect(planet.visual.radius).toBeGreaterThan(0);
      expect(planet.visual.orbitRadius).toBeGreaterThan(0);
      expect(planet.visual.camera.distance).toBeGreaterThan(planet.visual.radius * 2);
      expect(planet.sourceUrl).toMatch(/^https:\/\/science\.nasa\.gov\//);
      expect(planet.visual).not.toHaveProperty("orbitSpeed");
      expect(planet.visual).not.toHaveProperty("rotationSpeed");
      expect(planet.visual).not.toHaveProperty("startAngle");
      expect(planet.visual).not.toHaveProperty("axialTilt");
    }
  });
});
