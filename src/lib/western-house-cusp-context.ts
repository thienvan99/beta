import { houseCuspBoundaryToleranceDegrees } from "./house-placement";
import {
  normalizeLongitude,
  type WesternAstrologyResult,
} from "./western-astrology";

export const WESTERN_HOUSE_CUSP_POLICY_ID =
  "western-house-cusp-policy-v1" as const;
export const WESTERN_HOUSE_CUSP_POLICY_VERSION = "1.0.0" as const;
export const WESTERN_HOUSE_CUSP_THRESHOLD_DEGREES = 1;

export type HouseCuspSide = "before" | "after" | "exact";

export type HouseCuspContext = Readonly<{
  body: string;
  primaryHouse: number;
  adjacentHouse: number;
  nearestCuspHouse: number;
  distanceDegrees: number;
  nearCusp: boolean;
  exactCusp: boolean;
  side: HouseCuspSide;
  policyId: typeof WESTERN_HOUSE_CUSP_POLICY_ID;
  policyVersion: typeof WESTERN_HOUSE_CUSP_POLICY_VERSION;
}>;

function circularDistance(first: number, second: number) {
  const distance = Math.abs(
    normalizeLongitude(first) - normalizeLongitude(second),
  );
  return Math.min(distance, 360 - distance);
}

function previousHouse(house: number) {
  return house === 1 ? 12 : house - 1;
}

export function deriveWesternHouseCuspContexts(
  result: Pick<WesternAstrologyResult, "bodies" | "houses">,
): HouseCuspContext[] {
  if (result.houses.length === 0) {
    return [];
  }

  return result.bodies.map((body) => {
    const nearestCusp = result.houses.reduce((nearest, cusp) => {
      const nearestDistance = circularDistance(body.longitude, nearest.longitude);
      const cuspDistance = circularDistance(body.longitude, cusp.longitude);
      return cuspDistance < nearestDistance ? cusp : nearest;
    });
    const measuredDistance = circularDistance(
      body.longitude,
      nearestCusp.longitude,
    );
    const exactCusp =
      measuredDistance <= houseCuspBoundaryToleranceDegrees;
    const distanceDegrees = exactCusp ? 0 : measuredDistance;
    const forwardFromCusp = normalizeLongitude(
      body.longitude - nearestCusp.longitude,
    );
    const side: HouseCuspSide = exactCusp
      ? "exact"
      : forwardFromCusp < 180
        ? "after"
        : "before";

    return {
      body: body.name,
      primaryHouse: body.house,
      adjacentHouse:
        side === "before"
          ? nearestCusp.house
          : previousHouse(nearestCusp.house),
      nearestCuspHouse: nearestCusp.house,
      distanceDegrees,
      nearCusp: distanceDegrees < WESTERN_HOUSE_CUSP_THRESHOLD_DEGREES,
      exactCusp,
      side,
      policyId: WESTERN_HOUSE_CUSP_POLICY_ID,
      policyVersion: WESTERN_HOUSE_CUSP_POLICY_VERSION,
    };
  });
}
