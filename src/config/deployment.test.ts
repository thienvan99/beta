import { afterEach, expect, it, vi } from "vitest";

afterEach(() => { vi.unstubAllEnvs(); vi.resetModules(); });

it("uses /beta for Pages assets and canonical URLs without weakening origin validation", async () => {
  vi.stubEnv("NEXT_PUBLIC_GITHUB_PAGES", "true");
  vi.stubEnv("SITE_URL", "https://thienvan99.github.io");
  vi.resetModules();
  const deployment = await import("./deployment");
  const site = await import("./site-url");
  expect(deployment.withBasePath("/solar-system/textures/earth.png")).toBe("/beta/solar-system/textures/earth.png");
  expect(site.homeCanonicalUrl).toBe("https://thienvan99.github.io/beta/");
  expect(site.getAbsoluteSiteUrl("/sitemap.xml")).toBe("https://thienvan99.github.io/beta/sitemap.xml");
  expect(() => site.resolveSiteOrigin({ siteUrl: "https://thienvan99.github.io/beta", nodeEnv: "production" })).toThrow();
});

it("keeps the server deployment at its existing root path", async () => {
  vi.stubEnv("NEXT_PUBLIC_GITHUB_PAGES", "false");
  vi.resetModules();
  const deployment = await import("./deployment");
  expect(deployment.isGitHubPages).toBe(false);
  expect(deployment.withBasePath("/solar-system/textures/earth.png")).toBe("/solar-system/textures/earth.png");
});
