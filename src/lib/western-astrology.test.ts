import { describe, expect, it } from "vitest";
import {
  PlacidusCalculationError,
  calculateJulianDay,
  calculateMajorAspects,
  calculateWesternAstrology,
  longitudeToZodiac,
  normalizeLongitude,
  shortestAngularDistance,
  type WesternAstrologyInput,
} from "./western-astrology";
import { findHouseForLongitude } from "./house-placement";
import { finalValidationCases } from "./western-validation.test-data";

const horizonsToleranceDegrees = 0.01;
const houseReferenceToleranceDegrees = 0.0003;
const astrologPlanetToleranceDegrees = 0.004;
const circularPlanetToleranceDegrees = 0.012;
const astrologHouseToleranceDegrees = 0.0003;
const circularHouseToleranceDegrees = 1;
const circularAspectOrbToleranceDegrees = 0.02;

function angularDistance(first: number, second: number) {
  const distance = Math.abs(first - second) % 360;
  return Math.min(distance, 360 - distance);
}

describe("longitudeToZodiac", () => {
  it("converts longitude to a zodiac sign and position", () => {
    expect(longitudeToZodiac(125.456789)).toEqual({
      sign: "Leo",
      signVietnamese: "Sư Tử",
      degree: 5,
      minute: 27,
    });
  });

  it("handles values close to zero and 360 degrees", () => {
    expect(longitudeToZodiac(0.000001)).toEqual({
      sign: "Aries",
      signVietnamese: "Bạch Dương",
      degree: 0,
      minute: 0,
    });
    expect(longitudeToZodiac(359.999999)).toEqual({
      sign: "Pisces",
      signVietnamese: "Song Ngư",
      degree: 29,
      minute: 59,
    });
  });
});

describe("angular geometry", () => {
  it.each([
    [0, 0],
    [360, 0],
    [720.5, 0.5],
    [-0.25, 359.75],
  ])("normalizes %s degrees to %s", (longitude, expected) => {
    expect(normalizeLongitude(longitude)).toBeCloseTo(expected, 12);
  });

  it.each([
    [359, 1, 2],
    [1, 359, 2],
    [10, 190, 180],
    [125, 125, 0],
  ])(
    "finds the shortest distance between %s and %s",
    (first, second, expected) => {
      expect(shortestAngularDistance(first, second)).toBeCloseTo(expected, 12);
    },
  );
});

describe("calculateMajorAspects", () => {
  it.each([
    ["conjunction", "Conjunction", "Đồng cung", 4, 0, 4],
    ["opposition", "Opposition", "Đối đỉnh", 174, 180, 6],
    ["trine", "Trine", "Tam hợp", 118.7, 120, 1.3],
    ["square", "Square", "Vuông", 94, 90, 4],
    ["sextile", "Sextile", "Lục hợp", 56, 60, 4],
  ] as const)(
    "recognizes %s",
    (
      aspect,
      aspectEnglish,
      aspectVietnamese,
      secondLongitude,
      exactAngle,
      expectedOrb,
    ) => {
      const result = calculateMajorAspects([
        { name: "First", longitude: 0 },
        { name: "Second", longitude: secondLongitude },
      ]);

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        body1: "First",
        body2: "Second",
        id: `First-Second-${aspectEnglish}`,
        aspect,
        aspectEnglish,
        aspectVietnamese,
        exactAngle,
        phase: null,
      });
      expect(result[0].actualAngle).toBeCloseTo(secondLongitude, 12);
      expect(result[0].orb).toBeCloseTo(expectedOrb, 12);
    },
  );

  it("does not invent an aspect outside configured orbs", () => {
    expect(
      calculateMajorAspects([
        { name: "First", longitude: 0 },
        { name: "Second", longitude: 30 },
      ]),
    ).toEqual([]);
  });

  it.each([
    [118.5, 118.9, "applying"],
    [118.9, 118.5, "separating"],
    [118.7, 118.7, null],
  ] as const)(
    "classifies aspect motion as %s -> %s: %s",
    (beforeLongitude, afterLongitude, expectedPhase) => {
      const current = [
        { name: "Sun", longitude: 0 },
        { name: "Jupiter", longitude: 118.7 },
      ];
      const before = [
        { name: "Sun", longitude: 0 },
        { name: "Jupiter", longitude: beforeLongitude },
      ];
      const after = [
        { name: "Sun", longitude: 0 },
        { name: "Jupiter", longitude: afterLongitude },
      ];

      expect(calculateMajorAspects(current, before, after)[0].phase).toBe(
        expectedPhase,
      );
    },
  );
});

