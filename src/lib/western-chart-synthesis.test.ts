import { describe, expect, it } from "vitest";
import {
  aggregateWesternChartThemes,
  type WesternSynthesisCandidate,
} from "./western-chart-synthesis";

function candidate(
  overrides: Partial<WesternSynthesisCandidate> &
    Pick<WesternSynthesisCandidate, "candidateId" | "ruleId">,
): WesternSynthesisCandidate {
  const { candidateId, ruleId, ...optionalOverrides } = overrides;

  return {
    candidateId,
    themeKey: "self-direction",
    domain: "self",
    polarity: "supportive",
    ruleId,
    ruleVersion: "1.0.0",
    importance: 1,
    specificity: 1,
    domainRelevance: 1,
    uncertainty: 0,
    evidence: [
      {
        evidenceGroupId: candidateId,
        sourceType: "placement",
        sourceKey: candidateId,
      },
    ],
    ...optionalOverrides,
  };
}

describe("aggregateWesternChartThemes", () => {
  it("ranks themes from explicit signals and independent repeated evidence", () => {
    const result = aggregateWesternChartThemes([
      candidate({
        candidateId: "steady-a",
        ruleId: "RULE-STEADY-A",
        themeKey: "steady",
        importance: 0.8,
        evidence: [{ evidenceGroupId: "sun-sign", sourceType: "placement", sourceKey: "Sun:Aries" }],
      }),
      candidate({
        candidateId: "steady-b",
        ruleId: "RULE-STEADY-B",
        themeKey: "steady",
        importance: 0.7,
        evidence: [{ evidenceGroupId: "saturn-house", sourceType: "house", sourceKey: "Saturn:10" }],
      }),
      candidate({
        candidateId: "flexible",
        ruleId: "RULE-FLEXIBLE",
        themeKey: "flexible",
        importance: 1,
      }),
    ]);

    expect(result.themes.map(({ themeKey, score }) => [themeKey, score])).toEqual([
      ["steady", 1.5],
      ["flexible", 1],
    ]);
  });

  it("deduplicates shared evidence instead of counting derived rules repeatedly", () => {
    const result = aggregateWesternChartThemes([
      candidate({
        candidateId: "placement-primary",
        ruleId: "RULE-PRIMARY",
        importance: 0.9,
        evidence: [{ evidenceGroupId: "sun-sign", sourceType: "placement", sourceKey: "Sun:Aries" }],
      }),
      candidate({
        candidateId: "placement-derived",
        ruleId: "RULE-DERIVED",
        importance: 0.6,
        evidence: [{ evidenceGroupId: "sun-sign", sourceType: "derived", sourceKey: "Sun:Aries:derived" }],
      }),
    ]);

    expect(result.themes[0].score).toBe(0.9);
    expect(result.themes[0].evidenceGroupIds).toEqual(["sun-sign"]);
  });

  it("preserves both sides of a conflict and all source provenance", () => {
    const supportive = candidate({ candidateId: "supportive", ruleId: "RULE-SUPPORT" });
    const challenging = candidate({
      candidateId: "challenging",
      ruleId: "RULE-CHALLENGE",
      polarity: "challenging",
      evidence: [{ evidenceGroupId: "sun-square-saturn", sourceType: "aspect", sourceKey: "Sun:Saturn:square" }],
    });
    const result = aggregateWesternChartThemes([supportive, challenging]);

    expect(result.themes[0].hasConflict).toBe(true);
    expect(result.themes[0].candidates.map(({ candidate: item }) => item)).toEqual([
      challenging,
      supportive,
    ]);
    expect(result.themes[0].candidates[0].candidate.evidence).toBe(challenging.evidence);
  });

  it("treats opposite polarities in one evidence group as internal duality", () => {
    const sharedEvidence = [
      {
        evidenceGroupId: "sun-sign",
        sourceType: "placement" as const,
        sourceKey: "Sun:Aries",
      },
    ];
    const result = aggregateWesternChartThemes([
      candidate({
        candidateId: "sun-strength",
        ruleId: "RULE-SUN-STRENGTH",
        evidence: sharedEvidence,
      }),
      candidate({
        candidateId: "sun-challenge",
        ruleId: "RULE-SUN-CHALLENGE",
        polarity: "challenging",
        evidence: sharedEvidence,
      }),
    ]);

    expect(result.themes[0].hasConflict).toBe(false);
    expect(result.themes[0].score).toBe(1);
    expect(result.themes[0].evidenceGroupIds).toEqual(["sun-sign"]);
  });

  it("detects conflict between a mixed evidence group and an independent supportive group", () => {
    const result = aggregateWesternChartThemes([
      candidate({
        candidateId: "sun-strength",
        ruleId: "RULE-SUN-STRENGTH",
        evidence: [{ evidenceGroupId: "sun-sign", sourceType: "placement", sourceKey: "Sun:Aries" }],
      }),
      candidate({
        candidateId: "sun-challenge",
        ruleId: "RULE-SUN-CHALLENGE",
        polarity: "challenging",
        evidence: [{ evidenceGroupId: "sun-sign", sourceType: "placement", sourceKey: "Sun:Aries" }],
      }),
      candidate({
        candidateId: "moon-strength",
        ruleId: "RULE-MOON-STRENGTH",
        evidence: [{ evidenceGroupId: "moon-sign", sourceType: "placement", sourceKey: "Moon:Cancer" }],
      }),
    ]);

    expect(result.themes[0].hasConflict).toBe(true);
    expect(result.themes[0].score).toBe(2);
  });

  it("detects cross-group conflict when the other group is challenging or mixed", () => {
    const mixedGroupA = [
      candidate({
        candidateId: "a-supportive",
        ruleId: "RULE-A-SUPPORTIVE",
        evidence: [{ evidenceGroupId: "group-a", sourceType: "placement", sourceKey: "Sun:Aries" }],
      }),
      candidate({
        candidateId: "a-challenging",
        ruleId: "RULE-A-CHALLENGING",
        polarity: "challenging",
        evidence: [{ evidenceGroupId: "group-a", sourceType: "placement", sourceKey: "Sun:Aries" }],
      }),
    ];
    const challengingGroupB = candidate({
      candidateId: "b-challenging",
      ruleId: "RULE-B-CHALLENGING",
      polarity: "challenging",
      evidence: [{ evidenceGroupId: "group-b", sourceType: "placement", sourceKey: "Moon:Cancer" }],
    });
    const supportiveGroupB = candidate({
      candidateId: "b-supportive",
      ruleId: "RULE-B-SUPPORTIVE",
      evidence: [{ evidenceGroupId: "group-b", sourceType: "placement", sourceKey: "Moon:Cancer" }],
    });

    expect(
      aggregateWesternChartThemes([...mixedGroupA, challengingGroupB]).themes[0]
        .hasConflict,
    ).toBe(true);
    expect(
      aggregateWesternChartThemes([
        ...mixedGroupA,
        supportiveGroupB,
        challengingGroupB,
      ]).themes[0].hasConflict,
    ).toBe(true);
  });

  it("is deterministic across input order and does not mutate its input", () => {
    const input = [
      candidate({ candidateId: "b", ruleId: "RULE-B" }),
      candidate({ candidateId: "a", ruleId: "RULE-A" }),
    ] as const;
    const snapshot = structuredClone(input);

    expect(aggregateWesternChartThemes(input)).toEqual(
      aggregateWesternChartThemes([...input].reverse()),
    );
    expect(input).toEqual(snapshot);
  });

  it("rejects invalid signals, duplicate IDs and candidates without evidence", () => {
    expect(() =>
      aggregateWesternChartThemes([
        candidate({ candidateId: "invalid", ruleId: "RULE-INVALID", uncertainty: 1.1 }),
      ]),
    ).toThrow("uncertainty");
    expect(() =>
      aggregateWesternChartThemes([
        candidate({ candidateId: "duplicate", ruleId: "RULE-A" }),
        candidate({ candidateId: "duplicate", ruleId: "RULE-B" }),
      ]),
    ).toThrow("candidateId bị trùng");
    expect(() =>
      aggregateWesternChartThemes([
        candidate({ candidateId: "empty", ruleId: "RULE-EMPTY", evidence: [] }),
      ]),
    ).toThrow("không có evidence");
  });
});
