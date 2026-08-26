import {
  Observer,
  ObserverVector,
  RotateVector,
  Rotation_EQJ_ECL,
} from "astronomy-engine";
import type { ObservationContext } from "../../lib/observation-context";
import { eclipticVectorToSceneAxes, type SceneVector } from "./astronomical-display";

export const EARTH_TEXTURE_ASSET = Object.freeze({
  publicPath: "/solar-system/textures/earth-blue-marble-2048.png",
  repositoryPath: "public/solar-system/textures/earth-blue-marble-2048.png",
  widthPixels: 2_048,
  heightPixels: 1_024,
  byteLength: 1_912_469,
  sha256: "b5e0139834c638d10c2c747f4bac63df5f9387680c00d87e5a2a9ed9a3dfea71",
  provenance: "NASA Earth Observatory Blue Marble composite; see the adjacent README.md",
  provenanceDocument: "public/solar-system/textures/README.md",
  sourceUrl:
    "https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57730/land_ocean_ice_2048.png",
} as const);

export const EARTH_TEXTURE_DEGREES_PER_PIXEL = 360 / EARTH_TEXTURE_ASSET.widthPixels;
/** Frozen before the corrected orientation was measured: one sixteenth of a source pixel. */
export const EARTH_PRESENTATION_TOLERANCE_DEGREES =
  EARTH_TEXTURE_DEGREES_PER_PIXEL / 16;

export const EARTH_PRESENTATION_VALIDATION_EPOCHS = Object.freeze([
  "1985-07-23T22:45:00.000Z",
  "1990-01-15T01:30:00.000Z",
  "2000-01-01T12:00:00.000Z",
  "2026-08-25T00:00:00.000Z",
  "2100-01-15T01:30:00.000Z",
] as const);

export type EarthPresentationVector = SceneVector;

export type EarthPresentationFrame = Readonly<{
  timestampUtcMs: number;
  /** Texture/local +X: latitude 0, longitude 0 (Greenwich). */
  xGreenwich: EarthPresentationVector;
  /** Texture/local +Y: geographic north pole. */
  yNorth: EarthPresentationVector;
  /** Texture/local +Z: west; therefore local -Z is longitude +90 east. */
  zWest: EarthPresentationVector;
  policy: Readonly<{
    source: "astronomy-engine@2.1.19 ObserverVector";
    frame: "EQJ-J2000 -> ECL-J2000 -> Three-scene";
    earthShapeUse: "orientation-only";
  }>;
}>;

export type EarthTextureCoordinate = Readonly<{ u: number; v: number }>;

export type BirthLocationMarkerPresentation = Readonly<{
  context: ObservationContext;
  textureCoordinate: EarthTextureCoordinate;
  localDirection: EarthPresentationVector;
  sceneDirection: EarthPresentationVector;
}>;

const EQJ_TO_ECL = Rotation_EQJ_ECL();
const FRAME_POLICY = Object.freeze({
  source: "astronomy-engine@2.1.19 ObserverVector",
  frame: "EQJ-J2000 -> ECL-J2000 -> Three-scene",
  earthShapeUse: "orientation-only",
} as const);

function vectorLength(vector: EarthPresentationVector): number {
  return Math.hypot(vector.x, vector.y, vector.z);
}

function normalize(vector: EarthPresentationVector): EarthPresentationVector {
  const length = vectorLength(vector);
  if (!Number.isFinite(length) || length === 0) {
    throw new RangeError("Earth presentation direction must have a finite, non-zero length.");
  }
  return { x: vector.x / length, y: vector.y / length, z: vector.z / length };
}

function dot(left: EarthPresentationVector, right: EarthPresentationVector): number {
  return left.x * right.x + left.y * right.y + left.z * right.z;
}

function cross(left: EarthPresentationVector, right: EarthPresentationVector): EarthPresentationVector {
  return {
    x: left.y * right.z - left.z * right.y,
    y: left.z * right.x - left.x * right.z,
    z: left.x * right.y - left.y * right.x,
  };
}

