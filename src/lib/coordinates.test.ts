import { describe, expect, it } from "vitest";
import { parseCoordinates } from "./coordinates";

describe("parseCoordinates", () => {
  it("đọc tọa độ Bắc và Đông", () => {
    const result = parseCoordinates(`14°21'45.9"N 108°00'23.7"E`);

    expect(result?.latitude).toBeCloseTo(14.36275, 12);
    expect(result?.longitude).toBeCloseTo(108.00658333333333, 12);
  });

  it("đổi tọa độ Nam và Tây thành số âm", () => {
    const result = parseCoordinates(`33°51'31.2"S 151°12'50.5"W`);

    expect(result?.latitude).toBeCloseTo(-33.85866666666667, 12);
    expect(result?.longitude).toBeCloseTo(-151.21402777777778, 12);
  });

  it("đọc định dạng độ-phút-giây", () => {
    const result = parseCoordinates(`0°30'00"N 10°15'30"E`);

    expect(result?.latitude).toBeCloseTo(0.5, 12);
    expect(result?.longitude).toBeCloseTo(10.258333333333333, 12);
  });

  it("đọc định dạng số thập phân", () => {
    expect(parseCoordinates("14.36275, 108.006583")).toEqual({
      latitude: 14.36275,
      longitude: 108.006583,
    });
  });

  it("đọc tọa độ độ-phút-giây có dấu phẩy", () => {
    const result = parseCoordinates(`14°21'45.9"N, 108°00'23.7"E`);

    expect(result?.latitude).toBeCloseTo(14.36275, 12);
    expect(result?.longitude).toBeCloseTo(108.00658333333333, 12);
  });

  it.each([
    "không phải tọa độ",
    "91.1, 108.0",
    "14.0, 181.0",
    `14°60'00"N 108°00'00"E`,
    `90°00'00.1"N 108°00'00"E`,
  ])("từ chối chuỗi không hợp lệ: %s", (input) => {
    expect(parseCoordinates(input)).toBeNull();
  });
});
