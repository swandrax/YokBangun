import { localizedPath, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { absoluteUrl, brand, publicContact, siteUrl } from "@/lib/site";

/**
 * Schema.org builders. Only facts we can stand behind:
 * no ratings, reviews, founding dates, or employee counts.
 */
type JsonLdObject = Record<string, unknown>;

const ORG_ID = `${siteUrl}/#organization`;

export function organizationSchema(locale: Locale): JsonLdObject {
  const t = getMessages(locale);
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: brand.name,
    alternateName: brand.full,
    slogan: brand.tagline,
    url: siteUrl,
    logo: absoluteUrl("/brand/yokbangun-mark.svg"),
    image: absoluteUrl("/opengraph-image"),
    description: t.meta.siteDescription,
    areaServed: { "@type": "Country", name: "Indonesia" },
    knowsLanguage: ["id", "en"],
    ...(publicContact.email ? { email: publicContact.email } : {}),
    knowsAbout: t.whatWeBuild.categories.map((c) => c.title),
  };
}

export function websiteSchema(locale: Locale): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: brand.full,
    url: absoluteUrl(localizedPath(locale, "/")),
    inLanguage: locale,
    publisher: { "@id": ORG_ID },
  };
}

export function servicesSchema(locale: Locale): JsonLdObject[] {
  const t = getMessages(locale);
  return t.whatWeBuild.categories.map((category) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: category.title,
    description: category.description,
    serviceType: category.title,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "Indonesia" },
    url: absoluteUrl(`${localizedPath(locale, "/services")}#${category.key}`),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: category.title,
      itemListElement: category.items.map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: item },
      })),
    },
  }));
}

export function breadcrumbSchema(locale: Locale, trail: { name: string; path: string }[]): JsonLdObject {
  const t = getMessages(locale);
  const items = [{ name: t.common.breadcrumbHome, path: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(localizedPath(locale, item.path)),
    })),
  };
}
