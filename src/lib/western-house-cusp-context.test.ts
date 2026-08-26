import { describe, expect, it } from "vitest";
import { findHouseForLongitude } from "./house-placement";
import {
  longitudeToZodiac,
  type CelestialBodyPosition,
  type HouseCuspPosition,
} from "./western-astrology";
import { deriveWesternHouseCuspContexts } from "./western-house-cusp-context";

const bodyNames = [
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

function houseCusp(house: number, longitude: number): HouseCuspPosition {
  return { house, longitude, ...longitudeToZodiac(longitude) };
}

function regularHouses() {
  return Array.from({ length: 12 }, (_, index) => houseCusp(index + 1, index * 30));
}

function celestialBody(
  name: string,
  longitude: number,
  houses: HouseCuspPosition[],
  retrograde = false,
): CelestialBodyPosition {
  const house = findHouseForLongitude(longitude, houses);
  if (house === null) throw new Error("Test body must belong to a house.");

  return {
    name,
    longitude,
    ...longitudeToZodiac(longitude),
    retrograde,
    house,
  };
}

function deriveAt(longitude: number, houses = regularHouses(), retrograde = false) {
  return deriveWesternHouseCuspContexts({
    houses,
    bodies: [celestialBody("Venus", longitude, houses, retrograde)],
  })[0];
}

describe("deriveWesternHouseCuspContexts", () => {
  it("does not flag a body far from every cusp", () => {
    expect(deriveAt(15)).toMatchObject({
      distanceDegrees: 15,
      nearCusp: false,
      exactCusp: false,
    });
  });

  it.each([
    [29.001, true],
    [29, false],
    [28.5, false],
  ] as const)("applies the strict one-degree threshold at %s°", (longitude, nearCusp) => {
    expect(deriveAt(longitude).nearCusp).toBe(nearCusp);
  });

  it("keeps the old primary house immediately before a cusp", () => {
    expect(deriveAt(29.999)).toMatchObject({
      primaryHouse: 1,
      adjacentHouse: 2,
      nearestCuspHouse: 2,
      side: "before",
      nearCusp: true,
    });
  });

  it("keeps the new primary house immediately after a cusp", () => {
    expect(deriveAt(30.001)).toMatchObject({
      primaryHouse: 2,
      adjacentHouse: 1,
      nearestCuspHouse: 2,
      side: "after",
      nearCusp: true,
    });
  });

  it("uses calculation tolerance for an exact cusp", () => {
    expect(deriveAt(30 + 5e-10)).toMatchObject({
      primaryHouse: 2,
      adjacentHouse: 1,
      nearestCuspHouse: 2,
      distanceDegrees: 0,
      nearCusp: true,
      exactCusp: true,
      side: "exact",
    });
  });

  it.each([
    [359.8, "before", 12, 1, 1],
    [0.2, "after", 1, 12, 1],
  ] as const)(
    "handles the House 12/House 1 wrap at %s°",
    (longitude, side, primaryHouse, adjacentHouse, nearestCuspHouse) => {
      const context = deriveAt(longitude);
      expect(context).toMatchObject({
        side,
        primaryHouse,
        adjacentHouse,
        nearestCuspHouse,
        nearCusp: true,
      });
      expect(context.distanceDegrees).toBeCloseTo(0.2, 12);
    },
  );

  it("finds the nearest cusp between unequal houses", () => {
    const longitudes = [0, 20, 55, 90, 120, 150, 180, 210, 240, 270, 300, 330];
    const houses = longitudes.map((longitude, index) => houseCusp(index + 1, longitude));

    expect(deriveAt(39, houses)).toMatchObject({
      nearestCuspHouse: 3,
      distanceDegrees: 16,
      side: "before",
    });
  });

  it("processes all ten bodies in deterministic input order", () => {
    const houses = regularHouses();
    const bodies = bodyNames.map((name, index) =>
      celestialBody(name, index * 30 + 0.5, houses),
    );
    const contexts = deriveWesternHouseCuspContexts({ houses, bodies });

    expect(contexts.map(({ body }) => body)).toEqual(bodyNames);
    expect(contexts).toHaveLength(10);
    expect(contexts.every(({ nearCusp }) => nearCusp)).toBe(true);
  });

  it("does not mutate the result or change body.house and is deterministic", () => {
    const houses = regularHouses();
    const bodies = [celestialBody("Venus", 29.999, houses)];
    const input = { houses, bodies };
    const snapshot = structuredClone(input);

    const first = deriveWesternHouseCuspContexts(input);
    const second = deriveWesternHouseCuspContexts(input);

    expect(input).toEqual(snapshot);
    expect(input.bodies[0].house).toBe(1);
    expect(first).toEqual(second);
    expect(first).not.toBe(second);
  });

  it("includes the approved policy identity", () => {
    expect(deriveAt(15)).toMatchObject({
      policyId: "western-house-cusp-policy-v1",
      policyVersion: "1.0.0",
    });
  });

  it("ignores retrograde when deriving proximity", () => {
    expect(deriveAt(29.5, regularHouses(), false)).toEqual(
      deriveAt(29.5, regularHouses(), true),
    );
  });
});
