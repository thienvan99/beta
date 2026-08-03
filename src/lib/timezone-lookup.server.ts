import { find } from "geo-tz/all";
import { isValidIanaTimeZone } from "./birth-time";

export type TimeZoneFinder = (latitude: number, longitude: number) => string[];

export function lookupIanaTimeZone(
  latitude: number,
  longitude: number,
  finder: TimeZoneFinder = find,
) {
  if (
    !Number.isFinite(latitude) ||
    latitude < -90 ||
    latitude > 90 ||
    !Number.isFinite(longitude) ||
    longitude < -180 ||
    longitude > 180
  ) {
    return null;
  }

  try {
    return finder(latitude, longitude).find(isValidIanaTimeZone) ?? null;
  } catch {
    return null;
  }
}
