import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["geo-tz"],
  ...(process.env.NEXT_PUBLIC_GITHUB_PAGES === "true" ? {
    output: "export" as const,
    basePath: "/beta",
    trailingSlash: true,
    images: { unoptimized: true },
  } : {}),
};

export default nextConfig;
