export const SIMULATION_SPEED_OPTIONS = [0.1, 0.25, 0.5, 1, 2, 5, 10] as const;
export const MIN_SIMULATION_SPEED = SIMULATION_SPEED_OPTIONS[0];
export const MAX_SIMULATION_SPEED = SIMULATION_SPEED_OPTIONS[SIMULATION_SPEED_OPTIONS.length - 1];
export const DEFAULT_SIMULATION_SPEED = 1;
export const DEFAULT_SIMULATION_SPEED_INDEX = SIMULATION_SPEED_OPTIONS.indexOf(DEFAULT_SIMULATION_SPEED);

export function clampSimulationSpeed(speed: number): number {
  if (!Number.isFinite(speed)) {
    return DEFAULT_SIMULATION_SPEED;
  }
  return Math.max(MIN_SIMULATION_SPEED, Math.min(MAX_SIMULATION_SPEED, speed));
}
