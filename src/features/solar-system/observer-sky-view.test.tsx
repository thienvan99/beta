import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  OBSERVER_SKY_BODY_NAMES,
  type ObserverSkyProjection,
} from "./observer-sky-projection";
import { ObserverSkyView } from "./observer-sky-view";

function projectionFixture(): ObserverSkyProjection {
  return {
    instantUtc: "1990-01-15T01:30:00.000Z",
    timestampUtcMs: Date.parse("1990-01-15T01:30:00.000Z"),
    observer: { latitude: 10.8231, longitude: 106.6297, elevationMeters: 0 },
    policy: {
      topocentric: true,
      lightTime: "applied",
      parallax: "applied",
      aberration: "on",
      atmosphericRefraction: "off",
    },
    bodies: OBSERVER_SKY_BODY_NAMES.map((body, index) => ({
      body,
      azimuthDegrees: index === 1 ? 123.456789 : index * 30,
      altitudeDegrees: index === 1 ? -12.345678 : index + 1,
      aboveHorizon: index !== 1,
    })),
  };
}

describe("Birth Observer sky view", () => {
  it("provides an accessible SVG and a non-canvas status equivalent for all bodies", () => {
    const html = renderToStaticMarkup(
      <ObserverSkyView projection={projectionFixture()} onExit={() => undefined} />,
    );
    expect(html).toContain('role="img"');
    expect(html).toContain('aria-labelledby="sky-dome-title sky-dome-description"');
    expect(html).toContain("Bắc ở trên, Đông bên phải, Nam ở dưới, Tây bên trái");
    expect(html.match(/data-above-horizon=/g)).toHaveLength(19);
    for (const label of [
      "Mặt Trời",
      "Mặt Trăng",
      "Sao Thủy",
      "Sao Kim",
      "Sao Hỏa",
      "Sao Mộc",
      "Sao Thổ",
      "Sao Thiên Vương",
      "Sao Hải Vương",
      "Sao Diêm Vương",
    ]) {
      expect(html).toContain(label);
    }
    expect(html).toContain("Dưới chân trời");
    expect(html).toContain("Trên chân trời");
  });

  it("keeps exact technical source values inside progressive disclosure", () => {
    const html = renderToStaticMarkup(
      <ObserverSkyView projection={projectionFixture()} onExit={() => undefined} />,
    );
    expect(html).toContain("<details");
    expect(html).toContain("Chi tiết thiên văn và phương pháp");
    expect(html).toContain("123,456789°");
    expect(html).toContain("-12,345678°");
    expect(html).toContain("1990-01-15T01:30:00.000Z");
    expect(html).toContain("Topocentric; light-time và parallax đã áp dụng; aberration bật; refraction tắt");
  });

  it("does not claim a real star field or render Western Projection concepts", () => {
    const html = renderToStaticMarkup(
      <ObserverSkyView projection={projectionFixture()} onExit={() => undefined} />,
    );
    expect(html).not.toMatch(/zodiac|ASC|MC|Placidus|Western Projection/i);
    expect(html).not.toMatch(/chòm sao|Ngân Hà|star catalog/i);
    expect(html).toContain("không mô hình hóa độ sáng hay khả năng nhìn thấy bằng mắt thường");
  });
});
