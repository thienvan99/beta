"use client";

import { useState } from "react";
import { ChevronDown, Info } from "lucide-react";
import type { WesternAstrologyResult } from "@/lib/western-astrology";
import {
  WesternInterpretationError,
  interpretWesternCoreTriad,
} from "@/lib/western-interpretation";

type WesternCoreTriadProps = {
  result: WesternAstrologyResult;
};

function InterpretationList({
  title,
  items,
}: {
  title: string;
  items: ReadonlyArray<string>;
}) {
  return (
    <div>
      <h6 className="text-xs font-semibold uppercase text-[#687673]">
        {title}
      </h6>
      <ul className="mt-2 space-y-1.5 text-sm leading-6 text-[#38514e]">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6f908a]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function WesternCoreTriad({ result }: WesternCoreTriadProps) {
  const [expandedRuleId, setExpandedRuleId] = useState<string | null>(null);
  let interpretation;

  try {
    interpretation = interpretWesternCoreTriad(result);
  } catch (error) {
    const message =
      error instanceof WesternInterpretationError
        ? error.message
        : "Không thể tạo luận giải bộ ba cốt lõi từ dữ liệu hiện tại.";

    return (
      <p role="alert" className="text-sm font-medium text-[#9b3f27]">
        {message}
      </p>
    );
  }

  return (
    <section
      className="mt-6 border-t border-[#d7dfdc] pt-5"
      aria-labelledby="core-triad-title"
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <h4 id="core-triad-title" className="text-base font-semibold text-[#193331]">
            Bộ ba cốt lõi
          </h4>
          <p className="mt-1 text-sm text-[#687673]">
            Mặt Trời, Mặt Trăng và Cung Mọc trong Tropical Zodiac
          </p>
        </div>
        <p className="text-sm text-[#687673]">Bộ quy tắc 1.0.0</p>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {interpretation.positions.map((position) => {
          const isExpanded = expandedRuleId === position.rule.ruleId;
          const evidenceId = `${position.rule.ruleId.toLowerCase()}-evidence`;

          return (
            <article
              key={position.factor}
              className="rounded-lg border border-[#d7dfdc] bg-[#fbfcfb] p-4 sm:p-5"
            >
              <header className="border-b border-[#e1e6e4] pb-4">
                <p className="text-xs font-semibold uppercase text-[#a94f2c]">
                  {position.role}
                </p>
                <h5 className="mt-2 text-lg font-semibold text-[#193331]">
                  {position.label}: {position.signVietnamese}
                </h5>
                <p className="mt-1 text-sm tabular-nums text-[#586b68]">
                  {position.degree}° {String(position.minute).padStart(2, "0")}′
                  <span className="ml-2 text-xs text-[#7a8784]">
                    {position.sign}
                  </span>
                </p>
                <p className="mt-2 text-xs font-medium text-[#627370]">
                  {position.element} · {position.modality}
                </p>
              </header>

              <p className="mt-4 text-sm leading-6 text-[#294542]">
                {position.rule.summary}
              </p>

              <div className="mt-5 space-y-5">
                <InterpretationList
                  title="Điểm mạnh"
                  items={position.rule.strengths}
                />
                <InterpretationList
                  title="Thách thức"
                  items={position.rule.challenges}
                />
                <InterpretationList
                  title="Gợi ý phát triển"
                  items={position.rule.developmentAdvice}
                />
              </div>

              <button
                type="button"
                aria-expanded={isExpanded}
                aria-controls={evidenceId}
                onClick={() =>
                  setExpandedRuleId((current) =>
                    current === position.rule.ruleId
                      ? null
                      : position.rule.ruleId,
                  )
                }
                className="mt-5 flex min-h-10 w-full items-center justify-between gap-3 border-t border-[#d7dfdc] pt-4 text-left text-sm font-semibold text-[#1c6d68] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#1c6d68]"
              >
                <span className="flex items-center gap-2">
                  <Info aria-hidden="true" size={16} />
                  Vì sao có kết luận này?
                </span>
                <ChevronDown
                  aria-hidden="true"
                  size={17}
                  className={`shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                />
              </button>

              <div id={evidenceId} hidden={!isExpanded} className="mt-4">
                <dl className="grid gap-3 border-l-2 border-[#9db4af] pl-4 text-sm">
                  <div>
                    <dt className="text-[#71807d]">Dữ liệu sử dụng</dt>
                    <dd className="mt-0.5 font-medium text-[#294542]">
                      {position.label} ({position.rule.evidence.body})
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#71807d]">Cung hoàng đạo</dt>
                    <dd className="mt-0.5 font-medium text-[#294542]">
                      {position.signVietnamese} ({position.rule.evidence.sign})
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#71807d]">Kinh độ</dt>
                    <dd className="mt-0.5 font-medium tabular-nums text-[#294542]">
                      {position.longitude.toFixed(6)}°
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#71807d]">Rule ID</dt>
                    <dd className="mt-0.5 break-all font-mono text-xs font-semibold text-[#294542]">
                      {position.rule.ruleId}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#71807d]">Phiên bản</dt>
                    <dd className="mt-0.5 font-medium text-[#294542]">
                      {position.rule.version}
                    </dd>
                  </div>
                </dl>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-5 border-y border-[#d7dfdc] bg-[#f4f7f6] px-4 py-5 sm:px-5">
        <h5 className="text-sm font-semibold text-[#193331]">
          Tổng hợp bộ ba
        </h5>
        <p className="mt-2 text-sm leading-6 text-[#536562]">
          {interpretation.synthesis.summary}
        </p>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-[#294542]">
          {interpretation.synthesis.observations.map((observation) => (
            <li key={observation} className="flex gap-2.5">
              <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#a94f2c]" />
              <span>{observation}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-4 border-l-2 border-[#a94f2c] pl-4 text-xs leading-5 text-[#687673]">
        {interpretation.disclaimer}
      </p>
    </section>
  );
}
