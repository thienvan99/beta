import type { ObservationContext } from "../../lib/observation-context";
import {
  MAX_SIMULATION_TIMESTAMP_MS,
  MIN_SIMULATION_TIMESTAMP_MS,
} from "./simulation-time";

export type ObserverCapability =
  | Readonly<{ supported: true }>
  | Readonly<{
      supported: false;
      reason: "outside-supported-range";
    }>;

const SUPPORTED: ObserverCapability = { supported: true };
const OUTSIDE_SUPPORTED_RANGE: ObserverCapability = {
  supported: false,
  reason: "outside-supported-range",
};

export function evaluateObserverCapability(
  context: ObservationContext,
): ObserverCapability {
  return context.timestampUtcMs >= MIN_SIMULATION_TIMESTAMP_MS &&
    context.timestampUtcMs <= MAX_SIMULATION_TIMESTAMP_MS
    ? SUPPORTED
    : OUTSIDE_SUPPORTED_RANGE;
}
