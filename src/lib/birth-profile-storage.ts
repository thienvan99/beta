import type { Gender } from "./birth-data";

export const birthDraftStorageKey = "thienvan.birth-draft.v1";
export const birthProfilesStorageKey = "thienvan.birth-profiles.v1";
export const birthStorageVersion = 1;
export const maximumBirthProfiles = 10;

export type StoredBirthDraft = Readonly<{
  version: typeof birthStorageVersion;
  birthDate: string;
  hour: string;
  minute: string;
  coordinates: string;
  gender: Gender | "";
}>;

export type StoredBirthProfile = Readonly<{
  id: string;
  name: string;
  birthDate: string;
  hour: string;
  minute: string;
  coordinates: string;
  gender: Gender;
  savedAt: string;
}>;

export type BirthProfileInput = Readonly<{
  name: string;
  birthDate: string;
  hour: string;
  minute: string;
  coordinates: string;
  gender: Gender | "";
}>;

export type SaveBirthProfileResult =
  | Readonly<{ ok: true; profile: StoredBirthProfile; profiles: StoredBirthProfile[] }>
  | Readonly<{ ok: false; reason: "limit" | "invalid" | "storage-unavailable"; profiles: StoredBirthProfile[] }>;

type BirthProfilesPayload = Readonly<{
  version: typeof birthStorageVersion;
  profiles: StoredBirthProfile[];
}>;

type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

function getBrowserStorage(): StorageLike | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isGender(value: unknown): value is Gender {
  return value === "male" || value === "female";
}

function isDraftGender(value: unknown): value is Gender | "" {
  return value === "" || isGender(value);
}

