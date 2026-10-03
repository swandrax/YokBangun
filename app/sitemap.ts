import type { MetadataRoute } from "next";
import { defaultLocale, localizedPath, locales } from "@/lib/i18n/config";
import { publicRoutes } from "@/lib/navigation";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of publicRoutes) {
    const alternatesLanguages: Record<string, string> = {};
    for (const l of locales) {
      alternatesLanguages[l] = absoluteUrl(localizedPath(l, path));
    }
    alternatesLanguages["x-default"] = absoluteUrl(localizedPath(defaultLocale, path));

    for (const locale of locales) {
      entries.push({
        url: absoluteUrl(localizedPath(locale, path)),
        lastModified: new Date(),
        changeFrequency: path === "/" ? "weekly" : "monthly",
        priority: path === "/" ? 1.0 : path === "/services" || path === "/contact" ? 0.9 : 0.8,
        alternates: {
          languages: alternatesLanguages,
        },
      });
    }
  }

  return entries;
}
