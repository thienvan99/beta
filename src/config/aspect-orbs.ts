export const majorAspectConfig = [
  {
    code: "conjunction",
    nameEnglish: "Conjunction",
    labelVietnamese: "Đồng cung",
    exactAngle: 0,
    orb: 8,
  },
  {
    code: "opposition",
    nameEnglish: "Opposition",
    labelVietnamese: "Đối đỉnh",
    exactAngle: 180,
    orb: 8,
  },
  {
    code: "trine",
    nameEnglish: "Trine",
    labelVietnamese: "Tam hợp",
    exactAngle: 120,
    orb: 7,
  },
  {
    code: "square",
    nameEnglish: "Square",
    labelVietnamese: "Vuông",
    exactAngle: 90,
    orb: 7,
  },
  {
    code: "sextile",
    nameEnglish: "Sextile",
    labelVietnamese: "Lục hợp",
    exactAngle: 60,
    orb: 5,
  },
] as const;

export type MajorAspectCode = (typeof majorAspectConfig)[number]["code"];
export type MajorAspectName =
  (typeof majorAspectConfig)[number]["nameEnglish"];
