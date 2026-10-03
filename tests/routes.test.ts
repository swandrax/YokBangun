import { describe, expect, it } from "vitest";
import { primaryNav, publicRoutes } from "@/lib/navigation";
import id from "@/messages/id";
import en from "@/messages/en";
import { localizedPath } from "@/lib/i18n/config";

describe("navigation and routes", () => {
  it("has primary nav items that match message keys in both languages", () => {
    for (const item of primaryNav) {
      expect(id.nav).toHaveProperty(item.key);
      expect(en.nav).toHaveProperty(item.key);
      expect(typeof id.nav[item.key]).toBe("string");
      expect(id.nav[item.key].length).toBeGreaterThan(0);
    }
  });

  it("has correctly formatted public routes", () => {
    expect(publicRoutes.length).toBeGreaterThanOrEqual(10);
    for (const route of publicRoutes) {
      expect(route.startsWith("/")).toBe(true);
      expect(route).not.toContain(" ");
      expect(route).toBe(route.toLowerCase());
    }
  });

  it("resolves all public routes to valid localized paths", () => {
    for (const route of publicRoutes) {
      const idPath = localizedPath("id", route);
      const enPath = localizedPath("en", route);

      if (route === "/") {
        expect(idPath).toBe("/");
        expect(enPath).toBe("/en");
      } else {
        expect(idPath).toBe(route);
        expect(enPath).toBe(`/en${route}`);
      }
    }
  });
});
