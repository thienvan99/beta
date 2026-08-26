import type { ObservationContext } from "../../lib/observation-context";
import { evaluateObserverCapability } from "./observer-capability";
import type { PlanetId } from "./solar-system-data";

export type SolarSceneState =
  | Readonly<{ mode: "solar-overview" }>
  | Readonly<{ mode: "planet-focus"; planetId: PlanetId }>
  | Readonly<{ mode: "birth-earth"; context: ObservationContext }>
  | Readonly<{ mode: "birth-observer"; context: ObservationContext }>
  | Readonly<{ mode: "western-projection"; context: ObservationContext }>;

export type BirthSnapshotClock = {
  getTimestamp(): number;
  isPaused(): boolean;
  setPaused(paused: boolean): void;
  setTimestamp(timestampUtcMs: number): number;
};

export type SolarSceneClock = BirthSnapshotClock & {
  setToNow(): number;
  advance(realDeltaSeconds: number): number;
};

export type BeginBirthSnapshotResult =
  | Readonly<{ ok: true; state: Extract<SolarSceneState, { mode: "birth-earth" }> }>
  | Readonly<{
      ok: false;
      reason: "invalid-observation-context" | "outside-supported-range" | "clock-rejected-exact-time";
    }>;

export const SOLAR_OVERVIEW_STATE: SolarSceneState = Object.freeze({ mode: "solar-overview" });

export function createPlanetFocusState(planetId: PlanetId): SolarSceneState {
  return { mode: "planet-focus", planetId };
}

export function isBirthSnapshotState(state: SolarSceneState): boolean {
  return state.mode === "birth-earth" ||
    state.mode === "birth-observer" ||
    state.mode === "western-projection";
}

export function setSolarScenePaused(
  state: SolarSceneState,
  clock: BirthSnapshotClock,
  paused: boolean,
): boolean {
  if (!paused && isBirthSnapshotState(state)) {
    return false;
  }
  clock.setPaused(paused);
  return true;
}

export function setSolarSceneTimestamp(
  state: SolarSceneState,
  clock: BirthSnapshotClock,
  timestampUtcMs: number,
): boolean {
  if (isBirthSnapshotState(state)) {
    return false;
  }
  clock.setTimestamp(timestampUtcMs);
  return true;
}

export function setSolarSceneToNow(
  state: SolarSceneState,
  clock: SolarSceneClock,
): boolean {
  if (isBirthSnapshotState(state)) {
    return false;
  }
  clock.setToNow();
  return true;
}

export function advanceSolarSceneClock(
  state: SolarSceneState,
  clock: SolarSceneClock,
  realDeltaSeconds: number,
): boolean {
  if (isBirthSnapshotState(state)) {
    return false;
  }
  clock.advance(realDeltaSeconds);
  return true;
}

function isValidObservationContext(context: ObservationContext): boolean {
  return (
    Number.isInteger(context.timestampUtcMs) &&
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

/** Atomic semantic entry: validate first, then pause and set the exact birth instant. */
export function beginBirthSnapshot(
  context: ObservationContext,
  clock: BirthSnapshotClock,
): BeginBirthSnapshotResult {
  if (!isValidObservationContext(context)) {
    return { ok: false, reason: "invalid-observation-context" };
  }
  const capability = evaluateObserverCapability(context);
  if (!capability.supported) {
    return { ok: false, reason: capability.reason };
  }

  const previousTimestamp = clock.getTimestamp();
  const wasPaused = clock.isPaused();
  clock.setPaused(true);
  const acceptedTimestamp = clock.setTimestamp(context.timestampUtcMs);
  if (acceptedTimestamp !== context.timestampUtcMs || clock.getTimestamp() !== context.timestampUtcMs) {
    clock.setTimestamp(previousTimestamp);
    clock.setPaused(wasPaused);
    return { ok: false, reason: "clock-rejected-exact-time" };
  }

  return { ok: true, state: { mode: "birth-earth", context } };
}

export function handoffBirthEarthToObserver(
  state: SolarSceneState,
): Extract<SolarSceneState, { mode: "birth-observer" }> | null {
  return state.mode === "birth-earth"
    ? { mode: "birth-observer", context: state.context }
    : null;
}

export function returnToSolarOverview(): SolarSceneState {
  return SOLAR_OVERVIEW_STATE;
}
