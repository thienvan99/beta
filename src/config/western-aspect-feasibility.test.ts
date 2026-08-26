import { describe, expect, it } from "vitest";
import { westernAspectInterpretationRules } from "../data/western-aspect-interpretations";
import type { MajorAspect } from "../lib/western-astrology";
import { interpretWesternAspects } from "../lib/western-aspect-interpretation";
import {
  getWesternAspectFeasibility,
  isWesternAspectInterpretationFeasible,
  westernAspectFeasibility,
  westernMajorAspects,
} from "./western-aspect-feasibility";

describe("western aspect feasibility", () => {
  it("contains exactly 45 unique canonical body pairs", () => {
    expect(westernAspectFeasibility).toHaveLength(45);
    const keys = westernAspectFeasibility.map(
      ({ body1, body2 }) => `${body1}:${body2}`,
    );
    expect(new Set(keys).size).toBe(45);
    expect(
      westernAspectFeasibility.every(
        ({ body1, body2 }) => body1.localeCompare(body2, "en") < 0,
      ),
    ).toBe(true);
  });

  it("looks up the same pair regardless of body order", () => {
    expect(getWesternAspectFeasibility("Sun", "Mercury")).toBe(
      getWesternAspectFeasibility("Mercury", "Sun"),
    );
  });

  it("only contains the five configured major aspects", () => {
    const allowed = new Set(westernMajorAspects);
    expect(allowed.size).toBe(5);
    for (const { supportedAspects } of westernAspectFeasibility) {
      expect(supportedAspects.length).toBeGreaterThan(0);
      expect(supportedAspects.every((aspect) => allowed.has(aspect))).toBe(true);
    }
  });

  it("restricts Sun-Mercury and Sun-Venus using geocentric elongation", () => {
    expect(
      getWesternAspectFeasibility("Sun", "Mercury")?.supportedAspects,
    ).toEqual(["conjunction"]);
    expect(
      getWesternAspectFeasibility("Sun", "Venus")?.supportedAspects,
    ).toEqual(["conjunction"]);
    expect(
      getWesternAspectFeasibility("Mercury", "Venus")?.supportedAspects,
    ).toEqual(["conjunction", "sextile"]);
    expect(
      isWesternAspectInterpretationFeasible("Sun", "Mercury", "sextile"),
    ).toBe(false);
  });

  it("has 214 feasible pair-aspect combinations", () => {
    expect(
      westernAspectFeasibility.reduce(
        (total, { supportedAspects }) => total + supportedAspects.length,
        0,
      ),
    ).toBe(214);
  });

  it("supports all five major aspects for Moon-Mercury", () => {
    expect(
      getWesternAspectFeasibility("Moon", "Mercury")?.supportedAspects,
    ).toEqual(westernMajorAspects);
    for (const aspect of westernMajorAspects) {
      expect(
        isWesternAspectInterpretationFeasible("Mercury", "Moon", aspect),
      ).toBe(true);
    }
  });

  it("supports all five major aspects for Moon-Venus", () => {
    expect(
      getWesternAspectFeasibility("Moon", "Venus")?.supportedAspects,
    ).toEqual(westernMajorAspects);
    for (const aspect of westernMajorAspects) {
      expect(
        isWesternAspectInterpretationFeasible("Venus", "Moon", aspect),
      ).toBe(true);
    }
  });

  it("supports all five major aspects for Moon-Mars", () => {
    expect(
      getWesternAspectFeasibility("Moon", "Mars")?.supportedAspects,
    ).toEqual(westernMajorAspects);
    for (const aspect of westernMajorAspects) {
      expect(
        isWesternAspectInterpretationFeasible("Mars", "Moon", aspect),
      ).toBe(true);
    }
  });

  it("supports all five major aspects for Moon-Jupiter", () => {
    expect(
      getWesternAspectFeasibility("Moon", "Jupiter")?.supportedAspects,
    ).toEqual(westernMajorAspects);
    for (const aspect of westernMajorAspects) {
      expect(
        isWesternAspectInterpretationFeasible("Jupiter", "Moon", aspect),
      ).toBe(true);
    }
  });

  it("supports all five major aspects for Moon-Saturn", () => {
    expect(
      getWesternAspectFeasibility("Moon", "Saturn")?.supportedAspects,
    ).toEqual(westernMajorAspects);
    for (const aspect of westernMajorAspects) {
      expect(
        isWesternAspectInterpretationFeasible("Saturn", "Moon", aspect),
      ).toBe(true);
    }
  });

  it("supports all five major aspects for Moon-Uranus", () => {
    expect(
      getWesternAspectFeasibility("Moon", "Uranus")?.supportedAspects,
    ).toEqual(westernMajorAspects);
    for (const aspect of westernMajorAspects) {
      expect(
        isWesternAspectInterpretationFeasible("Uranus", "Moon", aspect),
      ).toBe(true);
    }
  });

  it("supports all five major aspects for Moon-Neptune", () => {
    expect(
      getWesternAspectFeasibility("Moon", "Neptune")?.supportedAspects,
    ).toEqual(westernMajorAspects);
    for (const aspect of westernMajorAspects) {
      expect(
        isWesternAspectInterpretationFeasible("Neptune", "Moon", aspect),
      ).toBe(true);
    }
  });

  it("supports all five major aspects for Moon-Pluto", () => {
    expect(
      getWesternAspectFeasibility("Moon", "Pluto")?.supportedAspects,
    ).toEqual(westernMajorAspects);
    for (const aspect of westernMajorAspects) {
      expect(
        isWesternAspectInterpretationFeasible("Pluto", "Moon", aspect),
      ).toBe(true);
    }
  });

  it("only supports conjunction and sextile for Mercury-Venus", () => {
    expect(
      getWesternAspectFeasibility("Mercury", "Venus")?.supportedAspects,
    ).toEqual(["conjunction", "sextile"]);
    expect(
      isWesternAspectInterpretationFeasible(
        "Venus",
        "Mercury",
        "conjunction",
      ),
    ).toBe(true);
    expect(
      isWesternAspectInterpretationFeasible("Venus", "Mercury", "sextile"),
    ).toBe(true);
    for (const impossibleAspect of ["opposition", "trine", "square"] as const) {
      expect(
        isWesternAspectInterpretationFeasible(
          "Mercury",
          "Venus",
          impossibleAspect,
        ),
      ).toBe(false);
    }
  });

  it("supports all five major aspects for Mercury-Mars", () => {
    expect(
      getWesternAspectFeasibility("Mercury", "Mars")?.supportedAspects,
    ).toEqual(westernMajorAspects);
    for (const aspect of westernMajorAspects) {
      expect(
        isWesternAspectInterpretationFeasible("Mars", "Mercury", aspect),
      ).toBe(true);
    }
  });

  it("supports all five major aspects for Mercury-Jupiter", () => {
    expect(
      getWesternAspectFeasibility("Mercury", "Jupiter")?.supportedAspects,
    ).toEqual(westernMajorAspects);
    for (const aspect of westernMajorAspects) {
      expect(
        isWesternAspectInterpretationFeasible("Jupiter", "Mercury", aspect),
      ).toBe(true);
    }
  });

  it("supports all five major aspects for Mercury-Saturn", () => {
    expect(
      getWesternAspectFeasibility("Mercury", "Saturn")?.supportedAspects,
    ).toEqual(westernMajorAspects);
    for (const aspect of westernMajorAspects) {
      expect(
        isWesternAspectInterpretationFeasible("Saturn", "Mercury", aspect),
      ).toBe(true);
    }
  });

  it("supports all five major aspects for Mercury-Uranus", () => {
    expect(
      getWesternAspectFeasibility("Mercury", "Uranus")?.supportedAspects,
    ).toEqual(westernMajorAspects);
    for (const aspect of westernMajorAspects) {
      expect(
        isWesternAspectInterpretationFeasible("Uranus", "Mercury", aspect),
      ).toBe(true);
    }
  });

  it("supports all five major aspects for Venus-Jupiter", () => {
    expect(
      getWesternAspectFeasibility("Venus", "Jupiter")?.supportedAspects,
    ).toEqual(westernMajorAspects);
    for (const aspect of westernMajorAspects) {
      expect(
        isWesternAspectInterpretationFeasible("Jupiter", "Venus", aspect),
      ).toBe(true);
    }
  });

  it("supports all five major aspects for Venus-Saturn", () => {
    expect(
      getWesternAspectFeasibility("Venus", "Saturn")?.supportedAspects,
    ).toEqual(westernMajorAspects);
    for (const aspect of westernMajorAspects) {
      expect(
        isWesternAspectInterpretationFeasible("Saturn", "Venus", aspect),
      ).toBe(true);
    }
  });

  it("supports all five major aspects for Venus-Uranus", () => {
    expect(
      getWesternAspectFeasibility("Venus", "Uranus")?.supportedAspects,
    ).toEqual(westernMajorAspects);
    for (const aspect of westernMajorAspects) {
      expect(
        isWesternAspectInterpretationFeasible("Uranus", "Venus", aspect),
      ).toBe(true);
    }
  });

  it("supports all five major aspects for Venus-Neptune", () => {
    expect(
      getWesternAspectFeasibility("Venus", "Neptune")?.supportedAspects,
    ).toEqual(westernMajorAspects);
    for (const aspect of westernMajorAspects) {
      expect(
        isWesternAspectInterpretationFeasible("Neptune", "Venus", aspect),
      ).toBe(true);
    }
  });

  it("supports all five major aspects for Venus-Pluto", () => {
    expect(
      getWesternAspectFeasibility("Venus", "Pluto")?.supportedAspects,
    ).toEqual(westernMajorAspects);
    for (const aspect of westernMajorAspects) {
      expect(
        isWesternAspectInterpretationFeasible("Pluto", "Venus", aspect),
      ).toBe(true);
    }
  });

  it("preserves the five existing Sun-Moon interpretation rules", () => {
    expect(
      westernAspectInterpretationRules.filter(
        ({ body1, body2 }) => body1 === "Sun" && body2 === "Moon",
      ),
    ).toHaveLength(5);
    const evidence: MajorAspect = {
      id: "Moon-Sun-Sextile",
      body1: "Moon",
      body2: "Sun",
      aspect: "sextile",
      aspectEnglish: "Sextile",
      aspectVietnamese: "Lục hợp",
      exactAngle: 60,
      actualAngle: 59.5,
      orb: 0.5,
      phase: "applying",
    };
    const snapshot = structuredClone(evidence);
    const interpretation = interpretWesternAspects({ aspects: [evidence] });
    expect(interpretation).toHaveLength(1);
    expect(interpretation[0].evidence).toBe(evidence);
    expect(interpretation[0].rule.ruleId).toBe(
      "WESTERN-ASPECT-SUN-MOON-SEXTILE-V1",
    );
    expect(evidence).toEqual(snapshot);
  });
});
