import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  Observer,
  ObserverVector,
  RotateVector,
  Rotation_EQJ_ECL,
} from "astronomy-engine";
import { SphereGeometry, Texture } from "three";
import { describe, expect, it } from "vitest";
import type { ObservationContext } from "../../lib/observation-context";
import { eclipticVectorToSceneAxes } from "./astronomical-display";
import {
  createBirthLocationMarkerPresentation,
  createEarthPresentationFrame,
  EARTH_PRESENTATION_TOLERANCE_DEGREES,
  EARTH_PRESENTATION_VALIDATION_EPOCHS,
  EARTH_TEXTURE_ASSET,
  EARTH_TEXTURE_DEGREES_PER_PIXEL,
  geographicToEarthLocalDirection,
  geographicToEarthTextureCoordinate,
  transformEarthLocalDirection,
  type EarthPresentationVector,
} from "./earth-presentation";

const EQJ_TO_ECL = Rotation_EQJ_ECL();

function normalize(vector: EarthPresentationVector): EarthPresentationVector {
  const length = Math.hypot(vector.x, vector.y, vector.z);
  return { x: vector.x / length, y: vector.y / length, z: vector.z / length };
}

function officialSceneDirection(
  timestampUtcMs: number,
  latitude: number,
  longitude: number,
): EarthPresentationVector {
  const eqj = ObserverVector(new Date(timestampUtcMs), new Observer(latitude, longitude, 0), false);
  return normalize(eclipticVectorToSceneAxes(RotateVector(EQJ_TO_ECL, eqj)));
}

function angularErrorDegrees(left: EarthPresentationVector, right: EarthPresentationVector): number {
  const dot = Math.max(-1, Math.min(1,
    left.x * right.x + left.y * right.y + left.z * right.z,
  ));
  return Math.acos(dot) * 180 / Math.PI;
}

function expectVectorClose(
  actual: EarthPresentationVector,
  expected: EarthPresentationVector,
  digits = 12,
): void {
  expect(actual.x).toBeCloseTo(expected.x, digits);
  expect(actual.y).toBeCloseTo(expected.y, digits);
  expect(actual.z).toBeCloseTo(expected.z, digits);
}

describe("Earth texture asset and installed Three.js UV contract", () => {
  it("pins the exact 2:1 Blue Marble asset by dimensions, bytes, and SHA-256", () => {
    expect(EARTH_TEXTURE_ASSET.publicPath).toBe(
      "/solar-system/textures/earth-blue-marble-2048.png",
    );
    expect(EARTH_TEXTURE_ASSET.repositoryPath).toBe(
      "public/solar-system/textures/earth-blue-marble-2048.png",
    );
    const bytes = readFileSync(resolve(process.cwd(), EARTH_TEXTURE_ASSET.repositoryPath));
    expect(bytes.subarray(1, 4).toString("ascii")).toBe("PNG");
    expect(bytes.readUInt32BE(16)).toBe(EARTH_TEXTURE_ASSET.widthPixels);
    expect(bytes.readUInt32BE(20)).toBe(EARTH_TEXTURE_ASSET.heightPixels);
    expect(bytes.byteLength).toBe(EARTH_TEXTURE_ASSET.byteLength);
    expect(createHash("sha256").update(bytes).digest("hex")).toBe(EARTH_TEXTURE_ASSET.sha256);
    expect(EARTH_TEXTURE_ASSET.widthPixels / EARTH_TEXTURE_ASSET.heightPixels).toBe(2);
  });

  it("binds the NASA provenance claim to the adjacent repository evidence", () => {
    const provenance = readFileSync(
      resolve(process.cwd(), EARTH_TEXTURE_ASSET.provenanceDocument),
      "utf8",
    );
    expect(EARTH_TEXTURE_ASSET.provenance).toContain("NASA Earth Observatory Blue Marble");
    expect(provenance).toContain(
      "`earth-blue-marble-2048.png` — NASA Earth Observatory, Blue Marble composite",
    );
    expect(provenance).toContain(EARTH_TEXTURE_ASSET.sourceUrl);
  });

  it("proves SphereGeometry longitude anchors and Texture.flipY from installed code", () => {
    const sphere = new SphereGeometry(1, 4, 2);
    const positions = sphere.getAttribute("position");
    const uvs = sphere.getAttribute("uv");
    const equatorRowStart = 5;

    expectVectorClose(
      { x: positions.getX(equatorRowStart), y: positions.getY(equatorRowStart), z: positions.getZ(equatorRowStart) },
      { x: -1, y: 0, z: 0 },
      6,
    );
    expect(uvs.getX(equatorRowStart)).toBe(0);
    expect(uvs.getY(equatorRowStart)).toBe(0.5);

    expectVectorClose(
      { x: positions.getX(equatorRowStart + 2), y: positions.getY(equatorRowStart + 2), z: positions.getZ(equatorRowStart + 2) },
      { x: 1, y: 0, z: 0 },
      6,
    );
    expect(uvs.getX(equatorRowStart + 2)).toBe(0.5);

    expectVectorClose(
      { x: positions.getX(equatorRowStart + 3), y: positions.getY(equatorRowStart + 3), z: positions.getZ(equatorRowStart + 3) },
      { x: 0, y: 0, z: -1 },
      6,
    );
    expect(uvs.getX(equatorRowStart + 3)).toBe(0.75);
    expect(new Texture().flipY).toBe(true);
    sphere.dispose();
  });

  it("freezes presentation tolerance independently from Observer numeric tolerance", () => {
    expect(EARTH_TEXTURE_DEGREES_PER_PIXEL).toBe(0.17578125);
    expect(EARTH_PRESENTATION_TOLERANCE_DEGREES).toBe(0.010986328125);
  });
});

