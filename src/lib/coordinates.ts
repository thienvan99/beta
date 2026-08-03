export type ParsedCoordinates = Readonly<{
  latitude: number;
  longitude: number;
}>;

const decimalCoordinatesPattern =
  /^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*$/;

const dmsCoordinatesPattern =
  /^\s*(\d{1,2})\s*°\s*(\d{1,2}(?:\.\d+)?)\s*['′]\s*(\d{1,2}(?:\.\d+)?)\s*["″]\s*([NS])\s*,?\s*(\d{1,3})\s*°\s*(\d{1,2}(?:\.\d+)?)\s*['′]\s*(\d{1,2}(?:\.\d+)?)\s*["″]\s*([EW])\s*$/iu;

function isWithinRange(value: number, minimum: number, maximum: number) {
  return Number.isFinite(value) && value >= minimum && value <= maximum;
}

function dmsToDecimal(
  degrees: number,
  minutes: number,
  seconds: number,
  maximumDegrees: number,
  isNegative: boolean,
) {
  if (
    !Number.isInteger(degrees) ||
    degrees > maximumDegrees ||
    minutes < 0 ||
    minutes >= 60 ||
    seconds < 0 ||
    seconds >= 60 ||
    (degrees === maximumDegrees && (minutes !== 0 || seconds !== 0))
  ) {
    return null;
  }

  const decimal = degrees + minutes / 60 + seconds / 3600;
  return isNegative ? -decimal : decimal;
}

export function parseCoordinates(input: string): ParsedCoordinates | null {
  const decimalMatch = decimalCoordinatesPattern.exec(input);

  if (decimalMatch) {
    const latitude = Number(decimalMatch[1]);
    const longitude = Number(decimalMatch[2]);

    if (
      isWithinRange(latitude, -90, 90) &&
      isWithinRange(longitude, -180, 180)
    ) {
      return { latitude, longitude };
    }

    return null;
  }

  const dmsMatch = dmsCoordinatesPattern.exec(input);

  if (!dmsMatch) {
    return null;
  }

  const latitude = dmsToDecimal(
    Number(dmsMatch[1]),
    Number(dmsMatch[2]),
    Number(dmsMatch[3]),
    90,
    dmsMatch[4].toUpperCase() === "S",
  );
  const longitude = dmsToDecimal(
    Number(dmsMatch[5]),
    Number(dmsMatch[6]),
    Number(dmsMatch[7]),
    180,
    dmsMatch[8].toUpperCase() === "W",
  );

  if (latitude === null || longitude === null) {
    return null;
  }

  return { latitude, longitude };
}
