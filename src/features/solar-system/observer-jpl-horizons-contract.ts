import {
  createObservationContext,
  type ObservationContext,
  type ObservationContextInput,
} from "../../lib/observation-context";
import {
  calculateObserverSkyProjection,
  type ObserverSkyBodyName,
} from "./observer-sky-projection";

export const OBSERVER_JPL_HORIZONS_ENDPOINT =
  "https://ssd.jpl.nasa.gov/api/horizons.api";
export const OBSERVER_JPL_EXPECTED_API_SOURCE = "NASA/JPL Horizons API";
export const OBSERVER_JPL_DOCUMENTATION_VERSION = "1.3";
export const OBSERVER_JPL_ACCEPTED_API_VERSION = "1.2";
export const OBSERVER_JPL_TOLERANCE_DEGREES = 0.03;

export const OBSERVER_JPL_TARGETS = [
  { target: "Sun", targetId: "10" },
  { target: "Moon", targetId: "301" },
  { target: "Mercury", targetId: "199" },
  { target: "Venus", targetId: "299" },
  { target: "Mars", targetId: "499" },
  { target: "Jupiter", targetId: "599" },
  { target: "Saturn", targetId: "699" },
  { target: "Uranus", targetId: "799" },
  { target: "Neptune", targetId: "899" },
  { target: "Pluto", targetId: "999" },
] as const satisfies readonly Readonly<{
  target: ObserverSkyBodyName;
  targetId: string;
}>[];

type FrozenContextDefinition = Readonly<{
  contextId: string;
  input: ObservationContextInput;
  instantUtc: string;
}>;

const BASE_CONTEXTS: readonly FrozenContextDefinition[] = [
  {
    contextId: "VN",
    input: {
      birthDate: "1990-01-15",
      hour: "8",
      minute: "30",
      latitude: "10.8231",
      longitude: "106.6297",
      timezone: "Asia/Ho_Chi_Minh",
    },
    instantUtc: "1990-01-15T01:30:00Z",
  },
  {
    contextId: "LON",
    input: {
      birthDate: "2000-01-01",
      hour: "12",
      minute: "0",
      latitude: "51.5074",
      longitude: "-0.1278",
      timezone: "Europe/London",
    },
    instantUtc: "2000-01-01T12:00:00Z",
  },
  {
    contextId: "NYC",
    input: {
      birthDate: "1985-07-23",
      hour: "18",
      minute: "45",
      latitude: "40.7128",
      longitude: "-74.0060",
      timezone: "America/New_York",
    },
    instantUtc: "1985-07-23T22:45:00Z",
  },
  {
    contextId: "SYD",
    input: {
      birthDate: "1992-11-05",
      hour: "14",
      minute: "20",
      latitude: "-33.8688",
      longitude: "151.2093",
      timezone: "Australia/Sydney",
    },
    instantUtc: "1992-11-05T03:20:00Z",
  },
];

const EDGE_CONTEXTS = [
  {
    contextId: "EDGE-EQUATOR-MARS",
    target: "Mars",
    targetId: "499",
    input: {
      birthDate: "2000-03-20",
      hour: "12",
      minute: "0",
      latitude: "0",
      longitude: "0",
      timezone: "Africa/Accra",
    },
    instantUtc: "2000-03-20T12:00:00Z",
  },
  {
    contextId: "EDGE-HIGH-LAT-SATURN",
    target: "Saturn",
    targetId: "699",
    input: {
      birthDate: "2000-01-01",
      hour: "13",
      minute: "0",
      latitude: "69.6492",
      longitude: "18.9553",
      timezone: "Europe/Oslo",
    },
    instantUtc: "2000-01-01T12:00:00Z",
  },
  {
    contextId: "EDGE-MOON-HORIZON",
    target: "Moon",
    targetId: "301",
    input: {
      birthDate: "1990-01-15",
      hour: "21",
      minute: "31",
      latitude: "10.8231",
      longitude: "106.6297",
      timezone: "Asia/Ho_Chi_Minh",
    },
    instantUtc: "1990-01-15T14:31:00Z",
  },
  {
    contextId: "EDGE-SUN-HORIZON",
    target: "Sun",
    targetId: "10",
    input: {
      birthDate: "2000-01-01",
      hour: "8",
      minute: "13",
      latitude: "51.5074",
      longitude: "-0.1278",
      timezone: "Europe/London",
    },
    instantUtc: "2000-01-01T08:13:00Z",
  },
  {
    contextId: "EDGE-AZ-WRAP-MARS",
    target: "Mars",
    targetId: "499",
    input: {
      birthDate: "1985-07-23",
      hour: "0",
      minute: "57",
      latitude: "40.7128",
      longitude: "-74.0060",
      timezone: "America/New_York",
    },
    instantUtc: "1985-07-23T04:57:00Z",
  },
] as const satisfies readonly Readonly<{
  contextId: string;
  target: ObserverSkyBodyName;
  targetId: string;
  input: ObservationContextInput;
  instantUtc: string;
}>[];

