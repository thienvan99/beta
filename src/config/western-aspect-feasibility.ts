import {
  majorAspectConfig,
  type MajorAspectCode,
} from "./aspect-orbs";

export const westernAspectBodies = [
  "Sun",
  "Moon",
  "Mercury",
  "Venus",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
  "Pluto",
] as const;

export type WesternAspectBody = (typeof westernAspectBodies)[number];

export const westernMajorAspects = majorAspectConfig.map(
  ({ code }) => code,
) as ReadonlyArray<MajorAspectCode>;

export function canonicalizeWesternAspectPair(
  body1: string,
  body2: string,
): readonly [string, string] {
  return [body1, body2].sort((first, second) =>
    first.localeCompare(second, "en"),
  ) as [string, string];
}

function pairKey(body1: string, body2: string) {
  return canonicalizeWesternAspectPair(body1, body2).join(":");
}

const innerPlanetOverrides = new Map<string, ReadonlyArray<MajorAspectCode>>([
  [pairKey("Sun", "Mercury"), ["conjunction"]],
  [pairKey("Sun", "Venus"), ["conjunction"]],
  [pairKey("Mercury", "Venus"), ["conjunction", "sextile"]],
]);

export type WesternAspectFeasibility = Readonly<{
  body1: WesternAspectBody;
  body2: WesternAspectBody;
  supportedAspects: ReadonlyArray<MajorAspectCode>;
}>;

export const westernAspectFeasibility = westernAspectBodies.flatMap(
  (body1, firstIndex) =>
    westernAspectBodies.slice(firstIndex + 1).map((body2) => {
      const [canonicalBody1, canonicalBody2] = canonicalizeWesternAspectPair(
        body1,
        body2,
      ) as [WesternAspectBody, WesternAspectBody];
      return {
        body1: canonicalBody1,
        body2: canonicalBody2,
        supportedAspects:
          innerPlanetOverrides.get(pairKey(body1, body2)) ??
          westernMajorAspects,
      };
    }),
) satisfies ReadonlyArray<WesternAspectFeasibility>;

const feasibilityByPair = new Map(
  westernAspectFeasibility.map((entry) => [
    pairKey(entry.body1, entry.body2),
    entry,
  ]),
);

export function getWesternAspectFeasibility(body1: string, body2: string) {
  return feasibilityByPair.get(pairKey(body1, body2)) ?? null;
}

export function isWesternAspectInterpretationFeasible(
  body1: string,
  body2: string,
  aspect: MajorAspectCode,
) {
  return (
    getWesternAspectFeasibility(body1, body2)?.supportedAspects.includes(
      aspect,
    ) ?? false
  );
}
