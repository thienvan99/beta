import type { WesternAstrologyInput } from "./western-astrology";

type BodyReference = Readonly<{
  astrolog: number;
  circular: number;
  retrograde: boolean;
  house: number;
}>;

type AspectReference = readonly [
  id: string,
  circularOrb: number,
  astrologPhase: "applying" | "separating",
  circularPhase: "applying" | "separating" | null,
];

export type FinalValidationCase = Readonly<{
  label: string;
  input: WesternAstrologyInput;
  bodies: Readonly<Record<string, BodyReference>>;
  astrologHouses: readonly number[];
  circularHouses: readonly number[];
  aspects: ReadonlyArray<AspectReference>;
}>;

export const finalValidationCases: ReadonlyArray<FinalValidationCase> = [
  {
    label: "Việt Nam",
    input: {
      localDateTime: "1990-01-15T08:30:00",
      utcDateTime: "1990-01-15T01:30:00Z",
      latitude: 10.8231,
      longitude: 106.6297,
      timeZone: "Asia/Ho_Chi_Minh",
    },
    bodies: {
      Sun: { astrolog: 294.6325, circular: 294.6321, retrograde: false, house: 11 },
      Moon: { astrolog: 162.006944, circular: 161.9991, retrograde: false, house: 7 },
      Mercury: { astrolog: 281.674444, circular: 281.6751, retrograde: true, house: 11 },
      Venus: { astrolog: 300.944167, circular: 300.9445, retrograde: true, house: 12 },
      Mars: { astrolog: 259.5975, circular: 259.5972, retrograde: false, house: 10 },
      Jupiter: { astrolog: 93.417222, circular: 93.4175, retrograde: true, house: 5 },
      Saturn: { astrolog: 287.262778, circular: 287.2629, retrograde: false, house: 11 },
      Uranus: { astrolog: 276.587778, circular: 276.5879, retrograde: false, house: 11 },
      Neptune: { astrolog: 282.549444, circular: 282.5495, retrograde: false, house: 11 },
      Pluto: { astrolog: 227.419167, circular: 227.4196, retrograde: false, house: 9 },
    },
    astrologHouses: [
      328.943611, 3.895278, 36.599722, 65.302778, 91.645,
      118.531944, 148.943611, 183.895278, 216.599722, 245.302778,
      271.645, 298.531944,
    ],
    circularHouses: [
      328.9419, 3.8913, 36.5947, 65.2989, 91.644, 118.532,
      148.9419, 183.8913, 216.5947, 245.2989, 271.644, 298.532,
    ],
    aspects: [
      ["Sun-Venus-Conjunction", 6.3124, "applying", "applying"],
      ["Sun-Saturn-Conjunction", 7.3692, "separating", "separating"],
      ["Moon-Mercury-Trine", 0.324, "separating", "separating"],
      ["Moon-Saturn-Trine", 5.2638, "applying", "applying"],
      ["Moon-Uranus-Trine", 5.4112, "separating", "separating"],
      ["Moon-Neptune-Trine", 0.5504, "applying", "applying"],
      ["Mercury-Saturn-Conjunction", 5.5878, "separating", "separating"],
      ["Mercury-Uranus-Conjunction", 5.0872, "applying", "applying"],
      ["Mercury-Neptune-Conjunction", 0.8744, "separating", "separating"],
      ["Jupiter-Uranus-Opposition", 3.1704, "separating", "separating"],
      ["Saturn-Neptune-Conjunction", 4.7134, "separating", "separating"],
      ["Saturn-Pluto-Sextile", 0.1567, "applying", "applying"],
      ["Uranus-Neptune-Conjunction", 5.9616, "applying", null],
      ["Neptune-Pluto-Sextile", 4.8701, "applying", "applying"],
    ],
  },
  {
    label: "London",
    input: {
      localDateTime: "2000-01-01T12:00:00",
      utcDateTime: "2000-01-01T12:00:00Z",
      latitude: 51.5074,
      longitude: -0.1278,
      timeZone: "Europe/London",
    },
    bodies: {
      Sun: { astrolog: 280.368889, circular: 280.3682, retrograde: false, house: 10 },
      Moon: { astrolog: 223.323611, circular: 223.3149, retrograde: false, house: 7 },
      Mercury: { astrolog: 271.889167, circular: 271.8881, retrograde: false, house: 9 },
      Venus: { astrolog: 241.565556, circular: 241.5649, retrograde: false, house: 8 },
      Mars: { astrolog: 327.963056, circular: 327.9627, retrograde: false, house: 12 },
      Jupiter: { astrolog: 25.252778, circular: 25.253, retrograde: false, house: 1 },
      Saturn: { astrolog: 40.395556, circular: 40.3956, retrograde: true, house: 1 },
      Uranus: { astrolog: 314.809167, circular: 314.8092, retrograde: false, house: 11 },
      Neptune: { astrolog: 303.192778, circular: 303.193, retrograde: false, house: 11 },
      Pluto: { astrolog: 251.454444, circular: 251.4546, retrograde: false, house: 8 },
    },
    astrologHouses: [
      24.014444, 61.012778, 81.911389, 99.493056, 118.913333,
      147.485278, 204.014444, 241.012778, 261.911389, 279.493056,
      298.913333, 327.485278,
    ],
    circularHouses: [
      24.021, 60.5142, 81.4203, 99.4966, 119.2617, 147.6104,
      204.021, 240.5142, 261.4203, 279.4966, 299.2617, 327.6104,
    ],
    aspects: [
      ["Sun-Moon-Sextile", 2.9467, "separating", "separating"],
      ["Sun-Saturn-Trine", 0.0274, "applying", "applying"],
      ["Moon-Saturn-Opposition", 2.9193, "separating", "separating"],
      ["Moon-Uranus-Square", 1.4943, "applying", "applying"],
      ["Mercury-Mars-Sextile", 3.9254, "separating", "separating"],
      ["Mercury-Jupiter-Trine", 6.6351, "separating", "separating"],
      ["Venus-Mars-Square", 3.6022, "separating", "separating"],
      ["Venus-Neptune-Sextile", 1.6281, "applying", "applying"],
      ["Mars-Jupiter-Sextile", 2.7097, "separating", "separating"],
      ["Saturn-Uranus-Square", 4.4136, "separating", "separating"],
      ["Uranus-Pluto-Sextile", 3.3546, "separating", "separating"],
    ],
  },
  {
    label: "New York",
    input: {
      localDateTime: "1985-07-23T18:45:00",
      utcDateTime: "1985-07-23T22:45:00Z",
      latitude: 40.7128,
      longitude: -74.006,
      timeZone: "America/New_York",
    },
    bodies: {
      Sun: { astrolog: 121.000278, circular: 120.9999, retrograde: false, house: 7 },
      Moon: { astrolog: 197.346667, circular: 197.3375, retrograde: false, house: 9 },
      Mercury: { astrolog: 144.630833, circular: 144.6308, retrograde: false, house: 8 },
      Venus: { astrolog: 79.331667, circular: 79.3312, retrograde: false, house: 6 },
      Mars: { astrolog: 119.21, circular: 119.2097, retrograde: false, house: 7 },
      Jupiter: { astrolog: 313.5075, circular: 313.5077, retrograde: true, house: 1 },
      Saturn: { astrolog: 231.470278, circular: 231.4704, retrograde: true, house: 10 },
      Uranus: { astrolog: 254.331944, circular: 254.3322, retrograde: true, house: 11 },
      Neptune: { astrolog: 271.471111, circular: 271.4713, retrograde: true, house: 12 },
      Pluto: { astrolog: 211.9625, circular: 211.9632, retrograde: false, house: 10 },
    },
    astrologHouses: [
      276.538611, 317.053333, 358.572778, 30.986389, 55.408611,
      75.988333, 96.538611, 137.053333, 178.572778, 210.986389,
      235.408611, 255.988333,
    ],
    circularHouses: [
      276.5483, 317.1272, 359.5451, 30.9883, 55.4827, 76.1506,
      96.5483, 137.1272, 179.5451, 210.9883, 235.4827, 256.1506,
    ],
    aspects: [
      ["Sun-Mars-Conjunction", 1.7902, "separating", "separating"],
      ["Sun-Pluto-Square", 0.9633, "applying", "applying"],
      ["Moon-Venus-Trine", 1.9937, "applying", "applying"],
      ["Moon-Jupiter-Trine", 3.8298, "separating", "separating"],
      ["Moon-Uranus-Sextile", 3.0053, "separating", "separating"],
      ["Mercury-Saturn-Square", 3.1604, "separating", "separating"],
      ["Mercury-Neptune-Trine", 6.8405, "applying", "applying"],
      ["Venus-Jupiter-Trine", 5.8235, "separating", "separating"],
      ["Venus-Uranus-Opposition", 4.999, "separating", "separating"],
      ["Mars-Pluto-Square", 2.7535, "applying", "applying"],
      ["Jupiter-Uranus-Sextile", 0.8245, "separating", "separating"],
      ["Neptune-Pluto-Sextile", 0.4919, "separating", "separating"],
    ],
  },
  {
    label: "Sydney, Nam bán cầu",
    input: {
      localDateTime: "1992-11-05T14:20:00",
      utcDateTime: "1992-11-05T03:20:00Z",
      latitude: -33.8688,
      longitude: 151.2093,
      timeZone: "Australia/Sydney",
    },
    bodies: {
      Sun: { astrolog: 222.968056, circular: 222.9676, retrograde: false, house: 9 },
      Moon: { astrolog: 342.947778, circular: 342.9401, retrograde: false, house: 1 },
      Mercury: { astrolog: 245.919722, circular: 245.9194, retrograde: false, house: 9 },
      Venus: { astrolog: 259.881667, circular: 259.8811, retrograde: false, house: 10 },
      Mars: { astrolog: 114.139444, circular: 114.1395, retrograde: false, house: 5 },
      Jupiter: { astrolog: 185.188889, circular: 185.1888, retrograde: false, house: 7 },
      Saturn: { astrolog: 312.160278, circular: 312.1604, retrograde: false, house: 12 },
      Uranus: { astrolog: 284.8225, circular: 284.8227, retrograde: false, house: 11 },
      Neptune: { astrolog: 286.585278, circular: 286.5855, retrograde: false, house: 11 },
      Pluto: { astrolog: 232.4725, circular: 232.4725, retrograde: false, house: 9 },
    },
    astrologHouses: [
      339.644722, 5.3125, 35.083056, 67.612222, 100.432222,
      131.433333, 159.644722, 185.3125, 215.083056, 247.612222,
      280.432222, 311.433333,
    ],
    circularHouses: [
      339.6413, 5.309, 35.0899, 67.6081, 100.3661, 131.4001,
      159.6413, 185.309, 215.0899, 247.6081, 280.3661, 311.4001,
    ],
    aspects: [
      ["Sun-Moon-Trine", 0.0275, "applying", "applying"],
      ["Sun-Saturn-Square", 0.8072, "separating", "separating"],
      ["Sun-Uranus-Sextile", 1.8551, "applying", "applying"],
      ["Sun-Neptune-Sextile", 3.6179, "applying", "applying"],
      ["Moon-Venus-Square", 6.941, "applying", "applying"],
      ["Moon-Uranus-Sextile", 1.8826, "applying", "applying"],
      ["Moon-Neptune-Sextile", 3.6454, "applying", "applying"],
      ["Mercury-Jupiter-Sextile", 0.7306, "separating", "separating"],
      ["Mars-Neptune-Opposition", 7.554, "separating", "separating"],
      ["Mars-Pluto-Trine", 1.667, "separating", "separating"],
      ["Jupiter-Saturn-Trine", 6.9716, "applying", "applying"],
      ["Uranus-Neptune-Conjunction", 1.7628, "applying", "applying"],
    ],
  },
  {
    label: "London gần ranh giới Bạch Dương",
    input: {
      localDateTime: "2024-03-20T03:06:00",
      utcDateTime: "2024-03-20T03:06:00Z",
      latitude: 51.5074,
      longitude: -0.1278,
      timeZone: "Europe/London",
    },
    bodies: {
      Sun: { astrolog: 359.999444, circular: 359.9989, retrograde: false, house: 2 },
      Moon: { astrolog: 123.815278, circular: 123.8055, retrograde: false, house: 7 },
      Mercury: { astrolog: 17.440833, circular: 17.4397, retrograde: false, house: 2 },
      Venus: { astrolog: 340.171111, circular: 340.1704, retrograde: false, house: 2 },
      Mars: { astrolog: 327.773333, circular: 327.7728, retrograde: false, house: 1 },
      Jupiter: { astrolog: 44.885556, circular: 44.8855, retrograde: false, house: 3 },
      Saturn: { astrolog: 342.225278, circular: 342.2255, retrograde: false, house: 2 },
      Uranus: { astrolog: 50.253611, circular: 50.2538, retrograde: false, house: 4 },
      Neptune: { astrolog: 357.46, circular: 357.4602, retrograde: false, house: 2 },
      Pluto: { astrolog: 301.660556, circular: 301.6607, retrograde: false, house: 1 },
    },
    astrologHouses: [
      281.345833, 334.075833, 19.176389, 46.9825, 66.530833,
      83.290833, 101.345833, 154.075833, 199.176389, 226.9825,
      246.530833, 263.290833,
    ],
    circularHouses: [
      281.3511, 334.1429, 19.1604, 46.9833, 66.8714, 83.9016,
      101.3511, 154.1429, 199.1604, 226.9833, 246.8714, 263.9016,
    ],
    aspects: [
      ["Sun-Moon-Trine", 3.8066, "separating", "separating"],
      ["Sun-Neptune-Conjunction", 2.5387, "separating", "separating"],
      ["Sun-Pluto-Sextile", 1.6618, "applying", "applying"],
      ["Moon-Neptune-Trine", 6.3453, "separating", "separating"],
      ["Moon-Pluto-Opposition", 2.1448, "separating", "separating"],
      ["Venus-Jupiter-Sextile", 4.7151, "applying", "applying"],
      ["Venus-Saturn-Conjunction", 2.0551, "applying", "applying"],
      ["Jupiter-Saturn-Sextile", 2.66, "separating", "separating"],
      ["Jupiter-Uranus-Conjunction", 5.3683, "applying", "applying"],
      ["Neptune-Pluto-Sextile", 4.2005, "applying", "applying"],
    ],
  },
];
