export const PLANET_IDS = [
  "mercury",
  "venus",
  "earth",
  "mars",
  "jupiter",
  "saturn",
  "uranus",
  "neptune",
] as const;

export type PlanetId = (typeof PLANET_IDS)[number];

export type PlanetVisualStyle =
  | "mercury"
  | "venus"
  | "earth"
  | "mars"
  | "jupiter"
  | "saturn"
  | "uranus"
  | "neptune";

export type PlanetDefinition = {
  id: PlanetId;
  nameVi: string;
  nameEn: string;
  typeVi: string;
  order: number;
  radiusKm: number;
  distanceMillionKm: number;
  orbitalPeriod: string;
  rotationPeriod: string;
  moons: string;
  summary: string;
  sourceUrl: string;
  visual: {
    radius: number;
    orbitRadius: number;
    inclination: number;
    style: PlanetVisualStyle;
    camera: {
      distance: number;
      radial: number;
      tangent: number;
      height: number;
      targetYOffset?: number;
    };
  };
};

/**
 * Scientific facts are rounded, stable reference values from NASA Science.
 * `visual` values are intentionally compressed and normalized for exploration;
 * they are not true astronomical scale or live ephemeris positions.
 */
export const PLANETS: readonly PlanetDefinition[] = [
  {
    id: "mercury",
    nameVi: "Sao Thủy",
    nameEn: "Mercury",
    typeVi: "Hành tinh đất đá",
    order: 1,
    radiusKm: 2_440,
    distanceMillionKm: 58,
    orbitalPeriod: "88 ngày Trái Đất",
    rotationPeriod: "59 ngày Trái Đất",
    moons: "Không có",
    summary: "Hành tinh nhỏ nhất và gần Mặt Trời nhất trong Hệ Mặt Trời.",
    sourceUrl: "https://science.nasa.gov/mercury/facts/",
    visual: {
      radius: 0.66,
      orbitRadius: 9,
      inclination: 0.07,
      style: "mercury",
      camera: { distance: 6, radial: 0.34, tangent: 0.94, height: 0.22 },
    },
  },
  {
    id: "venus",
    nameVi: "Sao Kim",
    nameEn: "Venus",
    typeVi: "Hành tinh đất đá",
    order: 2,
    radiusKm: 6_052,
    distanceMillionKm: 108,
    orbitalPeriod: "225 ngày Trái Đất",
    rotationPeriod: "243 ngày Trái Đất (nghịch hành)",
    moons: "Không có",
    summary: "Một thế giới phủ mây dày, có kích thước gần tương đương Trái Đất.",
    sourceUrl: "https://science.nasa.gov/venus/venus-facts/",
    visual: {
      radius: 1.08,
      orbitRadius: 13,
      inclination: 0.035,
      style: "venus",
      camera: { distance: 7.4, radial: -0.48, tangent: 0.88, height: 0.3 },
    },
  },
  {
    id: "earth",
    nameVi: "Trái Đất",
    nameEn: "Earth",
    typeVi: "Hành tinh đất đá",
    order: 3,
    radiusKm: 6_371,
    distanceMillionKm: 149.6,
    orbitalPeriod: "365,25 ngày",
    rotationPeriod: "23 giờ 56 phút",
    moons: "1 — Mặt Trăng",
    summary: "Thế giới đại dương của chúng ta và hành tinh duy nhất đã biết có sự sống.",
    sourceUrl: "https://science.nasa.gov/earth/facts/",
    visual: {
      radius: 1.18,
      orbitRadius: 17,
      inclination: 0,
      style: "earth",
      camera: { distance: 12.8, radial: -0.52, tangent: 0.82, height: 0.46, targetYOffset: 0.18 },
    },
  },
  {
    id: "mars",
    nameVi: "Sao Hỏa",
    nameEn: "Mars",
    typeVi: "Hành tinh đất đá",
    order: 4,
    radiusKm: 3_390,
    distanceMillionKm: 228,
    orbitalPeriod: "687 ngày Trái Đất",
    rotationPeriod: "24 giờ 37 phút",
    moons: "2 — Phobos và Deimos",
    summary: "Hành tinh đỏ với bề mặt giàu oxide sắt và hai vệ tinh nhỏ.",
    sourceUrl: "https://science.nasa.gov/mars/facts/",
    visual: {
      radius: 0.88,
      orbitRadius: 22,
      inclination: 0.04,
      style: "mars",
      camera: { distance: 7.2, radial: -0.5, tangent: 0.88, height: 0.34 },
    },
  },
  {
    id: "jupiter",
    nameVi: "Sao Mộc",
    nameEn: "Jupiter",
    typeVi: "Hành tinh khí khổng lồ",
    order: 5,
    radiusKm: 69_911,
    distanceMillionKm: 778,
    orbitalPeriod: "11,86 năm Trái Đất",
    rotationPeriod: "Khoảng 9 giờ 56 phút",
    moons: "Tiêu biểu: Io, Europa, Ganymede, Callisto",
    summary: "Hành tinh lớn nhất, nổi bật với các dải mây và Vết Đỏ Lớn.",
    sourceUrl: "https://science.nasa.gov/jupiter/facts/",
    visual: {
      radius: 3.15,
      orbitRadius: 31,
      inclination: 0.023,
      style: "jupiter",
      camera: { distance: 15.2, radial: -0.56, tangent: 0.78, height: 0.34, targetYOffset: 0.2 },
    },
  },
  {
    id: "saturn",
    nameVi: "Sao Thổ",
    nameEn: "Saturn",
    typeVi: "Hành tinh khí khổng lồ",
    order: 6,
    radiusKm: 58_232,
    distanceMillionKm: 1_400,
    orbitalPeriod: "29,4 năm Trái Đất",
    rotationPeriod: "Khoảng 10,7 giờ",
    moons: "Tiêu biểu: Titan, Enceladus, Rhea",
    summary: "Hành tinh khí khổng lồ với hệ vành đai băng đá nổi bật nhất.",
    sourceUrl: "https://science.nasa.gov/saturn/facts/",
    visual: {
      radius: 2.7,
      orbitRadius: 40,
      inclination: 0.043,
      style: "saturn",
      camera: { distance: 22.8, radial: -0.45, tangent: 0.72, height: 0.82, targetYOffset: 0.35 },
    },
  },
  {
    id: "uranus",
    nameVi: "Sao Thiên Vương",
    nameEn: "Uranus",
    typeVi: "Hành tinh băng khổng lồ",
    order: 7,
    radiusKm: 25_362,
    distanceMillionKm: 2_900,
    orbitalPeriod: "84 năm Trái Đất",
    rotationPeriod: "Khoảng 17,2 giờ (nghịch hành)",
    moons: "Tiêu biểu: Titania, Oberon, Ariel",
    summary: "Một hành tinh băng màu lam lục, quay gần như nằm nghiêng trên quỹ đạo.",
    sourceUrl: "https://science.nasa.gov/uranus/facts/",
    visual: {
      radius: 1.75,
      orbitRadius: 48,
      inclination: 0.013,
      style: "uranus",
      camera: { distance: 10.8, radial: -0.48, tangent: 0.78, height: 0.6 },
    },
  },
  {
    id: "neptune",
    nameVi: "Sao Hải Vương",
    nameEn: "Neptune",
    typeVi: "Hành tinh băng khổng lồ",
    order: 8,
    radiusKm: 24_622,
    distanceMillionKm: 4_500,
    orbitalPeriod: "164,8 năm Trái Đất",
    rotationPeriod: "Khoảng 16,1 giờ",
    moons: "Tiêu biểu: Triton, Nereid, Proteus",
    summary: "Thế giới xanh thẳm xa nhất trong tám hành tinh, với những cơn gió rất mạnh.",
    sourceUrl: "https://science.nasa.gov/neptune/facts/",
    visual: {
      radius: 1.7,
      orbitRadius: 56,
      inclination: 0.03,
      style: "neptune",
      camera: { distance: 10.2, radial: -0.5, tangent: 0.82, height: 0.42 },
    },
  },
] as const;

export const PLANET_BY_ID = Object.fromEntries(
  PLANETS.map((planet) => [planet.id, planet]),
) as Record<PlanetId, PlanetDefinition>;
