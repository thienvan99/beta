import { isValidBirthData, type BirthData } from "./birth-data";

export const activeBirthSessionStorageKey = "thienvan.active-birth-session.v1";
export const activeBirthSessionVersion = 1;

export type ActiveBirthSession = Readonly<{
  version: typeof activeBirthSessionVersion;
  birthData: BirthData;
}>;

type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

function getSessionStorage(): StorageLike | null {
  if (typeof window === "undefined") return null;

  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

function sanitizeActiveBirthSession(value: unknown): ActiveBirthSession | null {
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value) ||
    !("version" in value) ||
    !("birthData" in value) ||
    value.version !== activeBirthSessionVersion ||
    typeof value.birthData !== "object" ||
    value.birthData === null ||
    Array.isArray(value.birthData) ||
    !isValidBirthData(value.birthData as Record<keyof BirthData, string>)
  ) {
    return null;
  }

  return {
    version: activeBirthSessionVersion,
    birthData: { ...(value.birthData as BirthData) },
  };
}

export function readActiveBirthSession(
  storage: StorageLike | null = getSessionStorage(),
) {
  if (!storage) return null;

  try {
    const raw = storage.getItem(activeBirthSessionStorageKey);
    if (!raw) return null;
    const session = sanitizeActiveBirthSession(JSON.parse(raw) as unknown);
    if (!session) storage.removeItem(activeBirthSessionStorageKey);
    return session;
  } catch {
    try {
      storage.removeItem(activeBirthSessionStorageKey);
    } catch {}
    return null;
  }
}

export function writeActiveBirthSession(
  birthData: BirthData,
  storage: StorageLike | null = getSessionStorage(),
) {
  if (!storage || !isValidBirthData(birthData)) return false;

  try {
    storage.setItem(
      activeBirthSessionStorageKey,
      JSON.stringify({ version: activeBirthSessionVersion, birthData }),
    );
    return true;
  } catch {
    return false;
  }
}

export function clearActiveBirthSession(
  storage: StorageLike | null = getSessionStorage(),
) {
  if (!storage) return false;

  try {
    storage.removeItem(activeBirthSessionStorageKey);
    return true;
  } catch {
    return false;
  }
}
