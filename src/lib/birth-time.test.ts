import { describe, expect, it } from "vitest";
import { calculateBirthTime, isValidIanaTimeZone } from "./birth-time";

describe("calculateBirthTime", () => {
  it("tính giờ Việt Nam với UTC+07", () => {
    expect(
      calculateBirthTime({
        birthDate: "1990-01-15",
        hour: "8",
        minute: "30",
        timeZone: "Asia/Ho_Chi_Minh",
      }),
    ).toEqual({
      localDateTime: "1990-01-15T08:30:00",
      utcOffset: "+07:00",
      utcDateTime: "1990-01-15T01:30:00Z",
    });
  });

  it.each([
    ["mùa hè", "2024-07-15", "+01:00", "2024-07-15T11:00:00Z"],
    ["mùa đông", "2024-01-15", "+00:00", "2024-01-15T12:00:00Z"],
  ])("xử lý London %s", (_season, birthDate, utcOffset, utcDateTime) => {
    expect(
      calculateBirthTime({
        birthDate,
        hour: "12",
        minute: "0",
        timeZone: "Europe/London",
      }),
    ).toMatchObject({ utcOffset, utcDateTime });
  });

  it.each([
    ["mùa hè", "2024-07-15", "-04:00", "2024-07-15T16:00:00Z"],
    ["mùa đông", "2024-01-15", "-05:00", "2024-01-15T17:00:00Z"],
  ])("xử lý New York %s", (_season, birthDate, utcOffset, utcDateTime) => {
    expect(
      calculateBirthTime({
        birthDate,
        hour: "12",
        minute: "0",
        timeZone: "America/New_York",
      }),
    ).toMatchObject({ utcOffset, utcDateTime });
  });

  it("từ chối timezone không nhận diện được", () => {
    expect(isValidIanaTimeZone("Mars/Olympus")).toBe(false);
    expect(
      calculateBirthTime({
        birthDate: "2024-01-15",
        hour: "12",
        minute: "0",
        timeZone: "Mars/Olympus",
      }),
    ).toBeNull();
  });

  it("không chấp nhận UTC offset cố định thay cho IANA timezone", () => {
    expect(isValidIanaTimeZone("UTC+07:00")).toBe(false);
    expect(isValidIanaTimeZone("Etc/GMT-7")).toBe(false);
  });
});
