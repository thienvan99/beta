import { describe, expect, it } from "vitest";
import acquisitionFailure from "./fixtures/observer-jpl-horizons-acquisition-failure.json";
import {
  OBSERVER_JPL_ACCEPTED_API_VERSION,
  OBSERVER_JPL_DOCUMENTATION_VERSION,
  OBSERVER_JPL_TOLERANCE_DEGREES,
  buildFrozenObserverJplSamples,
  buildObserverHorizonsRequest,
  calculateAngularDirectionSeparationDegrees,
  compareObserverSample,
  parseObserverHorizonsResponse,
} from "./observer-jpl-horizons-contract";

describe("frozen Observer JPL Horizons contract", () => {
  it("rebuilds the exact 45-sample corpus from canonical birth-time inputs", () => {
    const samples = buildFrozenObserverJplSamples();

    expect(samples).toHaveLength(45);
    expect(new Set(samples.map(({ sampleId }) => sampleId)).size).toBe(45);
    expect(samples.slice(0, 40).every(({ sampleId }) => !sampleId.startsWith("EDGE-"))).toBe(
      true,
    );
    expect(samples.slice(40).map(({ sampleId }) => sampleId)).toEqual([
      "EDGE-EQUATOR-MARS",
      "EDGE-HIGH-LAT-SATURN",
      "EDGE-MOON-HORIZON",
      "EDGE-SUN-HORIZON",
      "EDGE-AZ-WRAP-MARS",
    ]);
    expect(
      samples.every(
        ({ context }) =>
          context.timezone.provenance === "birth-time-pipeline" &&
          context.instantUtc.endsWith(":00Z") &&
          Date.parse(context.instantUtc) === context.timestampUtcMs,
      ),
    ).toBe(true);
    expect(OBSERVER_JPL_TOLERANCE_DEGREES).toBe(0.03);
  });

  it("serializes only the frozen Observer quantity-4 request parameters", () => {
    const allowedKeys = [
      "format",
      "COMMAND",
      "OBJ_DATA",
      "MAKE_EPHEM",
      "EPHEM_TYPE",
      "CENTER",
      "COORD_TYPE",
      "SITE_COORD",
      "TIME_TYPE",
      "TIME_ZONE",
      "TLIST",
      "TLIST_TYPE",
      "TIME_DIGITS",
      "CAL_FORMAT",
      "CAL_TYPE",
      "QUANTITIES",
      "APPARENT",
      "ANG_FORMAT",
      "EXTRA_PREC",
      "REF_SYSTEM",
      "ELEV_CUT",
      "SKIP_DAYLT",
      "AIRMASS",
      "SOLAR_ELONG",
      "LHA_CUTOFF",
      "ANG_RATE_CUTOFF",
      "R_T_S_ONLY",
      "CSV_FORMAT",
    ];

    for (const sample of buildFrozenObserverJplSamples()) {
      const request = buildObserverHorizonsRequest(sample);
      expect(Object.keys(request.parameters)).toEqual(allowedKeys);
      expect(request.parameters).toMatchObject({
        format: "json",
        COMMAND: sample.targetId,
        EPHEM_TYPE: "OBSERVER",
        CENTER: "coord@399",
        COORD_TYPE: "GEODETIC",
        SITE_COORD: `${sample.context.longitude},${sample.context.latitude},0`,
        TIME_TYPE: "UT",
        TIME_ZONE: "+00:00",
        TLIST_TYPE: "CAL",
        QUANTITIES: "4",
        APPARENT: "AIRLESS",
        REF_SYSTEM: "ICRF",
        CSV_FORMAT: "YES",
      });
      expect(request.parameters).not.toHaveProperty("START_TIME");
      expect(request.parameters).not.toHaveProperty("STOP_TIME");
      expect(request.parameters).not.toHaveProperty("STEP_SIZE");
      expect(new URL(request.url).searchParams.get("COMMAND")).toBe(
        `'${sample.targetId}'`,
      );
    }
  });

  it("keeps documentation 1.3 separate from exact accepted live signature 1.2", () => {
    expect(acquisitionFailure.requestPolicy).toMatchObject({
      intendedRequests: 45,
      actualRequests: 1,
      strictlySequential: true,
      concurrency: 1,
      automaticRetries: 0,
    });
    expect(acquisitionFailure.failure.sampleId).toBe("VN-Sun");
    expect(acquisitionFailure.failure.httpStatus).toBe(200);
    expect(acquisitionFailure.failure.rawResponse.signature).toEqual({
      source: "NASA/JPL Horizons API",
      version: "1.2",
    });
    expect(OBSERVER_JPL_DOCUMENTATION_VERSION).toBe("1.3");
    expect(OBSERVER_JPL_ACCEPTED_API_VERSION).toBe("1.2");

    const sample = buildFrozenObserverJplSamples()[0];
    const request = buildObserverHorizonsRequest(sample);
    expect(acquisitionFailure.failure.parameters).toEqual(request.parameters);
    expect(acquisitionFailure.failure.url).toBe(request.url);
    expect(
      parseObserverHorizonsResponse(
        acquisitionFailure.failure.rawResponse,
        sample,
      ).apiSignature,
    ).toEqual({ source: "NASA/JPL Horizons API", version: "1.2" });

    for (const unacceptedVersion of ["1.1", "1.3", "2.0"]) {
      expect(() =>
        parseObserverHorizonsResponse(
          {
            ...acquisitionFailure.failure.rawResponse,
            signature: {
              source: "NASA/JPL Horizons API",
              version: unacceptedVersion,
            },
          },
          sample,
        ),
      ).toThrow(
        `Horizons API version drift: accepted 1.2, received ${unacceptedVersion}.`,
      );
    }
  });

  it("passes every frozen semantic/header gate for the stored VN-Sun response", () => {
    const sample = buildFrozenObserverJplSamples()[0];
    const parsed = parseObserverHorizonsResponse(
      acquisitionFailure.failure.rawResponse,
      sample,
    );

    expect(acquisitionFailure.failure.rawResponse).not.toHaveProperty("error");
    expect(typeof acquisitionFailure.failure.rawResponse.result).toBe("string");
    expect(parsed.header).toMatchObject({
      targetLine: expect.stringContaining("Sun (10)"),
      centerBodyLine: expect.stringContaining("Earth (399)"),
      centerSiteLine: expect.stringContaining("user defined site"),
      centerGeodeticLine: expect.stringContaining("106.6297, 10.8231"),
      atmosphereRefractionLine: "Atmos refraction: NO (AIRLESS)",
      calendarModeLine: "Calendar mode   : Gregorian",
      reportedLongitude: 106.6297,
      reportedLatitude: 10.8231,
      reportedTimeScale: "UT",
    });
    expect(parsed.header.reportedAltitudeKm).toBeCloseTo(0, 11);
    expect(parsed.header.dateHeaderLine).toContain("Date__(UT)");
    expect(parsed.header.quantityHeaderLine).toContain("Azimuth_(a-app)");
    expect(parsed.header.quantityHeaderLine).toContain("Elevation_(a-app)");
    const resultLines = acquisitionFailure.failure.rawResponse.result.split(/\r?\n/);
    const startMarker = resultLines.findIndex((line) => line.trim() === "$$SOE");
    const endMarker = resultLines.findIndex((line) => line.trim() === "$$EOE");
    expect(startMarker).toBeGreaterThanOrEqual(0);
    expect(endMarker).toBeGreaterThan(startMarker);
    expect(
      resultLines
        .slice(startMarker + 1, endMarker)
        .filter((line) => line.trim().length > 0),
    ).toHaveLength(1);
    expect(parsed.rawDataRow).toContain("1990-Jan-15 01:30:00.000");
    expect(parsed.jplAzimuth).toBe(121.654852045);
    expect(parsed.jplAltitude).toBe(28.744945291);
    expect(Number.isFinite(parsed.jplAzimuth)).toBe(true);
    expect(Number.isFinite(parsed.jplAltitude)).toBe(true);
    expect(parsed.jplAzimuth).toBeGreaterThanOrEqual(0);
    expect(parsed.jplAzimuth).toBeLessThan(360);
    expect(parsed.jplAltitude).toBeGreaterThanOrEqual(-90);
    expect(parsed.jplAltitude).toBeLessThanOrEqual(90);
  });

  it("uses the production projection and primary unit-vector metric", () => {
    const sample = buildFrozenObserverJplSamples()[0];
    const parsed = parseObserverHorizonsResponse(
      acquisitionFailure.failure.rawResponse,
      sample,
    );
    const comparison = compareObserverSample(sample, parsed);

    expect(comparison.sampleId).toBe("VN-Sun");
    expect(comparison.jplAzimuth).toBe(121.654852045);
    expect(comparison.jplAltitude).toBe(28.744945291);
    expect(comparison.directionSeparationDegrees).toBeLessThanOrEqual(
      OBSERVER_JPL_TOLERANCE_DEGREES,
    );
    expect(comparison.passed).toBe(true);
  });

  it("handles North wrap with the clamped unit-vector direction metric", () => {
    const separation = calculateAngularDirectionSeparationDegrees(
      359.99,
      0,
      0.01,
      0,
    );

    expect(separation).toBeCloseTo(0.02, 8);
    expect(calculateAngularDirectionSeparationDegrees(0, 90, 180, 90)).toBe(0);
  });
});
