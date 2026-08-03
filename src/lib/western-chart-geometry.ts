import type { HouseBoundary } from "./house-placement";

export type ChartPoint = Readonly<{
  x: number;
  y: number;
}>;

export type ChartBody = Readonly<{
  name: string;
  longitude: number;
}>;

export type ChartHouse = HouseBoundary;

export type BodyMarkerPlacement<T extends ChartBody = ChartBody> = Readonly<{
  body: T;
  exactSvgAngle: number;
  displaySvgAngle: number;
  exactPoint: ChartPoint;
  displayPoint: ChartPoint;
  displayRadius: number;
}>;

export const chartCenter: ChartPoint = { x: 320, y: 320 };
export const bodyMarkerRadii = [218, 198, 178, 158] as const;
export const svgCoordinatePrecision = 6;

export function roundSvgNumber(
  value: number,
  precision = svgCoordinatePrecision,
) {
  if (!Number.isFinite(value)) {
    throw new RangeError("SVG number must be finite.");
  }

  if (!Number.isInteger(precision) || precision < 0 || precision > 12) {
    throw new RangeError("SVG precision must be an integer from 0 to 12.");
  }

  const factor = 10 ** precision;
  const rounded = Math.round(value * factor) / factor;

  return Object.is(rounded, -0) ? 0 : rounded;
}

export function formatSvgNumber(
  value: number,
  precision = svgCoordinatePrecision,
) {
  return roundSvgNumber(value, precision)
    .toFixed(precision)
    .replace(/\.?0+$/, "");
}

export function normalizeChartAngle(angle: number) {
  if (!Number.isFinite(angle)) {
    throw new RangeError("Chart angle must be finite.");
  }

  return ((angle % 360) + 360) % 360;
}

export function longitudeToSvgAngle(longitude: number, ascendant: number) {
  return roundSvgNumber(
    normalizeChartAngle(180 - (longitude - ascendant)),
  );
}

export function pointAtSvgAngle(
  angle: number,
  radius: number,
  center: ChartPoint = chartCenter,
): ChartPoint {
  if (!Number.isFinite(radius) || radius < 0) {
    throw new RangeError("Chart radius must be a non-negative finite number.");
  }

  const normalizedAngle = roundSvgNumber(normalizeChartAngle(angle));
  const radians = normalizedAngle * (Math.PI / 180);

  return {
    x: roundSvgNumber(center.x + Math.cos(radians) * radius),
    y: roundSvgNumber(center.y + Math.sin(radians) * radius),
  };
}

export function annularSegmentPath(
  startAngle: number,
  endAngle: number,
  outerRadius: number,
  innerRadius: number,
  center: ChartPoint = chartCenter,
) {
  const outerStart = pointAtSvgAngle(
    startAngle,
    outerRadius,
    center,
  );
  const outerEnd = pointAtSvgAngle(endAngle, outerRadius, center);
  const innerEnd = pointAtSvgAngle(endAngle, innerRadius, center);
  const innerStart = pointAtSvgAngle(startAngle, innerRadius, center);
  const outer = formatSvgNumber(outerRadius);
  const inner = formatSvgNumber(innerRadius);

  return [
    `M ${formatSvgNumber(outerStart.x)} ${formatSvgNumber(outerStart.y)}`,
    `A ${outer} ${outer} 0 0 0 ${formatSvgNumber(outerEnd.x)} ${formatSvgNumber(outerEnd.y)}`,
    `L ${formatSvgNumber(innerEnd.x)} ${formatSvgNumber(innerEnd.y)}`,
    `A ${inner} ${inner} 0 0 1 ${formatSvgNumber(innerStart.x)} ${formatSvgNumber(innerStart.y)}`,
    "Z",
  ].join(" ");
}

export function longitudeToChartPoint(
  longitude: number,
  ascendant: number,
  radius: number,
  center: ChartPoint = chartCenter,
) {
  return pointAtSvgAngle(
    longitudeToSvgAngle(longitude, ascendant),
    radius,
    center,
  );
}

export function getHouseCuspPoint(
  cuspLongitude: number,
  ascendant: number,
  radius: number,
  center: ChartPoint = chartCenter,
) {
  return longitudeToChartPoint(
    cuspLongitude,
    ascendant,
    radius,
    center,
  );
}

export function getBodyExactPoint(
  bodyLongitude: number,
  ascendant: number,
  radius: number,
  center: ChartPoint = chartCenter,
) {
  return longitudeToChartPoint(
    bodyLongitude,
    ascendant,
    radius,
    center,
  );
}

export function midpointLongitude(start: number, end: number) {
  const span = normalizeChartAngle(end - start);
  return normalizeChartAngle(start + span / 2);
}

function circularGap(first: number, second: number) {
  return normalizeChartAngle(second - first);
}

export function layoutBodyMarkers<T extends ChartBody>(
  bodies: ReadonlyArray<T>,
  ascendant: number,
  options: Readonly<{
    center?: ChartPoint;
    exactRadius?: number;
    minimumSeparation?: number;
    markerRadii?: ReadonlyArray<number>;
  }> = {},
): BodyMarkerPlacement<T>[] {
  if (bodies.length === 0) {
    return [];
  }

  const center = options.center ?? chartCenter;
  const exactRadius = options.exactRadius ?? 232;
  const minimumSeparation = options.minimumSeparation ?? 9;
  const markerRadii = options.markerRadii ?? bodyMarkerRadii;

  if (markerRadii.length === 0) {
    throw new RangeError("At least one body marker radius is required.");
  }

  const sorted = bodies
    .map((body) => ({
      body,
      relativeLongitude: normalizeChartAngle(body.longitude - ascendant),
    }))
    .sort((first, second) =>
      first.relativeLongitude - second.relativeLongitude,
    );
  let largestGapIndex = 0;
  let largestGap = -1;

  for (let index = 0; index < sorted.length; index += 1) {
    const current = sorted[index].relativeLongitude;
    const next = sorted[(index + 1) % sorted.length].relativeLongitude;
    const gap = circularGap(current, next);

    if (gap > largestGap) {
      largestGap = gap;
      largestGapIndex = index;
    }
  }

  const startIndex = (largestGapIndex + 1) % sorted.length;
  const ordered = [
    ...sorted.slice(startIndex),
    ...sorted.slice(0, startIndex),
  ];
  let clusterRank = 0;

  return ordered.map((entry, index) => {
    if (index > 0) {
      const previous = ordered[index - 1];
      const separation = circularGap(
        previous.relativeLongitude,
        entry.relativeLongitude,
      );
      clusterRank = separation < minimumSeparation ? clusterRank + 1 : 0;
    }

    const lane = clusterRank % markerRadii.length;
    const overflowTier = Math.floor(clusterRank / markerRadii.length);
    const angularOffset =
      overflowTier === 0
        ? 0
        : Math.ceil(overflowTier / 2) *
          6 *
          (overflowTier % 2 === 1 ? 1 : -1);
    const exactSvgAngle = longitudeToSvgAngle(
      entry.body.longitude,
      ascendant,
    );
    const displaySvgAngle = normalizeChartAngle(
      exactSvgAngle + angularOffset,
    );
    const displayRadius = roundSvgNumber(markerRadii[lane]);

    return {
      body: entry.body,
      exactSvgAngle,
      displaySvgAngle,
      exactPoint: pointAtSvgAngle(exactSvgAngle, exactRadius, center),
      displayPoint: pointAtSvgAngle(
        displaySvgAngle,
        displayRadius,
        center,
      ),
      displayRadius,
    };
  });
}

export { findHouseForLongitude } from "./house-placement";
