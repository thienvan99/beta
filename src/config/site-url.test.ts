import { describe, expect, it } from "vitest";
import {
  getAbsoluteSiteUrl,
  resolveSiteOrigin,
  siteOrigin,
} from "./site-url";

describe("site-origin contract", () => {
  it("accepts HTTP(S) origins and normalizes the trailing slash", () => {
    expect(
      resolveSiteOrigin({
        siteUrl: "https://example.com/",
        nodeEnv: "production",
      }),
    ).toBe("https://example.com");
    expect(
      resolveSiteOrigin({
        siteUrl: "http://localhost:4000",
        nodeEnv: "development",
      }),
    ).toBe("http://localhost:4000");
  });

  it.each(["ftp://example.com", "not-an-absolute-url"])(
    "rejects invalid SITE_URL %s",
    (siteUrl) => {
      expect(() =>
        resolveSiteOrigin({ siteUrl, nodeEnv: "production" }),
      ).toThrow("SITE_URL must be a valid absolute HTTP(S) origin.");
    },
  );

  it("fails clearly when production SITE_URL is missing", () => {
    expect(() =>
      resolveSiteOrigin({ siteUrl: "", nodeEnv: "production" }),
    ).toThrow("SITE_URL is required in production.");
  });

  it("uses the single resolved origin for absolute URLs", () => {
    expect(getAbsoluteSiteUrl("/")).toBe(`${siteOrigin}/`);
    expect(getAbsoluteSiteUrl("/sitemap.xml")).toBe(
      `${siteOrigin}/sitemap.xml`,
    );
  });
});
