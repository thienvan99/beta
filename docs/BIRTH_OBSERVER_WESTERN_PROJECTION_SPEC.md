# Birth Observer + Western Projection Architecture Spec

**Status:** Owner Approved / Accepted

**Date:** 2026-08-25

**Scope:** Canonical architecture and delivery gates only; no Birth Observer or Western Projection UI implementation

## 1. Purpose

This document freezes the architecture for the phase after Solar System Astronomy V1 under the product principle:

> **Một bầu trời – nhiều phép chiếu.**

The phase reuses one normalized birth context while keeping physical astronomy, an observer's apparent sky, and Western astrology as separate representations. It must not weaken the verified Western calculation engine or the accepted Solar V1 physical state.

The architecture decisions and amendments in this document were owner-approved on 2026-08-25. At that initial freeze, `BOWP-P0-001` was DONE and the approval made only `BOWP-P1-001` READY; current delivery progress is recorded in section 13 and the canonical task/status documents.

## 2. Canonical decisions

This specification expands the decisions logged as:

- `DEC-SOLAR-001`: Solar System Astronomy V1 is accepted and DONE within its documented scope.
- `DEC-SKY-001`: Solar Physical Space, Birth Observer Sky Space, and Western Astrology Projection Space are distinct representations.
- `DEC-OBS-001`: Observer V1 input, apparent/topocentric policy, time behavior, range behavior, and validation boundary are fixed.
- `DEC-WPROJ-001`: Western projection geometry is a derived view of the exact canonical `WesternAstrologyResult`.
- `DEC-PRODUCT-002`: Birth Observer + Western Projection is the next canonical phase; older Place Picker/SEO tasks retain their factual status but are no longer next canonical.

These decisions alone do not imply implementation or validation completion. Current evidence records the headless Observer implementation, independent Observer validation, headless Western projection geometry, and Earth presentation calibration/semantic transition as DONE/PASS. P6 is now IN PROGRESS: Birth Observer UI Vertical Slice 1 has implementation and passing targeted/browser/full-unit evidence but remains PARTIAL / NOT OWNER APPROVED because the mandatory production build cannot finish page-data collection without the environment's approved `SITE_URL`; Western UI remains pending.

## 3. Non-goals for this phase freeze

- Do not implement Birth Observer UI in this documentation task.
- Do not change `src/lib/western-astrology.ts` or its calculation behavior.
- Do not change the Solar System ephemeris provider, renderer, coordinate mapping, time model, accepted JPL fixtures, or tolerances.
- Do not add a dependency, runtime Horizons request, star catalog, landscape, Milky Way, constellation layer, or Gaia data.
- Do not create a new birth storage/session system.
- Do not claim independent Observer validation from a repeated Astronomy Engine calculation.
- Do not model Zi Wei stars as physical stars or use astronomy to prove an astrological or metaphysical system.
- Do not implement full three-dimensional Placidus surfaces in V1.
- Do not open transit or general time-exploration behavior in this snapshot phase.

## 4. Three representation spaces

### 4.1. Solar Physical Space

| Property | Canonical value |
| --- | --- |
| Origin | Sun-centered for the eight planets; Earth-centered Moon vector is also retained by the physical provider |
| State | Geometric |
| Frame | J2000 mean ecliptic, `ECLIPTIC_J2000` |
| Physical unit | AU |
| Runtime source | `astronomy-engine@2.1.19` through the accepted `EphemerisProvider` boundary |
| Display | Direction-preserving, distance-dependent logarithmic radial compression; visual body sizes and Moon separation are not physical scale |
| Time source | `simulationTime` through the current `SimulationClock` |

Canonical evidence remains `docs/SOLAR_SYSTEM_ASTRONOMY_ENGINE_DECISION.md`. Observer work must not mutate this physical state to make an observer view fit.

### 4.2. Birth Observer Sky Space

| Property | Canonical value |
| --- | --- |
| Origin | Geographic observer on Earth |
| State | Apparent observational direction |
| Coordinates | Local horizon: azimuth and altitude; an explicit typed vector may accompany these values |
| Corrections | Topocentric, light-time applied, parallax applied, aberration on, atmospheric refraction off |
| Elevation | `0 m` in V1 |
| Time | Exact resolved UTC instant from user-supplied birth data when supported, frozen as a snapshot |
| Bodies | Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto |

This is a separate headless projection. It does not infer line-of-sight from Solar meshes or Earth texture.

