/** Brand constants. The brand name must stay exactly as written here. */
export const brand = {
  name: "yokBangun",
  tagline: "growth with u",
  full: "yokBangun — growth with u",
} as const;

function normaliseUrl(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export const siteUrl = normaliseUrl(process.env.NEXT_PUBLIC_SITE_URL || "https://yokbangun.id");

/** Optional public contact details. Never hard-code invented numbers. */
export const publicContact = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  whatsapp: process.env.NEXT_PUBLIC_CONTACT_WHATSAPP || "",
};

export function absoluteUrl(path: string = "/"): string {
  return `${siteUrl}${path === "/" ? "" : path}` || siteUrl;
}
