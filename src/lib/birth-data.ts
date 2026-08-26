import { calculateBirthTime, isValidIanaTimeZone } from "./birth-time";

export const birthFields = [
  "birthDate",
  "hour",
  "minute",
  "latitude",
  "longitude",
  "timezone",
  "gender",
] as const;

export type BirthField = (typeof birthFields)[number];
export type Gender = "male" | "female";

export type BirthData = {
  birthDate: string;
  hour: string;
  minute: string;
  latitude: string;
  longitude: string;
  timezone: string;
  gender: Gender;
};

export type BirthDataCandidate = Omit<BirthData, "gender"> & {
  gender: string;
};

export type BirthDataDraft = Omit<BirthData, "gender"> & {
  gender: Gender | "";
};

export type BirthErrors = Partial<Record<BirthField, string>>;

export const initialBirthData: BirthDataDraft = {
  birthDate: "",
  hour: "",
  minute: "",
  latitude: "",
  longitude: "",
  timezone: "",
  gender: "",
};

function isValidCalendarDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) {
    return false;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

function isNumberInRange(value: string, minimum: number, maximum: number) {
  const number = Number(value);
  return Number.isFinite(number) && number >= minimum && number <= maximum;
}

export function validateBirthData(data: BirthDataCandidate): BirthErrors {
  const errors: BirthErrors = {};

  for (const field of birthFields) {
    if (!data[field].trim()) {
      errors[field] = "Thông tin này là bắt buộc.";
    }
  }

  if (data.birthDate && !isValidCalendarDate(data.birthDate)) {
    errors.birthDate = "Ngày sinh không hợp lệ.";
  }

  if (
    data.hour &&
    (!Number.isInteger(Number(data.hour)) ||
      !isNumberInRange(data.hour, 0, 23))
  ) {
    errors.hour = "Giờ phải từ 0 đến 23.";
  }

  if (
    data.minute &&
    (!Number.isInteger(Number(data.minute)) ||
      !isNumberInRange(data.minute, 0, 59))
  ) {
    errors.minute = "Phút phải từ 0 đến 59.";
  }

  if (data.latitude && !isNumberInRange(data.latitude, -90, 90)) {
    errors.latitude = "Vĩ độ phải từ -90 đến 90.";
  }

  if (data.longitude && !isNumberInRange(data.longitude, -180, 180)) {
    errors.longitude = "Kinh độ phải từ -180 đến 180.";
  }

  if (data.timezone && !isValidIanaTimeZone(data.timezone)) {
    errors.timezone =
      "Múi giờ không hợp lệ. Hãy dùng IANA timezone, ví dụ: Asia/Ho_Chi_Minh.";
  }

  if (data.gender && data.gender !== "male" && data.gender !== "female") {
    errors.gender = "Giới tính không hợp lệ.";
  }

  if (
    !errors.birthDate &&
    !errors.hour &&
    !errors.minute &&
    !errors.timezone &&
    !calculateBirthTime({
      birthDate: data.birthDate,
      hour: data.hour,
      minute: data.minute,
      timeZone: data.timezone,
    })
  ) {
    errors.timezone = "Không thể xác định thời gian UTC từ múi giờ đã chọn.";
  }

  return errors;
}

export function isValidBirthData(
  data: BirthDataCandidate,
): data is BirthData {
  return Object.keys(validateBirthData(data)).length === 0;
}

export function formatBirthDate(value: string) {
  const date = new Date(`${value}T00:00:00.000Z`);

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function getGenderLabel(gender: Gender) {
  return gender === "male" ? "Nam" : "Nữ";
}
