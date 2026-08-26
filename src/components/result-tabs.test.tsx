import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { longitudeToZodiac, type WesternAstrologyResult } from "../lib/western-astrology";
import { calculateWesternAstrology } from "../lib/western-astrology";
import { synthesizeWesternCoreReport } from "../lib/western-core-report-synthesis";
import { deriveWesternHouseCuspContexts } from "../lib/western-house-cusp-context";
import { deriveWesternHouseRulers } from "../lib/western-house-rulers";
import { HouseCuspContextDisplay, HouseRulerDisplay } from "./western-house-context";
import { WesternOverview } from "./western-synthesis-overview";

function zodiacPosition(longitude: number) {
  return { longitude, ...longitudeToZodiac(longitude) };
}

function resultFixture(): WesternAstrologyResult {
  const houses = Array.from({ length: 12 }, (_, index) => ({
    house: index + 1,
    ...zodiacPosition((180 + index * 30) % 360),
  }));

  return {
    system: "Tropical Zodiac",
    houseSystem: "Placidus",
    julianDay: 2460000,
    angles: [],
    aspects: [],
    houses,
    bodies: [
      {
        name: "Venus",
        ...zodiacPosition(209.5),
        retrograde: false,
        house: 1,
      },
      {
        name: "Mars",
        ...zodiacPosition(225),
        retrograde: false,
        house: 2,
      },
    ],
  };
}

describe("WesternAstrologyPanel house context", () => {
  it("renders traditional rulers as primary and modern rulers as supplementary", () => {
    const ruler = deriveWesternHouseRulers(resultFixture()).find(
      ({ cuspSign }) => cuspSign === "Scorpio",
    );
    const html = renderToStaticMarkup(
      <HouseRulerDisplay context={ruler} />,
    );

    expect(html).toContain(">Sao Hỏa</strong>");
    expect(html).toContain("Bổ sung hiện đại: Diêm Vương");
  });

  it("only surfaces derived near-cusp context", () => {
    const contexts = deriveWesternHouseCuspContexts(resultFixture());
    const nearHtml = renderToStaticMarkup(
      <HouseCuspContextDisplay context={contexts[0]} />,
    );
    const farHtml = renderToStaticMarkup(
      <HouseCuspContextDisplay context={contexts[1]} />,
    );

    expect(contexts[0].primaryHouse).toBe(1);
    expect(nearHtml).toContain("Gần ranh giới Nhà 2 · cách 0,50°");
    expect(farHtml).toContain('aria-label="Không sát cusp"');
  });
});

describe("WesternOverview", () => {
  it("renders canonical Main Themes in their deterministic order without filler", () => {
    const synthesis = synthesizeWesternCoreReport(calculateWesternAstrology({
      localDateTime: "1990-01-15T08:30:00",
      utcDateTime: "1990-01-15T01:30:00Z",
      latitude: 10.8231,
      longitude: 106.6297,
      timeZone: "Asia/Ho_Chi_Minh",
    }));
    const html = renderToStaticMarkup(<WesternOverview synthesis={synthesis} />);

    expect(synthesis.mainThemes.themes.length).toBeLessThanOrEqual(5);
    expect((html.match(/<article/g) ?? [])).toHaveLength(synthesis.mainThemes.themes.length);
    expect(html).not.toContain("Sắp có");
    expect(html).not.toContain("Tiềm năng");
    expect(html).not.toContain("Mối quan hệ");
    expect(html).not.toContain("Sự nghiệp");
    expect(html).toContain(synthesis.mainThemes.themes[0].themeLabel);
    expect(html).toContain(synthesis.provenance.interpretationVersion);
    expect(html).toContain("Vì sao có kết luận này?");
  });
});
