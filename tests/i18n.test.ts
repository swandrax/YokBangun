import { describe, expect, it } from "vitest";
import id from "@/messages/id";
import en from "@/messages/en";
import { defaultLocale, isLocale, locales, localizedPath } from "@/lib/i18n/config";

/**
 * Recursively extracts dot-notated key paths from an object.
 */
function getKeyPaths(obj: Record<string, unknown>, prefix = ""): string[] {
  const keys: string[] = [];
  for (const [k, v] of Object.entries(obj)) {
    const nextPath = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) {
      keys.push(...getKeyPaths(v as Record<string, unknown>, nextPath));
    } else {
      keys.push(nextPath);
    }
  }
  return keys.sort();
}

describe("i18n configuration", () => {
  it("defines id as the default locale and supports en", () => {
    expect(defaultLocale).toBe("id");
    expect(locales).toEqual(["id", "en"]);
    expect(isLocale("id")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("fr")).toBe(false);
  });

  it("formats localized paths correctly", () => {
    expect(localizedPath("id", "/")).toBe("/");
    expect(localizedPath("id", "/services")).toBe("/services");
    expect(localizedPath("en", "/")).toBe("/en");
    expect(localizedPath("en", "/services")).toBe("/en/services");
    expect(localizedPath("en", "/services#pricing")).toBe("/en/services#pricing");
  });
});

describe("i18n dictionary symmetry", () => {
  const idKeys = getKeyPaths(id as unknown as Record<string, unknown>);
  const enKeys = getKeyPaths(en as unknown as Record<string, unknown>);

  it("has exactly matching key hierarchies between Indonesian and English", () => {
    expect(enKeys).toEqual(idKeys);
  });

  it("contains non-empty content in all string values", () => {
    function assertNoEmptyStrings(obj: Record<string, unknown>, path = "") {
      for (const [k, v] of Object.entries(obj)) {
        const cur = path ? `${path}.${k}` : k;
        if (k === "tag") continue; // tag is an optional taxonomy label
        if (typeof v === "string") {
          expect(v.trim().length, `Empty string at ${cur}`).toBeGreaterThan(0);
        } else if (Array.isArray(v)) {
          v.forEach((item, idx) => {
            if (typeof item === "string") {
              expect(item.trim().length, `Empty array string at ${cur}[${idx}]`).toBeGreaterThan(0);
            } else if (typeof item === "object" && item !== null) {
              assertNoEmptyStrings(item as Record<string, unknown>, `${cur}[${idx}]`);
            }
          });
        } else if (v && typeof v === "object") {
          assertNoEmptyStrings(v as Record<string, unknown>, cur);
        }
      }
    }

    assertNoEmptyStrings(id as unknown as Record<string, unknown>, "id");
    assertNoEmptyStrings(en as unknown as Record<string, unknown>, "en");
  });
});
