import {
  socialPlanetInterpretationFactors,
  westernSocialPlanetInterpretationRules,
  type SocialPlanetInterpretationFactor,
  type SocialPlanetInterpretationRule,
} from "../data/western-social-planet-interpretations";
import type {
  CelestialBodyPosition,
  WesternAstrologyResult,
  ZodiacSign,
} from "./western-astrology";

const factorPresentation: Record<
  SocialPlanetInterpretationFactor,
  Readonly<{ label: string; role: string }>
> = {
  Jupiter: {
    label: "Sao Mộc",
    role: "Mở rộng nhận thức, niềm tin, hệ giá trị, ý nghĩa, cơ hội và học hỏi",
  },
  Saturn: {
    label: "Sao Thổ",
    role: "Cấu trúc, giới hạn, trách nhiệm, kỷ luật, tiêu chuẩn và trưởng thành",
  },
  Uranus: {
    label: "Sao Thiên Vương",
    role: "Thức tỉnh, đổi mới, độc lập, phá vỡ khuôn mẫu và cải tiến hệ thống",
  },
  Neptune: {
    label: "Sao Hải Vương",
    role: "Lý tưởng, tưởng tượng, ranh giới mềm, cảm thông và vùng mơ hồ thế hệ",
  },
  Pluto: {
    label: "Sao Diêm Vương",
    role: "Quyền lực, áp lực sâu, điều bị che khuất, loại bỏ và tái cấu trúc thế hệ",
  },
};

export type SocialPlanetInterpretationPosition = Readonly<{
  factor: SocialPlanetInterpretationFactor;
  label: string;
  role: string;
  longitude: number;
  sign: ZodiacSign;
  signVietnamese: string;
  degree: number;
  minute: number;
  retrograde: boolean;
  rule: SocialPlanetInterpretationRule;
}>;

export type SocialPlanetInterpretation = Readonly<{
  positions: ReadonlyArray<SocialPlanetInterpretationPosition>;
}>;

export class WesternSocialPlanetInterpretationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WesternSocialPlanetInterpretationError";
  }
}

const rulesByEvidence = new Map(
  westernSocialPlanetInterpretationRules.map((rule) => [
    `${rule.evidence.body}:${rule.evidence.sign}`,
    rule,
  ]),
);

export function getSocialPlanetInterpretationRule(
  body: SocialPlanetInterpretationFactor,
  sign: ZodiacSign,
) {
  const rule = rulesByEvidence.get(`${body}:${sign}`);

  if (!rule) {
    throw new WesternSocialPlanetInterpretationError(
      `Không tìm thấy quy tắc luận giải cho ${body} tại ${sign}.`,
    );
  }

  return rule;
}

function findBody(
  result: WesternAstrologyResult,
  factor: SocialPlanetInterpretationFactor,
): CelestialBodyPosition {
  const body = result.bodies.find(({ name }) => name === factor);

  if (!body) {
    throw new WesternSocialPlanetInterpretationError(
      `Kết quả chưa đủ ${factor} để luận giải hành tinh xã hội.`,
    );
  }

  return body;
}

export function interpretWesternSocialPlanets(
  result: WesternAstrologyResult,
): SocialPlanetInterpretation {
  const positions = socialPlanetInterpretationFactors.map((factor) => {
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
      rule: getSocialPlanetInterpretationRule(factor, body.sign),
    };
  });

  return { positions };
}
