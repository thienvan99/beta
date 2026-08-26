import type { MetadataRoute } from "next";
import { getAbsoluteSiteUrl } from "../config/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: getAbsoluteSiteUrl("/"),
    },
    {
      url: getAbsoluteSiteUrl("/solar-system"),
    },
  ];
}
