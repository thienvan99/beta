import { Body, Equator, Horizon, Observer } from "astronomy-engine";
import type { ObservationContext } from "../../lib/observation-context";
import { evaluateObserverCapability } from "./observer-capability";

export const OBSERVER_SKY_BODY_NAMES = [
  "Sun",
  "Moon",
  "Mercury",
  "Venus",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
  "Pluto",
] as const;

export type ObserverSkyBodyName = (typeof OBSERVER_SKY_BODY_NAMES)[number];

export type ObserverSkyBody = Readonly<{
  body: ObserverSkyBodyName;
  /** North=0, East=90, South=180, West=270; range [0, 360). */
  azimuthDegrees: number;
  /** Geometric altitude: horizon=0, zenith=+90, nadir=-90. */
  altitudeDegrees: number;
  /** Canonical V1 geometric-horizon predicate; no refraction threshold. */
  aboveHorizon: boolean;
}>;

export type ObserverSkyProjection = Readonly<{
  instantUtc: string;
  timestampUtcMs: number;
  observer: Readonly<{
    latitude: number;
    longitude: number;
    elevationMeters: 0;
  }>;
  policy: Readonly<{
    topocentric: true;
    lightTime: "applied";
    parallax: "applied";
    aberration: "on";
    atmosphericRefraction: "off";
  }>;
  bodies: readonly ObserverSkyBody[];
}>;

export type ObserverSkyProjectionResult =
  | Readonly<{
      ok: true;
      projection: ObserverSkyProjection;
    }>
  | Readonly<{
      ok: false;
      reason:
        | "invalid-observation-context"
        | "outside-supported-range"
        | "calculation-failed";
    }>;

const BODY_BY_NAME: Readonly<Record<ObserverSkyBodyName, Body>> = {
  Sun: Body.Sun,
  Moon: Body.Moon,
  Mercury: Body.Mercury,
  Venus: Body.Venus,
  Mars: Body.Mars,
  Jupiter: Body.Jupiter,
  Saturn: Body.Saturn,
  Uranus: Body.Uranus,
  Neptune: Body.Neptune,
  Pluto: Body.Pluto,
};

const OBSERVER_SKY_POLICY: ObserverSkyProjection["policy"] = {
  topocentric: true,
  lightTime: "applied",
  parallax: "applied",
  aberration: "on",
  atmosphericRefraction: "off",
};

// astronomy-engine@2.1.19 types the optional fifth parameter as string | undefined.
// Its official docs define a false-like value as atmospheric refraction disabled.
const ATMOSPHERIC_REFRACTION_OFF: undefined = undefined;

function isValidContext(context: ObservationContext): boolean {
  return (
    Number.isFinite(context.timestampUtcMs) &&
    Date.parse(context.instantUtc) === context.timestampUtcMs &&
    Number.isFinite(context.latitude) &&
    context.latitude >= -90 &&
    context.latitude <= 90 &&
    Number.isFinite(context.longitude) &&
    context.longitude >= -180 &&
    context.longitude <= 180 &&
    context.elevationMeters === 0
  );
}

function isValidHorizontalCoordinate(azimuth: number, altitude: number): boolean {
  return (
    Number.isFinite(azimuth) &&
    azimuth >= 0 &&
    azimuth < 360 &&
    Number.isFinite(altitude) &&
    altitude >= -90 &&
    altitude <= 90
  );
}

export function calculateObserverSkyProjection(
  context: ObservationContext,
): ObserverSkyProjectionResult {
  if (!isValidContext(context)) {
    return { ok: false, reason: "invalid-observation-context" };
  }

  const capability = evaluateObserverCapability(context);
  if (!capability.supported) {
    return { ok: false, reason: capability.reason };
  }

  try {
    const date = new Date(context.timestampUtcMs);
    const observer = new Observer(
      context.latitude,
      context.longitude,
      context.elevationMeters,
    );
    const bodies: ObserverSkyBody[] = [];

    for (const bodyName of OBSERVER_SKY_BODY_NAMES) {
      const equatorial = Equator(
        BODY_BY_NAME[bodyName],
        date,
        observer,
        true,
        true,
      );
      const horizontal = Horizon(
        date,
        observer,
        equatorial.ra,
        equatorial.dec,
        ATMOSPHERIC_REFRACTION_OFF,
      );

      if (!isValidHorizontalCoordinate(horizontal.azimuth, horizontal.altitude)) {
        return { ok: false, reason: "calculation-failed" };
      }

      bodies.push({
        body: bodyName,
        azimuthDegrees: horizontal.azimuth,
        altitudeDegrees: horizontal.altitude,
        aboveHorizon: horizontal.altitude >= 0,
      });
    }

    return {
      ok: true,
      projection: {
        instantUtc: context.instantUtc,
        timestampUtcMs: context.timestampUtcMs,
        observer: {
          latitude: context.latitude,
          longitude: context.longitude,
          elevationMeters: context.elevationMeters,
        },
        policy: OBSERVER_SKY_POLICY,
        bodies,
      },
    };
  } catch {
    return { ok: false, reason: "calculation-failed" };
  }
}
