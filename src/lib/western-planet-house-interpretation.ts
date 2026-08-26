import {
  westernPlanetHouseBodies,
  westernPlanetHouseInterpretationRules,
  type PlanetHouseInterpretationRule,
  type WesternPlanetHouseBody,
} from "../data/western-planet-house-interpretations";
import type {
  CelestialBodyPosition,
  WesternAstrologyResult,
} from "./western-astrology";

export type PlanetHouseInterpretation = Readonly<{
  body: CelestialBodyPosition;
  rule: PlanetHouseInterpretationRule;
}>;

const supportedBodies = new Set<string>(westernPlanetHouseBodies);
const rulesByPlacement = new Map(
  westernPlanetHouseInterpretationRules.map((rule) => [
    `${rule.evidence.body}:${rule.evidence.house}`,
    rule,
  ]),
);

export function getPlanetHouseInterpretationRule(
  body: WesternPlanetHouseBody,
  house: number,
) {
  return rulesByPlacement.get(`${body}:${house}`) ?? null;
}

export function interpretWesternPlanetHouses(
  result: Pick<WesternAstrologyResult, "bodies">,
): PlanetHouseInterpretation[] {
  return result.bodies.flatMap((body) => {
    if (!supportedBodies.has(body.name)) return [];

    const rule = getPlanetHouseInterpretationRule(
      body.name as WesternPlanetHouseBody,
      body.house,
    );

    return rule ? [{ body, rule }] : [];
  });
}
