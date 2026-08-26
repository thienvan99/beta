import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { WesternAstrologyResult } from "../lib/western-astrology";
import { WesternPlanetHouseInterpretations } from "./western-planet-house-interpretations";

function resultWithBodyInHouse(
  name: string,
  house: number,
): WesternAstrologyResult {
  return {
    system: "Tropical Zodiac",
    houseSystem: "Placidus",
    julianDay: 2460000,
    angles: [],
    houses: [],
    aspects: [],
    bodies: [
      {
        name,
        house,
        longitude: 10,
        sign: "Aries",
        signVietnamese: "Bạch Dương",
        degree: 10,
        minute: 0,
        retrograde: false,
      },
    ],
  };
}

describe("WesternPlanetHouseInterpretations", () => {
  it.each(Array.from({ length: 12 }, (_, index) => index + 1))(
    "renders the structured Pluto in House %s interpretation",
    (house) => {
      const html = renderToStaticMarkup(
        <WesternPlanetHouseInterpretations
          result={resultWithBodyInHouse("Pluto", house)}
        />,
      );

      expect(html).toContain(`Diêm Vương ở Nhà ${house}`);
      expect(html).toContain("Vị trí hành tinh trong nhà");
      expect(html).toContain("Bộ quy tắc / phiên bản");
      expect(html).toContain("Ý nghĩa cốt lõi");
      expect(html).toContain("Thế mạnh");
      expect(html).toContain("Điều cần lưu ý");
      expect(html).toContain("Định hướng phát triển");
      expect(html).toContain(`WESTERN-PLUTO-HOUSE-${house}-V1`);
    },
  );

  it.each(Array.from({ length: 12 }, (_, index) => index + 1))(
    "renders the structured Neptune in House %s interpretation",
    (house) => {
      const html = renderToStaticMarkup(
        <WesternPlanetHouseInterpretations
          result={resultWithBodyInHouse("Neptune", house)}
        />,
      );

      expect(html).toContain(`Hải Vương ở Nhà ${house}`);
      expect(html).toContain("Ý nghĩa cốt lõi");
      expect(html).toContain("Thế mạnh");
      expect(html).toContain("Điều cần lưu ý");
      expect(html).toContain("Định hướng phát triển");
      expect(html).toContain(`WESTERN-NEPTUNE-HOUSE-${house}-V1`);
    },
  );

  it.each(Array.from({ length: 12 }, (_, index) => index + 1))(
    "renders the structured Uranus in House %s interpretation",
    (house) => {
      const html = renderToStaticMarkup(
        <WesternPlanetHouseInterpretations
          result={resultWithBodyInHouse("Uranus", house)}
        />,
      );

      expect(html).toContain(`Thiên Vương ở Nhà ${house}`);
      expect(html).toContain("Ý nghĩa cốt lõi");
      expect(html).toContain("Thế mạnh");
      expect(html).toContain("Điều cần lưu ý");
      expect(html).toContain("Định hướng phát triển");
      expect(html).toContain(`WESTERN-URANUS-HOUSE-${house}-V1`);
    },
  );

  it.each(Array.from({ length: 12 }, (_, index) => index + 1))(
    "renders the structured Sun in House %s interpretation",
    (house) => {
      const html = renderToStaticMarkup(
        <WesternPlanetHouseInterpretations
          result={resultWithBodyInHouse("Sun", house)}
        />,
      );

      expect(html).toContain(`Mặt Trời ở Nhà ${house}`);
      expect(html).toContain("Ý nghĩa cốt lõi");
      expect(html).toContain("Thế mạnh");
      expect(html).toContain("Điều cần lưu ý");
      expect(html).toContain("Định hướng phát triển");
      expect(html).toContain(`WESTERN-SUN-HOUSE-${house}-V1`);
    },
  );

  it.each(Array.from({ length: 12 }, (_, index) => index + 1))(
    "renders the structured Saturn in House %s interpretation",
    (house) => {
      const html = renderToStaticMarkup(
        <WesternPlanetHouseInterpretations
          result={resultWithBodyInHouse("Saturn", house)}
        />,
      );

      expect(html).toContain(`Sao Thổ ở Nhà ${house}`);
      expect(html).toContain("Ý nghĩa cốt lõi");
      expect(html).toContain("Thế mạnh");
      expect(html).toContain("Điều cần lưu ý");
      expect(html).toContain("Định hướng phát triển");
      expect(html).toContain(`WESTERN-SATURN-HOUSE-${house}-V1`);
    },
  );

  it.each(Array.from({ length: 12 }, (_, index) => index + 1))(
    "renders the structured Jupiter in House %s interpretation",
    (house) => {
      const html = renderToStaticMarkup(
        <WesternPlanetHouseInterpretations
          result={resultWithBodyInHouse("Jupiter", house)}
        />,
      );

      expect(html).toContain(`Sao Mộc ở Nhà ${house}`);
      expect(html).toContain("Ý nghĩa cốt lõi");
      expect(html).toContain("Thế mạnh");
      expect(html).toContain("Điều cần lưu ý");
      expect(html).toContain("Định hướng phát triển");
      expect(html).toContain(`WESTERN-JUPITER-HOUSE-${house}-V1`);
    },
  );

  it.each(Array.from({ length: 12 }, (_, index) => index + 1))(
    "renders the structured Mars in House %s interpretation",
    (house) => {
      const html = renderToStaticMarkup(
        <WesternPlanetHouseInterpretations
          result={resultWithBodyInHouse("Mars", house)}
        />,
      );

      expect(html).toContain(`Sao Hỏa ở Nhà ${house}`);
      expect(html).toContain("Ý nghĩa cốt lõi");
      expect(html).toContain("Thế mạnh");
      expect(html).toContain("Điều cần lưu ý");
      expect(html).toContain("Định hướng phát triển");
      expect(html).toContain(`WESTERN-MARS-HOUSE-${house}-V1`);
    },
  );

  it.each(Array.from({ length: 12 }, (_, index) => index + 1))(
    "renders the structured Venus in House %s interpretation",
    (house) => {
      const html = renderToStaticMarkup(
        <WesternPlanetHouseInterpretations
          result={resultWithBodyInHouse("Venus", house)}
        />,
      );

      expect(html).toContain(`Sao Kim ở Nhà ${house}`);
      expect(html).toContain("Ý nghĩa cốt lõi");
      expect(html).toContain("Thế mạnh");
      expect(html).toContain("Điều cần lưu ý");
      expect(html).toContain("Định hướng phát triển");
      expect(html).toContain(`WESTERN-VENUS-HOUSE-${house}-V1`);
    },
  );

  it.each(Array.from({ length: 12 }, (_, index) => index + 1))(
    "renders the structured Mercury in House %s interpretation",
    (house) => {
      const html = renderToStaticMarkup(
        <WesternPlanetHouseInterpretations
          result={resultWithBodyInHouse("Mercury", house)}
        />,
      );

      expect(html).toContain(`Sao Thủy ở Nhà ${house}`);
      expect(html).toContain("Ý nghĩa cốt lõi");
      expect(html).toContain("Thế mạnh");
      expect(html).toContain("Điều cần lưu ý");
      expect(html).toContain("Định hướng phát triển");
      expect(html).toContain(`WESTERN-MERCURY-HOUSE-${house}-V1`);
    },
  );

  it.each(Array.from({ length: 12 }, (_, index) => index + 1))(
    "renders the structured Moon in House %s interpretation",
    (house) => {
      const html = renderToStaticMarkup(
        <WesternPlanetHouseInterpretations
          result={resultWithBodyInHouse("Moon", house)}
        />,
      );

      expect(html).toContain(`Mặt Trăng ở Nhà ${house}`);
      expect(html).toContain("Ý nghĩa cốt lõi");
      expect(html).toContain("Thế mạnh");
      expect(html).toContain("Điều cần lưu ý");
      expect(html).toContain("Định hướng phát triển");
      expect(html).toContain(`WESTERN-MOON-HOUSE-${house}-V1`);
    },
  );

  it("renders nothing when the calculated placement has no rule", () => {
    expect(
      renderToStaticMarkup(
        <WesternPlanetHouseInterpretations
          result={resultWithBodyInHouse("Chiron", 1)}
        />,
      ),
    ).toBe("");
  });
});
