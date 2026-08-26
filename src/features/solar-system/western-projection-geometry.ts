import {
  MakeTime,
  RotateVector,
  Rotation_ECT_EQJ,
  Rotation_EQJ_ECL,
  Vector,
} from "astronomy-engine";
import type {
  AstrologicalAnglePosition,
  CelestialBodyPosition,
  HouseCuspPosition,
  MajorAspect,
  WesternAstrologyResult,
} from "../../lib/western-astrology";
import {
  eclipticVectorToSceneAxes,
  type SceneVector,
} from "./astronomical-display";

const JULIAN_DAY_J2000 = 2_451_545;

/**
 * Frozen before evaluating the P4 corpus. The angular tolerance covers only
 * IEEE-754 round-off through official rotation matrices and atan2 wrap; the
 * vector tolerance covers component/norm round-off. Neither applies to copied
 * canonical Western values, which are asserted with exact equality.
 */
export const WESTERN_PROJECTION_TRANSFORM_TOLERANCE = Object.freeze({
  angularDegrees: 1e-9,
  vectorComponent: 1e-12,
});

export const WESTERN_PROJECTION_FRAME = "ECLIPTIC_J2000" as const;

export type WesternProjectionVector = Readonly<{
  x: number;
  y: number;
  z: number;
}>;

export type WesternLongitudeGeometry = Readonly<{
  sourceLongitude: number;
  ectUnitDirection: WesternProjectionVector;
  eqjUnitDirection: WesternProjectionVector;
  eclJ2000UnitDirection: WesternProjectionVector;
  sceneUnitDirection: SceneVector;
}>;

export type WesternBodyProjection = Readonly<{
  canonical: CelestialBodyPosition;
  geometry: WesternLongitudeGeometry;
}>;

export type WesternAngleProjection = Readonly<{
  canonical: AstrologicalAnglePosition;
  geometry: WesternLongitudeGeometry;
}>;

export type WesternHouseCuspProjection = Readonly<{
  canonical: HouseCuspPosition;
  geometry: WesternLongitudeGeometry;
}>;

export type WesternAspectEndpoint = Readonly<{
  role: "body1" | "body2";
  body: string;
  canonicalBody: CelestialBodyPosition;
  geometry: WesternLongitudeGeometry;
}>;

export type WesternAspectProjection = Readonly<{
  canonical: MajorAspect;
  endpoints: readonly [WesternAspectEndpoint, WesternAspectEndpoint];
}>;

export type WesternProjectionGeometry = Readonly<{
  birthInstant: Readonly<{
    source: "WesternAstrologyResult.julianDay";
    julianDay: number;
    astronomyEngineUtDaysSinceJ2000: number;
  }>;
  frame: typeof WESTERN_PROJECTION_FRAME;
  bodies: readonly WesternBodyProjection[];
  angles: Readonly<{
    ascendant: WesternAngleProjection;
    midheaven: WesternAngleProjection;
  }>;
  houses: readonly WesternHouseCuspProjection[];
  aspects: readonly WesternAspectProjection[];
}>;

function toPlainVector(vector: Vector): WesternProjectionVector {
  return { x: vector.x, y: vector.y, z: vector.z };
}

function requireFiniteLongitude(longitude: number): void {
  if (!Number.isFinite(longitude)) {
    throw new RangeError("Canonical Western longitude must be finite.");
  }
}

/**
 * Derives a scene direction from a canonical Tropical ECT longitude at the
 * canonical Western result's birth Julian day. It does not normalize, replace,
 * or otherwise mutate the source longitude.
 */