export type FrozenObserverJplSample = Readonly<{
  sampleId: string;
  contextId: string;
  target: ObserverSkyBodyName;
  targetId: string;
  input: ObservationContextInput;
  context: ObservationContext;
}>;

function buildSample(
  definition: FrozenContextDefinition,
  target: ObserverSkyBodyName,
  targetId: string,
  sampleId: string,
): FrozenObserverJplSample {
  const context = createObservationContext(definition.input);
  if (!context) {
    throw new Error(`${sampleId}: createObservationContext returned null.`);
  }
  if (context.instantUtc !== definition.instantUtc) {
    throw new Error(
      `${sampleId}: expected ${definition.instantUtc}, received ${context.instantUtc}.`,
    );
  }

  return {
    sampleId,
    contextId: definition.contextId,
    target,
    targetId,
    input: definition.input,
    context,
  };
}

export function buildFrozenObserverJplSamples(): readonly FrozenObserverJplSample[] {
  const samples: FrozenObserverJplSample[] = [];

  for (const definition of BASE_CONTEXTS) {
    for (const target of OBSERVER_JPL_TARGETS) {
      samples.push(
        buildSample(
          definition,
          target.target,
          target.targetId,
          `${definition.contextId}-${target.target}`,
        ),
      );
    }
  }

  for (const edge of EDGE_CONTEXTS) {
    samples.push(buildSample(edge, edge.target, edge.targetId, edge.contextId));
  }

  if (samples.length !== 45 || new Set(samples.map(({ sampleId }) => sampleId)).size !== 45) {
    throw new Error(`Frozen Observer corpus must contain 45 unique samples.`);
  }

  return samples;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export function toHorizonsCalendarTime(instantUtc: string): string {
  const match =
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z$/.exec(instantUtc);
  if (!match) {
    throw new Error(`Unsupported frozen UTC instant: ${instantUtc}`);
  }
  const month = MONTHS[Number(match[2]) - 1];
  if (!month) {
    throw new Error(`Invalid month in frozen UTC instant: ${instantUtc}`);
  }
  return `${match[1]}-${month}-${match[3]} ${match[4]}:${match[5]}:${match[6]}`;
}

export type HorizonsLogicalParameters = Readonly<Record<string, string>>;

export function buildObserverHorizonsRequest(sample: FrozenObserverJplSample): Readonly<{
  parameters: HorizonsLogicalParameters;
  url: string;
}> {
  const parameters: HorizonsLogicalParameters = {
    format: "json",
    COMMAND: sample.targetId,
    OBJ_DATA: "NO",
    MAKE_EPHEM: "YES",
    EPHEM_TYPE: "OBSERVER",
    CENTER: "coord@399",
    COORD_TYPE: "GEODETIC",
    SITE_COORD: `${sample.context.longitude},${sample.context.latitude},0`,
    TIME_TYPE: "UT",
    TIME_ZONE: "+00:00",
    TLIST: toHorizonsCalendarTime(sample.context.instantUtc),
    TLIST_TYPE: "CAL",
    TIME_DIGITS: "SECONDS",
    CAL_FORMAT: "CAL",
    CAL_TYPE: "GREGORIAN",
    QUANTITIES: "4",
    APPARENT: "AIRLESS",
    ANG_FORMAT: "DEG",
    EXTRA_PREC: "YES",
    REF_SYSTEM: "ICRF",
    ELEV_CUT: "-90",
    SKIP_DAYLT: "NO",
    AIRMASS: "38.0",
    SOLAR_ELONG: "0,180",
    LHA_CUTOFF: "0.0",
    ANG_RATE_CUTOFF: "0.0",
    R_T_S_ONLY: "NO",
    CSV_FORMAT: "YES",
  };
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(parameters)) {
    search.set(key, key === "format" ? value : `'${value}'`);
  }
  return {
    parameters,
    url: `${OBSERVER_JPL_HORIZONS_ENDPOINT}?${search.toString()}`,
  };
}

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requiredLine(result: string, pattern: RegExp, label: string): string {
  const line = result.split(/\r?\n/).find((candidate) => pattern.test(candidate));
  if (!line) {
    throw new Error(`Horizons response is missing ${label}.`);
  }
  return line.trim();
}

