import { describe, expect, it } from "vitest";
import {
  birthDraftStorageKey,
  birthProfileToDraft,
  birthProfilesStorageKey,
  birthStorageVersion,
  clearBirthProfiles,
  deleteBirthProfile,
  maximumBirthProfiles,
  readBirthDraft,
  readBirthProfiles,
  saveBirthProfile,
  writeBirthDraft,
  type BirthProfileInput,
  type StoredBirthDraft,
} from "./birth-profile-storage";

class MemoryStorage implements Pick<Storage, "getItem" | "setItem" | "removeItem"> {
  private items = new Map<string, string>();

  getItem(key: string) {
    return this.items.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    this.items.set(key, value);
  }

  removeItem(key: string) {
    this.items.delete(key);
  }
}

const completeDraft: StoredBirthDraft = {
  version: birthStorageVersion,
  birthDate: "1990-01-15",
  hour: "8",
  minute: "30",
  coordinates: `14°21'45.9"N 108°00'23.7"E`,
  gender: "male" as const,
};

const completeProfileInput: BirthProfileInput = {
  name: "Lá số của Anh",
  birthDate: "1990-01-15",
  hour: "8",
  minute: "30",
  coordinates: "10.8231, 106.6297",
  gender: "male",
};

describe("birth draft storage", () => {
  it("saves and reads back the draft fields", () => {
    const storage = new MemoryStorage();

    expect(writeBirthDraft(completeDraft, storage)).toBe(true);
    expect(readBirthDraft(storage)).toEqual(completeDraft);
  });

  it("does not persist birthplace in the draft payload", () => {
    const storage = new MemoryStorage();

    writeBirthDraft(completeDraft, storage);

    expect(storage.getItem(birthDraftStorageKey)).not.toContain("birthplace");
    expect(storage.getItem(birthDraftStorageKey)).not.toContain("birthPlace");
    expect(storage.getItem(birthDraftStorageKey)).not.toContain("placeOfBirth");
  });

  it("ignores invalid JSON without crashing", () => {
    const storage = new MemoryStorage();
    storage.setItem(birthDraftStorageKey, "{not-json");

    expect(readBirthDraft(storage)).toBeNull();
  });

  it("ignores draft data with the wrong version", () => {
    const storage = new MemoryStorage();
    storage.setItem(
      birthDraftStorageKey,
      JSON.stringify({ ...completeDraft, version: 999 }),
    );

    expect(readBirthDraft(storage)).toBeNull();
  });

  it("works without window or localStorage", () => {
    expect(readBirthDraft(null)).toBeNull();
    expect(writeBirthDraft(completeDraft, null)).toBe(false);
  });
});

describe("birth profile storage", () => {
  it("saves profile fields without mutating the input", () => {
    const storage = new MemoryStorage();
    const inputSnapshot = structuredClone(completeProfileInput);
    const result = saveBirthProfile(completeProfileInput, {
      storage,
      idFactory: () => "profile-1",
      nowFactory: () => "2026-08-03T00:00:00.000Z",
    });

    expect(result.ok).toBe(true);
    expect(completeProfileInput).toEqual(inputSnapshot);
    expect(readBirthProfiles(storage)).toEqual([
      {
        id: "profile-1",
        name: "Lá số của Anh",
        birthDate: "1990-01-15",
        hour: "8",
        minute: "30",
        coordinates: "10.8231, 106.6297",
        gender: "male",
        savedAt: "2026-08-03T00:00:00.000Z",
      },
    ]);
    expect(storage.getItem(birthProfilesStorageKey)).not.toContain("birthplace");
  });

  it("ignores profile data with the wrong version", () => {
    const storage = new MemoryStorage();
    storage.setItem(
      birthProfilesStorageKey,
      JSON.stringify({ version: 999, profiles: [completeProfileInput] }),
    );

    expect(readBirthProfiles(storage)).toEqual([]);
  });

  it("does not exceed ten saved profiles", () => {
    const storage = new MemoryStorage();

    for (let index = 0; index < maximumBirthProfiles; index += 1) {
      const result = saveBirthProfile(
        { ...completeProfileInput, name: `Profile ${index}` },
        {
          storage,
          idFactory: () => `profile-${index}`,
          nowFactory: () => `2026-08-03T00:00:0${index}.000Z`,
        },
      );
      expect(result.ok).toBe(true);
    }

    const overflow = saveBirthProfile(
      { ...completeProfileInput, name: "Overflow" },
      { storage, idFactory: () => "overflow" },
    );

    expect(overflow).toMatchObject({ ok: false, reason: "limit" });
    expect(readBirthProfiles(storage)).toHaveLength(maximumBirthProfiles);
  });

  it("generates unique profile IDs", () => {
    const storage = new MemoryStorage();

    saveBirthProfile(completeProfileInput, {
      storage,
      idFactory: () => "same-id",
    });
    saveBirthProfile(
      { ...completeProfileInput, name: "Second profile" },
      { storage, idFactory: () => "same-id" },
    );

    const ids = readBirthProfiles(storage).map(({ id }) => id);
    expect(new Set(ids).size).toBe(2);
  });

  it("deletes one saved profile", () => {
    const storage = new MemoryStorage();
    saveBirthProfile(completeProfileInput, {
      storage,
      idFactory: () => "first",
    });
    saveBirthProfile(
      { ...completeProfileInput, name: "Second profile" },
      { storage, idFactory: () => "second" },
    );

    expect(deleteBirthProfile("first", storage).map(({ id }) => id)).toEqual([
      "second",
    ]);
  });

  it("clears all saved profiles", () => {
    const storage = new MemoryStorage();
    saveBirthProfile(completeProfileInput, {
      storage,
      idFactory: () => "profile-1",
    });

    expect(clearBirthProfiles(storage)).toEqual([]);
    expect(readBirthProfiles(storage)).toEqual([]);
  });

  it("converts a saved profile back to form draft data", () => {
    const storage = new MemoryStorage();
    const result = saveBirthProfile(completeProfileInput, {
      storage,
      idFactory: () => "profile-1",
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(birthProfileToDraft(result.profile)).toEqual({
        version: birthStorageVersion,
        birthDate: completeProfileInput.birthDate,
        hour: completeProfileInput.hour,
        minute: completeProfileInput.minute,
        coordinates: completeProfileInput.coordinates,
        gender: completeProfileInput.gender,
      });
    }
  });

  it("works without window or localStorage", () => {
    expect(readBirthProfiles(null)).toEqual([]);
    expect(saveBirthProfile(completeProfileInput, { storage: null })).toEqual({
      ok: false,
      reason: "storage-unavailable",
      profiles: [],
    });
  });
});