### 4.3. Western Astrology Projection Space

| Property | Canonical value |
| --- | --- |
| Source of truth | Existing `WesternAstrologyResult` |
| System | Geocentric Tropical Zodiac and Placidus behavior as implemented and validated today |
| Body angular truth | Exact `bodies[].longitude`, plus the canonical sign and house fields |
| Angles | Exact canonical ASC and MC entries in `angles` |
| Houses | Exact 12 canonical cusp entries in `houses` |
| Aspects | Exact canonical `aspects` set |
| Rendering | Derived geometry may change radius, layout, camera, labels, animation, and scene mapping, but never angular truth |

Western Projection must not consume Solar ECL J2000 mesh longitude, Observer topocentric longitude, or renderer-derived signs, houses, or aspects.

## 5. Critical invariants

### 5.1. A compressed Solar scene is not an Observer sky

`src/features/solar-system/astronomical-display.ts#physicalVectorToScenePosition` maps each physical heliocentric vector using a radial scale derived from that body's distance. Two bodies generally receive different positive scalar factors. Therefore subtraction after display compression does not preserve the original Earth-centric vector difference:

```text
display(P) - display(Earth) != sharedScale * (physical(P) - physical(Earth))
```

Putting a camera at the compressed Earth mesh and looking toward compressed planet meshes cannot provide canonical sky directions. Solar → Earth may be a presentation transition only. After that transition, the application must switch to Birth Observer Sky Space and its independent topocentric calculation output.

### 5.2. Observer truth does not depend on Earth texture

Earth mesh orientation, texture placement, `RotationAxis`, and the texture's prime-meridian alignment belong to presentation. The observer and local horizon come from UTC time plus geographic latitude, longitude, and elevation policy.

The Birth Location marker cannot be considered DONE until Earth texture/prime-meridian calibration has its own test or documented evidence. If a mismatch is found, fix presentation calibration; never alter astronomical observer calculation to fit the texture.

### 5.3. Western truth does not depend on visualization geometry

ASC, MC, Placidus cusps, bodies, signs, houses, and aspects remain canonical values from `WesternAstrologyResult`. A geometric horizon/ecliptic/meridian intersection may illustrate or validate a value, but it cannot overwrite it. A difference beyond an explicit tested/documented transformation tolerance is a visualization/transformation bug.

Identity fields copied from the canonical result use exact equality; no tolerance applies to a value that is only copied.

## 6. Shared input boundary

### 6.1. ObservationContext

The shared boundary should be equivalent to:

```ts
type ObservationContext = Readonly<{
  instantUtc: string;
  timestampUtcMs: number;
  latitude: number;
  longitude: number;
  elevationMeters: 0;
  timezone: Readonly<{
    ianaName: string;
    localDateTime: string;
    utcOffset: string;
    provenance: "birth-time-pipeline";
  }>;
}>;
```

The exact implementation name may differ, but its semantics must not. `instantUtc` and `timestampUtcMs` must represent exactly the same resolved instant. `timestampUtcMs` is the machine representation for calculation/provider/`SimulationClock` interoperability; `instantUtc` is the ISO representation for provenance, debugging, and display. They are two representations of one value, never independent time sources. Latitude/longitude are normalized numeric values, and elevation is fixed to zero for Observer V1. Timezone metadata remains for display and provenance after the instant is resolved; it must not be reapplied by observer calculations.

In this specification, **exact resolved birth instant** means the instant deterministically produced from the birth data supplied by the user. It does not imply that the system knows the person's real birth time more accurately than the supplied input. The current input has hour and minute precision, and the existing `calculateBirthTime` pipeline resolves seconds as `0`.

Gender is not part of `ObservationContext`. Existing school-specific consumers that need gender continue to read it from their own input boundary.

### 6.2. Pure builder and existing birth/session boundary

The pure, headless builder input should be equivalent to:

```ts
type ObservationContextInput = Readonly<{
  birthDate: string;
  hour: string;
  minute: string;
  latitude: string | number;
  longitude: string | number;
  timezone: string;
}>;
```

The implementation name/type may be refined during implementation review, but dependency direction is canonical:

```text
UI/session layer
    ↓
readActiveBirthSession()
    ↓
BirthData
    ↓
pure ObservationContext builder
```

The builder must not read `sessionStorage`, know a storage key, or create a persistence/session boundary. It receives values from its caller, excludes gender, reuses `calculateBirthTime`, and must not implement a competing local-time parser.

