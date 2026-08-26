import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const explorerSource = readFileSync(
  resolve(process.cwd(), "src/features/solar-system/solar-system-explorer.tsx"),
  "utf8",
);
const viewSource = readFileSync(
  resolve(process.cwd(), "src/features/solar-system/observer-sky-view.tsx"),
  "utf8",
);

describe("P6 Explorer orchestration boundary", () => {
  it("reads the existing active session and resolves a narrow ObservationContext entry", () => {
    expect(explorerSource).toContain("readActiveBirthSession()?.birthData ?? null");
    expect(explorerSource).toContain("resolveBirthObserverEntry(");
    expect(explorerSource).not.toContain("sessionStorage");
    expect(explorerSource).not.toContain("activeBirthSessionStorageKey");
  });

  it("passes the exact ready context through renderer entry before production projection", () => {
    const enterIndex = explorerSource.indexOf(
      "rendererRef.current.enterBirthEarth(observerEntry.context)",
    );
    const handoffIndex = explorerSource.indexOf("onBirthObserverHandoff: (context)");
    const projectionIndex = explorerSource.indexOf(
      "calculateObserverSkyProjection(context)",
      handoffIndex,
    );
    expect(enterIndex).toBeGreaterThan(-1);
    expect(handoffIndex).toBeGreaterThan(-1);
    expect(projectionIndex).toBeGreaterThan(handoffIndex);
  });

  it("activates Observer UI only after the birth-observer handoff and exits explicitly", () => {
    expect(explorerSource).toContain('setObserverStage("birth-earth")');
    expect(explorerSource).toContain('setObserverStage("birth-observer")');
    expect(explorerSource).toContain(
      'observerStage === "birth-observer" && observerProjection',
    );
    expect(explorerSource).toContain("rendererRef.current?.showOverview()");
  });

  it("keeps Observer presentation separate from Western and extra WebGL loops", () => {
    expect(explorerSource).not.toMatch(/WesternProjectionGeometry|western-projection/i);
    expect(viewSource).not.toMatch(/WesternProjectionGeometry|western-projection/i);
    expect(viewSource).not.toMatch(/requestAnimationFrame|WebGLRenderer|THREE\./);
    expect(explorerSource.match(/<canvas/g) ?? []).toHaveLength(0);
  });
});
