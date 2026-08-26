import { calculateBirthTime } from "./birth-time";

export type ObservationContextInput = Readonly<{
  birthDate: string;
  hour: string;
  minute: string;
  latitude: string | number;
  longitude: string | number;
  timezone: string;
}>;

export type ObservationContext = Readonly<{
  instantUtc: string;
  timestampUtcMs: number;
  latitude: number;
  longitude: number;
  elevationMeters: 0;
  timezone: Readonly<{
    ianaName: string;
    localDateTime: string;
    utcOffset: string;
    provenance: "birth-time-pipeline";
  }>;
}>;

function normalizeCoordinate(
  value: string | number,
  minimum: number,
  maximum: number,
): number | null {
  if (typeof value === "string" && !value.trim()) return null;

  const coordinate = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(coordinate) || coordinate < minimum || coordinate > maximum) {
    return null;
  }

  return Object.is(coordinate, -0) ? 0 : coordinate;
}

export function createObservationContext(
  input: ObservationContextInput,
): ObservationContext | null {
  const latitude = normalizeCoordinate(input.latitude, -90, 90);
  const longitude = normalizeCoordinate(input.longitude, -180, 180);
  if (latitude === null || longitude === null) return null;

  const birthTime = calculateBirthTime({
    birthDate: input.birthDate,
    hour: input.hour,
    minute: input.minute,
    timeZone: input.timezone,
  });
  if (!birthTime) return null;

  const timestampUtcMs = Date.parse(birthTime.utcDateTime);
  if (!Number.isFinite(timestampUtcMs)) return null;

  return {
    instantUtc: birthTime.utcDateTime,
    timestampUtcMs,
    latitude,
    longitude,
    elevationMeters: 0,
    timezone: {
      ianaName: input.timezone.trim(),
      localDateTime: birthTime.localDateTime,
      utcOffset: birthTime.utcOffset,
      provenance: "birth-time-pipeline",
    },
  };
}