function subtractProjection(
  vector: EarthPresentationVector,
  axis: EarthPresentationVector,
): EarthPresentationVector {
  const projection = dot(vector, axis);
  return {
    x: vector.x - axis.x * projection,
    y: vector.y - axis.y * projection,
    z: vector.z - axis.z * projection,
  };
}

function observerDirection(timestampUtcMs: number, latitude: number, longitude: number): SceneVector {
  if (!Number.isFinite(timestampUtcMs)) {
    throw new RangeError("Earth presentation timestamp must be finite.");
  }
  const eqj = ObserverVector(
    new Date(timestampUtcMs),
    new Observer(latitude, longitude, 0),
    false,
  );
  const ecliptic = RotateVector(EQJ_TO_ECL, eqj);
  return normalize(eclipticVectorToSceneAxes(ecliptic));
}

/**
 * Builds the texture presentation frame from official geocentric observer vectors.
 * ObserverVector's ellipsoid is used only to orient the Greenwich and north axes;
 * arbitrary birth-marker latitude remains a spherical presentation concern.
 */
export function createEarthPresentationFrame(timestampUtcMs: number): EarthPresentationFrame {
  const northReference = observerDirection(timestampUtcMs, 90, 0);
  const greenwichReference = observerDirection(timestampUtcMs, 0, 0);
  const yNorth = normalize(northReference);
  const xGreenwich = normalize(subtractProjection(greenwichReference, yNorth));
  const zWest = normalize(cross(xGreenwich, yNorth));

  return {
    timestampUtcMs,
    xGreenwich,
    yNorth,
    zWest,
    policy: FRAME_POLICY,
  };
}

/** Matches Three SphereGeometry's default UVs plus TextureLoader.flipY=true. */
export function geographicToEarthTextureCoordinate(
  latitudeDegrees: number,
  longitudeDegrees: number,
): EarthTextureCoordinate {
  if (
    !Number.isFinite(latitudeDegrees) ||
    latitudeDegrees < -90 ||
    latitudeDegrees > 90 ||
    !Number.isFinite(longitudeDegrees)
  ) {
    throw new RangeError("Earth texture coordinates require finite latitude [-90, 90] and longitude.");
  }
  const wrappedLongitude = ((longitudeDegrees + 180) % 360 + 360) % 360 - 180;
  return {
    u: (wrappedLongitude + 180) / 360,
    v: (latitudeDegrees + 90) / 180,
  };
}

/** Local sphere contract: Greenwich=+X, north=+Y, east=−Z. */
export function geographicToEarthLocalDirection(
  latitudeDegrees: number,
  longitudeDegrees: number,
): EarthPresentationVector {
  geographicToEarthTextureCoordinate(latitudeDegrees, longitudeDegrees);
  const latitude = latitudeDegrees * Math.PI / 180;
  const longitude = longitudeDegrees * Math.PI / 180;
  const equatorialRadius = Math.cos(latitude);
  return normalize({
    x: equatorialRadius * Math.cos(longitude),
    y: Math.sin(latitude),
    z: -equatorialRadius * Math.sin(longitude),
  });
}

export function transformEarthLocalDirection(
  frame: EarthPresentationFrame,
  local: EarthPresentationVector,
): EarthPresentationVector {
  return normalize({
    x:
      frame.xGreenwich.x * local.x +
      frame.yNorth.x * local.y +
      frame.zWest.x * local.z,
    y:
      frame.xGreenwich.y * local.x +
      frame.yNorth.y * local.y +
      frame.zWest.y * local.z,
    z:
      frame.xGreenwich.z * local.x +
      frame.yNorth.z * local.y +
      frame.zWest.z * local.z,
  });
}

export function createBirthLocationMarkerPresentation(
  context: ObservationContext,
): BirthLocationMarkerPresentation {
  const frame = createEarthPresentationFrame(context.timestampUtcMs);
  const localDirection = geographicToEarthLocalDirection(context.latitude, context.longitude);
  return {
    context,
    textureCoordinate: geographicToEarthTextureCoordinate(context.latitude, context.longitude),
    localDirection,
    sceneDirection: transformEarthLocalDirection(frame, localDirection),
  };
}
