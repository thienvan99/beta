import type { PlanetId } from "./solar-system-data";

export const PHYSICAL_COORDINATE_FRAME = "ECLIPTIC_J2000" as const;
export const ASTRONOMICAL_UNIT = "AU" as const;

export type PhysicalVectorAU = Readonly<{
  x: number;
  y: number;
  z: number;
}>;

export type BodyOrientation = Readonly<{
  northPole: PhysicalVectorAU;
  spinDegrees: number;
}>;

export type PlanetPhysicalState = Readonly<{
  heliocentric: PhysicalVectorAU;
  orientation: BodyOrientation;
}>;

export type MoonPhysicalState = Readonly<{
  geocentric: PhysicalVectorAU;
  heliocentric: PhysicalVectorAU;
  orientation: BodyOrientation;
}>;

export type SolarSystemPhysicalState = Readonly<{
  timestampUtcMs: number;
  frame: typeof PHYSICAL_COORDINATE_FRAME;
  unit: typeof ASTRONOMICAL_UNIT;
  planets: Readonly<Record<PlanetId, PlanetPhysicalState>>;
  moon: MoonPhysicalState;
  sunOrientation: BodyOrientation;
}>;

export interface EphemerisProvider {
  readonly id: string;
  readonly coordinateFrame: typeof PHYSICAL_COORDINATE_FRAME;
  getPhysicalState(timestampUtcMs: number): SolarSystemPhysicalState;
}