function readJson(key: string, storage: StorageLike | null) {
  if (!storage) {
    return null;
  }

  try {
    const raw = storage.getItem(key);
    return raw ? (JSON.parse(raw) as unknown) : null;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown, storage: StorageLike | null) {
  if (!storage) {
    return false;
  }

  try {
    storage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function removeItem(key: string, storage: StorageLike | null) {
  if (!storage) {
    return false;
  }

  try {
    storage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

function sanitizeDraft(value: unknown): StoredBirthDraft | null {
  if (
    !isRecord(value) ||
    value.version !== birthStorageVersion ||
    typeof value.birthDate !== "string" ||
    typeof value.hour !== "string" ||
    typeof value.minute !== "string" ||
    typeof value.coordinates !== "string" ||
    !isDraftGender(value.gender)
  ) {
    return null;
  }

  return {
    version: birthStorageVersion,
    birthDate: value.birthDate,
    hour: value.hour,
    minute: value.minute,
    coordinates: value.coordinates,
    gender: value.gender,
  };
}

function sanitizeProfile(value: unknown): StoredBirthProfile | null {
  if (
    !isRecord(value) ||
    typeof value.id !== "string" ||
    typeof value.name !== "string" ||
    typeof value.birthDate !== "string" ||
    typeof value.hour !== "string" ||
    typeof value.minute !== "string" ||
    typeof value.coordinates !== "string" ||
    !isGender(value.gender) ||
    typeof value.savedAt !== "string"
  ) {
    return null;
  }

  return {
    id: value.id,
    name: value.name,
    birthDate: value.birthDate,
    hour: value.hour,
    minute: value.minute,
    coordinates: value.coordinates,
    gender: value.gender,
    savedAt: value.savedAt,
  };
}

function sanitizeProfilesPayload(value: unknown): StoredBirthProfile[] {
  if (
    !isRecord(value) ||
    value.version !== birthStorageVersion ||
    !Array.isArray(value.profiles)
  ) {
    return [];
  }

  return value.profiles
    .map((profile) => sanitizeProfile(profile))
    .filter((profile): profile is StoredBirthProfile => Boolean(profile))
    .slice(0, maximumBirthProfiles);
}

function defaultIdFactory() {
  const randomUuid = globalThis.crypto?.randomUUID?.();

  if (randomUuid) {
    return randomUuid;
  }

  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

function createUniqueProfileId(
  profiles: ReadonlyArray<StoredBirthProfile>,
  idFactory: () => string,
) {
  const existingIds = new Set(profiles.map(({ id }) => id));
  let candidate = idFactory();

  for (let attempt = 1; existingIds.has(candidate); attempt += 1) {
    candidate = `${idFactory()}-${attempt}`;
  }

  return candidate;
}

function normalizeProfileInput(
  input: BirthProfileInput,
): Omit<StoredBirthProfile, "id" | "savedAt"> | null {
  const name = input.name.trim();
  const birthDate = input.birthDate.trim();
  const hour = input.hour.trim();
  const minute = input.minute.trim();
  const coordinates = input.coordinates.trim();

  if (
    !name ||
    !birthDate ||
    !hour ||
    !minute ||
    !coordinates ||
    !isGender(input.gender)
  ) {
    return null;
  }

  return {
    name,
    birthDate,
    hour,
    minute,
    coordinates,
    gender: input.gender,
  };
}

function writeProfiles(
  profiles: ReadonlyArray<StoredBirthProfile>,
  storage: StorageLike | null,
) {
  const payload: BirthProfilesPayload = {
    version: birthStorageVersion,
    profiles: [...profiles],
  };

  return writeJson(birthProfilesStorageKey, payload, storage);
}

export function readBirthDraft(storage: StorageLike | null = getBrowserStorage()) {
  return sanitizeDraft(readJson(birthDraftStorageKey, storage));
}

export function writeBirthDraft(
  draft: StoredBirthDraft,
  storage: StorageLike | null = getBrowserStorage(),
) {
  const sanitized = sanitizeDraft(draft);

  if (!sanitized) {
    return false;
  }

  return writeJson(birthDraftStorageKey, sanitized, storage);
}

export function clearBirthDraft(storage: StorageLike | null = getBrowserStorage()) {
  return removeItem(birthDraftStorageKey, storage);
}

export function readBirthProfiles(
  storage: StorageLike | null = getBrowserStorage(),
) {
  return sanitizeProfilesPayload(readJson(birthProfilesStorageKey, storage));
}

export function saveBirthProfile(
  input: BirthProfileInput,
  options: Readonly<{
    storage?: StorageLike | null;
    idFactory?: () => string;
    nowFactory?: () => string;
  }> = {},
): SaveBirthProfileResult {
  const storage = options.storage ?? getBrowserStorage();
  const profiles = readBirthProfiles(storage);
  const normalizedInput = normalizeProfileInput(input);

  if (!storage) {
    return { ok: false, reason: "storage-unavailable", profiles };
  }

  if (!normalizedInput) {
    return { ok: false, reason: "invalid", profiles };
  }

  if (profiles.length >= maximumBirthProfiles) {
    return { ok: false, reason: "limit", profiles };
  }

  const profile: StoredBirthProfile = {
    id: createUniqueProfileId(profiles, options.idFactory ?? defaultIdFactory),
    ...normalizedInput,
    savedAt: options.nowFactory?.() ?? new Date().toISOString(),
  };
  const nextProfiles = [profile, ...profiles];

  if (!writeProfiles(nextProfiles, storage)) {
    return { ok: false, reason: "storage-unavailable", profiles };
  }

  return { ok: true, profile, profiles: nextProfiles };
}

export function deleteBirthProfile(
  id: string,
  storage: StorageLike | null = getBrowserStorage(),
) {
  const profiles = readBirthProfiles(storage);
  const nextProfiles = profiles.filter((profile) => profile.id !== id);

  if (!writeProfiles(nextProfiles, storage)) {
    return profiles;
  }

  return nextProfiles;
}

export function clearBirthProfiles(
  storage: StorageLike | null = getBrowserStorage(),
) {
  if (!writeProfiles([], storage)) {
    return readBirthProfiles(storage);
  }

  return [];
}

export function birthProfileToDraft(
  profile: StoredBirthProfile,
): StoredBirthDraft {
  return {
    version: birthStorageVersion,
    birthDate: profile.birthDate,
    hour: profile.hour,
    minute: profile.minute,
    coordinates: profile.coordinates,
    gender: profile.gender,
  };
}