The current typed active session boundary is:

```text
src/lib/active-birth-session.ts
└ ActiveBirthSession { version, birthData: BirthData }
```

Its normalized input type is `BirthData` in `src/lib/birth-data.ts`. The canonical local-time → instant conversion is `calculateBirthTime` in `src/lib/birth-time.ts`. The current result consumer reads the session and resolves birth time in `src/components/private-result-client.tsx`.

`src/lib/active-birth-session.ts` remains only the persistence/session boundary. The UI/session layer may read it and pass the resulting `BirthData` fields into the pure builder. The builder itself must not import or call `readActiveBirthSession()`.

### 6.3. Exact time invariant

```text
local birth date/time
+ IANA timezone
→ calculateBirthTime
→ one exact resolved UTC instant
├ ObservationContext.instantUtc
└ ObservationContext.timestampUtcMs
```

`instantUtc` and `timestampUtcMs` must round-trip to the same instant. Every birth-mode provider receives that same resolved instant. No downstream renderer or projection may reinterpret the local fields or timezone.

## 7. Range and snapshot policy

`SimulationClock` currently clamps timestamps to the Solar product range `1600-01-01T00:00:00Z` through `2200-12-31T23:59:59.999Z`. That behavior remains valid for general Solar simulation.

`ObservationContext` is factual normalized birth context. It never clamps, deletes, or substitutes its resolved instant because of a provider's product range. Capability evaluation is a separate step:

```text
BirthData
   ↓
pure ObservationContext builder
   ↓
ObservationContext with original normalized factual instant
   ↓
Observer capability evaluation: supported | unsupported
```

The Observer/Solar range check must use the resolved UTC instant (`timestampUtcMs`/equivalent), not only the local calendar year. For example, local `1600-01-01` that resolves before `1600-01-01T00:00:00Z` is unsupported.

Birth-mode entry must check capability before passing the instant into any clamping API:

```text
resolved birth instant supported by Observer capability
→ set the exact resolved instant
→ pause
→ render Observer and Western snapshots from that same instant

resolved birth instant outside Observer/Solar supported range
→ explicit Observer Mode unavailable state
→ retain original instantUtc, timestampUtcMs, and provenance
→ do not substitute 1600 or 2200
```

The capability result is equivalent to `supported | unsupported`; it is not a mutation of `ObservationContext`. Western calculation has its own capability and failure behavior. It is not automatically restricted or mutated by the Observer/Solar range.

Birth Observer and Western Projection are natal snapshots. Simulation must not continue advancing behind a fixed natal output. Transit/time exploration needs a separate future state and contract.

## 8. Headless ObserverSkyProjection

### 8.1. Required input and output semantics

A headless provider should accept only a valid, supported `ObservationContext` and return a deterministic typed result equivalent to:

```ts
type ObserverSkyBody = Readonly<{
  body: "Sun" | "Moon" | "Mercury" | "Venus" | "Mars" |
    "Jupiter" | "Saturn" | "Uranus" | "Neptune" | "Pluto";
  azimuthDegrees: number;
  altitudeDegrees: number;
  aboveHorizon: boolean;
}>;

type ObserverSkyProjection = Readonly<{
  instantUtc: string;
  timestampUtcMs: number;
  observer: Readonly<{
    latitude: number;
    longitude: number;
    elevationMeters: 0;
  }>;
  policy: Readonly<{
    topocentric: true;
    lightTime: "applied";
    parallax: "applied";
    aberration: "on";
    atmosphericRefraction: "off";
  }>;
  bodies: readonly ObserverSkyBody[];
}>;
```

Names and additional typed vector/frame fields may be refined during implementation review, but azimuth/altitude, `aboveHorizon`, policy, instant, and observer provenance must remain explicit.

Observer V1 locks these horizontal-coordinate conventions:

```text
Azimuth:
0°   = North / Bắc
90°  = East / Đông
180° = South / Nam
270° = West / Tây
increasing clockwise when viewed from above

Altitude:
+90° = Zenith / thiên đỉnh
0°   = geometric horizon
-90° = Nadir / thiên để

aboveHorizon = altitudeDegrees >= 0
```

UI must consume `aboveHorizon` or the same canonical predicate; it must not invent a different horizon threshold.

### 8.2. Astronomy Engine policy

Use official Astronomy Engine observer/topocentric APIs rather than reimplementing astronomy formulas when the library provides them. The intended V1 path is based on:

