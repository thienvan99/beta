import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { westernReportVersionMetadata } from "../config/western-report-version";
import { WesternReportVersion } from "./western-report-version";

describe("WesternReportVersion", () => {
  it("renders all report versions from the canonical metadata source", () => {
    const html = renderToStaticMarkup(<WesternReportVersion />);

    expect(html).toContain("Phiên bản báo cáo");
    expect(html).toContain("Tính toán");
    expect(html).toContain("Bộ quy tắc");
    expect(html).toContain("Luận giải");
    expect(html.match(/1\.0\.0/g)).toHaveLength(3);
    expect(westernReportVersionMetadata).toEqual({
      calculationVersion: "1.0.0",
      rulesetVersion: "1.0.0",
      interpretationVersion: "1.0.0",
    });
  });
});