describe("calculateJulianDay", () => {
  it.each([
    ["2000-01-01T12:00:00Z", 2_451_545.0],
    ["1990-01-15T01:30:00Z", 2_447_906.5625],
    ["2024-07-15T11:00:00Z", 2_460_506.9583333335],
  ])("converts %s to JD", (utcDateTime, expected) => {
    expect(calculateJulianDay(utcDateTime)).toBeCloseTo(expected, 8);
  });
});

type HorizonsCase = {
  label: string;
  input: WesternAstrologyInput;
  expected: Record<string, number>;
};

// Static values queried from NASA/JPL Horizons DE441, geocenter 500@399,
// observer quantity 31 (apparent ecliptic-of-date longitude), on 2026-08-02.
const horizonsCases: HorizonsCase[] = [
  {
    label: "1990-01-15 01:30 UTC",
    input: {
      localDateTime: "1990-01-15T08:30:00",
      utcDateTime: "1990-01-15T01:30:00Z",
      latitude: 10.8231,
      longitude: 106.6297,
      timeZone: "Asia/Ho_Chi_Minh",
    },
    expected: {
      Sun: 294.632763,
      Moon: 162.0074231,
      Mercury: 281.6746404,
      Venus: 300.9442952,
      Mars: 259.5976662,
      Jupiter: 93.4175462,
      Saturn: 287.2629076,
      Uranus: 276.5879094,
      Neptune: 282.5494796,
      Pluto: 227.4192106,
    },
  },
  {
    label: "2000-01-01 12:00 UTC",
    input: {
      localDateTime: "2000-01-01T12:00:00",
      utcDateTime: "2000-01-01T12:00:00Z",
      latitude: 51.5074,
      longitude: -0.1278,
      timeZone: "Europe/London",
    },
    expected: {
      Sun: 280.3689092,
      Moon: 223.323786,
      Mercury: 271.8892699,
      Venus: 241.5657794,
      Mars: 327.9632921,
      Jupiter: 25.2530685,
      Saturn: 40.3956366,
      Uranus: 314.809168,
      Neptune: 303.1930007,
      Pluto: 251.4547644,
    },
  },
  {
    label: "2024-07-15 11:00 UTC",
    input: {
      localDateTime: "2024-07-15T12:00:00",
      utcDateTime: "2024-07-15T11:00:00Z",
      latitude: 51.5074,
      longitude: -0.1278,
      timeZone: "Europe/London",
    },
    expected: {
      Sun: 113.4514056,
      Moon: 220.126476,
      Mercury: 139.3350555,
      Venus: 124.6431917,
      Mars: 56.2342283,
      Jupiter: 71.246636,
      Saturn: 349.2253884,
      Uranus: 56.3193709,
      Neptune: 359.8859681,
      Pluto: 301.0536004,
    },
  },
];

type HouseReferenceCase = {
  label: string;
  input: WesternAstrologyInput;
  ascendant: number;
  midheaven: number;
  houses: number[];
};

