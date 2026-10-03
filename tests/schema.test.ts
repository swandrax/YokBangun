import { describe, expect, it } from "vitest";
import {
  normaliseWhatsapp,
  validateContact,
  validatePartnership,
} from "@/features/contact/schema";

describe("normaliseWhatsapp", () => {
  it("strips whitespace, dashes, periods and parentheses", () => {
    expect(normaliseWhatsapp("0812-3456-7890")).toBe("081234567890");
    expect(normaliseWhatsapp("+62 812 (345) 6789")).toBe("+628123456789");
    expect(normaliseWhatsapp("0812.3456.7890")).toBe("081234567890");
  });
});

describe("validateContact", () => {
  const validPayload = {
    name: "Ahmad Dahlan",
    organisation: "Koperasi Warga Mandiri",
    email: "ahmad@koperasi.id",
    whatsapp: "081234567890",
    sector: "cooperative",
    need: "Kami membutuhkan sistem pencatatan simpan pinjam dan kas warga yang transparan.",
    stage: "planning",
    website: "", // honeypot empty
  };

  it("accepts a valid contact form submission", () => {
    const result = validateContact(validPayload);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.name).toBe("Ahmad Dahlan");
      expect(result.data.whatsapp).toBe("081234567890");
    }
  });

  it("accepts an international indonesian whatsapp format (+628...)", () => {
    const result = validateContact({
      ...validPayload,
      whatsapp: "+62 813-9876-5432",
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.whatsapp).toBe("+6281398765432");
    }
  });

  it("rejects missing required fields", () => {
    const result = validateContact({});
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.name).toBe("required");
      expect(result.errors.organisation).toBe("required");
      expect(result.errors.email).toBe("required");
      expect(result.errors.sector).toBe("choose");
      expect(result.errors.need).toBe("required");
      expect(result.errors.stage).toBe("choose");
    }
  });

  it("rejects invalid email addresses", () => {
    const result = validateContact({ ...validPayload, email: "invalid-email" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.email).toBe("email");
    }
  });

  it("rejects non-Indonesian mobile WhatsApp numbers", () => {
    const result = validateContact({ ...validPayload, whatsapp: "0217654321" }); // Landline
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.whatsapp).toBe("whatsapp");
    }
  });

  it("rejects descriptions shorter than 10 characters", () => {
    const result = validateContact({ ...validPayload, need: "Halo" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.need).toBe("tooShort");
    }
  });

  it("rejects unknown project stages", () => {
    const result = validateContact({ ...validPayload, stage: "flying-to-moon" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.stage).toBe("choose");
    }
  });
});

describe("validatePartnership", () => {
  const validPayload = {
    name: "Siti Rahma",
    organisation: "Puskesmas Harapan Jaya",
    email: "siti@puskesmas.id",
    type: "institution",
    message: "Kami ingin mendiskusikan integrasi sistem antrean warga dan notifikasi WhatsApp.",
    website: "",
  };

  it("accepts a valid partnership submission", () => {
    const result = validatePartnership(validPayload);
    expect(result.ok).toBe(true);
  });

  it("rejects invalid partnership types", () => {
    const result = validatePartnership({ ...validPayload, type: "random-partner" });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.type).toBe("choose");
    }
  });
});
