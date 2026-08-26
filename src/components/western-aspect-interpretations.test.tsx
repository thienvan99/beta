import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { MajorAspect, WesternAstrologyResult } from "../lib/western-astrology";
import { WesternAspectInterpretations } from "./western-aspect-interpretations";

function resultWithAspects(aspects: MajorAspect[]): WesternAstrologyResult {
  return {
    system: "Tropical Zodiac",
    houseSystem: "Placidus",
    julianDay: 2460000,
    angles: [],
    houses: [],
    bodies: [],
    aspects,
  };
}

const sunMoonSquare: MajorAspect = {
  id: "Sun-Moon-Square",
  body1: "Sun",
  body2: "Moon",
  aspect: "square",
  aspectEnglish: "Square",
  aspectVietnamese: "Vuông",
  exactAngle: 90,
  actualAngle: 91.25,
  orb: 1.25,
  phase: "separating",
};

describe("WesternAspectInterpretations", () => {
  it("renders one real Sun-Moon aspect with calculation evidence", () => {
    const html = renderToStaticMarkup(
      <WesternAspectInterpretations
        result={resultWithAspects([sunMoonSquare])}
      />,
    );

    expect(html).toContain("Luận giải góc chiếu");
    expect(html).toContain("Mặt Trời vuông Mặt Trăng");
    expect(html).toContain("Vuông (Square)");
    expect(html).toContain("91.25°");
    expect(html).toContain("1.25°");
    expect(html).toContain("Đang tách (Separating)");
    expect(html).toContain("Ý nghĩa cốt lõi");
    expect(html).toContain("Thế mạnh");
    expect(html).toContain("Điều cần lưu ý");
    expect(html).toContain("Định hướng phát triển");
    expect(html).toContain("Vì sao có kết luận này?");
    expect(html).toContain("Dữ liệu tính toán");
    expect(html).toContain("Bộ quy tắc / phiên bản");
    expect(html).not.toContain("Evidence từ calculation");
    expect(html).toContain("WESTERN-ASPECT-SUN-MOON-SQUARE-V1");
  });

  it("renders nothing when no calculated aspect exists", () => {
    expect(
      renderToStaticMarkup(
        <WesternAspectInterpretations result={resultWithAspects([])} />,
      ),
    ).toBe("");
  });

  it("renders nothing for a calculated aspect without an interpretation", () => {
    const unsupported: MajorAspect = {
      ...sunMoonSquare,
      id: "Sun-Venus-Square",
      body2: "Venus",
    };
    expect(
      renderToStaticMarkup(
        <WesternAspectInterpretations
          result={resultWithAspects([unsupported])}
        />,
      ),
    ).toBe("");
  });

  it("renders a Moon-Neptune interpretation with calculation evidence", () => {
    const moonNeptuneSquare: MajorAspect = {
      ...sunMoonSquare,
      id: "Moon-Neptune-Square",
      body1: "Moon",
      body2: "Neptune",
      actualAngle: 92.75,
      orb: 2.75,
      phase: "applying",
    };
    const html = renderToStaticMarkup(
      <WesternAspectInterpretations
        result={resultWithAspects([moonNeptuneSquare])}
      />,
    );

    expect(html).toContain("Mặt Trăng vuông Sao Hải Vương");
    expect(html).toContain("92.75°");
    expect(html).toContain("2.75°");
    expect(html).toContain("Đang tiến (Applying)");
    expect(html).toContain("WESTERN-ASPECT-MOON-NEPTUNE-SQUARE-V1");
  });

  it("renders a Moon-Pluto interpretation with calculation evidence", () => {
    const moonPlutoOpposition: MajorAspect = {
      ...sunMoonSquare,
      id: "Moon-Pluto-Opposition",
      body1: "Moon",
      body2: "Pluto",
      aspect: "opposition",
      aspectEnglish: "Opposition",
      aspectVietnamese: "Đối đỉnh",
      exactAngle: 180,
      actualAngle: 177.25,
      orb: 2.75,
      phase: "separating",
    };
    const html = renderToStaticMarkup(
      <WesternAspectInterpretations
        result={resultWithAspects([moonPlutoOpposition])}
      />,
    );

    expect(html).toContain("Mặt Trăng đối đỉnh Sao Diêm Vương");
    expect(html).toContain("177.25°");
    expect(html).toContain("2.75°");
    expect(html).toContain("Đang tách (Separating)");
    expect(html).toContain("WESTERN-ASPECT-MOON-PLUTO-OPPOSITION-V1");
  });

  it("renders a Mercury-Venus interpretation with calculation evidence", () => {
    const mercuryVenusSextile: MajorAspect = {
      ...sunMoonSquare,
      id: "Mercury-Venus-Sextile",
      body1: "Mercury",
      body2: "Venus",
      aspect: "sextile",
      aspectEnglish: "Sextile",
      aspectVietnamese: "Lục hợp",
      exactAngle: 60,
      actualAngle: 58.25,
      orb: 1.75,
      phase: "applying",
    };
    const html = renderToStaticMarkup(
      <WesternAspectInterpretations
        result={resultWithAspects([mercuryVenusSextile])}
      />,
    );

    expect(html).toContain("Sao Thủy lục hợp Sao Kim");
    expect(html).toContain("58.25°");
    expect(html).toContain("1.75°");
    expect(html).toContain("Đang tiến (Applying)");
    expect(html).toContain("WESTERN-ASPECT-MERCURY-VENUS-SEXTILE-V1");
  });

  it("renders a Mercury-Mars interpretation with calculation evidence", () => {
    const mercuryMarsSquare: MajorAspect = {
      ...sunMoonSquare,
      id: "Mercury-Mars-Square",
      body1: "Mercury",
      body2: "Mars",
      actualAngle: 88.5,
      orb: 1.5,
      phase: "applying",
    };
    const html = renderToStaticMarkup(
      <WesternAspectInterpretations
        result={resultWithAspects([mercuryMarsSquare])}
      />,
    );

    expect(html).toContain("Sao Thủy vuông Sao Hỏa");
    expect(html).toContain("88.50°");
    expect(html).toContain("1.50°");
    expect(html).toContain("Đang tiến (Applying)");
    expect(html).toContain("WESTERN-ASPECT-MERCURY-MARS-SQUARE-V1");
  });

  it("renders a Mercury-Jupiter interpretation with calculation evidence", () => {
    const mercuryJupiterOpposition: MajorAspect = {
      ...sunMoonSquare,
      id: "Mercury-Jupiter-Opposition",
      body1: "Mercury",
      body2: "Jupiter",
      aspect: "opposition",
      aspectEnglish: "Opposition",
      aspectVietnamese: "Đối đỉnh",
      exactAngle: 180,
      actualAngle: 177.5,
      orb: 2.5,
      phase: "separating",
    };
    const html = renderToStaticMarkup(
      <WesternAspectInterpretations
        result={resultWithAspects([mercuryJupiterOpposition])}
      />,
    );

    expect(html).toContain("Sao Thủy đối đỉnh Sao Mộc");
    expect(html).toContain("177.50°");
    expect(html).toContain("2.50°");
    expect(html).toContain("Đang tách (Separating)");
    expect(html).toContain("WESTERN-ASPECT-MERCURY-JUPITER-OPPOSITION-V1");
  });

  it("renders a Mercury-Saturn interpretation with calculation evidence", () => {
    const mercurySaturnTrine: MajorAspect = {
      ...sunMoonSquare,
      id: "Mercury-Saturn-Trine",
      body1: "Mercury",
      body2: "Saturn",
      aspect: "trine",
      aspectEnglish: "Trine",
      aspectVietnamese: "Tam hợp",
      exactAngle: 120,
      actualAngle: 118.25,
      orb: 1.75,
      phase: "applying",
    };
    const html = renderToStaticMarkup(
      <WesternAspectInterpretations
        result={resultWithAspects([mercurySaturnTrine])}
      />,
    );

    expect(html).toContain("Sao Thủy tam hợp Sao Thổ");
    expect(html).toContain("118.25°");
    expect(html).toContain("1.75°");
    expect(html).toContain("Đang tiến (Applying)");
    expect(html).toContain("WESTERN-ASPECT-MERCURY-SATURN-TRINE-V1");
  });

  it("renders a Mercury-Uranus interpretation with calculation evidence", () => {
    const mercuryUranusSquare: MajorAspect = {
      ...sunMoonSquare,
      id: "Mercury-Uranus-Square",
      body1: "Mercury",
      body2: "Uranus",
      aspect: "square",
      aspectEnglish: "Square",
      aspectVietnamese: "Vuông",
      exactAngle: 90,
      actualAngle: 91.35,
      orb: 1.35,
      phase: "separating",
    };
    const html = renderToStaticMarkup(
      <WesternAspectInterpretations
        result={resultWithAspects([mercuryUranusSquare])}
      />,
    );

    expect(html).toContain("Sao Thủy vuông Sao Thiên Vương");
    expect(html).toContain("91.35°");
    expect(html).toContain("1.35°");
    expect(html).toContain("Đang tách (Separating)");
    expect(html).toContain("WESTERN-ASPECT-MERCURY-URANUS-SQUARE-V1");
  });

  it("renders a Mercury-Neptune interpretation with calculation evidence", () => {
    const mercuryNeptuneOpposition: MajorAspect = {
      ...sunMoonSquare,
      id: "Mercury-Neptune-Opposition",
      body1: "Mercury",
      body2: "Neptune",
      aspect: "opposition",
      aspectEnglish: "Opposition",
      aspectVietnamese: "Đối đỉnh",
      exactAngle: 180,
      actualAngle: 178.4,
      orb: 1.6,
      phase: "separating",
    };
    const html = renderToStaticMarkup(
      <WesternAspectInterpretations
        result={resultWithAspects([mercuryNeptuneOpposition])}
      />,
    );

    expect(html).toContain("Sao Thủy đối đỉnh Sao Hải Vương");
    expect(html).toContain("178.40°");
    expect(html).toContain("1.60°");
    expect(html).toContain("Đang tách (Separating)");
    expect(html).toContain("WESTERN-ASPECT-MERCURY-NEPTUNE-OPPOSITION-V1");
  });

  it("renders a Mercury-Pluto interpretation with calculation evidence", () => {
    const mercuryPlutoTrine: MajorAspect = {
      ...sunMoonSquare,
      id: "Mercury-Pluto-Trine",
      body1: "Mercury",
      body2: "Pluto",
      aspect: "trine",
      aspectEnglish: "Trine",
      aspectVietnamese: "Tam hợp",
      exactAngle: 120,
      actualAngle: 117.8,
      orb: 2.2,
      phase: "applying",
    };
    const html = renderToStaticMarkup(
      <WesternAspectInterpretations
        result={resultWithAspects([mercuryPlutoTrine])}
      />,
    );

    expect(html).toContain("Sao Thủy tam hợp Sao Diêm Vương");
    expect(html).toContain("117.80°");
    expect(html).toContain("2.20°");
    expect(html).toContain("Đang tiến (Applying)");
    expect(html).toContain("WESTERN-ASPECT-MERCURY-PLUTO-TRINE-V1");
  });

  it("renders a Venus-Mars interpretation with calculation evidence", () => {
    const venusMarsSquare: MajorAspect = {
      ...sunMoonSquare,
      id: "Venus-Mars-Square",
      body1: "Venus",
      body2: "Mars",
      aspect: "square",
      aspectEnglish: "Square",
      aspectVietnamese: "Vuông",
      exactAngle: 90,
      actualAngle: 92.4,
      orb: 2.4,
      phase: "separating",
    };
    const html = renderToStaticMarkup(
      <WesternAspectInterpretations result={resultWithAspects([venusMarsSquare])} />,
    );

    expect(html).toContain("Sao Kim vuông Sao Hỏa");
    expect(html).toContain("92.40°");
    expect(html).toContain("2.40°");
    expect(html).toContain("Đang tách (Separating)");
    expect(html).toContain("WESTERN-ASPECT-VENUS-MARS-SQUARE-V1");
  });

  it("renders a Venus-Jupiter interpretation with calculation evidence", () => {
    const venusJupiterTrine: MajorAspect = {
      ...sunMoonSquare,
      id: "Venus-Jupiter-Trine",
      body1: "Venus",
      body2: "Jupiter",
      aspect: "trine",
      aspectEnglish: "Trine",
      aspectVietnamese: "Tam hợp",
      exactAngle: 120,
      actualAngle: 118.6,
      orb: 1.4,
      phase: "applying",
    };
    const html = renderToStaticMarkup(
      <WesternAspectInterpretations
        result={resultWithAspects([venusJupiterTrine])}
      />,
    );

    expect(html).toContain("Sao Kim tam hợp Sao Mộc");
    expect(html).toContain("118.60°");
    expect(html).toContain("1.40°");
    expect(html).toContain("Đang tiến (Applying)");
    expect(html).toContain("WESTERN-ASPECT-VENUS-JUPITER-TRINE-V1");
  });

  it("renders a Venus-Saturn interpretation with calculation evidence", () => {
    const venusSaturnOpposition: MajorAspect = {
      ...sunMoonSquare,
      id: "Venus-Saturn-Opposition",
      body1: "Venus",
      body2: "Saturn",
      aspect: "opposition",
      aspectEnglish: "Opposition",
      aspectVietnamese: "Đối đỉnh",
      exactAngle: 180,
      actualAngle: 177.8,
      orb: 2.2,
      phase: "separating",
    };
    const html = renderToStaticMarkup(
      <WesternAspectInterpretations
        result={resultWithAspects([venusSaturnOpposition])}
      />,
    );

    expect(html).toContain("Sao Kim đối đỉnh Sao Thổ");
    expect(html).toContain("177.80°");
    expect(html).toContain("2.20°");
    expect(html).toContain("Đang tách (Separating)");
    expect(html).toContain("WESTERN-ASPECT-VENUS-SATURN-OPPOSITION-V1");
  });

  it("renders a Venus-Uranus interpretation with calculation evidence", () => {
    const venusUranusSquare: MajorAspect = {
      ...sunMoonSquare,
      id: "Venus-Uranus-Square",
      body1: "Venus",
      body2: "Uranus",
      aspect: "square",
      aspectEnglish: "Square",
      aspectVietnamese: "Vuông",
      exactAngle: 90,
      actualAngle: 92.3,
      orb: 2.3,
      phase: "applying",
    };
    const html = renderToStaticMarkup(
      <WesternAspectInterpretations
        result={resultWithAspects([venusUranusSquare])}
      />,
    );

    expect(html).toContain("Sao Kim vuông Sao Thiên Vương");
    expect(html).toContain("92.30°");
    expect(html).toContain("2.30°");
    expect(html).toContain("Đang tiến (Applying)");
    expect(html).toContain("WESTERN-ASPECT-VENUS-URANUS-SQUARE-V1");
  });

  it("renders a Venus-Neptune interpretation with calculation evidence", () => {
    const venusNeptuneTrine: MajorAspect = {
      ...sunMoonSquare,
      id: "Venus-Neptune-Trine",
      body1: "Venus",
      body2: "Neptune",
      aspect: "trine",
      aspectEnglish: "Trine",
      aspectVietnamese: "Tam hợp",
      exactAngle: 120,
      actualAngle: 117.6,
      orb: 2.4,
      phase: "separating",
    };
    const html = renderToStaticMarkup(
      <WesternAspectInterpretations
        result={resultWithAspects([venusNeptuneTrine])}
      />,
    );

    expect(html).toContain("Sao Kim tam hợp Sao Hải Vương");
    expect(html).toContain("117.60°");
    expect(html).toContain("2.40°");
    expect(html).toContain("Đang tách (Separating)");
    expect(html).toContain("WESTERN-ASPECT-VENUS-NEPTUNE-TRINE-V1");
  });

  it("renders a Venus-Pluto interpretation with calculation evidence", () => {
    const venusPlutoOpposition: MajorAspect = {
      ...sunMoonSquare,
      id: "Venus-Pluto-Opposition",
      body1: "Venus",
      body2: "Pluto",
      aspect: "opposition",
      aspectEnglish: "Opposition",
      aspectVietnamese: "Đối đỉnh",
      exactAngle: 180,
      actualAngle: 177.4,
      orb: 2.6,
      phase: "applying",
    };
    const html = renderToStaticMarkup(
      <WesternAspectInterpretations
        result={resultWithAspects([venusPlutoOpposition])}
      />,
    );

    expect(html).toContain("Sao Kim đối đỉnh Sao Diêm Vương");
    expect(html).toContain("177.40°");
    expect(html).toContain("2.60°");
    expect(html).toContain("Đang tiến (Applying)");
    expect(html).toContain("WESTERN-ASPECT-VENUS-PLUTO-OPPOSITION-V1");
  });
});
