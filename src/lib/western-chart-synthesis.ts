export const westernChartSynthesisPolicy = {
  policyId: "western-chart-synthesis-v1",
  version: "1.0.0",
} as const;

export type WesternSynthesisPolarity = "supportive" | "challenging";

export type WesternSynthesisEvidence = Readonly<{
  evidenceGroupId: string;
  sourceType: "placement" | "house" | "aspect" | "derived";
  sourceKey: string;
}>;

export type WesternSynthesisCandidate = Readonly<{
  candidateId: string;
  themeKey: string;
  domain: string;
  polarity: WesternSynthesisPolarity;
  ruleId: string;
  ruleVersion: string;
  importance: number;
  specificity: number;
  domainRelevance: number;
  uncertainty: number;
  evidence: ReadonlyArray<WesternSynthesisEvidence>;
}>;

export type WesternSynthesisRankedCandidate = Readonly<{
  candidate: WesternSynthesisCandidate;
  score: number;
}>;

export type WesternSynthesisTheme = Readonly<{
  themeKey: string;
  domain: string;
  score: number;
  hasConflict: boolean;
  candidates: ReadonlyArray<WesternSynthesisRankedCandidate>;
  evidenceGroupIds: ReadonlyArray<string>;
}>;

export type WesternChartSynthesis = Readonly<{
  policyId: typeof westernChartSynthesisPolicy.policyId;
  version: typeof westernChartSynthesisPolicy.version;
  themes: ReadonlyArray<WesternSynthesisTheme>;
}>;

function assertUnitInterval(name: string, value: number) {
  if (!Number.isFinite(value) || value < 0 || value > 1) {
    throw new RangeError(`${name} phải là số hữu hạn trong khoảng [0, 1].`);
  }
}

function candidateScore(candidate: WesternSynthesisCandidate) {
  assertUnitInterval("importance", candidate.importance);
  assertUnitInterval("specificity", candidate.specificity);
  assertUnitInterval("domainRelevance", candidate.domainRelevance);
  assertUnitInterval("uncertainty", candidate.uncertainty);

  return (
    candidate.importance *
    candidate.specificity *
    candidate.domainRelevance *
    (1 - candidate.uncertainty)
  );
}

function compareRankedCandidates(
  first: WesternSynthesisRankedCandidate,
  second: WesternSynthesisRankedCandidate,
) {
  return (
    second.score - first.score ||
    first.candidate.ruleId.localeCompare(second.candidate.ruleId, "en") ||
    first.candidate.candidateId.localeCompare(second.candidate.candidateId, "en")
  );
}

function hasIndependentEvidenceConflict(
  candidatesByEvidenceGroup: ReadonlyMap<
    string,
    ReadonlyArray<WesternSynthesisRankedCandidate>
  >,
) {
  const evidenceGroupsByPolarity: Record<
    WesternSynthesisPolarity,
    Set<string>
  > = {
    supportive: new Set<string>(),
    challenging: new Set<string>(),
  };

  for (const [evidenceGroupId, candidates] of candidatesByEvidenceGroup) {
    for (const { candidate } of candidates) {
      evidenceGroupsByPolarity[candidate.polarity].add(evidenceGroupId);
    }
  }

  return [...evidenceGroupsByPolarity.supportive].some((supportiveGroupId) =>
    [...evidenceGroupsByPolarity.challenging].some(
      (challengingGroupId) => challengingGroupId !== supportiveGroupId,
    ),
  );
}

export function aggregateWesternChartThemes(
  candidates: ReadonlyArray<WesternSynthesisCandidate>,
): WesternChartSynthesis {
  const candidateIds = new Set<string>();
  const groups = new Map<string, WesternSynthesisRankedCandidate[]>();

  for (const candidate of candidates) {
    if (candidateIds.has(candidate.candidateId)) {
      throw new Error(`candidateId bị trùng: ${candidate.candidateId}.`);
    }
    candidateIds.add(candidate.candidateId);

    if (candidate.evidence.length === 0) {
      throw new Error(`Candidate ${candidate.candidateId} không có evidence.`);
    }

    const groupKey = `${candidate.domain}:${candidate.themeKey}`;
    const ranked = { candidate, score: candidateScore(candidate) };
    groups.set(groupKey, [...(groups.get(groupKey) ?? []), ranked]);
  }

  const themes = [...groups.values()].map((rankedCandidates) => {
    const candidatesByEvidenceGroup = new Map<
      string,
      WesternSynthesisRankedCandidate[]
    >();

    for (const ranked of rankedCandidates) {
      for (const { evidenceGroupId } of ranked.candidate.evidence) {
        candidatesByEvidenceGroup.set(evidenceGroupId, [
          ...(candidatesByEvidenceGroup.get(evidenceGroupId) ?? []),
          ranked,
        ]);
      }
    }

    const evidenceGroupIds = [...candidatesByEvidenceGroup.keys()].sort((a, b) =>
      a.localeCompare(b, "en"),
    );
    const score = evidenceGroupIds.reduce((total, evidenceGroupId) => {
      const strongest = [...(candidatesByEvidenceGroup.get(evidenceGroupId) ?? [])]
        .sort(compareRankedCandidates)[0];
      return total + (strongest?.score ?? 0);
    }, 0);
    const first = rankedCandidates[0].candidate;

    return {
      themeKey: first.themeKey,
      domain: first.domain,
      score,
      hasConflict: hasIndependentEvidenceConflict(candidatesByEvidenceGroup),
      candidates: [...rankedCandidates].sort(compareRankedCandidates),
      evidenceGroupIds,
    };
  });

  themes.sort(
    (first, second) =>
      second.score - first.score ||
      first.domain.localeCompare(second.domain, "en") ||
      first.themeKey.localeCompare(second.themeKey, "en"),
  );

  return {
    ...westernChartSynthesisPolicy,
    themes,
  };
}
