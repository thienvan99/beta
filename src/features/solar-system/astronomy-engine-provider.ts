import {
  Body,
  GeoMoon,
  HelioVector,
  RotateVector,
  RotationAxis,
  Rotation_EQJ_ECL,
  type Vector,
} from "astronomy-engine";
import {
  ASTRONOMICAL_UNIT,
  PHYSICAL_COORDINATE_FRAME,
  type BodyOrientation,
  type EphemerisProvider,
  type PhysicalVectorAU,
  type PlanetPhysicalState,
  type SolarSystemPhysicalState,
} from "./ephemeris-provider";
import { PLANET_IDS, type PlanetId } from "./solar-system-data";

const BODY_BY_PLANET_ID: Readonly<Record<PlanetId, Body>> = {
  mercury: Body.Mercury,
  venus: Body.Venus,
  earth: Body.Earth,
  mars: Body.Mars,
  jupiter: Body.Jupiter,
  saturn: Body.Saturn,
  uranus: Body.Uranus,
  neptune: Body.Neptune,
};

const EQJ_TO_ECL = Rotation_EQJ_ECL();

function toPhysicalVector(vector: Vector): PhysicalVectorAU {
  const ecliptic = RotateVector(EQJ_TO_ECL, vector);
  return { x: ecliptic.x, y: ecliptic.y, z: ecliptic.z };
}
function addVectors(left: PhysicalVectorAU, right: PhysicalVectorAU): PhysicalVectorAU {
  return {
    x: left.x + right.x,
    y: left.y + right.y,
    z: left.z + right.z,
  };
}

function getOrientation(body: Body, date: Date): BodyOrientation {
  const axis = RotationAxis(body, date);
  return {
    northPole: toPhysicalVector(axis.north),
    spinDegrees: axis.spin,
  };
}

export class AstronomyEngineProvider implements EphemerisProvider {
  readonly id = "astronomy-engine@2.1.19";
  readonly coordinateFrame = PHYSICAL_COORDINATE_FRAME;

  getPhysicalState(timestampUtcMs: number): SolarSystemPhysicalState {
    if (!Number.isFinite(timestampUtcMs)) {
      throw new RangeError("Ephemeris timestamp must be a finite UTC epoch value.");
    }

    const date = new Date(timestampUtcMs);
    const planets = {} as Record<PlanetId, PlanetPhysicalState>;

    for (const planetId of PLANET_IDS) {
      const body = BODY_BY_PLANET_ID[planetId];
      planets[planetId] = {
        heliocentric: toPhysicalVector(HelioVector(body, date)),
        orientation: getOrientation(body, date),
      };
    }

    const moonGeocentric = toPhysicalVector(GeoMoon(date));
    return {
      timestampUtcMs,
      frame: PHYSICAL_COORDINATE_FRAME,
      unit: ASTRONOMICAL_UNIT,
      planets,
      moon: {
        geocentric: moonGeocentric,
        heliocentric: addVectors(planets.earth.heliocentric, moonGeocentric),
        orientation: getOrientation(Body.Moon, date),
      },
      sunOrientation: getOrientation(Body.Sun, date),
    };
  }
}
