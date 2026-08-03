import { describe, expect, it } from "vitest";
import {
  annularSegmentPath,
  formatSvgNumber,
  findHouseForLongitude,
  getBodyExactPoint,
  getHouseCuspPoint,
  layoutBodyMarkers,
  longitudeToSvgAngle,
  normalizeChartAngle,
  pointAtSvgAngle,
  roundSvgNumber,
  svgCoordinatePrecision,
} from "./western-chart-geometry";
import { calculateWesternAstrology } from "./western-astrology";

function expectPointClose(
  actual: Readonly<{ x: number; y: number }>,
  expected: Readonly<{ x: number; y: number }>,
) {
  expect(actual.x).toBeCloseTo(expected.x, 10);
  expect(actual.y).toBeCloseTo(expected.y, 10);
}

function expectAtMostSvgPrecision(value: string) {
  const numbers = value.match(/-?\d+(?:\.\d+)?/g) ?? [];

  for (const number of numbers) {
    const decimal = number.split(".")[1] ?? "";
    expect(decimal.length, `${number} exceeds SVG precision`).toBeLessThanOrEqual(
      svgCoordinatePrecision,
    );
  }
}

describe("western chart angle geometry", () => {
  it("uses one canonical SVG number format", () => {
    expect(roundSvgNumber(123.123456789)).toBe(123.123457);
    expect(roundSvgNumber(-0.0000001)).toBe(0);
    expect(formatSvgNumber(123.12)).toBe("123.12");
    expect(formatSvgNumber(-0.0000001)).toBe("0");
  });

  it.each([
    [0, 0],
    [360, 0],
    [721.5, 1.5],
    [-1, 359],
  ])("normalizes %s degrees to %s", (angle, expected) => {
    expect(normalizeChartAngle(angle)).toBeCloseTo(expected, 12);
  });

  it("rotates zodiac longitude around the ascendant", () => {
    const ascendant = 125;

    expect(longitudeToSvgAngle(ascendant, ascendant)).toBe(180);
    expect(longitudeToSvgAngle(ascendant + 90, ascendant)).toBe(90);
    expect(longitudeToSvgAngle(ascendant - 90, ascendant)).toBe(270);
  });

  it("places ASC at the left edge of the chart", () => {
    expectPointClose(getHouseCuspPoint(125, 125, 200), {
      x: 120,
      y: 320,
    });
  });

  it("places a house cusp from its real longitude", () => {
    expectPointClose(getHouseCuspPoint(215, 125, 200), {
      x: 320,
      y: 520,
    });
  });

  it("places a celestial body from its real longitude", () => {
    expectPointClose(getBodyExactPoint(35, 125, 200), {
      x: 320,
      y: 120,
    });
  });

  it("creates the exact same annular path on every run", () => {
    const paths = Array.from({ length: 100 }, () =>
      annularSegmentPath(173.123456789, 143.123456789, 308, 252),
    );

    expect(new Set(paths)).toEqual(new Set([paths[0]]));
  });

  it("limits all generated SVG coordinates to six decimal places", () => {
    const values = [
      annularSegmentPath(173.123456789, 143.123456789, 308, 252),
      ...Array.from({ length: 36 }, (_, index) => {
        const point = pointAtSvgAngle(index * 10 + 0.123456789, 232);
        return `${point.x} ${point.y}`;
      }),
    ];

    for (const value of values) {
      expectAtMostSvgPrecision(value);
    }
  });
});

describe("western chart body layout", () => {
  it("spreads nearby markers without changing calculation data", () => {
    const bodies = [
      { name: "Sun", longitude: 100 },
      { name: "Mercury", longitude: 101 },
      { name: "Venus", longitude: 102 },
      { name: "Mars", longitude: 103 },
      { name: "Moon", longitude: 104 },
    ] as const;
    const snapshot = bodies.map((body) => ({ ...body }));
    const placements = layoutBodyMarkers(bodies, 100);

    expect(bodies).toEqual(snapshot);
    expect(placements.map(({ body }) => body.longitude).sort()).toEqual(
      snapshot.map(({ longitude }) => longitude).sort(),
    );
    expect(new Set(placements.map(({ displayRadius }) => displayRadius)).size)
      .toBeGreaterThan(1);

    for (const placement of placements) {
      expectPointClose(
        placement.exactPoint,
        getBodyExactPoint(placement.body.longitude, 100, 232),
      );
    }
  });

  it("finds the Placidus house containing a longitude", () => {
    const houses = Array.from({ length: 12 }, (_, index) => ({
      house: index + 1,
      longitude: (100 + index * 30) % 360,
    }));

    expect(findHouseForLongitude(100, houses)).toBe(1);
    expect(findHouseForLongitude(129.999, houses)).toBe(1);
    expect(findHouseForLongitude(130, houses)).toBe(2);
    expect(findHouseForLongitude(130 - 1e-8, houses)).toBe(1);
    expect(findHouseForLongitude(130 - 5e-10, houses)).toBe(2);
    expect(findHouseForLongitude(90, houses)).toBe(12);
  });

  it("does not mutate a complete calculation result", () => {
    const result = calculateWesternAstrology({
      localDateTime: "1990-01-15T08:30:00",
      utcDateTime: "1990-01-15T01:30:00Z",
      latitude: 10.8231,
      longitude: 106.6297,
      timeZone: "Asia/Ho_Chi_Minh",
    });
    const snapshot = structuredClone(result);
    const ascendant = result.angles.find(({ name }) => name === "ASC");

    expect(ascendant).toBeDefined();
    layoutBodyMarkers(result.bodies, ascendant?.longitude ?? 0);

    for (const house of result.houses) {
      getHouseCuspPoint(house.longitude, ascendant?.longitude ?? 0, 252);
    }

    for (const body of result.bodies) {
      getBodyExactPoint(body.longitude, ascendant?.longitude ?? 0, 232);
      findHouseForLongitude(body.longitude, result.houses);
    }

    expect(result).toEqual(snapshot);
  });
});