function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"') {
      if (quoted && line[index + 1] === '"') {
        field += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === "," && !quoted) {
      fields.push(field.trim());
      field = "";
    } else {
      field += character;
    }
  }
  if (quoted) {
    throw new Error(`Horizons CSV row has an unterminated quoted field.`);
  }
  fields.push(field.trim());
  return fields;
}

function longitudeDifference(left: number, right: number): number {
  return Math.abs(((left - right + 540) % 360) - 180);
}

function parseFinite(value: string, label: string): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    throw new Error(`Horizons ${label} is not finite: ${value}`);
  }
  return parsed;
}

export type ParsedObserverHorizonsResponse = Readonly<{
  apiSignature: Readonly<{ source: string; version: string }>;
  result: string;
  header: Readonly<{
    targetLine: string;
    centerBodyLine: string;
    centerSiteLine: string;
    centerGeodeticLine: string;
    centerPoleEquatorLine: string;
    atmosphereRefractionLine: string;
    timeFormatLine: string;
    calendarModeLine: string;
    eopFileLine: string;
    eopCoverageLine: string;
    dateHeaderLine: string;
    quantityHeaderLine: string;
    reportedLongitude: number;
    reportedLatitude: number;
    reportedAltitudeKm: number;
    reportedTimeScale: "UT";
  }>;
  rawDataRow: string;
  jplAzimuth: number;
  jplAltitude: number;
}>;

