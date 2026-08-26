import type { HouseCuspContext } from "../lib/western-house-cusp-context";
import type { HouseRulerContext } from "../lib/western-house-rulers";

export const westernBodyLabels: Record<string, string> = {
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

export function HouseCuspContextDisplay({
  context,
}: {
  context?: HouseCuspContext;
}) {
  if (!context?.nearCusp) {
    return (
      <span aria-label="Không sát cusp" className="text-[#7a8784]">
        —
      </span>
    );
  }

  return (
    <span className="font-medium text-[#8a4a31]">
      {context.exactCusp
        ? `Đúng ranh giới Nhà ${context.adjacentHouse}–${context.primaryHouse}`
        : `Gần ranh giới Nhà ${context.adjacentHouse} · cách ${context.distanceDegrees.toFixed(2).replace(".", ",")}°`}
    </span>
  );
}

export function HouseRulerDisplay({ context }: { context?: HouseRulerContext }) {
  if (!context) return null;

  return (
    <span className="flex flex-col gap-0.5">
      <strong className="font-semibold text-[#193331]">
        {westernBodyLabels[context.primaryRuler] ?? context.primaryRuler}
      </strong>
      {context.modernCoRuler ? (
        <span className="text-xs text-[#687673]">
          Bổ sung hiện đại:{" "}
          {westernBodyLabels[context.modernCoRuler] ?? context.modernCoRuler}
        </span>
      ) : null}
    </span>
  );
}
