"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ClipboardList } from "lucide-react";
import {
  initialBirthData,
  isValidBirthData,
  toBirthDataSearchParams,
  validateBirthData,
  type BirthDataDraft,
  type BirthErrors,
  type BirthField,
  type Gender,
} from "@/lib/birth-data";
import {
  calculateBirthTime,
  isValidIanaTimeZone,
} from "@/lib/birth-time";
import { parseCoordinates } from "@/lib/coordinates";

const inputClassName =
  "mt-2 h-11 w-full rounded-md border border-[#cad3d0] bg-white px-3 text-[15px] text-[#182a29] outline-none transition placeholder:text-[#95a19f] focus:border-[#1c6d68] focus:ring-3 focus:ring-[#1c6d68]/12 disabled:cursor-not-allowed disabled:bg-[#edf1f0]";

const coordinateErrorMessage =
  `Không nhận diện được tọa độ. Hãy sao chép tọa độ từ Google Maps, ví dụ: 14°21'45.9"N 108°00'23.7"E`;

const timeZoneLookupErrorMessage =
  "Không xác định được múi giờ từ tọa độ. Hãy nhập IANA timezone hợp lệ, ví dụ: Asia/Ho_Chi_Minh.";

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
  const [coordinateTouched, setCoordinateTouched] = useState(false);
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

  useEffect(() => {
    const coordinates = parseCoordinates(coordinateInput);

    if (!coordinates) {
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
    const parsed = parseCoordinates(input);
    manualTimeZoneRef.current = false;
    setCoordinateInput(input);
    setTimeZoneStatus(parsed ? "loading" : "idle");
    setValues((current) => ({
      ...current,
      latitude: parsed ? String(parsed.latitude) : "",
      longitude: parsed ? String(parsed.longitude) : "",
      timezone: "",
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
        nextErrors.birthplace && "birthplace",
        (nextErrors.latitude || nextErrors.longitude) && "coordinates",
        nextErrors.timezone && "timezone",
        nextErrors.gender && "gender",
      ];
      const firstInvalidField = invalidInputOrder.find(Boolean);

      setErrors(nextErrors);
      if (firstInvalidField) {
        document.getElementById(firstInvalidField)?.focus();
      }
      return;
    }

    const params = toBirthDataSearchParams(submissionValues);
    router.push(`/ket-qua?${params.toString()}`);
  }

  return (
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
            <FormField
              htmlFor="birthplace"
              label="Nơi sinh"
              error={errors.birthplace}
            >
              <input
                {...fieldProps("birthplace")}
                type="text"
                autoComplete="address-level2"
                placeholder="Ví dụ: Hà Nội, Việt Nam"
                required
                className={inputClassName}
              />
            </FormField>
          </div>

          <div className="sm:col-span-2">
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
              aria-describedby="coordinates-feedback coordinates-error"
              aria-invalid={Boolean(coordinateError)}
              className={inputClassName}
            />

            <div id="coordinates-feedback" className="mt-2 min-h-24">
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
              id="coordinates-error"
              className="mt-1.5 min-h-5 text-sm text-[#a23b2a]"
              role={coordinateError ? "alert" : undefined}
            >
              {coordinateError ?? ""}
            </p>
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
  );
}
