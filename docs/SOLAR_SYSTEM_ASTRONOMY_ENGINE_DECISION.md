# Solar System Astronomy Engine Decision

**Status:** Accepted for V1<br>
**Date:** 2026-08-25<br>
**Scope:** `/solar-system` physical position and simulation-time layer

## Decision

- Runtime ephemeris provider: `astronomy-engine@2.1.19` (MIT), pinned exactly.
- Renderer: existing Three.js implementation.
- Production state: Sun-centered geometric positions for eight planets and an Earth-centered geometric Moon vector.
- External validation oracle: official NASA/JPL Horizons vector output. JPL is not a runtime dependency.
- Future high-precision provider seam: `EphemerisProvider`; a `JplDe442Provider` is not implemented in V1.
- Stellarium Web Engine is not a dependency and no Stellarium code, shader, texture, WASM, or asset is copied into this project.

## Physical and observed state

V1 implements only physical geometric state. It does not apply light-time, stellar aberration, atmospheric refraction, observer location, or apparent/topocentric sky coordinates. Apparent RA/Dec must not be used to place bodies in this scene.

## Coordinate convention

Astronomy Engine returns `HelioVector` and `GeoMoon` in J2000 mean equatorial coordinates (`EQJ`). `AstronomyEngineProvider` converts them with the official `Rotation_EQJ_ECL()` and `RotateVector()` APIs into J2000 mean ecliptic coordinates (`ECL`).

Physical ECL axes:

- `+X`: J2000 mean equinox.
- `+Y`: 90 degrees prograde in the ecliptic plane, viewed from ecliptic north.
- `+Z`: ecliptic north.

Three.js world mapping is right-handed:

- ECL `+X` → Three `+X`.
- ECL `+Y` → Three `-Z`.
- ECL `+Z` → Three `+Y`.

Therefore `cross(map(+X), map(+Y)) = map(+Z)`, preventing a mirrored Solar System. Unit tests lock this convention.

## Physical versus display scale

Physical vectors remain in AU. The renderer receives separate scene positions:

- Planet radius uses a monotonic logarithmic AU compression calibrated so 1 AU maps to 17 scene units.
- Direction and orbital inclination are preserved exactly by scaling the entire vector by one positive scalar.
- The Moon uses its calculated Earth-relative direction. Only its distance magnitude is exaggerated around the existing 3.2-unit visual separation.
- Body radii remain visual constants and are not true scale.

## Time model

`simulationTime` is an absolute UTC epoch value and is the only source of body positions. While playing, one speed unit means one simulated day per real second. Pause freezes the timestamp; resume continues from the same timestamp and retains the previous speed. Camera transition timing continues to use real monotonic time and is independent of simulation speed.

The product-supported input range is `1600-01-01T00:00:00Z` through `2200-12-31T23:59:59.999Z`. This is a UI/product support range, not a claim that every body and timestamp in the interval has been checked against JPL.

## Orientation

Astronomy Engine `RotationAxis` supplies the J2000 north-pole direction and IAU prime-meridian spin angle. V1 maps those into the same ECL/Three coordinate convention. Saturn's ring is a child of Saturn's oriented body group, so its plane remains Saturn's equatorial plane. No legacy orbital angle or independent visual spin may drive physical body state after migration.

## JPL validation procedure

JPL Horizons is an independent regression oracle only. It is never called by production code. Validation uses official Horizons `VECTORS` output with:

- Planets: target body center, center `500@10` (Sun).
- Moon: target `301`, center `500@399` (Earth).
- `REF_SYSTEM=ICRF`, `REF_PLANE=FRAME`, `OUT_UNITS=AU-D`.
- `VEC_CORR=NONE`, `VEC_TABLE=1`, `TIME_TYPE=TDB`, `TLIST_TYPE=JD`, Gregorian calendar.
- Raw Astronomy Engine `HelioVector`/`GeoMoon` EQJ vectors are compared before the provider's ECL rotation and before all Three.js display mapping.
- Each JDTDB list value is Astronomy Engine's TT Julian date for the exact user UTC timestamp. TT differs from TDB periodically by less than 0.002 seconds, negligible for these regression bounds.

