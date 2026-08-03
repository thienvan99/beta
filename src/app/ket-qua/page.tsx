import Link from "next/link";
import {
  ArrowLeft,
  CalendarClock,
  Clock3,
  Globe2,
  Navigation,
  UserRound,
} from "lucide-react";
import { ResultTabs } from "@/components/result-tabs";
import { SiteHeader } from "@/components/site-header";
import {
  birthFields,
  formatBirthDate,
  getGenderLabel,
  isValidBirthData,
  type BirthDataCandidate,
} from "@/lib/birth-data";
import { calculateBirthTime } from "@/lib/birth-time";
import {
  PlacidusCalculationError,
  calculateWesternAstrology,
} from "@/lib/western-astrology";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function readSearchParam(
  searchParams: Awaited<SearchParams>,
  field: (typeof birthFields)[number],
) {
  const value = searchParams[field];
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

function formatCoordinate(value: string) {
  const coordinate = Number(value);
  const normalized = Object.is(coordinate, -0) ? 0 : coordinate;
  return normalized.toFixed(6).replace(/\.?0+$/, "");
}

function InvalidResult() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="rounded-lg border border-[#d7dfdc] bg-white p-7 text-center sm:p-10">
          <h1 className="text-2xl font-semibold text-[#183634]">
            Chưa có thông tin sinh hợp lệ
          </h1>
          <p className="mt-3 text-[#687673]">
            Vui lòng quay lại và hoàn tất các trường bắt buộc.
          </p>
          <Link
            href="/"
            className="mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#153433] px-5 font-semibold text-white focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#153433]"
          >
            <ArrowLeft aria-hidden="true" size={18} />
            Nhập lại thông tin
          </Link>
        </section>
      </main>
    </div>
  );
}

export default async function ResultPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const birthDataCandidate = Object.fromEntries(
    birthFields.map((field) => [field, readSearchParam(params, field)]),
  ) as BirthDataCandidate;

  if (!isValidBirthData(birthDataCandidate)) {
    return <InvalidResult />;
  }

  const birthData = birthDataCandidate;
  const birthTime = calculateBirthTime({
    birthDate: birthData.birthDate,
    hour: birthData.hour,
    minute: birthData.minute,
    timeZone: birthData.timezone,
  });

  if (!birthTime) {
    return <InvalidResult />;
  }

  const localDateTime = `${formatBirthDate(birthData.birthDate)} · ${birthData.hour.padStart(2, "0")}:${birthData.minute.padStart(2, "0")}`;
  const summaryItems = [
    {
      label: "Ngày giờ sinh địa phương",
      value: localDateTime,
      icon: CalendarClock,
    },
    {
      label: "Tọa độ",
      value: `${formatCoordinate(birthData.latitude)}, ${formatCoordinate(birthData.longitude)}`,
      icon: Navigation,
    },
    { label: "IANA timezone", value: birthData.timezone, icon: Globe2 },
    { label: "UTC offset", value: birthTime.utcOffset, icon: Clock3 },
    { label: "Thời gian UTC", value: birthTime.utcDateTime, icon: Clock3 },
    { label: "Giới tính", value: getGenderLabel(birthData.gender), icon: UserRound },
  ];
  let westernAstrology;
  let westernAstrologyError: string | undefined;

  try {
    westernAstrology = calculateWesternAstrology({
      localDateTime: birthTime.localDateTime,
      utcDateTime: birthTime.utcDateTime,
      latitude: Number(birthData.latitude),
      longitude: Number(birthData.longitude),
      timeZone: birthData.timezone,
    });
  } catch (error) {
    westernAstrologyError =
      error instanceof PlacidusCalculationError
        ? error.message
        : "Không thể tính dữ liệu Chiêm tinh Tây phương từ thông tin sinh này.";
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-[#a94f2c]">Kết quả</p>
            <h1 className="mt-2 text-3xl font-semibold text-[#153433] sm:text-4xl">
              Hồ sơ Thiên Vận
            </h1>
          </div>
          <Link
            href="/"
            className="inline-flex h-10 w-fit items-center gap-2 rounded-md border border-[#bdc9c6] bg-white px-4 text-sm font-semibold text-[#294542] transition hover:border-[#7f9691] hover:bg-[#f8faf9] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#1c6d68]"
          >
            <ArrowLeft aria-hidden="true" size={17} />
            Chỉnh sửa thông tin
          </Link>
        </div>

        <section
          className="mb-8 rounded-lg border border-[#d7dfdc] bg-white p-5 sm:p-7"
          aria-labelledby="birth-summary-title"
        >
          <h2 id="birth-summary-title" className="text-lg font-semibold text-[#193331]">
            Thông tin đã chuẩn hóa
          </h2>
          <dl className="mt-5 grid gap-x-8 gap-y-5 border-t border-[#e1e6e4] pt-5 sm:grid-cols-2 lg:grid-cols-4">
            {summaryItems.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className={
                  label === "Thời gian UTC"
                    ? "lg:col-span-2"
                    : ""
                }
              >
                <dt className="flex items-center gap-2 text-sm font-medium text-[#71807d]">
                  <Icon aria-hidden="true" size={16} className="text-[#1c6d68]" />
                  {label}
                </dt>
                <dd className="mt-1.5 break-words text-[15px] font-semibold text-[#213c39]">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <ResultTabs
          westernAstrology={westernAstrology}
          westernAstrologyError={westernAstrologyError}
        />
      </main>
    </div>
  );
}
