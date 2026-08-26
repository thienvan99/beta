import { describe, expect, it } from "vitest";
import {
  eclipticVectorToSceneAxes,
  moonVectorToSceneOffset,
  physicalVectorToScenePosition,
  sceneRadiusFromAu,
  vectorLength,
} from "./astronomical-display";

function cross(
  left: Readonly<{ x: number; y: number; z: number }>,
  right: Readonly<{ x: number; y: number; z: number }>,
) {
  return {
    x: left.y * right.z - left.z * right.y,
    y: left.z * right.x - left.x * right.z,
    z: left.x * right.y - left.y * right.x,
  };
}

describe("astronomical display mapping", () => {
  it("maps ECL axes into a right-handed Three.js world without mirroring", () => {
    const x = eclipticVectorToSceneAxes({ x: 1, y: 0, z: 0 });
    const y = eclipticVectorToSceneAxes({ x: 0, y: 1, z: 0 });
    const z = eclipticVectorToSceneAxes({ x: 0, y: 0, z: 1 });

    expect(x).toEqual({ x: 1, y: 0, z: -0 });
    expect(y).toEqual({ x: 0, y: 0, z: -1 });
    expect(z).toEqual({ x: 0, y: 1, z: -0 });
    const handedness = cross(x, y);
    expect(handedness.x).toBeCloseTo(z.x, 12);
    expect(handedness.y).toBeCloseTo(z.y, 12);
    expect(handedness.z).toBeCloseTo(z.z, 12);
  });

  it("compresses AU distance while preserving physical direction", () => {
    const physical = { x: 2, y: -3, z: 0.5 };
    const mapped = physicalVectorToScenePosition(physical);
    const mappedAxes = eclipticVectorToSceneAxes(physical);
    const mappedLength = Math.hypot(mapped.x, mapped.y, mapped.z);
    const axesLength = Math.hypot(mappedAxes.x, mappedAxes.y, mappedAxes.z);

    expect(mapped.x / mappedLength).toBeCloseTo(mappedAxes.x / axesLength, 12);
    expect(mapped.y / mappedLength).toBeCloseTo(mappedAxes.y / axesLength, 12);
    expect(mapped.z / mappedLength).toBeCloseTo(mappedAxes.z / axesLength, 12);
    expect(sceneRadiusFromAu(1)).toBeCloseTo(17, 12);
  });

  it("exaggerates only Moon distance magnitude and keeps its direction", () => {
    const moon = { x: 0.001, y: 0.002, z: -0.0004 };
    const offset = moonVectorToSceneOffset(moon);
    const axes = eclipticVectorToSceneAxes(moon);

    expect(offset.x / vectorLength(offset)).toBeCloseTo(axes.x / vectorLength(axes), 12);
    expect(offset.y / vectorLength(offset)).toBeCloseTo(axes.y / vectorLength(axes), 12);
    expect(offset.z / vectorLength(offset)).toBeCloseTo(axes.z / vectorLength(axes), 12);
  });
});
