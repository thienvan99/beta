import {
  Body,
  Ecliptic,
  GeoVector,
  MakeTime,
  SiderealTime,
  e_tilt,
} from "astronomy-engine";
import {
  majorAspectConfig,
  type MajorAspectCode,
  type MajorAspectName,
} from "../config/aspect-orbs";
import { findHouseForLongitude } from "./house-placement";

export const zodiacSigns = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
] as const;

export type ZodiacSign = (typeof zodiacSigns)[number];

export const zodiacSignLabels: Record<ZodiacSign, string> = {
  Aries: "Bạch Dương",
  Taurus: "Kim Ngưu",
  Gemini: "Song Tử",
  Cancer: "Cự Giải",
  Leo: "Sư Tử",
  Virgo: "Xử Nữ",
  Libra: "Thiên Bình",
  Scorpio: "Bọ Cạp",
  Sagittarius: "Nhân Mã",
  Capricorn: "Ma Kết",
  Aquarius: "Bảo Bình",
  Pisces: "Song Ngư",
};

export type WesternAstrologyInput = Readonly<{
  localDateTime: string;
  utcDateTime: string;
  latitude: number;
  longitude: number;
  timeZone: string;
}>;

export type ZodiacPosition = Readonly<{
  sign: ZodiacSign;
  signVietnamese: string;
  degree: number;
  minute: number;
}>;

export type CelestialBodyPosition = Readonly<{
  name: string;
  longitude: number;
  sign: ZodiacSign;
  signVietnamese: string;
  degree: number;
  minute: number;
  retrograde: boolean;
  house: number;
}>;

export type AstrologicalAnglePosition = Readonly<{
  name: "ASC" | "MC";
  longitude: number;
  sign: ZodiacSign;
  signVietnamese: string;
  degree: number;
  minute: number;
}>;

export type HouseCuspPosition = Readonly<{
  house: number;
  longitude: number;
  sign: ZodiacSign;
  signVietnamese: string;
  degree: number;
  minute: number;
}>;

export type MajorAspect = Readonly<{
  id: string;
  body1: string;
  body2: string;
  aspect: MajorAspectCode;
  aspectEnglish: MajorAspectName;
  aspectVietnamese: string;
  exactAngle: number;
  actualAngle: number;
  orb: number;
  phase: "applying" | "separating" | null;
}>;

export type WesternAstrologyResult = Readonly<{
  system: "Tropical Zodiac";
  houseSystem: "Placidus";
  julianDay: number;
  bodies: CelestialBodyPosition[];
  angles: AstrologicalAnglePosition[];
  houses: HouseCuspPosition[];
  aspects: MajorAspect[];
}>;

export class PlacidusCalculationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PlacidusCalculationError";
  }
}

const celestialBodies = [
  { name: "Sun", body: Body.Sun },
  { name: "Moon", body: Body.Moon },
  { name: "Mercury", body: Body.Mercury },
  { name: "Venus", body: Body.Venus },
  { name: "Mars", body: Body.Mars },
  { name: "Jupiter", body: Body.Jupiter },
  { name: "Saturn", body: Body.Saturn },
  { name: "Uranus", body: Body.Uranus },
  { name: "Neptune", body: Body.Neptune },
  { name: "Pluto", body: Body.Pluto },
] as const;

const millisecondsPerDay = 86_400_000;
const julianDayAtUnixEpoch = 2_440_587.5;
const julianDayJ2000 = 2_451_545;
const retrogradeSampleMilliseconds = 60 * 60 * 1_000;
const aspectPhaseSampleMilliseconds = 60 * 1_000;
const aspectPhaseMinimumChangeDegrees = 1e-9;
const degreesPerRadian = 180 / Math.PI;

function parseUtcDateTime(utcDateTime: string) {
  if (!utcDateTime.trim().endsWith("Z")) {
    throw new RangeError("UTC date-time must end with Z.");
  }

  const date = new Date(utcDateTime);

  if (Number.isNaN(date.getTime())) {
    throw new RangeError("Invalid UTC date-time.");
  }

  return date;
}

