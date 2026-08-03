"use client";

import { useId, useMemo, useState } from "react";
import {
  majorAspectConfig,
  type MajorAspectCode,
} from "@/config/aspect-orbs";
import type {
  CelestialBodyPosition,
  WesternAstrologyResult,
  ZodiacSign,
} from "@/lib/western-astrology";
import {
  annularSegmentPath,
  chartCenter,
  getHouseCuspPoint,
  layoutBodyMarkers,
  longitudeToChartPoint,
  longitudeToSvgAngle,
  midpointLongitude,
  roundSvgNumber,
} from "@/lib/western-chart-geometry";

type WesternChartWheelProps = {
  result: WesternAstrologyResult;
};

const bodyPresentation: Record<string, { label: string; symbol: string }> = {
  Sun: { label: "Mặt Trời", symbol: "☉" },
  Moon: { label: "Mặt Trăng", symbol: "☽" },
  Mercury: { label: "Sao Thủy", symbol: "☿" },
  Venus: { label: "Sao Kim", symbol: "♀" },
  Mars: { label: "Sao Hỏa", symbol: "♂" },
  Jupiter: { label: "Sao Mộc", symbol: "♃" },
  Saturn: { label: "Sao Thổ", symbol: "♄" },
  Uranus: { label: "Thiên Vương", symbol: "♅" },
  Neptune: { label: "Hải Vương", symbol: "♆" },
  Pluto: { label: "Diêm Vương", symbol: "♇" },
};

const zodiacSegments: ReadonlyArray<{
  sign: ZodiacSign;
  label: string;
  symbol: string;
  fill: string;
  text: string;
}> = [
  { sign: "Aries", label: "Bạch Dương", symbol: "♈", fill: "#f6e5df", text: "#91472f" },
  { sign: "Taurus", label: "Kim Ngưu", symbol: "♉", fill: "#e4eee5", text: "#477057" },
  { sign: "Gemini", label: "Song Tử", symbol: "♊", fill: "#e5edf5", text: "#426988" },
  { sign: "Cancer", label: "Cự Giải", symbol: "♋", fill: "#e3efef", text: "#3d716e" },
  { sign: "Leo", label: "Sư Tử", symbol: "♌", fill: "#f6e5df", text: "#91472f" },
  { sign: "Virgo", label: "Xử Nữ", symbol: "♍", fill: "#e4eee5", text: "#477057" },
  { sign: "Libra", label: "Thiên Bình", symbol: "♎", fill: "#e5edf5", text: "#426988" },
  { sign: "Scorpio", label: "Bọ Cạp", symbol: "♏", fill: "#e3efef", text: "#3d716e" },
  { sign: "Sagittarius", label: "Nhân Mã", symbol: "♐", fill: "#f6e5df", text: "#91472f" },
  { sign: "Capricorn", label: "Ma Kết", symbol: "♑", fill: "#e4eee5", text: "#477057" },
  { sign: "Aquarius", label: "Bảo Bình", symbol: "♒", fill: "#e5edf5", text: "#426988" },
  { sign: "Pisces", label: "Song Ngư", symbol: "♓", fill: "#e3efef", text: "#3d716e" },
];

const aspectPresentation: Record<
  MajorAspectCode,
  { color: string; dashArray?: string }
> = {
  conjunction: { color: "#a94f2c" },
  opposition: { color: "#b13f52" },
  trine: { color: "#2f7d63" },
  square: { color: "#d18b24", dashArray: "7 4" },
  sextile: { color: "#3c6fa8", dashArray: "3 4" },
};

const outerRadius = 308;
const zodiacInnerRadius = 252;
const houseInnerRadius = 134;
const aspectRadius = 124;
const exactBodyRadius = 232;

function bodyDetails(
  body: CelestialBodyPosition,
  house: number | null,
) {
  const presentation = bodyPresentation[body.name];
  const label = presentation?.label ?? body.name;
  const houseLabel = house === null ? "chưa xác định nhà" : `nhà ${house}`;
  const motion = body.retrograde ? "nghịch hành" : "thuận hành";

  return `${label}, ${body.signVietnamese}, ${body.degree} độ ${body.minute} phút, ${houseLabel}, ${motion}.`;
}

