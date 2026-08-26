import {
  aggregateWesternChartThemes,
  type WesternSynthesisCandidate,
  type WesternSynthesisTheme,
} from "./western-chart-synthesis";

export const westernPersonalityPotentialPolicy = {
  policyId: "western-personality-potential-v1",
  version: "1.0.0",
  maximumThemesPerDomain: 5,
} as const;

export type WesternPersonalityPotentialDomain = "personality" | "potential";

export type WesternPersonalityPotentialCandidate = Readonly<
  Omit<WesternSynthesisCandidate, "domain"> & {
    domain: WesternPersonalityPotentialDomain;
    themeLabel: string;
    statement: string;
  }
>;

export type WesternPersonalityPotentialTheme = Readonly<{
  theme: WesternSynthesisTheme;
  themeLabel: string;
  supportiveStatements: ReadonlyArray<string>;
  challengingStatements: ReadonlyArray<string>;
}>;

export type WesternPersonalityPotentialSynthesis = Readonly<{
  policyId: typeof westernPersonalityPotentialPolicy.policyId;
  version: typeof westernPersonalityPotentialPolicy.version;
  personality: ReadonlyArray<WesternPersonalityPotentialTheme>;
  potential: ReadonlyArray<WesternPersonalityPotentialTheme>;
}>;

function toSynthesisTheme(
  theme: WesternSynthesisTheme,
): WesternPersonalityPotentialTheme {
  const candidates = theme.candidates.map(({ candidate }) =>
    candidate as WesternPersonalityPotentialCandidate,
  );
  const labels = [...new Set(candidates.map(({ themeLabel }) => themeLabel))];

  if (labels.length !== 1) {
    throw new Error(
      `Theme ${theme.domain}:${theme.themeKey} có themeLabel không nhất quán.`,
    );
  }

  return {
    theme,
    themeLabel: labels[0],
    supportiveStatements: candidates
      .filter(({ polarity }) => polarity === "supportive")
      .map(({ statement }) => statement),
    challengingStatements: candidates
      .filter(({ polarity }) => polarity === "challenging")
      .map(({ statement }) => statement),
  };
}

export function synthesizeWesternPersonalityPotential(
  candidates: ReadonlyArray<WesternPersonalityPotentialCandidate>,
): WesternPersonalityPotentialSynthesis {
  const synthesis = aggregateWesternChartThemes(candidates);
  const byDomain = (domain: WesternPersonalityPotentialDomain) =>
    synthesis.themes
      .filter((theme) => theme.domain === domain)
      .slice(0, westernPersonalityPotentialPolicy.maximumThemesPerDomain)
      .map(toSynthesisTheme);

  return {
    policyId: westernPersonalityPotentialPolicy.policyId,
    version: westernPersonalityPotentialPolicy.version,
    personality: byDomain("personality"),
    potential: byDomain("potential"),
  };
}
