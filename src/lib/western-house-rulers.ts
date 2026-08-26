import {
  longitudeToZodiac,
  type WesternAstrologyResult,
  type ZodiacSign,
} from "./western-astrology";

export const WESTERN_HOUSE_RULERS_RULESET_ID =
  "western-house-rulers-v1" as const;
export const WESTERN_HOUSE_RULERS_RULESET_VERSION = "1.0.0" as const;

export type HouseRulerName =
  | "Sun"
  | "Moon"
  | "Mercury"
  | "Venus"
  | "Mars"
  | "Jupiter"
  | "Saturn"
  | "Uranus"
  | "Neptune"
  | "Pluto";

export type HouseRulerContext = Readonly<{
  house: number;
  cuspLongitude: number;
  cuspSign: ZodiacSign;
  primaryRuler: HouseRulerName;
  modernCoRuler: HouseRulerName | null;
  rulesetId: typeof WESTERN_HOUSE_RULERS_RULESET_ID;
  rulesetVersion: typeof WESTERN_HOUSE_RULERS_RULESET_VERSION;
}>;

type RulerDefinition = Readonly<{
  primaryRuler: HouseRulerName;
  modernCoRuler: HouseRulerName | null;
}>;

const rulersByCuspSign: Readonly<Record<ZodiacSign, RulerDefinition>> = {
  Aries: { primaryRuler: "Mars", modernCoRuler: null },
  Taurus: { primaryRuler: "Venus", modernCoRuler: null },
  Gemini: { primaryRuler: "Mercury", modernCoRuler: null },
  Cancer: { primaryRuler: "Moon", modernCoRuler: null },
  Leo: { primaryRuler: "Sun", modernCoRuler: null },
  Virgo: { primaryRuler: "Mercury", modernCoRuler: null },
  Libra: { primaryRuler: "Venus", modernCoRuler: null },
  Scorpio: { primaryRuler: "Mars", modernCoRuler: "Pluto" },
  Sagittarius: { primaryRuler: "Jupiter", modernCoRuler: null },
  Capricorn: { primaryRuler: "Saturn", modernCoRuler: null },
  Aquarius: { primaryRuler: "Saturn", modernCoRuler: "Uranus" },
  Pisces: { primaryRuler: "Jupiter", modernCoRuler: "Neptune" },
};

export function deriveWesternHouseRulers(
  result: Pick<WesternAstrologyResult, "houses">,
): HouseRulerContext[] {
  return result.houses.map(({ house, longitude }) => {
    const cuspSign = longitudeToZodiac(longitude).sign;
    const rulers = rulersByCuspSign[cuspSign];

    return {
      house,
      cuspLongitude: longitude,
      cuspSign,
      primaryRuler: rulers.primaryRuler,
      modernCoRuler: rulers.modernCoRuler,
      rulesetId: WESTERN_HOUSE_RULERS_RULESET_ID,
      rulesetVersion: WESTERN_HOUSE_RULERS_RULESET_VERSION,
    };
  });
}
