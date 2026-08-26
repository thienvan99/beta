import { describe, expect, it } from "vitest";
import { calculateWesternAstrology } from "./western-astrology";
import { synthesizeWesternCoreReport } from "./western-core-report-synthesis";

function calculationFixture() {
  return calculateWesternAstrology({
    localDateTime: "1990-01-15T08:30:00",
    utcDateTime: "1990-01-15T01:30:00Z",
    latitude: 10.8231,
    longitude: 106.6297,
    timeZone: "Asia/Ho_Chi_Minh",
  });
}

describe("synthesizeWesternCoreReport", () => {
  it("runs the production core pipeline into typed domain and main-theme outputs", () => {
    const calculation = calculationFixture();
    const report = synthesizeWesternCoreReport(calculation);

    expect(report.policyId).toBe("western-core-candidate-projection-v1");
    expect(report.version).toBe("1.0.0");
    expect(report.calculation).toBe(calculation);
    expect(report.matchedCore.positions).toHaveLength(3);
    expect(report.candidates).toHaveLength(12);
    expect(report.personalityPotential.personality).toHaveLength(3);
    expect(report.personalityPotential.potential).toEqual([]);
    expect(report.relationship.themes).toEqual([]);
    expect(report.career.themes).toEqual([]);
    expect(report.mainThemes.themes).toHaveLength(3);
    expect(report.mainThemes.themes.every(({ contributingDomains }) =>
      contributingDomains.length === 1 &&
      contributingDomains[0] === "personality",
    )).toBe(true);
    expect(report.provenance).toEqual({
      calculationVersion: "1.0.0",
      rulesetVersion: "1.0.0",
      interpretationVersion: "1.0.0",
      candidateProjectionPolicyId: "western-core-candidate-projection-v1",
      candidateProjectionVersion: "1.0.0",
    });
  });

  it("keeps each core placement duality inside one evidence group without conflict", () => {
    const report = synthesizeWesternCoreReport(calculationFixture());

    expect(
      report.personalityPotential.personality.every(
        ({ theme }) =>
          theme.hasConflict === false && theme.evidenceGroupIds.length === 1,
      ),
    ).toBe(true);
    expect(
      report.mainThemes.themes.every(({ theme }) => theme.hasConflict === false),
    ).toBe(true);
  });

  it("rejects a fixed invalid calculation missing the required ASC", () => {
    const calculation = calculationFixture();

    expect(() =>
      synthesizeWesternCoreReport({
        ...calculation,
        angles: calculation.angles.filter(({ name }) => name !== "ASC"),
      }),
    ).toThrow("chưa đủ Mặt Trời, Mặt Trăng và ASC");
  });
});