- `new Observer(latitude, longitude, 0)`;
- `Equator(body, instant, observer, true, true)` for topocentric coordinates of date, with built-in light-time and parallax and aberration enabled;
- `Horizon(instant, observer, ra, dec, null)` or type-equivalent explicit call semantics so atmospheric refraction is visibly off;
- `ObserverVector`, `Rotation_EQJ_HOR`, and `Rotation_HOR_EQJ` only where a typed vector or transformation invariant needs them.

The implementation slice must lock axis/azimuth conventions with tests before renderer consumption. It must not use Solar mesh positions as input.

### 8.3. Decorative stars

The seeded-random star field in the current Solar renderer is decorative, not a catalog. Birth Observer V1 must hide it or replace it with a neutral sky background. It must not be presented as the real stellar sky.

Real stars, constellations, Milky Way, Gaia data, and landscape are future scope.

## 9. Headless WesternProjectionGeometry

### 9.1. Canonical input contract

The adapter receives the exact `WesternAstrologyResult` produced by `src/lib/western-astrology.ts`. It must read:

- `bodies[].longitude`, `sign`, and `house`;
- `angles` entries for ASC and MC;
- all 12 `houses[].longitude` cusp values;
- the exact `aspects` collection.

It must not call `GeoVector` or house/aspect calculation to recreate those values.

### 9.2. Derived scene geometry

To place a canonical Tropical longitude into the existing J2000 ecliptic scene, derived geometry may:

1. Create a unit vector at the exact longitude on the true ecliptic-of-date (`ECT`) ring for the birth instant.
2. Apply official `Rotation_ECT_EQJ(instant)`.
3. Apply official `Rotation_EQJ_ECL()`.
4. Apply the existing right-handed ECL → Three scene-axis mapping.

Radius is a display choice. The transformation may have a documented numerical tolerance; the source longitude itself must remain exact and traceable to its canonical field.

### 9.3. ASC, MC, houses, and aspects

- ASC and MC markers use exact canonical angle longitudes.
- Placidus V1 uses 12 canonical cusp markers or regions on the zodiac projection.
- Full 3D Placidus surfaces are out of scope.
- Polar Placidus errors retain current canonical Western behavior; no fallback house system is introduced.
- Aspect rendering uses the exact canonical aspect identity/set and its canonical endpoints; the renderer does not redetect aspects.

## 10. Scene state architecture

Birth modes must not be encoded as a special `focusedPlanetId`. The scene state model must preserve semantic boundaries equivalent to:

```text
solar-overview
planet-focus
birth-earth
birth-observer
western-projection
```

Implementation names may differ. Required behavior:

- `solar-overview` and `planet-focus` use Solar Physical Space and `simulationTime`.
- Entering supported birth context sets the exact resolved instant and pauses the clock.
- `birth-earth` is a presentation transition/calibration state, not observer truth.
- `birth-observer` consumes only `ObserverSkyProjection`.
- `western-projection` consumes only `WesternAstrologyResult` through derived projection geometry.
- Leaving birth snapshot behavior must be explicit; no hidden clock advance may desynchronize representations.

## 11. Validation architecture

### 11.1. Solar validation remains unchanged

The accepted 55 available body/epoch JPL samples, metadata, tolerances, and PASS evidence remain scoped to Solar physical geometric state. They do not validate Observer Mode and must not be relabeled as Observer evidence.

### 11.2. Independent Observer validation slice

Observer validation must be completed before Observer UI can be marked DONE. Prefer static NASA/JPL Horizons observer fixtures or an independent equivalent. Calling the same Astronomy Engine path twice is not independent validation.

Independent Observer validation must align the actual astronomical/Earth-rotation instant and document oracle time semantics before comparing topocentric azimuth/altitude. Matching calendar labels alone does not establish that production and oracle evaluated the same instant.

Before fixtures are canonicalized, record the oracle query contract, including:

- target/body identifiers and observer location encoding;
- submitted epoch;
- production resolved UTC instant (`instantUtc` and equivalent `timestampUtcMs`);
- oracle time convention and relevant Earth-rotation/time-scale convention;
- coordinate/reference frame;
- observer geodetic coordinates and elevation;
- refraction policy;
- aberration, light-time, parallax, and relevant model/correction differences;
- the canonical azimuth and altitude conventions;
- retrieval source/date and raw response provenance;
- comparison metric;
- tolerance, frozen before viewing final pass/fail results.

