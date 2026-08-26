import { describe, expect, it } from "vitest";
import { zodiacSigns } from "./western-astrology";
import {
  formatWesternBodyTerm,
  formatZodiacSignTerm,
  westernBodyLabels,
} from "./western-terminology";

describe("Western interpretation terminology", () => {
  it("defines the approved Vietnamese labels for all 10 celestial bodies", () => {
    expect(Object.entries(westernBodyLabels).slice(0, 10)).toEqual([
      ["Sun", "Mặt Trời"],
      ["Moon", "Mặt Trăng"],
      ["Mercury", "Sao Thủy"],
      ["Venus", "Sao Kim"],
      ["Mars", "Sao Hỏa"],
      ["Jupiter", "Sao Mộc"],
      ["Saturn", "Sao Thổ"],
      ["Uranus", "Sao Thiên Vương"],
      ["Neptune", "Sao Hải Vương"],
      ["Pluto", "Sao Diêm Vương"],
    ]);
  });

  it("formats the core triad labels beginner-first", () => {
    expect(formatWesternBodyTerm("Sun")).toBe("Sun (Mặt Trời)");
    expect(formatWesternBodyTerm("Moon")).toBe("Moon (Mặt Trăng)");
    expect(formatWesternBodyTerm("ASC")).toBe("Ascendant (Cung Mọc)");
  });

  it("formats all 12 canonical zodiac signs without changing their keys", () => {
    expect(zodiacSigns).toHaveLength(12);
    expect(zodiacSigns.map((sign) => formatZodiacSignTerm(sign))).toEqual([
      "Aries (Bạch Dương)",
      "Taurus (Kim Ngưu)",
      "Gemini (Song Tử)",
      "Cancer (Cự Giải)",
      "Leo (Sư Tử)",
      "Virgo (Xử Nữ)",
      "Libra (Thiên Bình)",
      "Scorpio (Bọ Cạp)",
      "Sagittarius (Nhân Mã)",
      "Capricorn (Ma Kết)",
      "Aquarius (Bảo Bình)",
      "Pisces (Song Ngư)",
    ]);
    expect(zodiacSigns[9]).toBe("Capricorn");
  });
});
