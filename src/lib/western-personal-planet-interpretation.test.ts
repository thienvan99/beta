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
  it("contains exactly 12 complete Mercury rules", () => {
    expect(personalPlanetInterpretationFactors).toEqual(["Mercury"]);
    expect(westernPersonalPlanetInterpretationRules).toHaveLength(12);
    expect(
      new Set(
        westernPersonalPlanetInterpretationRules.map(({ ruleId }) => ruleId),
      ).size,
    ).toBe(12);

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
      expect(rule.evidence.body).toBe("Mercury");
    }
  });

  it("covers all twelve zodiac signs", () => {
    expect(
      westernPersonalPlanetInterpretationRules
        .map(({ evidence }) => evidence.sign)
        .sort(),
    ).toEqual([...zodiacSigns].sort());
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

  it("keeps rule IDs stable for every sign", () => {
    for (const sign of zodiacSigns) {
      expect(getPersonalPlanetInterpretationRule("Mercury", sign).ruleId).toBe(
        `WESTERN-MERCURY-${sign.toUpperCase()}-V1`,
      );
    }
  });
});

describe("interpretWesternPersonalPlanets", () => {
  it("uses the calculated Mercury position", () => {
    const result = calculateWesternAstrology(vietnamBirthInput);
    const interpretation = interpretWesternPersonalPlanets(result);

    expect(
      interpretation.positions.map(({ factor, sign, rule }) => [
        factor,
        sign,
        rule.ruleId,
      ]),
    ).toEqual([
      ["Mercury", "Capricorn", "WESTERN-MERCURY-CAPRICORN-V1"],
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

  it("keeps evidence traceable from the selected output", () => {
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
});
