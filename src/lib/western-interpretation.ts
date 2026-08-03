import {
  westernCoreInterpretationRules,
  zodiacSignQualities,
  type CoreInterpretationFactor,
  type CoreInterpretationRule,
  type ZodiacElement,
  type ZodiacModality,
} from "../data/western-core-interpretations";
import type {
  WesternAstrologyResult,
  ZodiacSign,
} from "./western-astrology";

export const westernInterpretationDisclaimer =
  "Chiêm tinh là một hệ thống biểu tượng dùng để tự quan sát và tham khảo, không phải kết luận khoa học hoặc sự xác định tuyệt đối về số phận.";

const factorPresentation: Record<
  CoreInterpretationFactor,
  Readonly<{ label: string; role: string }>
> = {
  Sun: {
    label: "Mặt Trời",
    role: "Bản sắc và động lực cốt lõi",
  },
  Moon: {
    label: "Mặt Trăng",
    role: "Cảm xúc và nhu cầu an toàn",
  },
  ASC: {
    label: "Cung Mọc",
    role: "Cách thể hiện ra bên ngoài và cách tiếp cận cuộc sống",
  },
};

export type CoreTriadPosition = Readonly<{
  factor: CoreInterpretationFactor;
  label: string;
  role: string;
  longitude: number;
  sign: ZodiacSign;
  signVietnamese: string;
  degree: number;
  minute: number;
  element: ZodiacElement;
  modality: ZodiacModality;
  rule: CoreInterpretationRule;
}>;

export type CoreTriadInterpretation = Readonly<{
  positions: ReadonlyArray<CoreTriadPosition>;
  synthesis: Readonly<{
    summary: string;
    observations: ReadonlyArray<string>;
  }>;
  disclaimer: string;
}>;

export class WesternInterpretationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WesternInterpretationError";
  }
}

const rulesByEvidence = new Map(
  westernCoreInterpretationRules.map((rule) => [
    `${rule.evidence.body}:${rule.evidence.sign}`,
    rule,
  ]),
);

export function getCoreInterpretationRule(
  body: CoreInterpretationFactor,
  sign: ZodiacSign,
) {
  const rule = rulesByEvidence.get(`${body}:${sign}`);

  if (!rule) {
    throw new WesternInterpretationError(
      `Không tìm thấy quy tắc luận giải cho ${body} tại ${sign}.`,
    );
  }

  return rule;
}

function listVietnamese(items: ReadonlyArray<string>) {
  if (items.length <= 1) {
    return items[0] ?? "";
  }

  return `${items.slice(0, -1).join(", ")} và ${items.at(-1)}`;
}

function groupFactorsByValue<T extends string>(
  positions: ReadonlyArray<CoreTriadPosition>,
  select: (position: CoreTriadPosition) => T,
) {
  const groups = new Map<T, string[]>();

  for (const position of positions) {
    const value = select(position);
    const labels = groups.get(value) ?? [];
    labels.push(position.label);
    groups.set(value, labels);
  }

  return [...groups.entries()].sort((first, second) => {
    const countDifference = second[1].length - first[1].length;
    return countDifference || (first[0] < second[0] ? -1 : 1);
  });
}

function describeElementPattern(positions: ReadonlyArray<CoreTriadPosition>) {
  const groups = groupFactorsByValue(positions, ({ element }) => element);

  if (groups.length === 1) {
    return `Cả ba vị trí cùng nguyên tố ${groups[0][0]}, nên nguồn động lực, nhu cầu cảm xúc và cách thể hiện có xu hướng nói chung một ngôn ngữ.`;
  }

  if (groups[0][1].length === 2) {
    return `${listVietnamese(groups[0][1])} cùng nguyên tố ${groups[0][0]}, tạo một điểm nhấn rõ; vị trí còn lại bổ sung cách phản ứng khác.`;
  }

  return `Ba vị trí thuộc ba nguyên tố khác nhau (${positions.map(({ element }) => element).join(", ")}), cho thấy bạn có thể chuyển đổi giữa nhiều cách tiếp nhận và biểu đạt.`;
}

