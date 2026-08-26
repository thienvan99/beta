import { describe, expect, it } from "vitest";
import {
  createObservationContext,
  type ObservationContext,
  type ObservationContextInput,
} from "../../lib/observation-context";
import {
  calculateObserverSkyProjection,
  OBSERVER_SKY_BODY_NAMES,
  type ObserverSkyProjection,
} from "./observer-sky-projection";

const vietnamInput: ObservationContextInput = {
  birthDate: "1990-01-15",
  hour: "8",
  minute: "30",
  latitude: 10.8231,
  longitude: 106.6297,
  timezone: "Asia/Ho_Chi_Minh",
};

function requireContext(input: ObservationContextInput): ObservationContext {
  const context = createObservationContext(input);
  expect(context).not.toBeNull();
  return context!;
}

function requireProjection(context: ObservationContext): ObserverSkyProjection {
  const result = calculateObserverSkyProjection(context);
  expect(result).toMatchObject({ ok: true });
  if (!result.ok) throw new Error(`Observer projection failed: ${result.reason}`);
  return result.projection;
}

function findMoon(projection: ObserverSkyProjection) {
  const moon = projection.bodies.find(({ body }) => body === "Moon");
  expect(moon).toBeDefined();
  return moon!;
}

describe("calculateObserverSkyProjection", () => {
  it("is deterministic, serializable, and preserves canonical Vietnam metadata", () => {
    const context = requireContext(vietnamInput);
    const first = requireProjection(context);
    const second = requireProjection(context);

    expect(first).toEqual(second);
    expect(JSON.parse(JSON.stringify(first))).toEqual(first);
    expect(first).toMatchObject({
      instantUtc: context.instantUtc,
      timestampUtcMs: context.timestampUtcMs,
      observer: {
        latitude: context.latitude,
        longitude: context.longitude,
        elevationMeters: context.elevationMeters,
      },
      policy: {
        topocentric: true,
        lightTime: "applied",
        parallax: "applied",
        aberration: "on",
        atmosphericRefraction: "off",
      },
    });
  });

  it("returns exactly the 10 canonical bodies once in deterministic order", () => {
    const projection = requireProjection(requireContext(vietnamInput));
    const names = projection.bodies.map(({ body }) => body);

    expect(names).toEqual(OBSERVER_SKY_BODY_NAMES);
    expect(new Set(names).size).toBe(10);
    expect(names).not.toContain("Earth");
  });

  it.each([
    ["Vietnam", 10.8231, 106.6297, "Asia/Ho_Chi_Minh", "19"],
    ["London", 51.5074, -0.1278, "Europe/London", "12"],
    ["New York", 40.7128, -74.006, "America/New_York", "7"],
    ["Sydney", -33.8688, 151.2093, "Australia/Sydney", "23"],
  ])(
    "produces finite canonical horizontal coordinates for %s (structural coverage only)",
    (_label, latitude, longitude, timezone, hour) => {
      const projection = requireProjection(requireContext({
        birthDate: "2024-01-15",
        hour,
        minute: "0",
        latitude,
        longitude,
        timezone,
      }));

      for (const body of projection.bodies) {
        expect(Number.isFinite(body.azimuthDegrees)).toBe(true);
        expect(body.azimuthDegrees).toBeGreaterThanOrEqual(0);
        expect(body.azimuthDegrees).toBeLessThan(360);
        expect(Number.isFinite(body.altitudeDegrees)).toBe(true);
        expect(body.altitudeDegrees).toBeGreaterThanOrEqual(-90);
        expect(body.altitudeDegrees).toBeLessThanOrEqual(90);
        expect(body.aboveHorizon).toBe(body.altitudeDegrees >= 0);
      }
    },
  );

  it("changes with time instead of returning an accidental constant projection", () => {
    const projections = ["1990-01-15", "2024-01-15", "2100-01-15"].map(
      (birthDate) => requireProjection(requireContext({ ...vietnamInput, birthDate })),
    );
    const bodyCoordinates = projections.map(({ bodies }) =>
      bodies.map(({ azimuthDegrees, altitudeDegrees }) => [
        azimuthDegrees,
        altitudeDegrees,
      ]),
    );

    expect(bodyCoordinates[0]).not.toEqual(bodyCoordinates[1]);
    expect(bodyCoordinates[1]).not.toEqual(bodyCoordinates[2]);
  });

  it("shows Moon sensitivity to observer location at the same resolved instant", () => {
    const vietnam = requireContext({
      ...vietnamInput,
      birthDate: "2024-01-15",
      hour: "19",
      minute: "0",
    });
    const london = requireContext({
      ...vietnamInput,
      birthDate: "2024-01-15",
      hour: "12",
      minute: "0",
      latitude: 51.5074,
      longitude: -0.1278,
      timezone: "Europe/London",
    });

    expect(vietnam.timestampUtcMs).toBe(london.timestampUtcMs);
    expect(findMoon(requireProjection(vietnam))).not.toEqual(
      findMoon(requireProjection(london)),
    );
  });

  it("shows Moon sensitivity to time for one observer", () => {
    const earlier = requireContext({
      ...vietnamInput,
      birthDate: "2024-01-15",
      hour: "19",
      minute: "0",
    });
    const later = requireContext({
      ...vietnamInput,
      birthDate: "2024-01-16",
      hour: "1",
      minute: "0",
    });

    expect(later.timestampUtcMs - earlier.timestampUtcMs).toBe(6 * 60 * 60 * 1_000);
    expect(findMoon(requireProjection(earlier))).not.toEqual(
      findMoon(requireProjection(later)),
    );
  });

  it.each([
    [
      "before lower bound",
      {
        birthDate: "1600-01-01",
        hour: "0",
        minute: "0",
        latitude: 10.8231,
        longitude: 106.6297,
        timezone: "Asia/Ho_Chi_Minh",
      },
    ],
    [
      "after upper bound",
      {
        birthDate: "2200-12-31",
        hour: "23",
        minute: "59",
        latitude: 40.7128,
        longitude: -74.006,
        timezone: "America/New_York",
      },
    ],
  ] satisfies readonly [string, ObservationContextInput][])(
    "returns no projection %s and does not clamp or mutate context",
    (_label, input) => {
      const context = requireContext(input);
      const original = JSON.parse(JSON.stringify(context)) as ObservationContext;

      expect(calculateObserverSkyProjection(context)).toEqual({
        ok: false,
        reason: "outside-supported-range",
      });
      expect(context).toEqual(original);
      expect(context.instantUtc).toBe(original.instantUtc);
      expect(context.timestampUtcMs).toBe(original.timestampUtcMs);
    },
  );

  it("rejects an inconsistent factual instant instead of calculating a partial result", () => {
    const context = requireContext(vietnamInput);
    const invalidContext: ObservationContext = {
      ...context,
      timestampUtcMs: context.timestampUtcMs + 1,
    };

    expect(calculateObserverSkyProjection(invalidContext)).toEqual({
      ok: false,
      reason: "invalid-observation-context",
    });
  });
});
