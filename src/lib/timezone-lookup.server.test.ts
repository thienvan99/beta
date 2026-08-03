import { describe, expect, it } from "vitest";
import { lookupIanaTimeZone } from "./timezone-lookup.server";

describe("lookupIanaTimeZone", () => {
  it("nhận diện timezone Việt Nam từ tọa độ", () => {
    expect(lookupIanaTimeZone(10.8231, 106.6297)).toBe(
      "Asia/Ho_Chi_Minh",
    );
  });

  it("từ chối tọa độ không hợp lệ", () => {
    expect(lookupIanaTimeZone(91, 106.6297)).toBeNull();
    expect(lookupIanaTimeZone(10.8231, 181)).toBeNull();
  });

  it("trả về null khi không nhận diện được timezone", () => {
    expect(lookupIanaTimeZone(10, 10, () => [])).toBeNull();
  });
});
