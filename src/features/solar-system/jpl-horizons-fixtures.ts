import type { PhysicalVectorAU } from "./ephemeris-provider";
import type { PlanetId } from "./solar-system-data";

export const JPL_HORIZONS_QUERY = {
  endpoint: "https://ssd.jpl.nasa.gov/api/horizons.api",
  responseSignature: "NASA/JPL Horizons API 1.2",
  fixtureGeneratedOn: "2026-08-25",
  makeEphemeris: "YES",
  ephemerisType: "VECTORS",
  objectData: "NO",
  referencePlane: "FRAME",
  referenceSystem: "ICRF",
  referenceFrame: "ICRF / J2000 mean equator (compatible with Astronomy Engine EQJ)",
  outputUnits: "AU-D",
  vectorTable: "1",
  vectorCorrections: "NONE",
  csvFormat: "YES",
  vectorLabels: "NO",
  calendarFormat: "BOTH",
  calendarType: "GREGORIAN",
  timeType: "TDB",
  timeDigits: "FRACSEC",
  timeListType: "JD",
  timeInterpretation:
    "Each JDTDB input is Astronomy Engine's TT Julian date for the exact user UTC timestamp. TT-TDB is below 0.002 seconds and negligible at these tolerances.",
} as const;

export const JPL_VALIDATION_EPOCHS = {
  y1600: { userTimestampUtc: "1600-01-01T00:00:00.000Z", horizonsTdbJulianDate: 2305447.5013920004, horizonsTdbCalendar: "1600-Jan-01 00:02:00.2688", astronomyEngineDeltaTSeconds: 120.26881785425019 },
  y1750: { userTimestampUtc: "1750-01-01T00:00:00.000Z", horizonsTdbJulianDate: 2360234.5001546834, horizonsTdbCalendar: "1750-Jan-01 00:00:13.3646", astronomyEngineDeltaTSeconds: 13.364655069125877 },
  y1850: { userTimestampUtc: "1850-01-01T00:00:00.000Z", horizonsTdbJulianDate: 2396758.5000821985, horizonsTdbCalendar: "1850-Jan-01 00:00:07.1020", astronomyEngineDeltaTSeconds: 7.101970399869515 },
  j2000: { userTimestampUtc: "2000-01-01T12:00:00.000Z", horizonsTdbJulianDate: 2451545.000738971, horizonsTdbCalendar: "2000-Jan-01 12:01:03.8471", astronomyEngineDeltaTSeconds: 63.847089569816944 },
  modern: { userTimestampUtc: "2026-08-25T00:00:00.000Z", horizonsTdbJulianDate: 2461277.500873258, horizonsTdbCalendar: "2026-Aug-25 00:01:15.4495", astronomyEngineDeltaTSeconds: 75.44946252416842 },
  y2100: { userTimestampUtc: "2100-01-01T00:00:00.000Z", horizonsTdbJulianDate: 2488069.5023455042, horizonsTdbCalendar: "2100-Jan-01 00:03:22.6516", astronomyEngineDeltaTSeconds: 202.6515678698711 },
  y2200: { userTimestampUtc: "2200-12-31T00:00:00.000Z", horizonsTdbJulianDate: 2524957.505143679, horizonsTdbCalendar: "2200-Dec-31 00:07:24.4139", astronomyEngineDeltaTSeconds: 444.4138876157896 },
} as const;

type EpochId = keyof typeof JPL_VALIDATION_EPOCHS;
type VectorTuple = readonly [EpochId, number, number, number];
type UnavailableEpoch = Readonly<{ epoch: EpochId; reason: string }>;

export type JplHorizonsFixture = Readonly<{
  body: PlanetId | "moon";
  command: string;
  center: "500@10" | "500@399";
  targetSource: string;
  centerSource: string;
  unavailableEpochs: readonly UnavailableEpoch[];
  vectors: ReadonlyArray<Readonly<{ epoch: EpochId; positionAuEqj: PhysicalVectorAU }>>;
}>;

function fixture(
  body: PlanetId | "moon",
  command: string,
  center: "500@10" | "500@399",
  targetSource: string,
  centerSource: string,
  unavailableEpochs: readonly UnavailableEpoch[],
  vectors: readonly VectorTuple[],
): JplHorizonsFixture {
  return {
    body,
    command,
    center,
    targetSource,
    centerSource,
    unavailableEpochs,
    vectors: vectors.map(([epoch, x, y, z]) => ({
      epoch,
      positionAuEqj: { x, y, z },
    })),
  };
}

