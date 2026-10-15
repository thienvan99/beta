export const isGitHubPages = process.env.NEXT_PUBLIC_GITHUB_PAGES === "true";
export const siteBasePath = isGitHubPages ? "/beta" : "";

/** Only for raw asset/API URLs; Next Link and router already apply basePath. */
export function withBasePath(path: string): string {
  return `${siteBasePath}${path}`;
}
