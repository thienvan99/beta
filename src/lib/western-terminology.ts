import {
  zodiacSignLabels,
  type ZodiacSign,
} from "./western-astrology";

export const westernBodyLabels = {
  Sun: "Mặt Trời",
  Moon: "Mặt Trăng",
  Mercury: "Sao Thủy",
  Venus: "Sao Kim",
  Mars: "Sao Hỏa",
  Jupiter: "Sao Mộc",
  Saturn: "Sao Thổ",
  Uranus: "Sao Thiên Vương",
  Neptune: "Sao Hải Vương",
  Pluto: "Sao Diêm Vương",
  ASC: "Cung Mọc",
  MC: "Thiên Đỉnh",
} as const;

export type WesternBodyTerm = keyof typeof westernBodyLabels;

const westernBodyEnglishLabels: Record<WesternBodyTerm, string> = {
  Sun: "Sun",
  Moon: "Moon",
  Mercury: "Mercury",
  Venus: "Venus",
  Mars: "Mars",
  Jupiter: "Jupiter",
  Saturn: "Saturn",
  Uranus: "Uranus",
  Neptune: "Neptune",
  Pluto: "Pluto",
  ASC: "Ascendant",
  MC: "Midheaven",
};

export function formatWesternBodyTerm(body: WesternBodyTerm) {
  return `${westernBodyEnglishLabels[body]} (${westernBodyLabels[body]})`;
}

export function formatZodiacSignTerm(sign: ZodiacSign) {
  return `${sign} (${zodiacSignLabels[sign]})`;
}
