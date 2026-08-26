import {
  westernReportVersionMetadata,
  type WesternReportVersionMetadata,
} from "../config/western-report-version";
import {
  synthesizeWesternCareer,
  type WesternCareerSynthesis,
} from "./western-career-synthesis";
import {
  projectWesternCoreCandidates,
  westernCoreCandidateProjectionPolicy,
} from "./western-core-candidate-projection";
import {
  synthesizeWesternMainThemes,
  type WesternMainThemeSynthesis,
} from "./western-main-theme-synthesis";
import {
  synthesizeWesternPersonalityPotential,
  type WesternPersonalityPotentialCandidate,
  type WesternPersonalityPotentialSynthesis,
} from "./western-personality-potential-synthesis";
import {
  synthesizeWesternRelationship,
  type WesternRelationshipSynthesis,
} from "./western-relationship-synthesis";
import type { WesternAstrologyResult } from "./western-astrology";
import {
  interpretWesternCoreTriad,
  type CoreTriadInterpretation,
} from "./western-interpretation";

export type WesternCoreReportSynthesis = Readonly<{
  policyId: typeof westernCoreCandidateProjectionPolicy.policyId;
  version: typeof westernCoreCandidateProjectionPolicy.version;
  calculation: WesternAstrologyResult;
  matchedCore: CoreTriadInterpretation;
  candidates: ReadonlyArray<WesternPersonalityPotentialCandidate>;
  personalityPotential: WesternPersonalityPotentialSynthesis;
  relationship: WesternRelationshipSynthesis;
  career: WesternCareerSynthesis;
  mainThemes: WesternMainThemeSynthesis;
  provenance: WesternReportVersionMetadata & Readonly<{
    candidateProjectionPolicyId: typeof westernCoreCandidateProjectionPolicy.policyId;
    candidateProjectionVersion: typeof westernCoreCandidateProjectionPolicy.version;
  }>;
}>;

export function synthesizeWesternCoreReport(
  calculation: WesternAstrologyResult,
): WesternCoreReportSynthesis {
  const matchedCore = interpretWesternCoreTriad(calculation);
  const candidates = projectWesternCoreCandidates(matchedCore);
  const personalityPotential = synthesizeWesternPersonalityPotential(candidates);
  const relationship = synthesizeWesternRelationship([]);
  const career = synthesizeWesternCareer([]);
  const mainThemes = synthesizeWesternMainThemes({
    personalityPotential,
    relationship,
    career,
  });

  return {
    ...westernCoreCandidateProjectionPolicy,
    calculation,
    matchedCore,
    candidates,
    personalityPotential,
    relationship,
    career,
    mainThemes,
    provenance: {
      ...westernReportVersionMetadata,
      candidateProjectionPolicyId:
        westernCoreCandidateProjectionPolicy.policyId,
      candidateProjectionVersion: westernCoreCandidateProjectionPolicy.version,
    },
  };
}