export function projectTropicalLongitude(
  longitude: number,
  birthJulianDay: number,
): WesternLongitudeGeometry {
  requireFiniteLongitude(longitude);
  if (!Number.isFinite(birthJulianDay)) {
    throw new RangeError("Canonical Western birth Julian day must be finite.");
  }

  const time = MakeTime(birthJulianDay - JULIAN_DAY_J2000);
  const radians = longitude * (Math.PI / 180);
  const ect = new Vector(Math.cos(radians), Math.sin(radians), 0, time);
  const eqj = RotateVector(Rotation_ECT_EQJ(time), ect);
  const eclJ2000 = RotateVector(Rotation_EQJ_ECL(), eqj);
  const eclJ2000UnitDirection = toPlainVector(eclJ2000);

  return {
    sourceLongitude: longitude,
    ectUnitDirection: toPlainVector(ect),
    eqjUnitDirection: toPlainVector(eqj),
    eclJ2000UnitDirection,
    sceneUnitDirection: eclipticVectorToSceneAxes(eclJ2000UnitDirection),
  };
}

/**
 * Optional presentation scaling kept outside canonical/derived angular truth.
 * A positive radius changes magnitude only; it cannot change the direction.
 */
export function westernScenePositionAtRadius(
  direction: SceneVector,
  radius: number,
): SceneVector {
  if (!Number.isFinite(radius) || radius < 0) {
    throw new RangeError("Western projection radius must be finite and non-negative.");
  }

  return {
    x: direction.x * radius,
    y: direction.y * radius,
    z: direction.z * radius,
  };
}

function requireCanonicalAngle(
  result: WesternAstrologyResult,
  name: AstrologicalAnglePosition["name"],
): AstrologicalAnglePosition {
  const angle = result.angles.find((candidate) => candidate.name === name);
  if (!angle) {
    throw new RangeError(`Canonical Western result is missing ${name}.`);
  }
  return angle;
}

export function createWesternProjectionGeometry(
  result: WesternAstrologyResult,
): WesternProjectionGeometry {
  if (result.bodies.length !== 10) {
    throw new RangeError("Canonical Western result must contain exactly 10 bodies.");
  }
  if (result.houses.length !== 12) {
    throw new RangeError("Canonical Western result must contain exactly 12 houses.");
  }
  if (result.houses.some((house, index) => house.house !== index + 1)) {
    throw new RangeError("Canonical Western houses must be ordered from 1 through 12.");
  }

  const bodyNames = result.bodies.map(({ name }) => name);
  if (new Set(bodyNames).size !== result.bodies.length) {
    throw new RangeError("Canonical Western body identities must be unique.");
  }

  const project = (longitude: number) =>
    projectTropicalLongitude(longitude, result.julianDay);
  const bodies = result.bodies.map((canonical) => ({
    canonical,
    geometry: project(canonical.longitude),
  }));
  const bodiesByName = new Map(bodies.map((body) => [body.canonical.name, body]));
  const projectAngle = (canonical: AstrologicalAnglePosition) => ({
    canonical,
    geometry: project(canonical.longitude),
  });
  const ascendant = projectAngle(requireCanonicalAngle(result, "ASC"));
  const midheaven = projectAngle(requireCanonicalAngle(result, "MC"));
  const houses = result.houses.map((canonical) => ({
    canonical,
    geometry: project(canonical.longitude),
  }));
  const aspects = result.aspects.map((canonical) => {
    const first = bodiesByName.get(canonical.body1);
    const second = bodiesByName.get(canonical.body2);
    if (!first || !second) {
      throw new RangeError(
        `Canonical aspect ${canonical.id} references a missing body endpoint.`,
      );
    }

    return {
      canonical,
      endpoints: [
        {
          role: "body1" as const,
          body: canonical.body1,
          canonicalBody: first.canonical,
          geometry: first.geometry,
        },
        {
          role: "body2" as const,
          body: canonical.body2,
          canonicalBody: second.canonical,
          geometry: second.geometry,
        },
      ] as const,
    };
  });

  return {
    birthInstant: {
      source: "WesternAstrologyResult.julianDay",
      julianDay: result.julianDay,
      astronomyEngineUtDaysSinceJ2000: result.julianDay - JULIAN_DAY_J2000,
    },
    frame: WESTERN_PROJECTION_FRAME,
    bodies,
    angles: { ascendant, midheaven },
    houses,
    aspects,
  };
}