export function parseObserverHorizonsResponse(
  rawResponse: unknown,
  sample: FrozenObserverJplSample,
): ParsedObserverHorizonsResponse {
  if (!isRecord(rawResponse)) {
    throw new Error(`Horizons payload is not a JSON object.`);
  }
  if (Object.prototype.hasOwnProperty.call(rawResponse, "error")) {
    throw new Error(`Horizons payload contains an error field.`);
  }
  if (!isRecord(rawResponse.signature)) {
    throw new Error(`Horizons payload is missing signature.`);
  }
  const source = rawResponse.signature.source;
  const version = rawResponse.signature.version;
  if (source !== OBSERVER_JPL_EXPECTED_API_SOURCE) {
    throw new Error(`Horizons API source drift: ${String(source)}`);
  }
  if (version !== OBSERVER_JPL_ACCEPTED_API_VERSION) {
    throw new Error(
      `Horizons API version drift: accepted ${OBSERVER_JPL_ACCEPTED_API_VERSION}, received ${String(version)}.`,
    );
  }
  if (typeof rawResponse.result !== "string") {
    throw new Error(`Horizons payload is missing textual result.`);
  }

  const result = rawResponse.result;
  const targetLine = requiredLine(result, /^\s*Target body name:/, "target header");
  const targetMatch = /Target body name:\s*.*?\((\d+)\)/.exec(targetLine);
  if (!targetMatch || targetMatch[1] !== sample.targetId) {
    throw new Error(`${sample.sampleId}: Horizons target ID mismatch in ${targetLine}`);
  }
  const centerBodyLine = requiredLine(
    result,
    /^\s*Center body name:/,
    "center-body header",
  );
  if (!/Center body name:\s*Earth\s*\(399\)/i.test(centerBodyLine)) {
    throw new Error(`${sample.sampleId}: Horizons center is not Earth 399.`);
  }
  const centerSiteLine = requiredLine(
    result,
    /^\s*Center-site name:/,
    "center-site header",
  );
  if (/GEOCENTRIC/i.test(centerSiteLine)) {
    throw new Error(`${sample.sampleId}: Horizons returned a geocentric site.`);
  }
  const centerGeodeticLine = requiredLine(
    result,
    /^\s*Center geodetic\s*:/,
    "center-geodetic header",
  );
  const siteMatch =
    /Center geodetic\s*:\s*([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[Ee][+-]?\d+)?),\s*([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[Ee][+-]?\d+)?),\s*([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[Ee][+-]?\d+)?)/i.exec(
      centerGeodeticLine,
    );
  if (!siteMatch) {
    throw new Error(`${sample.sampleId}: cannot parse Horizons geodetic site.`);
  }
  const reportedLongitude = parseFinite(siteMatch[1], "longitude");
  const reportedLatitude = parseFinite(siteMatch[2], "latitude");
  const reportedAltitudeKm = parseFinite(siteMatch[3], "altitude");
  if (
    longitudeDifference(reportedLongitude, sample.context.longitude) > 0.0001 ||
    Math.abs(reportedLatitude - sample.context.latitude) > 0.0001 ||
    Math.abs(reportedAltitudeKm) > 0.0001
  ) {
    throw new Error(`${sample.sampleId}: Horizons geodetic site does not match request.`);
  }

  const atmosphereRefractionLine = requiredLine(
    result,
    /^\s*Atmos refraction:/,
    "atmospheric-refraction header",
  );
  if (!/NO\s*\(AIRLESS\)/i.test(atmosphereRefractionLine)) {
    throw new Error(`${sample.sampleId}: Horizons response is not AIRLESS.`);
  }
  const timeFormatLine = requiredLine(result, /^\s*Time format\s*:/, "time-format header");
  if (!/:\s*CAL\b/i.test(timeFormatLine)) {
    throw new Error(`${sample.sampleId}: Horizons response is not calendar time.`);
  }
  const calendarModeLine = requiredLine(
    result,
    /^\s*Calendar mode\s*:/,
    "calendar-mode header",
  );
  if (!/Gregorian/i.test(calendarModeLine)) {
    throw new Error(`${sample.sampleId}: Horizons response is not Gregorian.`);
  }
  const centerPoleEquatorLine = requiredLine(
    result,
    /^\s*Center pole\/equ\s*:/,
    "Earth-orientation header",
  );
  const eopFileLine = requiredLine(result, /^\s*EOP file\s*:/, "EOP file header");
  const eopCoverageLine = requiredLine(
    result,
    /^\s*EOP coverage\s*:/,
    "EOP coverage header",
  );

  const lines = result.split(/\r?\n/);
  const startMarker = lines.findIndex((line) => line.trim() === "$$SOE");
  const endMarker = lines.findIndex((line) => line.trim() === "$$EOE");
  if (startMarker < 0 || endMarker <= startMarker) {
    throw new Error(`${sample.sampleId}: Horizons data markers are missing or invalid.`);
  }
  const dataRows = lines.slice(startMarker + 1, endMarker).filter((line) => line.trim());
  if (dataRows.length !== 1) {
    throw new Error(`${sample.sampleId}: expected one Horizons row, got ${dataRows.length}.`);
  }
  const dateHeaderLine = [...lines.slice(0, startMarker)]
    .reverse()
    .find((line) => /Date__\(UT\)/i.test(line));
  if (!dateHeaderLine) {
    throw new Error(`${sample.sampleId}: Horizons result lacks a UT date header.`);
  }
  const quantityHeaderLine = [...lines.slice(0, startMarker)]
    .reverse()
    .find((line) => /Azi/i.test(line) && /Elev/i.test(line));
  if (!quantityHeaderLine || !/a-app/i.test(quantityHeaderLine)) {
    throw new Error(`${sample.sampleId}: Horizons result lacks airless AZ/EL columns.`);
  }

  const rawDataRow = dataRows[0].trim();
  const fields = parseCsvLine(rawDataRow);
  const timestampField = fields.find((field) => /\d{4}-[A-Za-z]{3}-\d{2}/.test(field));
  const timestampMatch = timestampField
    ? /(?:A\.D\.\s*)?(\d{4}-[A-Za-z]{3}-\d{2}\s+\d{2}:\d{2}:\d{2})(?:\.\d+)?/.exec(
        timestampField,
      )
    : null;
  const expectedCalendarTime = toHorizonsCalendarTime(sample.context.instantUtc);
  if (!timestampMatch || timestampMatch[1] !== expectedCalendarTime) {
    throw new Error(
      `${sample.sampleId}: Horizons row time does not match ${expectedCalendarTime}.`,
    );
  }
  const numericFields = fields
    .slice(fields.indexOf(timestampField!) + 1)
    .filter((field) => /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[Ee][+-]?\d+)?$/.test(field));
  if (numericFields.length !== 2) {
    throw new Error(
      `${sample.sampleId}: expected exactly two numeric AZ/EL fields, got ${numericFields.length}.`,
    );
  }
  const jplAzimuth = parseFinite(numericFields[0], "azimuth");
  const jplAltitude = parseFinite(numericFields[1], "altitude");
  if (jplAzimuth < 0 || jplAzimuth >= 360 || jplAltitude < -90 || jplAltitude > 90) {
    throw new Error(`${sample.sampleId}: Horizons AZ/EL is outside valid range.`);
  }

  return {
    apiSignature: { source, version },
    result,
    header: {
      targetLine,
      centerBodyLine,
      centerSiteLine,
      centerGeodeticLine,
      centerPoleEquatorLine,
      atmosphereRefractionLine,
      timeFormatLine,
      calendarModeLine,
      eopFileLine,
      eopCoverageLine,
      dateHeaderLine: dateHeaderLine.trim(),
      quantityHeaderLine: quantityHeaderLine.trim(),
      reportedLongitude,
      reportedLatitude,
      reportedAltitudeKm,
      reportedTimeScale: "UT",
    },
    rawDataRow,
    jplAzimuth,
    jplAltitude,
  };
}

