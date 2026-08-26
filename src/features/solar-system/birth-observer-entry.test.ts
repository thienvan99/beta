import { describe, expect, it } from "vitest";
import {
  activeBirthSessionStorageKey,
  readActiveBirthSession,
} from "../../lib/active-birth-session";
import type { BirthData } from "../../lib/birth-data";
import { resolveBirthObserverEntry } from "./birth-observer-entry";

const supportedBirthData: BirthData = {
  birthDate: "1990-01-15",
  hour: "8",
  minute: "30",
  latitude: "10.8231",
  longitude: "106.6297",
  timezone: "Asia/Ho_Chi_Minh",
  gender: "female",
};

class MemoryStorage implements Pick<Storage, "getItem" | "setItem" | "removeItem"> {
  private values = new Map<string, string>();
  getItem(key: string) { return this.values.get(key) ?? null; }
  setItem(key: string, value: string) { this.values.set(key, value); }
  removeItem(key: string) { this.values.delete(key); }
}

describe("Birth Observer entry boundary", () => {
  it("maps active BirthData to the exact supported ObservationContext", () => {
    const result = resolveBirthObserverEntry(supportedBirthData);
    expect(result.status).toBe("ready");
    if (result.status !== "ready") throw new Error("Expected a ready Observer entry.");

    expect(result.context).toEqual({
      instantUtc: "1990-01-15T01:30:00Z",
      timestampUtcMs: Date.parse("1990-01-15T01:30:00.000Z"),
      latitude: 10.8231,
      longitude: 106.6297,
      elevationMeters: 0,
      timezone: {
        ianaName: "Asia/Ho_Chi_Minh",
        localDateTime: "1990-01-15T08:30:00",
        utcOffset: "+07:00",
        provenance: "birth-time-pipeline",
      },
    });
    expect(result.context).not.toHaveProperty("gender");
  });

  it("fails safely for a missing active session", () => {
    expect(resolveBirthObserverEntry(null)).toEqual({ status: "missing-session" });
  });

  it("treats a corrupt stored session as missing and removes it", () => {
    const storage = new MemoryStorage();
    storage.setItem(activeBirthSessionStorageKey, "{broken-json");
    const session = readActiveBirthSession(storage);
    expect(session).toBeNull();
    expect(storage.getItem(activeBirthSessionStorageKey)).toBeNull();
    expect(resolveBirthObserverEntry(session?.birthData ?? null)).toEqual({
      status: "missing-session",
    });
  });

  it("reports invalid context without reparsing or substituting input", () => {
    const invalid = { ...supportedBirthData, timezone: "Mars/Olympus" } as BirthData;
    expect(resolveBirthObserverEntry(invalid)).toEqual({ status: "invalid-context" });
  });

  it("keeps an unsupported original instant unchanged instead of clamping", () => {
    const unsupported = resolveBirthObserverEntry({
      ...supportedBirthData,
      birthDate: "2201-01-02",
      hour: "0",
      minute: "0",
      timezone: "Asia/Ho_Chi_Minh",
    });
    expect(unsupported.status).toBe("unsupported");
    if (unsupported.status !== "unsupported") throw new Error("Expected unsupported.");
    expect(unsupported.context.instantUtc).toBe("2201-01-01T17:00:00Z");
    expect(unsupported.context.timestampUtcMs).toBe(Date.parse("2201-01-01T17:00:00Z"));
  });
});