export function buildHorizonsFixtureUrl(item: JplHorizonsFixture): string {
  const q = JPL_HORIZONS_QUERY;
  const parameters = new URLSearchParams({
    format: "json",
    COMMAND: `'${item.command}'`, OBJ_DATA: `'${q.objectData}'`,
    MAKE_EPHEM: `'${q.makeEphemeris}'`, EPHEM_TYPE: `'${q.ephemerisType}'`,
    CENTER: `'${item.center}'`, REF_PLANE: `'${q.referencePlane}'`,
    REF_SYSTEM: `'${q.referenceSystem}'`, OUT_UNITS: `'${q.outputUnits}'`,
    VEC_TABLE: `'${q.vectorTable}'`, VEC_CORR: `'${q.vectorCorrections}'`,
    CSV_FORMAT: `'${q.csvFormat}'`, VEC_LABELS: `'${q.vectorLabels}'`,
    CAL_FORMAT: `'${q.calendarFormat}'`, CAL_TYPE: `'${q.calendarType}'`,
    TIME_TYPE: `'${q.timeType}'`, TIME_DIGITS: `'${q.timeDigits}'`,
    TLIST_TYPE: `'${q.timeListType}'`,
    TLIST: item.vectors
      .map(({ epoch }) => `'${JPL_VALIDATION_EPOCHS[epoch].horizonsTdbJulianDate}'`)
      .join(" "),
  });
  return `${q.endpoint}?${parameters.toString()}`;
}