Comparisons use angular direction separation and radial-distance relative error, not raw XYZ equality. Regression tolerances are `0.01°` direction and `0.01%` radial distance for planets; `0.015°` and `0.01%` for the Moon. These bounds reject a time-zone/day shift, wrong origin, wrong frame, mirrored axes, or AU/km error while leaving model-level headroom between Astronomy Engine's analytic theories and JPL numerical solutions. They are not spacecraft-navigation tolerances.

The executed query metadata, fixture values, bodies, dates, and measured errors are recorded in `jpl-horizons-fixtures.ts` and `jpl-horizons-validation.test.ts`.

**External validation status: PASS — executed 2026-08-25 against NASA/JPL Horizons API 1.2.** All 55 available body/epoch samples passed. Maximum measured errors were:

- Planets: `0.005373259°` direction (Neptune, 1850-01-01) and `0.004590327%` radial distance (Mercury, 2200-12-31).
- Moon: `0.008406062°` direction (1600-01-01, about `0.504 arcmin`) and `0.003177979%` radial distance (1850-01-01).

Validated user timestamps are `1600-01-01T00:00:00Z`, `1750-01-01T00:00:00Z`, `1850-01-01T00:00:00Z`, J2000, `2026-08-25T00:00:00Z`, `2100-01-01T00:00:00Z`, and `2200-12-31T00:00:00Z`, subject to each Horizons solution's actual coverage. Mercury, Venus, Earth, and Moon cover all seven fixtures. Mars, Saturn, and Uranus do not cover the 1600 fixture. Jupiter does not cover 1600 or the 2200-12-31 fixture. Neptune does not cover 1600, 1750, or 2200-12-31. These entries are explicitly recorded as `not validated at this epoch`; no fixture is extrapolated.

Horizons reported `DE441` for Mercury, Venus, Earth, Moon, and most Sun-center states; body-specific solutions `mar099`, `jup365_merged`, `sat441l`, `ura184_merged`, and `nep098_merged` for other targets. The response-reported solution is authoritative for this test; this validation does not claim to use DE442.

## Moon discrepancy investigation

The previous fixture compared a future user label (`2100-01-01 UTC`) using Horizons `TIME_TYPE=UT`. Horizons treats future UTC as `UT~` and holds the last known leap-second correction constant, while Astronomy Engine converts its UT/UTC-like input to TT with the Espenak–Meeus ΔT model. At 2100, Astronomy Engine's ΔT is about `202.65 s`; the old Horizons conversion represented an instant about `133.5 s` away. The Moon's fast orbital motion turns that time mismatch into the former `0.021790814°` (`1.31 arcmin`) angular discrepancy.

With both engines evaluated at the same dynamical instant, the 2100 Moon error is `0.000296390°`; the largest Moon direction error in the expanded sample is instead `0.008406062°` at 1600. Raw ICRF/EQJ and rotated ECL comparisons agree to a few millionths of a degree, so center, units, aberration, light-time, reference frame, and the EQJ→ECL transform were excluded as causes. Production time calculation was not changed or calibrated to fit JPL.

## DE442 reference

DE442 remains only a possible future offline/high-precision provider candidate. V1 does not ship a DE442 BSP or SPICE runtime, and the current Horizons regression fixtures use the solutions actually reported in each response, primarily DE441 and body-specific integrations.

## Stellarium reference and licensing

Stellarium Web Engine was reviewed only as a product/architecture reference for possible future `/sky` capabilities such as atmosphere, Gaia, HiPS, constellations, and landscapes. Its repository is GNU AGPL v3; future integration requires an explicit AGPL-compliance or commercial-license decision. V1 does not integrate it.

## Static deployment and limitations

The page remains client-side/static, without API keys, backend ephemeris calls, Horizons runtime requests, SPICE, or BSP kernels. The supported product range is 1600–2200; only the listed representative epochs are regression-checked against Horizons. Astronomy Engine is not intended for spacecraft navigation, astrometric research precision, apparent-sky observation, or topocentric observer calculations. V1 has no observer sky mode.
