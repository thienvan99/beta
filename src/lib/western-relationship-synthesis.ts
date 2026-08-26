import {
  aggregateWesternChartThemes,
  type WesternSynthesisCandidate,
  type WesternSynthesisTheme,
} from "./western-chart-synthesis";

export const westernRelationshipSynthesisPolicy = {
  policyId: "western-relationship-synthesis-v1",
  version: "1.0.0",
  maximumThemes: 5,
} as const;

export type WesternRelationshipSource =
  | "moon"
  | "venus"
  | "mars"
  | "house-5"
  | "house-7"
  | "related-ruler"
  | "related-aspect";

const westernRelationshipSources = new Set<WesternRelationshipSource>([
  "moon",
  "venus",
  "mars",
  "house-5",
  "house-7",
  "related-ruler",
  "related-aspect",
]);

export type WesternRelationshipCandidate = Readonly<
  Omit<WesternSynthesisCandidate, "domain"> & {
    domain: "relationship";
    relationshipSource: WesternRelationshipSource;
    themeLabel: string;
    statement: string;
  }
>;

export type WesternRelationshipTheme = Readonly<{
  theme: WesternSynthesisTheme;
  themeLabel: string;
  supportiveStatements: ReadonlyArray<string>;
  challengingStatements: ReadonlyArray<string>;
}>;

export type WesternRelationshipSynthesis = Readonly<{
  policyId: typeof westernRelationshipSynthesisPolicy.policyId;
  version: typeof westernRelationshipSynthesisPolicy.version;
  themes: ReadonlyArray<WesternRelationshipTheme>;
}>;

function toRelationshipTheme(
  theme: WesternSynthesisTheme,
): WesternRelationshipTheme {
  const candidates = theme.candidates.map(({ candidate }) =>
    candidate as WesternRelationshipCandidate,
  );
  const labels = [...new Set(candidates.map(({ themeLabel }) => themeLabel))];

  if (labels.length !== 1) {
    throw new Error(`Relationship theme ${theme.themeKey} có label không nhất quán.`);
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

export function synthesizeWesternRelationship(
  candidates: ReadonlyArray<WesternRelationshipCandidate>,
): WesternRelationshipSynthesis {
  for (const candidate of candidates) {
    if (!westernRelationshipSources.has(candidate.relationshipSource)) {
      throw new Error(
        `Relationship source không được phép: ${candidate.relationshipSource}.`,
      );
    }
  }

  const synthesis = aggregateWesternChartThemes(candidates);

  return {
    policyId: westernRelationshipSynthesisPolicy.policyId,
    version: westernRelationshipSynthesisPolicy.version,
    themes: synthesis.themes
      .filter(({ domain }) => domain === "relationship")
      .slice(0, westernRelationshipSynthesisPolicy.maximumThemes)
      .map(toRelationshipTheme),
  };
}
