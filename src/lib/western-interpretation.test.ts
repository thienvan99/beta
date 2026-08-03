import { describe, expect, it } from "vitest";
import {
  coreInterpretationFactors,
  westernCoreInterpretationRules,
  zodiacSignQualities,
} from "../data/western-core-interpretations";
import {
  calculateWesternAstrology,
  zodiacSigns,
} from "./western-astrology";
import {
  getCoreInterpretationRule,
  interpretWesternCoreTriad,
  westernInterpretationDisclaimer,
} from "./western-interpretation";

const vietnamBirthInput = {
  localDateTime: "1990-01-15T08:30:00",
  utcDateTime: "1990-01-15T01:30:00Z",
  latitude: 10.8231,
  longitude: 106.6297,
  timeZone: "Asia/Ho_Chi_Minh",
} as const;

describe("western core interpretation rules", () => {
  it("contains exactly 36 complete rules", () => {
    expect(coreInterpretationFactors).toHaveLength(3);
    expect(zodiacSigns).toHaveLength(12);
    expect(westernCoreInterpretationRules).toHaveLength(36);
    expect(new Set(westernCoreInterpretationRules.map(({ ruleId }) => ruleId)).size)
      .toBe(36);

    for (const rule of westernCoreInterpretationRules) {
      expect(rule.summary.trim()).not.toBe("");
      expect(rule.strengths.length).toBeGreaterThanOrEqual(2);
      expect(rule.challenges.length).toBeGreaterThanOrEqual(2);
      expect(rule.developmentAdvice.length).toBeGreaterThanOrEqual(2);
      expect(rule.strengths.every((item) => item.trim().length > 0)).toBe(true);
      expect(rule.challenges.every((item) => item.trim().length > 0)).toBe(true);
      expect(
        rule.developmentAdvice.every((item) => item.trim().length > 0),
      ).toBe(true);
      expect(rule.version).toBe("1.0.0");
    }
  });

  it("selects the correct Sun interpretation by sign", () => {
    expect(getCoreInterpretationRule("Sun", "Scorpio")).toMatchObject({
      ruleId: "WESTERN-SUN-SCORPIO-V1",
      title: "Mặt Trời Bọ Cạp",
      evidence: { body: "Sun", sign: "Scorpio" },
    });
  });

  it("selects the correct Moon interpretation by sign", () => {
    expect(getCoreInterpretationRule("Moon", "Cancer")).toMatchObject({
      ruleId: "WESTERN-MOON-CANCER-V1",
      title: "Mặt Trăng Cự Giải",
      evidence: { body: "Moon", sign: "Cancer" },
    });
  });

  it("selects the correct ASC interpretation by sign", () => {
    expect(getCoreInterpretationRule("ASC", "Aquarius")).toMatchObject({
      ruleId: "WESTERN-ASC-AQUARIUS-V1",
      title: "Cung Mọc Bảo Bình",
      evidence: { body: "ASC", sign: "Aquarius" },
    });
  });

  it("keeps rule IDs stable for every factor and sign", () => {
    for (const body of coreInterpretationFactors) {
      for (const sign of zodiacSigns) {
        expect(getCoreInterpretationRule(body, sign).ruleId).toBe(
          `WESTERN-${body.toUpperCase()}-${sign.toUpperCase()}-V1`,
        );
      }
    }
  });

  it("defines element and modality for all twelve signs", () => {
    expect(Object.keys(zodiacSignQualities)).toHaveLength(12);
    expect(zodiacSignQualities.Aries).toEqual({
      element: "Lửa",
      modality: "Tiên phong",
    });
    expect(zodiacSignQualities.Scorpio).toEqual({
      element: "Nước",
      modality: "Kiên định",
    });
    expect(zodiacSignQualities.Pisces).toEqual({
      element: "Nước",
      modality: "Linh hoạt",
    });
  });
});

describe("interpretWesternCoreTriad", () => {
  it("uses the calculated Sun, Moon and ASC positions", () => {
    const result = calculateWesternAstrology(vietnamBirthInput);
    const interpretation = interpretWesternCoreTriad(result);

    expect(
      interpretation.positions.map(({ factor, sign }) => [factor, sign]),
    ).toEqual([
      ["Sun", "Capricorn"],
      ["Moon", "Virgo"],
      ["ASC", "Aquarius"],
    ]);
    expect(interpretation.disclaimer).toBe(westernInterpretationDisclaimer);
  });

  it("returns the same synthesis for the same input", () => {
    const result = calculateWesternAstrology(vietnamBirthInput);
    const first = interpretWesternCoreTriad(result);
    const second = interpretWesternCoreTriad(result);

    expect(second.synthesis).toEqual(first.synthesis);
    expect(JSON.stringify(second)).toBe(JSON.stringify(first));
  });

  it("does not mutate calculation engine output", () => {
    const result = calculateWesternAstrology(vietnamBirthInput);
    const snapshot = structuredClone(result);

    interpretWesternCoreTriad(result);

    expect(result).toEqual(snapshot);
  });
});