export function WesternChartWheel({ result }: WesternChartWheelProps) {
  const titleId = useId();
  const descriptionId = useId();
  const [hoveredBody, setHoveredBody] = useState<string | null>(null);
  const [selectedBody, setSelectedBody] = useState<string | null>(null);
  const ascendant = result.angles.find(({ name }) => name === "ASC");
  const activeBodyName = hoveredBody ?? selectedBody;
  const activeBody = result.bodies.find(
    ({ name }) => name === activeBodyName,
  );
  const activeHouse = activeBody?.house ?? null;
  const markerPlacements = useMemo(
    () =>
      ascendant
        ? layoutBodyMarkers(result.bodies, ascendant.longitude, {
            exactRadius: exactBodyRadius,
          })
        : [],
    [ascendant, result.bodies],
  );
  const aspectPoints = useMemo(() => {
    if (!ascendant) {
      return new Map<string, { x: number; y: number }>();
    }

    return new Map(
      result.bodies.map((body) => [
        body.name,
        longitudeToChartPoint(
          body.longitude,
          ascendant.longitude,
          aspectRadius,
        ),
      ]),
    );
  }, [ascendant, result.bodies]);

  if (!ascendant) {
    return (
      <p role="alert" className="text-sm font-medium text-[#9b3f27]">
        Không thể vẽ vòng tròn vì kết quả không có ASC.
      </p>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[760px]">
      <svg
        viewBox="0 0 640 640"
        role="img"
        aria-labelledby={`${titleId} ${descriptionId}`}
        className="block h-auto w-full overflow-visible"
      >
        <title id={titleId}>Vòng tròn lá số Chiêm tinh Tây phương</title>
        <desc id={descriptionId}>
          Lá số Tropical Zodiac với ASC ở bên trái, mười thiên thể, mười hai
          nhà Placidus và các góc chiếu chính được vẽ từ dữ liệu tính toán.
        </desc>

        <circle
          cx={chartCenter.x}
          cy={chartCenter.y}
          r={outerRadius}
          fill="#fbfcfb"
          stroke="#9aaba7"
          strokeWidth="1.5"
        />

        {zodiacSegments.map((segment, index) => {
          const startLongitude = index * 30;
          const endLongitude = (index + 1) * 30;
          const startAngle = longitudeToSvgAngle(
            startLongitude,
            ascendant.longitude,
          );
          const endAngle = longitudeToSvgAngle(
            endLongitude,
            ascendant.longitude,
          );
          const labelPoint = longitudeToChartPoint(
            startLongitude + 15,
            ascendant.longitude,
            280,
          );

          return (
            <g key={segment.sign} aria-label={segment.label}>
              <path
                d={annularSegmentPath(
                  startAngle,
                  endAngle,
                  outerRadius,
                  zodiacInnerRadius,
                )}
                fill={segment.fill}
                stroke="#ffffff"
                strokeWidth="1.5"
              />
              <text
                x={labelPoint.x}
                y={labelPoint.y}
                fill={segment.text}
                fontSize="28"
                fontWeight="600"
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="Segoe UI Symbol, Noto Sans Symbols 2, sans-serif"
              >
                {segment.symbol}
              </text>
            </g>
          );
        })}

        <circle
          cx={chartCenter.x}
          cy={chartCenter.y}
          r={zodiacInnerRadius}
          fill="none"
          stroke="#7f9490"
          strokeWidth="1.4"
        />
        <circle
          cx={chartCenter.x}
          cy={chartCenter.y}
          r={exactBodyRadius}
          fill="none"
          stroke="#d7dfdc"
          strokeWidth="1"
        />
        <circle
          cx={chartCenter.x}
          cy={chartCenter.y}
          r={houseInnerRadius}
          fill="#f8faf9"
          stroke="#9aaba7"
          strokeWidth="1.2"
        />

        <g aria-label="Các góc chiếu">
          {result.aspects.map((aspect) => {
            const start = aspectPoints.get(aspect.body1);
            const end = aspectPoints.get(aspect.body2);

            if (!start || !end) {
              return null;
            }

            const presentation = aspectPresentation[aspect.aspect];
            const midpoint = {
              x: roundSvgNumber((start.x + end.x) / 2),
              y: roundSvgNumber((start.y + end.y) / 2),
            };

            return (
              <g key={`${aspect.body1}-${aspect.body2}`}>
                <line
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                  stroke={presentation.color}
                  strokeWidth={aspect.aspect === "conjunction" ? 2.8 : 1.8}
                  strokeDasharray={presentation.dashArray}
                  strokeLinecap="round"
                  opacity="0.72"
                />
                {aspect.aspect === "conjunction" ? (
                  <circle
                    cx={midpoint.x}
                    cy={midpoint.y}
                    r="2.5"
                    fill={presentation.color}
                  />
                ) : null}
              </g>
            );
          })}
        </g>

        <g aria-label="Mười hai nhà Placidus">
          {result.houses.map((house, index) => {
            const nextHouse = result.houses[(index + 1) % result.houses.length];
            const innerPoint = getHouseCuspPoint(
              house.longitude,
              ascendant.longitude,
              houseInnerRadius,
            );
            const outerPoint = getHouseCuspPoint(
              house.longitude,
              ascendant.longitude,
              zodiacInnerRadius,
            );
            const numberPoint = longitudeToChartPoint(
              midpointLongitude(house.longitude, nextHouse.longitude),
              ascendant.longitude,
              242,
            );
            const isAngularHouse = [1, 4, 7, 10].includes(house.house);

            return (
              <g key={house.house} aria-label={`Nhà ${house.house}`}>
                <line
                  x1={innerPoint.x}
                  y1={innerPoint.y}
                  x2={outerPoint.x}
                  y2={outerPoint.y}
                  stroke={isAngularHouse ? "#496c67" : "#9fb0ac"}
                  strokeWidth={isAngularHouse ? 2 : 1.1}
                />
                <text
                  x={numberPoint.x}
                  y={numberPoint.y}
                  fill="#506763"
                  fontSize="15"
                  fontWeight="700"
                  textAnchor="middle"
                  dominantBaseline="central"
                  paintOrder="stroke"
                  stroke="#fbfcfb"
                  strokeWidth="4"
                >
                  {house.house}
                </text>
              </g>
            );
          })}
        </g>

        <g aria-label="ASC và MC">
          {result.angles.map((angle) => {
            const labelPoint = longitudeToChartPoint(
              angle.longitude,
              ascendant.longitude,
              264,
            );

            return (
              <text
                key={angle.name}
                x={labelPoint.x}
                y={labelPoint.y}
                fill={angle.name === "ASC" ? "#9b4429" : "#245d59"}
                fontSize="15"
                fontWeight="800"
                textAnchor="middle"
                dominantBaseline="central"
                paintOrder="stroke"
                stroke="#fbfcfb"
                strokeWidth="5"
              >
                {angle.name}
              </text>
            );
          })}
        </g>

        <g aria-label="Mười thiên thể">
          {markerPlacements.map((placement) => {
            const body = placement.body;
            const presentation = bodyPresentation[body.name];
            const details = bodyDetails(body, body.house);
            const isActive = activeBodyName === body.name;

            return (
              <g
                key={body.name}
                role="button"
                tabIndex={0}
                aria-label={details}
                aria-pressed={selectedBody === body.name}
                className="group cursor-pointer focus:outline-none"
                onPointerEnter={() => setHoveredBody(body.name)}
                onPointerLeave={() => setHoveredBody(null)}
                onFocus={() => setHoveredBody(body.name)}
                onBlur={() => setHoveredBody(null)}
                onClick={() =>
                  setSelectedBody((current) =>
                    current === body.name ? null : body.name,
                  )
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedBody((current) =>
                      current === body.name ? null : body.name,
                    );
                  }
                }}
              >
                <title>{details}</title>
                <line
                  x1={placement.exactPoint.x}
                  y1={placement.exactPoint.y}
                  x2={placement.displayPoint.x}
                  y2={placement.displayPoint.y}
                  stroke="#718783"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
                <circle
                  cx={placement.exactPoint.x}
                  cy={placement.exactPoint.y}
                  r="2.6"
                  fill="#274d49"
                />
                <circle
                  cx={placement.displayPoint.x}
                  cy={placement.displayPoint.y}
                  r="23"
                  fill="transparent"
                />
                <circle
                  cx={placement.displayPoint.x}
                  cy={placement.displayPoint.y}
                  r="16"
                  fill={isActive ? "#e8f1ef" : "#ffffff"}
                  stroke={isActive ? "#a94f2c" : "#66807b"}
                  strokeWidth={isActive ? 2.2 : 1.2}
                  className="transition group-hover:stroke-[#a94f2c] group-focus:stroke-[#a94f2c]"
                />
                <text
                  x={placement.displayPoint.x}
                  y={placement.displayPoint.y}
                  fill="#173d39"
                  fontSize="24"
                  fontWeight="600"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontFamily="Segoe UI Symbol, Noto Sans Symbols 2, sans-serif"
                  pointerEvents="none"
                >
                  {presentation?.symbol ?? "•"}
                </text>
                {body.retrograde ? (
                  <text
                    x={roundSvgNumber(placement.displayPoint.x + 14)}
                    y={roundSvgNumber(placement.displayPoint.y - 12)}
                    fill="#a94f2c"
                    fontSize="9"
                    fontWeight="800"
                    textAnchor="middle"
                    pointerEvents="none"
                  >
                    R
                  </text>
                ) : null}
              </g>
            );
          })}
        </g>
      </svg>

      <div
        aria-live="polite"
        className={`mx-auto mt-3 min-h-[94px] max-w-2xl border-y px-3 py-3 transition-colors sm:px-5 ${
          activeBody
            ? "border-[#d7dfdc] bg-[#f7f9f8]"
            : "border-transparent"
        }`}
      >
        {activeBody ? (
          <div>
            <p className="font-semibold text-[#193331]">
              {bodyPresentation[activeBody.name]?.symbol} {bodyPresentation[activeBody.name]?.label}
            </p>
            <dl className="mt-2 grid grid-cols-2 gap-x-5 gap-y-1 text-sm sm:grid-cols-4">
              <div>
                <dt className="text-[#71807d]">Cung</dt>
                <dd className="font-medium text-[#294542]">
                  {activeBody.signVietnamese}
                </dd>
              </div>
              <div>
                <dt className="text-[#71807d]">Vị trí</dt>
                <dd className="font-medium tabular-nums text-[#294542]">
                  {activeBody.degree}° {String(activeBody.minute).padStart(2, "0")}′
                </dd>
              </div>
              <div>
                <dt className="text-[#71807d]">Nhà</dt>
                <dd className="font-medium text-[#294542]">
                  {activeHouse ?? "Không xác định"}
                </dd>
              </div>
              <div>
                <dt className="text-[#71807d]">Chuyển động</dt>
                <dd className="font-medium text-[#294542]">
                  {activeBody.retrograde ? "Nghịch hành" : "Thuận hành"}
                </dd>
              </div>
            </dl>
          </div>
        ) : null}
      </div>

      <div className="mt-4 border-t border-[#d7dfdc] pt-4">
        <p className="text-sm font-semibold text-[#294542]">Chú giải góc chiếu</p>
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-3 text-xs text-[#586b68]">
          {majorAspectConfig.map(({ code, labelVietnamese }) => {
            const presentation = aspectPresentation[code];

            return (
              <li key={code} className="flex items-center gap-2">
                <svg width="28" height="8" aria-hidden="true">
                  <line
                    x1="1"
                    y1="4"
                    x2="27"
                    y2="4"
                    stroke={presentation.color}
                    strokeWidth="2"
                    strokeDasharray={presentation.dashArray}
                    strokeLinecap="round"
                  />
                </svg>
                {labelVietnamese}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
