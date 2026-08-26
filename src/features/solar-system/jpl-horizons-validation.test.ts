import {
  Body,
  GeoMoon,
  HelioVector,
  RotateVector,
  Rotation_EQJ_ECL,
  type Vector,
} from "astronomy-engine";
import { describe, expect, it } from "vitest";
import { AstronomyEngineProvider } from "./astronomy-engine-provider";
import type { PhysicalVectorAU } from "./ephemeris-provider";
import {
  JPL_HORIZONS_FIXTURES,
  JPL_HORIZONS_QUERY,
  JPL_VALIDATION_EPOCHS,
  buildHorizonsFixtureUrl,
} from "./jpl-horizons-fixtures";
import type { PlanetId } from "./solar-system-data";

// These thresholds are model-level regression bounds, not navigation claims.
// They are tight enough to reject an hour/day shift, wrong origin, frame, axes,
// or AU/km error while leaving headroom for independent analytic-vs-JPL models.
const PLANET_ANGLE_TOLERANCE_DEGREES = 0.01;
const PLANET_RADIUS_TOLERANCE_PERCENT = 0.01;
const MOON_ANGLE_TOLERANCE_DEGREES = 0.015;
const MOON_RADIUS_TOLERANCE_PERCENT = 0.01;

const BODY_BY_PLANET_ID: Readonly<Record<PlanetId, Body>> = {
  mercury: Body.Mercury,
  venus: Body.Venus,
  earth: Body.Earth,
  mars: Body.Mars,
  jupiter: Body.Jupiter,
  saturn: Body.Saturn,
  uranus: Body.Uranus,
  neptune: Body.Neptune,
};

function coordinates(vector: Vector): PhysicalVectorAU {
  return { x: vector.x, y: vector.y, z: vector.z };
}

function rawEqjVector(body: PlanetId | "moon", timestamp: string): Vector {
  const date = new Date(timestamp);
  return body === "moon" ? GeoMoon(date) : HelioVector(BODY_BY_PLANET_ID[body], date);
}

function rawEqj(body: PlanetId | "moon", timestamp: string): PhysicalVectorAU {
  return coordinates(rawEqjVector(body, timestamp));
}

function magnitude(vector: PhysicalVectorAU): number {
  return Math.hypot(vector.x, vector.y, vector.z);
}

function angularSeparationDegrees(left: PhysicalVectorAU, right: PhysicalVectorAU): number {
  const crossX = left.y * right.z - left.z * right.y;
  const crossY = left.z * right.x - left.x * right.z;
  const crossZ = left.x * right.y - left.y * right.x;
  const crossMagnitude = Math.hypot(crossX, crossY, crossZ);
  const dot = left.x * right.x + left.y * right.y + left.z * right.z;
  return Math.atan2(crossMagnitude, dot) * (180 / Math.PI);
}

describe("Astronomy Engine against fixed NASA/JPL Horizons vectors", () => {
  it("compares raw EQJ physical vectors at compatible dynamical instants", () => {
    const measurements: Array<{
      body: string;
      timestamp: string;
      angleDegrees: number;
      radiusErrorPercent: number;
    }> = [];

    for (const fixture of JPL_HORIZONS_FIXTURES) {
      expect(fixture.center).toBe(fixture.body === "moon" ? "500@399" : "500@10");

      for (const vector of fixture.vectors) {
        const { userTimestampUtc: timestamp } = JPL_VALIDATION_EPOCHS[vector.epoch];
        const actual = rawEqj(fixture.body, timestamp);
        const angleDegrees = angularSeparationDegrees(actual, vector.positionAuEqj);
        const radiusErrorPercent = Math.abs(
          (magnitude(actual) - magnitude(vector.positionAuEqj)) / magnitude(vector.positionAuEqj),
        ) * 100;
        const isMoon = fixture.body === "moon";

        measurements.push({ body: fixture.body, timestamp, angleDegrees, radiusErrorPercent });
        expect(angleDegrees, `${fixture.body} EQJ direction at ${timestamp}`).toBeLessThanOrEqual(
          isMoon ? MOON_ANGLE_TOLERANCE_DEGREES : PLANET_ANGLE_TOLERANCE_DEGREES,
        );
        expect(radiusErrorPercent, `${fixture.body} radius at ${timestamp}`).toBeLessThanOrEqual(
          isMoon ? MOON_RADIUS_TOLERANCE_PERCENT : PLANET_RADIUS_TOLERANCE_PERCENT,
        );
      }
    }

    console.info("JPL_HORIZONS_EQJ_VALIDATION", JSON.stringify(measurements));
  });

  it("keeps Horizons metadata reproducible and explicitly geometric", () => {
    expect(JPL_HORIZONS_QUERY).toMatchObject({
      ephemerisType: "VECTORS",
      referencePlane: "FRAME",
      referenceSystem: "ICRF",
      outputUnits: "AU-D",
      vectorCorrections: "NONE",
      timeType: "TDB",
      timeListType: "JD",
    });

    for (const fixture of JPL_HORIZONS_FIXTURES) {
      const url = new URL(buildHorizonsFixtureUrl(fixture));
      expect(url.origin + url.pathname).toBe(JPL_HORIZONS_QUERY.endpoint);
      expect(url.searchParams.get("COMMAND")).toBe(`'${fixture.command}'`);
      expect(url.searchParams.get("CENTER")).toBe(`'${fixture.center}'`);
      expect(url.searchParams.get("TLIST")?.split(" ")).toHaveLength(fixture.vectors.length);
    }
  });

  it("keeps EQJ-to-ECL rotation in the provider separate from the JPL oracle", () => {
    const provider = new AstronomyEngineProvider();
    const rotation = Rotation_EQJ_ECL();

    for (const fixture of JPL_HORIZONS_FIXTURES) {
      const vector = fixture.vectors.find(({ epoch }) => epoch === "modern") ?? fixture.vectors[0];
      const { userTimestampUtc: timestamp } = JPL_VALIDATION_EPOCHS[vector.epoch];
      const expected = RotateVector(rotation, rawEqjVector(fixture.body, timestamp));
      const state = provider.getPhysicalState(Date.parse(timestamp));
      const actual = fixture.body === "moon"
        ? state.moon.geocentric
        : state.planets[fixture.body].heliocentric;

      expect(actual.x).toBeCloseTo(expected.x, 14);
      expect(actual.y).toBeCloseTo(expected.y, 14);
      expect(actual.z).toBeCloseTo(expected.z, 14);
    }
  });

  it("would reject a Moon origin or AU/km regression", () => {
    const timestamp = JPL_VALIDATION_EPOCHS.modern.userTimestampUtc;
    const moon = rawEqj("moon", timestamp);
    const earth = rawEqj("earth", timestamp);

    expect(magnitude(moon)).toBeGreaterThan(0.002);
    expect(magnitude(moon)).toBeLessThan(0.003);
    expect(magnitude(earth)).toBeGreaterThan(0.9);
    expect(magnitude(earth)).toBeLessThan(1.1);
  });
});
