import {
  westernReportVersionMetadata,
  type WesternReportVersionMetadata,
} from "../config/western-report-version";

export function WesternReportVersion({
  metadata = westernReportVersionMetadata,
}: {
  metadata?: WesternReportVersionMetadata;
}) {
  return (
    <details className="mt-4 rounded-lg border border-[#d7dfdc] bg-[#f8faf9] px-4 py-3 text-sm">
      <summary className="min-h-10 cursor-pointer content-center font-semibold text-[#1c6d68] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#1c6d68]">
        Phiên bản báo cáo
      </summary>
      <dl className="mt-3 grid gap-3 border-l-2 border-[#9db4af] pl-4 sm:grid-cols-3">
        <div>
          <dt className="text-[#71807d]">Tính toán</dt>
          <dd className="mt-0.5 font-medium text-[#294542]">
            {metadata.calculationVersion}
          </dd>
        </div>
        <div>
          <dt className="text-[#71807d]">Bộ quy tắc</dt>
          <dd className="mt-0.5 font-medium text-[#294542]">
            {metadata.rulesetVersion}
          </dd>
        </div>
        <div>
          <dt className="text-[#71807d]">Luận giải</dt>
          <dd className="mt-0.5 font-medium text-[#294542]">
            {metadata.interpretationVersion}
          </dd>
        </div>
      </dl>
    </details>
  );
}
