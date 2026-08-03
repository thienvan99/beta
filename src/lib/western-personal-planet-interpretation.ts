import {
  personalPlanetInterpretationFactors,
  westernPersonalPlanetInterpretationRules,
  type PersonalPlanetInterpretationFactor,
  type PersonalPlanetInterpretationRule,
} from "../data/western-personal-planet-interpretations";
import type {
  CelestialBodyPosition,
  WesternAstrologyResult,
  ZodiacSign,
} from "./western-astrology";

const factorPresentation: Record<
  PersonalPlanetInterpretationFactor,
  Readonly<{ label: string; role: string }>
> = {
  Mercury: {
    label: "Sao Thủy",
    role: "Tư duy, học hỏi và giao tiếp",
  },
  Venus: {
    label: "Sao Kim",
    role: "Tình cảm, giá trị và sự hòa hợp",
  },
  Mars: {
    label: "Sao Hỏa",
    role: "Động lực, hành động và ranh giới cá nhân",
  },
};

export type PersonalPlanetInterpretationPosition = Readonly<{
  factor: PersonalPlanetInterpretationFactor;
  label: string;
  role: string;
  longitude: number;
  sign: ZodiacSign;
  signVietnamese: string;
  degree: number;
  minute: number;
  retrograde: boolean;
  rule: PersonalPlanetInterpretationRule;
}>;

export type PersonalPlanetInterpretation = Readonly<{
  positions: ReadonlyArray<PersonalPlanetInterpretationPosition>;
}>;

export class WesternPersonalPlanetInterpretationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WesternPersonalPlanetInterpretationError";
  }
}

const rulesByEvidence = new Map(
  westernPersonalPlanetInterpretationRules.map((rule) => [
    `${rule.evidence.body}:${rule.evidence.sign}`,
    rule,
  ]),
);

export function getPersonalPlanetInterpretationRule(
  body: PersonalPlanetInterpretationFactor,
  sign: ZodiacSign,
) {
  const rule = rulesByEvidence.get(`${body}:${sign}`);

  if (!rule) {
    throw new WesternPersonalPlanetInterpretationError(
      `Không tìm thấy quy tắc luận giải cho ${body} tại ${sign}.`,
    );
  }

  return rule;
}

function findBody(
  result: WesternAstrologyResult,
  factor: PersonalPlanetInterpretationFactor,
): CelestialBodyPosition {
  const body = result.bodies.find(({ name }) => name === factor);

  if (!body) {
    throw new WesternPersonalPlanetInterpretationError(
      `Kết quả chưa đủ ${factor} để luận giải hành tinh cá nhân.`,
    );
  }

  return body;
}

export function interpretWesternPersonalPlanets(
  result: WesternAstrologyResult,
): PersonalPlanetInterpretation {
  const positions = personalPlanetInterpretationFactors.map((factor) => {
    const body = findBody(result, factor);
    const presentation = factorPresentation[factor];

    return {
      factor,
      label: presentation.label,
      role: presentation.role,
      longitude: body.longitude,
      sign: body.sign,
      signVietnamese: body.signVietnamese,
      degree: body.degree,
      minute: body.minute,
      retrograde: body.retrograde,
      rule: getPersonalPlanetInterpretationRule(factor, body.sign),
    };
  });

  return { positions };
}