Tolerance must allow for documented correction/model differences where applicable; it must not assume Astronomy Engine and the independent oracle are absolutely identical. No fixture or PASS status is canonicalized in this docs-only freeze.

Minimum coverage:

- Vietnam;
- London;
- New York;
- Sydney;
- equator;
- high latitude;
- Moon near horizon;
- Sun near horizon;
- azimuth/longitude wrap cases.

Do not create placeholder values or label this slice PASS until the independent queries and comparisons have actually run.

### 11.3. Western identity and transformation tests

Exact identity tests must prove:

- every rendered body longitude originates from the exact canonical `bodies[].longitude`;
- rendered ASC is identical to the canonical ASC longitude;
- rendered MC is identical to the canonical MC longitude;
- rendered house cusps are identical to the canonical 12-cusp sequence;
- rendered aspects are identical to the canonical aspect set.

No tolerance applies to these copy/identity assertions. Separate geometry tests may use documented tolerances for `ECT → EQJ → ECL J2000 → Three` transformation and intersection comparisons.

### 11.4. Earth calibration gate

Before the Birth Location marker or Earth transition is DONE, add separate evidence for texture prime-meridian alignment and observer marker placement at known UTC/location cases. This gate validates presentation alignment only and must never tune observer astronomy.

## 12. Provider boundaries

Do not create a God object for all systems. The target dependency shape is:

```text
ObservationContext
├ Physical Solar provider
├ Observer Sky projection
├ Western Astrology adapter/projection
├ future Bazi adapter
└ future Zi Wei adapter
```

Each provider declares its own supported range/capability and output type. Shared context means shared factual birth instant/location provenance, not a shared coordinate system or a claim that the school systems are scientifically equivalent.

## 13. Canonical delivery order and gates

Only one implementation slice may be opened at a time:

1. **Canonical/spec freeze** — DONE / OWNER APPROVED on 2026-08-25 with the resolved-instant, capability, pure-builder, coordinate-convention, and validation-time amendments in this document.
2. **ObservationContext + resolved birth instant + capability boundary** — DONE; pure builder receives values from the UI/session layer, reuses `calculateBirthTime`, emits equivalent ISO/millisecond instant representations, and evaluates unsupported range without clamping factual context.
3. **Headless ObserverSkyProjection** — DONE; typed calculation only, no UI.
4. **Independent Observer validation** — DONE / PASS with static oracle metadata/fixtures and real retrieval/comparison evidence.
5. **Headless WesternProjectionGeometry + canonical identity tests** — DONE / PASS; exact identity plus separate frozen transformation tolerance tests.
6. **Earth birth-location visual calibration + transition** — DONE / PASS; exact asset/UV contract, official presentation reference, body-fixed marker, fail-closed paused snapshot, typed semantic handoff, and no Observer/Western UI.
7. **Observer/Western UI vertical slices** — IN PROGRESS; Birth Observer UI Vertical Slice 1 is PARTIAL / NOT OWNER APPROVED pending a full production build with the approved environment `SITE_URL`; Western UI remains pending. Beginner-first/expert-deep, accessible, responsive, no whole-page horizontal overflow, and decorative Solar stars hidden from Observer V1 remain required.
8. **Full regression + canonical DONE** — only after all technical, validation, UI, accessibility, and regression evidence exists.

Current delivery status: steps 1–6 are OWNER APPROVED / DONE / PASS. Observer validation retains 45/45 comparisons PASS at maximum direction separation `0.006605052335861644°` under its independent frozen `0.03°` tolerance. P5 pins the exact Earth asset at `2048×1024`, `1912469` bytes and SHA-256 `b5e0139834c638d10c2c747f4bac63df5f9387680c00d87e5a2a9ed9a3dfea71`; the NASA provenance claim is test-bound to the adjacent repository README and its stored source URL. The installed Three `SphereGeometry`/`TextureLoader` contract is Greenwich `+X`, north `+Y`, east `-Z`. The former `alignNorth × spin` presentation failed Greenwich by about `89.93°–90.06°` across the five frozen epochs and was not a constant within the gate. The corrected Earth-only presentation frame derives orthonormal Greenwich/north/west axes from official `ObserverVector → EQJ → ECL J2000 → Three`; maximum anchor separation is `0.0000012074182697257333°`, below the pre-frozen `0.010986328125°` (1/16 of a 2048-pixel longitude pixel). The birth marker shares Earth’s spin hierarchy; exact supported birth snapshots are paused and unsupported snapshots do not mutate/clamp the clock. A shared headless snapshot predicate/guard blocks unpause, timestamp edit, set-to-now and animation advance in `birth-earth`, `birth-observer` and `western-projection`; overview and ordinary planet focus retain generic Solar time controls. Semantic state explicitly hands `birth-earth` to `birth-observer` and neutralizes decorative Solar stars.

