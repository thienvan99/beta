import { describe, expect, it } from "vitest";
import type { WesternPersonalityPotentialCandidate } from "./western-personality-potential-synthesis";
import { synthesizeWesternPersonalityPotential } from "./western-personality-potential-synthesis";

function candidate(
  overrides: Partial<WesternPersonalityPotentialCandidate> &
    Pick<WesternPersonalityPotentialCandidate, "candidateId" | "ruleId">,
): WesternPersonalityPotentialCandidate {
  const { candidateId, ruleId, ...optionalOverrides } = overrides;

  return {
    candidateId,
    themeKey: "self-direction",
    domain: "personality",
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
    themeLabel: "Định hướng bản thân",
    statement: "Có xu hướng chủ động xác định hướng đi.",
    ...optionalOverrides,
  };
}

describe("synthesizeWesternPersonalityPotential", () => {
  it("separates personality from potential and ranks stronger canonical candidates first", () => {
    const result = synthesizeWesternPersonalityPotential([
      candidate({
        candidateId: "potential-learning",
        ruleId: "WESTERN-MERCURY-GEMINI-V1",
        domain: "potential",
        themeKey: "adaptive-learning",
        themeLabel: "Học hỏi thích nghi",
        statement: "Có tiềm năng học nhanh khi được trao đổi và thử nhiều cách tiếp cận.",
        importance: 0.8,
      }),
      candidate({
        candidateId: "personality-observation",
        ruleId: "WESTERN-MOON-VIRGO-V1",
        themeKey: "careful-observation",
        themeLabel: "Quan sát kỹ",
        statement: "Có xu hướng quan sát chi tiết trước khi phản hồi.",
        importance: 0.7,
      }),
      candidate({
        candidateId: "personality-direction",
        ruleId: "WESTERN-SUN-ARIES-V1",
        importance: 0.9,
      }),
    ]);

    expect(result.personality.map(({ theme }) => theme.themeKey)).toEqual([
      "self-direction",
      "careful-observation",
    ]);
    expect(result.potential[0].theme.themeKey).toBe("adaptive-learning");
  });

  it("strengthens repeated themes only with independent evidence groups", () => {
    const result = synthesizeWesternPersonalityPotential([
      candidate({
        candidateId: "focus-sign",
        ruleId: "WESTERN-SUN-CAPRICORN-V1",
        themeKey: "sustained-focus",
        themeLabel: "Tập trung bền bỉ",
        importance: 0.7,
        evidence: [{ evidenceGroupId: "sun-sign", sourceType: "placement", sourceKey: "Sun:Capricorn" }],
      }),
      candidate({
        candidateId: "focus-house",
        ruleId: "WESTERN-SATURN-HOUSE-10-V1",
        themeKey: "sustained-focus",
        themeLabel: "Tập trung bền bỉ",
        importance: 0.6,
        evidence: [{ evidenceGroupId: "saturn-house", sourceType: "house", sourceKey: "Saturn:10" }],
      }),
      candidate({
        candidateId: "focus-duplicate",
        ruleId: "WESTERN-SUN-CAPRICORN-DERIVED-V1",
        themeKey: "sustained-focus",
        themeLabel: "Tập trung bền bỉ",
        importance: 0.5,
        evidence: [{ evidenceGroupId: "sun-sign", sourceType: "derived", sourceKey: "Sun:Capricorn:derived" }],
      }),
    ]);

    expect(result.personality[0].theme.score).toBeCloseTo(1.3);
    expect(result.personality[0].theme.evidenceGroupIds).toEqual([
      "saturn-house",
      "sun-sign",
    ]);
  });

  it("preserves supportive/challenging tension, uncertainty and provenance", () => {
    const supportive = candidate({
      candidateId: "open-supportive",
      ruleId: "WESTERN-JUPITER-AQUARIUS-V1",
      domain: "potential",
      themeKey: "openness",
      themeLabel: "Mở rộng góc nhìn",
      statement: "Có tiềm năng mở rộng góc nhìn qua những môi trường đa dạng.",
      uncertainty: 0.1,
    });
    const challenging = candidate({
      candidateId: "open-challenging",
      ruleId: "WESTERN-ASPECT-MERCURY-SATURN-SQUARE-V1",
      domain: "potential",
      themeKey: "openness",
      themeLabel: "Mở rộng góc nhìn",
      polarity: "challenging",
      statement: "Khi chịu áp lực, sự thận trọng có thể làm chậm việc thử góc nhìn mới.",
      uncertainty: 0.8,
      evidence: [{ evidenceGroupId: "mercury-saturn-square", sourceType: "aspect", sourceKey: "Mercury:Saturn:square" }],
    });
    const result = synthesizeWesternPersonalityPotential([supportive, challenging]);
    const theme = result.potential[0];

    expect(theme.theme.hasConflict).toBe(true);
    expect(theme.supportiveStatements).toEqual([supportive.statement]);
    expect(theme.challengingStatements).toEqual([challenging.statement]);
    expect(theme.theme.candidates[1].score).toBeCloseTo(0.2);
    expect(theme.theme.candidates[1].candidate.evidence).toBe(challenging.evidence);
  });

  it("is deterministic, non-mutating, empty-safe and does not invent statements", () => {
    const input = [
      candidate({ candidateId: "b", ruleId: "RULE-B", statement: "Nguồn B." }),
      candidate({ candidateId: "a", ruleId: "RULE-A", statement: "Nguồn A." }),
    ] as const;
    const snapshot = structuredClone(input);

    expect(synthesizeWesternPersonalityPotential(input)).toEqual(
      synthesizeWesternPersonalityPotential([...input].reverse()),
    );
    expect(input).toEqual(snapshot);
    expect(synthesizeWesternPersonalityPotential([])).toEqual({
      policyId: "western-personality-potential-v1",
      version: "1.0.0",
      personality: [],
      potential: [],
    });
    expect(
      synthesizeWesternPersonalityPotential(input).personality[0]
        .supportiveStatements,
    ).toEqual(["Nguồn A.", "Nguồn B."]);
  });

  it("rejects inconsistent labels for the same canonical theme", () => {
    expect(() =>
      synthesizeWesternPersonalityPotential([
        candidate({ candidateId: "a", ruleId: "RULE-A" }),
        candidate({
          candidateId: "b",
          ruleId: "RULE-B",
          themeLabel: "Nhãn khác",
        }),
      ]),
    ).toThrow("themeLabel không nhất quán");
  });
});
