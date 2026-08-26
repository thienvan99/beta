"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { majorAspectConfig } from "@/config/aspect-orbs";
import { WesternAspectInterpretations } from "@/components/western-aspect-interpretations";
import { WesternChartWheel } from "@/components/western-chart-wheel";
import { WesternCoreTriad } from "@/components/western-core-triad";
import {
  HouseCuspContextDisplay,
  HouseRulerDisplay,
  westernBodyLabels,
} from "@/components/western-house-context";
import { WesternPersonalPlanets } from "@/components/western-personal-planets";
import { WesternPlanetHouseInterpretations } from "@/components/western-planet-house-interpretations";
import { WesternReportVersion } from "@/components/western-report-version";
import { WesternSocialPlanets } from "@/components/western-social-planets";
import { SynthesisEvidenceDetails, WesternOverview } from "@/components/western-synthesis-overview";
import type { WesternAstrologyResult } from "@/lib/western-astrology";
import type { WesternCoreReportSynthesis } from "@/lib/western-core-report-synthesis";
import { deriveWesternHouseCuspContexts } from "@/lib/western-house-cusp-context";
import { deriveWesternHouseRulers } from "@/lib/western-house-rulers";
import {
  getResultModulePath,
  resultModules,
  type ResultModuleSlug,
} from "@/lib/result-modules";

type ResultTabsProps = {
  activeModule: ResultModuleSlug;
  recoveryState?: ReactNode;
  westernAstrology?: WesternAstrologyResult;
  westernReportSynthesis?: WesternCoreReportSynthesis;
  westernAstrologyError?: string;
};

const aspectLabels = Object.fromEntries(
  majorAspectConfig.map(({ code, labelVietnamese }) => [
    code,
    labelVietnamese,
  ]),
) as Record<(typeof majorAspectConfig)[number]["code"], string>;

const westernSections = [
  { id: "western-synthesis", label: "Phân tích tổng hợp" },
  { id: "western-core", label: "Nền tảng cốt lõi" },
  { id: "western-personal-planets", label: "Hành tinh cá nhân" },
  {
    id: "western-social-planets",
    label: "Xã hội & xuyên cá nhân",
  },
  { id: "western-chart", label: "Bản đồ sao" },
  { id: "western-bodies", label: "Các thiên thể" },
  { id: "western-houses", label: "ASC/MC và 12 nhà" },
  { id: "western-aspects", label: "Các góc chiếu" },
] as const;

const readingModes = [
  { id: "overview", label: "Tổng quan" },
  { id: "deep-dive", label: "Chuyên sâu" },
] as const;

type ReadingMode = (typeof readingModes)[number]["id"];

function ZodiacName({
  sign,
  signVietnamese,
}: {
  sign: string;
  signVietnamese: string;
}) {
  return (
    <span>
      {signVietnamese}
      <span className="ml-1.5 text-xs text-[#7a8784]">{sign}</span>
    </span>
  );
}

function BackToWesternTop() {
  return (
    <a
      href="#western-result-top"
      className="mt-5 inline-flex min-h-10 items-center rounded-md border border-[#bdc9c6] px-3 text-sm font-semibold text-[#1c6d68] transition hover:border-[#7f9691] hover:bg-[#f8faf9] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#1c6d68]"
    >
      Quay lại đầu phần Tây phương
    </a>
  );
}

function MobileDataTable({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-3">
      <p className="mb-2 text-sm text-[#536562] md:hidden">
        Vuốt ngang hoặc dùng phím mũi tên để xem đủ bảng.
      </p>
      <div
        className="overflow-x-auto overscroll-x-contain rounded-md focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#1c6d68]"
        role="region"
        aria-label={label}
        tabIndex={0}
      >
        {children}
      </div>
    </div>
  );
}