export type ObserverJplComparison = Readonly<{
  sampleId: string;
  contextId: string;
  target: ObserverSkyBodyName;
  targetId: string;
  observer: Readonly<{ latitude: number; longitude: number; elevationMeters: 0 }>;
  instantUtc: string;
  jplAzimuth: number;
  jplAltitude: number;
  productionAzimuth: number;
  productionAltitude: number;
  productionAboveHorizon: boolean;
  directionSeparationDegrees: number;
  azimuthDifferenceDegrees: number;
  altitudeDifferenceDegrees: number;
  horizonSignMismatch: boolean;
  horizonBoundaryException: boolean;
  horizonRegressionFlag: boolean;
  toleranceDegrees: 0.03;
  passed: boolean;
}>;

function toLocalUnit(azimuthDegrees: number, altitudeDegrees: number) {
  const azimuth = azimuthDegrees * (Math.PI / 180);
  const altitude = altitudeDegrees * (Math.PI / 180);
  const cosAltitude = Math.cos(altitude);
  return {
    x: cosAltitude * Math.cos(azimuth),
    y: cosAltitude * Math.sin(azimuth),
    z: Math.sin(altitude),
  };
}

export function calculateAngularDirectionSeparationDegrees(
  leftAzimuthDegrees: number,
  leftAltitudeDegrees: number,
  rightAzimuthDegrees: number,
  rightAltitudeDegrees: number,
): number {
  const left = toLocalUnit(leftAzimuthDegrees, leftAltitudeDegrees);
  const right = toLocalUnit(rightAzimuthDegrees, rightAltitudeDegrees);
  const dot = left.x * right.x + left.y * right.y + left.z * right.z;
  return Math.acos(Math.max(-1, Math.min(1, dot))) * (180 / Math.PI);
}