export function normalizeLongitude(longitude: number) {
  if (!Number.isFinite(longitude)) {
    throw new RangeError("Longitude must be finite.");
  }

  return ((longitude % 360) + 360) % 360;
}

function signedLongitudeDifference(from: number, to: number) {
  return ((to - from + 540) % 360) - 180;
}

export function shortestAngularDistance(first: number, second: number) {
  const distance = Math.abs(
    normalizeLongitude(first) - normalizeLongitude(second),
  );
  return Math.min(distance, 360 - distance);
}

function apparentGeocentricLongitude(body: Body, date: Date) {
  const equatorialVector = GeoVector(body, date, true);
  return normalizeLongitude(Ecliptic(equatorialVector).elon);
}

function isRetrograde(body: Body, date: Date) {
  const before = new Date(date.getTime() - retrogradeSampleMilliseconds);
  const after = new Date(date.getTime() + retrogradeSampleMilliseconds);
  const motion = signedLongitudeDifference(
    apparentGeocentricLongitude(body, before),
    apparentGeocentricLongitude(body, after),
  );

  return motion < 0;
}

export function calculateJulianDay(utcDateTime: string) {
  const date = parseUtcDateTime(utcDateTime);
  return date.getTime() / millisecondsPerDay + julianDayAtUnixEpoch;
}

export function longitudeToZodiac(longitude: number): ZodiacPosition {
  if (!Number.isFinite(longitude)) {
    throw new RangeError("Longitude must be finite.");
  }

  const normalized = normalizeLongitude(longitude);
  const signIndex = Math.floor(normalized / 30);
  const degreeInSign = normalized - signIndex * 30;
  const degree = Math.floor(degreeInSign);
  const minute = Math.floor((degreeInSign - degree) * 60);

  return {
    sign: zodiacSigns[signIndex],
    signVietnamese: zodiacSignLabels[zodiacSigns[signIndex]],
    degree,
    minute,
  };
}

function eclipticLongitudeFromRightAscension(
  rightAscension: number,
  obliquity: number,
) {
  const rightAscensionRadians = rightAscension / degreesPerRadian;
  const obliquityRadians = obliquity / degreesPerRadian;

  return normalizeLongitude(
    Math.atan2(
      Math.sin(rightAscensionRadians),
      Math.cos(rightAscensionRadians) * Math.cos(obliquityRadians),
    ) * degreesPerRadian,
  );
}

function calculateAscendant(
  localSiderealTime: number,
  latitude: number,
  obliquity: number,
) {
  const siderealRadians = localSiderealTime / degreesPerRadian;
  const latitudeRadians = latitude / degreesPerRadian;
  const obliquityRadians = obliquity / degreesPerRadian;

  return normalizeLongitude(
    Math.atan2(
      Math.cos(siderealRadians),
      -(
        Math.sin(siderealRadians) * Math.cos(obliquityRadians) +
        Math.tan(latitudeRadians) * Math.sin(obliquityRadians)
      ),
    ) * degreesPerRadian,
  );
}

