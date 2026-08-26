import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const rendererSource = readFileSync(
  resolve(process.cwd(), "src/features/solar-system/solar-system-renderer.ts"),
  "utf8",
);
const explorerSource = readFileSync(
  resolve(process.cwd(), "src/features/solar-system/solar-system-explorer.tsx"),
  "utf8",
);

describe("P5 renderer integration boundary", () => {
  it("uses the calibrated Earth frame without replacing other body orientation", () => {
    expect(rendererSource).toContain("createEarthPresentationFrame(timestampUtcMs)");
    expect(rendererSource).toContain("this.applyBodyOrientation(runtime.spinRoot, planetState.orientation)");
  });

  it("parents the birth marker to the same spin root as the texture", () => {
    expect(rendererSource).toContain("spinRoot.add(planet)");
    expect(rendererSource).toContain("spinRoot.add(birthMarker)");
    expect(rendererSource).toContain("createBirthLocationMarkerPresentation(context)");
  });

  it("fails closed through beginBirthSnapshot before syncing the scene", () => {
    const beginIndex = rendererSource.indexOf("beginBirthSnapshot(context, this.simulationClock)");
    const syncIndex = rendererSource.indexOf(
      "this.syncAstronomicalState(context.timestampUtcMs)",
      beginIndex,
    );
    expect(beginIndex).toBeGreaterThan(-1);
    expect(syncIndex).toBeGreaterThan(beginIndex);
  });

  it("routes every public and animation clock mutation through semantic guards", () => {
    expect(rendererSource).toContain(
      "setSolarScenePaused(this.sceneState, this.simulationClock, paused)",
    );
    expect(rendererSource).toContain(
      "setSolarSceneTimestamp(this.sceneState, this.simulationClock, timestampUtcMs)",
    );
    expect(rendererSource).toContain("setSolarSceneToNow(this.sceneState, this.simulationClock)");
    expect(rendererSource).toContain(
      "advanceSolarSceneClock(this.sceneState, this.simulationClock, realDelta)",
    );
    expect(rendererSource).not.toContain("this.simulationClock.advance(realDelta)");
  });

  it("neutralizes decorative Solar stars at the semantic Observer handoff", () => {
    expect(rendererSource).toContain("handoffBirthEarthToObserver(this.sceneState)");
    expect(rendererSource).toContain("this.setDecorativeStarsVisible(false)");
    expect(rendererSource).toContain("this.callbacks.onBirthObserverHandoff?.(observerState.context)");
    expect(rendererSource).not.toContain("observer-sky-projection");
  });

  it("keeps the P5 renderer as a semantic handoff rather than an Observer calculator", () => {
    expect(rendererSource).not.toContain("calculateObserverSkyProjection");
    expect(rendererSource).not.toContain('from "./observer-sky-projection"');
    expect(rendererSource).not.toContain("WesternProjectionGeometry");
    expect(explorerSource).toContain("enterBirthEarth");
  });
});
