import type { PhysicalVectorAU } from "./ephemeris-provider";

export type SceneVector = Readonly<{ x: number; y: number; z: number }>;

const DISPLAY_LOG_FACTOR = 2.85;
const EARTH_SCENE_RADIUS = 17;
const SCENE_UNITS_PER_LOG = EARTH_SCENE_RADIUS / Math.log1p(DISPLAY_LOG_FACTOR);
const MEAN_MOON_DISTANCE_AU = 384_400 / 149_597_870.7;
const MOON_SCENE_DISTANCE = 3.2;

export function vectorLength(vector: PhysicalVectorAU): number {
  return Math.hypot(vector.x, vector.y, vector.z);
}
/**
 * Right-handed axis mapping:
 * ECL +X (J2000 equinox) -> Three +X
 * ECL +Y (90° prograde in the ecliptic) -> Three -Z
 * ECL +Z (ecliptic north) -> Three +Y
 */
export function eclipticVectorToSceneAxes(vector: PhysicalVectorAU): SceneVector {
  return { x: vector.x, y: vector.z, z: -vector.y };
}

export function sceneRadiusFromAu(distanceAu: number): number {
  if (!Number.isFinite(distanceAu) || distanceAu < 0) {
    throw new RangeError("Physical distance must be a finite, non-negative AU value.");
  }
  return SCENE_UNITS_PER_LOG * Math.log1p(DISPLAY_LOG_FACTOR * distanceAu);
}

export function physicalVectorToScenePosition(vector: PhysicalVectorAU): SceneVector {
  const distanceAu = vectorLength(vector);
  if (distanceAu === 0) {
    return { x: 0, y: 0, z: 0 };
  }

  const axes = eclipticVectorToSceneAxes(vector);
  const scale = sceneRadiusFromAu(distanceAu) / distanceAu;
  return { x: axes.x * scale, y: axes.y * scale, z: axes.z * scale };
}

export function moonVectorToSceneOffset(geocentric: PhysicalVectorAU): SceneVector {
  const distanceAu = vectorLength(geocentric);
  if (distanceAu === 0) {
    return { x: 0, y: 0, z: 0 };
  }

  const axes = eclipticVectorToSceneAxes(geocentric);
  const displayDistance = MOON_SCENE_DISTANCE * (distanceAu / MEAN_MOON_DISTANCE_AU);
  const scale = displayDistance / distanceAu;
  return { x: axes.x * scale, y: axes.y * scale, z: axes.z * scale };
}