export const JPL_HORIZONS_FIXTURES: readonly JplHorizonsFixture[] = [
  fixture("mercury", "199", "500@10", "DE441", "DE441", [], [
    ["y1600", 2.738032126291357e-1, -2.699809912594102e-1, -1.727394037035365e-1],
    ["y1750", -9.673932537046974e-2, -4.068573767110767e-1, -2.070551035975478e-1],
    ["y1850", 2.568009524988960e-1, -2.890960230624799e-1, -1.810944749677751e-1],
    ["j2000", -1.300778161265107e-1, -4.005973617157444e-1, -2.004928839692914e-1],
    ["modern", -2.594422349978769e-1, 1.801532466464057e-1, 1.231266556369825e-1],
    ["y2100", 2.387832630606794e-1, -3.068013991676415e-1, -1.886298606693317e-1],
    ["y2200", 3.889509823864500e-2, 2.708350817710976e-1, 1.407485499854751e-1],
  ]),
  fixture("venus", "299", "500@10", "DE441", "DE441", [], [
    ["y1600", -2.971353721938119e-1, 5.896449940980607e-1, 2.833804735047240e-1],
    ["y1750", 4.651686969655992e-1, 5.148598942384128e-1, 2.016695471625491e-1],
    ["y1850", -2.766091705993831e-1, -6.181245772096740e-1, -2.602380058480714e-1],
    ["j2000", -7.183017064043915e-1, -4.628791162254458e-2, 2.463445345894834e-2],
    ["modern", 3.062129030434191e-1, -5.948624087948667e-1, -2.870441921650034e-1],
    ["y2100", 6.875147103225603e-1, 2.235699621542467e-1, 5.720122124246915e-2],
    ["y2200", 1.525722120583597e-1, 6.455392375807516e-1, 2.812172843840070e-1],
  ]),
  fixture("earth", "399", "500@10", "DE441", "DE441", [], [
    ["y1600", -2.638886838909225e-1, 8.685896375111724e-1, 3.775010492452662e-1],
    ["y1750", -2.389136837008673e-1, 8.748134051506463e-1, 3.798617273578852e-1],
    ["y1850", -2.109781420872494e-1, 8.809573245431924e-1, 3.822924113543814e-1],
    ["j2000", -1.771478151927471e-1, 8.874263805881267e-1, 3.847419706160081e-1],
    ["modern", 8.880751071530733e-1, -4.430432362107273e-1, -1.920550567327367e-1],
    ["y2100", -1.574476133887849e-1, 8.906601648116849e-1, 3.859105997601288e-1],
    ["y2200", -1.071606653116709e-1, 8.971852193852908e-1, 3.884985340779348e-1],
  ]),
  fixture("mars", "499", "500@10", "mar099", "DE441", [
    { epoch: "y1600", reason: "mar099 starts at 1600-Jan-02 TDB." },
  ], [
    ["y1750", 1.186791913175669, 7.574036749010520e-1, 3.145282745842369e-1],
    ["y1850", -1.410078712025453e-1, 1.432392824872317, 6.607657832321895e-1],
    ["j2000", 1.390716417923238, 1.411425800200809e-3, -3.695549844954050e-2],
    ["modern", 6.074833274830731e-1, 1.263477330149257, 5.631434908454731e-1],
    ["y2100", 6.096269738389685e-1, 1.261211719387046, 5.621971815805828e-1],
    ["y2200", 6.999833994429349e-1, -1.100624327496031, -5.234997120123012e-1],
  ]),
  fixture("jupiter", "599", "500@10", "jup365_merged", "jup365_merged", [
    { epoch: "y1600", reason: "jup365_merged starts at 1600-Jan-11 TDB." },
    { epoch: "y2200", reason: "jup365_merged ends at 2200-Jan-09 TDB." },
  ], [
    ["y1750", 4.914935069273560, 5.827011114425508e-1, 1.295850973898603e-1],
    ["y1850", -5.236953481714433, 1.231540019025743, 6.560078902093331e-1],
    ["j2000", 4.001174059726486, 2.736582775275129, 1.075514090702089],
    ["modern", -3.272073660553556, 3.796637576195276, 1.706990792009705],
    ["y2100", -5.373757569077632, -8.828090226093652e-1, -2.477143676613869e-1],
  ]),
  fixture("saturn", "699", "500@10", "sat441l", "DE441", [
    { epoch: "y1600", reason: "sat441l starts at 1749-Dec-31 TDB." },
  ], [
    ["y1750", -5.270839978112674, -7.891794575801758, -3.029958914505720],
    ["y1850", 9.295727532487597, 1.643752300904677, 2.800700953842234e-1],
    ["j2000", 6.406407256799941, 6.174659151466250, 2.274771949429866],
    ["modern", 9.307058202663171, 1.593197802819248, 2.572482761997602e-1],
    ["y2100", -9.153083786088180, -2.991298376747163, -8.410301914203183e-1],
    ["y2200", 9.192957774880799, -2.758372872691851, -1.538605927979707],
  ]),
  fixture("uranus", "799", "500@10", "ura184_merged", "DE441", [
    { epoch: "y1600", reason: "ura184_merged starts at 1600-Jan-05 TDB." },
  ], [
    ["y1750", 1.627265930578029e1, -1.056141360084843e1, -4.858303298124887],
    ["y1850", 1.770201786697325e1, 8.422546428341889, 3.437552285909691],
    ["j2000", 1.443185725507190e1, -1.250626618189058e1, -5.681690132501651],
    ["modern", 9.061038914187009, 1.580941264137995e1, 6.795822453206057],
    ["y2100", 1.886505508211095e1, 6.095913864013302, 2.403488640315532],
    ["y2200", 2.654054782506387e-1, 1.741805832042759e1, 7.624370792068060],
  ]),
  fixture("neptune", "899", "500@10", "nep098_merged", "nep098_merged", [
    { epoch: "y1600", reason: "nep098_merged starts at 1800-Jan-02 TDB." },
    { epoch: "y1750", reason: "nep098_merged starts at 1800-Jan-02 TDB." },
    { epoch: "y2200", reason: "nep098_merged ends at 2199-Dec-30 TDB." },
  ], [
    ["y1850", 2.744043654322006e1, -1.091093749472233e1, -5.148820117194368],
    ["j2000", 1.681204951160525e1, -2.298009946003843e1, -9.824427678904645],
    ["modern", 2.984368021969158e1, 1.443172167369650, -1.522595248087463e-1],
    ["y2100", -2.905922946530538e1, 7.356664733003597, 3.734685294523204],
  ]),
  fixture("moon", "301", "500@399", "DE441", "DE441", [], [
    ["y1600", -8.911084917274378e-4, 2.176041304778712e-3, 1.014704847126672e-3],
    ["y1750", -2.582339744547244e-3, -5.661461191458110e-4, -5.164690306133478e-4],
    ["y1850", -1.754419513492397e-3, 1.542218564887986e-3, 6.274642166884288e-4],
    ["j2000", -1.949006971179600e-3, -1.783176171073245e-3, -5.088423035328514e-4],
    ["modern", 1.133736477358696e-3, -2.168701215609343e-3, -1.092432943800727e-3],
    ["y2100", -2.270112695505237e-3, 9.070619732057291e-4, 4.445739123409731e-4],
    ["y2200", -2.448738465640088e-3, -9.526870959850062e-4, -3.791717173588738e-4],
  ]),
] as const;
