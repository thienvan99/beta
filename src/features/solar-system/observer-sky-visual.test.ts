import { describe, expect, it } from "vitest";
import {
  OBSERVER_SKY_BODY_NAMES,
  type ObserverSkyBody,
  type ObserverSkyProjection,
} from "./observer-sky-projection";
import {
  createObserverSkyVisualBodies,
  observerAzimuthAltitudeToLocalDirection,
  projectObserverSkyBodyForDome,
} from "./observer-sky-visual";

function expectDirection(
  azimuth: number,
  altitude: number,
  expected: { x: number; y: number; z: number },
) {
  const direction = observerAzimuthAltitudeToLocalDirection(azimuth, altitude);
  expect(direction.x).toBeCloseTo(expected.x, 12);
  expect(direction.y).toBeCloseTo(expected.y, 12);
  expect(direction.z).toBeCloseTo(expected.z, 12);
}

function body(
  name: ObserverSkyBody["body"],
  azimuthDegrees: number,
  altitudeDegrees: number,
  aboveHorizon = altitudeDegrees >= 0,
): ObserverSkyBody {
  return { body: name, azimuthDegrees, altitudeDegrees, aboveHorizon };
}

describe("Observer local-horizon geometry", () => {
  it("locks North/East/South/West to +X/+Z/-X/-Z on the horizon", () => {
    expectDirection(0, 0, { x: 1, y: 0, z: 0 });
    expectDirection(90, 0, { x: 0, y: 0, z: 1 });
    expectDirection(180, 0, { x: -1, y: 0, z: 0 });
    expectDirection(270, 0, { x: 0, y: 0, z: -1 });
  });

  it("locks zenith and nadir to the Up axis", () => {
    expectDirection(17, 90, { x: 0, y: 1, z: 0 });
    expectDirection(231, -90, { x: 0, y: -1, z: 0 });
  });

  it("wraps azimuth 0/360 without changing direction or dome point", () => {
    const zero = observerAzimuthAltitudeToLocalDirection(0, 23);
    const wrap = observerAzimuthAltitudeToLocalDirection(360, 23);
    expect(wrap.x).toBeCloseTo(zero.x, 12);
    expect(wrap.y).toBeCloseTo(zero.y, 12);
    expect(wrap.z).toBeCloseTo(zero.z, 12);

    const zeroPoint = projectObserverSkyBodyForDome(body("Sun", 0, 0)).domePoint;
    const wrapPoint = projectObserverSkyBodyForDome(body("Sun", 360, 0)).domePoint;
    expect(wrapPoint?.xPercent).toBeCloseTo(zeroPoint?.xPercent ?? 0, 12);
    expect(wrapPoint?.yPercent).toBeCloseTo(zeroPoint?.yPercent ?? 0, 12);
  });

  it("maps zenith to center and cardinal horizon points to the outer ring", () => {
    expect(projectObserverSkyBodyForDome(body("Sun", 0, 90)).domePoint).toEqual({
      xPercent: 50,
      yPercent: 50,
    });
    expect(projectObserverSkyBodyForDome(body("Sun", 0, 0)).domePoint).toEqual({
      xPercent: 50,
      yPercent: 7,
    });
    const east = projectObserverSkyBodyForDome(body("Sun", 90, 0)).domePoint;
    const south = projectObserverSkyBodyForDome(body("Sun", 180, 0)).domePoint;
    const west = projectObserverSkyBodyForDome(body("Sun", 270, 0)).domePoint;
    expect(east?.xPercent).toBeCloseTo(93, 12);
    expect(east?.yPercent).toBeCloseTo(50, 12);
    expect(south?.xPercent).toBeCloseTo(50, 12);
    expect(south?.yPercent).toBeCloseTo(93, 12);
    expect(west?.xPercent).toBeCloseTo(7, 12);
    expect(west?.yPercent).toBeCloseTo(50, 12);
  });

  it("maps a representative intermediate coordinate deterministically", () => {
    const first = observerAzimuthAltitudeToLocalDirection(45, 30);
    const second = observerAzimuthAltitudeToLocalDirection(45, 30);
    expect(first).toEqual(second);
    expect(first.x).toBeCloseTo(Math.sqrt(3 / 8), 12);
    expect(first.y).toBeCloseTo(0.5, 12);
    expect(first.z).toBeCloseTo(Math.sqrt(3 / 8), 12);
  });

  it("never places a canonical below-horizon body on the visible dome", () => {
    const source = body("Moon", 145.5, -0.0001, false);
    const visual = projectObserverSkyBodyForDome(source);
    expect(visual.source).toBe(source);
    expect(visual.domePoint).toBeNull();
    expect(visual.localDirection.y).toBeLessThan(0);
  });

  it("preserves exact production identity and values for all 10 bodies", () => {
    const bodies = OBSERVER_SKY_BODY_NAMES.map((name, index) => body(
      name,
      index * 35.123456,
      index - 4.5,
    ));
    const projection: ObserverSkyProjection = {
      instantUtc: "1990-01-15T01:30:00.000Z",
      timestampUtcMs: Date.parse("1990-01-15T01:30:00.000Z"),
      observer: { latitude: 10.8231, longitude: 106.6297, elevationMeters: 0 },
      policy: {
        topocentric: true,
        lightTime: "applied",
        parallax: "applied",
        aberration: "on",
        atmosphericRefraction: "off",
      },
      bodies,
    };
    const visual = createObserverSkyVisualBodies(projection);
    expect(visual).toHaveLength(10);
    for (let index = 0; index < bodies.length; index += 1) {
      expect(visual[index].source).toBe(bodies[index]);
      expect(visual[index].source.body).toBe(bodies[index].body);
      expect(visual[index].source.azimuthDegrees).toBe(bodies[index].azimuthDegrees);
      expect(visual[index].source.altitudeDegrees).toBe(bodies[index].altitudeDegrees);
      expect(visual[index].source.aboveHorizon).toBe(bodies[index].aboveHorizon);
    }
  });

  it("rejects non-finite and out-of-range altitude input", () => {
    expect(() => observerAzimuthAltitudeToLocalDirection(Number.NaN, 0)).toThrow(RangeError);
    expect(() => observerAzimuthAltitudeToLocalDirection(0, 90.0001)).toThrow(RangeError);
    expect(() => observerAzimuthAltitudeToLocalDirection(0, -90.0001)).toThrow(RangeError);
  });
});
