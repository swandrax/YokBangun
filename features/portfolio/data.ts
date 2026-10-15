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
    technology: ["Portal Layanan Warga", "Pencatatan Data Rapi", "Pemberitahuan WhatsApp"],
    content: {
      id: {
        sector: "RT/RW · civicGov",
        title: "Portal layanan warga untuk lingkungan RT/RW",
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
        title: "Resident service portal for neighbourhood associations",
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
    sectorKey: "home-business",
    technology: ["Katalog Menu Digital", "Tombol Pesan Otomatis", "Rekap Pesanan", "Pembayaran QRIS"],
    content: {
      id: {
        sector: "Usaha Rumahan",
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
        sector: "Home businesses",
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
    slug: "operasional-toko-umkm",
    kind: "illustrative",
    sectorKey: "umkm",
    technology: ["Katalog Produk Toko", "Rekap Penjualan Harian", "Pemberitahuan WhatsApp", "Pembayaran QRIS"],
    content: {
      id: {
        sector: "UMKM",
        title: "Katalog digital dan integrasi pesanan toko ritel UMKM",
        problem:
          "Stok produk tersebar antara toko fisik dan pesanan online, rekap transaksi lambat, dan pelanggan kesulitan mengecek ketersediaan barang.",
        built: [
          "Katalog produk mobile-first dengan update stok berkala",
          "Pencatatan transaksi terintegrasi dan ringkasan harian",
          "Integrasi notifikasi pesanan ke WhatsApp admin toko",
          "Pilihan pembayaran QRIS statis dan dinamis",
        ],
        outcome: "Pemilik UMKM memantau stok dan transaksi harian tanpa pencatatan kertas ganda.",
        status: "Skenario ilustratif",
      },
      en: {
        sector: "Small businesses (UMKM)",
        title: "Digital catalogue and order flow for small retail business",
        problem:
          "Product stock was split between the physical shop and online chats, sales reconciliation was manual, and customers couldn't check stock easily.",
        built: [
          "Mobile-first product catalogue with simple stock updates",
          "Integrated daily sales record and order summary",
          "WhatsApp notification dispatch for shop staff",
          "Direct QRIS payment display",
        ],
        outcome: "Shop owners manage stock and daily revenue without double manual recording.",
        status: "Illustrative scenario",
      },
    },
  },
  {
    slug: "antrean-layanan-klinik",
    kind: "illustrative",
    sectorKey: "kesehatan",
    technology: ["Antrean Digital Mandiri", "Estimasi Waktu Panggil", "Pemberitahuan WhatsApp", "Jadwal Praktik Dokter"],
    content: {
      id: {
        sector: "Kesehatan",
        title: "Sistem antrean dan jadwal kunjungan klinik pratama",
        problem:
          "Pasien menumpuk di jam sibuk dan menunggu lama di ruang tunggu, sedangkan pembaruan jadwal dokter belum bisa diakses sebelum datang.",
        built: [
          "Nomor antrean digital dengan estimasi waktu panggil",
          "Notifikasi WhatsApp saat antrean pasien mendekat",
          "Dashboard antrean sederhana untuk staf front-desk",
          "Jadwal dokter dan layanan yang terhubung langsung",
        ],
        outcome: "Pasien datang sesuai perkiraan waktu, dan ruang tunggu klinik tidak lagi berdesakan.",
        status: "Skenario ilustratif",
      },
      en: {
        sector: "Health services",
        title: "Queue and schedule management for primary health clinics",
        problem:
          "Patients arrived all at once during peak hours, and updated doctor schedules were inaccessible prior to physical arrival.",
        built: [
          "Digital queue ticket with estimated call time",
          "Automated WhatsApp notification as turn approaches",
          "Simple front-desk check-in and queue dashboard",
          "Real-time schedule update for doctors and specialists",
        ],
        outcome: "Patients arrive closer to their actual consultation time, reducing crowded waiting areas.",
        status: "Illustrative scenario",
      },
    },
  },
  {
    slug: "asisten-faq-kursus",
    kind: "illustrative",
    sectorKey: "pendidikan",
    technology: ["Pencarian Dokumen Resmi", "Jawaban Bersumber Teruji", "Penyambungan ke Tim", "Riwayat Percakapan"],
    content: {
      id: {
        sector: "Pendidikan",
        title: "Asisten informasi dan FAQ untuk lembaga pendidikan",
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
        sector: "Education",
        title: "FAQ assistant for educational institutions",
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
