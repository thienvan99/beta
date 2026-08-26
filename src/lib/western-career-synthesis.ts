import {
  aggregateWesternChartThemes,
  type WesternSynthesisCandidate,
  type WesternSynthesisTheme,
} from "./western-chart-synthesis";

export const westernCareerSynthesisPolicy = {
  policyId: "western-career-synthesis-v1",
  version: "1.0.0",
  maximumThemes: 5,
} as const;

export type WesternCareerSource =
  | "mc"
  | "house-10"
  | "house-10-ruler"
  | "sun"
  | "saturn"
  | "mars"
  | "related-aspect";

const westernCareerSources = new Set<WesternCareerSource>([
  "mc",
  "house-10",
  "house-10-ruler",
  "sun",
  "saturn",
  "mars",
  "related-aspect",
]);

export type WesternCareerCandidate = Readonly<
  Omit<WesternSynthesisCandidate, "domain"> & {
    domain: "career";
    careerSource: WesternCareerSource;
    themeLabel: string;
    statement: string;
  }
>;

export type WesternCareerTheme = Readonly<{
  theme: WesternSynthesisTheme;
  themeLabel: string;
  supportiveStatements: ReadonlyArray<string>;
  challengingStatements: ReadonlyArray<string>;
}>;

export type WesternCareerSynthesis = Readonly<{
  policyId: typeof westernCareerSynthesisPolicy.policyId;
  version: typeof westernCareerSynthesisPolicy.version;
  themes: ReadonlyArray<WesternCareerTheme>;
}>;

function toCareerTheme(theme: WesternSynthesisTheme): WesternCareerTheme {
  const candidates = theme.candidates.map(({ candidate }) =>
    candidate as WesternCareerCandidate,
  );
  const labels = [...new Set(candidates.map(({ themeLabel }) => themeLabel))];

  if (labels.length !== 1) {
    throw new Error(`Career theme ${theme.themeKey} có label không nhất quán.`);
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

export function synthesizeWesternCareer(
  candidates: ReadonlyArray<WesternCareerCandidate>,
): WesternCareerSynthesis {
  for (const candidate of candidates) {
    if (!westernCareerSources.has(candidate.careerSource)) {
      throw new Error(`Career source không được phép: ${candidate.careerSource}.`);
    }
  }

  const synthesis = aggregateWesternChartThemes(candidates);

  return {
    policyId: westernCareerSynthesisPolicy.policyId,
    version: westernCareerSynthesisPolicy.version,
    themes: synthesis.themes
      .filter(({ domain }) => domain === "career")
      .slice(0, westernCareerSynthesisPolicy.maximumThemes)
      .map(toCareerTheme),
  };
}
