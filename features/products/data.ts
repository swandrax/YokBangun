import type { Locale } from "@/lib/i18n/config";

export const productStatuses = ["concept", "prototype", "pilot", "active", "maintenance"] as const;
export type ProductStatus = (typeof productStatuses)[number];

export type Product = {
  slug: string;
  status: ProductStatus;
  name: string;
  forWhom: string;
  problem: string;
  capabilities: string[];
};

type LocalizedProduct = {
  slug: string;
  status: ProductStatus;
  content: Record<Locale, Omit<Product, "slug" | "status">>;
};

/**
 * Product catalogue. Statuses are deliberately conservative (Concept / Prototype)
 * until a product is genuinely in pilot or active use. Update them honestly.
 * This module plays the role of the products API until a backend exists.
 */
const products: LocalizedProduct[] = [
  {
    slug: "etalase-umkm",
    status: "prototype",
    content: {
      id: {
        name: "Etalase UMKM",
        forWhom: "UMKM dan usaha rumahan",
        problem: "Produk tersebar di chat dan marketplace, tanpa katalog sendiri yang mudah dibagikan.",
        capabilities: ["Katalog produk", "Pesan lewat WhatsApp", "Pencatatan pesanan", "Halaman profil usaha"],
      },
      en: {
        name: "Etalase UMKM (Shopfront)",
        forWhom: "Small and home businesses",
        problem: "Products are scattered across chats and marketplaces, with no shareable catalogue of their own.",
        capabilities: ["Product catalogue", "Order via WhatsApp", "Order records", "Business profile page"],
      },
    },
  },
  {
    slug: "civicgov-layanan-warga",
    status: "prototype",
    content: {
      id: {
        name: "civicGov Layanan Warga",
        forWhom: "Lingkungan warga RT dan RW",
        problem: "Pengumuman, permintaan surat, dan pengaduan warga tersebar dan sulit dilacak statusnya.",
        capabilities: ["Pengumuman warga", "Permohonan surat pengantar", "Status layanan", "Kanal pengaduan"],
      },
      en: {
        name: "civicGov Resident Services",
        forWhom: "Neighbourhood associations (RT/RW)",
        problem: "Announcements, letter requests, and complaints are scattered and their status is hard to follow.",
        capabilities: ["Resident announcements", "Cover-letter requests", "Service status", "Complaints channel"],
      },
    },
  },
  {
    slug: "antrean-faskes",
    status: "prototype",
    content: {
      id: {
        name: "Antrean & Layanan Faskes",
        forWhom: "Klinik pratama, posyandu, dan layanan kesehatan",
        problem: "Pasien menunggu lama tanpa estimasi waktu panggil yang jelas, dan jadwal dokter sulit dicek sebelum datang.",
        capabilities: ["Nomor antrean digital", "Notifikasi estimasi panggil", "Jadwal dokter & faskes", "Dashboard registrasi pasien"],
      },
      en: {
        name: "Healthcare Queue & Booking",
        forWhom: "Primary clinics, community health posts, and health practices",
        problem: "Patients wait without clear estimated call times, and practitioner schedules are hard to check before arrival.",
        capabilities: ["Digital queue ticketing", "Estimated call notifications", "Doctor & clinic schedules", "Front-desk check-in dashboard"],
      },
    },
  },
  {
    slug: "asisten-pengetahuan",
    status: "prototype",
    content: {
      id: {
        name: "Asisten Pengetahuan",
        forWhom: "Organisasi dengan banyak SOP, katalog, atau dokumen internal",
        problem: "Tim dan pelanggan bertanya hal yang sama, padahal jawabannya ada di dokumen yang sulit dicari.",
        capabilities: ["Pencarian dokumen", "Jawaban dengan sumber", "Eskalasi ke petugas", "Kontrol akses"],
      },
      en: {
        name: "Knowledge Assistant",
        forWhom: "Organisations with many SOPs, catalogues, or internal documents",
        problem: "Staff and customers keep asking the same questions, even though the answers sit in hard-to-search documents.",
        capabilities: ["Document search", "Answers with sources", "Hand-over to staff", "Access control"],
      },
    },
  },
  {
    slug: "jadwal-booking",
    status: "concept",
    content: {
      id: {
        name: "Jadwal & Booking",
        forWhom: "Bisnis jasa, klinik, dan lembaga kursus",
        problem: "Janji temu diatur lewat telepon dan chat, sehingga mudah terlewat atau tercatat dobel.",
        capabilities: ["Booking online", "Pengingat otomatis", "Kalender petugas", "Portal pelanggan"],
      },
      en: {
        name: "Schedule & Booking",
        forWhom: "Service businesses, clinics, and course providers",
        problem: "Appointments are arranged by phone and chat, so they get missed or double-booked.",
        capabilities: ["Online booking", "Automatic reminders", "Staff calendar", "Customer portal"],
      },
    },
  },
];

export function listProducts(locale: Locale): Product[] {
  return products.map(({ slug, status, content }) => ({ slug, status, ...content[locale] }));
}
