import type { BirthData } from "../../lib/birth-data";
import {
  createObservationContext,
  type ObservationContext,
} from "../../lib/observation-context";
import { evaluateObserverCapability } from "./observer-capability";

export type BirthObserverEntryState =
  | Readonly<{ status: "loading" }>
  | Readonly<{ status: "missing-session" }>
  | Readonly<{ status: "invalid-context" }>
  | Readonly<{ status: "unsupported"; context: ObservationContext }>
  | Readonly<{ status: "ready"; context: ObservationContext }>;

export function resolveBirthObserverEntry(
  birthData: BirthData | null,
): BirthObserverEntryState {
  if (!birthData) {
    return { status: "missing-session" };
  }

  const context = createObservationContext({
    birthDate: birthData.birthDate,
    hour: birthData.hour,
    minute: birthData.minute,
    latitude: birthData.latitude,
    longitude: birthData.longitude,
    timezone: birthData.timezone,
  });
  if (!context) {
    return { status: "invalid-context" };
  }

  return evaluateObserverCapability(context).supported
    ? { status: "ready", context }
    : { status: "unsupported", context };
}
