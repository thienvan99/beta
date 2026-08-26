import {
  coreInterpretationFactors,
  type CoreInterpretationFactor,
  type CoreInterpretationRule,
} from "../data/western-core-interpretations";
import type { WesternPersonalityPotentialCandidate } from "./western-personality-potential-synthesis";
import type { CoreTriadInterpretation } from "./western-interpretation";

export const westernCoreCandidateProjectionPolicy = {
  policyId: "western-core-candidate-projection-v1",
  version: "1.0.0",
} as const;

const themeByFactor: Record<
  CoreInterpretationFactor,
  Readonly<{ themeKey: string; themeLabel: string }>
> = {
  Sun: {
    themeKey: "identity-and-self-expression",
    themeLabel: "Bản sắc và cách thể hiện bản thân",
  },
  Moon: {
    themeKey: "emotional-needs-and-regulation",
    themeLabel: "Nhu cầu cảm xúc và cách tự cân bằng",
  },
  ASC: {
    themeKey: "outward-style-and-life-approach",
    themeLabel: "Phong cách thể hiện và cách tiếp cận cuộc sống",
  },
};

function projectRuleStatements(
  factor: CoreInterpretationFactor,
  rule: CoreInterpretationRule,
): WesternPersonalityPotentialCandidate[] {
  if (rule.strengths.length !== 2 || rule.challenges.length !== 2) {
    throw new Error(`Core rule ${rule.ruleId} phải có đúng 2 strengths và 2 challenges.`);
  }

  const body = factor.toLowerCase();
  const sign = rule.evidence.sign.toLowerCase();
  const theme = themeByFactor[factor];
  const evidence = [
    {
      evidenceGroupId: `western:core-sign:${body}:${sign}`,
      sourceType: "placement" as const,
      sourceKey: `western:placement:${body}:sign:${sign}`,
    },
  ];
  const statements = [
    ...rule.strengths.map((statement, index) => ({
      statement,
      polarity: "supportive" as const,
      index: index + 1,
    })),
    ...rule.challenges.map((statement, index) => ({
      statement,
      polarity: "challenging" as const,
      index: index + 1,
    })),
  ];

  return statements.map(({ statement, polarity, index }) => ({
    candidateId: `${rule.ruleId.toLowerCase()}:${polarity}:${index}`,
    ...theme,
    domain: "personality",
    polarity,
    ruleId: rule.ruleId,
    ruleVersion: rule.version,
    importance: 1,
    specificity: 1,
    domainRelevance: 1,
    uncertainty: 0,
    evidence,
    statement,
  }));
}

export function projectWesternCoreCandidates(
  interpretation: CoreTriadInterpretation,
): WesternPersonalityPotentialCandidate[] {
  return coreInterpretationFactors.flatMap((factor) => {
    const position = interpretation.positions.find(
      (candidate) => candidate.factor === factor,
    );

    if (
      !position ||
      position.rule.evidence.body !== factor ||
      position.rule.evidence.sign !== position.sign
    ) {
      throw new Error(`Core interpretation không có placement hợp lệ cho ${factor}.`);
    }

    return projectRuleStatements(factor, position.rule);
  });
}
