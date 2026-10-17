"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ClipboardList,
  FolderOpen,
  Save,
  Trash2,
} from "lucide-react";
import {
  initialBirthData,
  isValidBirthData,
  validateBirthData,
  type BirthDataDraft,
  type BirthErrors,
  type BirthField,
  type Gender,
} from "@/lib/birth-data";
import { writeActiveBirthSession } from "@/lib/active-birth-session";
import { getResultModulePath } from "@/lib/result-modules";
import {
  calculateBirthTime,
  isValidIanaTimeZone,
} from "@/lib/birth-time";
import {
  birthProfileToDraft,
  birthStorageVersion,
  clearBirthProfiles,
  deleteBirthProfile,
  maximumBirthProfiles,
  readBirthDraft,
  readBirthProfiles,
  saveBirthProfile,
  writeBirthDraft,
  type StoredBirthDraft,
  type StoredBirthProfile,
} from "@/lib/birth-profile-storage";
import { parseCoordinates } from "@/lib/coordinates";
import { isGitHubPages } from "@/config/deployment";
import { BirthPlaceSearch } from "./birth-place-search";
import type { BirthPlace } from "@/lib/place-search";

const inputClassName =
  "mt-2 h-11 w-full rounded-md border border-[#cad3d0] bg-white px-3 text-[15px] text-[#182a29] outline-none transition placeholder:text-[#95a19f] focus:border-[#1c6d68] focus:ring-3 focus:ring-[#1c6d68]/12 disabled:cursor-not-allowed disabled:bg-[#edf1f0]";

const coordinateErrorMessage =
  `Không nhận diện được tọa độ. Hãy sao chép tọa độ từ Google Maps, ví dụ: 14°21'45.9"N 108°00'23.7"E`;

const timeZoneLookupErrorMessage =
  "Không xác định được múi giờ từ tọa độ. Hãy nhập IANA timezone hợp lệ, ví dụ: Asia/Ho_Chi_Minh.";

const privacyMessage =
  "Bản nháp và hồ sơ được lưu trên trình duyệt của thiết bị này. Dịch vụ tìm địa chỉ chỉ nhận nội dung ô Nơi sinh khi bạn bấm Tìm, không nhận ngày giờ sinh hay giới tính. Bạn có thể xóa hồ sơ bất kỳ lúc nào.";

const coordinateHelpId = "coordinates-help";
const coordinateFeedbackId = "coordinates-feedback";
const coordinateErrorId = "coordinates-error";

type FieldProps = {
  children: ReactNode;
  error?: string;
  htmlFor: string;
  label: string;
};

type TextBirthField = Exclude<
  BirthField,
  "latitude" | "longitude" | "timezone" | "gender"
>;

type TimeZoneStatus = "idle" | "loading" | "resolved" | "manual" | "error";
type StorageMessage = Readonly<{ tone: "success" | "error"; text: string }>;

function FormField({ children, error, htmlFor, label }: FieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-sm font-semibold text-[#2d4140]">
        {label} <span className="text-[#a94f2c]">*</span>
      </label>
      {children}
      <p
        id={`${htmlFor}-error`}
        className="mt-1.5 min-h-5 text-sm text-[#a23b2a]"
        role={error ? "alert" : undefined}
      >
        {error ?? ""}
      </p>
    </div>
  );
}

