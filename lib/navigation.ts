import type { Messages } from "@/lib/i18n/messages";

type NavKey = keyof Messages["nav"];

export type NavItem = { key: NavKey; href: string };

/** Primary navigation, in the order requested by the IA brief. */
export const primaryNav: NavItem[] = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "aiServices", href: "/ai-services" },
  { key: "products", href: "/products" },
  { key: "sectors", href: "/sectors" },
  { key: "work", href: "/work" },
  { key: "partnership", href: "/partnership" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
];

/** All public routes, used by the sitemap and route tests. */
export const publicRoutes = [
  "/",
  "/services",
  "/ai-services",
  "/products",
  "/sectors",
  "/work",
  "/partnership",
  "/about",
  "/contact",
  "/technical",
] as const;
