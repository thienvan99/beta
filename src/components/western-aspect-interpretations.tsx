import { westernBodyLabels } from "./western-house-context";
import type { WesternAstrologyResult } from "../lib/western-astrology";
import { interpretWesternAspects } from "../lib/western-aspect-interpretation";

function AdviceList({
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
            <span
              aria-hidden="true"
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6f908a]"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function phaseLabel(phase: "applying" | "separating" | null) {
  if (phase === "applying") return "Đang tiến (Applying)";
  if (phase === "separating") return "Đang tách (Separating)";
  return "Chưa xác định";
}

export function WesternAspectInterpretations({
  result,
}: {
  result: WesternAstrologyResult;
}) {
  const interpretations = interpretWesternAspects(result);
  if (interpretations.length === 0) return null;

  return (
    <section
      className="mt-6"
      aria-labelledby="aspect-interpretations-title"
    >
      <h5
        id="aspect-interpretations-title"
        className="text-base font-semibold text-[#193331]"
      >
        Luận giải góc chiếu
      </h5>
      <p className="mt-1 text-sm leading-6 text-[#687673]">
        Chỉ hiển thị các góc có trong lá số và đã có quy tắc luận giải.
      </p>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {interpretations.map(({ rule, evidence }) => (
          <article
            key={evidence.id}
            className="rounded-lg border border-[#d7dfdc] bg-[#fbfcfb] p-4 sm:p-5"
          >
            <header className="border-b border-[#e1e6e4] pb-4">
              <p className="text-xs font-semibold uppercase text-[#a94f2c]">
                {westernBodyLabels[evidence.body1] ?? evidence.body1} ↔{" "}
                {westernBodyLabels[evidence.body2] ?? evidence.body2}
              </p>
              <h6 className="mt-2 text-lg font-semibold text-[#193331]">
                {rule.title}
              </h6>
              <p className="mt-1 text-sm text-[#586b68]">
                {evidence.aspectVietnamese} ({evidence.aspectEnglish}) · Góc{" "}
                {evidence.actualAngle.toFixed(2)}° · Orb{" "}
                {evidence.orb.toFixed(2)}° · {phaseLabel(evidence.phase)}
              </p>
              {evidence.orb < 1 ? (
                <p className="mt-2 text-xs leading-5 text-[#687673]">
                  Orb dưới 1°: góc này có độ khít tương đối cao trong dữ liệu lá
                  số.
                </p>
              ) : null}
            </header>

            <div className="mt-4">
              <h6 className="text-xs font-semibold uppercase text-[#687673]">
                Ý nghĩa cốt lõi
              </h6>
              <p className="mt-2 text-sm leading-6 text-[#294542]">
                {rule.coreMeaning}
              </p>
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <AdviceList title="Thế mạnh" items={rule.strengths} />
              <AdviceList title="Điều cần lưu ý" items={rule.challenges} />
            </div>
            <div className="mt-5">
              <AdviceList
                title="Định hướng phát triển"
                items={rule.developmentAdvice}
              />
            </div>

            <details className="mt-5 border-t border-[#d7dfdc] pt-4 text-sm">
              <summary className="min-h-10 cursor-pointer font-semibold text-[#1c6d68] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#1c6d68]">
                Vì sao có kết luận này?
              </summary>
              <dl className="mt-3 grid gap-3 border-l-2 border-[#9db4af] pl-4">
                <div>
                  <dt className="text-[#71807d]">Dữ liệu tính toán</dt>
                  <dd className="mt-0.5 font-medium text-[#294542]">
                    {evidence.body1} · {evidence.body2} · {evidence.aspect} ·{" "}
                    {evidence.actualAngle.toFixed(2)}° · orb{" "}
                    {evidence.orb.toFixed(2)}° · {phaseLabel(evidence.phase)}
                  </dd>
                </div>
                <div>
                  <dt className="text-[#71807d]">Rule ID</dt>
                  <dd className="mt-0.5 break-all font-mono text-xs font-semibold text-[#294542]">
                    {rule.ruleId}
                  </dd>
                </div>
                <div>
                  <dt className="text-[#71807d]">Bộ quy tắc / phiên bản</dt>
                  <dd className="mt-0.5 font-medium text-[#294542]">
                    {rule.rulesetId} · {rule.version}
                  </dd>
                </div>
              </dl>
            </details>
          </article>
        ))}
      </div>
    </section>
  );
}