Step 7, `BOWP-P6-001`, is IN PROGRESS. Birth Observer UI Vertical Slice 1 reuses the active birth session and pure context builder, enters the accepted calibrated-Earth semantic path, then calculates production `ObserverSkyProjection` only after renderer handoff. Its React/SVG local-horizon frame is North `+X`, East `+Z`, Up `+Y`; above-horizon bodies are placed on a dome with zenith at center and geometric horizon at the outer ring, while below-horizon bodies remain exact typed results with explicit non-canvas status. Renderer remains free of Observer calculation and a second WebGL/animation loop; no Western UI exists. Targeted P6/semantic tests are 50/50 PASS, relevant Solar/Observer/P1–P5 regressions 147/147 PASS, full unit 734/734 PASS, lint and diff check PASS, and Playwright Chromium 10/10 PASS at 1280×720, 768, 390×844 and 360 with accessibility/no-overflow/runtime checks. Full-repo `tsc --noEmit` retains only pre-existing unrelated diagnostics in observation-context and Western synthesis tests. Production build compilation and Next TypeScript PASS, then `/sitemap.xml` page-data collection stops because the environment lacks `SITE_URL`; therefore this Observer slice remains PARTIAL / NOT OWNER APPROVED rather than DONE/PASS. Western UI is PENDING and step 8 remains NOT READY.

## 14. Status vocabulary

- **Accepted decision:** owner has fixed an architectural invariant; it does not imply implementation.
- **Owner Approved / Accepted:** the specification is the implementation contract; this does not imply implementation.
- **READY:** dependencies and approvals are complete for one bounded task.
- **DONE/PASS:** implementation or validation has executed and has recorded evidence.
- **Unsupported:** preserve the original input and show an explicit capability state; never silently substitute a supported boundary value.

## 15. Evidence map

| Concern | Current source/evidence |
| --- | --- |
| Accepted Solar V1 astronomy | `docs/SOLAR_SYSTEM_ASTRONOMY_ENGINE_DECISION.md` |
| Solar physical types/provider boundary | `src/features/solar-system/ephemeris-provider.ts` |
| Solar display compression and axis mapping | `src/features/solar-system/astronomical-display.ts` |
| Solar clock/range behavior | `src/features/solar-system/simulation-time.ts` |
| Typed active birth session | `src/lib/active-birth-session.ts` |
| Normalized birth data | `src/lib/birth-data.ts` |
| Canonical local birth time → UTC | `src/lib/birth-time.ts#calculateBirthTime` |
| Current session consumer | `src/components/private-result-client.tsx` |
| Canonical Western result/calculation | `src/lib/western-astrology.ts` |
| Headless Western projection geometry | `src/features/solar-system/western-projection-geometry.ts` |
| Western projection identity/transform evidence | `src/features/solar-system/western-projection-geometry.test.ts` |
| Exact Earth texture/UV/orientation/marker contract | `src/features/solar-system/earth-presentation.ts`, `src/features/solar-system/earth-presentation.test.ts` |
| Birth snapshot and typed semantic scene boundary | `src/features/solar-system/solar-scene-state.ts`, `src/features/solar-system/solar-scene-state.test.ts` |
| Renderer marker hierarchy and Observer handoff boundary | `src/features/solar-system/solar-system-renderer.ts`, `src/features/solar-system/solar-system-renderer-p5.test.ts` |

## 16. Owner approval record

Owner approval dated 2026-08-25 confirms:

- the three-space separation and non-negotiable invariants;
- Observer V1 body/correction/elevation/refraction policy;
- exact resolved birth snapshot and unsupported-range behavior;
- `WesternAstrologyResult` identity contract;
- semantic scene states;
- independent validation scope and oracle metadata requirements;
- Earth texture prime-meridian calibration as an unpassed implementation gate;
- `instantUtc`/`timestampUtcMs` identity, factual context/capability separation, pure builder dependency direction, coordinate conventions, explicit refraction-off semantics, and validation time-model/oracle contract;
- the dependency-ordered roadmap and that, at the time of the initial freeze, only `BOWP-P1-001` became READY.
