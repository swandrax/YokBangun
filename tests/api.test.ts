import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { GET as getCaseStudies } from "@/app/api/v1/case-studies/route";
import { GET as getProducts } from "@/app/api/v1/products/route";
import { POST as postContact } from "@/app/api/contact/route";
import { POST as postPartnership } from "@/app/api/partnership/route";

describe("API v1 Data Endpoints (GET)", () => {
  describe("GET /api/v1/case-studies", () => {
    it("returns all 5 focus sector case studies for locale id", async () => {
      const req = new NextRequest("http://localhost:3000/api/v1/case-studies?locale=id");
      const res = getCaseStudies(req);
      expect(res.status).toBe(200);
      expect(res.headers.get("Cache-Control")).toContain("public");

      const data = await res.json();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBe(5);

      const sectorKeys = data.map((d: { sectorKey: string }) => d.sectorKey);
      expect(sectorKeys).toContain("civicgov");
      expect(sectorKeys).toContain("home-business");
      expect(sectorKeys).toContain("umkm");
      expect(sectorKeys).toContain("kesehatan");
      expect(sectorKeys).toContain("pendidikan");

      // Verify data shape
      const first = data[0];
      expect(first).toHaveProperty("slug");
      expect(first).toHaveProperty("title");
      expect(first).toHaveProperty("problem");
      expect(first).toHaveProperty("built");
      expect(first).toHaveProperty("technology");
      expect(first).toHaveProperty("outcome");
    });

    it("returns english localized case studies for locale en", async () => {
      const req = new NextRequest("http://localhost:3000/api/v1/case-studies?locale=en");
      const res = getCaseStudies(req);
      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.length).toBe(5);
      expect(data.find((d: { sectorKey: string }) => d.sectorKey === "kesehatan")?.sector).toBe(
        "Health services"
      );
    });
  });

  describe("GET /api/v1/products", () => {
    it("returns 5 products aligned with the 5 focus sectors for locale id", async () => {
      const req = new NextRequest("http://localhost:3000/api/v1/products?locale=id");
      const res = getProducts(req);
      expect(res.status).toBe(200);
      expect(res.headers.get("Cache-Control")).toContain("public");

      const data = await res.json();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBe(5);

      const slugs = data.map((p: { slug: string }) => p.slug);
      expect(slugs).toContain("etalase-umkm");
      expect(slugs).toContain("civicgov-layanan-warga");
      expect(slugs).toContain("antrean-faskes");
      expect(slugs).toContain("asisten-pengetahuan");
      expect(slugs).toContain("jadwal-booking");

      const healthProduct = data.find((p: { slug: string }) => p.slug === "antrean-faskes");
      expect(healthProduct?.name).toBe("Antrean & Layanan Faskes");
      expect(healthProduct?.capabilities.length).toBeGreaterThan(0);
    });

    it("returns english localized products for locale en", async () => {
      const req = new NextRequest("http://localhost:3000/api/v1/products?locale=en");
      const res = getProducts(req);
      expect(res.status).toBe(200);

      const data = await res.json();
      expect(data.length).toBe(5);
      const healthProduct = data.find((p: { slug: string }) => p.slug === "antrean-faskes");
      expect(healthProduct?.name).toBe("Healthcare Queue & Booking");
    });
  });
});

describe("Inbound Ingestion Endpoints (POST)", () => {
  describe("POST /api/contact (Enterprise & Business)", () => {
    it("accepts a valid enterprise contact submission with 201 Created", async () => {
      const body = {
        name: "Budi Santoso",
        organisation: "PT Nusantara Digital Makmur",
        email: "budi@nusantaradigital.id",
        whatsapp: "081234567890",
        sector: "umkm",
        need: "Kebutuhan integrasi operasional sistem kasir dan inventori multi-cabang skala enterprise.",
        stage: "planning",
        website: "", // honeypot empty
      };

      const req = new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.1" },
        body: JSON.stringify(body),
      });

      const res = await postContact(req);
      expect(res.status).toBe(201);
      const json = await res.json();
      expect(json).toEqual({ ok: true });
    });

    it("rejects invalid contact input with 422 Unprocessable Entity", async () => {
      const req = new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.2" },
        body: JSON.stringify({ name: "" }),
      });

      const res = await postContact(req);
      expect(res.status).toBe(422);
      const json = await res.json();
      expect(json.ok).toBe(false);
      expect(json.errors).toBeDefined();
    });

    it("silently accepts bot honeypot submission with 201 without delivery", async () => {
      const req = new Request("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.3" },
        body: JSON.stringify({
          name: "Spam Bot",
          organisation: "Spam Org",
          email: "spam@example.com",
          whatsapp: "081234567890",
          sector: "umkm",
          need: "Buy crypto now please visit my malicious link",
          stage: "planning",
          website: "http://spam-link.com", // honeypot filled
        }),
      });

      const res = await postContact(req);
      expect(res.status).toBe(201);
      const json = await res.json();
      expect(json).toEqual({ ok: true });
    });
  });

  describe("POST /api/partnership (Startups & SME)", () => {
    it("accepts a valid startup/SME partnership submission with 201 Created", async () => {
      const body = {
        name: "Dewi Lestari",
        organisation: "HealthTech Startup Hub",
        email: "dewi@healthhub.io",
        type: "technology",
        message: "Kami ingin mendiskusikan integrasi API sistem jadwal klinik dengan platform kesehatan kami.",
        website: "", // honeypot empty
      };

      const req = new Request("http://localhost:3000/api/partnership", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.4" },
        body: JSON.stringify(body),
      });

      const res = await postPartnership(req);
      expect(res.status).toBe(201);
      const json = await res.json();
      expect(json).toEqual({ ok: true });
    });

    it("rejects invalid partnership input with 422 Unprocessable Entity", async () => {
      const req = new Request("http://localhost:3000/api/partnership", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.5" },
        body: JSON.stringify({
          name: "Dewi",
          organisation: "",
          email: "invalid-email",
          type: "invalid-type",
          message: "Hi",
        }),
      });

      const res = await postPartnership(req);
      expect(res.status).toBe(422);
      const json = await res.json();
      expect(json.ok).toBe(false);
      expect(json.errors).toBeDefined();
    });

    it("silently drops bot submissions when honeypot is filled", async () => {
      const req = new Request("http://localhost:3000/api/partnership", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": "10.0.0.6" },
        body: JSON.stringify({
          name: "Spam Bot",
          organisation: "Spam Corp",
          email: "bot@spam.com",
          type: "business",
          message: "Check out our cheap SEO services here",
          website: "http://bot-honeypot.xyz",
        }),
      });

      const res = await postPartnership(req);
      expect(res.status).toBe(201);
      const json = await res.json();
      expect(json).toEqual({ ok: true });
    });
  });
});