function solvePlacidianCusp(
  localSiderealTime: number,
  latitude: number,
  obliquity: number,
  house: 2 | 3 | 11 | 12,
) {
  const settings = {
    2: { fraction: 2 / 3, direction: -1, opposite: true },
    3: { fraction: 1 / 3, direction: -1, opposite: true },
    11: { fraction: 1 / 3, direction: 1, opposite: false },
    12: { fraction: 2 / 3, direction: 1, opposite: false },
  } as const;
  const { fraction, direction, opposite } = settings[house];
  const latitudeRadians = latitude / degreesPerRadian;
  const obliquityRadians = obliquity / degreesPerRadian;
  const latitudeTangent = Math.tan(latitudeRadians);
  const obliquityTangent = Math.tan(obliquityRadians);
  let meridianDistance = direction * fraction * 90;
  let converged = false;

  for (let iteration = 0; iteration < 64; iteration += 1) {
    const rightAscensionRadians =
      (localSiderealTime + meridianDistance) / degreesPerRadian;
    const semiArcRadians =
      meridianDistance / fraction / degreesPerRadian;
    const residual =
      Math.cos(semiArcRadians) +
      latitudeTangent *
        Math.sin(rightAscensionRadians) *
        obliquityTangent;
    const derivative =
      (-Math.sin(semiArcRadians) / fraction +
        latitudeTangent *
          obliquityTangent *
          Math.cos(rightAscensionRadians)) /
      degreesPerRadian;

    if (!Number.isFinite(derivative) || Math.abs(derivative) < 1e-12) {
      throw new PlacidusCalculationError(
        "Không thể tính nhà Placidus vì phép lặp gặp điểm suy biến.",
      );
    }

    const correction = -residual / derivative;
    meridianDistance += correction;

    if (Math.abs(correction) < 1e-9) {
      converged = true;
      break;
    }
  }

  if (!converged || !Number.isFinite(meridianDistance)) {
    throw new PlacidusCalculationError(
      "Không thể tính nhà Placidus vì phép lặp không hội tụ.",
    );
  }

  const longitude = eclipticLongitudeFromRightAscension(
    localSiderealTime + meridianDistance,
    obliquity,
  );

  return normalizeLongitude(longitude + (opposite ? 180 : 0));
}

function calculateAnglesAndHouses(
  julianDay: number,
  latitude: number,
  longitude: number,
) {
  const utcDaysSinceJ2000 = julianDay - julianDayJ2000;
  const time = MakeTime(utcDaysSinceJ2000);
  const obliquity = e_tilt(time).tobl;
  const localSiderealTime = normalizeLongitude(
    SiderealTime(time) * 15 + longitude,
  );
  const placidusLatitudeLimit = 90 - obliquity;

  if (Math.abs(latitude) >= placidusLatitudeLimit) {
    throw new PlacidusCalculationError(
      `Không thể tính hệ nhà Placidus tại vĩ độ ${latitude.toFixed(4)}°. Hệ này không xác định trong vùng gần vòng cực.`,
    );
  }

  const ascendant = calculateAscendant(
    localSiderealTime,
    latitude,
    obliquity,
  );
  const midheaven = eclipticLongitudeFromRightAscension(
    localSiderealTime,
    obliquity,
  );
  const house2 = solvePlacidianCusp(
    localSiderealTime,
    latitude,
    obliquity,
    2,
  );
  const house3 = solvePlacidianCusp(
    localSiderealTime,
    latitude,
    obliquity,
    3,
  );
  const house11 = solvePlacidianCusp(
    localSiderealTime,
    latitude,
    obliquity,
    11,
  );
  const house12 = solvePlacidianCusp(
    localSiderealTime,
    latitude,
    obliquity,
    12,
  );
  const cuspLongitudes = [
    ascendant,
    house2,
    house3,
    normalizeLongitude(midheaven + 180),
    normalizeLongitude(house11 + 180),
    normalizeLongitude(house12 + 180),
    normalizeLongitude(ascendant + 180),
    normalizeLongitude(house2 + 180),
    normalizeLongitude(house3 + 180),
    midheaven,
    house11,
    house12,
  ];

  return {
    angles: [
      { name: "ASC" as const, longitude: ascendant, ...longitudeToZodiac(ascendant) },
      { name: "MC" as const, longitude: midheaven, ...longitudeToZodiac(midheaven) },
    ],
    houses: cuspLongitudes.map((cuspLongitude, index) => ({
      house: index + 1,
      longitude: cuspLongitude,
      ...longitudeToZodiac(cuspLongitude),
    })),
  };
}

