import { describe, expect, it } from "vitest";
import { synthesizeWesternCareer, type WesternCareerCandidate } from "./western-career-synthesis";
import { synthesizeWesternMainThemes } from "./western-main-theme-synthesis";
import {
  synthesizeWesternPersonalityPotential,
  type WesternPersonalityPotentialCandidate,
} from "./western-personality-potential-synthesis";
import {
  synthesizeWesternRelationship,
  type WesternRelationshipCandidate,
} from "./western-relationship-synthesis";

type DomainCandidate =
  | WesternPersonalityPotentialCandidate
  | WesternRelationshipCandidate
  | WesternCareerCandidate;

function baseCandidate(
  overrides: Partial<DomainCandidate> & Pick<DomainCandidate, "candidateId" | "ruleId">,
): DomainCandidate {
  const { candidateId, ruleId, ...optionalOverrides } = overrides;

  return {
    candidateId,
    themeKey: "clear-boundaries",
    domain: "personality",
    polarity: "supportive",
    ruleId,
    ruleVersion: "1.0.0",
    importance: 1,
    specificity: 1,
    domainRelevance: 1,
    uncertainty: 0,
    evidence: [{ evidenceGroupId: candidateId, sourceType: "placement", sourceKey: candidateId }],
    themeLabel: "Ranh giới rõ ràng",
    statement: "Có xu hướng vận hành rõ hơn khi kỳ vọng và giới hạn được nói ra.",
    ...optionalOverrides,
  } as DomainCandidate;
}

function input(candidates: ReadonlyArray<DomainCandidate>) {
  const personalityPotential = candidates.filter(
    (item): item is WesternPersonalityPotentialCandidate =>
      item.domain === "personality" || item.domain === "potential",
  );
  const relationship = candidates.filter(
    (item): item is WesternRelationshipCandidate => item.domain === "relationship",
  );
  const career = candidates.filter(
    (item): item is WesternCareerCandidate => item.domain === "career",
  );

  return {
    personalityPotential: synthesizeWesternPersonalityPotential(personalityPotential),
    relationship: synthesizeWesternRelationship(relationship),
    career: synthesizeWesternCareer(career),
  };
}

describe("synthesizeWesternMainThemes", () => {
  it("recognizes a cross-domain theme from independent evidence without domain weights", () => {
    const result = synthesizeWesternMainThemes(
      input([
        baseCandidate({
          candidateId: "self-boundary",
          ruleId: "WESTERN-SUN-CAPRICORN-V1",
          evidence: [{ evidenceGroupId: "sun-sign", sourceType: "placement", sourceKey: "Sun:Capricorn" }],
          importance: 0.7,
        }),
        baseCandidate({
          candidateId: "relationship-boundary",
          ruleId: "WESTERN-VENUS-AQUARIUS-V1",
          domain: "relationship",
          relationshipSource: "venus",
          evidence: [{ evidenceGroupId: "venus-sign", sourceType: "placement", sourceKey: "Venus:Aquarius" }],
          importance: 0.6,
        }),
      ]),
    );

    expect(result.themes[0].theme.score).toBeCloseTo(1.3);
    expect(result.themes[0].contributingDomains).toEqual([
      "personality",
      "relationship",
    ]);
  });

  it("deduplicates evidence shared across domain synthesis outputs", () => {
    const result = synthesizeWesternMainThemes(
      input([
        baseCandidate({
          candidateId: "self-source",
          ruleId: "WESTERN-SUN-ARIES-V1",
          importance: 0.9,
          evidence: [{ evidenceGroupId: "sun-sign", sourceType: "placement", sourceKey: "Sun:Aries" }],
        }),
        baseCandidate({
          candidateId: "career-source",
          ruleId: "WESTERN-SUN-ARIES-CAREER-V1",
          domain: "career",
          careerSource: "sun",
          importance: 0.6,
          evidence: [{ evidenceGroupId: "sun-sign", sourceType: "derived", sourceKey: "Sun:Aries:career" }],
        }),
      ]),
    );

    expect(result.themes[0].theme.score).toBe(0.9);
    expect(result.themes[0].theme.evidenceGroupIds).toEqual(["sun-sign"]);
  });

  it("preserves cross-domain conflict, uncertainty and source provenance", () => {
    const supportive = baseCandidate({
      candidateId: "supportive",
      ruleId: "RULE-SUPPORTIVE",
      uncertainty: 0.1,
    }) as WesternPersonalityPotentialCandidate;
    const challenging = baseCandidate({
      candidateId: "challenging",
      ruleId: "RULE-CHALLENGING",
      domain: "career",
      careerSource: "related-aspect",
      polarity: "challenging",
      statement: "Khi chịu áp lực, việc giữ giới hạn có thể trở nên cứng nhắc.",
      uncertainty: 0.8,
      evidence: [{ evidenceGroupId: "career-aspect", sourceType: "aspect", sourceKey: "Mars:Saturn:square" }],
    }) as WesternCareerCandidate;
    const result = synthesizeWesternMainThemes(input([supportive, challenging]));
    const theme = result.themes[0];

    expect(theme.theme.hasConflict).toBe(true);
    expect(theme.supportiveStatements).toEqual([supportive.statement]);
    expect(theme.challengingStatements).toEqual([challenging.statement]);
    expect(theme.theme.candidates[1].score).toBeCloseTo(0.2);
    expect(theme.theme.candidates[1].candidate).toHaveProperty(
      "sourceCandidate",
      challenging,
    );
  });

  it("uses deterministic ranking/tie-break and does not favor candidate-heavy domains", () => {
    const candidates = [
      baseCandidate({ candidateId: "z", ruleId: "RULE-Z", themeKey: "z-theme", themeLabel: "Z" }),
      baseCandidate({ candidateId: "a", ruleId: "RULE-A", themeKey: "a-theme", themeLabel: "A" }),
      baseCandidate({
        candidateId: "career-duplicate",
        ruleId: "RULE-CAREER-DUPLICATE",
        domain: "career",
        careerSource: "sun",
        themeKey: "z-theme",
        themeLabel: "Z",
        evidence: [{ evidenceGroupId: "z", sourceType: "derived", sourceKey: "z:derived" }],
      }),
    ];
    const first = synthesizeWesternMainThemes(input(candidates));
    const second = synthesizeWesternMainThemes(input([...candidates].reverse()));

    expect(first).toEqual(second);
    expect(first.themes.map(({ theme }) => theme.themeKey)).toEqual([
      "a-theme",
      "z-theme",
    ]);
  });

  it("is non-mutating, empty-safe and retains only supported domain outputs", () => {
    const candidate = baseCandidate({ candidateId: "source", ruleId: "RULE-SOURCE" });
    const sourceInput = input([candidate]);
    const snapshot = structuredClone(sourceInput);

    expect(synthesizeWesternMainThemes(sourceInput).themes).toHaveLength(1);
    expect(sourceInput).toEqual(snapshot);
    expect(synthesizeWesternMainThemes(input([]))).toEqual({
      policyId: "western-main-theme-synthesis-v1",
      version: "1.0.0",
      themes: [],
    });
  });
});
