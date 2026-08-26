import { describe, expect, it } from "vitest";
import { calculateWesternAstrology } from "./western-astrology";
import {
  projectWesternCoreCandidates,
  westernCoreCandidateProjectionPolicy,
} from "./western-core-candidate-projection";
import { interpretWesternCoreTriad } from "./western-interpretation";

function calculationFixture() {
  return calculateWesternAstrology({
    localDateTime: "1990-01-15T08:30:00",
    utcDateTime: "1990-01-15T01:30:00Z",
    latitude: 10.8231,
    longitude: 106.6297,
    timeZone: "Asia/Ho_Chi_Minh",
  });
}

describe("projectWesternCoreCandidates", () => {
  it("projects exactly four canonical candidates for each Sun, Moon and ASC rule", () => {
    const matchedCore = interpretWesternCoreTriad(calculationFixture());
    const candidates = projectWesternCoreCandidates(matchedCore);

    expect(westernCoreCandidateProjectionPolicy).toEqual({
      policyId: "western-core-candidate-projection-v1",
      version: "1.0.0",
    });
    expect(candidates).toHaveLength(12);

    for (const position of matchedCore.positions) {
      const ruleCandidates = candidates.filter(
        ({ ruleId }) => ruleId === position.rule.ruleId,
      );
      const body = position.factor.toLowerCase();
      const sign = position.sign.toLowerCase();

      expect(ruleCandidates).toHaveLength(4);
      expect(ruleCandidates.map(({ statement }) => statement)).toEqual([
        ...position.rule.strengths,
        ...position.rule.challenges,
      ]);
      expect(ruleCandidates.map(({ polarity }) => polarity)).toEqual([
        "supportive",
        "supportive",
        "challenging",
        "challenging",
      ]);
      expect(ruleCandidates.map(({ candidateId }) => candidateId)).toEqual([
        `${position.rule.ruleId.toLowerCase()}:supportive:1`,
        `${position.rule.ruleId.toLowerCase()}:supportive:2`,
        `${position.rule.ruleId.toLowerCase()}:challenging:1`,
        `${position.rule.ruleId.toLowerCase()}:challenging:2`,
      ]);
      expect(
        new Set(
          ruleCandidates.flatMap(({ evidence }) =>
            evidence.map(({ evidenceGroupId }) => evidenceGroupId),
          ),
        ),
      ).toEqual(new Set([`western:core-sign:${body}:${sign}`]));
      expect(ruleCandidates[0].evidence).toEqual([
        {
          evidenceGroupId: `western:core-sign:${body}:${sign}`,
          sourceType: "placement",
          sourceKey: `western:placement:${body}:sign:${sign}`,
        },
      ]);
      expect(
        ruleCandidates.every(
          (candidate) =>
            candidate.domain === "personality" &&
            candidate.importance === 1 &&
            candidate.specificity === 1 &&
            candidate.domainRelevance === 1 &&
            candidate.uncertainty === 0,
        ),
      ).toBe(true);
    }
  });

  it("uses the three approved themes and independent placement evidence groups", () => {
    const candidates = projectWesternCoreCandidates(
      interpretWesternCoreTriad(calculationFixture()),
    );

    expect([...new Set(candidates.map(({ themeKey }) => themeKey))]).toEqual([
      "identity-and-self-expression",
      "emotional-needs-and-regulation",
      "outward-style-and-life-approach",
    ]);
    expect([...new Set(candidates.map(({ themeLabel }) => themeLabel))]).toEqual([
      "Bản sắc và cách thể hiện bản thân",
      "Nhu cầu cảm xúc và cách tự cân bằng",
      "Phong cách thể hiện và cách tiếp cận cuộc sống",
    ]);
    expect(
      new Set(
        candidates.flatMap(({ evidence }) =>
          evidence.map(({ evidenceGroupId }) => evidenceGroupId),
        ),
      ).size,
    ).toBe(3);
  });

  it("is deterministic across matched-position order", () => {
    const matchedCore = interpretWesternCoreTriad(calculationFixture());

    expect(projectWesternCoreCandidates(matchedCore)).toEqual(
      projectWesternCoreCandidates({
        ...matchedCore,
        positions: [...matchedCore.positions].reverse(),
      }),
    );
  });
});
