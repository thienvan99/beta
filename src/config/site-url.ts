const LOCAL_SITE_ORIGIN = "http://localhost:3000";

type SiteOriginOptions = {
  siteUrl?: string;
  nodeEnv?: string;
};

export function resolveSiteOrigin({
  siteUrl = process.env.SITE_URL,
  nodeEnv = process.env.NODE_ENV,
}: SiteOriginOptions = {}): string {
  const candidate = siteUrl?.trim();

  if (!candidate) {
    if (nodeEnv === "production") {
      throw new Error("SITE_URL is required in production.");
    }

    return LOCAL_SITE_ORIGIN;
  }

  let parsed: URL;

  try {
    parsed = new URL(candidate);
  } catch {
    throw new Error("SITE_URL must be a valid absolute HTTP(S) origin.");
  }

  if (
    !["http:", "https:"].includes(parsed.protocol) ||
    parsed.username ||
    parsed.password ||
    parsed.pathname !== "/" ||
    parsed.search ||
    parsed.hash
  ) {
    throw new Error("SITE_URL must be a valid absolute HTTP(S) origin.");
  }

  return parsed.origin;
}

export const siteOrigin = resolveSiteOrigin();

export function getAbsoluteSiteUrl(pathname: string): string {
  return new URL(pathname, `${siteOrigin}/`).toString();
}

export const homeCanonicalUrl = getAbsoluteSiteUrl("/");
