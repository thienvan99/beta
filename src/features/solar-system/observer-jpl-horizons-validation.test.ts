import { describe, expect, it } from "vitest";
import rawFixture from "./fixtures/observer-jpl-horizons-raw.json";
import resultFixture from "./fixtures/observer-jpl-horizons-results.json";
import {
  OBSERVER_JPL_ACCEPTED_API_VERSION,
  OBSERVER_JPL_DOCUMENTATION_VERSION,
  OBSERVER_JPL_EXPECTED_API_SOURCE,
  OBSERVER_JPL_TOLERANCE_DEGREES,
  aggregateObserverComparisons,
  buildFrozenObserverJplSamples,
  buildObserverHorizonsRequest,
  compareObserverSample,
  parseObserverHorizonsResponse,
} from "./observer-jpl-horizons-contract";

describe("static Observer JPL Horizons validation fixtures", () => {
  it("preserves the complete frozen corpus, raw evidence, and acquisition provenance", () => {
    const samples = buildFrozenObserverJplSamples();

    expect(rawFixture.schemaVersion).toBe("observer-jpl-horizons-raw-v1");
    expect(rawFixture.documentationVersion).toBe(OBSERVER_JPL_DOCUMENTATION_VERSION);
    expect(rawFixture.acceptedApiVersion).toBe(OBSERVER_JPL_ACCEPTED_API_VERSION);
    expect(rawFixture.requestPolicy).toEqual({
      corpusSamples: 45,
      reusedRequests: 1,
      intendedRequests: 44,
      actualRequests: 44,
      strictlySequential: true,
      concurrency: 1,
      automaticRetries: 0,
      interRequestDelayMilliseconds: 250,
    });
    expect(rawFixture.requests).toHaveLength(45);
    expect(new Set(rawFixture.requests.map(({ sampleId }) => sampleId)).size).toBe(45);
    expect(rawFixture.requests[0]).toMatchObject({
      sampleId: "VN-Sun",
      acquisitionStatus: "reused",
      reuseProvenance: {
        artifact:
          "src/features/solar-system/fixtures/observer-jpl-horizons-acquisition-failure.json",
        originalRequestNumber: 1,
      },
    });
    expect(
      rawFixture.requests.slice(1).every(
        ({ acquisitionStatus, reuseProvenance }) =>
          acquisitionStatus === "acquired" && reuseProvenance === null,
      ),
    ).toBe(true);

    for (const [index, sample] of samples.entries()) {
      const stored = rawFixture.requests[index];
      const request = buildObserverHorizonsRequest(sample);
      expect(stored.sampleId).toBe(sample.sampleId);
      expect(stored.target).toBe(sample.target);
      expect(stored.targetId).toBe(sample.targetId);
      expect(stored.localInput).toEqual(sample.input);
      expect(stored.instantUtc).toBe(sample.context.instantUtc);
      expect(stored.parameters).toEqual(request.parameters);
      expect(stored.url).toBe(request.url);
      expect(stored.httpStatus).toBe(200);
      expect(stored.apiSignature).toEqual({
        source: OBSERVER_JPL_EXPECTED_API_SOURCE,
        version: OBSERVER_JPL_ACCEPTED_API_VERSION,
      });
      expect(Number.isNaN(Date.parse(stored.retrievalUtc))).toBe(false);

      const parsed = parseObserverHorizonsResponse(stored.rawResponse, sample);
      expect(parsed.jplAzimuth).toBe(stored.jplAzimuth);
      expect(parsed.jplAltitude).toBe(stored.jplAltitude);
      expect(parsed.rawDataRow).toBe(stored.rawAzElRow);
      expect(parsed.header).toEqual(stored.headerMetadata);

      const comparison = compareObserverSample(sample, parsed);
      expect(comparison).toEqual(stored.comparison);
      expect(comparison).toEqual(resultFixture.comparisons[index]);
    }
  });

  it("recomputes the frozen 45/45 PASS aggregate without network access", () => {
    const samples = buildFrozenObserverJplSamples();
    const comparisons = samples.map((sample, index) => {
      const parsed = parseObserverHorizonsResponse(
        rawFixture.requests[index].rawResponse,
        sample,
      );
      return compareObserverSample(sample, parsed);
    });
    const aggregate = aggregateObserverComparisons(comparisons);

    expect(resultFixture.apiSignature).toEqual({
      source: OBSERVER_JPL_EXPECTED_API_SOURCE,
      version: OBSERVER_JPL_ACCEPTED_API_VERSION,
    });
    expect(resultFixture.toleranceDegrees).toBe(OBSERVER_JPL_TOLERANCE_DEGREES);
    expect(aggregate).toEqual(resultFixture.aggregate);
    expect(aggregate).toMatchObject({
      samplesAttempted: 45,
      samplesWithValidOracleResponses: 45,
      samplesPassed: 45,
      samplesFailed: 0,
      maximumDirectionSampleId: "NYC-Saturn",
      horizonRegressionFlags: 0,
      passed: true,
    });
    expect(aggregate.maximumDirectionSeparationDegrees).toBeLessThanOrEqual(
      OBSERVER_JPL_TOLERANCE_DEGREES,
    );
  });
});
