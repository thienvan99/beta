import { describe, expect, it } from "vitest";
import type { HouseCuspPosition } from "./western-astrology";
import { longitudeToZodiac } from "./western-astrology";
import { deriveWesternHouseRulers } from "./western-house-rulers";

function houseCusp(house: number, longitude: number): HouseCuspPosition {
  return { house, longitude, ...longitudeToZodiac(longitude) };
}

const zodiacRulers = [
  ["Aries", "Mars", null],
  ["Taurus", "Venus", null],
  ["Gemini", "Mercury", null],
  ["Cancer", "Moon", null],
  ["Leo", "Sun", null],
  ["Virgo", "Mercury", null],
  ["Libra", "Venus", null],
  ["Scorpio", "Mars", "Pluto"],
  ["Sagittarius", "Jupiter", null],
  ["Capricorn", "Saturn", null],
  ["Aquarius", "Saturn", "Uranus"],
  ["Pisces", "Jupiter", "Neptune"],
] as const;

describe("deriveWesternHouseRulers", () => {
  it("derives all twelve traditional rulers and supplementary modern co-rulers", () => {
    const houses = zodiacRulers.map((_, index) => houseCusp(index + 1, index * 30 + 15));

    const result = deriveWesternHouseRulers({ houses });

    expect(result).toHaveLength(12);
    zodiacRulers.forEach(([cuspSign, primaryRuler, modernCoRuler], index) => {
      expect(result[index]).toEqual({
        house: index + 1,
        cuspLongitude: index * 30 + 15,
        cuspSign,
        primaryRuler,
        modernCoRuler,
        rulesetId: "western-house-rulers-v1",
        rulesetVersion: "1.0.0",
      });
    });
  });

  it.each([
    [0, "Aries", "Mars"],
    [360, "Aries", "Mars"],
    [720, "Aries", "Mars"],
    [-0.001, "Pisces", "Jupiter"],
  ] as const)("handles longitude wrap at %s", (longitude, cuspSign, primaryRuler) => {
    expect(deriveWesternHouseRulers({ houses: [houseCusp(1, longitude)] })[0]).toMatchObject({
      cuspSign,
      primaryRuler,
    });
  });

  it("keeps the ruler of the sign containing a 29°59' cusp", () => {
    const longitude = 29 + 59 / 60;
    expect(deriveWesternHouseRulers({ houses: [houseCusp(2, longitude)] })[0]).toMatchObject({
      cuspSign: "Aries",
      primaryRuler: "Mars",
    });
  });

  it("does not use planets in a house or the natural-house shortcut", () => {
    const houses = [houseCusp(1, 195)];
    const withMars = { houses, bodies: [{ name: "Mars", house: 1 }] };
    const withVenus = { houses, bodies: [{ name: "Venus", house: 1 }] };

    expect(deriveWesternHouseRulers(withMars)).toEqual(deriveWesternHouseRulers(withVenus));
    expect(deriveWesternHouseRulers(withMars)[0]).toMatchObject({
      cuspSign: "Libra",
      primaryRuler: "Venus",
    });
  });

  it("ignores intercepted-sign metadata and keeps the cusp ruler primary", () => {
    const input = {
      houses: [houseCusp(4, 45)],
      interceptedSigns: ["Gemini"],
    };

    expect(deriveWesternHouseRulers(input)[0]).toMatchObject({
      cuspSign: "Taurus",
      primaryRuler: "Venus",
    });
  });

  it.each([
    [225, "Mars", "Pluto"],
    [315, "Saturn", "Uranus"],
    [345, "Jupiter", "Neptune"],
  ] as const)(
    "keeps the traditional ruler primary at %s°",
    (longitude, primaryRuler, modernCoRuler) => {
      expect(deriveWesternHouseRulers({ houses: [houseCusp(10, longitude)] })[0]).toMatchObject({
        primaryRuler,
        modernCoRuler,
      });
    },
  );

  it("does not mutate its input and is deterministic", () => {
    const houses = [houseCusp(1, 0), houseCusp(2, 225), houseCusp(10, 315)];
    const input = { houses };
    const snapshot = structuredClone(input);

    const first = deriveWesternHouseRulers(input);
    const second = deriveWesternHouseRulers(input);

    expect(input).toEqual(snapshot);
    expect(first).toEqual(second);
    expect(first).not.toBe(second);
  });
});
