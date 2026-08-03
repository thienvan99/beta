import { Temporal } from "temporal-polyfill";

export type BirthTimeInput = {
  birthDate: string;
  hour: string;
  minute: string;
  timeZone: string;
};

export type BirthTimeDetails = Readonly<{
  localDateTime: string;
  utcOffset: string;
  utcDateTime: string;
}>;

const fixedOffsetZonePattern =
  /^(?:UTC|GMT|Etc\/(?:UTC|GMT(?:0|[+-]\d{1,2})?))$/i;

export function isValidIanaTimeZone(timeZone: string) {
  const candidate = timeZone.trim();

  if (!candidate || fixedOffsetZonePattern.test(candidate)) {
    return false;
  }

  try {
    Temporal.ZonedDateTime.from({
      year: 2000,
      month: 1,
      day: 1,
      timeZone: candidate,
    });
    return true;
  } catch {
    return false;
  }
}

export function calculateBirthTime(
  input: BirthTimeInput,
): BirthTimeDetails | null {
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(input.birthDate);
  const hour = Number(input.hour);
  const minute = Number(input.minute);
  const timeZone = input.timeZone.trim();

  if (
    !dateMatch ||
    !Number.isInteger(hour) ||
    hour < 0 ||
    hour > 23 ||
    !Number.isInteger(minute) ||
    minute < 0 ||
    minute > 59 ||
    !isValidIanaTimeZone(timeZone)
  ) {
    return null;
  }

  try {
    const zonedDateTime = Temporal.ZonedDateTime.from(
      {
        year: Number(dateMatch[1]),
        month: Number(dateMatch[2]),
        day: Number(dateMatch[3]),
        hour,
        minute,
        second: 0,
        timeZone,
      },
      { disambiguation: "compatible", overflow: "reject" },
    );

    return {
      localDateTime: `${input.birthDate}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`,
      utcOffset: zonedDateTime.offset,
      utcDateTime: zonedDateTime.toInstant().toString(),
    };
  } catch {
    return null;
  }
}