export function BirthInformationForm() {
  const router = useRouter();
  const manualTimeZoneRef = useRef(false);
  const [values, setValues] = useState<BirthDataDraft>(initialBirthData);
  const [errors, setErrors] = useState<BirthErrors>({});
  const [coordinateInput, setCoordinateInput] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<BirthPlace | null>(null);
  const [placeSearchRevision, setPlaceSearchRevision] = useState(0);
  const [coordinateTouched, setCoordinateTouched] = useState(false);
  const [draftReady, setDraftReady] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [savedProfiles, setSavedProfiles] = useState<StoredBirthProfile[]>([]);
  const [storageMessage, setStorageMessage] =
    useState<StorageMessage | null>(null);
  const [timeZoneStatus, setTimeZoneStatus] =
    useState<TimeZoneStatus>("idle");
  const recognizedCoordinates = parseCoordinates(coordinateInput);
  const timeZoneIsValid = isValidIanaTimeZone(values.timezone);
  const birthTime = calculateBirthTime({
    birthDate: values.birthDate,
    hour: values.hour,
    minute: values.minute,
    timeZone: values.timezone,
  });
  const coordinateError = coordinateInput.trim()
    ? recognizedCoordinates
      ? undefined
      : coordinateErrorMessage
    : coordinateTouched
      ? "Thông tin này là bắt buộc."
      : undefined;
  const timeZoneError = errors.timezone
    ? errors.timezone
    : timeZoneStatus === "error" && !values.timezone
      ? timeZoneLookupErrorMessage
      : values.timezone && !timeZoneIsValid
        ? "Múi giờ không hợp lệ. Hãy dùng IANA timezone, ví dụ: Asia/Ho_Chi_Minh."
        : undefined;

  function applyDraft(draft: StoredBirthDraft) {
    setSelectedPlace(null);
    setPlaceSearchRevision(current => current + 1);
    const coordinates = parseCoordinates(draft.coordinates);
    manualTimeZoneRef.current = false;
    setCoordinateInput(draft.coordinates);
    setCoordinateTouched(false);
    setValues({
      ...initialBirthData,
      birthDate: draft.birthDate,
      hour: draft.hour,
      minute: draft.minute,
      latitude: coordinates ? String(coordinates.latitude) : "",
      longitude: coordinates ? String(coordinates.longitude) : "",
      timezone: "Asia/Ho_Chi_Minh",
      gender: draft.gender,
    });
    setErrors({});
    setTimeZoneStatus(coordinates && !isGitHubPages ? "loading" : "idle");
  }

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const draft = readBirthDraft();

      if (draft) {
        applyDraft(draft);
      }

      setSavedProfiles(readBirthProfiles());
      setDraftReady(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!draftReady) {
      return;
    }

    writeBirthDraft({
      version: birthStorageVersion,
      birthDate: values.birthDate,
      hour: values.hour,
      minute: values.minute,
      coordinates: coordinateInput,
      gender: values.gender,
    });
  }, [
    coordinateInput,
    draftReady,
    values.birthDate,
    values.gender,
    values.hour,
    values.minute,
  ]);

  useEffect(() => {
    const coordinates = parseCoordinates(coordinateInput);

    if (!coordinates || isGitHubPages) {
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      try {
        const response = await fetch("/api/timezone", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(coordinates),
          signal: controller.signal,
        });
        const result = (await response.json()) as { timeZone?: unknown };

        if (manualTimeZoneRef.current) {
          return;
        }

        if (
          !response.ok ||
          typeof result.timeZone !== "string" ||
          !isValidIanaTimeZone(result.timeZone)
        ) {
          setTimeZoneStatus("error");
          return;
        }

        setValues((current) => ({
          ...current,
          timezone: result.timeZone as string,
        }));
        setErrors((current) => ({ ...current, timezone: undefined }));
        setTimeZoneStatus("resolved");
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }

        if (!manualTimeZoneRef.current) {
          setTimeZoneStatus("error");
        }
      }
    }, 250);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [coordinateInput]);

  function updateField(field: TextBirthField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));

    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  }

  function fieldProps(field: TextBirthField) {
    return {
      id: field,
      name: field,
      value: values[field],
      onChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
      ) => updateField(field, event.target.value),
      "aria-describedby": `${field}-error`,
      "aria-invalid": Boolean(errors[field]),
    };
  }

  function updateCoordinates(input: string) {
    setSelectedPlace(null);
    const parsed = parseCoordinates(input);
    manualTimeZoneRef.current = false;
    setCoordinateInput(input);
    setTimeZoneStatus(parsed && !isGitHubPages ? "loading" : "idle");
    setValues((current) => ({
      ...current,
      latitude: parsed ? String(parsed.latitude) : "",
      longitude: parsed ? String(parsed.longitude) : "",
      timezone: "Asia/Ho_Chi_Minh",
    }));
    setErrors((current) => ({
      ...current,
      latitude: undefined,
      longitude: undefined,
      timezone: undefined,
    }));
  }

  function updateTimeZone(timeZone: string) {
    manualTimeZoneRef.current = true;
    setValues((current) => ({ ...current, timezone: timeZone }));
    setTimeZoneStatus("manual");
    setErrors((current) => ({ ...current, timezone: undefined }));
  }

  function updateGender(gender: Gender | "") {
    setValues((current) => ({ ...current, gender }));

    if (errors.gender) {
      setErrors((current) => ({ ...current, gender: undefined }));
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCoordinateTouched(true);

    const submissionValues: BirthDataDraft = recognizedCoordinates
      ? {
          ...values,
          latitude: String(recognizedCoordinates.latitude),
          longitude: String(recognizedCoordinates.longitude),
          timezone: values.timezone.trim(),
        }
      : { ...values, latitude: "", longitude: "" };
    const nextErrors = validateBirthData(submissionValues);

    if (!isValidBirthData(submissionValues)) {
      const invalidInputOrder = [
        nextErrors.birthDate && "birthDate",
        nextErrors.hour && "hour",
        nextErrors.minute && "minute",
        (nextErrors.latitude || nextErrors.longitude) && "coordinates",
        nextErrors.timezone && "timezone",
        nextErrors.gender && "gender",
      ];
      const firstInvalidField = invalidInputOrder.find(Boolean);

      setErrors(nextErrors);
      if (firstInvalidField) {
        if (firstInvalidField === "coordinates") {
          const details = document.getElementById("manual-coordinates");
          if (details instanceof HTMLDetailsElement) details.open = true;
        }
        document.getElementById(firstInvalidField)?.focus();
      }
      return;
    }

    if (!writeActiveBirthSession(submissionValues)) {
      setStorageMessage({
        tone: "error",
        text: "Không thể mở kết quả trong phiên này. Hãy kiểm tra quyền lưu trữ của trình duyệt rồi thử lại.",
      });
      return;
    }

    router.push(getResultModulePath("bat-tu"));
  }

  function formatSavedAt(value: string) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "Không rõ thời điểm";
    }

    return new Intl.DateTimeFormat("vi-VN", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(date);
  }

  function handleSaveProfile() {
    if (!recognizedCoordinates) {
      setCoordinateTouched(true);
      setStorageMessage({
        tone: "error",
        text: "Cần tọa độ hợp lệ trước khi lưu thông tin này.",
      });
      return;
    }

    const result = saveBirthProfile({
      name: profileName,
      birthDate: values.birthDate,
      hour: values.hour,
      minute: values.minute,
      coordinates: coordinateInput,
      gender: values.gender,
    });

    if (result.ok) {
      setSavedProfiles(result.profiles);
      setProfileName("");
      setStorageMessage({
        tone: "success",
        text: `Đã lưu “${result.profile.name}”.`,
      });
      return;
    }

    if (result.reason === "limit") {
      setStorageMessage({
        tone: "error",
        text: `Bạn đã lưu tối đa ${maximumBirthProfiles} hồ sơ. Hãy xóa một hồ sơ cũ trước khi lưu thêm.`,
      });
      return;
    }

    setStorageMessage({
      tone: "error",
      text:
        result.reason === "storage-unavailable"
          ? "Không thể truy cập bộ nhớ trình duyệt để lưu hồ sơ."
          : "Hãy nhập tên gợi nhớ và hoàn tất ngày, giờ, phút, tọa độ, giới tính trước khi lưu.",
    });
  }

  function handleOpenProfile(profile: StoredBirthProfile) {
    applyDraft(birthProfileToDraft(profile));
    setStorageMessage({
      tone: "success",
      text: isGitHubPages
        ? `Đã mở “${profile.name}” vào form với tọa độ đã lưu. Múi giờ mặc định là Asia/Ho_Chi_Minh, bạn có thể sửa nếu nơi sinh khác.`
        : `Đã mở “${profile.name}” vào form. Múi giờ sẽ được tính lại từ tọa độ.`,
    });
  }

  function handleDeleteProfile(profile: StoredBirthProfile) {
    const nextProfiles = deleteBirthProfile(profile.id);
    setSavedProfiles(nextProfiles);
    setStorageMessage({
      tone: "success",
      text: `Đã xóa “${profile.name}”.`,
    });
  }

  function handleClearProfiles() {
    if (
      !window.confirm(
        "Xóa tất cả thông tin sinh đã lưu trên trình duyệt này?",
      )
    ) {
      return;
    }

    setSavedProfiles(clearBirthProfiles());
    setStorageMessage({
      tone: "success",
      text: "Đã xóa tất cả hồ sơ đã lưu.",
    });
  }

  return (
    <div className="space-y-6">
      <section
        className="rounded-lg border border-[#d7dfdc] bg-white p-5 shadow-[0_18px_50px_rgba(31,55,53,0.08)] sm:p-7"
        aria-labelledby="birth-form-title"
      >
        <div className="mb-7 flex items-center gap-3 border-b border-[#e1e6e4] pb-5">
          <span className="flex size-10 items-center justify-center rounded-md bg-[#e5efec] text-[#1c6d68]">
            <ClipboardList aria-hidden="true" size={20} />
          </span>
          <div>
            <h2 id="birth-form-title" className="text-xl font-semibold text-[#193331]">
              Thông tin sinh
            </h2>
            <p className="mt-0.5 text-sm text-[#6a7775]">Các trường có dấu * là bắt buộc</p>
          </div>
        </div>

        <form noValidate onSubmit={handleSubmit}>
          <div className="grid gap-x-4 sm:grid-cols-2">
            <FormField
              htmlFor="birthDate"
              label="Ngày sinh"
              error={errors.birthDate}
            >
              <input
                {...fieldProps("birthDate")}
                type="date"
                required
                className={inputClassName}
              />
            </FormField>

            <div className="grid grid-cols-2 gap-3">
              <FormField htmlFor="hour" label="Giờ sinh" error={errors.hour}>
                <input
                  {...fieldProps("hour")}
                  type="number"
                  min="0"
                  max="23"
                  step="1"
                  inputMode="numeric"
                  placeholder="0–23"
                  required
                  className={inputClassName}
                />
              </FormField>

              <FormField htmlFor="minute" label="Phút sinh" error={errors.minute}>
                <input
                  {...fieldProps("minute")}
                  type="number"
                  min="0"
                  max="59"
                  step="1"
                  inputMode="numeric"
                  placeholder="0–59"
                  required
                  className={inputClassName}
                />
              </FormField>
            </div>

            <div className="sm:col-span-2">
              <BirthPlaceSearch key={placeSearchRevision} selected={selectedPlace}
                onClear={() => { if (coordinateInput) updateCoordinates(""); }}
                onSelect={place => {
                  updateCoordinates(`${place.latitude}, ${place.longitude}`);
                  setSelectedPlace(place);
                }} />
              {recognizedCoordinates && !selectedPlace && <p className="mt-3 text-sm text-[#315450]">Đang dùng tọa độ đã nhập hoặc đã lưu. Bạn có thể tìm nơi sinh mới hoặc xem tọa độ bên dưới.</p>}
              <details id="manual-coordinates" className="mt-4 rounded-md border border-[#d7dfdc] p-3">
              <summary className="cursor-pointer text-base font-semibold text-[#1c6d68] focus-visible:outline-3 focus-visible:outline-offset-2">Nhập tọa độ thủ công / xem chi tiết</summary>
              <div className="mt-3">
              <label htmlFor="coordinates" className="text-sm font-semibold text-[#2d4140]">
                Tọa độ nơi sinh <span className="text-[#a94f2c]">*</span>
              </label>
              <input
                id="coordinates"
                name="coordinates"
                type="text"
                value={coordinateInput}
                onChange={(event) => updateCoordinates(event.target.value)}
                onBlur={() => setCoordinateTouched(true)}
                placeholder={`14°21'45.9"N 108°00'23.7"E`}
                required
                spellCheck={false}
                autoComplete="off"
                aria-describedby={`${coordinateHelpId} ${coordinateFeedbackId} ${coordinateErrorId}`}
                aria-invalid={Boolean(coordinateError)}
                className={inputClassName}
              />

              <div
                id={coordinateHelpId}
                className="mt-3 rounded-md border border-[#d7dfdc] bg-[#f8faf9] p-3 text-sm leading-6 text-[#536562]"
              >
                <p className="font-semibold text-[#294542]">
                  Có thể nhập một trong hai cách:
                </p>
                <ul className="mt-2 space-y-1">
                  <li>
                    Thập phân:{" "}
                    <code className="break-all rounded bg-white px-1.5 py-0.5 text-[#193331]">
                      10.8231, 106.6297
                    </code>
                  </li>
                  <li>
                    DMS:{" "}
                    <code className="break-all rounded bg-white px-1.5 py-0.5 text-[#193331]">
                      {`14°21'45.9"N 108°00'23.7"E`}
                    </code>
                  </li>
                </ul>
                <p className="mt-2">
                  Ký hiệu: N = Bắc, S = Nam, E = Đông, W = Tây.
                </p>
                <details className="mt-2">
                  <summary className="cursor-pointer font-semibold text-[#1c6d68] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#1c6d68]">
                    Cách sao chép tọa độ từ Google Maps
                  </summary>
                  <ol className="mt-2 list-decimal space-y-1 pl-5">
                    <li>Mở Google Maps và chọn đúng nơi sinh.</li>
                    <li>Nhấn hoặc giữ vào vị trí trên bản đồ để hiện ghim.</li>
                    <li>Sao chép dãy số tọa độ, rồi dán vào ô này.</li>
                  </ol>
                </details>
              </div>

              <div id={coordinateFeedbackId} className="mt-2 min-h-24">
                {recognizedCoordinates ? (
                  <dl
                    className="grid gap-x-4 gap-y-1 rounded-md border border-[#c7ddd6] bg-[#f0f7f5] px-3 py-2 text-sm text-[#315450] sm:grid-cols-2"
                    aria-live="polite"
                  >
                    <div className="flex gap-1.5">
                      <dt>Vĩ độ:</dt>
                      <dd className="font-semibold">
                        {recognizedCoordinates.latitude.toFixed(6)}
                      </dd>
                    </div>
                    <div className="flex gap-1.5">
                      <dt>Kinh độ:</dt>
                      <dd className="font-semibold">
                        {recognizedCoordinates.longitude.toFixed(6)}
                      </dd>
                    </div>
                    <div className="flex gap-1.5 sm:col-span-2">
                      <dt>Múi giờ:</dt>
                      <dd className="break-all font-semibold">
                        {timeZoneStatus === "loading"
                          ? "Đang nhận diện..."
                          : values.timezone || "Chưa xác định"}
                      </dd>
                    </div>
                    <div className="flex gap-1.5 sm:col-span-2">
                      <dt>UTC offset tại ngày sinh:</dt>
                      <dd className="font-semibold">
                        {birthTime?.utcOffset ?? "Chờ ngày giờ sinh hợp lệ"}
                      </dd>
                    </div>
                  </dl>
                ) : null}
              </div>
              <p
                id={coordinateErrorId}
                className="mt-1.5 min-h-5 text-sm text-[#a23b2a]"
                role={coordinateError ? "alert" : undefined}
              >
                {coordinateError ?? ""}
              </p>
              </div>
              </details>
            </div>

            <FormField htmlFor="timezone" label="Múi giờ IANA" error={timeZoneError}>
              <input
                id="timezone"
                name="timezone"
                type="text"
                value={values.timezone}
                onChange={(event) => updateTimeZone(event.target.value)}
                placeholder="Asia/Ho_Chi_Minh"
                required
                spellCheck={false}
                autoComplete="off"
                aria-busy={timeZoneStatus === "loading"}
                aria-describedby="timezone-error"
                aria-invalid={Boolean(timeZoneError)}
                className={inputClassName}
              />
            </FormField>

            <FormField htmlFor="gender" label="Giới tính" error={errors.gender}>
              <select
                id="gender"
                name="gender"
                value={values.gender}
                onChange={(event) => updateGender(event.target.value as Gender | "")}
                required
                aria-describedby="gender-error"
                aria-invalid={Boolean(errors.gender)}
                className={inputClassName}
              >
                <option value="">Chọn giới tính</option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
              </select>
            </FormField>
          </div>

          <button
            type="submit"
            disabled={!recognizedCoordinates || !timeZoneIsValid}
            className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#a94f2c] px-5 font-semibold text-white transition hover:bg-[#8f4024] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#a94f2c] active:translate-y-px disabled:cursor-not-allowed disabled:bg-[#aeb8b5] disabled:text-[#f5f7f6] disabled:hover:bg-[#aeb8b5] disabled:active:translate-y-0"
          >
            Lập lá số
            <ArrowRight aria-hidden="true" size={19} />
          </button>
        </form>
      </section>

      <section
        className="rounded-lg border border-[#d7dfdc] bg-white p-5 shadow-[0_18px_50px_rgba(31,55,53,0.06)] sm:p-7"
        aria-labelledby="saved-profiles-title"
      >
        <div className="flex flex-col gap-3 border-b border-[#e1e6e4] pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2
              id="saved-profiles-title"
              className="text-xl font-semibold text-[#193331]"
            >
              Thông tin đã lưu
            </h2>
            <p className="mt-1 text-sm leading-6 text-[#687673]">
              {privacyMessage}
            </p>
          </div>
          <p className="text-sm font-medium text-[#687673]">
            {savedProfiles.length}/{maximumBirthProfiles} hồ sơ
          </p>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
          <label className="block">
            <span className="text-sm font-semibold text-[#2d4140]">
              Tên gợi nhớ
            </span>
            <input
              id="profileName"
              name="profileName"
              type="text"
              value={profileName}
              onChange={(event) => setProfileName(event.target.value)}
              placeholder="Ví dụ: Lá số của Anh"
              className={inputClassName}
            />
          </label>
          <button
            type="button"
            onClick={handleSaveProfile}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#153433] px-4 text-sm font-semibold text-white transition hover:bg-[#214946] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#153433] sm:self-end"
          >
            <Save aria-hidden="true" size={17} />
            Lưu thông tin này
          </button>
        </div>

        {storageMessage ? (
          <p
            role="status"
            className={`mt-3 rounded-md px-3 py-2 text-sm font-medium ${
              storageMessage.tone === "success"
                ? "bg-[#eef6f3] text-[#275a53]"
                : "bg-[#fbebe6] text-[#9b3f27]"
            }`}
          >
            {storageMessage.text}
          </p>
        ) : null}

        <div className="mt-5">
          {savedProfiles.length === 0 ? (
            <p className="rounded-md border border-dashed border-[#cbd7d4] px-4 py-5 text-sm text-[#687673]">
              Chưa có hồ sơ nào được lưu trên trình duyệt này.
            </p>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleClearProfiles}
                  className="inline-flex min-h-10 items-center gap-2 rounded-md border border-[#c99f90] bg-white px-3 text-sm font-semibold text-[#9b3f27] transition hover:bg-[#fbebe6] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#9b3f27]"
                >
                  <Trash2 aria-hidden="true" size={16} />
                  Xóa tất cả
                </button>
              </div>

              <ul className="space-y-3">
                {savedProfiles.map((profile) => (
                  <li
                    key={profile.id}
                    className="rounded-lg border border-[#d7dfdc] bg-[#fbfcfb] p-4"
                  >
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <h3 className="text-base font-semibold text-[#193331]">
                          {profile.name}
                        </h3>
                        <dl className="mt-2 grid gap-x-5 gap-y-1 text-sm text-[#536562] sm:grid-cols-2">
                          <div>
                            <dt className="sr-only">Ngày sinh</dt>
                            <dd>
                              {profile.birthDate} · {profile.hour.padStart(2, "0")}:
                              {profile.minute.padStart(2, "0")}
                            </dd>
                          </div>
                          <div>
                            <dt className="sr-only">Giới tính</dt>
                            <dd>{profile.gender === "male" ? "Nam" : "Nữ"}</dd>
                          </div>
                          <div className="sm:col-span-2">
                            <dt className="sr-only">Tọa độ</dt>
                            <dd className="break-words">{profile.coordinates}</dd>
                          </div>
                          <div className="sm:col-span-2">
                            <dt className="sr-only">Thời điểm lưu</dt>
                            <dd>Đã lưu: {formatSavedAt(profile.savedAt)}</dd>
                          </div>
                        </dl>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenProfile(profile)}
                          className="inline-flex min-h-10 items-center gap-2 rounded-md border border-[#b9c8c4] bg-white px-3 text-sm font-semibold text-[#294542] transition hover:border-[#7f9691] hover:bg-[#f8faf9] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#1c6d68]"
                        >
                          <FolderOpen aria-hidden="true" size={16} />
                          Mở lại
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProfile(profile)}
                          className="inline-flex min-h-10 items-center gap-2 rounded-md border border-[#c99f90] bg-white px-3 text-sm font-semibold text-[#9b3f27] transition hover:bg-[#fbebe6] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#9b3f27]"
                        >
                          <Trash2 aria-hidden="true" size={16} />
                          Xóa
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
