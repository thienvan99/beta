import { describe, expect, it } from "vitest";
import { westernPlanetHouseInterpretationRules } from "../data/western-planet-house-interpretations";
import type { CelestialBodyPosition } from "./western-astrology";
import {
  getPlanetHouseInterpretationRule,
  interpretWesternPlanetHouses,
} from "./western-planet-house-interpretation";

function body(name: string, house: number): CelestialBodyPosition {
  return {
    name,
    house,
    longitude: 10,
    sign: "Aries",
    signVietnamese: "Bạch Dương",
    degree: 10,
    minute: 0,
    retrograde: false,
  };
}

describe("planet-in-house interpretation", () => {
  it("contains exactly one complete rule for each implemented body and house", () => {
    expect(westernPlanetHouseInterpretationRules).toHaveLength(120);
    expect(
      new Set(westernPlanetHouseInterpretationRules.map(({ ruleId }) => ruleId))
        .size,
    ).toBe(120);

    for (const body of [
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
    ] as const) {
      const rules = westernPlanetHouseInterpretationRules.filter(
        ({ evidence }) => evidence.body === body,
      );
      expect(rules).toHaveLength(12);
      expect(
        rules
          .map(({ evidence }) => evidence.house)
          .sort((first, second) => first - second),
      ).toEqual(Array.from({ length: 12 }, (_, index) => index + 1));
    }

    for (const rule of westernPlanetHouseInterpretationRules) {
      expect(rule.ruleId).toBe(
        `WESTERN-${rule.evidence.body.toUpperCase()}-HOUSE-${rule.evidence.house}-V1`,
      );
      expect(rule.rulesetId).toBe("western-planet-house-v1");
      expect(rule.version).toBe("1.0.0");
      expect(rule.title.trim()).not.toBe("");
      expect(rule.coreMeaning.trim()).not.toBe("");
      expect(rule.strengths.length).toBeGreaterThan(0);
      expect(rule.challenges.length).toBeGreaterThan(0);
      expect(rule.developmentDirection.length).toBeGreaterThan(0);
      expect(rule.strengths.every((item) => item.trim().length > 0)).toBe(true);
      expect(rule.challenges.every((item) => item.trim().length > 0)).toBe(true);
      expect(
        rule.developmentDirection.every((item) => item.trim().length > 0),
      ).toBe(true);
    }
  });

  it.each(Array.from({ length: 12 }, (_, index) => index + 1))(
    "resolves the Sun in House %s rule",
    (house) => {
      expect(getPlanetHouseInterpretationRule("Sun", house)).toMatchObject({
        ruleId: `WESTERN-SUN-HOUSE-${house}-V1`,
        title: `Mặt Trời ở Nhà ${house}`,
        evidence: { body: "Sun", house },
      });
    },
  );

  it.each(Array.from({ length: 12 }, (_, index) => index + 1))(
    "resolves the Moon in House %s rule",
    (house) => {
      expect(getPlanetHouseInterpretationRule("Moon", house)).toMatchObject({
        ruleId: `WESTERN-MOON-HOUSE-${house}-V1`,
        title: `Mặt Trăng ở Nhà ${house}`,
        evidence: { body: "Moon", house },
      });
    },
  );

  it.each(Array.from({ length: 12 }, (_, index) => index + 1))(
    "resolves Mercury in House %s rule",
    (house) => {
      expect(getPlanetHouseInterpretationRule("Mercury", house)).toMatchObject({
        ruleId: `WESTERN-MERCURY-HOUSE-${house}-V1`,
        title: `Sao Thủy ở Nhà ${house}`,
        evidence: { body: "Mercury", house },
      });
    },
  );

  it.each(Array.from({ length: 12 }, (_, index) => index + 1))(
    "resolves Venus in House %s rule",
    (house) => {
      expect(getPlanetHouseInterpretationRule("Venus", house)).toMatchObject({
        ruleId: `WESTERN-VENUS-HOUSE-${house}-V1`,
        title: `Sao Kim ở Nhà ${house}`,
        evidence: { body: "Venus", house },
      });
    },
  );

  it.each(Array.from({ length: 12 }, (_, index) => index + 1))(
    "resolves Mars in House %s rule",
    (house) => {
      expect(getPlanetHouseInterpretationRule("Mars", house)).toMatchObject({
        ruleId: `WESTERN-MARS-HOUSE-${house}-V1`,
        title: `Sao Hỏa ở Nhà ${house}`,
        evidence: { body: "Mars", house },
      });
    },
  );

  it.each(Array.from({ length: 12 }, (_, index) => index + 1))(
    "resolves Jupiter in House %s rule",
    (house) => {
      expect(getPlanetHouseInterpretationRule("Jupiter", house)).toMatchObject({
        ruleId: `WESTERN-JUPITER-HOUSE-${house}-V1`,
        title: `Sao Mộc ở Nhà ${house}`,
        evidence: { body: "Jupiter", house },
      });
    },
  );

  it.each(Array.from({ length: 12 }, (_, index) => index + 1))(
    "resolves Saturn in House %s rule",
    (house) => {
      expect(getPlanetHouseInterpretationRule("Saturn", house)).toMatchObject({
        ruleId: `WESTERN-SATURN-HOUSE-${house}-V1`,
        title: `Sao Thổ ở Nhà ${house}`,
        evidence: { body: "Saturn", house },
      });
    },
  );

  it.each(Array.from({ length: 12 }, (_, index) => index + 1))(
    "resolves Uranus in House %s rule",
    (house) => {
      expect(getPlanetHouseInterpretationRule("Uranus", house)).toMatchObject({
        ruleId: `WESTERN-URANUS-HOUSE-${house}-V1`,
        title: `Thiên Vương ở Nhà ${house}`,
        evidence: { body: "Uranus", house },
      });
    },
  );

  it.each(Array.from({ length: 12 }, (_, index) => index + 1))(
    "resolves Neptune in House %s rule",
    (house) => {
      expect(getPlanetHouseInterpretationRule("Neptune", house)).toMatchObject({
        ruleId: `WESTERN-NEPTUNE-HOUSE-${house}-V1`,
        title: `Hải Vương ở Nhà ${house}`,
        evidence: { body: "Neptune", house },
      });
    },
  );

  it.each(Array.from({ length: 12 }, (_, index) => index + 1))(
    "resolves Pluto in House %s rule",
    (house) => {
      expect(getPlanetHouseInterpretationRule("Pluto", house)).toMatchObject({
        ruleId: `WESTERN-PLUTO-HOUSE-${house}-V1`,
        title: `Diêm Vương ở Nhà ${house}`,
        evidence: { body: "Pluto", house },
      });
    },
  );

  it("preserves all one hundred eight existing rules", () => {
    for (const body of [
      "Sun",
      "Moon",
      "Mercury",
      "Venus",
      "Mars",
      "Jupiter",
      "Saturn",
      "Uranus",
      "Neptune",
    ] as const) {
      expect(
        westernPlanetHouseInterpretationRules
          .filter(({ evidence }) => evidence.body === body)
          .map(({ ruleId }) => ruleId),
      ).toEqual(
        Array.from(
          { length: 12 },
          (_, index) =>
            `WESTERN-${body.toUpperCase()}-HOUSE-${index + 1}-V1`,
        ),
      );
    }
  });

  it("returns no fabricated rule for combinations not implemented", () => {
    expect(getPlanetHouseInterpretationRule("Pluto", 13)).toBeNull();
  });

  it("uses and preserves the calculated body.house assignment", () => {
    const sun = body("Sun", 1);
    const moon = body("Moon", 1);
    const mercury = body("Mercury", 1);
    const venus = body("Venus", 1);
    const mars = body("Mars", 1);
    const jupiter = body("Jupiter", 1);
    const saturn = body("Saturn", 1);
    const uranus = body("Uranus", 1);
    const neptune = body("Neptune", 1);
    const pluto = body("Pluto", 1);
    const bodies = [
      sun,
      moon,
      mercury,
      venus,
      mars,
      jupiter,
      saturn,
      uranus,
      neptune,
      pluto,
    ];
    const snapshot = structuredClone(bodies);

    const interpretation = interpretWesternPlanetHouses({ bodies });

    expect(interpretation).toHaveLength(10);
    expect(interpretation[0].body).toBe(sun);
    expect(interpretation[0].body.house).toBe(1);
    expect(interpretation[1].body).toBe(moon);
    expect(interpretation[1].body.house).toBe(1);
    expect(interpretation[2].body).toBe(mercury);
    expect(interpretation[2].body.house).toBe(1);
    expect(interpretation[3].body).toBe(venus);
    expect(interpretation[3].body.house).toBe(1);
    expect(interpretation[4].body).toBe(mars);
    expect(interpretation[4].body.house).toBe(1);
    expect(interpretation[5].body).toBe(jupiter);
    expect(interpretation[5].body.house).toBe(1);
    expect(interpretation[6].body).toBe(saturn);
    expect(interpretation[6].body.house).toBe(1);
    expect(interpretation[7].body).toBe(uranus);
    expect(interpretation[7].body.house).toBe(1);
    expect(interpretation[8].body).toBe(neptune);
    expect(interpretation[8].body.house).toBe(1);
    expect(interpretation[9].body).toBe(pluto);
    expect(interpretation[9].body.house).toBe(1);
    expect(bodies).toEqual(snapshot);
  });
});
