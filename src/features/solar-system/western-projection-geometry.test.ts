import { readFileSync } from "node:fs";
import {
  MakeTime,
  RotateVector,
  Rotation_ECL_EQJ,
  Rotation_ECT_EQJ,
  Rotation_EQJ_ECL,
  Rotation_EQJ_ECT,
  Vector,
} from "astronomy-engine";
import { describe, expect, it } from "vitest";
import { calculateWesternAstrology } from "../../lib/western-astrology";
import { eclipticVectorToSceneAxes } from "./astronomical-display";
import {
  createWesternProjectionGeometry,
  projectTropicalLongitude,
  westernScenePositionAtRadius,
  WESTERN_PROJECTION_TRANSFORM_TOLERANCE,
} from "./western-projection-geometry";

const vietnamInput = {
  localDateTime: "1990-01-15T08:30:00",
  utcDateTime: "1990-01-15T01:30:00Z",
  latitude: 10.8231,
  longitude: 106.6297,
  timeZone: "Asia/Ho_Chi_Minh",
} as const;

const representativeLongitudes = [
  0,
  90,
  180,
  270,
  0.000001,
  359.999999,
] as const;

function shortestLongitudeDistance(first: number, second: number): number {
  const distance = Math.abs((((first - second) % 360) + 360) % 360);
  return Math.min(distance, 360 - distance);
}

function vectorLength(vector: Readonly<{ x: number; y: number; z: number }>) {
  return Math.hypot(vector.x, vector.y, vector.z);
}

function expectVectorWithinFrozenTolerance(
  actual: Readonly<{ x: number; y: number; z: number }>,
  expected: Readonly<{ x: number; y: number; z: number }>,
) {
  const tolerance = WESTERN_PROJECTION_TRANSFORM_TOLERANCE.vectorComponent;
  expect(Math.abs(actual.x - expected.x)).toBeLessThanOrEqual(tolerance);
  expect(Math.abs(actual.y - expected.y)).toBeLessThanOrEqual(tolerance);
  expect(Math.abs(actual.z - expected.z)).toBeLessThanOrEqual(tolerance);
}

describe("createWesternProjectionGeometry canonical identity", () => {
  it("preserves exact bodies, sign, house, ASC, MC, and ordered cusp identity", () => {
    const result = calculateWesternAstrology(vietnamInput);
    const snapshot = structuredClone(result);
    const projection = createWesternProjectionGeometry(result);
    const ascendant = result.angles.find(({ name }) => name === "ASC")!;
    const midheaven = result.angles.find(({ name }) => name === "MC")!;

    expect(projection.birthInstant).toEqual({
      source: "WesternAstrologyResult.julianDay",
      julianDay: result.julianDay,
      astronomyEngineUtDaysSinceJ2000: result.julianDay - 2_451_545,
    });
    expect(projection.bodies).toHaveLength(10);
    projection.bodies.forEach((body, index) => {
      expect(body.canonical).toBe(result.bodies[index]);
      expect(body.canonical.name).toBe(result.bodies[index].name);
      expect(body.canonical.longitude).toBe(result.bodies[index].longitude);
      expect(body.canonical.sign).toBe(result.bodies[index].sign);
      expect(body.canonical.house).toBe(result.bodies[index].house);
      expect(body.geometry.sourceLongitude).toBe(result.bodies[index].longitude);
    });

    expect(projection.angles.ascendant.canonical).toBe(ascendant);
    expect(projection.angles.ascendant.canonical.longitude).toBe(ascendant.longitude);
    expect(projection.angles.ascendant.geometry.sourceLongitude).toBe(ascendant.longitude);
    expect(projection.angles.midheaven.canonical).toBe(midheaven);
    expect(projection.angles.midheaven.canonical.longitude).toBe(midheaven.longitude);
    expect(projection.angles.midheaven.geometry.sourceLongitude).toBe(midheaven.longitude);

    expect(projection.houses).toHaveLength(12);
    projection.houses.forEach((house, index) => {
      expect(house.canonical).toBe(result.houses[index]);
      expect(house.canonical.house).toBe(index + 1);
      expect(house.canonical.longitude).toBe(result.houses[index].longitude);
      expect(house.geometry.sourceLongitude).toBe(result.houses[index].longitude);
    });
    expect(projection.houses.map(({ canonical }) => canonical.longitude)).toEqual(
      result.houses.map(({ longitude }) => longitude),
    );
    expect(result).toEqual(snapshot);
  });

  it("preserves the exact canonical aspect set and resolves only its endpoints", () => {
    const result = calculateWesternAstrology(vietnamInput);
    const projection = createWesternProjectionGeometry(result);

    expect(projection.aspects).toHaveLength(result.aspects.length);
    expect(projection.aspects.map(({ canonical }) => canonical)).toEqual(result.aspects);
    expect(projection.aspects.map(({ canonical }) => canonical.id)).toEqual(
      result.aspects.map(({ id }) => id),
    );

    projection.aspects.forEach((aspect, index) => {
      const canonical = result.aspects[index];
      expect(aspect.canonical).toBe(canonical);
      expect(aspect.endpoints[0].role).toBe("body1");
      expect(aspect.endpoints[0].body).toBe(canonical.body1);
      expect(aspect.endpoints[1].role).toBe("body2");
      expect(aspect.endpoints[1].body).toBe(canonical.body2);

      for (const endpoint of aspect.endpoints) {
        const canonicalBody = result.bodies.find(({ name }) => name === endpoint.body)!;
        const bodyProjection = projection.bodies.find(
          ({ canonical: body }) => body.name === endpoint.body,
        )!;
        expect(endpoint.canonicalBody).toBe(canonicalBody);
        expect(endpoint.canonicalBody.longitude).toBe(canonicalBody.longitude);
        expect(endpoint.geometry).toBe(bodyProjection.geometry);
      }
    });
  });
});

