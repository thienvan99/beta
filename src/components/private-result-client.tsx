"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, CalendarClock, Clock3, Globe2, Navigation, UserRound } from "lucide-react";
import { ResultTabs } from "./result-tabs";
import { SiteHeader } from "./site-header";
import { readActiveBirthSession } from "../lib/active-birth-session";
import { formatBirthDate, getGenderLabel, type BirthData } from "../lib/birth-data";
import { calculateBirthTime } from "../lib/birth-time";
import type { ResultModuleSlug } from "../lib/result-modules";
import { PlacidusCalculationError, calculateWesternAstrology } from "../lib/western-astrology";
import { synthesizeWesternCoreReport } from "../lib/western-core-report-synthesis";

function formatCoordinate(value: string) {
  const coordinate = Number(value);
  const normalized = Object.is(coordinate, -0) ? 0 : coordinate;
  return normalized.toFixed(6).replace(/\.?0+$/, "");
}

function RecoveryState() {
  return (
    <section className="mx-auto max-w-2xl py-8 text-center" aria-labelledby="recovery-title">
      <h2 id="recovery-title" className="text-xl font-semibold text-[#183634]">Chưa có dữ liệu cho phiên này</h2>
      <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-[#687673]">
        Liên kết chỉ mở đúng module và không chứa thông tin sinh cá nhân. Hãy nhập thông tin hoặc chọn hồ sơ đã lưu trên thiết bị này để xem kết quả.
      </p>
      <Link href="/" className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#153433] px-5 font-semibold text-white focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#153433]">
        <ArrowLeft aria-hidden="true" size={18} />
        Nhập hoặc chọn hồ sơ
      </Link>
    </section>
  );
}

export function PrivateResultClient({ activeModule }: { activeModule: ResultModuleSlug }) {
  const [birthData, setBirthData] = useState<BirthData | null | undefined>(undefined);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setBirthData(readActiveBirthSession()?.birthData ?? null);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const result = useMemo(() => {
    if (!birthData) return null;
    const birthTime = calculateBirthTime({
      birthDate: birthData.birthDate,
      hour: birthData.hour,
      minute: birthData.minute,
      timeZone: birthData.timezone,
    });
    if (!birthTime) return null;

    try {
      const westernAstrology = calculateWesternAstrology({
        localDateTime: birthTime.localDateTime,
        utcDateTime: birthTime.utcDateTime,
        latitude: Number(birthData.latitude),
        longitude: Number(birthData.longitude),
        timeZone: birthData.timezone,
      });
      return {
        birthTime,
        westernAstrology,
        westernReportSynthesis: synthesizeWesternCoreReport(westernAstrology),
        westernAstrologyError: undefined,
      };
    } catch (error) {
      return {
        birthTime,
        westernAstrology: undefined,
        westernReportSynthesis: undefined,
        westernAstrologyError: error instanceof PlacidusCalculationError
          ? error.message
          : "Không thể tính dữ liệu Chiêm tinh Tây phương từ thông tin sinh này.",
      };
    }
  }, [birthData]);

  const summaryItems = birthData && result ? [
    { label: "Ngày giờ sinh địa phương", value: `${formatBirthDate(birthData.birthDate)} · ${birthData.hour.padStart(2, "0")}:${birthData.minute.padStart(2, "0")}`, icon: CalendarClock },
    { label: "Tọa độ", value: `${formatCoordinate(birthData.latitude)}, ${formatCoordinate(birthData.longitude)}`, icon: Navigation },
    { label: "IANA timezone", value: birthData.timezone, icon: Globe2 },
    { label: "UTC offset", value: result.birthTime.utcOffset, icon: Clock3 },
    { label: "Thời gian UTC", value: result.birthTime.utcDateTime, icon: Clock3 },
    { label: "Giới tính", value: getGenderLabel(birthData.gender), icon: UserRound },
  ] : [];

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-[#a94f2c]">Kết quả</p>
            <h1 className="mt-2 text-3xl font-semibold text-[#153433] sm:text-4xl">Hồ sơ Thiên Vận</h1>
          </div>
          <Link href="/" className="inline-flex h-10 w-fit items-center gap-2 rounded-md border border-[#bdc9c6] bg-white px-4 text-sm font-semibold text-[#294542] transition hover:border-[#7f9691] hover:bg-[#f8faf9] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#1c6d68]">
            <ArrowLeft aria-hidden="true" size={17} /> Chỉnh sửa thông tin
          </Link>
        </div>

        {birthData && result && (
          <section className="mb-8 rounded-lg border border-[#d7dfdc] bg-white p-5 sm:p-7" aria-labelledby="birth-summary-title">
            <h2 id="birth-summary-title" className="text-lg font-semibold text-[#193331]">Thông tin đã chuẩn hóa</h2>
            <dl className="mt-5 grid gap-x-8 gap-y-5 border-t border-[#e1e6e4] pt-5 sm:grid-cols-2 lg:grid-cols-4">
              {summaryItems.map(({ icon: Icon, label, value }) => (
                <div key={label} className={label === "Thời gian UTC" ? "lg:col-span-2" : ""}>
                  <dt className="flex items-center gap-2 text-sm font-medium text-[#71807d]"><Icon aria-hidden="true" size={16} className="text-[#1c6d68]" />{label}</dt>
                  <dd className="mt-1.5 break-words text-[15px] font-semibold text-[#213c39]">{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <ResultTabs
          activeModule={activeModule}
          recoveryState={birthData === null ? <RecoveryState /> : undefined}
          westernAstrology={result?.westernAstrology}
          westernReportSynthesis={result?.westernReportSynthesis}
          westernAstrologyError={result?.westernAstrologyError}
        />
      </main>
    </div>
  );
}