export function calculateMajorAspects(
  bodies: ReadonlyArray<Pick<CelestialBodyPosition, "name" | "longitude">>,
  beforeBodies?: ReadonlyArray<
    Pick<CelestialBodyPosition, "name" | "longitude">
  >,
  afterBodies?: ReadonlyArray<
    Pick<CelestialBodyPosition, "name" | "longitude">
  >,
): MajorAspect[] {
  const aspects: MajorAspect[] = [];

  for (let firstIndex = 0; firstIndex < bodies.length; firstIndex += 1) {
    for (
      let secondIndex = firstIndex + 1;
      secondIndex < bodies.length;
      secondIndex += 1
    ) {
      const first = bodies[firstIndex];
      const second = bodies[secondIndex];
      const actualAngle = shortestAngularDistance(
        first.longitude,
        second.longitude,
      );
      const match = majorAspectConfig.find(
        ({ exactAngle, orb }) => Math.abs(actualAngle - exactAngle) <= orb,
      );

      if (match) {
        const beforeFirst = beforeBodies?.find(
          ({ name }) => name === first.name,
        );
        const beforeSecond = beforeBodies?.find(
          ({ name }) => name === second.name,
        );
        const afterFirst = afterBodies?.find(
          ({ name }) => name === first.name,
        );
        const afterSecond = afterBodies?.find(
          ({ name }) => name === second.name,
        );
        let phase: MajorAspect["phase"] = null;

        if (beforeFirst && beforeSecond && afterFirst && afterSecond) {
          const beforeOrb = Math.abs(
            shortestAngularDistance(
              beforeFirst.longitude,
              beforeSecond.longitude,
            ) - match.exactAngle,
          );
          const afterOrb = Math.abs(
            shortestAngularDistance(
              afterFirst.longitude,
              afterSecond.longitude,
            ) - match.exactAngle,
          );
          const orbChange = afterOrb - beforeOrb;

          if (Math.abs(orbChange) > aspectPhaseMinimumChangeDegrees) {
            phase = orbChange < 0 ? "applying" : "separating";
          }
        }

        aspects.push({
          id: `${first.name}-${second.name}-${match.nameEnglish}`,
          body1: first.name,
          body2: second.name,
          aspect: match.code,
          aspectEnglish: match.nameEnglish,
          aspectVietnamese: match.labelVietnamese,
          exactAngle: match.exactAngle,
          actualAngle,
          orb: Math.abs(actualAngle - match.exactAngle),
          phase,
        });
      }
    }
  }

  return aspects;
}

export function calculateWesternAstrology(
  input: WesternAstrologyInput,
): WesternAstrologyResult {
  if (
    !input.localDateTime.trim() ||
    !input.timeZone.trim() ||
    !Number.isFinite(input.latitude) ||
    input.latitude < -90 ||
    input.latitude > 90 ||
    !Number.isFinite(input.longitude) ||
    input.longitude < -180 ||
    input.longitude > 180
  ) {
    throw new RangeError("Birth data has not been normalized.");
  }

  const date = parseUtcDateTime(input.utcDateTime);
  const julianDay = calculateJulianDay(input.utcDateTime);
  const rawBodies = celestialBodies.map(({ name, body }) => {
    const longitude = apparentGeocentricLongitude(body, date);
    const zodiac = longitudeToZodiac(longitude);

    return {
      name,
      longitude,
      ...zodiac,
      retrograde: isRetrograde(body, date),
    };
  });
  const beforeDate = new Date(
    date.getTime() - aspectPhaseSampleMilliseconds,
  );
  const afterDate = new Date(
    date.getTime() + aspectPhaseSampleMilliseconds,
  );
  const beforeBodies = celestialBodies.map(({ name, body }) => ({
    name,
    longitude: apparentGeocentricLongitude(body, beforeDate),
  }));
  const afterBodies = celestialBodies.map(({ name, body }) => ({
    name,
    longitude: apparentGeocentricLongitude(body, afterDate),
  }));
  const { angles, houses } = calculateAnglesAndHouses(
    julianDay,
    input.latitude,
    input.longitude,
  );
  const bodies = rawBodies.map((body) => {
    const house = findHouseForLongitude(body.longitude, houses);

    if (house === null) {
      throw new PlacidusCalculationError(
        `Không thể xác định nhà cho ${body.name}.`,
      );
    }

    return { ...body, house };
  });

  return {
    system: "Tropical Zodiac",
    houseSystem: "Placidus",
    julianDay,
    bodies,
    angles,
    houses,
    aspects: calculateMajorAspects(bodies, beforeBodies, afterBodies),
  };
}