export function compareObserverSample(
  sample: FrozenObserverJplSample,
  oracle: Pick<ParsedObserverHorizonsResponse, "jplAzimuth" | "jplAltitude">,
): ObserverJplComparison {
  const productionResult = calculateObserverSkyProjection(sample.context);
  if (!productionResult.ok) {
    throw new Error(
      `${sample.sampleId}: production projection failed: ${productionResult.reason}.`,
    );
  }
  const production = productionResult.projection.bodies.find(
    ({ body }) => body === sample.target,
  );
  if (!production) {
    throw new Error(`${sample.sampleId}: production projection lacks ${sample.target}.`);
  }
  const directionSeparationDegrees = calculateAngularDirectionSeparationDegrees(
    production.azimuthDegrees,
    production.altitudeDegrees,
    oracle.jplAzimuth,
    oracle.jplAltitude,
  );
  const azimuthDifferenceDegrees = Math.abs(
    ((production.azimuthDegrees - oracle.jplAzimuth + 540) % 360) - 180,
  );
  const altitudeDifferenceDegrees = Math.abs(
    production.altitudeDegrees - oracle.jplAltitude,
  );
  const horizonSignMismatch =
    production.aboveHorizon !== (oracle.jplAltitude >= 0);
  const horizonBoundaryException =
    horizonSignMismatch &&
    Math.abs(oracle.jplAltitude) <= OBSERVER_JPL_TOLERANCE_DEGREES;
  const horizonRegressionFlag = horizonSignMismatch && !horizonBoundaryException;

  return {
    sampleId: sample.sampleId,
    contextId: sample.contextId,
    target: sample.target,
    targetId: sample.targetId,
    observer: {
      latitude: sample.context.latitude,
      longitude: sample.context.longitude,
      elevationMeters: sample.context.elevationMeters,
    },
    instantUtc: sample.context.instantUtc,
    jplAzimuth: oracle.jplAzimuth,
    jplAltitude: oracle.jplAltitude,
    productionAzimuth: production.azimuthDegrees,
    productionAltitude: production.altitudeDegrees,
    productionAboveHorizon: production.aboveHorizon,
    directionSeparationDegrees,
    azimuthDifferenceDegrees,
    altitudeDifferenceDegrees,
    horizonSignMismatch,
    horizonBoundaryException,
    horizonRegressionFlag,
    toleranceDegrees: OBSERVER_JPL_TOLERANCE_DEGREES,
    passed: directionSeparationDegrees <= OBSERVER_JPL_TOLERANCE_DEGREES,
  };
}

function maximumBy(
  comparisons: readonly ObserverJplComparison[],
  select: (comparison: ObserverJplComparison) => number,
): ObserverJplComparison {
  if (comparisons.length === 0) {
    throw new Error(`Cannot aggregate an empty Observer comparison corpus.`);
  }
  return comparisons.reduce((maximum, candidate) =>
    select(candidate) > select(maximum) ? candidate : maximum,
  );
}

export function aggregateObserverComparisons(
  comparisons: readonly ObserverJplComparison[],
) {
  const maximumDirection = maximumBy(
    comparisons,
    ({ directionSeparationDegrees }) => directionSeparationDegrees,
  );
  const maximumAzimuth = maximumBy(
    comparisons,
    ({ azimuthDifferenceDegrees }) => azimuthDifferenceDegrees,
  );
  const maximumAltitude = maximumBy(
    comparisons,
    ({ altitudeDifferenceDegrees }) => altitudeDifferenceDegrees,
  );
  const failed = comparisons.filter(
    ({ passed, horizonRegressionFlag }) => !passed || horizonRegressionFlag,
  );

  return {
    samplesAttempted: comparisons.length,
    samplesWithValidOracleResponses: comparisons.length,
    samplesPassed: comparisons.length - failed.length,
    samplesFailed: failed.length,
    toleranceDegrees: OBSERVER_JPL_TOLERANCE_DEGREES,
    maximumDirectionSeparationDegrees: maximumDirection.directionSeparationDegrees,
    maximumDirectionSampleId: maximumDirection.sampleId,
    maximumAzimuthDifferenceDegrees: maximumAzimuth.azimuthDifferenceDegrees,
    maximumAzimuthSampleId: maximumAzimuth.sampleId,
    maximumAltitudeDifferenceDegrees: maximumAltitude.altitudeDifferenceDegrees,
    maximumAltitudeSampleId: maximumAltitude.sampleId,
    horizonRegressionFlags: comparisons.filter(
      ({ horizonRegressionFlag }) => horizonRegressionFlag,
    ).length,
    passed: failed.length === 0 && comparisons.length === 45,
  } as const;
}