// Static Placidus reference rows from the pleiades-houses validation corpus.
// The production calculation does not import or execute that library.
const houseReferenceCases: HouseReferenceCase[] = [
  {
    label: "J2000 at the equator",
    input: {
      localDateTime: "2000-01-01T12:00:00",
      utcDateTime: "2000-01-01T12:00:00Z",
      latitude: 0,
      longitude: 0,
      timeZone: "UTC",
    },
    ascendant: 11.3739,
    midheaven: 279.611088,
    houses: [
      11.3739, 42.906648, 71.960854, 99.611088, 128.040522, 158.849424,
      191.3739, 222.906648, 251.960854, 279.611088, 308.040522, 338.849424,
    ],
  },
  {
    label: "J2000 at 40 degrees north",
    input: {
      localDateTime: "2000-01-01T12:00:00",
      utcDateTime: "2000-01-01T12:00:00Z",
      latitude: 40,
      longitude: 0,
      timeZone: "UTC",
    },
    ascendant: 17.706103,
    midheaven: 279.611088,
    houses: [
      17.706103, 53.858979, 78.399152, 99.611088, 122.382578, 152.464496,
      197.706103, 233.858979, 258.399152, 279.611088, 302.382578, 332.464496,
    ],
  },
  {
    label: "J2000 at 33 degrees south and 20 degrees east",
    input: {
      localDateTime: "2000-01-01T12:00:00",
      utcDateTime: "2000-01-01T12:00:00Z",
      latitude: -33,
      longitude: 20,
      timeZone: "UTC",
    },
    ascendant: 25.786464,
    midheaven: 298.347719,
    houses: [
      25.786464, 54.289293, 85.436069, 118.347719, 150.862495, 180.419449,
      205.786464, 234.289293, 265.436069, 298.347719, 330.862495, 0.419449,
    ],
  },
];

