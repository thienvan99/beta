import { describe, expect, it } from "vitest";
import robots from "./robots";
import sitemap from "./sitemap";
import {
  getAbsoluteSiteUrl,
  homeCanonicalUrl,
  siteOrigin,
} from "../config/site-url";

describe("public-route technical SEO", () => {
  it("uses the canonical site origin for the home canonical", () => {
    expect(homeCanonicalUrl).toBe(`${siteOrigin}/`);
    expect(homeCanonicalUrl).toBe(getAbsoluteSiteUrl("/"));
  });

  it("includes the public indexable routes in the sitemap", () => {
    const entries = sitemap();

    expect(entries).toEqual([
      { url: getAbsoluteSiteUrl("/") },
      { url: getAbsoluteSiteUrl("/solar-system") },
    ]);
    expect(entries.some(({ url }) => url.includes("/ket-qua"))).toBe(false);
  });

  it("allows site resources and points to the sitemap on the same origin", () => {
    expect(robots()).toEqual({
      rules: {
        userAgent: "*",
        allow: "/",
      },
      sitemap: getAbsoluteSiteUrl("/sitemap.xml"),
    });
  });
});
