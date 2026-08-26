import { Temporal } from "temporal-polyfill";
import { DEFAULT_SIMULATION_SPEED, clampSimulationSpeed } from "./simulation-speed";

export const SIMULATED_DAY_MS = 86_400_000;
export const MIN_SIMULATION_TIMESTAMP_MS = Date.parse("1600-01-01T00:00:00.000Z");
export const MAX_SIMULATION_TIMESTAMP_MS = Date.parse("2200-12-31T23:59:59.999Z");

export type SimulationDateTimeInput = Readonly<{
  date: string;
  time: string;
}>;

export function clampSimulationTimestamp(timestampUtcMs: number): number {
  if (!Number.isFinite(timestampUtcMs)) {
    return MIN_SIMULATION_TIMESTAMP_MS;
  }
  return Math.trunc(
    Math.max(MIN_SIMULATION_TIMESTAMP_MS, Math.min(MAX_SIMULATION_TIMESTAMP_MS, timestampUtcMs)),
  );
}

export function formatSimulationDateTime(
  timestampUtcMs: number,
  timeZone: string,
): SimulationDateTimeInput {
  const zoned = Temporal.Instant
    .fromEpochMilliseconds(clampSimulationTimestamp(timestampUtcMs))
    .toZonedDateTimeISO(timeZone);
  const pad = (value: number) => String(value).padStart(2, "0");
  return {
    date: `${String(zoned.year).padStart(4, "0")}-${pad(zoned.month)}-${pad(zoned.day)}`,
    time: `${pad(zoned.hour)}:${pad(zoned.minute)}`,
  };
}

export function parseSimulationDateTime(
  input: SimulationDateTimeInput,
  timeZone: string,
): number | null {
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(input.date);
  const timeMatch = /^(\d{2}):(\d{2})$/.exec(input.time);
  if (!dateMatch || !timeMatch) {
    return null;
  }

  try {
    const zoned = Temporal.ZonedDateTime.from(
      {
        year: Number(dateMatch[1]),
        month: Number(dateMatch[2]),
        day: Number(dateMatch[3]),
        hour: Number(timeMatch[1]),
        minute: Number(timeMatch[2]),
        second: 0,
        millisecond: 0,
        timeZone,
      },
      { disambiguation: "compatible", overflow: "reject" },
    );
    const timestamp = zoned.toInstant().epochMilliseconds;
    if (timestamp < MIN_SIMULATION_TIMESTAMP_MS || timestamp > MAX_SIMULATION_TIMESTAMP_MS) {
      return null;
    }
    return timestamp;
  } catch {
    return null;
  }
}

export function cameraTransitionProgress(
  startedAtMs: number,
  realNowMs: number,
  durationMs: number,
): number {
  if (durationMs <= 0) {
    return 1;
  }
  return Math.max(0, Math.min(1, (realNowMs - startedAtMs) / durationMs));
}

export class SimulationClock {
  private timestampUtcMs: number;
  private speed = DEFAULT_SIMULATION_SPEED;
  private paused = false;

  constructor(initialTimestampUtcMs = Date.now()) {
    this.timestampUtcMs = clampSimulationTimestamp(initialTimestampUtcMs);
  }

  getTimestamp(): number {
    return this.timestampUtcMs;
  }

  getSpeed(): number {
    return this.speed;
  }

  isPaused(): boolean {
    return this.paused;
  }

  setTimestamp(timestampUtcMs: number): number {
    this.timestampUtcMs = clampSimulationTimestamp(timestampUtcMs);
    return this.timestampUtcMs;
  }

  setToNow(): number {
    return this.setTimestamp(Date.now());
  }

  setSpeed(speed: number): number {
    this.speed = clampSimulationSpeed(speed);
    return this.speed;
  }

  setPaused(paused: boolean): void {
    this.paused = paused;
  }

  advance(realDeltaSeconds: number): number {
    if (this.paused || !Number.isFinite(realDeltaSeconds) || realDeltaSeconds <= 0) {
      return this.timestampUtcMs;
    }
    return this.setTimestamp(
      this.timestampUtcMs + realDeltaSeconds * this.speed * SIMULATED_DAY_MS,
    );
  }
}
