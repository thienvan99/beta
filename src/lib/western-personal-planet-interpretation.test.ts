import { describe, expect, it } from "vitest";
import {
  personalPlanetInterpretationFactors,
  westernPersonalPlanetInterpretationRules,
} from "../data/western-personal-planet-interpretations";
import {
  calculateWesternAstrology,
  zodiacSigns,
  type WesternAstrologyResult,
} from "./western-astrology";
import {
  WesternPersonalPlanetInterpretationError,
  getPersonalPlanetInterpretationRule,
  interpretWesternPersonalPlanets,
} from "./western-personal-planet-interpretation";

const vietnamBirthInput = {
  localDateTime: "1990-01-15T08:30:00",
  utcDateTime: "1990-01-15T01:30:00Z",
  latitude: 10.8231,
  longitude: 106.6297,
  timeZone: "Asia/Ho_Chi_Minh",
} as const;

describe("western personal planet interpretation rules", () => {
  it("contains exactly 24 complete Mercury and Venus rules", () => {
    expect(personalPlanetInterpretationFactors).toEqual(["Mercury", "Venus"]);
    expect(westernPersonalPlanetInterpretationRules).toHaveLength(24);
    expect(
      new Set(
        westernPersonalPlanetInterpretationRules.map(({ ruleId }) => ruleId),
      ).size,
    ).toBe(24);

    for (const rule of westernPersonalPlanetInterpretationRules) {
      expect(rule.summary.trim()).not.toBe("");
      expect(rule.strengths.length).toBeGreaterThanOrEqual(2);
      expect(rule.challenges.length).toBeGreaterThanOrEqual(2);
      expect(rule.developmentAdvice.length).toBeGreaterThanOrEqual(2);
      expect(rule.strengths.every((item) => item.trim().length > 0)).toBe(
        true,
      );
      expect(rule.challenges.every((item) => item.trim().length > 0)).toBe(
        true,
      );
      expect(
        rule.developmentAdvice.every((item) => item.trim().length > 0),
      ).toBe(true);
      expect(rule.version).toBe("1.0.0");
      expect(personalPlanetInterpretationFactors).toContain(
        rule.evidence.body,
      );
    }
  });

  it("covers all twelve zodiac signs for Mercury and Venus", () => {
    for (const factor of personalPlanetInterpretationFactors) {
      expect(
        westernPersonalPlanetInterpretationRules
          .filter(({ evidence }) => evidence.body === factor)
          .map(({ evidence }) => evidence.sign)
          .sort(),
      ).toEqual([...zodiacSigns].sort());
    }
  });

  it("selects the correct Mercury interpretation by sign", () => {
    expect(getPersonalPlanetInterpretationRule("Mercury", "Aries")).toMatchObject(
      {
        ruleId: "WESTERN-MERCURY-ARIES-V1",
        title: "Sao Thủy Bạch Dương",
        evidence: { body: "Mercury", sign: "Aries" },
      },
    );
  });

  it("selects the correct Venus interpretation by sign", () => {
    expect(getPersonalPlanetInterpretationRule("Venus", "Aries")).toMatchObject(
      {
        ruleId: "WESTERN-VENUS-ARIES-V1",
        title: "Sao Kim Bạch Dương",
        evidence: { body: "Venus", sign: "Aries" },
      },
    );
  });

  it("keeps rule IDs stable for every sign", () => {
    for (const sign of zodiacSigns) {
      expect(getPersonalPlanetInterpretationRule("Mercury", sign).ruleId).toBe(
        `WESTERN-MERCURY-${sign.toUpperCase()}-V1`,
      );
      expect(getPersonalPlanetInterpretationRule("Venus", sign).ruleId).toBe(
        `WESTERN-VENUS-${sign.toUpperCase()}-V1`,
      );
    }
  });
});

describe("interpretWesternPersonalPlanets", () => {
  it("uses the calculated Mercury and Venus positions in order", () => {
    const result = calculateWesternAstrology(vietnamBirthInput);
    const interpretation = interpretWesternPersonalPlanets(result);
    const mercury = result.bodies.find(({ name }) => name === "Mercury");
    const venus = result.bodies.find(({ name }) => name === "Venus");

    expect(
      interpretation.positions.map(({ factor, sign, rule }) => [
        factor,
        sign,
        rule.ruleId,
      ]),
    ).toEqual([
      [
        "Mercury",
        mercury?.sign,
        `WESTERN-MERCURY-${mercury?.sign.toUpperCase()}-V1`,
      ],
      ["Venus", venus?.sign, `WESTERN-VENUS-${venus?.sign.toUpperCase()}-V1`],
    ]);
  });

  it("returns the same output for the same input", () => {
    const result = calculateWesternAstrology(vietnamBirthInput);
    const first = interpretWesternPersonalPlanets(result);
    const second = interpretWesternPersonalPlanets(result);

    expect(second).toEqual(first);
    expect(JSON.stringify(second)).toBe(JSON.stringify(first));
  });

  it("does not mutate calculation engine output", () => {
    const result = calculateWesternAstrology(vietnamBirthInput);
    const snapshot = structuredClone(result);

    interpretWesternPersonalPlanets(result);

    expect(result).toEqual(snapshot);
  });

  it("keeps Mercury evidence traceable from the selected output", () => {
    const result = calculateWesternAstrology(vietnamBirthInput);
    const [position] = interpretWesternPersonalPlanets(result).positions;

    expect(position.rule).toMatchObject({
      ruleId: "WESTERN-MERCURY-CAPRICORN-V1",
      version: "1.0.0",
      evidence: {
        body: "Mercury",
        sign: "Capricorn",
      },
    });
    expect(position.longitude).toBe(
      result.bodies.find(({ name }) => name === "Mercury")?.longitude,
    );
  });

  it("keeps Venus evidence traceable from the selected output", () => {
    const result = calculateWesternAstrology(vietnamBirthInput);
    const venus = result.bodies.find(({ name }) => name === "Venus");
    const position = interpretWesternPersonalPlanets(result).positions.find(
      ({ factor }) => factor === "Venus",
    );

    expect(position).toMatchObject({
      factor: "Venus",
      longitude: venus?.longitude,
      sign: venus?.sign,
      degree: venus?.degree,
      minute: venus?.minute,
      retrograde: venus?.retrograde,
      rule: {
        ruleId: `WESTERN-VENUS-${venus?.sign.toUpperCase()}-V1`,
        version: "1.0.0",
        evidence: {
          body: "Venus",
          sign: venus?.sign,
        },
      },
    });
  });

  it("fails clearly when Mercury is missing", () => {
    const result = calculateWesternAstrology(vietnamBirthInput);
    const missingMercury: WesternAstrologyResult = {
      ...result,
      bodies: result.bodies.filter(({ name }) => name !== "Mercury"),
    };

    expect(() => interpretWesternPersonalPlanets(missingMercury)).toThrow(
      WesternPersonalPlanetInterpretationError,
    );
    expect(() => interpretWesternPersonalPlanets(missingMercury)).toThrow(
      "Mercury",
    );
  });

  it("fails clearly when Venus is missing", () => {
    const result = calculateWesternAstrology(vietnamBirthInput);
    const missingVenus: WesternAstrologyResult = {
      ...result,
      bodies: result.bodies.filter(({ name }) => name !== "Venus"),
    };

    expect(() => interpretWesternPersonalPlanets(missingVenus)).toThrow(
      WesternPersonalPlanetInterpretationError,
    );
    expect(() => interpretWesternPersonalPlanets(missingVenus)).toThrow(
      "Venus",
    );
  });
});
