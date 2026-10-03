import type { Locale } from "@/lib/i18n/config";

export type CaseStudyKind = "client" | "illustrative";

export type CaseStudy = {
  slug: string;
  /** "illustrative" scenarios must never be presented as client work. */
  kind: CaseStudyKind;
  sectorKey: string;
  sector: string;
  title: string;
  problem: string;
  built: string[];
  technology: string[];
  outcome: string;
  status: string;
};

type LocalizedCaseStudy = {
  slug: string;
  kind: CaseStudyKind;
  sectorKey: string;
  technology: string[];
  content: Record<Locale, Omit<CaseStudy, "slug" | "kind" | "sectorKey" | "technology">>;
};

/**
 * No verified client projects have been published yet, so every entry is an
 * illustrative scenario and is labelled that way in the UI. Replace or add
 * entries with kind: "client" only with the client's permission and with
 * outcomes that are backed by evidence.
 */
const caseStudies: LocalizedCaseStudy[] = [
  {
    slug: "portal-layanan-rw",
    kind: "illustrative",
    sectorKey: "civicgov",
    technology: ["Next.js", "PostgreSQL", "WhatsApp notification"],
    content: {
      id: {
        sector: "RT/RW · civicGov",
        title: "Portal layanan warga untuk lingkungan RW",
        problem:
          "Permintaan surat pengantar dikirim lewat chat pribadi pengurus. Warga tidak tahu statusnya, dan pengurus menjawab pertanyaan yang sama berkali-kali.",
        built: [
          "Formulir permintaan surat dengan data warga yang tersimpan",
          "Halaman status yang bisa dicek warga",
          "Tampilan admin untuk pengurus RT dan RW",
          "Pengumuman yang tidak tenggelam di grup chat",
        ],
        outcome: "Mengurangi jumlah langkah manual dalam alur permintaan surat, dan memberi warga cara mengecek status sendiri.",
        status: "Skenario ilustratif",
      },
      en: {
        sector: "Neighbourhood association · civicGov",
        title: "Resident service portal for a neighbourhood association",
        problem:
          "Cover-letter requests were sent to officers' personal chats. Residents didn't know the status, and officers answered the same questions many times.",
        built: [
          "Letter request form with saved resident details",
          "Status page residents can check themselves",
          "Admin view for neighbourhood officers",
          "Announcements that don't get buried in group chats",
        ],
        outcome: "Fewer manual steps in the letter-request flow, and a way for residents to check status on their own.",
        status: "Illustrative scenario",
      },
    },
  },
  {
    slug: "katalog-usaha-makanan",
    kind: "illustrative",
    sectorKey: "umkm",
    technology: ["Next.js", "Headless CMS", "WhatsApp click-to-chat", "QRIS"],
    content: {
      id: {
        sector: "UMKM · Usaha rumahan",
        title: "Katalog dan pencatatan pesanan untuk usaha makanan rumahan",
        problem:
          "Menu dikirim berupa foto di chat, pesanan dicatat di buku, dan pemilik sulit melihat pesanan hari ini dalam satu tampilan.",
        built: [
          "Katalog menu yang bisa diperbarui sendiri",
          "Tombol pesan yang membuka WhatsApp dengan pesanan terisi",
          "Daftar pesanan harian untuk pemilik",
          "Informasi pembayaran QRIS",
        ],
        outcome: "Pesanan tercatat di satu tempat, dan pelanggan bisa melihat menu terbaru tanpa meminta foto.",
        status: "Skenario ilustratif",
      },
      en: {
        sector: "Small business · Home business",
        title: "Catalogue and order log for a home food business",
        problem:
          "The menu was sent as photos in chats, orders were written in a notebook, and the owner couldn't see today's orders in one view.",
        built: [
          "Menu catalogue the owner can update",
          "Order button that opens WhatsApp with the order pre-filled",
          "Daily order list for the owner",
          "QRIS payment information",
        ],
        outcome: "Orders are recorded in one place, and customers see the latest menu without asking for photos.",
        status: "Illustrative scenario",
      },
    },
  },
  {
    slug: "pencatatan-koperasi",
    kind: "illustrative",
    sectorKey: "koperasi",
    technology: ["React", "Node.js API", "PostgreSQL", "PDF reports"],
    content: {
      id: {
        sector: "Koperasi",
        title: "Pencatatan simpanan dan pinjaman anggota koperasi",
        problem:
          "Seluruh data anggota ada di satu spreadsheet milik bendahara. Laporan bulanan disusun manual, dan anggota harus bertanya untuk tahu saldonya.",
        built: [
          "Data anggota dengan riwayat simpanan dan pinjaman",
          "Laporan bulanan yang bisa diunduh",
          "Akses baca untuk anggota",
          "Hak akses berbeda untuk pengurus dan anggota",
        ],
        outcome: "Laporan tidak lagi disusun dari nol, dan data tidak bergantung pada satu orang.",
        status: "Skenario ilustratif",
      },
      en: {
        sector: "Cooperative",
        title: "Savings and loan records for a cooperative",
        problem:
          "All member data lived in one spreadsheet kept by the treasurer. Monthly reports were compiled by hand, and members had to ask to know their balance.",
        built: [
          "Member records with savings and loan history",
          "Downloadable monthly reports",
          "Read-only access for members",
          "Separate permissions for officers and members",
        ],
        outcome: "Reports no longer start from scratch, and the data no longer depends on one person.",
        status: "Illustrative scenario",
      },
    },
  },
  {
    slug: "asisten-faq-kursus",
    kind: "illustrative",
    sectorKey: "pendidikan",
    technology: ["Document retrieval", "LLM API", "Admin review", "WhatsApp Business API"],
    content: {
      id: {
        sector: "Pendidikan · Bisnis jasa",
        title: "Asisten FAQ untuk lembaga kursus",
        problem:
          "Admin menjawab pertanyaan jadwal, biaya, dan syarat pendaftaran yang sama setiap hari, sering di luar jam kerja.",
        built: [
          "Asisten yang menjawab dari dokumen resmi lembaga",
          "Sumber jawaban yang ditampilkan",
          "Eskalasi ke admin untuk pertanyaan di luar dokumen",
          "Riwayat percakapan untuk evaluasi",
        ],
        outcome: "Admin bisa fokus pada pertanyaan yang memang butuh manusia, sementara pertanyaan rutin tetap terjawab.",
        status: "Skenario ilustratif",
      },
      en: {
        sector: "Education · Service business",
        title: "FAQ assistant for a course provider",
        problem:
          "Admin staff answered the same questions about schedules, fees, and requirements every day, often outside working hours.",
        built: [
          "Assistant that answers from the provider's official documents",
          "Sources shown with each answer",
          "Hand-over to admin for questions outside the documents",
          "Conversation history for review",
        ],
        outcome: "Admin staff can focus on questions that need a person, while routine questions still get answered.",
        status: "Illustrative scenario",
      },
    },
  },
];

export function listCaseStudies(locale: Locale): CaseStudy[] {
  return caseStudies.map(({ slug, kind, sectorKey, technology, content }) => ({
    slug,
    kind,
    sectorKey,
    technology,
    ...content[locale],
  }));
}
