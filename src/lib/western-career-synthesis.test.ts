import { describe, expect, it } from "vitest";
import type { WesternCareerCandidate } from "./western-career-synthesis";
import { synthesizeWesternCareer } from "./western-career-synthesis";

function candidate(
  overrides: Partial<WesternCareerCandidate> &
    Pick<WesternCareerCandidate, "candidateId" | "ruleId">,
): WesternCareerCandidate {
  const { candidateId, ruleId, ...optionalOverrides } = overrides;

  return {
    candidateId,
    themeKey: "work-structure",
    domain: "career",
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
    careerSource: "mc",
    themeLabel: "Cấu trúc công việc",
    statement: "Có xu hướng phát huy tốt hơn khi vai trò và kỳ vọng được làm rõ.",
    ...optionalOverrides,
  };
}

describe("synthesizeWesternCareer", () => {
  it("accepts canonical career sources and ranks stronger themes first", () => {
    const strongStatement =
      "Có xu hướng chủ động hơn khi công việc cho phép xác định mục tiêu rõ.";
    const result = synthesizeWesternCareer([
      candidate({
        candidateId: "pace",
        ruleId: "WESTERN-SATURN-CAPRICORN-V1",
        careerSource: "saturn",
        themeKey: "work-pace",
        themeLabel: "Nhịp làm việc",
        statement: "Có xu hướng xây tiến độ bền hơn khi được chuẩn bị theo từng bước.",
        importance: 0.6,
      }),
      candidate({
        candidateId: "direction",
        ruleId: "WESTERN-SUN-ARIES-V1",
        careerSource: "sun",
        themeKey: "work-direction",
        themeLabel: "Định hướng công việc",
        statement: strongStatement,
        importance: 0.9,
      }),
    ]);

    expect(result.themes.map(({ theme }) => theme.themeKey)).toEqual([
      "work-direction",
      "work-pace",
    ]);
    expect(result.themes[0].supportiveStatements).toEqual([strongStatement]);
  });

  it("counts independent repeated evidence and deduplicates a shared source", () => {
    const result = synthesizeWesternCareer([
      candidate({
        candidateId: "structure-mc",
        ruleId: "WESTERN-MC-CAPRICORN-V1",
        careerSource: "mc",
        importance: 0.7,
        evidence: [{ evidenceGroupId: "mc-sign", sourceType: "derived", sourceKey: "MC:Capricorn" }],
      }),
      candidate({
        candidateId: "structure-house",
        ruleId: "WESTERN-SATURN-HOUSE-10-V1",
        careerSource: "house-10",
        importance: 0.6,
        evidence: [{ evidenceGroupId: "saturn-house-10", sourceType: "house", sourceKey: "Saturn:10" }],
      }),
      candidate({
        candidateId: "structure-duplicate",
        ruleId: "WESTERN-MC-CAPRICORN-DERIVED-V1",
        careerSource: "mc",
        importance: 0.5,
        evidence: [{ evidenceGroupId: "mc-sign", sourceType: "derived", sourceKey: "MC:Capricorn:derived" }],
      }),
    ]);

    expect(result.themes[0].theme.score).toBeCloseTo(1.3);
    expect(result.themes[0].theme.evidenceGroupIds).toEqual([
      "mc-sign",
      "saturn-house-10",
    ]);
  });

  it("preserves supportive/challenging conflict, uncertainty and provenance", () => {
    const supportive = candidate({
      candidateId: "initiative-supportive",
      ruleId: "WESTERN-MARS-ARIES-V1",
      careerSource: "mars",
      themeKey: "work-initiative",
      themeLabel: "Chủ động trong công việc",
      statement: "Có thể chủ động thử bước đầu khi mục tiêu đủ cụ thể.",
      uncertainty: 0.1,
    });
    const challenging = candidate({
      candidateId: "initiative-challenging",
      ruleId: "WESTERN-ASPECT-MARS-SATURN-SQUARE-V1",
      careerSource: "related-aspect",
      themeKey: "work-initiative",
      themeLabel: "Chủ động trong công việc",
      polarity: "challenging",
      statement: "Khi chịu áp lực, nhịp tiến và nhịp kiểm soát có thể cản nhau.",
      uncertainty: 0.8,
      evidence: [{ evidenceGroupId: "mars-saturn-square", sourceType: "aspect", sourceKey: "Mars:Saturn:square" }],
    });
    const result = synthesizeWesternCareer([supportive, challenging]);
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

    expect(synthesizeWesternCareer(input)).toEqual(
      synthesizeWesternCareer([...input].reverse()),
    );
    expect(input).toEqual(snapshot);
    expect(synthesizeWesternCareer([])).toEqual({
      policyId: "western-career-synthesis-v1",
      version: "1.0.0",
      themes: [],
    });
  });

  it("enforces career domain and source isolation", () => {
    const career = candidate({
      candidateId: "career",
      ruleId: "WESTERN-MC-TAURUS-V1",
      careerSource: "mc",
    });
    expect(synthesizeWesternCareer([career]).themes).toHaveLength(1);

    const invalidDomain: WesternCareerCandidate = {
      ...career,
      // @ts-expect-error WA-P4-004 must not accept money candidates.
      domain: "money",
    };
    expect(synthesizeWesternCareer([invalidDomain]).themes).toEqual([]);

    const invalidSource: WesternCareerCandidate = {
      ...career,
      // @ts-expect-error Income is outside canonical career sources.
      careerSource: "income",
    };
    expect(() => synthesizeWesternCareer([invalidSource])).toThrow(
      "Career source không được phép",
    );
  });
});