describe("calculateWesternAstrology", () => {
  it.each(horizonsCases)(
    "matches JPL Horizons for $label within 0.01 degrees",
    ({ input, expected }) => {
      const result = calculateWesternAstrology(input);

      expect(result.system).toBe("Tropical Zodiac");
      expect(result.bodies).toHaveLength(10);

      for (const body of result.bodies) {
        expect(
          angularDistance(body.longitude, expected[body.name]),
          `${body.name} differs from JPL Horizons`,
        ).toBeLessThanOrEqual(horizonsToleranceDegrees);
      }
    },
  );

  it.each(houseReferenceCases)(
    "matches independent ASC, MC and Placidus cusps for $label within 0.0003 degrees",
    ({ input, ascendant, midheaven, houses }) => {
      const result = calculateWesternAstrology(input);
      const ascResult = result.angles.find(({ name }) => name === "ASC");
      const mcResult = result.angles.find(({ name }) => name === "MC");

      expect(result.houseSystem).toBe("Placidus");
      expect(result.angles).toHaveLength(2);
      expect(result.houses).toHaveLength(12);
      expect(
        angularDistance(ascResult?.longitude ?? Number.NaN, ascendant),
      ).toBeLessThanOrEqual(houseReferenceToleranceDegrees);
      expect(
        angularDistance(mcResult?.longitude ?? Number.NaN, midheaven),
      ).toBeLessThanOrEqual(houseReferenceToleranceDegrees);

      result.houses.forEach((house, index) => {
        expect(
          angularDistance(house.longitude, houses[index]),
          `House ${house.house} differs from the reference corpus`,
        ).toBeLessThanOrEqual(houseReferenceToleranceDegrees);
      });
    },
  );

  it.each(finalValidationCases)(
    "preserves all chart invariants for $label",
    ({ input }) => {
      const result = calculateWesternAstrology(input);
      const ascendant = result.angles.find(({ name }) => name === "ASC");
      const midheaven = result.angles.find(({ name }) => name === "MC");

      expect(result.houses[0].longitude).toBeCloseTo(
        ascendant?.longitude ?? Number.NaN,
        12,
      );
      expect(result.houses[9].longitude).toBeCloseTo(
        midheaven?.longitude ?? Number.NaN,
        12,
      );
      expect(
        angularDistance(
          result.houses[0].longitude,
          result.houses[6].longitude,
        ),
      ).toBeCloseTo(180, 12);
      expect(
        angularDistance(
          result.houses[3].longitude,
          result.houses[9].longitude,
        ),
      ).toBeCloseTo(180, 12);

      for (const body of result.bodies) {
        expect(body.longitude).toBeGreaterThanOrEqual(0);
        expect(body.longitude).toBeLessThan(360);
        expect(body.house).toBeGreaterThanOrEqual(1);
        expect(body.house).toBeLessThanOrEqual(12);
        expect(findHouseForLongitude(body.longitude, result.houses)).toBe(
          body.house,
        );
      }

      for (const house of result.houses) {
        expect(house.longitude).toBeGreaterThanOrEqual(0);
        expect(house.longitude).toBeLessThan(360);
      }

      for (const aspect of result.aspects) {
        expect(aspect.orb).toBeCloseTo(
          Math.abs(aspect.actualAngle - aspect.exactAngle),
          12,
        );
        expect(aspect.id).toBe(
          `${aspect.body1}-${aspect.body2}-${aspect.aspectEnglish}`,
        );
      }
    },
  );

  it.each(finalValidationCases)(
    "matches both final reference sources for $label",
    ({ input, bodies, astrologHouses, circularHouses, aspects }) => {
      const result = calculateWesternAstrology(input);

      for (const body of result.bodies) {
        const reference = bodies[body.name];

        expect(
          angularDistance(body.longitude, reference.astrolog),
          `${body.name} differs from Astrolog/Moshier`,
        ).toBeLessThanOrEqual(astrologPlanetToleranceDegrees);
        expect(
          angularDistance(body.longitude, reference.circular),
          `${body.name} differs from CircularNatalHoroscopeJS`,
        ).toBeLessThanOrEqual(circularPlanetToleranceDegrees);
        expect(body.retrograde).toBe(reference.retrograde);
        expect(body.house).toBe(reference.house);
      }

      result.houses.forEach((house, index) => {
        expect(
          angularDistance(house.longitude, astrologHouses[index]),
          `House ${house.house} differs from Astrolog/Moshier`,
        ).toBeLessThanOrEqual(astrologHouseToleranceDegrees);
        expect(
          angularDistance(house.longitude, circularHouses[index]),
          `House ${house.house} differs from CircularNatalHoroscopeJS`,
        ).toBeLessThanOrEqual(circularHouseToleranceDegrees);
      });

      expect(result.aspects.map(({ id }) => id).sort()).toEqual(
        aspects.map(([id]) => id).sort(),
      );

      for (const [id, circularOrb, astrologPhase, circularPhase] of aspects) {
        const aspect = result.aspects.find((candidate) => candidate.id === id);

        expect(aspect, `${id} is missing`).toBeDefined();
        expect(
          Math.abs((aspect?.orb ?? Number.NaN) - circularOrb),
          `${id} orb differs from CircularNatalHoroscopeJS`,
        ).toBeLessThanOrEqual(circularAspectOrbToleranceDegrees);
        expect(aspect?.phase).toBe(astrologPhase);

        if (circularPhase !== null) {
          expect(aspect?.phase).toBe(circularPhase);
        }
      }
    },
  );

  it("rejects an invalid UTC date-time", () => {
    expect(() =>
      calculateWesternAstrology({
        ...horizonsCases[0].input,
        utcDateTime: "not-a-date",
      }),
    ).toThrow("UTC date-time");
  });

  it("rejects coordinates outside the normalized range", () => {
    expect(() =>
      calculateWesternAstrology({
        ...horizonsCases[0].input,
        latitude: 90.1,
      }),
    ).toThrow("normalized");
  });

  it("fails clearly when Placidus is undefined near the polar circle", () => {
    expect(() =>
      calculateWesternAstrology({
        ...horizonsCases[0].input,
        latitude: 67,
      }),
    ).toThrow(PlacidusCalculationError);
    expect(() =>
      calculateWesternAstrology({
        ...horizonsCases[0].input,
        latitude: 67,
      }),
    ).toThrow("không xác định trong vùng gần vòng cực");
  });
});
