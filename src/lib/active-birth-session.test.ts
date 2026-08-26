import { describe, expect, it } from "vitest";
import {
  activeBirthSessionStorageKey,
  activeBirthSessionVersion,
  clearActiveBirthSession,
  readActiveBirthSession,
  writeActiveBirthSession,
} from "./active-birth-session";

const birthData = {
  birthDate: "1990-01-15",
  hour: "8",
  minute: "30",
  latitude: "10.8231",
  longitude: "106.6297",
  timezone: "Asia/Ho_Chi_Minh",
  gender: "male" as const,
};

function memoryStorage(initial: Record<string, string> = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
    removeItem: (key: string) => values.delete(key),
  };
}

describe("active birth session boundary", () => {
  it("writes and reads valid typed versioned state", () => {
    const storage = memoryStorage();
    expect(writeActiveBirthSession(birthData, storage)).toBe(true);
    expect(readActiveBirthSession(storage)).toEqual({
      version: activeBirthSessionVersion,
      birthData,
    });
  });

  it.each([
    ["missing", {}],
    ["wrong version", { [activeBirthSessionStorageKey]: JSON.stringify({ version: 2, birthData }) }],
    ["invalid data", { [activeBirthSessionStorageKey]: JSON.stringify({ version: 1, birthData: { ...birthData, latitude: "999" } }) }],
    ["corrupt JSON", { [activeBirthSessionStorageKey]: "{" }],
  ])("returns null for %s state", (_label, initial) => {
    expect(readActiveBirthSession(memoryStorage(initial))).toBeNull();
  });

  it("uses a separate session key and can clear active state", () => {
    const storage = memoryStorage({ "thienvan.birth-profiles.v1": "saved" });
    writeActiveBirthSession(birthData, storage);
    expect(clearActiveBirthSession(storage)).toBe(true);
    expect(readActiveBirthSession(storage)).toBeNull();
    expect(storage.getItem("thienvan.birth-profiles.v1")).toBe("saved");
  });
});