function describeModalityPattern(positions: ReadonlyArray<CoreTriadPosition>) {
  const groups = groupFactorsByValue(positions, ({ modality }) => modality);

  if (groups.length === 1) {
    return `Cả ba cùng tính chất ${groups[0][0]}, tạo nhịp hành động khá nhất quán giữa bên trong và bên ngoài.`;
  }

  if (groups[0][1].length === 2) {
    return `${listVietnamese(groups[0][1])} cùng tính chất ${groups[0][0]}; đây có thể là cách vận hành quen thuộc khi bạn bắt đầu, duy trì hoặc điều chỉnh một việc.`;
  }

  return "Ba vị trí có đủ ba tính chất Tiên phong, Kiên định và Linh hoạt, nên bộ ba có khả năng luân phiên giữa khởi xướng, duy trì và thích nghi.";
}

function describeInnerOuterRelationship(
  moon: CoreTriadPosition,
  ascendant: CoreTriadPosition,
) {
  if (moon.sign === ascendant.sign) {
    return `Mặt Trăng và Cung Mọc cùng ở ${moon.signVietnamese}, nên nhu cầu bên trong và cách bạn xuất hiện ban đầu có độ đồng thuận cao.`;
  }

  if (moon.element === ascendant.element) {
    return `Mặt Trăng và Cung Mọc cùng nguyên tố ${moon.element}, nên biểu hiện bên ngoài có thể khá thuận với cách bạn tìm cảm giác an toàn, dù hai cung vẫn có sắc thái riêng.`;
  }

  return `Mặt Trăng thuộc ${moon.element} còn Cung Mọc thuộc ${ascendant.element}; khác biệt này có thể tạo độ tương phản giữa điều bạn cần bên trong và cách bạn phản ứng ra bên ngoài.`;
}

function buildSynthesis(positions: ReadonlyArray<CoreTriadPosition>) {
  const moon = positions.find(({ factor }) => factor === "Moon");
  const ascendant = positions.find(({ factor }) => factor === "ASC");

  if (!moon || !ascendant) {
    throw new WesternInterpretationError(
      "Không đủ Mặt Trăng và Cung Mọc để tổng hợp bộ ba cốt lõi.",
    );
  }

  const observations = [
    describeElementPattern(positions),
    describeModalityPattern(positions),
    describeInnerOuterRelationship(moon, ascendant),
  ];

  return {
    summary:
      "Phần tổng hợp này đối chiếu nguyên tố và tính chất của ba vị trí, nhằm gợi ý cách bản sắc, nhu cầu cảm xúc và phong cách thể hiện phối hợp với nhau.",
    observations,
  };
}

export function interpretWesternCoreTriad(
  result: WesternAstrologyResult,
): CoreTriadInterpretation {
  const sun = result.bodies.find(({ name }) => name === "Sun");
  const moon = result.bodies.find(({ name }) => name === "Moon");
  const ascendant = result.angles.find(({ name }) => name === "ASC");

  if (!sun || !moon || !ascendant) {
    throw new WesternInterpretationError(
      "Kết quả chưa đủ Mặt Trời, Mặt Trăng và ASC để luận giải bộ ba cốt lõi.",
    );
  }

  const sources = [
    { factor: "Sun" as const, position: sun },
    { factor: "Moon" as const, position: moon },
    { factor: "ASC" as const, position: ascendant },
  ];
  const positions = sources.map(({ factor, position }) => {
    const presentation = factorPresentation[factor];
    const quality = zodiacSignQualities[position.sign];

    return {
      factor,
      label: presentation.label,
      role: presentation.role,
      longitude: position.longitude,
      sign: position.sign,
      signVietnamese: position.signVietnamese,
      degree: position.degree,
      minute: position.minute,
      element: quality.element,
      modality: quality.modality,
      rule: getCoreInterpretationRule(factor, position.sign),
    };
  });

  return {
    positions,
    synthesis: buildSynthesis(positions),
    disclaimer: westernInterpretationDisclaimer,
  };
}
