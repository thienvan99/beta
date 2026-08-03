"use client";

import { useState } from "react";
import { majorAspectConfig } from "@/config/aspect-orbs";
import { WesternChartWheel } from "@/components/western-chart-wheel";
import { WesternCoreTriad } from "@/components/western-core-triad";
import type { WesternAstrologyResult } from "@/lib/western-astrology";

const tabs = [
  { id: "bat-tu", label: "Bát Tự" },
  { id: "tu-vi", label: "Tử Vi" },
  { id: "tay-phuong", label: "Chiêm tinh Tây phương" },
  { id: "ve-da", label: "Chiêm tinh Vệ Đà" },
] as const;

type TabId = (typeof tabs)[number]["id"];

type ResultTabsProps = {
  westernAstrology?: WesternAstrologyResult;
  westernAstrologyError?: string;
};

const bodyLabels: Record<string, string> = {
  Sun: "Mặt Trời",
  Moon: "Mặt Trăng",
  Mercury: "Sao Thủy",
  Venus: "Sao Kim",
  Mars: "Sao Hỏa",
  Jupiter: "Sao Mộc",
  Saturn: "Sao Thổ",
  Uranus: "Thiên Vương",
  Neptune: "Hải Vương",
  Pluto: "Diêm Vương",
};

const aspectLabels = Object.fromEntries(
  majorAspectConfig.map(({ code, labelVietnamese }) => [
    code,
    labelVietnamese,
  ]),
) as Record<(typeof majorAspectConfig)[number]["code"], string>;

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

function WesternAstrologyPanel({
  result,
  error,
}: {
  result?: WesternAstrologyResult;
  error?: string;
}) {
  if (error || !result) {
    return (
      <p role="alert" className="text-sm font-medium text-[#9b3f27]">
        {error ?? "Không thể tính dữ liệu Chiêm tinh Tây phương."}
      </p>
    );
  }

  return (
    <div className="text-left">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-base font-semibold text-[#193331]">
          {result.system}
        </h3>
        <p className="text-sm text-[#687673]">
          Julian Day: {result.julianDay.toFixed(6)}
        </p>
      </div>

      <WesternCoreTriad result={result} />

      <section
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
      </section>

      <section className="mt-7 border-t border-[#d7dfdc] pt-5" aria-labelledby="bodies-title">
        <h4 id="bodies-title" className="text-base font-semibold text-[#193331]">
          Các thiên thể
        </h4>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="border-y border-[#d7dfdc] bg-[#f4f7f6] text-left text-xs font-semibold uppercase text-[#687673]">
                <th scope="col" className="px-4 py-3">Thiên thể</th>
                <th scope="col" className="px-4 py-3">Cung</th>
                <th scope="col" className="px-4 py-3">Độ</th>
                <th scope="col" className="px-4 py-3">Nhà</th>
                <th scope="col" className="px-4 py-3">Nghịch hành</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e1e6e4] text-sm text-[#294542]">
              {result.bodies.map((body) => (
                <tr key={body.name}>
                  <th scope="row" className="px-4 py-3 font-semibold text-[#193331]">
                    {bodyLabels[body.name] ?? body.name}
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
                  <td className="px-4 py-3 tabular-nums">{body.house}</td>
                  <td className="px-4 py-3 font-medium">
                    {body.retrograde ? "Có" : "Không"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-7 border-t border-[#d7dfdc] pt-5" aria-labelledby="houses-title">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <h4 id="houses-title" className="text-base font-semibold text-[#193331]">
            ASC, MC và 12 nhà
          </h4>
          <p className="text-sm text-[#687673]">Hệ nhà {result.houseSystem}</p>
        </div>

        <div className="mt-3 overflow-x-auto">
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
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="border-y border-[#d7dfdc] bg-[#f4f7f6] text-left text-xs font-semibold uppercase text-[#687673]">
                <th scope="col" className="px-4 py-3">Nhà</th>
                <th scope="col" className="px-4 py-3">Cung</th>
                <th scope="col" className="px-4 py-3">Độ trong cung</th>
                <th scope="col" className="px-4 py-3">Kinh độ cusp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e1e6e4] text-sm text-[#294542]">
              {result.houses.map((house) => (
                <tr key={house.house}>
                  <th scope="row" className="px-4 py-3 font-semibold text-[#193331]">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-7 border-t border-[#d7dfdc] pt-5" aria-labelledby="aspects-title">
        <h4 id="aspects-title" className="text-base font-semibold text-[#193331]">
          Các góc chiếu
        </h4>
        {result.aspects.length === 0 ? (
          <p className="mt-3 text-sm text-[#687673]">
            Không có góc chiếu chính nào trong orb đã cấu hình.
          </p>
        ) : (
          <div className="mt-3 overflow-x-auto">
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
                      {bodyLabels[aspect.body1] ?? aspect.body1}
                    </th>
                    <td className="px-4 py-3 font-medium">
                      {bodyLabels[aspect.body2] ?? aspect.body2}
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
          </div>
        )}
      </section>
    </div>
  );
}

export function ResultTabs({
  westernAstrology,
  westernAstrologyError,
}: ResultTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>(tabs[0].id);

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
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              id={`${tab.id}-tab`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`${tab.id}-panel`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              className={`min-h-14 border-b-2 px-3 py-3 text-sm font-semibold transition focus-visible:z-10 focus-visible:outline-3 focus-visible:outline-inset focus-visible:outline-[#1c6d68] sm:text-[15px] lg:border-b-2 ${
                isActive
                  ? "border-[#a94f2c] bg-white text-[#1b3b39]"
                  : "border-transparent text-[#647370] hover:bg-white/70 hover:text-[#274744]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`${tab.id}-panel`}
          role="tabpanel"
          aria-labelledby={`${tab.id}-tab`}
          hidden={activeTab !== tab.id}
          className={
            tab.id === "tay-phuong"
              ? "px-4 py-6 sm:px-7 sm:py-8"
              : "px-5 py-14 text-center sm:px-8 sm:py-20"
          }
        >
          {tab.id === "tay-phuong" ? (
            <WesternAstrologyPanel
              result={westernAstrology}
              error={westernAstrologyError}
            />
          ) : (
            <p className="text-base font-medium text-[#536562]">
              Chức năng đang được phát triển.
            </p>
          )}
        </div>
      ))}
    </section>
  );
}
