import { westernAspectInterpretationRules } from "../data/western-aspect-interpretations";
import { westernCoreInterpretationRules } from "../data/western-core-interpretations";
import { westernPersonalPlanetInterpretationRules } from "../data/western-personal-planet-interpretations";
import { westernPlanetHouseInterpretationRules } from "../data/western-planet-house-interpretations";
import { westernSocialPlanetInterpretationRules } from "../data/western-social-planet-interpretations";
import { westernCareerSynthesisPolicy } from "../lib/western-career-synthesis";
import { westernChartSynthesisPolicy } from "../lib/western-chart-synthesis";
import { westernCoreCandidateProjectionPolicy } from "../lib/western-core-candidate-projection";
import { westernMainThemeSynthesisPolicy } from "../lib/western-main-theme-synthesis";
import { westernPersonalityPotentialPolicy } from "../lib/western-personality-potential-synthesis";
import { westernRelationshipSynthesisPolicy } from "../lib/western-relationship-synthesis";

type SemanticVersion = `${number}.${number}.${number}`;

export type WesternReportVersionMetadata = Readonly<{
  calculationVersion: SemanticVersion;
  rulesetVersion: SemanticVersion;
  interpretationVersion: SemanticVersion;
}>;

function requireUniformVersion(
  label: string,
  sources: ReadonlyArray<Readonly<{ version: string }>>,
): SemanticVersion {
  const versions = [...new Set(sources.map(({ version }) => version))];

  if (versions.length !== 1 || !/^\d+\.\d+\.\d+$/.test(versions[0])) {
    throw new Error(`${label} phải có đúng một semantic version.`);
  }

  return versions[0] as SemanticVersion;
}

const interpretationRules = [
  ...westernCoreInterpretationRules,
  ...westernPersonalPlanetInterpretationRules,
  ...westernSocialPlanetInterpretationRules,
  ...westernPlanetHouseInterpretationRules,
  ...westernAspectInterpretationRules,
] as const;

const synthesisPolicies = [
  westernChartSynthesisPolicy,
  westernCoreCandidateProjectionPolicy,
  westernPersonalityPotentialPolicy,
  westernRelationshipSynthesisPolicy,
  westernCareerSynthesisPolicy,
  westernMainThemeSynthesisPolicy,
] as const;

export const westernReportVersionMetadata = Object.freeze({
  calculationVersion: "1.0.0",
  rulesetVersion: requireUniformVersion("Bộ quy tắc Tây phương", interpretationRules),
  interpretationVersion: requireUniformVersion("Luận giải Tây phương", [
    ...interpretationRules,
    ...synthesisPolicies,
  ]),
}) satisfies WesternReportVersionMetadata;
