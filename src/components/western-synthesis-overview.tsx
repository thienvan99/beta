import type { WesternCoreReportSynthesis } from "../lib/western-core-report-synthesis";

export function SynthesisEvidenceDetails({
  candidates,
  provenance,
}: {
  candidates: WesternCoreReportSynthesis["mainThemes"]["themes"][number]["theme"]["candidates"];
  provenance: WesternCoreReportSynthesis["provenance"];
}) {
  return (
    <details className="mt-4 rounded-md border border-[#d7dfdc] bg-[#f8faf9] px-4 py-2 text-sm">
      <summary className="min-h-10 cursor-pointer content-center font-semibold text-[#1c6d68] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#1c6d68]">
        Vì sao có kết luận này?
      </summary>
      <div className="mt-2 space-y-3 border-l-2 border-[#9db4af] pl-4 text-[#536562]">
        {candidates.map(({ candidate }) => (
          <div key={candidate.candidateId}>
            <p className="break-words">
              Quy tắc {candidate.ruleId} · phiên bản {candidate.ruleVersion} · nguồn vị trí thiên thể
            </p>
          </div>
        ))}
        <p className="border-t border-[#d7dfdc] pt-3">
          Báo cáo: tính toán {provenance.calculationVersion} · bộ quy tắc {provenance.rulesetVersion} · luận giải {provenance.interpretationVersion} · tổng hợp {provenance.candidateProjectionVersion}
        </p>
      </div>
    </details>
  );
}

export function WesternOverview({ synthesis }: { synthesis: WesternCoreReportSynthesis }) {
  return (
    <section aria-labelledby="western-overview-title">
      <p className="text-sm font-semibold uppercase tracking-wide text-[#a94f2c]">Điểm nổi bật</p>
      <h3 id="western-overview-title" className="mt-2 text-2xl font-semibold text-[#193331]">Những chủ đề chính trong lá số</h3>
      <p className="mt-3 max-w-3xl text-base leading-7 text-[#536562]">
        Bắt đầu với các nét nổi bật nhất. Đây là góc nhìn để tự quan sát, không phải kết luận tuyệt đối về bạn.
      </p>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {synthesis.mainThemes.themes.map((mainTheme) => (
          <article key={mainTheme.theme.themeKey} className="min-w-0 rounded-lg border border-[#d7dfdc] bg-white p-5">
            <h4 className="text-lg font-semibold text-[#193331]">{mainTheme.themeLabel}</h4>
            {mainTheme.supportiveStatements.length > 0 && <div className="mt-4"><p className="font-semibold text-[#294542]">Điểm thường thể hiện</p><ul className="mt-2 space-y-2 text-base leading-7 text-[#536562]">{mainTheme.supportiveStatements.map((statement) => <li key={statement}>• {statement}</li>)}</ul></div>}
            {mainTheme.challengingStatements.length > 0 && <div className="mt-4"><p className="font-semibold text-[#294542]">Điểm cần lưu ý</p><ul className="mt-2 space-y-2 text-base leading-7 text-[#536562]">{mainTheme.challengingStatements.map((statement) => <li key={statement}>• {statement}</li>)}</ul></div>}
            <SynthesisEvidenceDetails candidates={mainTheme.theme.candidates} provenance={synthesis.provenance} />
          </article>
        ))}
      </div>
    </section>
  );
}
