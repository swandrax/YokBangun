import { describe, expect, it } from "vitest";
import fs from "fs";
import path from "path";
import { GET as getAssetlinks } from "@/app/.well-known/assetlinks.json/route";
import { validateContact } from "@/features/contact/schema";

describe("Android App Links & Vercel Configuration", () => {
  it("public/.well-known/assetlinks.json matches the exact specification", () => {
    const filePath = path.join(process.cwd(), "public", ".well-known", "assetlinks.json");
    expect(fs.existsSync(filePath)).toBe(true);

    const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    expect(Array.isArray(content)).toBe(true);
    expect(content.length).toBe(1);

    const entry = content[0];
    expect(entry.relation).toEqual(["delegate_permission/common.handle_all_urls"]);
    expect(entry.target.namespace).toBe("android_app");
    expect(entry.target.package_name).toBe("id.yokbangun.app");
    expect(entry.target.sha256_cert_fingerprints).toEqual([
      "9C:3D:07:58:29:B2:00:4B:BA:1B:64:98:9D:3A:53:09:41:FE:00:AE:1C:1D:14:75:63:2D:AE:36:11:DD:DC:04",
    ]);
  });

  it("app/.well-known/assetlinks.json route handler returns 200 with correct headers", async () => {
    const response = getAssetlinks();
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("application/json");
    expect(response.headers.get("Cache-Control")).toBe("public, max-age=3600");

    const json = await response.json();
    expect(json[0].target.package_name).toBe("id.yokbangun.app");
  });

  it("vercel.json configures proper headers for assetlinks, manifest, sw, and api", () => {
    const vercelPath = path.join(process.cwd(), "vercel.json");
    expect(fs.existsSync(vercelPath)).toBe(true);

    const vercelConfig = JSON.parse(fs.readFileSync(vercelPath, "utf-8"));
    const headers = vercelConfig.headers as { source: string; headers: { key: string; value: string }[] }[];

    // assetlinks header
    const assetlinksRule = headers.find((h) => h.source === "/.well-known/assetlinks.json");
    expect(assetlinksRule).toBeDefined();
    expect(assetlinksRule?.headers.find((k) => k.key === "Content-Type")?.value).toBe("application/json");
    expect(assetlinksRule?.headers.find((k) => k.key === "Cache-Control")?.value).toContain("max-age=3600");

    // manifest header
    const manifestRule = headers.find((h) => h.source === "/manifest.webmanifest");
    expect(manifestRule).toBeDefined();
    expect(manifestRule?.headers.find((k) => k.key === "Content-Type")?.value).toBe("application/manifest+json");

    // sw header
    const swRule = headers.find((h) => h.source === "/sw.js");
    expect(swRule).toBeDefined();
    expect(swRule?.headers.find((k) => k.key === "Content-Type")?.value).toBe("application/javascript");
    expect(swRule?.headers.find((k) => k.key === "Service-Worker-Allowed")?.value).toBe("/");

    // api CORS header
    const apiRule = headers.find((h) => h.source === "/api/(.*)");
    expect(apiRule).toBeDefined();
    expect(apiRule?.headers.find((k) => k.key === "Access-Control-Allow-Origin")?.value).toBe("*");
    expect(apiRule?.headers.find((k) => k.key === "Access-Control-Allow-Methods")?.value).toContain("OPTIONS");
  });
});

describe("Companion PWA Specification", () => {
  it("public/manifest.webmanifest matches companion specification", () => {
    const manifestPath = path.join(process.cwd(), "public", "manifest.webmanifest");
    expect(fs.existsSync(manifestPath)).toBe(true);

    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
    expect(manifest.name).toBe("yokBangun — Solusi Digital & AI");
    expect(manifest.short_name).toBe("yokBangun");
    expect(manifest.start_url).toBe("/?source=pwa");
    expect(manifest.display).toBe("standalone");
    expect(manifest.background_color).toBe("#FFFFFF");
    expect(manifest.theme_color).toBe("#1F5D45");

    // Icons validation
    const iconSizes = manifest.icons.map((i: { sizes: string }) => i.sizes);
    expect(iconSizes).toContain("192x192");
    expect(iconSizes).toContain("512x512");
    const maskable = manifest.icons.find((i: { purpose?: string }) => i.purpose === "maskable");
    expect(maskable).toBeDefined();

    // Related applications
    expect(manifest.related_applications).toBeDefined();
    const playApp = manifest.related_applications.find((a: { platform: string }) => a.platform === "play");
    expect(playApp).toBeDefined();
    expect(playApp.id).toBe("id.yokbangun.app");
    expect(playApp.url).toBe("https://yok-bangun.vercel.app/download");
  });

  it("public/offline.html is bilingual, self-contained and explicitly notes contact submission disabled", () => {
    const offlinePath = path.join(process.cwd(), "public", "offline.html");
    expect(fs.existsSync(offlinePath)).toBe(true);

    const html = fs.readFileSync(offlinePath, "utf-8");
    expect(html).toContain("#1F5D45");
    expect(html).toContain("offline");
    // Bilingual indicators
    expect(html).toContain('data-lang="id"');
    expect(html).toContain('data-lang="en"');
    // Contact form disabled warning
    expect(html).toContain("Formulir Kontak Dinonaktifkan");
    expect(html).toContain("Live Contact Submissions Disabled");
  });

  it("public/sw.js contains Stale-While-Revalidate, Cache-First, and Network-Only strategies", () => {
    const swPath = path.join(process.cwd(), "public", "sw.js");
    expect(fs.existsSync(swPath)).toBe(true);

    const swContent = fs.readFileSync(swPath, "utf-8");
    // Precache offline shell
    expect(swContent).toContain("/offline.html");
    expect(swContent).toContain("/manifest.webmanifest");

    // Network-Only for contact form
    expect(swContent).toContain("/api/v1/contact");
    expect(swContent).toContain("offline");

    // Strategies
    expect(swContent).toContain("isStaticAsset");
    expect(swContent).toContain("isPublicContentApi");
  });
});

describe("PWA-to-Native Android Parity", () => {
  it("validates contact input with prototype stage", () => {
    const result = validateContact({
      name: "Budi Santoso",
      organisation: "Kopi Nusantara",
      email: "budi@kopinusantara.id",
      whatsapp: "081234567890",
      sector: "UMKM",
      stage: "prototype",
      need: "Kami butuh aplikasi katalog digital untuk pesanan pelanggan.",
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.stage).toBe("prototype");
      expect(result.data.sector).toBe("UMKM");
    }
  });
});
