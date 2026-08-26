import type { WesternCareerCandidate, WesternCareerSynthesis } from "./western-career-synthesis";
import {
  aggregateWesternChartThemes,
  type WesternSynthesisCandidate,
  type WesternSynthesisTheme,
} from "./western-chart-synthesis";
import type {
  WesternPersonalityPotentialCandidate,
  WesternPersonalityPotentialSynthesis,
} from "./western-personality-potential-synthesis";
import type {
  WesternRelationshipCandidate,
  WesternRelationshipSynthesis,
} from "./western-relationship-synthesis";

export const westernMainThemeSynthesisPolicy = {
  policyId: "western-main-theme-synthesis-v1",
  version: "1.0.0",
  maximumThemes: 5,
} as const;

export type WesternMainThemeDomain =
  | "personality"
  | "potential"
  | "relationship"
  | "career";

type WesternDomainCandidate =
  | WesternPersonalityPotentialCandidate
  | WesternRelationshipCandidate
  | WesternCareerCandidate;

type WesternMainThemeCandidate = Readonly<
  Omit<WesternSynthesisCandidate, "domain"> & {
    domain: "school_synthesis";
    contributingDomain: WesternMainThemeDomain;
    themeLabel: string;
    statement: string;
    sourceCandidate: WesternDomainCandidate;
  }
>;

export type WesternMainTheme = Readonly<{
  theme: WesternSynthesisTheme;
  themeLabel: string;
  contributingDomains: ReadonlyArray<WesternMainThemeDomain>;
  supportiveStatements: ReadonlyArray<string>;
  challengingStatements: ReadonlyArray<string>;
}>;

export type WesternMainThemeSynthesis = Readonly<{
  policyId: typeof westernMainThemeSynthesisPolicy.policyId;
  version: typeof westernMainThemeSynthesisPolicy.version;
  themes: ReadonlyArray<WesternMainTheme>;
}>;

export type WesternMainThemeInput = Readonly<{
  personalityPotential: WesternPersonalityPotentialSynthesis;
  relationship: WesternRelationshipSynthesis;
  career: WesternCareerSynthesis;
}>;

function collectCandidates(input: WesternMainThemeInput) {
  const domainThemes = [
    ...input.personalityPotential.personality,
    ...input.personalityPotential.potential,
    ...input.relationship.themes,
    ...input.career.themes,
  ];

  return domainThemes.flatMap(({ theme }) =>
    theme.candidates.map(({ candidate }) => {
      const sourceCandidate = candidate as WesternDomainCandidate;
      return {
        ...sourceCandidate,
        domain: "school_synthesis" as const,
        contributingDomain: sourceCandidate.domain as WesternMainThemeDomain,
        sourceCandidate,
      } satisfies WesternMainThemeCandidate;
    }),
  );
}

function toMainTheme(theme: WesternSynthesisTheme): WesternMainTheme {
  const candidates = theme.candidates.map(
    ({ candidate }) => candidate as WesternMainThemeCandidate,
  );
  const labels = [...new Set(candidates.map(({ themeLabel }) => themeLabel))];

  if (labels.length !== 1) {
    throw new Error(`Main theme ${theme.themeKey} có label không nhất quán.`);
  }

  return {
    theme,
    themeLabel: labels[0],
    contributingDomains: [
      ...new Set(candidates.map(({ contributingDomain }) => contributingDomain)),
    ].sort((a, b) => a.localeCompare(b, "en")),
    supportiveStatements: candidates
      .filter(({ polarity }) => polarity === "supportive")
      .map(({ statement }) => statement),
    challengingStatements: candidates
      .filter(({ polarity }) => polarity === "challenging")
      .map(({ statement }) => statement),
  };
}

export function synthesizeWesternMainThemes(
  input: WesternMainThemeInput,
): WesternMainThemeSynthesis {
  const synthesis = aggregateWesternChartThemes(collectCandidates(input));

  return {
    policyId: westernMainThemeSynthesisPolicy.policyId,
    version: westernMainThemeSynthesisPolicy.version,
    themes: synthesis.themes
      .slice(0, westernMainThemeSynthesisPolicy.maximumThemes)
      .map(toMainTheme),
  };
}
