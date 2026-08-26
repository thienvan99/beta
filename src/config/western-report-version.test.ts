import { describe, expect, it } from "vitest";
import { westernReportVersionMetadata } from "./western-report-version";

describe("westernReportVersionMetadata", () => {
  it("exposes one deterministic typed version contract for the Western report", () => {
    expect(westernReportVersionMetadata).toEqual({
      calculationVersion: "1.0.0",
      rulesetVersion: "1.0.0",
      interpretationVersion: "1.0.0",
    });
    expect(Object.isFrozen(westernReportVersionMetadata)).toBe(true);
  });
});