describe("Earth geographic presentation contract", () => {
  it.each([
    [0, 0, { x: 1, y: 0, z: 0 }, { u: 0.5, v: 0.5 }],
    [0, 90, { x: 0, y: 0, z: -1 }, { u: 0.75, v: 0.5 }],
    [0, -90, { x: 0, y: 0, z: 1 }, { u: 0.25, v: 0.5 }],
    [90, 0, { x: 0, y: 1, z: 0 }, { u: 0.5, v: 1 }],
    [-90, 0, { x: 0, y: -1, z: 0 }, { u: 0.5, v: 0 }],
  ] as const)("maps latitude %s longitude %s", (latitude, longitude, direction, uv) => {
    expectVectorClose(geographicToEarthLocalDirection(latitude, longitude), direction);
    expect(geographicToEarthTextureCoordinate(latitude, longitude)).toEqual(uv);
  });

  it("maps a representative Vietnam location and wraps the longitude seam", () => {
    const latitude = 10.8231;
    const longitude = 106.6297;
    const uv = geographicToEarthTextureCoordinate(latitude, longitude);
    expect(uv.u).toBeCloseTo(0.7961936111111111, 12);
    expect(uv.v).toBeCloseTo(0.5601283333333333, 12);
    expect(geographicToEarthTextureCoordinate(latitude, longitude + 360)).toEqual(uv);
    expectVectorClose(
      geographicToEarthLocalDirection(latitude, longitude + 360),
      geographicToEarthLocalDirection(latitude, longitude),
    );
    expect(geographicToEarthTextureCoordinate(0, -180)).toEqual({ u: 0, v: 0.5 });
    expect(geographicToEarthTextureCoordinate(0, 180)).toEqual({ u: 0, v: 0.5 });
    expect(geographicToEarthTextureCoordinate(0, 179.999).u).toBeGreaterThan(0.999);
    expect(geographicToEarthTextureCoordinate(0, -179.999).u).toBeLessThan(0.001);
  });
});

describe("Earth presentation frame", () => {
  it.each(EARTH_PRESENTATION_VALIDATION_EPOCHS)(
    "keeps Greenwich, east/west equator, and poles within frozen tolerance at %s",
    (instantUtc) => {
      const timestamp = Date.parse(instantUtc);
      const frame = createEarthPresentationFrame(timestamp);
      const anchors = [
        [geographicToEarthLocalDirection(0, 0), officialSceneDirection(timestamp, 0, 0)],
        [geographicToEarthLocalDirection(0, 90), officialSceneDirection(timestamp, 0, 90)],
        [geographicToEarthLocalDirection(0, -90), officialSceneDirection(timestamp, 0, -90)],
        [geographicToEarthLocalDirection(90, 0), officialSceneDirection(timestamp, 90, 0)],
        [geographicToEarthLocalDirection(-90, 0), officialSceneDirection(timestamp, -90, 0)],
      ] as const;

      for (const [local, official] of anchors) {
        expect(angularErrorDegrees(transformEarthLocalDirection(frame, local), official))
          .toBeLessThanOrEqual(EARTH_PRESENTATION_TOLERANCE_DEGREES);
      }
      expect(frame.timestampUtcMs).toBe(timestamp);
      expect(frame.policy.earthShapeUse).toBe("orientation-only");
    },
  );

  it("keeps the exact context while carrying a marker with the calibrated Earth", () => {
    const context: ObservationContext = Object.freeze({
      instantUtc: "1990-01-15T01:30:00.000Z",
      timestampUtcMs: Date.parse("1990-01-15T01:30:00.000Z"),
      latitude: 10.8231,
      longitude: 106.6297,
      elevationMeters: 0,
      timezone: Object.freeze({
        ianaName: "Asia/Ho_Chi_Minh",
        localDateTime: "1990-01-15T08:30:00+07:00[Asia/Ho_Chi_Minh]",
        utcOffset: "+07:00",
        provenance: "birth-time-pipeline",
      }),
    });
    const marker = createBirthLocationMarkerPresentation(context);
    const frame = createEarthPresentationFrame(context.timestampUtcMs);

    expect(marker.context).toBe(context);
    expect(marker.textureCoordinate).toEqual(
      geographicToEarthTextureCoordinate(context.latitude, context.longitude),
    );
    expectVectorClose(marker.localDirection, geographicToEarthLocalDirection(10.8231, 106.6297));
    expectVectorClose(marker.sceneDirection, transformEarthLocalDirection(frame, marker.localDirection));
    expect(Object.isFrozen(context)).toBe(true);
  });

  it.each([
    [0, 0],
    [0, 90],
    [0, -90],
    [35, 25],
    [-35, 25],
    [90, 0],
    [-90, 0],
    [10.8231, 106.6297],
    [12, 179.999],
    [12, -179.999],
  ])("derives marker placement from the texture sphere at latitude %s longitude %s", (
    latitude,
    longitude,
  ) => {
    const timestampUtcMs = Date.parse("1990-01-15T01:30:00.000Z");
    const context: ObservationContext = {
      ...({
        instantUtc: new Date(timestampUtcMs).toISOString(),
        timestampUtcMs,
        latitude,
        longitude,
        elevationMeters: 0,
        timezone: {
          ianaName: "UTC",
          localDateTime: "1990-01-15T01:30:00+00:00[UTC]",
          utcOffset: "+00:00",
          provenance: "birth-time-pipeline",
        },
      } as const),
    };
    const marker = createBirthLocationMarkerPresentation(context);
    expectVectorClose(marker.localDirection, geographicToEarthLocalDirection(latitude, longitude));
    expectVectorClose(
      marker.sceneDirection,
      transformEarthLocalDirection(
        createEarthPresentationFrame(timestampUtcMs),
        marker.localDirection,
      ),
    );
  });
});