function WesternAstrologyPanel({
  result,
  synthesis,
  error,
}: {
  result?: WesternAstrologyResult;
  synthesis?: WesternCoreReportSynthesis;
  error?: string;
}) {
  const [readingMode, setReadingMode] = useState<ReadingMode>("overview");
  const modeRefs = useRef<Array<HTMLButtonElement | null>>([]);

  if (error || !result || !synthesis) {
    return (
      <p role="alert" className="text-sm font-medium text-[#9b3f27]">
        {error ?? "Không thể tính dữ liệu Chiêm tinh Tây phương."}
      </p>
    );
  }

  const houseRulersByHouse = new Map(
    deriveWesternHouseRulers(result).map((context) => [context.house, context]),
  );
  const cuspContextsByBody = new Map(
    deriveWesternHouseCuspContexts(result).map((context) => [
      context.body,
      context,
    ]),
  );

  function handleModeKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === "Home"
      ? 0
      : event.key === "End"
        ? readingModes.length - 1
        : (index + (event.key === "ArrowRight" ? 1 : -1) + readingModes.length) % readingModes.length;
    setReadingMode(readingModes[nextIndex].id);
    modeRefs.current[nextIndex]?.focus();
  }

  return (
    <div id="western-result-top" className="scroll-mt-4 text-left">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-base font-semibold text-[#193331]">
          {result.system}
        </h3>
        <p className="text-sm text-[#687673]">
          Julian Day: {result.julianDay.toFixed(6)}
        </p>
      </div>

      <div className="mt-5 rounded-lg border border-[#d7dfdc] bg-[#edf2f0] p-1" role="tablist" aria-label="Chế độ đọc kết quả Tây phương">
        <div className="grid grid-cols-2 gap-1">
          {readingModes.map((mode, index) => {
            const isActive = readingMode === mode.id;
            return (
              <button
                key={mode.id}
                ref={(element) => { modeRefs.current[index] = element; }}
                id={`western-${mode.id}-tab`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`western-${mode.id}-panel`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setReadingMode(mode.id)}
                onKeyDown={(event) => handleModeKeyDown(event, index)}
                className={`min-h-11 rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#1c6d68] ${isActive ? "bg-white text-[#193331] shadow-sm" : "text-[#536562] hover:bg-white/70"}`}
              >
                {mode.label}
              </button>
            );
          })}
        </div>
      </div>

      <div id="western-overview-panel" role="tabpanel" aria-labelledby="western-overview-tab" hidden={readingMode !== "overview"} className="mt-6">
        <WesternOverview synthesis={synthesis} />
      </div>

      <div id="western-deep-dive-panel" role="tabpanel" aria-labelledby="western-deep-dive-tab" hidden={readingMode !== "deep-dive"} className="mt-6">
      <section id="western-synthesis" className="scroll-mt-4" aria-labelledby="western-synthesis-title">
        <h3 id="western-synthesis-title" className="text-xl font-semibold text-[#193331]">Phân tích tổng hợp</h3>
        <p className="mt-2 max-w-3xl text-base leading-7 text-[#536562]">Các chủ đề dưới đây dùng cùng dữ liệu tổng hợp với phần Tổng quan, kèm đường dẫn tới bằng chứng và phiên bản.</p>
        <div className="mt-4 space-y-4">
          {synthesis.personalityPotential.personality.map((item) => (
            <article key={item.theme.themeKey} className="rounded-lg border border-[#d7dfdc] p-5">
              <h4 className="font-semibold text-[#193331]">{item.themeLabel}</h4>
              <SynthesisEvidenceDetails candidates={item.theme.candidates} provenance={synthesis.provenance} />
            </article>
          ))}
        </div>
      </section>

      <WesternReportVersion metadata={synthesis.provenance} />

      <nav
        className="mt-5 rounded-lg border border-[#d7dfdc] bg-[#f8faf9] p-4"
        aria-label="Điều hướng nội dung Chiêm tinh Tây phương"
      >
        <h4 className="text-sm font-semibold text-[#193331]">Đi nhanh đến</h4>
        <div className="mt-3 flex flex-wrap gap-2">
          {westernSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="inline-flex min-h-10 items-center rounded-md border border-[#bdc9c6] bg-white px-3 text-sm font-semibold text-[#294542] transition hover:border-[#7f9691] hover:bg-[#eef4f2] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#1c6d68]"
            >
              {section.label}
            </a>
          ))}
        </div>
      </nav>

      <div id="western-core" className="scroll-mt-4">
        <WesternCoreTriad result={result} />
        <BackToWesternTop />
      </div>
      <div id="western-personal-planets" className="scroll-mt-4">
        <WesternPersonalPlanets result={result} />
        <BackToWesternTop />
      </div>
      <div id="western-social-planets" className="scroll-mt-4">
        <WesternSocialPlanets result={result} />
        <BackToWesternTop />
      </div>
      <WesternPlanetHouseInterpretations result={result} />

      <section
        id="western-chart"
        className="mt-6 border-t border-[#d7dfdc] pt-5"
        aria-labelledby="chart-wheel-title"
      >
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <h4
            id="chart-wheel-title"
            className="text-base font-semibold text-[#193331]"
          >
            Vòng tròn lá số
          </h4>
          <p className="text-sm text-[#687673]">
            Tropical Zodiac · {result.houseSystem}
          </p>
        </div>
        <div className="mt-4">
          <WesternChartWheel result={result} />
        </div>
        <BackToWesternTop />
      </section>

      <section
        id="western-bodies"
        className="mt-7 scroll-mt-4 border-t border-[#d7dfdc] pt-5"
        aria-labelledby="bodies-title"
      >
        <h4 id="bodies-title" className="text-base font-semibold text-[#193331]">
          Các thiên thể
        </h4>
        <MobileDataTable label="Bảng dữ liệu các thiên thể">
          <table className="w-full min-w-[760px] border-collapse">
            <thead>
              <tr className="border-y border-[#d7dfdc] bg-[#f4f7f6] text-left text-xs font-semibold uppercase text-[#687673]">
                <th scope="col" className="px-3 py-3 sm:px-4">Thiên thể</th>
                <th scope="col" className="px-3 py-3 sm:px-4">Cung</th>
                <th scope="col" className="px-3 py-3 sm:px-4">Độ</th>
                <th scope="col" className="px-3 py-3 sm:px-4">Nhà chính</th>
                <th scope="col" className="px-3 py-3 sm:px-4">Bối cảnh cusp</th>
                <th scope="col" className="px-3 py-3 sm:px-4">Nghịch hành</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e1e6e4] text-sm text-[#294542]">
              {result.bodies.map((body) => {
                const cuspContext = cuspContextsByBody.get(body.name);

                return (
                  <tr key={body.name}>
                    <th
                      scope="row"
                      className="px-4 py-3 font-semibold text-[#193331]"
                    >
                      {westernBodyLabels[body.name] ?? body.name}
                    </th>
                    <td className="px-4 py-3">
                      <ZodiacName
                        sign={body.sign}
                        signVietnamese={body.signVietnamese}
                      />
                    </td>
                    <td className="px-4 py-3 tabular-nums">
                      {body.degree}° {String(body.minute).padStart(2, "0")}′
                    </td>
                    <td className="px-4 py-3 tabular-nums">
                      Nhà {body.house}
                    </td>
                    <td className="px-4 py-3">
                      <HouseCuspContextDisplay context={cuspContext} />
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {body.retrograde ? "Có" : "Không"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </MobileDataTable>
        <BackToWesternTop />
      </section>

      <section
        id="western-houses"
        className="mt-7 scroll-mt-4 border-t border-[#d7dfdc] pt-5"
        aria-labelledby="houses-title"
      >
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <h4 id="houses-title" className="text-base font-semibold text-[#193331]">
            ASC, MC và 12 nhà
          </h4>
          <p className="text-sm text-[#687673]">Hệ nhà {result.houseSystem}</p>
        </div>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#536562]">
          Chủ tinh chính dùng hệ truyền thống theo cung trên cusp. Với Bọ Cạp,
          Bảo Bình và Song Ngư, chủ tinh hiện đại chỉ được ghi như lớp bổ sung.
        </p>

        <MobileDataTable label="Bảng dữ liệu ASC và MC">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="border-y border-[#d7dfdc] bg-[#f4f7f6] text-left text-xs font-semibold uppercase text-[#687673]">
                <th scope="col" className="px-4 py-3">Điểm góc</th>
                <th scope="col" className="px-4 py-3">Cung</th>
                <th scope="col" className="px-4 py-3">Độ trong cung</th>
                <th scope="col" className="px-4 py-3">Kinh độ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e1e6e4] text-sm text-[#294542]">
              {result.angles.map((angle) => (
                <tr key={angle.name}>
                  <th scope="row" className="px-4 py-3 font-semibold text-[#193331]">
                    {angle.name}
                  </th>
                  <td className="px-4 py-3">
                    <ZodiacName
                      sign={angle.sign}
                      signVietnamese={angle.signVietnamese}
                    />
                  </td>
                  <td className="px-4 py-3 tabular-nums">
                    {angle.degree}° {String(angle.minute).padStart(2, "0")}′
                  </td>
                  <td className="px-4 py-3 tabular-nums">
                    {angle.longitude.toFixed(6)}°
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </MobileDataTable>

        <div className="mt-2">
          <MobileDataTable label="Bảng dữ liệu 12 nhà">
          <table className="w-full min-w-[760px] border-collapse">
            <thead>
              <tr className="border-y border-[#d7dfdc] bg-[#f4f7f6] text-left text-xs font-semibold uppercase text-[#687673]">
                <th scope="col" className="px-4 py-3">Nhà</th>
                <th scope="col" className="px-4 py-3">Cung</th>
                <th scope="col" className="px-4 py-3">Độ trong cung</th>
                <th scope="col" className="px-4 py-3">Kinh độ cusp</th>
                <th scope="col" className="px-4 py-3">Chủ tinh</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e1e6e4] text-sm text-[#294542]">
              {result.houses.map((house) => {
                const ruler = houseRulersByHouse.get(house.house);

                return (
                  <tr key={house.house}>
                    <th
                      scope="row"
                      className="px-4 py-3 font-semibold text-[#193331]"
                    >
                      {house.house}
                    </th>
                    <td className="px-4 py-3">
                      <ZodiacName
                        sign={house.sign}
                        signVietnamese={house.signVietnamese}
                      />
                    </td>
                    <td className="px-4 py-3 tabular-nums">
                      {house.degree}° {String(house.minute).padStart(2, "0")}′
                    </td>
                    <td className="px-4 py-3 tabular-nums">
                      {house.longitude.toFixed(6)}°
                    </td>
                    <td className="px-4 py-3">
                      <HouseRulerDisplay context={ruler} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
            </table>
          </MobileDataTable>
        </div>
        <BackToWesternTop />
      </section>

      <section
        id="western-aspects"
        className="mt-7 scroll-mt-4 border-t border-[#d7dfdc] pt-5"
        aria-labelledby="aspects-title"
      >
        <h4 id="aspects-title" className="text-base font-semibold text-[#193331]">
          Các góc chiếu
        </h4>
        {result.aspects.length === 0 ? (
          <p className="mt-3 text-sm text-[#687673]">
            Không có góc chiếu chính nào trong orb đã cấu hình.
          </p>
        ) : (
          <MobileDataTable label="Bảng dữ liệu các góc chiếu">
            <table className="w-full min-w-[650px] border-collapse">
              <thead>
                <tr className="border-y border-[#d7dfdc] bg-[#f4f7f6] text-left text-xs font-semibold uppercase text-[#687673]">
                  <th scope="col" className="px-4 py-3">Thiên thể 1</th>
                  <th scope="col" className="px-4 py-3">Thiên thể 2</th>
                  <th scope="col" className="px-4 py-3">Góc chiếu</th>
                  <th scope="col" className="px-4 py-3">Góc thực tế</th>
                  <th scope="col" className="px-4 py-3">Orb</th>
                  <th scope="col" className="px-4 py-3">Pha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e1e6e4] text-sm text-[#294542]">
                {result.aspects.map((aspect) => (
                  <tr key={`${aspect.body1}-${aspect.body2}`}>
                    <th scope="row" className="px-4 py-3 font-semibold text-[#193331]">
                      {westernBodyLabels[aspect.body1] ?? aspect.body1}
                    </th>
                    <td className="px-4 py-3 font-medium">
                      {westernBodyLabels[aspect.body2] ?? aspect.body2}
                    </td>
                    <td className="px-4 py-3">
                      {aspectLabels[aspect.aspect]}
                      <span className="ml-1.5 text-xs text-[#7a8784]">
                        {aspect.aspectEnglish}
                      </span>
                    </td>
                    <td className="px-4 py-3 tabular-nums">
                      {aspect.actualAngle.toFixed(2)}°
                    </td>
                    <td className="px-4 py-3 tabular-nums">
                      {aspect.orb.toFixed(2)}°
                    </td>
                    <td className="px-4 py-3">
                      {aspect.phase === "applying"
                        ? "Đang tiến"
                        : aspect.phase === "separating"
                          ? "Đang tách"
                          : "Chưa xác định"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </MobileDataTable>
        )}
        <WesternAspectInterpretations result={result} />
        <BackToWesternTop />
      </section>
      </div>
    </div>
  );
}

export function ResultTabs({
  activeModule,
  recoveryState,
  westernAstrology,
  westernReportSynthesis,
  westernAstrologyError,
}: ResultTabsProps) {
  const router = useRouter();

  function handleModuleKeyDown(
    event: KeyboardEvent<HTMLAnchorElement>,
    index: number,
  ) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === "Home"
      ? 0
      : event.key === "End"
        ? resultModules.length - 1
        : (index + (event.key === "ArrowRight" ? 1 : -1) + resultModules.length) % resultModules.length;
    router.push(getResultModulePath(resultModules[nextIndex].slug));
  }

  return (
    <section
      className="overflow-hidden rounded-lg border border-[#d7dfdc] bg-white"
      aria-label="Các hệ thống lá số"
    >
      <div
        className="grid grid-cols-2 border-b border-[#d7dfdc] bg-[#edf2f0] lg:grid-cols-4"
        role="tablist"
        aria-label="Chọn hệ thống"
      >
        {resultModules.map((tab, index) => {
          const isActive = activeModule === tab.slug;

          return (
            <Link
              key={tab.slug}
              id={`${tab.slug}-tab`}
              href={getResultModulePath(tab.slug)}
              role="tab"
              aria-selected={isActive}
              aria-controls={`${tab.slug}-panel`}
              tabIndex={isActive ? 0 : -1}
              onKeyDown={(event) => handleModuleKeyDown(event, index)}
              className={`min-h-14 border-b-2 px-3 py-3 text-center text-sm font-semibold transition focus-visible:z-10 focus-visible:outline-3 focus-visible:outline-inset focus-visible:outline-[#1c6d68] sm:text-[15px] lg:border-b-2 ${
                isActive
                  ? "border-[#a94f2c] bg-white text-[#1b3b39]"
                  : "border-transparent text-[#647370] hover:bg-white/70 hover:text-[#274744]"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {resultModules.map((tab) => (
        <div
          key={tab.slug}
          id={`${tab.slug}-panel`}
          role="tabpanel"
          aria-labelledby={`${tab.slug}-tab`}
          hidden={activeModule !== tab.slug}
          className={
            tab.slug === "tay-phuong"
              ? "px-4 py-6 sm:px-7 sm:py-8"
              : "px-5 py-14 text-center sm:px-8 sm:py-20"
          }
        >
          {recoveryState ?? (tab.slug === "tay-phuong" ? (
            <WesternAstrologyPanel
              result={westernAstrology}
              synthesis={westernReportSynthesis}
              error={westernAstrologyError}
            />
          ) : (
            <p className="text-base font-medium text-[#536562]">
              Chức năng đang được phát triển.
            </p>
          ))}
        </div>
      ))}
    </section>
  );
}