describe("Western ECT to J2000 scene transformation", () => {
  it.each(representativeLongitudes)(
    "uses the official ECT -> EQJ -> ECL chain for %s degrees",
    (longitude) => {
      const result = calculateWesternAstrology(vietnamInput);
      const geometry = projectTropicalLongitude(longitude, result.julianDay);
      const time = MakeTime(result.julianDay - 2_451_545);
      const radians = longitude * (Math.PI / 180);
      const ect = new Vector(Math.cos(radians), Math.sin(radians), 0, time);
      const expectedEqj = RotateVector(Rotation_ECT_EQJ(time), ect);
      const expectedEcl = RotateVector(Rotation_EQJ_ECL(), expectedEqj);

      expect(geometry.sourceLongitude).toBe(longitude);
      expectVectorWithinFrozenTolerance(geometry.ectUnitDirection, ect);
      expectVectorWithinFrozenTolerance(geometry.eqjUnitDirection, expectedEqj);
      expectVectorWithinFrozenTolerance(geometry.eclJ2000UnitDirection, expectedEcl);
      expect(geometry.sceneUnitDirection).toEqual(
        eclipticVectorToSceneAxes(geometry.eclJ2000UnitDirection),
      );
      expect(Math.abs(vectorLength(geometry.sceneUnitDirection) - 1)).toBeLessThanOrEqual(
        WESTERN_PROJECTION_TRANSFORM_TOLERANCE.vectorComponent,
      );
    },
  );

  it.each(representativeLongitudes)(
    "round-trips %s degrees within the frozen numerical tolerance",
    (longitude) => {
      const result = calculateWesternAstrology(vietnamInput);
      const geometry = projectTropicalLongitude(longitude, result.julianDay);
      const time = MakeTime(result.julianDay - 2_451_545);
      const ecl = new Vector(
        geometry.eclJ2000UnitDirection.x,
        geometry.eclJ2000UnitDirection.y,
        geometry.eclJ2000UnitDirection.z,
        time,
      );
      const eqj = RotateVector(Rotation_ECL_EQJ(), ecl);
      const restoredEct = RotateVector(Rotation_EQJ_ECT(time), eqj);
      const restoredLongitude =
        ((Math.atan2(restoredEct.y, restoredEct.x) * 180) / Math.PI + 360) % 360;

      expect(shortestLongitudeDistance(restoredLongitude, longitude)).toBeLessThanOrEqual(
        WESTERN_PROJECTION_TRANSFORM_TOLERANCE.angularDegrees,
      );
      expect(Math.abs(restoredEct.z)).toBeLessThanOrEqual(
        WESTERN_PROJECTION_TRANSFORM_TOLERANCE.vectorComponent,
      );
    },
  );

  it("keeps direction independent from presentation radius", () => {
    const result = calculateWesternAstrology(vietnamInput);
    const geometry = projectTropicalLongitude(123.456789, result.julianDay);
    const directionSnapshot = { ...geometry.sceneUnitDirection };

    for (const radius of [0.25, 1, 17, 1_000]) {
      const position = westernScenePositionAtRadius(
        geometry.sceneUnitDirection,
        radius,
      );
      expect(vectorLength(position)).toBeCloseTo(radius, 12);
      expectVectorWithinFrozenTolerance(
        {
          x: position.x / radius,
          y: position.y / radius,
          z: position.z / radius,
        },
        geometry.sceneUnitDirection,
      );
    }
    expect(geometry.sceneUnitDirection).toEqual(directionSnapshot);
  });

  it("uses the canonical birth Julian day as a real transformation input", () => {
    const earlier = calculateWesternAstrology(vietnamInput);
    const later = calculateWesternAstrology({
      ...vietnamInput,
      localDateTime: "2100-01-15T08:30:00",
      utcDateTime: "2100-01-15T01:30:00Z",
    });
    const earlierDirection = projectTropicalLongitude(0, earlier.julianDay);
    const laterDirection = projectTropicalLongitude(0, later.julianDay);

    expect(earlier.julianDay).not.toBe(later.julianDay);
    expect(earlierDirection.sourceLongitude).toBe(laterDirection.sourceLongitude);
    expect(earlierDirection.eclJ2000UnitDirection).not.toEqual(
      laterDirection.eclJ2000UnitDirection,
    );
  });

  it("has no Solar compressed-mesh, Observer, or Western recalculation dependency", () => {
    const source = readFileSync(
      new URL("./western-projection-geometry.ts", import.meta.url),
      "utf8",
    );

    expect(source).not.toContain("physicalVectorToScenePosition");
    expect(source).not.toContain("solar-system-renderer");
    expect(source).not.toContain("observer-sky-projection");
    expect(source).not.toContain("calculateMajorAspects");
    expect(source).not.toMatch(/\bGeoVector\b/);
    expect(source).not.toContain("simulationTime");
  });
});
