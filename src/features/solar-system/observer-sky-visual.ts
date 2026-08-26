import type {
  ObserverSkyBody,
  ObserverSkyProjection,
} from "./observer-sky-projection";

export type LocalHorizonDirection = Readonly<{
  /** North axis. */
  x: number;
  /** Up axis. */
  y: number;
  /** East axis. */
  z: number;
}>;

export type ObserverSkyVisualBody = Readonly<{
  /** Exact production body object; identity and az/alt/status are never rewritten. */
  source: ObserverSkyBody;
  localDirection: LocalHorizonDirection;
  domePoint: Readonly<{ xPercent: number; yPercent: number }> | null;
}>;

const DEGREES_TO_RADIANS = Math.PI / 180;
const DOME_CENTER_PERCENT = 50;
const DOME_HORIZON_RADIUS_PERCENT = 43;

function normalizeAzimuth(azimuthDegrees: number): number {
  return ((azimuthDegrees % 360) + 360) % 360;
}

/**
 * Observer-local horizon frame, intentionally separate from ECL J2000:
 * North=+X, Up=+Y, East=+Z. Azimuth increases North → East.
 */
export function observerAzimuthAltitudeToLocalDirection(
  azimuthDegrees: number,
  altitudeDegrees: number,
): LocalHorizonDirection {
  if (
    !Number.isFinite(azimuthDegrees) ||
    !Number.isFinite(altitudeDegrees) ||
    altitudeDegrees < -90 ||
    altitudeDegrees > 90
  ) {
    throw new RangeError("Invalid local-horizon coordinate.");
  }

  const azimuth = normalizeAzimuth(azimuthDegrees) * DEGREES_TO_RADIANS;
  const altitude = altitudeDegrees * DEGREES_TO_RADIANS;
  const horizontal = Math.cos(altitude);
  return {
    x: horizontal * Math.cos(azimuth),
    y: Math.sin(altitude),
    z: horizontal * Math.sin(azimuth),
  };
}

export function projectObserverSkyBodyForDome(
  source: ObserverSkyBody,
): ObserverSkyVisualBody {
  const localDirection = observerAzimuthAltitudeToLocalDirection(
    source.azimuthDegrees,
    source.altitudeDegrees,
  );
  if (!source.aboveHorizon) {
    return { source, localDirection, domePoint: null };
  }

  const azimuth = normalizeAzimuth(source.azimuthDegrees) * DEGREES_TO_RADIANS;
  const radialFraction = (90 - source.altitudeDegrees) / 90;
  const radius = radialFraction * DOME_HORIZON_RADIUS_PERCENT;
  return {
    source,
    localDirection,
    domePoint: {
      xPercent: DOME_CENTER_PERCENT + radius * Math.sin(azimuth),
      yPercent: DOME_CENTER_PERCENT - radius * Math.cos(azimuth),
    },
  };
}

export function createObserverSkyVisualBodies(
  projection: ObserverSkyProjection,
): readonly ObserverSkyVisualBody[] {
  return projection.bodies.map(projectObserverSkyBodyForDome);
}
