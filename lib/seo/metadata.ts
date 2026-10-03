import type { Metadata } from "next";
import { defaultLocale, localizedPath, locales, ogLocale, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { brand, siteUrl } from "@/lib/site";

export type PageKey = keyof ReturnType<typeof getMessages>["meta"]["pages"];

export function alternatesFor(locale: Locale, path: string): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = localizedPath(l, path);
  languages["x-default"] = localizedPath(defaultLocale, path);
  return {
    canonical: localizedPath(locale, path),
    languages,
    types: {
      "application/rss+xml": "/feed.xml",
    },
  };
}

/** Shared base for every route (used by the [locale] layout). */
export function baseMetadata(locale: Locale): Metadata {
  const t = getMessages(locale).meta;
  return {
    metadataBase: new URL(siteUrl),
    title: { default: t.siteTitle, template: `%s — ${brand.name}` },
    description: t.siteDescription,
    applicationName: brand.full,
    authors: [{ name: brand.name }],
    creator: brand.name,
    formatDetection: { telephone: false, email: false, address: false },
    robots: { index: true, follow: true },
    alternates: {
      canonical: localizedPath(locale, "/"),
      languages: {
        id: "/id",
        en: "/en",
        "x-default": "/id",
      },
      types: {
        "application/rss+xml": "/feed.xml",
      },
    },
    openGraph: {
      type: "website",
      siteName: brand.full,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      title: t.siteTitle,
      description: t.siteDescription,
      url: localizedPath(locale, "/"),
    },
    twitter: {
      card: "summary_large_image",
      title: t.siteTitle,
      description: t.siteDescription,
    },
  };
}

/** Metadata for an inner page. */
export function pageMetadata(locale: Locale, key: PageKey, path: string): Metadata {
  const page = getMessages(locale).meta.pages[key];
  const fullTitle = `${page.title} — ${brand.name}`;
  return {
    title: page.title,
    description: page.description,
    alternates: alternatesFor(locale, path),
    openGraph: {
      type: "website",
      siteName: brand.full,
      locale: ogLocale[locale],
      title: fullTitle,
      description: page.description,
      url: localizedPath(locale, path),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: page.description },
  };
}
