export type HouseBoundary = Readonly<{
  house: number;
  longitude: number;
}>;

export const houseCuspBoundaryToleranceDegrees = 1e-9;

function normalizeCircularLongitude(longitude: number) {
  if (!Number.isFinite(longitude)) {
    throw new RangeError("House longitude must be finite.");
  }

  return ((longitude % 360) + 360) % 360;
}

function circularDistance(first: number, second: number) {
  const distance = Math.abs(
    normalizeCircularLongitude(first) - normalizeCircularLongitude(second),
  );

  return Math.min(distance, 360 - distance);
}

/**
 * House intervals are cusp-inclusive at the start and cusp-exclusive at the
 * end. Values within the exported tolerance of a cusp belong to the house
 * that starts at that cusp, which absorbs floating-point calculation noise.
 */
export function findHouseForLongitude(
  longitude: number,
  houses: ReadonlyArray<HouseBoundary>,
) {
  if (houses.length === 0) {
    return null;
  }

  const normalizedLongitude = normalizeCircularLongitude(longitude);

  for (const house of houses) {
    if (
      circularDistance(normalizedLongitude, house.longitude) <=
      houseCuspBoundaryToleranceDegrees
    ) {
      return house.house;
    }
  }

  for (let index = 0; index < houses.length; index += 1) {
    const current = houses[index];
    const next = houses[(index + 1) % houses.length];
    const span = normalizeCircularLongitude(
      next.longitude - current.longitude,
    );
    const distance = normalizeCircularLongitude(
      normalizedLongitude - current.longitude,
    );

    if (span > 0 && distance < span) {
      return current.house;
    }
  }

  return null;
}
