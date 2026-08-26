import { describe, expect, it } from "vitest";
import type { WesternRelationshipCandidate } from "./western-relationship-synthesis";
import { synthesizeWesternRelationship } from "./western-relationship-synthesis";

function candidate(
  overrides: Partial<WesternRelationshipCandidate> &
    Pick<WesternRelationshipCandidate, "candidateId" | "ruleId">,
): WesternRelationshipCandidate {
  const { candidateId, ruleId, ...optionalOverrides } = overrides;

  return {
    candidateId,
    themeKey: "emotional-attunement",
    domain: "relationship",
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
    relationshipSource: "moon",
    themeLabel: "Điều hòa cảm xúc",
    statement: "Có xu hướng chú ý đến nhịp cảm xúc trong kết nối gần gũi.",
    ...optionalOverrides,
  };
}

describe("synthesizeWesternRelationship", () => {
  it("ranks stronger relationship themes first without adding new wording", () => {
    const strongStatement =
      "Có xu hướng trao đổi trực tiếp hơn khi cảm thấy kết nối đủ an toàn.";
    const result = synthesizeWesternRelationship([
      candidate({
        candidateId: "pace",
        ruleId: "WESTERN-VENUS-TAURUS-V1",
        relationshipSource: "venus",
        themeKey: "relational-pace",
        themeLabel: "Nhịp kết nối",
        statement: "Có xu hướng cần thời gian để xây dựng cảm giác tin cậy.",
        importance: 0.6,
      }),
      candidate({
        candidateId: "communication",
        ruleId: "WESTERN-ASPECT-MOON-MERCURY-TRINE-V1",
        relationshipSource: "related-aspect",
        themeKey: "relational-communication",
        themeLabel: "Trao đổi cảm xúc",
        statement: strongStatement,
        importance: 0.9,
      }),
    ]);

    expect(result.themes.map(({ theme }) => theme.themeKey)).toEqual([
      "relational-communication",
      "relational-pace",
    ]);
    expect(result.themes[0].supportiveStatements).toEqual([strongStatement]);
  });

  it("counts independent repeated evidence and deduplicates a shared source", () => {
    const result = synthesizeWesternRelationship([
      candidate({
        candidateId: "trust-venus",
        ruleId: "WESTERN-VENUS-CANCER-V1",
        relationshipSource: "venus",
        themeKey: "building-trust",
        themeLabel: "Xây dựng tin cậy",
        importance: 0.7,
        evidence: [{ evidenceGroupId: "venus-sign", sourceType: "placement", sourceKey: "Venus:Cancer" }],
      }),
      candidate({
        candidateId: "trust-house",
        ruleId: "WESTERN-MOON-HOUSE-7-V1",
        relationshipSource: "house-7",
        themeKey: "building-trust",
        themeLabel: "Xây dựng tin cậy",
        importance: 0.6,
        evidence: [{ evidenceGroupId: "moon-house-7", sourceType: "house", sourceKey: "Moon:7" }],
      }),
      candidate({
        candidateId: "trust-duplicate",
        ruleId: "WESTERN-VENUS-CANCER-DERIVED-V1",
        relationshipSource: "venus",
        themeKey: "building-trust",
        themeLabel: "Xây dựng tin cậy",
        importance: 0.5,
        evidence: [{ evidenceGroupId: "venus-sign", sourceType: "derived", sourceKey: "Venus:Cancer:derived" }],
      }),
    ]);

    expect(result.themes[0].theme.score).toBeCloseTo(1.3);
    expect(result.themes[0].theme.evidenceGroupIds).toEqual([
      "moon-house-7",
      "venus-sign",
    ]);
  });

  it("preserves supportive/challenging conflict, uncertainty and provenance", () => {
    const supportive = candidate({
      candidateId: "space-supportive",
      ruleId: "WESTERN-VENUS-AQUARIUS-V1",
      relationshipSource: "venus",
      themeKey: "closeness-and-space",
      themeLabel: "Gần gũi và không gian riêng",
      statement: "Có thể tôn trọng không gian riêng trong khi vẫn duy trì kết nối.",
      uncertainty: 0.1,
    });
    const challenging = candidate({
      candidateId: "space-challenging",
      ruleId: "WESTERN-ASPECT-MOON-URANUS-SQUARE-V1",
      relationshipSource: "related-aspect",
      themeKey: "closeness-and-space",
      themeLabel: "Gần gũi và không gian riêng",
      polarity: "challenging",
      statement: "Khi chịu áp lực, nhu cầu đổi nhịp có thể làm kết nối thiếu ổn định.",
      uncertainty: 0.8,
      evidence: [{ evidenceGroupId: "moon-uranus-square", sourceType: "aspect", sourceKey: "Moon:Uranus:square" }],
    });
    const result = synthesizeWesternRelationship([supportive, challenging]);
    const theme = result.themes[0];

    expect(theme.theme.hasConflict).toBe(true);
    expect(theme.supportiveStatements).toEqual([supportive.statement]);
    expect(theme.challengingStatements).toEqual([challenging.statement]);
    expect(theme.theme.candidates[1].score).toBeCloseTo(0.2);
    expect(theme.theme.candidates[1].candidate.evidence).toBe(
      challenging.evidence,
    );
  });

  it("is deterministic, non-mutating and empty-safe", () => {
    const input = [
      candidate({ candidateId: "b", ruleId: "RULE-B", statement: "Nguồn B." }),
      candidate({ candidateId: "a", ruleId: "RULE-A", statement: "Nguồn A." }),
    ] as const;
    const snapshot = structuredClone(input);

    expect(synthesizeWesternRelationship(input)).toEqual(
      synthesizeWesternRelationship([...input].reverse()),
    );
    expect(input).toEqual(snapshot);
    expect(synthesizeWesternRelationship([])).toEqual({
      policyId: "western-relationship-synthesis-v1",
      version: "1.0.0",
      themes: [],
    });
  });

  it("enforces relationship domain isolation at the typed boundary", () => {
    const relationship = candidate({
      candidateId: "relationship",
      ruleId: "WESTERN-MARS-LIBRA-V1",
      relationshipSource: "mars",
    });

    expect(synthesizeWesternRelationship([relationship]).themes).toHaveLength(1);
    expect(relationship.domain).toBe("relationship");

    const invalidDomain: WesternRelationshipCandidate = {
      ...relationship,
      // @ts-expect-error WA-P4-003 must not accept career candidates.
      domain: "career",
    };
    expect(synthesizeWesternRelationship([invalidDomain]).themes).toEqual([]);

    const invalidSource: WesternRelationshipCandidate = {
      ...relationship,
      // @ts-expect-error Finance is outside the canonical relationship sources.
      relationshipSource: "finance",
    };
    expect(() => synthesizeWesternRelationship([invalidSource])).toThrow(
      "Relationship source không được phép",
    );
  });
});
