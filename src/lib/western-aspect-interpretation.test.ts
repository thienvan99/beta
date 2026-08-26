import { describe, expect, it } from "vitest";
import { westernAspectInterpretationRules } from "../data/western-aspect-interpretations";
import { westernPlanetHouseInterpretationRules } from "../data/western-planet-house-interpretations";
import type { MajorAspect } from "./western-astrology";
import {
  canonicalizeAspectBodyPair,
  getAspectInterpretationRule,
  interpretWesternAspects,
} from "./western-aspect-interpretation";

const aspect: MajorAspect = {
  id: "Moon-Sun-Trine",
  body1: "Moon",
  body2: "Sun",
  aspect: "trine",
  aspectEnglish: "Trine",
  aspectVietnamese: "Tam hợp",
  exactAngle: 120,
  actualAngle: 119.4,
  orb: 0.6,
  phase: "applying",
};

describe("western aspect interpretation", () => {
  it("contains unique rule IDs and preserves rule integrity", () => {
    expect(
      new Set(westernAspectInterpretationRules.map(({ ruleId }) => ruleId))
        .size,
    ).toBe(westernAspectInterpretationRules.length);
    const sunMoonRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Sun" && body2 === "Moon",
    );
    expect(sunMoonRules).toHaveLength(5);
    expect(
      sunMoonRules.map(({ aspect }) => aspect).sort(),
    ).toEqual(
      ["conjunction", "opposition", "trine", "square", "sextile"].sort(),
    );

    for (const rule of westernAspectInterpretationRules) {
      expect(rule.rulesetId).toBe("western-aspect-interpretation-v1");
      expect(rule.version).toBe("1.0.0");
      expect(rule.title.trim()).not.toBe("");
      expect(rule.coreMeaning.trim()).not.toBe("");
      expect(rule.strengths.length).toBeGreaterThan(0);
      expect(rule.challenges.length).toBeGreaterThan(0);
      expect(rule.developmentAdvice.length).toBeGreaterThan(0);
      expect(rule.evidence).toEqual({
        body1: rule.body1,
        body2: rule.body2,
        aspect: rule.aspect,
      });
    }

    const serializedRules = JSON.stringify(westernAspectInterpretationRules);
    expect(serializedRules).not.toContain("ngân sách");
    expect(serializedRules).not.toMatch(/\broutine\b/i);
  });

  it("contains and resolves all five Sun-Mars rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const sunMarsRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Sun" && body2 === "Mars",
    );

    expect(sunMarsRules).toHaveLength(5);
    expect(sunMarsRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Sun",
        "Mars",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-SUN-MARS-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Sun",
        body2: "Mars",
        aspect: aspectCode,
      });
      expect(getAspectInterpretationRule("Mars", "Sun", aspectCode)).toBe(
        directRule,
      );
    }
  });

  it("contains and resolves all five Sun-Jupiter rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const sunJupiterRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Sun" && body2 === "Jupiter",
    );

    expect(sunJupiterRules).toHaveLength(5);
    expect(sunJupiterRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Sun",
        "Jupiter",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-SUN-JUPITER-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Sun",
        body2: "Jupiter",
        aspect: aspectCode,
      });
      expect(getAspectInterpretationRule("Jupiter", "Sun", aspectCode)).toBe(
        directRule,
      );
    }
  });

  it("contains and resolves all five Sun-Saturn rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const sunSaturnRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Sun" && body2 === "Saturn",
    );

    expect(sunSaturnRules).toHaveLength(5);
    expect(sunSaturnRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Sun",
        "Saturn",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-SUN-SATURN-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Sun",
        body2: "Saturn",
        aspect: aspectCode,
      });
      expect(getAspectInterpretationRule("Saturn", "Sun", aspectCode)).toBe(
        directRule,
      );
    }
  });

  it("contains and resolves all five Sun-Uranus rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const sunUranusRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Sun" && body2 === "Uranus",
    );

    expect(sunUranusRules).toHaveLength(5);
    expect(sunUranusRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Sun",
        "Uranus",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-SUN-URANUS-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Sun",
        body2: "Uranus",
        aspect: aspectCode,
      });
      expect(getAspectInterpretationRule("Uranus", "Sun", aspectCode)).toBe(
        directRule,
      );
    }
  });

  it("contains and resolves all five Sun-Neptune rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const sunNeptuneRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Sun" && body2 === "Neptune",
    );

    expect(sunNeptuneRules).toHaveLength(5);
    expect(sunNeptuneRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Sun",
        "Neptune",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-SUN-NEPTUNE-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Sun",
        body2: "Neptune",
        aspect: aspectCode,
      });
      expect(getAspectInterpretationRule("Neptune", "Sun", aspectCode)).toBe(
        directRule,
      );
    }
  });

  it("contains and resolves all five Sun-Pluto rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const sunPlutoRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Sun" && body2 === "Pluto",
    );

    expect(sunPlutoRules).toHaveLength(5);
    expect(sunPlutoRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Sun",
        "Pluto",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-SUN-PLUTO-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Sun",
        body2: "Pluto",
        aspect: aspectCode,
      });
      expect(getAspectInterpretationRule("Pluto", "Sun", aspectCode)).toBe(
        directRule,
      );
    }
  });

  it("resolves only the implemented Sun-Mercury conjunction in either input order", () => {
    const directRule = getAspectInterpretationRule(
      "Sun",
      "Mercury",
      "conjunction",
    );

    expect(directRule?.ruleId).toBe(
      "WESTERN-ASPECT-SUN-MERCURY-CONJUNCTION-V1",
    );
    expect(directRule?.evidence).toEqual({
      body1: "Sun",
      body2: "Mercury",
      aspect: "conjunction",
    });
    expect(
      getAspectInterpretationRule("Mercury", "Sun", "conjunction"),
    ).toBe(directRule);
    expect(getAspectInterpretationRule("Sun", "Mercury", "trine")).toBeNull();
  });

  it("resolves only the implemented Sun-Venus conjunction in either input order", () => {
    const directRule = getAspectInterpretationRule(
      "Sun",
      "Venus",
      "conjunction",
    );

    expect(directRule?.ruleId).toBe(
      "WESTERN-ASPECT-SUN-VENUS-CONJUNCTION-V1",
    );
    expect(directRule?.evidence).toEqual({
      body1: "Sun",
      body2: "Venus",
      aspect: "conjunction",
    });
    expect(getAspectInterpretationRule("Venus", "Sun", "conjunction")).toBe(
      directRule,
    );
    expect(getAspectInterpretationRule("Sun", "Venus", "square")).toBeNull();
  });

  it("canonicalizes an undirected body pair independently of input order", () => {
    expect(canonicalizeAspectBodyPair("Sun", "Moon")).toEqual([
      "Moon",
      "Sun",
    ]);
    expect(canonicalizeAspectBodyPair("Moon", "Sun")).toEqual([
      "Moon",
      "Sun",
    ]);
    expect(getAspectInterpretationRule("Sun", "Moon", "trine")).toBe(
      getAspectInterpretationRule("Moon", "Sun", "trine"),
    );
  });

  it("contains and resolves all five Moon-Mercury rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const moonMercuryRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Moon" && body2 === "Mercury",
    );

    expect(moonMercuryRules).toHaveLength(5);
    expect(moonMercuryRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Moon",
        "Mercury",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-MOON-MERCURY-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Moon",
        body2: "Mercury",
        aspect: aspectCode,
      });
      expect(getAspectInterpretationRule("Mercury", "Moon", aspectCode)).toBe(
        directRule,
      );
    }
  });

  it("resolves a real Moon-Mercury aspect and no absent fallback", () => {
    const moonMercurySquare: MajorAspect = {
      id: "Mercury-Moon-Square",
      body1: "Mercury",
      body2: "Moon",
      aspect: "square",
      aspectEnglish: "Square",
      aspectVietnamese: "Vuông",
      exactAngle: 90,
      actualAngle: 92.1,
      orb: 2.1,
      phase: "separating",
    };

    const interpretations = interpretWesternAspects({
      aspects: [moonMercurySquare],
    });
    expect(interpretations).toHaveLength(1);
    expect(interpretations[0].rule.ruleId).toBe(
      "WESTERN-ASPECT-MOON-MERCURY-SQUARE-V1",
    );
    expect(interpretations[0].evidence).toBe(moonMercurySquare);
    expect(interpretWesternAspects({ aspects: [] })).toEqual([]);
  });

  it("contains and resolves all five Moon-Venus rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const moonVenusRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Moon" && body2 === "Venus",
    );

    expect(moonVenusRules).toHaveLength(5);
    expect(moonVenusRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Moon",
        "Venus",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-MOON-VENUS-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Moon",
        body2: "Venus",
        aspect: aspectCode,
      });
      expect(getAspectInterpretationRule("Venus", "Moon", aspectCode)).toBe(
        directRule,
      );
    }
  });

  it("resolves a real Moon-Venus aspect and creates no absent fallback", () => {
    const moonVenusOpposition: MajorAspect = {
      id: "Venus-Moon-Opposition",
      body1: "Venus",
      body2: "Moon",
      aspect: "opposition",
      aspectEnglish: "Opposition",
      aspectVietnamese: "Đối đỉnh",
      exactAngle: 180,
      actualAngle: 178.7,
      orb: 1.3,
      phase: "applying",
    };
    const impossibleSunMercuryTrine: MajorAspect = {
      ...moonVenusOpposition,
      id: "Sun-Mercury-Trine",
      body1: "Sun",
      body2: "Mercury",
      aspect: "trine",
      aspectEnglish: "Trine",
      aspectVietnamese: "Tam hợp",
      exactAngle: 120,
      actualAngle: 120,
      orb: 0,
    };

    const interpretations = interpretWesternAspects({
      aspects: [moonVenusOpposition, impossibleSunMercuryTrine],
    });
    expect(interpretations).toHaveLength(1);
    expect(interpretations[0].rule.ruleId).toBe(
      "WESTERN-ASPECT-MOON-VENUS-OPPOSITION-V1",
    );
    expect(interpretations[0].evidence).toBe(moonVenusOpposition);
    expect(getAspectInterpretationRule("Sun", "Mercury", "trine")).toBeNull();
    expect(interpretWesternAspects({ aspects: [] })).toEqual([]);
  });

  it("contains and resolves all five Moon-Mars rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const moonMarsRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Moon" && body2 === "Mars",
    );

    expect(moonMarsRules).toHaveLength(5);
    expect(moonMarsRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Moon",
        "Mars",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-MOON-MARS-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Moon",
        body2: "Mars",
        aspect: aspectCode,
      });
      expect(getAspectInterpretationRule("Mars", "Moon", aspectCode)).toBe(
        directRule,
      );
    }
  });

  it("resolves a real Moon-Mars aspect and creates no absent fallback", () => {
    const moonMarsSquare: MajorAspect = {
      id: "Mars-Moon-Square",
      body1: "Mars",
      body2: "Moon",
      aspect: "square",
      aspectEnglish: "Square",
      aspectVietnamese: "Vuông",
      exactAngle: 90,
      actualAngle: 88.6,
      orb: 1.4,
      phase: "separating",
    };
    const impossibleSunMercuryTrine: MajorAspect = {
      ...moonMarsSquare,
      id: "Sun-Mercury-Trine",
      body1: "Sun",
      body2: "Mercury",
      aspect: "trine",
      aspectEnglish: "Trine",
      aspectVietnamese: "Tam hợp",
      exactAngle: 120,
      actualAngle: 120,
      orb: 0,
    };

    const interpretations = interpretWesternAspects({
      aspects: [moonMarsSquare, impossibleSunMercuryTrine],
    });
    expect(interpretations).toHaveLength(1);
    expect(interpretations[0].rule.ruleId).toBe(
      "WESTERN-ASPECT-MOON-MARS-SQUARE-V1",
    );
    expect(interpretations[0].evidence).toBe(moonMarsSquare);
    expect(getAspectInterpretationRule("Sun", "Mercury", "trine")).toBeNull();
    expect(interpretWesternAspects({ aspects: [] })).toEqual([]);
  });

  it("contains and resolves all five Moon-Jupiter rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const moonJupiterRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Moon" && body2 === "Jupiter",
    );

    expect(moonJupiterRules).toHaveLength(5);
    expect(moonJupiterRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Moon",
        "Jupiter",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-MOON-JUPITER-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Moon",
        body2: "Jupiter",
        aspect: aspectCode,
      });
      expect(getAspectInterpretationRule("Jupiter", "Moon", aspectCode)).toBe(
        directRule,
      );
    }
  });

  it("resolves a real Moon-Jupiter aspect and creates no absent fallback", () => {
    const moonJupiterTrine: MajorAspect = {
      id: "Jupiter-Moon-Trine",
      body1: "Jupiter",
      body2: "Moon",
      aspect: "trine",
      aspectEnglish: "Trine",
      aspectVietnamese: "Tam hợp",
      exactAngle: 120,
      actualAngle: 121.8,
      orb: 1.8,
      phase: "applying",
    };
    const impossibleSunMercuryTrine: MajorAspect = {
      ...moonJupiterTrine,
      id: "Sun-Mercury-Trine",
      body1: "Sun",
      body2: "Mercury",
      actualAngle: 120,
      orb: 0,
    };

    const interpretations = interpretWesternAspects({
      aspects: [moonJupiterTrine, impossibleSunMercuryTrine],
    });
    expect(interpretations).toHaveLength(1);
    expect(interpretations[0].rule.ruleId).toBe(
      "WESTERN-ASPECT-MOON-JUPITER-TRINE-V1",
    );
    expect(interpretations[0].evidence).toBe(moonJupiterTrine);
    expect(getAspectInterpretationRule("Sun", "Mercury", "trine")).toBeNull();
    expect(interpretWesternAspects({ aspects: [] })).toEqual([]);
  });

  it("contains and resolves all five Moon-Saturn rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const moonSaturnRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Moon" && body2 === "Saturn",
    );

    expect(moonSaturnRules).toHaveLength(5);
    expect(moonSaturnRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Moon",
        "Saturn",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-MOON-SATURN-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Moon",
        body2: "Saturn",
        aspect: aspectCode,
      });
      expect(getAspectInterpretationRule("Saturn", "Moon", aspectCode)).toBe(
        directRule,
      );
    }
  });

  it("resolves a real Moon-Saturn aspect and creates no absent fallback", () => {
    const moonSaturnOpposition: MajorAspect = {
      id: "Saturn-Moon-Opposition",
      body1: "Saturn",
      body2: "Moon",
      aspect: "opposition",
      aspectEnglish: "Opposition",
      aspectVietnamese: "Đối đỉnh",
      exactAngle: 180,
      actualAngle: 177.9,
      orb: 2.1,
      phase: "separating",
    };
    const impossibleSunMercuryTrine: MajorAspect = {
      ...moonSaturnOpposition,
      id: "Sun-Mercury-Trine",
      body1: "Sun",
      body2: "Mercury",
      aspect: "trine",
      aspectEnglish: "Trine",
      aspectVietnamese: "Tam hợp",
      exactAngle: 120,
      actualAngle: 120,
      orb: 0,
    };

    const interpretations = interpretWesternAspects({
      aspects: [moonSaturnOpposition, impossibleSunMercuryTrine],
    });
    expect(interpretations).toHaveLength(1);
    expect(interpretations[0].rule.ruleId).toBe(
      "WESTERN-ASPECT-MOON-SATURN-OPPOSITION-V1",
    );
    expect(interpretations[0].evidence).toBe(moonSaturnOpposition);
    expect(getAspectInterpretationRule("Sun", "Mercury", "trine")).toBeNull();
    expect(interpretWesternAspects({ aspects: [] })).toEqual([]);
  });

  it("contains and resolves all five Moon-Uranus rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const moonUranusRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Moon" && body2 === "Uranus",
    );

    expect(moonUranusRules).toHaveLength(5);
    expect(moonUranusRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Moon",
        "Uranus",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-MOON-URANUS-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Moon",
        body2: "Uranus",
        aspect: aspectCode,
      });
      expect(getAspectInterpretationRule("Uranus", "Moon", aspectCode)).toBe(
        directRule,
      );
    }
  });

  it("resolves a real Moon-Uranus aspect and creates no absent fallback", () => {
    const moonUranusSextile: MajorAspect = {
      id: "Uranus-Moon-Sextile",
      body1: "Uranus",
      body2: "Moon",
      aspect: "sextile",
      aspectEnglish: "Sextile",
      aspectVietnamese: "Lục hợp",
      exactAngle: 60,
      actualAngle: 58.9,
      orb: 1.1,
      phase: "applying",
    };
    const impossibleSunMercuryTrine: MajorAspect = {
      ...moonUranusSextile,
      id: "Sun-Mercury-Trine",
      body1: "Sun",
      body2: "Mercury",
      aspect: "trine",
      aspectEnglish: "Trine",
      aspectVietnamese: "Tam hợp",
      exactAngle: 120,
      actualAngle: 120,
      orb: 0,
    };

    const interpretations = interpretWesternAspects({
      aspects: [moonUranusSextile, impossibleSunMercuryTrine],
    });
    expect(interpretations).toHaveLength(1);
    expect(interpretations[0].rule.ruleId).toBe(
      "WESTERN-ASPECT-MOON-URANUS-SEXTILE-V1",
    );
    expect(interpretations[0].evidence).toBe(moonUranusSextile);
    expect(getAspectInterpretationRule("Sun", "Mercury", "trine")).toBeNull();
    expect(interpretWesternAspects({ aspects: [] })).toEqual([]);
  });

  it("contains and resolves all five Moon-Neptune rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const moonNeptuneRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Moon" && body2 === "Neptune",
    );

    expect(moonNeptuneRules).toHaveLength(5);
    expect(moonNeptuneRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Moon",
        "Neptune",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-MOON-NEPTUNE-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Moon",
        body2: "Neptune",
        aspect: aspectCode,
      });
      expect(getAspectInterpretationRule("Neptune", "Moon", aspectCode)).toBe(
        directRule,
      );
    }
  });

  it("resolves a real Moon-Neptune aspect and creates no absent fallback", () => {
    const moonNeptuneSquare: MajorAspect = {
      id: "Neptune-Moon-Square",
      body1: "Neptune",
      body2: "Moon",
      aspect: "square",
      aspectEnglish: "Square",
      aspectVietnamese: "Vuông",
      exactAngle: 90,
      actualAngle: 93.2,
      orb: 3.2,
      phase: "separating",
    };
    const impossibleSunMercuryTrine: MajorAspect = {
      ...moonNeptuneSquare,
      id: "Sun-Mercury-Trine",
      body1: "Sun",
      body2: "Mercury",
      aspect: "trine",
      aspectEnglish: "Trine",
      aspectVietnamese: "Tam hợp",
      exactAngle: 120,
      actualAngle: 120,
      orb: 0,
    };

    const interpretations = interpretWesternAspects({
      aspects: [moonNeptuneSquare, impossibleSunMercuryTrine],
    });
    expect(interpretations).toHaveLength(1);
    expect(interpretations[0].rule.ruleId).toBe(
      "WESTERN-ASPECT-MOON-NEPTUNE-SQUARE-V1",
    );
    expect(interpretations[0].evidence).toBe(moonNeptuneSquare);
    expect(getAspectInterpretationRule("Sun", "Mercury", "trine")).toBeNull();
    expect(interpretWesternAspects({ aspects: [] })).toEqual([]);
  });

  it("contains and resolves all five Moon-Pluto rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const moonPlutoRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Moon" && body2 === "Pluto",
    );

    expect(moonPlutoRules).toHaveLength(5);
    expect(moonPlutoRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Moon",
        "Pluto",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-MOON-PLUTO-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Moon",
        body2: "Pluto",
        aspect: aspectCode,
      });
      expect(getAspectInterpretationRule("Pluto", "Moon", aspectCode)).toBe(
        directRule,
      );
    }
  });

  it("resolves a real Moon-Pluto aspect and creates no absent fallback", () => {
    const moonPlutoOpposition: MajorAspect = {
      id: "Pluto-Moon-Opposition",
      body1: "Pluto",
      body2: "Moon",
      aspect: "opposition",
      aspectEnglish: "Opposition",
      aspectVietnamese: "Đối đỉnh",
      exactAngle: 180,
      actualAngle: 176.4,
      orb: 3.6,
      phase: "applying",
    };
    const impossibleSunMercuryTrine: MajorAspect = {
      ...moonPlutoOpposition,
      id: "Sun-Mercury-Trine",
      body1: "Sun",
      body2: "Mercury",
      aspect: "trine",
      aspectEnglish: "Trine",
      aspectVietnamese: "Tam hợp",
      exactAngle: 120,
      actualAngle: 120,
      orb: 0,
    };

    const interpretations = interpretWesternAspects({
      aspects: [moonPlutoOpposition, impossibleSunMercuryTrine],
    });
    expect(interpretations).toHaveLength(1);
    expect(interpretations[0].rule.ruleId).toBe(
      "WESTERN-ASPECT-MOON-PLUTO-OPPOSITION-V1",
    );
    expect(interpretations[0].evidence).toBe(moonPlutoOpposition);
    expect(getAspectInterpretationRule("Sun", "Mercury", "trine")).toBeNull();
    expect(interpretWesternAspects({ aspects: [] })).toEqual([]);
  });

  it("contains and resolves only the two feasible Mercury-Venus rules", () => {
    const feasibleAspects = ["conjunction", "sextile"] as const;
    const mercuryVenusRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Mercury" && body2 === "Venus",
    );

    expect(mercuryVenusRules).toHaveLength(2);
    expect(mercuryVenusRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...feasibleAspects].sort(),
    );

    for (const aspectCode of feasibleAspects) {
      const directRule = getAspectInterpretationRule(
        "Mercury",
        "Venus",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-MERCURY-VENUS-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Mercury",
        body2: "Venus",
        aspect: aspectCode,
      });
      expect(getAspectInterpretationRule("Venus", "Mercury", aspectCode)).toBe(
        directRule,
      );
    }

    for (const impossibleAspect of ["opposition", "trine", "square"] as const) {
      expect(
        getAspectInterpretationRule("Mercury", "Venus", impossibleAspect),
      ).toBeNull();
    }
  });

  it("resolves a real Mercury-Venus aspect and creates no impossible fallback", () => {
    const mercuryVenusSextile: MajorAspect = {
      id: "Venus-Mercury-Sextile",
      body1: "Venus",
      body2: "Mercury",
      aspect: "sextile",
      aspectEnglish: "Sextile",
      aspectVietnamese: "Lục hợp",
      exactAngle: 60,
      actualAngle: 57.8,
      orb: 2.2,
      phase: "applying",
    };
    const impossibleSunMercuryTrine: MajorAspect = {
      ...mercuryVenusSextile,
      id: "Sun-Mercury-Trine",
      body1: "Sun",
      body2: "Mercury",
      aspect: "trine",
      aspectEnglish: "Trine",
      aspectVietnamese: "Tam hợp",
      exactAngle: 120,
      actualAngle: 120,
      orb: 0,
    };

    const interpretations = interpretWesternAspects({
      aspects: [mercuryVenusSextile, impossibleSunMercuryTrine],
    });
    expect(interpretations).toHaveLength(1);
    expect(interpretations[0].rule.ruleId).toBe(
      "WESTERN-ASPECT-MERCURY-VENUS-SEXTILE-V1",
    );
    expect(interpretations[0].evidence).toBe(mercuryVenusSextile);
    expect(getAspectInterpretationRule("Sun", "Mercury", "trine")).toBeNull();
    expect(interpretWesternAspects({ aspects: [] })).toEqual([]);
  });

  it("contains and resolves all five Mercury-Mars rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const mercuryMarsRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Mercury" && body2 === "Mars",
    );

    expect(mercuryMarsRules).toHaveLength(5);
    expect(mercuryMarsRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Mercury",
        "Mars",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-MERCURY-MARS-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Mercury",
        body2: "Mars",
        aspect: aspectCode,
      });
      expect(getAspectInterpretationRule("Mars", "Mercury", aspectCode)).toBe(
        directRule,
      );
    }
  });

  it("resolves a real Mercury-Mars aspect and creates no impossible fallback", () => {
    const mercuryMarsSquare: MajorAspect = {
      id: "Mars-Mercury-Square",
      body1: "Mars",
      body2: "Mercury",
      aspect: "square",
      aspectEnglish: "Square",
      aspectVietnamese: "Vuông",
      exactAngle: 90,
      actualAngle: 87.4,
      orb: 2.6,
      phase: "separating",
    };
    const impossibleSunMercuryTrine: MajorAspect = {
      ...mercuryMarsSquare,
      id: "Sun-Mercury-Trine",
      body1: "Sun",
      body2: "Mercury",
      aspect: "trine",
      aspectEnglish: "Trine",
      aspectVietnamese: "Tam hợp",
      exactAngle: 120,
      actualAngle: 120,
      orb: 0,
    };

    const interpretations = interpretWesternAspects({
      aspects: [mercuryMarsSquare, impossibleSunMercuryTrine],
    });
    expect(interpretations).toHaveLength(1);
    expect(interpretations[0].rule.ruleId).toBe(
      "WESTERN-ASPECT-MERCURY-MARS-SQUARE-V1",
    );
    expect(interpretations[0].evidence).toBe(mercuryMarsSquare);
    expect(getAspectInterpretationRule("Sun", "Mercury", "trine")).toBeNull();
    expect(interpretWesternAspects({ aspects: [] })).toEqual([]);
  });

  it("contains and resolves all five Mercury-Jupiter rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const mercuryJupiterRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Mercury" && body2 === "Jupiter",
    );

    expect(mercuryJupiterRules).toHaveLength(5);
    expect(mercuryJupiterRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Mercury",
        "Jupiter",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-MERCURY-JUPITER-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Mercury",
        body2: "Jupiter",
        aspect: aspectCode,
      });
      expect(
        getAspectInterpretationRule("Jupiter", "Mercury", aspectCode),
      ).toBe(directRule);
    }
  });

  it("resolves a real Mercury-Jupiter aspect and creates no impossible fallback", () => {
    const mercuryJupiterOpposition: MajorAspect = {
      id: "Jupiter-Mercury-Opposition",
      body1: "Jupiter",
      body2: "Mercury",
      aspect: "opposition",
      aspectEnglish: "Opposition",
      aspectVietnamese: "Đối đỉnh",
      exactAngle: 180,
      actualAngle: 176.8,
      orb: 3.2,
      phase: "applying",
    };
    const impossibleSunMercuryTrine: MajorAspect = {
      ...mercuryJupiterOpposition,
      id: "Sun-Mercury-Trine",
      body1: "Sun",
      body2: "Mercury",
      aspect: "trine",
      aspectEnglish: "Trine",
      aspectVietnamese: "Tam hợp",
      exactAngle: 120,
      actualAngle: 120,
      orb: 0,
    };

    const interpretations = interpretWesternAspects({
      aspects: [mercuryJupiterOpposition, impossibleSunMercuryTrine],
    });
    expect(interpretations).toHaveLength(1);
    expect(interpretations[0].rule.ruleId).toBe(
      "WESTERN-ASPECT-MERCURY-JUPITER-OPPOSITION-V1",
    );
    expect(interpretations[0].evidence).toBe(mercuryJupiterOpposition);
    expect(getAspectInterpretationRule("Sun", "Mercury", "trine")).toBeNull();
    expect(interpretWesternAspects({ aspects: [] })).toEqual([]);
  });

  it("contains and resolves all five Mercury-Saturn rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const mercurySaturnRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Mercury" && body2 === "Saturn",
    );

    expect(mercurySaturnRules).toHaveLength(5);
    expect(mercurySaturnRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Mercury",
        "Saturn",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-MERCURY-SATURN-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Mercury",
        body2: "Saturn",
        aspect: aspectCode,
      });
      expect(
        getAspectInterpretationRule("Saturn", "Mercury", aspectCode),
      ).toBe(directRule);
    }
  });

  it("resolves a real Mercury-Saturn aspect and creates no impossible fallback", () => {
    const mercurySaturnTrine: MajorAspect = {
      id: "Saturn-Mercury-Trine",
      body1: "Saturn",
      body2: "Mercury",
      aspect: "trine",
      aspectEnglish: "Trine",
      aspectVietnamese: "Tam hợp",
      exactAngle: 120,
      actualAngle: 117.6,
      orb: 2.4,
      phase: "separating",
    };
    const impossibleSunMercuryTrine: MajorAspect = {
      ...mercurySaturnTrine,
      id: "Sun-Mercury-Trine",
      body1: "Sun",
      body2: "Mercury",
      actualAngle: 120,
      orb: 0,
    };

    const interpretations = interpretWesternAspects({
      aspects: [mercurySaturnTrine, impossibleSunMercuryTrine],
    });
    expect(interpretations).toHaveLength(1);
    expect(interpretations[0].rule.ruleId).toBe(
      "WESTERN-ASPECT-MERCURY-SATURN-TRINE-V1",
    );
    expect(interpretations[0].evidence).toBe(mercurySaturnTrine);
    expect(getAspectInterpretationRule("Sun", "Mercury", "trine")).toBeNull();
    expect(interpretWesternAspects({ aspects: [] })).toEqual([]);
  });

  it("contains and resolves all five Mercury-Uranus rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const mercuryUranusRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Mercury" && body2 === "Uranus",
    );

    expect(mercuryUranusRules).toHaveLength(5);
    expect(mercuryUranusRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Mercury",
        "Uranus",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-MERCURY-URANUS-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Mercury",
        body2: "Uranus",
        aspect: aspectCode,
      });
      expect(
        getAspectInterpretationRule("Uranus", "Mercury", aspectCode),
      ).toBe(directRule);
    }
  });

  it("resolves a real Mercury-Uranus aspect and creates no impossible fallback", () => {
    const mercuryUranusSquare: MajorAspect = {
      id: "Uranus-Mercury-Square",
      body1: "Uranus",
      body2: "Mercury",
      aspect: "square",
      aspectEnglish: "Square",
      aspectVietnamese: "Vuông",
      exactAngle: 90,
      actualAngle: 92.1,
      orb: 2.1,
      phase: "applying",
    };
    const impossibleSunMercuryTrine: MajorAspect = {
      ...mercuryUranusSquare,
      id: "Sun-Mercury-Trine",
      body1: "Sun",
      body2: "Mercury",
      aspect: "trine",
      aspectEnglish: "Trine",
      aspectVietnamese: "Tam hợp",
      exactAngle: 120,
      actualAngle: 120,
      orb: 0,
    };

    const interpretations = interpretWesternAspects({
      aspects: [mercuryUranusSquare, impossibleSunMercuryTrine],
    });
    expect(interpretations).toHaveLength(1);
    expect(interpretations[0].rule.ruleId).toBe(
      "WESTERN-ASPECT-MERCURY-URANUS-SQUARE-V1",
    );
    expect(interpretations[0].evidence).toBe(mercuryUranusSquare);
    expect(getAspectInterpretationRule("Sun", "Mercury", "trine")).toBeNull();
    expect(interpretWesternAspects({ aspects: [] })).toEqual([]);
  });

  it("contains and resolves all five Mercury-Neptune rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const mercuryNeptuneRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Mercury" && body2 === "Neptune",
    );

    expect(mercuryNeptuneRules).toHaveLength(5);
    expect(mercuryNeptuneRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Mercury",
        "Neptune",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-MERCURY-NEPTUNE-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Mercury",
        body2: "Neptune",
        aspect: aspectCode,
      });
      expect(
        getAspectInterpretationRule("Neptune", "Mercury", aspectCode),
      ).toBe(directRule);
    }
  });

  it("resolves a real Mercury-Neptune aspect and creates no impossible fallback", () => {
    const mercuryNeptuneOpposition: MajorAspect = {
      id: "Neptune-Mercury-Opposition",
      body1: "Neptune",
      body2: "Mercury",
      aspect: "opposition",
      aspectEnglish: "Opposition",
      aspectVietnamese: "Đối đỉnh",
      exactAngle: 180,
      actualAngle: 178.4,
      orb: 1.6,
      phase: "separating",
    };
    const impossibleSunMercuryTrine: MajorAspect = {
      ...mercuryNeptuneOpposition,
      id: "Sun-Mercury-Trine",
      body1: "Sun",
      body2: "Mercury",
      aspect: "trine",
      aspectEnglish: "Trine",
      aspectVietnamese: "Tam hợp",
      exactAngle: 120,
      actualAngle: 120,
      orb: 0,
    };

    const interpretations = interpretWesternAspects({
      aspects: [mercuryNeptuneOpposition, impossibleSunMercuryTrine],
    });
    expect(interpretations).toHaveLength(1);
    expect(interpretations[0].rule.ruleId).toBe(
      "WESTERN-ASPECT-MERCURY-NEPTUNE-OPPOSITION-V1",
    );
    expect(interpretations[0].evidence).toBe(mercuryNeptuneOpposition);
    expect(getAspectInterpretationRule("Sun", "Mercury", "trine")).toBeNull();
    expect(interpretWesternAspects({ aspects: [] })).toEqual([]);
  });

  it("contains and resolves all five Mercury-Pluto rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const mercuryPlutoRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Mercury" && body2 === "Pluto",
    );

    expect(mercuryPlutoRules).toHaveLength(5);
    expect(mercuryPlutoRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Mercury",
        "Pluto",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-MERCURY-PLUTO-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Mercury",
        body2: "Pluto",
        aspect: aspectCode,
      });
      expect(getAspectInterpretationRule("Pluto", "Mercury", aspectCode)).toBe(
        directRule,
      );
    }
  });

  it("resolves a real Mercury-Pluto aspect and creates no impossible fallback", () => {
    const mercuryPlutoTrine: MajorAspect = {
      id: "Pluto-Mercury-Trine",
      body1: "Pluto",
      body2: "Mercury",
      aspect: "trine",
      aspectEnglish: "Trine",
      aspectVietnamese: "Tam hợp",
      exactAngle: 120,
      actualAngle: 117.8,
      orb: 2.2,
      phase: "applying",
    };
    const impossibleSunMercuryTrine: MajorAspect = {
      ...mercuryPlutoTrine,
      id: "Sun-Mercury-Trine",
      body1: "Sun",
      body2: "Mercury",
      actualAngle: 120,
      orb: 0,
    };

    const interpretations = interpretWesternAspects({
      aspects: [mercuryPlutoTrine, impossibleSunMercuryTrine],
    });
    expect(interpretations).toHaveLength(1);
    expect(interpretations[0].rule.ruleId).toBe(
      "WESTERN-ASPECT-MERCURY-PLUTO-TRINE-V1",
    );
    expect(interpretations[0].evidence).toBe(mercuryPlutoTrine);
    expect(getAspectInterpretationRule("Sun", "Mercury", "trine")).toBeNull();
    expect(interpretWesternAspects({ aspects: [] })).toEqual([]);
  });

  it("contains and resolves all five Venus-Mars rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const venusMarsRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Venus" && body2 === "Mars",
    );

    expect(venusMarsRules).toHaveLength(5);
    expect(venusMarsRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Venus",
        "Mars",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-VENUS-MARS-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Venus",
        body2: "Mars",
        aspect: aspectCode,
      });
      expect(getAspectInterpretationRule("Mars", "Venus", aspectCode)).toBe(
        directRule,
      );
    }
  });

  it("resolves a real Venus-Mars aspect and creates no impossible fallback", () => {
    const venusMarsSquare: MajorAspect = {
      id: "Mars-Venus-Square",
      body1: "Mars",
      body2: "Venus",
      aspect: "square",
      aspectEnglish: "Square",
      aspectVietnamese: "Vuông",
      exactAngle: 90,
      actualAngle: 92.4,
      orb: 2.4,
      phase: "separating",
    };
    const impossibleSunMercuryTrine: MajorAspect = {
      ...venusMarsSquare,
      id: "Sun-Mercury-Trine",
      body1: "Sun",
      body2: "Mercury",
      aspect: "trine",
      aspectEnglish: "Trine",
      aspectVietnamese: "Tam hợp",
      exactAngle: 120,
      actualAngle: 120,
      orb: 0,
    };

    const interpretations = interpretWesternAspects({
      aspects: [venusMarsSquare, impossibleSunMercuryTrine],
    });
    expect(interpretations).toHaveLength(1);
    expect(interpretations[0].rule.ruleId).toBe(
      "WESTERN-ASPECT-VENUS-MARS-SQUARE-V1",
    );
    expect(interpretations[0].evidence).toBe(venusMarsSquare);
    expect(getAspectInterpretationRule("Sun", "Mercury", "trine")).toBeNull();
    expect(interpretWesternAspects({ aspects: [] })).toEqual([]);
  });

  it("contains and resolves all five Venus-Jupiter rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const venusJupiterRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Venus" && body2 === "Jupiter",
    );

    expect(venusJupiterRules).toHaveLength(5);
    expect(venusJupiterRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Venus",
        "Jupiter",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-VENUS-JUPITER-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Venus",
        body2: "Jupiter",
        aspect: aspectCode,
      });
      expect(getAspectInterpretationRule("Jupiter", "Venus", aspectCode)).toBe(
        directRule,
      );
    }
  });

  it("resolves a real Venus-Jupiter aspect and rejects a fixed impossible combination", () => {
    const venusJupiterTrine: MajorAspect = {
      id: "Jupiter-Venus-Trine",
      body1: "Jupiter",
      body2: "Venus",
      aspect: "trine",
      aspectEnglish: "Trine",
      aspectVietnamese: "Tam hợp",
      exactAngle: 120,
      actualAngle: 118.6,
      orb: 1.4,
      phase: "applying",
    };
    const impossibleSunMercuryTrine: MajorAspect = {
      ...venusJupiterTrine,
      id: "Sun-Mercury-Trine",
      body1: "Sun",
      body2: "Mercury",
      actualAngle: 120,
      orb: 0,
    };

    const interpretations = interpretWesternAspects({
      aspects: [venusJupiterTrine, impossibleSunMercuryTrine],
    });
    expect(interpretations).toHaveLength(1);
    expect(interpretations[0].rule.ruleId).toBe(
      "WESTERN-ASPECT-VENUS-JUPITER-TRINE-V1",
    );
    expect(interpretations[0].evidence).toBe(venusJupiterTrine);
    expect(getAspectInterpretationRule("Sun", "Mercury", "trine")).toBeNull();
  });

  it("contains and resolves all five Venus-Saturn rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const venusSaturnRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Venus" && body2 === "Saturn",
    );

    expect(venusSaturnRules).toHaveLength(5);
    expect(venusSaturnRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Venus",
        "Saturn",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-VENUS-SATURN-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Venus",
        body2: "Saturn",
        aspect: aspectCode,
      });
      expect(getAspectInterpretationRule("Saturn", "Venus", aspectCode)).toBe(
        directRule,
      );
    }
  });

  it("resolves a real Venus-Saturn aspect and rejects a fixed impossible combination", () => {
    const venusSaturnOpposition: MajorAspect = {
      id: "Saturn-Venus-Opposition",
      body1: "Saturn",
      body2: "Venus",
      aspect: "opposition",
      aspectEnglish: "Opposition",
      aspectVietnamese: "Đối đỉnh",
      exactAngle: 180,
      actualAngle: 177.8,
      orb: 2.2,
      phase: "separating",
    };
    const impossibleSunMercuryTrine: MajorAspect = {
      ...venusSaturnOpposition,
      id: "Sun-Mercury-Trine",
      body1: "Sun",
      body2: "Mercury",
      aspect: "trine",
      aspectEnglish: "Trine",
      aspectVietnamese: "Tam hợp",
      exactAngle: 120,
      actualAngle: 120,
      orb: 0,
    };

    const snapshot = structuredClone(venusSaturnOpposition);
    const interpretations = interpretWesternAspects({
      aspects: [venusSaturnOpposition, impossibleSunMercuryTrine],
    });
    expect(interpretations).toHaveLength(1);
    expect(interpretations[0].rule.ruleId).toBe(
      "WESTERN-ASPECT-VENUS-SATURN-OPPOSITION-V1",
    );
    expect(interpretations[0].evidence).toBe(venusSaturnOpposition);
    expect(venusSaturnOpposition).toEqual(snapshot);
    expect(getAspectInterpretationRule("Sun", "Mercury", "trine")).toBeNull();
  });

  it("contains and resolves all five Venus-Uranus rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const venusUranusRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Venus" && body2 === "Uranus",
    );

    expect(venusUranusRules).toHaveLength(5);
    expect(venusUranusRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Venus",
        "Uranus",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-VENUS-URANUS-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Venus",
        body2: "Uranus",
        aspect: aspectCode,
      });
      expect(getAspectInterpretationRule("Uranus", "Venus", aspectCode)).toBe(
        directRule,
      );
    }
  });

  it("resolves a real Venus-Uranus aspect and rejects a fixed impossible combination", () => {
    const venusUranusSquare: MajorAspect = {
      id: "Uranus-Venus-Square",
      body1: "Uranus",
      body2: "Venus",
      aspect: "square",
      aspectEnglish: "Square",
      aspectVietnamese: "Vuông",
      exactAngle: 90,
      actualAngle: 92.3,
      orb: 2.3,
      phase: "applying",
    };
    const impossibleSunMercuryTrine: MajorAspect = {
      ...venusUranusSquare,
      id: "Sun-Mercury-Trine",
      body1: "Sun",
      body2: "Mercury",
      aspect: "trine",
      aspectEnglish: "Trine",
      aspectVietnamese: "Tam hợp",
      exactAngle: 120,
      actualAngle: 120,
      orb: 0,
    };

    const snapshot = structuredClone(venusUranusSquare);
    const interpretations = interpretWesternAspects({
      aspects: [venusUranusSquare, impossibleSunMercuryTrine],
    });
    expect(interpretations).toHaveLength(1);
    expect(interpretations[0].rule.ruleId).toBe(
      "WESTERN-ASPECT-VENUS-URANUS-SQUARE-V1",
    );
    expect(interpretations[0].evidence).toBe(venusUranusSquare);
    expect(venusUranusSquare).toEqual(snapshot);
    expect(getAspectInterpretationRule("Sun", "Mercury", "trine")).toBeNull();
  });

  it("contains and resolves all five Venus-Neptune rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const venusNeptuneRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Venus" && body2 === "Neptune",
    );

    expect(venusNeptuneRules).toHaveLength(5);
    expect(venusNeptuneRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Venus",
        "Neptune",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-VENUS-NEPTUNE-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Venus",
        body2: "Neptune",
        aspect: aspectCode,
      });
      expect(getAspectInterpretationRule("Neptune", "Venus", aspectCode)).toBe(
        directRule,
      );
    }
  });

  it("resolves a real Venus-Neptune aspect and rejects a fixed impossible combination", () => {
    const venusNeptuneTrine: MajorAspect = {
      id: "Neptune-Venus-Trine",
      body1: "Neptune",
      body2: "Venus",
      aspect: "trine",
      aspectEnglish: "Trine",
      aspectVietnamese: "Tam hợp",
      exactAngle: 120,
      actualAngle: 117.6,
      orb: 2.4,
      phase: "separating",
    };
    const impossibleSunMercuryTrine: MajorAspect = {
      ...venusNeptuneTrine,
      id: "Sun-Mercury-Trine",
      body1: "Sun",
      body2: "Mercury",
      actualAngle: 120,
      orb: 0,
    };

    const snapshot = structuredClone(venusNeptuneTrine);
    const interpretations = interpretWesternAspects({
      aspects: [venusNeptuneTrine, impossibleSunMercuryTrine],
    });
    expect(interpretations).toHaveLength(1);
    expect(interpretations[0].rule.ruleId).toBe(
      "WESTERN-ASPECT-VENUS-NEPTUNE-TRINE-V1",
    );
    expect(interpretations[0].evidence).toBe(venusNeptuneTrine);
    expect(venusNeptuneTrine).toEqual(snapshot);
    expect(getAspectInterpretationRule("Sun", "Mercury", "trine")).toBeNull();
  });

  it("contains and resolves all five Venus-Pluto rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const venusPlutoRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Venus" && body2 === "Pluto",
    );

    expect(venusPlutoRules).toHaveLength(5);
    expect(venusPlutoRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Venus",
        "Pluto",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-VENUS-PLUTO-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Venus",
        body2: "Pluto",
        aspect: aspectCode,
      });
      expect(getAspectInterpretationRule("Pluto", "Venus", aspectCode)).toBe(
        directRule,
      );
    }
  });

  it("resolves a real Venus-Pluto aspect and rejects a fixed impossible combination", () => {
    const venusPlutoOpposition: MajorAspect = {
      id: "Pluto-Venus-Opposition",
      body1: "Pluto",
      body2: "Venus",
      aspect: "opposition",
      aspectEnglish: "Opposition",
      aspectVietnamese: "Đối đỉnh",
      exactAngle: 180,
      actualAngle: 177.4,
      orb: 2.6,
      phase: "applying",
    };
    const impossibleSunMercuryTrine: MajorAspect = {
      ...venusPlutoOpposition,
      id: "Sun-Mercury-Trine",
      body1: "Sun",
      body2: "Mercury",
      aspect: "trine",
      aspectEnglish: "Trine",
      aspectVietnamese: "Tam hợp",
      exactAngle: 120,
      actualAngle: 120,
      orb: 0,
    };

    const snapshot = structuredClone(venusPlutoOpposition);
    const interpretations = interpretWesternAspects({
      aspects: [venusPlutoOpposition, impossibleSunMercuryTrine],
    });
    expect(interpretations).toHaveLength(1);
    expect(interpretations[0].rule.ruleId).toBe(
      "WESTERN-ASPECT-VENUS-PLUTO-OPPOSITION-V1",
    );
    expect(interpretations[0].evidence).toBe(venusPlutoOpposition);
    expect(venusPlutoOpposition).toEqual(snapshot);
    expect(getAspectInterpretationRule("Sun", "Mercury", "trine")).toBeNull();
  });

  it("contains and resolves all five Mars-Jupiter rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const marsJupiterRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Mars" && body2 === "Jupiter",
    );

    expect(marsJupiterRules).toHaveLength(5);
    expect(marsJupiterRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Mars",
        "Jupiter",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-MARS-JUPITER-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Mars",
        body2: "Jupiter",
        aspect: aspectCode,
      });
      expect(getAspectInterpretationRule("Jupiter", "Mars", aspectCode)).toBe(
        directRule,
      );
    }
  });

  it("resolves a real Mars-Jupiter aspect and rejects a fixed impossible combination", () => {
    const marsJupiterSquare: MajorAspect = {
      id: "Jupiter-Mars-Square",
      body1: "Jupiter",
      body2: "Mars",
      aspect: "square",
      aspectEnglish: "Square",
      aspectVietnamese: "Vuông",
      exactAngle: 90,
      actualAngle: 92.3,
      orb: 2.3,
      phase: "separating",
    };
    const impossibleSunMercuryTrine: MajorAspect = {
      ...marsJupiterSquare,
      id: "Sun-Mercury-Trine",
      body1: "Sun",
      body2: "Mercury",
      aspect: "trine",
      aspectEnglish: "Trine",
      aspectVietnamese: "Tam hợp",
      exactAngle: 120,
      actualAngle: 120,
      orb: 0,
    };

    const snapshot = structuredClone(marsJupiterSquare);
    const interpretations = interpretWesternAspects({
      aspects: [marsJupiterSquare, impossibleSunMercuryTrine],
    });
    expect(interpretations).toHaveLength(1);
    expect(interpretations[0].rule.ruleId).toBe(
      "WESTERN-ASPECT-MARS-JUPITER-SQUARE-V1",
    );
    expect(interpretations[0].evidence).toBe(marsJupiterSquare);
    expect(marsJupiterSquare).toEqual(snapshot);
    expect(getAspectInterpretationRule("Sun", "Mercury", "trine")).toBeNull();
  });

  it("contains and resolves all five Mars-Saturn rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const marsSaturnRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Mars" && body2 === "Saturn",
    );

    expect(marsSaturnRules).toHaveLength(5);
    expect(marsSaturnRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Mars",
        "Saturn",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-MARS-SATURN-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Mars",
        body2: "Saturn",
        aspect: aspectCode,
      });
      expect(getAspectInterpretationRule("Saturn", "Mars", aspectCode)).toBe(
        directRule,
      );
    }
  });

  it("resolves a real Mars-Saturn aspect and rejects a fixed impossible combination", () => {
    const marsSaturnOpposition: MajorAspect = {
      id: "Saturn-Mars-Opposition",
      body1: "Saturn",
      body2: "Mars",
      aspect: "opposition",
      aspectEnglish: "Opposition",
      aspectVietnamese: "Đối đỉnh",
      exactAngle: 180,
      actualAngle: 176.8,
      orb: 3.2,
      phase: "applying",
    };
    const impossibleSunMercuryTrine: MajorAspect = {
      ...marsSaturnOpposition,
      id: "Sun-Mercury-Trine",
      body1: "Sun",
      body2: "Mercury",
      aspect: "trine",
      aspectEnglish: "Trine",
      aspectVietnamese: "Tam hợp",
      exactAngle: 120,
      actualAngle: 120,
      orb: 0,
    };

    const snapshot = structuredClone(marsSaturnOpposition);
    const interpretations = interpretWesternAspects({
      aspects: [marsSaturnOpposition, impossibleSunMercuryTrine],
    });
    expect(interpretations).toHaveLength(1);
    expect(interpretations[0].rule.ruleId).toBe(
      "WESTERN-ASPECT-MARS-SATURN-OPPOSITION-V1",
    );
    expect(interpretations[0].evidence).toBe(marsSaturnOpposition);
    expect(marsSaturnOpposition).toEqual(snapshot);
    expect(getAspectInterpretationRule("Sun", "Mercury", "trine")).toBeNull();
  });

  it("contains and resolves all five Mars-Uranus rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const marsUranusRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Mars" && body2 === "Uranus",
    );

    expect(marsUranusRules).toHaveLength(5);
    expect(marsUranusRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Mars",
        "Uranus",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-MARS-URANUS-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Mars",
        body2: "Uranus",
        aspect: aspectCode,
      });
      expect(getAspectInterpretationRule("Uranus", "Mars", aspectCode)).toBe(
        directRule,
      );
    }
  });

  it("resolves a real Mars-Uranus aspect and rejects a fixed impossible combination", () => {
    const marsUranusTrine: MajorAspect = {
      id: "Uranus-Mars-Trine",
      body1: "Uranus",
      body2: "Mars",
      aspect: "trine",
      aspectEnglish: "Trine",
      aspectVietnamese: "Tam hợp",
      exactAngle: 120,
      actualAngle: 118.1,
      orb: 1.9,
      phase: "separating",
    };
    const impossibleSunMercuryTrine: MajorAspect = {
      ...marsUranusTrine,
      id: "Sun-Mercury-Trine",
      body1: "Sun",
      body2: "Mercury",
      actualAngle: 120,
      orb: 0,
    };

    const snapshot = structuredClone(marsUranusTrine);
    const interpretations = interpretWesternAspects({
      aspects: [marsUranusTrine, impossibleSunMercuryTrine],
    });
    expect(interpretations).toHaveLength(1);
    expect(interpretations[0].rule.ruleId).toBe(
      "WESTERN-ASPECT-MARS-URANUS-TRINE-V1",
    );
    expect(interpretations[0].evidence).toBe(marsUranusTrine);
    expect(marsUranusTrine).toEqual(snapshot);
    expect(getAspectInterpretationRule("Sun", "Mercury", "trine")).toBeNull();
  });

  it("contains and resolves all five Mars-Neptune rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const marsNeptuneRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Mars" && body2 === "Neptune",
    );

    expect(marsNeptuneRules).toHaveLength(5);
    expect(marsNeptuneRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Mars",
        "Neptune",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-MARS-NEPTUNE-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Mars",
        body2: "Neptune",
        aspect: aspectCode,
      });
      expect(getAspectInterpretationRule("Neptune", "Mars", aspectCode)).toBe(
        directRule,
      );
    }
  });

  it("resolves a real Mars-Neptune aspect and rejects a fixed impossible combination", () => {
    const marsNeptuneSextile: MajorAspect = {
      id: "Neptune-Mars-Sextile",
      body1: "Neptune",
      body2: "Mars",
      aspect: "sextile",
      aspectEnglish: "Sextile",
      aspectVietnamese: "Lục hợp",
      exactAngle: 60,
      actualAngle: 61.7,
      orb: 1.7,
      phase: "applying",
    };
    const impossibleSunMercuryTrine: MajorAspect = {
      ...marsNeptuneSextile,
      id: "Sun-Mercury-Trine",
      body1: "Sun",
      body2: "Mercury",
      aspect: "trine",
      aspectEnglish: "Trine",
      aspectVietnamese: "Tam hợp",
      exactAngle: 120,
      actualAngle: 120,
      orb: 0,
    };

    const snapshot = structuredClone(marsNeptuneSextile);
    const interpretations = interpretWesternAspects({
      aspects: [marsNeptuneSextile, impossibleSunMercuryTrine],
    });
    expect(interpretations).toHaveLength(1);
    expect(interpretations[0].rule.ruleId).toBe(
      "WESTERN-ASPECT-MARS-NEPTUNE-SEXTILE-V1",
    );
    expect(interpretations[0].evidence).toBe(marsNeptuneSextile);
    expect(marsNeptuneSextile).toEqual(snapshot);
    expect(getAspectInterpretationRule("Sun", "Mercury", "trine")).toBeNull();
  });

  it("contains and resolves all five Mars-Pluto rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const marsPlutoRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Mars" && body2 === "Pluto",
    );

    expect(marsPlutoRules).toHaveLength(5);
    expect(marsPlutoRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Mars",
        "Pluto",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-MARS-PLUTO-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Mars",
        body2: "Pluto",
        aspect: aspectCode,
      });
      expect(getAspectInterpretationRule("Pluto", "Mars", aspectCode)).toBe(
        directRule,
      );
    }
  });

  it("resolves a real Mars-Pluto aspect and rejects a fixed impossible combination", () => {
    const marsPlutoSquare: MajorAspect = {
      id: "Pluto-Mars-Square",
      body1: "Pluto",
      body2: "Mars",
      aspect: "square",
      aspectEnglish: "Square",
      aspectVietnamese: "Vuông",
      exactAngle: 90,
      actualAngle: 92.4,
      orb: 2.4,
      phase: "separating",
    };
    const impossibleSunMercuryTrine: MajorAspect = {
      ...marsPlutoSquare,
      id: "Sun-Mercury-Trine",
      body1: "Sun",
      body2: "Mercury",
      aspect: "trine",
      aspectEnglish: "Trine",
      aspectVietnamese: "Tam hợp",
      exactAngle: 120,
      actualAngle: 120,
      orb: 0,
    };

    const snapshot = structuredClone(marsPlutoSquare);
    const interpretations = interpretWesternAspects({
      aspects: [marsPlutoSquare, impossibleSunMercuryTrine],
    });
    expect(interpretations).toHaveLength(1);
    expect(interpretations[0].rule.ruleId).toBe(
      "WESTERN-ASPECT-MARS-PLUTO-SQUARE-V1",
    );
    expect(interpretations[0].evidence).toBe(marsPlutoSquare);
    expect(marsPlutoSquare).toEqual(snapshot);
    expect(getAspectInterpretationRule("Sun", "Mercury", "trine")).toBeNull();
  });

  it("contains and resolves all five Jupiter-Saturn rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const jupiterSaturnRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Jupiter" && body2 === "Saturn",
    );

    expect(jupiterSaturnRules).toHaveLength(5);
    expect(jupiterSaturnRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Jupiter",
        "Saturn",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-JUPITER-SATURN-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Jupiter",
        body2: "Saturn",
        aspect: aspectCode,
      });
      expect(getAspectInterpretationRule("Saturn", "Jupiter", aspectCode)).toBe(
        directRule,
      );
    }
  });

  it("resolves a real Jupiter-Saturn aspect and rejects a fixed impossible combination", () => {
    const jupiterSaturnOpposition: MajorAspect = {
      id: "Saturn-Jupiter-Opposition",
      body1: "Saturn",
      body2: "Jupiter",
      aspect: "opposition",
      aspectEnglish: "Opposition",
      aspectVietnamese: "Đối đỉnh",
      exactAngle: 180,
      actualAngle: 177.5,
      orb: 2.5,
      phase: "applying",
    };
    const impossibleSunMercuryTrine: MajorAspect = {
      ...jupiterSaturnOpposition,
      id: "Sun-Mercury-Trine",
      body1: "Sun",
      body2: "Mercury",
      aspect: "trine",
      aspectEnglish: "Trine",
      aspectVietnamese: "Tam hợp",
      exactAngle: 120,
      actualAngle: 120,
      orb: 0,
    };

    const snapshot = structuredClone(jupiterSaturnOpposition);
    const interpretations = interpretWesternAspects({
      aspects: [jupiterSaturnOpposition, impossibleSunMercuryTrine],
    });
    expect(interpretations).toHaveLength(1);
    expect(interpretations[0].rule.ruleId).toBe(
      "WESTERN-ASPECT-JUPITER-SATURN-OPPOSITION-V1",
    );
    expect(interpretations[0].evidence).toBe(jupiterSaturnOpposition);
    expect(jupiterSaturnOpposition).toEqual(snapshot);
    expect(getAspectInterpretationRule("Sun", "Mercury", "trine")).toBeNull();
  });

  it("contains and resolves all five Jupiter-Uranus rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const jupiterUranusRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Jupiter" && body2 === "Uranus",
    );

    expect(jupiterUranusRules).toHaveLength(5);
    expect(jupiterUranusRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Jupiter",
        "Uranus",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-JUPITER-URANUS-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Jupiter",
        body2: "Uranus",
        aspect: aspectCode,
      });
      expect(getAspectInterpretationRule("Uranus", "Jupiter", aspectCode)).toBe(
        directRule,
      );
    }
  });

  it("resolves a real Jupiter-Uranus aspect and rejects a fixed impossible combination", () => {
    const jupiterUranusTrine: MajorAspect = {
      id: "Uranus-Jupiter-Trine",
      body1: "Uranus",
      body2: "Jupiter",
      aspect: "trine",
      aspectEnglish: "Trine",
      aspectVietnamese: "Tam hợp",
      exactAngle: 120,
      actualAngle: 117.8,
      orb: 2.2,
      phase: "separating",
    };
    const impossibleSunMercuryTrine: MajorAspect = {
      ...jupiterUranusTrine,
      id: "Sun-Mercury-Trine",
      body1: "Sun",
      body2: "Mercury",
      actualAngle: 120,
      orb: 0,
    };

    const snapshot = structuredClone(jupiterUranusTrine);
    const interpretations = interpretWesternAspects({
      aspects: [jupiterUranusTrine, impossibleSunMercuryTrine],
    });
    expect(interpretations).toHaveLength(1);
    expect(interpretations[0].rule.ruleId).toBe(
      "WESTERN-ASPECT-JUPITER-URANUS-TRINE-V1",
    );
    expect(interpretations[0].evidence).toBe(jupiterUranusTrine);
    expect(jupiterUranusTrine).toEqual(snapshot);
    expect(getAspectInterpretationRule("Sun", "Mercury", "trine")).toBeNull();
  });

  it("contains and resolves all five Jupiter-Neptune rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const jupiterNeptuneRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Jupiter" && body2 === "Neptune",
    );

    expect(jupiterNeptuneRules).toHaveLength(5);
    expect(jupiterNeptuneRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Jupiter",
        "Neptune",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-JUPITER-NEPTUNE-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Jupiter",
        body2: "Neptune",
        aspect: aspectCode,
      });
      expect(getAspectInterpretationRule("Neptune", "Jupiter", aspectCode)).toBe(
        directRule,
      );
    }
  });

  it("resolves a real Jupiter-Neptune aspect and rejects a fixed impossible combination", () => {
    const jupiterNeptuneSextile: MajorAspect = {
      id: "Neptune-Jupiter-Sextile",
      body1: "Neptune",
      body2: "Jupiter",
      aspect: "sextile",
      aspectEnglish: "Sextile",
      aspectVietnamese: "Lục hợp",
      exactAngle: 60,
      actualAngle: 58.4,
      orb: 1.6,
      phase: "applying",
    };
    const impossibleSunMercuryTrine: MajorAspect = {
      ...jupiterNeptuneSextile,
      id: "Sun-Mercury-Trine",
      body1: "Sun",
      body2: "Mercury",
      aspect: "trine",
      aspectEnglish: "Trine",
      aspectVietnamese: "Tam hợp",
      exactAngle: 120,
      actualAngle: 120,
      orb: 0,
    };

    const snapshot = structuredClone(jupiterNeptuneSextile);
    const interpretations = interpretWesternAspects({
      aspects: [jupiterNeptuneSextile, impossibleSunMercuryTrine],
    });
    expect(interpretations).toHaveLength(1);
    expect(interpretations[0].rule.ruleId).toBe(
      "WESTERN-ASPECT-JUPITER-NEPTUNE-SEXTILE-V1",
    );
    expect(interpretations[0].evidence).toBe(jupiterNeptuneSextile);
    expect(jupiterNeptuneSextile).toEqual(snapshot);
    expect(getAspectInterpretationRule("Sun", "Mercury", "trine")).toBeNull();
  });

  it("contains and resolves all five Jupiter-Pluto rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const jupiterPlutoRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Jupiter" && body2 === "Pluto",
    );

    expect(jupiterPlutoRules).toHaveLength(5);
    expect(jupiterPlutoRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Jupiter",
        "Pluto",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-JUPITER-PLUTO-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Jupiter",
        body2: "Pluto",
        aspect: aspectCode,
      });
      expect(getAspectInterpretationRule("Pluto", "Jupiter", aspectCode)).toBe(
        directRule,
      );
    }
  });

  it("resolves a real Jupiter-Pluto aspect and rejects a fixed impossible combination", () => {
    const jupiterPlutoSquare: MajorAspect = {
      id: "Pluto-Jupiter-Square",
      body1: "Pluto",
      body2: "Jupiter",
      aspect: "square",
      aspectEnglish: "Square",
      aspectVietnamese: "Vuông",
      exactAngle: 90,
      actualAngle: 93.1,
      orb: 3.1,
      phase: "separating",
    };
    const impossibleSunMercuryTrine: MajorAspect = {
      ...jupiterPlutoSquare,
      id: "Sun-Mercury-Trine",
      body1: "Sun",
      body2: "Mercury",
      aspect: "trine",
      aspectEnglish: "Trine",
      aspectVietnamese: "Tam hợp",
      exactAngle: 120,
      actualAngle: 120,
      orb: 0,
    };

    const snapshot = structuredClone(jupiterPlutoSquare);
    const interpretations = interpretWesternAspects({
      aspects: [jupiterPlutoSquare, impossibleSunMercuryTrine],
    });
    expect(interpretations).toHaveLength(1);
    expect(interpretations[0].rule.ruleId).toBe(
      "WESTERN-ASPECT-JUPITER-PLUTO-SQUARE-V1",
    );
    expect(interpretations[0].evidence).toBe(jupiterPlutoSquare);
    expect(jupiterPlutoSquare).toEqual(snapshot);
    expect(getAspectInterpretationRule("Sun", "Mercury", "trine")).toBeNull();
  });

  it("contains and resolves all five Saturn-Uranus rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const saturnUranusRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Saturn" && body2 === "Uranus",
    );

    expect(saturnUranusRules).toHaveLength(5);
    expect(saturnUranusRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Saturn",
        "Uranus",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-SATURN-URANUS-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Saturn",
        body2: "Uranus",
        aspect: aspectCode,
      });
      expect(getAspectInterpretationRule("Uranus", "Saturn", aspectCode)).toBe(
        directRule,
      );
    }
  });

  it("resolves a real Saturn-Uranus aspect and rejects a fixed impossible combination", () => {
    const saturnUranusSquare: MajorAspect = {
      id: "Uranus-Saturn-Square",
      body1: "Uranus",
      body2: "Saturn",
      aspect: "square",
      aspectEnglish: "Square",
      aspectVietnamese: "Vuông",
      exactAngle: 90,
      actualAngle: 94.4,
      orb: 4.4,
      phase: "separating",
    };
    const impossibleSunMercuryTrine: MajorAspect = {
      ...saturnUranusSquare,
      id: "Sun-Mercury-Trine",
      body1: "Sun",
      body2: "Mercury",
      aspect: "trine",
      aspectEnglish: "Trine",
      aspectVietnamese: "Tam hợp",
      exactAngle: 120,
      actualAngle: 120,
      orb: 0,
    };

    const snapshot = structuredClone(saturnUranusSquare);
    const interpretations = interpretWesternAspects({
      aspects: [saturnUranusSquare, impossibleSunMercuryTrine],
    });
    expect(interpretations).toHaveLength(1);
    expect(interpretations[0].rule.ruleId).toBe(
      "WESTERN-ASPECT-SATURN-URANUS-SQUARE-V1",
    );
    expect(interpretations[0].evidence).toBe(saturnUranusSquare);
    expect(saturnUranusSquare).toEqual(snapshot);
    expect(getAspectInterpretationRule("Sun", "Mercury", "trine")).toBeNull();
  });

  it("contains and resolves all five Saturn-Neptune rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const saturnNeptuneRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Saturn" && body2 === "Neptune",
    );

    expect(saturnNeptuneRules).toHaveLength(5);
    expect(saturnNeptuneRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Saturn",
        "Neptune",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-SATURN-NEPTUNE-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Saturn",
        body2: "Neptune",
        aspect: aspectCode,
      });
      expect(getAspectInterpretationRule("Neptune", "Saturn", aspectCode)).toBe(
        directRule,
      );
    }
  });

  it("resolves a real Saturn-Neptune aspect and rejects a fixed impossible combination", () => {
    const saturnNeptuneOpposition: MajorAspect = {
      id: "Neptune-Saturn-Opposition",
      body1: "Neptune",
      body2: "Saturn",
      aspect: "opposition",
      aspectEnglish: "Opposition",
      aspectVietnamese: "Đối đỉnh",
      exactAngle: 180,
      actualAngle: 176.2,
      orb: 3.8,
      phase: "applying",
    };
    const impossibleSunMercuryTrine: MajorAspect = {
      ...saturnNeptuneOpposition,
      id: "Sun-Mercury-Trine",
      body1: "Sun",
      body2: "Mercury",
      aspect: "trine",
      aspectEnglish: "Trine",
      aspectVietnamese: "Tam hợp",
      exactAngle: 120,
      actualAngle: 120,
      orb: 0,
    };

    const snapshot = structuredClone(saturnNeptuneOpposition);
    const interpretations = interpretWesternAspects({
      aspects: [saturnNeptuneOpposition, impossibleSunMercuryTrine],
    });
    expect(interpretations).toHaveLength(1);
    expect(interpretations[0].rule.ruleId).toBe(
      "WESTERN-ASPECT-SATURN-NEPTUNE-OPPOSITION-V1",
    );
    expect(interpretations[0].evidence).toBe(saturnNeptuneOpposition);
    expect(saturnNeptuneOpposition).toEqual(snapshot);
    expect(getAspectInterpretationRule("Sun", "Mercury", "trine")).toBeNull();
  });

  it("contains and resolves all five Saturn-Pluto rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const saturnPlutoRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Saturn" && body2 === "Pluto",
    );

    expect(saturnPlutoRules).toHaveLength(5);
    expect(saturnPlutoRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Saturn",
        "Pluto",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-SATURN-PLUTO-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Saturn",
        body2: "Pluto",
        aspect: aspectCode,
      });
      expect(getAspectInterpretationRule("Pluto", "Saturn", aspectCode)).toBe(
        directRule,
      );
    }
  });

  it("resolves a real Saturn-Pluto aspect and rejects a fixed impossible combination", () => {
    const saturnPlutoSquare: MajorAspect = {
      id: "Pluto-Saturn-Square",
      body1: "Pluto",
      body2: "Saturn",
      aspect: "square",
      aspectEnglish: "Square",
      aspectVietnamese: "Vuông",
      exactAngle: 90,
      actualAngle: 87.6,
      orb: 2.4,
      phase: "separating",
    };
    const impossibleSunMercuryTrine: MajorAspect = {
      ...saturnPlutoSquare,
      id: "Sun-Mercury-Trine",
      body1: "Sun",
      body2: "Mercury",
      aspect: "trine",
      aspectEnglish: "Trine",
      aspectVietnamese: "Tam hợp",
      exactAngle: 120,
      actualAngle: 120,
      orb: 0,
    };

    const snapshot = structuredClone(saturnPlutoSquare);
    const interpretations = interpretWesternAspects({
      aspects: [saturnPlutoSquare, impossibleSunMercuryTrine],
    });
    expect(interpretations).toHaveLength(1);
    expect(interpretations[0].rule.ruleId).toBe(
      "WESTERN-ASPECT-SATURN-PLUTO-SQUARE-V1",
    );
    expect(interpretations[0].evidence).toBe(saturnPlutoSquare);
    expect(saturnPlutoSquare).toEqual(snapshot);
    expect(getAspectInterpretationRule("Sun", "Mercury", "trine")).toBeNull();
  });

  it("contains and resolves all five Uranus-Neptune rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const uranusNeptuneRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Uranus" && body2 === "Neptune",
    );

    expect(uranusNeptuneRules).toHaveLength(5);
    expect(uranusNeptuneRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Uranus",
        "Neptune",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-URANUS-NEPTUNE-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Uranus",
        body2: "Neptune",
        aspect: aspectCode,
      });
      expect(getAspectInterpretationRule("Neptune", "Uranus", aspectCode)).toBe(
        directRule,
      );
    }
  });

  it("resolves a real Uranus-Neptune aspect and rejects a fixed impossible combination", () => {
    const uranusNeptuneConjunction: MajorAspect = {
      id: "Neptune-Uranus-Conjunction",
      body1: "Neptune",
      body2: "Uranus",
      aspect: "conjunction",
      aspectEnglish: "Conjunction",
      aspectVietnamese: "Đồng cung",
      exactAngle: 0,
      actualAngle: 3.2,
      orb: 3.2,
      phase: "applying",
    };
    const impossibleSunMercuryTrine: MajorAspect = {
      ...uranusNeptuneConjunction,
      id: "Sun-Mercury-Trine",
      body1: "Sun",
      body2: "Mercury",
      aspect: "trine",
      aspectEnglish: "Trine",
      aspectVietnamese: "Tam hợp",
      exactAngle: 120,
      actualAngle: 120,
      orb: 0,
    };

    const snapshot = structuredClone(uranusNeptuneConjunction);
    const interpretations = interpretWesternAspects({
      aspects: [uranusNeptuneConjunction, impossibleSunMercuryTrine],
    });
    expect(interpretations).toHaveLength(1);
    expect(interpretations[0].rule.ruleId).toBe(
      "WESTERN-ASPECT-URANUS-NEPTUNE-CONJUNCTION-V1",
    );
    expect(interpretations[0].evidence).toBe(uranusNeptuneConjunction);
    expect(uranusNeptuneConjunction).toEqual(snapshot);
    expect(getAspectInterpretationRule("Sun", "Mercury", "trine")).toBeNull();
  });

  it("contains and resolves all five Uranus-Pluto rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const uranusPlutoRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Uranus" && body2 === "Pluto",
    );

    expect(uranusPlutoRules).toHaveLength(5);
    expect(uranusPlutoRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Uranus",
        "Pluto",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-URANUS-PLUTO-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Uranus",
        body2: "Pluto",
        aspect: aspectCode,
      });
      expect(getAspectInterpretationRule("Pluto", "Uranus", aspectCode)).toBe(
        directRule,
      );
    }
  });

  it("resolves a real Uranus-Pluto aspect and rejects a fixed impossible combination", () => {
    const uranusPlutoSextile: MajorAspect = {
      id: "Pluto-Uranus-Sextile",
      body1: "Pluto",
      body2: "Uranus",
      aspect: "sextile",
      aspectEnglish: "Sextile",
      aspectVietnamese: "Lục hợp",
      exactAngle: 60,
      actualAngle: 57.4,
      orb: 2.6,
      phase: "separating",
    };
    const impossibleSunMercuryTrine: MajorAspect = {
      ...uranusPlutoSextile,
      id: "Sun-Mercury-Trine",
      body1: "Sun",
      body2: "Mercury",
      aspect: "trine",
      aspectEnglish: "Trine",
      aspectVietnamese: "Tam hợp",
      exactAngle: 120,
      actualAngle: 120,
      orb: 0,
    };

    const snapshot = structuredClone(uranusPlutoSextile);
    const interpretations = interpretWesternAspects({
      aspects: [uranusPlutoSextile, impossibleSunMercuryTrine],
    });
    expect(interpretations).toHaveLength(1);
    expect(interpretations[0].rule.ruleId).toBe(
      "WESTERN-ASPECT-URANUS-PLUTO-SEXTILE-V1",
    );
    expect(interpretations[0].evidence).toBe(uranusPlutoSextile);
    expect(uranusPlutoSextile).toEqual(snapshot);
    expect(getAspectInterpretationRule("Sun", "Mercury", "trine")).toBeNull();
  });

  it("contains and resolves all five Neptune-Pluto rules in either input order", () => {
    const aspects = [
      "conjunction",
      "opposition",
      "trine",
      "square",
      "sextile",
    ] as const;
    const neptunePlutoRules = westernAspectInterpretationRules.filter(
      ({ body1, body2 }) => body1 === "Neptune" && body2 === "Pluto",
    );

    expect(neptunePlutoRules).toHaveLength(5);
    expect(neptunePlutoRules.map(({ aspect }) => aspect).sort()).toEqual(
      [...aspects].sort(),
    );

    for (const aspectCode of aspects) {
      const directRule = getAspectInterpretationRule(
        "Neptune",
        "Pluto",
        aspectCode,
      );
      expect(directRule?.ruleId).toBe(
        `WESTERN-ASPECT-NEPTUNE-PLUTO-${aspectCode.toUpperCase()}-V1`,
      );
      expect(directRule?.evidence).toEqual({
        body1: "Neptune",
        body2: "Pluto",
        aspect: aspectCode,
      });
      expect(getAspectInterpretationRule("Pluto", "Neptune", aspectCode)).toBe(
        directRule,
      );
    }
  });

  it("resolves a real Neptune-Pluto aspect and rejects a fixed impossible combination", () => {
    const neptunePlutoSextile: MajorAspect = {
      id: "Pluto-Neptune-Sextile",
      body1: "Pluto",
      body2: "Neptune",
      aspect: "sextile",
      aspectEnglish: "Sextile",
      aspectVietnamese: "Lục hợp",
      exactAngle: 60,
      actualAngle: 56.9,
      orb: 3.1,
      phase: "applying",
    };
    const impossibleSunMercuryTrine: MajorAspect = {
      ...neptunePlutoSextile,
      id: "Sun-Mercury-Trine",
      body1: "Sun",
      body2: "Mercury",
      aspect: "trine",
      aspectEnglish: "Trine",
      aspectVietnamese: "Tam hợp",
      exactAngle: 120,
      actualAngle: 120,
      orb: 0,
    };

    const snapshot = structuredClone(neptunePlutoSextile);
    const interpretations = interpretWesternAspects({
      aspects: [neptunePlutoSextile, impossibleSunMercuryTrine],
    });
    expect(interpretations).toHaveLength(1);
    expect(interpretations[0].rule.ruleId).toBe(
      "WESTERN-ASPECT-NEPTUNE-PLUTO-SEXTILE-V1",
    );
    expect(interpretations[0].evidence).toBe(neptunePlutoSextile);
    expect(neptunePlutoSextile).toEqual(snapshot);
    expect(getAspectInterpretationRule("Sun", "Mercury", "trine")).toBeNull();
  });

  it("only resolves aspects present in calculation and preserves their evidence", () => {
    const snapshot = structuredClone(aspect);
    const interpretations = interpretWesternAspects({ aspects: [aspect] });

    expect(interpretations).toHaveLength(1);
    expect(interpretations[0].rule.ruleId).toBe(
      "WESTERN-ASPECT-SUN-MOON-TRINE-V1",
    );
    expect(interpretations[0].evidence).toBe(aspect);
    expect(interpretations[0].evidence.actualAngle).toBe(119.4);
    expect(interpretations[0].evidence.orb).toBe(0.6);
    expect(interpretations[0].evidence.phase).toBe("applying");
    expect(aspect).toEqual(snapshot);
    expect(interpretWesternAspects({ aspects: [] })).toEqual([]);
  });

  it("does not affect the existing 120 planet-house rules", () => {
    expect(westernPlanetHouseInterpretationRules).toHaveLength(120);
  });
});
