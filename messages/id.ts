/**
 * Bahasa Indonesia — default locale and source of truth for the message shape.
 * Keys are semantic (hero.title, services.ai.title, ...). English must mirror
 * this structure exactly; TypeScript enforces it via the `Messages` type.
 *
 * Writing rules: specific over generic, no hype, no invented numbers.
 */
const id = {
  splash: {
    line1: "Bangun digitalnya.",
    line2: "Tumbuh usahanya.",
    skip: "Ketuk untuk lanjut",
  },
  meta: {
    siteTitle: "yokBangun: Digital Product, AI & Maintenance Services",
    siteDescription:
      "yokBangun membangun produk digital, layanan AI, integrasi, dan maintenance untuk UMKM, usaha rumahan, RT/RW, pendidikan, dan kesehatan di Indonesia.",
    pages: {
      services: {
        title: "Layanan",
        description:
          "Produk digital, layanan AI, maintenance, dan integrasi untuk usaha dan organisasi yang ingin bekerja lebih rapi.",
      },
      aiServices: {
        title: "Layanan AI",
        description:
          "AI untuk pencarian informasi, layanan pelanggan, pengolahan dokumen, dan automasi alur kerja, dipasang hanya di bagian yang benar-benar terbantu.",
      },
      products: {
        title: "Produk",
        description:
          "Produk digital yang sedang kami kembangkan untuk UMKM, koperasi, layanan warga, dan bisnis jasa, lengkap dengan status apa adanya.",
      },
      sectors: {
        title: "Solusi Sektoral",
        description:
          "Solusi digital untuk UMKM, usaha rumahan, RT/RW, pendidikan, dan kesehatan.",
      },
      work: {
        title: "Karya & Studi Kasus",
        description:
          "Cara kami mendekati masalah: dari kondisi awal, apa yang dibangun, teknologi yang dipakai, sampai hasil yang dituju.",
      },
      partnership: {
        title: "Kemitraan",
        description:
          "yokBangun terbuka untuk kolaborasi produk, integrasi teknologi, dan riset terapan bersama startup dan UKM.",
      },
      about: {
        title: "Tentang",
        description:
          "yokBangun adalah perusahaan produk dan layanan digital dari Indonesia. growth with u: kami membangun, merawat, dan mengembangkan produk bersama klien.",
      },
      contact: {
        title: "Diskusikan Kebutuhan",
        description:
          "Hubungi tim enterprise yokBangun untuk mendiskusikan kebutuhan produk digital dan layanan AI bisnis Anda.",
      },
      technical: {
        title: "Catatan Teknis",
        description:
          "Bagaimana yokBangun membangun, menjalankan, dan merawat produk digital: stack, keamanan, deployment, dan praktik AI.",
      },
    },
  },

  common: {
    skipToContent: "Lewati ke konten utama",
    homeLabel: "yokBangun, kembali ke beranda",
    menu: "Menu",
    openMenu: "Buka menu navigasi",
    closeMenu: "Tutup menu navigasi",
    mainNav: "Navigasi utama",
    languageLabel: "Pilih bahasa",
    learnMore: "Selengkapnya",
    seeAll: "Lihat semua",
    breadcrumbHome: "Beranda",
    breadcrumbLabel: "Breadcrumb",
    required: "wajib",
    optional: "opsional",
    scrollHint: "Geser untuk melihat sektor lain",
    previous: "Sebelumnya",
    next: "Berikutnya",
  },

  nav: {
    home: "Beranda",
    services: "Layanan",
    aiServices: "Layanan AI",
    products: "Produk",
    sectors: "Sektor",
    work: "Karya",
    partnership: "Kemitraan",
    about: "Tentang",
    contact: "Kontak",
    technical: "Catatan Teknis",
    cta: "Diskusikan Kebutuhan",
    howWeWork: "Cara kerja",
    discussProject: "Diskusi proyek",
  },

  hero: {
    eyebrow: "Produk Digital · Layanan AI · Maintenance · Solusi Sektoral",
    titleLead: "Bangun digitalnya.",
    titleAccent: "Tumbuh usahanya.",
    description:
      "yokBangun membantu UMKM, usaha rumahan, RT/RW, lembaga pendidikan, dan layanan kesehatan membangun produk digital, layanan AI, serta sistem yang terus dikembangkan.",
    primaryCta: "Diskusikan Kebutuhan",
    secondaryCta: "Lihat Layanan",
    graphic: {
      label:
        "Diagram alur kerja yokBangun: dari kebutuhan usaha, produk dibangun, dioperasikan bersama data dan AI, dirawat, lalu terus dikembangkan.",
      stagesLabel: "Tahapan",
      center: "growth with u",
      nodes: {
        business: "Usaha",
        product: "Produk Digital",
        customer: "Pelanggan",
        ai: "AI",
        data: "Data",
        operations: "Operasional",
        maintenance: "Maintenance",
        growth: "Pertumbuhan",
      },
      stages: [
        { key: "business", label: "Usaha", description: "Mulai dari kebutuhan dan cara kerja usaha." },
        { key: "build", label: "Bangun", description: "Produk digital yang dipakai pelanggan dan tim." },
        { key: "operate", label: "Jalankan", description: "Operasional, data, dan AI saling terhubung." },
        { key: "improve", label: "Rawat", description: "Dijaga tetap stabil dan diperbaiki terus." },
        { key: "grow", label: "Tumbuh", description: "Dikembangkan seiring usaha bertumbuh." },
      ],
    },
  },

  positioning: {
    label: "Cara kami bekerja dalam singkat",
    items: [
      "Untuk usaha yang belum punya tim teknologi sendiri",
      "Dibangun bertahap, mulai dari yang paling dibutuhkan",
      "Tetap didampingi setelah produk diluncurkan",
      "Paham cara kerja usaha dan organisasi di Indonesia",
    ],
  },

  whatWeBuild: {
    eyebrow: "Apa yang kami bangun",
    title: "Empat bidang layanan, satu tim dari awal sampai perawatan.",
    description:
      "Sebagian klien datang untuk website pertama mereka. Sebagian lagi butuh merapikan aplikasi yang sudah berjalan. Kami menyesuaikan pekerjaan dengan tahap usaha Anda saat ini.",
    categories: [
      {
        key: "digital-products",
        title: "Produk Digital",
        description:
          "Produk digital yang dibangun berdasarkan kebutuhan operasional, pengguna, dan tahap pertumbuhan bisnis.",
        items: [
          "Website company profile",
          "Landing page",
          "Portal pelanggan & portal layanan",
          "Dashboard internal",
          "Aplikasi manajemen usaha",
          "Katalog produk",
          "Sistem booking",
          "Platform komunitas",
          "Portal layanan warga (civicGov)",
          "Aplikasi yang terhubung API",
          "Aplikasi web yang nyaman di ponsel",
        ],
      },
      {
        key: "ai-services",
        title: "Layanan AI",
        description:
          "Asisten, pencarian dokumen, dan automasi yang dipasang hanya di bagian pekerjaan yang memang terbantu.",
        items: [
          "Asisten AI untuk usaha",
          "Asisten FAQ pelanggan",
          "Pencarian AI untuk dokumen perusahaan",
          "Asisten pengetahuan internal",
          "Automasi alur kerja",
          "Klasifikasi dokumen",
          "Ringkasan teks",
          "Asisten informasi produk",
          "Integrasi API AI",
          "Eskalasi ke petugas manusia",
        ],
      },
      {
        key: "maintenance",
        title: "Product & Maintenance",
        description:
          "Produk digital tidak selesai saat diluncurkan. Kami membantu menjaga, memperbaiki, dan mengembangkannya mengikuti kebutuhan bisnis.",
        items: [
          "Maintenance aplikasi",
          "Perbaikan bug",
          "Pembaruan dependensi & keamanan",
          "Peningkatan performa",
          "Peninjauan backup",
          "Monitoring",
          "Maintenance API",
          "Iterasi fitur & perbaikan tampilan",
          "Pembaruan konten",
          "Dukungan teknis",
        ],
      },
      {
        key: "integration",
        title: "Integrasi & Operasional Digital",
        description:
          "Menghubungkan sistem yang sudah Anda pakai (seperti pembayaran, data, layanan eksternal) supaya pekerjaan tidak dicatat dua kali.",
        items: [
          "Integrasi API",
          "Integrasi pembayaran",
          "Integrasi data",
          "Sistem internal",
          "Digitalisasi alur kerja",
          "Integrasi layanan eksternal",
          "Dashboard data dasar",
          "Aplikasi berbasis database",
        ],
      },
    ],
  },

  ai: {
    eyebrow: "Layanan AI",
    title: "AI yang bekerja untuk kebutuhan nyata.",
    description:
      "Kami mengintegrasikan AI pada bagian yang benar-benar dapat membantu pekerjaan, seperti pencarian informasi, layanan pelanggan, pengolahan dokumen, dan automasi alur kerja.",
    useCasesTitle: "Contoh penggunaan",
    useCases: [
      {
        title: "Asisten FAQ pelanggan",
        description:
          "Menjawab pertanyaan yang sering berulang di website atau WhatsApp, lalu meneruskan ke petugas saat pertanyaannya di luar jangkauan.",
      },
      {
        title: "Pencarian dokumen perusahaan",
        description:
          "Mencari jawaban dari SOP, katalog, atau arsip internal tanpa harus membuka file satu per satu.",
      },
      {
        title: "Klasifikasi & ringkasan dokumen",
        description:
          "Mengelompokkan surat, laporan, atau pengaduan, lalu membuat ringkasan singkat untuk ditinjau petugas.",
      },
      {
        title: "Asisten informasi produk",
        description:
          "Membantu pelanggan menemukan produk atau layanan yang sesuai, berdasarkan data katalog milik Anda sendiri.",
      },
      {
        title: "Automasi alur kerja",
        description:
          "Mengurangi langkah berulang seperti input data, pengingat, dan pembuatan draf balasan.",
      },
      {
        title: "Integrasi API AI",
        description:
          "Menghubungkan model AI ke aplikasi yang sudah berjalan, dengan batasan akses dan biaya yang jelas.",
      },
    ],
    principlesTitle: "Cara kami memakai AI",
    principles: [
      { title: "Mulai dari masalah, bukan dari model.", description: "Kami cek dulu bagian pekerjaan mana yang memakan waktu dan apakah AI memang membantu di situ." },
      { title: "Manusia tetap bisa mengambil alih.", description: "Setiap asisten punya jalur eskalasi ke petugas, dan keputusan penting tetap di tangan manusia." },
      { title: "Jawaban bersumber dari data Anda.", description: "Asisten menjawab dari dokumen yang Anda berikan, dan sumbernya bisa dicek ulang." },
      { title: "Kalau aturan sederhana cukup, kami tidak memaksakan AI.", description: "Formulir yang rapi atau automasi biasa sering kali lebih murah dan lebih bisa diandalkan." },
    ],
    cta: "Pelajari Layanan AI",
  },

  maintenance: {
    eyebrow: "Product & Maintenance Services",
    title: "Produk digital tidak selesai saat diluncurkan.",
    description:
      "Kami membantu menjaga, memperbaiki, dan mengembangkannya mengikuti kebutuhan bisnis. Inilah arti growth with u bagi kami: tidak menyerahkan aplikasi lalu menghilang.",
    stepsLabel: "Setelah peluncuran",
    steps: [
      { title: "Pantau", description: "Memantau error, waktu muat, dan ketersediaan supaya masalah terlihat sebelum pengguna mengeluh." },
      { title: "Perbaiki", description: "Memperbaiki bug, memperbarui dependensi, dan menutup celah keamanan secara rutin." },
      { title: "Rawat", description: "Meninjau backup, menjaga API tetap berjalan, dan memperbarui konten saat diperlukan." },
      { title: "Kembangkan", description: "Menambah fitur dan memperbaiki tampilan berdasarkan cara produk benar-benar dipakai." },
    ],
    includesTitle: "Yang termasuk dalam layanan maintenance",
    includes: [
      "Maintenance aplikasi",
      "Perbaikan bug",
      "Pembaruan dependensi",
      "Pembaruan keamanan",
      "Peningkatan performa",
      "Peninjauan backup",
      "Monitoring",
      "Maintenance API",
      "Iterasi fitur",
      "Perbaikan tampilan",
      "Pembaruan konten",
      "Dukungan teknis",
    ],
    takeover:
      "Kami juga bisa merawat produk yang dibuat tim lain, setelah peninjauan awal terhadap kode dan infrastrukturnya.",
    cta: "Diskusikan Maintenance",
  },

  sectors: {
    eyebrow: "Solusi Sektoral",
    title: "Masalahnya berbeda di setiap sektor. Kami mulai dari situ.",
    description:
      "Setiap sektor punya cara kerja sendiri. Berikut masalah yang sering kami temui, modul yang biasanya kami sarankan, dan hasil yang ingin dicapai.",
    labels: {
      problem: "Masalah umum",
      solution: "Modul yang disarankan",
      outcome: "Contoh hasil yang dituju",
    },
    outcomeNote:
      "Hasil di atas adalah tujuan yang ingin dicapai, bukan klaim angka. Setiap implementasi diukur sesuai kondisi masing-masing.",
    viewAll: "Lihat semua sektor",
    items: [
      {
        key: "umkm",
        name: "UMKM",
        tag: "",
        summary:
          "Website, katalog digital, operasional sederhana, dan automasi untuk membantu usaha bekerja lebih rapi dan mudah ditemukan pelanggan.",
        problem:
          "Produk sulit ditemukan dan operasional masih tersebar antara chat, spreadsheet, dan pencatatan manual.",
        solution:
          "Website, katalog produk, dashboard sederhana, integrasi WhatsApp, dan automasi operasional.",
        outcome: "Pelanggan lebih mudah menemukan produk, dan pesanan tercatat di satu tempat.",
      },
      {
        key: "home-business",
        name: "Usaha Rumahan",
        tag: "",
        summary: "Katalog dan pencatatan pesanan yang ringan, tanpa harus belajar sistem yang rumit.",
        problem:
          "Pesanan masuk lewat chat pribadi, stok dan pembayaran dicatat seadanya, dan sulit dipisahkan dari urusan rumah.",
        solution: "Katalog sederhana, formulir pesanan, serta pencatatan stok dan pembayaran yang ringan.",
        outcome: "Pemilik bisa melihat pesanan dan pemasukan tanpa membuka banyak percakapan.",
      },
      {
        key: "rt-rw",
        name: "RT/RW",
        tag: "civicGov",
        summary: "Pengumuman, iuran, dan permintaan surat pengantar yang tidak lagi tenggelam di grup chat.",
        problem:
          "Pengumuman tenggelam di grup WhatsApp, iuran dicatat manual, dan permintaan surat pengantar harus datang langsung.",
        solution: "Portal warga, pengumuman, pencatatan iuran, dan alur permintaan surat pengantar.",
        outcome:
          "Warga tahu status permintaannya, dan pengurus tidak perlu menjawab pertanyaan yang sama berulang kali.",
      },
      {
        key: "pendidikan",
        name: "Pendidikan",
        tag: "",
        summary: "Informasi sekolah, pendaftaran, dan komunikasi orang tua dari satu sumber yang jelas.",
        problem:
          "Informasi sekolah, pendaftaran, dan komunikasi dengan orang tua masih bergantung pada kertas dan grup chat.",
        solution:
          "Website sekolah, pendaftaran online, portal informasi orang tua, dan pencarian dokumen internal.",
        outcome: "Orang tua mendapat informasi dari satu sumber yang jelas.",
      },
      {
        key: "kesehatan",
        name: "Kesehatan",
        tag: "",
        summary: "Jadwal, antrean, dan informasi layanan yang bisa dicek sebelum datang.",
        problem:
          "Antrean, jadwal layanan, dan informasi untuk pasien atau warga sulit diakses sebelum datang.",
        solution:
          "Sistem booking dan antrean, informasi layanan, pengingat jadwal, dan dashboard layanan sederhana.",
        outcome: "Pasien tahu jadwal sebelum datang, dan petugas punya daftar kunjungan yang lebih tertata.",
      },
    ],
    civicGov: {
      eyebrow: "Kategori sektor",
      title: "civicGov",
      description:
        "civicGov adalah kategori solusi kami untuk RT/RW. Fokusnya pada layanan warga sehari-hari: informasi, surat-menyurat, pengumuman, iuran, dan data lingkungan.",
      capabilitiesTitle: "Kemampuan yang bisa disiapkan",
      capabilities: [
        "Portal informasi warga",
        "Alur permohonan surat",
        "Pengumuman komunitas",
        "Pencatatan iuran",
        "Pelacakan administrasi",
        "Status permintaan layanan",
        "Template dokumen",
      ],
      disclaimer:
        "civicGov bukan sistem resmi pemerintah. Setiap implementasi disesuaikan dengan aturan yang berlaku di wilayah masing-masing, dan dapat dihubungkan ke sistem resmi bila diizinkan.",
    },
  },

  process: {
    eyebrow: "Cara kami bekerja",
    title: "Bertahap, terbuka, dan tetap ada setelah peluncuran.",
    description:
      "Tidak ada proses yang cocok untuk semua proyek. Tapi urutan berpikirnya kurang lebih selalu seperti ini.",
    steps: [
      { key: "understand", title: "Pahami", description: "Kami mulai dari proses usaha, pengguna, dan masalah yang benar-benar perlu diselesaikan." },
      { key: "define", title: "Tentukan", description: "Menentukan versi produk yang paling masuk akal untuk dibangun lebih dahulu." },
      { key: "build", title: "Bangun", description: "Membangun dan menguji produk secara bertahap." },
      { key: "launch", title: "Luncurkan", description: "Mempersiapkan deployment dan penggunaan nyata." },
      { key: "maintain", title: "Rawat", description: "Menjaga produk tetap stabil dan relevan setelah diluncurkan." },
      { key: "grow", title: "Kembangkan", description: "Menambahkan improvement berdasarkan kebutuhan dan penggunaan nyata." },
    ],
  },

  work: {
    eyebrow: "Karya & Studi Kasus",
    title: "Dari masalah awal sampai apa yang dibangun.",
    description:
      "Setiap studi kasus ditulis dengan urutan yang sama: kondisi awal, apa yang kami bangun, teknologi yang dipakai, hasil, dan status saat ini.",
    illustrativeNote:
      "Saat ini studi kasus ditampilkan sebagai skenario ilustratif. Studi kasus klien akan dipublikasikan setelah mendapat izin dari klien yang bersangkutan.",
    labels: {
      sector: "Sektor",
      problem: "Masalah",
      built: "Yang kami bangun",
      technology: "Teknologi",
      outcome: "Hasil",
      intendedOutcome: "Hasil yang dituju",
      status: "Status saat ini",
    },
    filterLabel: "Saring berdasarkan sektor",
    filterAll: "Semua",
    empty: "Belum ada studi kasus untuk sektor ini.",
    loading: "Memuat studi kasus…",
    error: "Studi kasus belum bisa dimuat. Coba muat ulang halaman.",
    cta: "Lihat semua karya",
  },

  products: {
    eyebrow: "Produk",
    title: "Produk yang sedang kami kembangkan.",
    description:
      "Selain proyek khusus, kami menyiapkan beberapa produk siap pakai untuk kebutuhan yang sering muncul. Statusnya kami tulis apa adanya.",
    labels: {
      forWhom: "Untuk siapa",
      problem: "Masalah yang diselesaikan",
      capabilities: "Kemampuan utama",
      status: "Status",
    },
    filterLabel: "Saring berdasarkan status",
    filterAll: "Semua",
    loading: "Memuat produk…",
    error: "Produk belum bisa dimuat. Coba muat ulang halaman.",
    empty: "Belum ada produk dengan status ini.",
    legendTitle: "Arti status",
    cta: "Lihat semua produk",
  },

  status: {
    concept: { label: "Concept", description: "Masih dalam rancangan dan validasi kebutuhan." },
    prototype: { label: "Prototype", description: "Sudah bisa dicoba secara terbatas untuk diskusi dan pengujian." },
    pilot: { label: "Pilot", description: "Sedang diuji dengan pengguna nyata dalam lingkup kecil." },
    active: { label: "Active", description: "Sudah digunakan dan terus dikembangkan." },
    maintenance: { label: "Maintenance", description: "Stabil dan dirawat secara berkala." },
    illustrative: { label: "Skenario ilustratif", description: "Contoh pendekatan, bukan proyek klien yang dipublikasikan." },
  },

  partnership: {
    eyebrow: "Kemitraan untuk Startup & UKM",
    title: "Kolaborasi strategis untuk startup dan UKM yang ingin tumbuh.",
    description:
      "yokBangun terbuka untuk kolaborasi produk, integrasi teknologi, dan riset terapan bersama startup dan UKM yang ingin memperkuat produk digitalnya.",
    types: [
      { key: "technology", title: "Partner teknologi", description: "Penyedia platform, API, pembayaran, atau infrastruktur yang ingin produknya dipakai lebih luas oleh UMKM dan organisasi." },
      { key: "business", title: "Partner bisnis", description: "Agensi, konsultan, atau penyedia jasa yang butuh tim produk dan maintenance untuk klien mereka." },
      { key: "community", title: "Partner komunitas", description: "Komunitas, asosiasi, dan pendamping UMKM yang ingin anggotanya lebih siap secara digital." },
      { key: "institution", title: "Institusi", description: "Lembaga pendidikan, kesehatan, atau layanan publik yang membutuhkan implementasi sektoral." },
      { key: "research", title: "Kolaborasi riset", description: "Riset terapan bersama kampus atau lembaga, terutama soal adopsi digital dan AI di usaha kecil." },
      { key: "investor", title: "Calon investor", description: "Kami terbuka berdiskusi dengan pihak yang tertarik pada pertumbuhan jangka panjang produk digital untuk UMKM dan layanan warga." },
    ],
    cta: "Jelajahi Kemitraan",
    altCta: "Mulai Percakapan",
    howTitle: "Bagaimana kolaborasi biasanya berjalan",
    how: [
      { title: "Perkenalan", description: "Kami saling memahami tujuan, kemampuan, dan batasan masing-masing." },
      { title: "Lingkup awal", description: "Menyepakati satu kolaborasi kecil yang jelas hasilnya." },
      { title: "Uji bersama", description: "Menjalankan kolaborasi itu dan mengevaluasinya secara terbuka." },
      { title: "Lanjutkan", description: "Kalau cocok, kami perluas kerja sama secara bertahap." },
    ],
    form: {
      title: "Ceritakan rencana kolaborasi Anda",
      name: "Nama",
      organisation: "Organisasi",
      email: "Email",
      type: "Jenis kemitraan",
      typePlaceholder: "Pilih jenis kemitraan",
      message: "Apa yang ingin Anda kolaborasikan?",
      messagePlaceholder: "Ceritakan singkat tentang startup/UKM Anda dan ide kolaborasinya.",
      submit: "Kirim",
      submitting: "Mengirim…",
      success: "Terima kasih. Pesan Anda sudah kami terima, dan kami akan membalas lewat email yang Anda cantumkan.",
      error: "Pesan belum terkirim. Periksa koneksi Anda lalu coba lagi.",
    },
  },

  why: {
    eyebrow: "Kenapa yokBangun",
    title: "Hal-hal yang kami jaga di setiap proyek.",
    reasons: [
      { title: "Tetap ada setelah peluncuran", description: "Maintenance dan pengembangan lanjutan adalah bagian dari cara kami bekerja, bukan tambahan di akhir." },
      { title: "Mulai dari versi yang masuk akal", description: "Kami tidak membangun semuanya sekaligus. Versi pertama fokus pada masalah yang paling penting." },
      { title: "Bahasa yang mudah dipahami", description: "Keputusan teknis dijelaskan dengan bahasa sehari-hari, supaya Anda bisa ikut memutuskan." },
      { title: "Kode dan data tetap milik Anda", description: "Akun, kode, dan data dicatat atas nama Anda, lengkap dengan dokumentasi serah terima." },
      { title: "AI hanya jika berguna", description: "Kami menyarankan AI ketika memang mengurangi pekerjaan, bukan karena sedang ramai dibicarakan." },
      { title: "Paham konteks lokal", description: "Pelanggan yang lebih nyaman lewat WhatsApp, pembayaran QRIS, struktur RT/RW. Kami merancang dengan kondisi itu." },
    ],
  },

  contact: {
    eyebrow: "Enterprise & Bisnis",
    title: "Diskusikan kebutuhan digital bisnis Anda.",
    description:
      "Hubungi tim enterprise kami. Ceritakan kondisi bisnis Anda sekarang, dan kami bantu menentukan produk digital yang sebaiknya dibangun lebih dahulu.",
    afterTitle: "Setelah Anda mengirim pesan",
    after: [
      "Kami membaca pesan Anda dan membalas, termasuk pertanyaan lanjutan bila perlu.",
      "Diskusi singkat secara online untuk memahami kebutuhan dan kondisi saat ini.",
      "Usulan langkah pertama, lengkap dengan perkiraan ruang lingkupnya.",
    ],
    directTitle: "Kontak langsung",
    emailLabel: "Email",
    whatsappLabel: "WhatsApp",
    form: {
      name: "Nama",
      organisation: "Perusahaan / Organisasi",
      email: "Email",
      whatsapp: "WhatsApp",
      whatsappHint: "Contoh: 0812xxxxxxx atau +62812xxxxxxx",
      sector: "Sektor",
      sectorPlaceholder: "Pilih sektor",
      sectorOther: "Lainnya",
      need: "Apa yang Anda butuhkan?",
      needPlaceholder: "Contoh: kami ingin pesanan pelanggan tidak lagi tercatat di banyak chat.",
      stage: "Tahap proyek",
      stages: [
        { value: "exploring", label: "Baru menjajaki" },
        { value: "planning", label: "Sedang merencanakan" },
        { value: "has-product", label: "Sudah punya produk" },
        { value: "maintenance", label: "Butuh maintenance" },
        { value: "ai", label: "Butuh integrasi AI" },
        { value: "partner", label: "Butuh partner" },
      ],
      submit: "Kirim pesan",
      submitting: "Mengirim…",
      success: "Terima kasih. Pesan Anda sudah kami terima, dan kami akan membalas lewat email atau WhatsApp yang Anda cantumkan.",
      error: "Pesan belum terkirim. Periksa koneksi Anda lalu coba lagi.",
      privacy: "Data Anda dilindungi sesuai standar keamanan ISO 27001:2022.",
      errorSummary: "Ada beberapa isian yang perlu diperbaiki.",
    },
  },

  validation: {
    required: "Bagian ini perlu diisi.",
    email: "Format email belum benar.",
    whatsapp: "Nomor WhatsApp belum benar.",
    tooShort: "Ceritakan sedikit lebih banyak (minimal 10 karakter).",
    tooLong: "Isian terlalu panjang.",
    choose: "Silakan pilih salah satu.",
  },

  footer: {
    description:
      "Mitra digital untuk UMKM, usaha rumahan, RT/RW, pendidikan, dan kesehatan. Produk digital, layanan AI, dan maintenance yang berguna dan terus dikembangkan.",
    servicesTitle: "Layanan",
    companyTitle: "Perusahaan",
    contactTitle: "Kontak",
    contactText: "Ceritakan kebutuhan Anda lewat formulir. Kami akan membalas secepatnya.",
    rights: "Hak cipta dilindungi.",
    madeIn: "Dibangun di Indonesia.",
  },

  about: {
    eyebrow: "Tentang yokBangun",
    title: "Perusahaan produk dan layanan digital untuk usaha yang terus bertumbuh.",
    intro:
      "yokBangun membangun produk digital dan layanan digital untuk UMKM, usaha rumahan, RT/RW, lembaga pendidikan, dan layanan kesehatan — terutama yang membutuhkan teknologi tetapi belum punya tim teknologi sendiri.",
    visionTitle: "Visi",
    vision:
      "Menjadi mitra digital yang membantu usaha dan organisasi membangun produk, layanan, serta operasional digital yang berguna, mudah digunakan, dan dapat terus dikembangkan.",
    meaningTitle: "Arti growth with u",
    meaning: [
      "Banyak produk digital berhenti berkembang setelah diserahkan. Website tidak diperbarui, bug dibiarkan, dan aplikasi pelan-pelan ditinggalkan.",
      "Kami ingin bekerja dengan cara yang berbeda. Kami membangun, merawat, memperbaiki, dan mengembangkan produk bersama klien, mengikuti perubahan usaha mereka.",
    ],
    illustrationAlt:
      "Ilustrasi jalan permukiman di Indonesia dengan warung, posyandu, sekolah, dan balai warga, serta warga yang beraktivitas.",
    purposeTitle: "Yang kami kerjakan",
    purposes: [
      { title: "Membangun produk digital yang praktis", description: "Untuk usaha yang butuh teknologi tetapi belum punya tim teknologi besar." },
      { title: "Merawat dan mengembangkan setelah peluncuran", description: "Maintenance dan improvement berkelanjutan, supaya produk tetap berguna." },
      { title: "Menghadirkan AI saat memang membantu", description: "Untuk pekerjaan yang berulang, pencarian informasi, dan layanan yang perlu lebih mudah dijalankan." },
    ],
    audienceTitle: "Dengan siapa kami bekerja",
    audience:
      "UMKM, usaha rumahan, RT/RW, lembaga pendidikan, dan layanan kesehatan.",
    cta: "Diskusikan Kebutuhan",
  },

  servicesPage: {
    eyebrow: "Layanan",
    title: "Apa yang bisa kami bangun dan rawat untuk Anda.",
    description:
      "Empat bidang layanan yang saling terhubung. Anda bisa mulai dari satu bidang, lalu menambah yang lain saat dibutuhkan.",
    scopeTitle: "Bagaimana kami menentukan ruang lingkup",
    scope: [
      "Kami bertanya dulu tentang proses usaha dan siapa penggunanya, baru membahas fitur.",
      "Versi pertama dibuat cukup kecil untuk segera dipakai dan dievaluasi.",
      "Biaya maintenance dibahas sejak awal, bukan setelah produk jadi.",
    ],
  },

  aiPage: {
    notPromiseTitle: "Yang tidak kami janjikan",
    notPromise: [
      "AI tidak selalu benar. Kami merancang peninjauan dan batasan, bukan menganggap jawabannya pasti tepat.",
      "AI bukan pengganti tim Anda. Ia membantu pekerjaan berulang supaya tim bisa fokus ke hal yang butuh pertimbangan.",
      "Tidak semua masalah butuh AI. Kadang formulir yang lebih baik sudah cukup.",
    ],
    approachTitle: "Tahapan proyek AI",
    approach: [
      { title: "Cek kebutuhan", description: "Memastikan AI memang membantu, dan menentukan cara mengukurnya." },
      { title: "Siapkan data", description: "Merapikan dokumen dan data yang menjadi sumber jawaban." },
      { title: "Uji kecil", description: "Mencoba dengan pengguna nyata dalam lingkup terbatas." },
      { title: "Pantau", description: "Memantau kualitas jawaban, biaya, dan kasus yang perlu ditangani manusia." },
    ],
  },

  technical: {
    eyebrow: "Catatan Teknis",
    title: "Detail teknis untuk tim IT dan partner.",
    description:
      "Halaman ini untuk Anda yang ingin tahu cara kami membangun dan menjalankan produk. Kalau Anda pemilik usaha, bagian lain dari website ini sudah cukup.",
    sections: [
      {
        title: "Stack yang biasa kami pakai",
        items: [
          "Frontend: Next.js, React, TypeScript, Tailwind CSS, Preline UI, Clipboard.js",
          "Backend: API berbasis Node.js atau layanan yang sudah Anda gunakan",
          "Database: PostgreSQL untuk data operasional",
          "Integrasi: REST API, webhook, RSS feed, Open Graph, payment gateway, WhatsApp Business API",
        ],
      },
      {
        title: "Deployment & infrastruktur",
        items: [
          "Vercel atau Cloudflare untuk aplikasi web, dipilih sesuai kebutuhan dan biaya",
          "Preview deployment untuk setiap perubahan sebelum masuk produksi",
          "Konfigurasi penyedia dipisahkan agar aplikasi bisa dipindahkan",
          "Domain, akun, dan kredensial dicatat atas nama klien",
        ],
      },
      {
        title: "Keamanan & kepatuhan (ISO 27001:2022)",
        items: [
          "Pengelolaan keamanan informasi mengacu pada kontrol ISO/IEC 27001:2022",
          "Pembaruan dependensi dan patch keamanan secara berkala",
          "Backup terjadwal dan uji pemulihan",
          "Kontrol akses berbasis peran untuk dashboard internal",
          "Monitoring error dan ketersediaan",
          "Kebijakan retensi data dan penghapusan sesuai kebutuhan",
          "Evaluasi risiko keamanan berkala",
        ],
      },
      {
        title: "Praktik AI",
        items: [
          "Retrieval dari dokumen klien, dengan sumber yang bisa ditelusuri",
          "Pencatatan percakapan untuk evaluasi kualitas, sesuai persetujuan",
          "Batas biaya dan rate limit per aplikasi",
          "Jalur eskalasi ke petugas manusia",
        ],
      },
      {
        title: "Serah terima",
        items: [
          "Dokumentasi teknis dan panduan penggunaan",
          "Repositori kode di akun organisasi klien",
          "Catatan arsitektur dan daftar integrasi",
        ],
      },
    ],
  },

  landing: {
    hero: {
      title: "Bangun digital. Tumbuhkan usaha.",
      description: "Produk digital, AI praktis, dan perawatan untuk UMKM, usaha rumahan, RT/RW, pendidikan, dan kesehatan di Indonesia.",
      primaryCta: "Diskusi proyek",
      secondaryCta: "Lihat layanan",
    },
    visionMission: {
      eyebrow: "Visi, Misi & Goals",
      title: "Fondasi dan arah komitmen kami",
      subtitle: "Mendukung transformasi digital yang sehat, mandiri, dan berkesinambungan.",
      slides: [
        {
          key: "visi",
          tab: "Visi",
          eyebrow: "Visi Kami",
          heading: "Mitra Digital Terpercaya untuk Pertumbuhan Berkelanjutan",
          summary: "Menjadi mitra digital yang membantu usaha dan organisasi membangun produk, layanan, serta operasional digital yang berguna, mudah digunakan, dan dapat terus dikembangkan.",
          highlights: [
            {
              title: "Teknologi Tepat Guna",
              text: "Fokus pada produk fungsional yang menyelesaikan kendala nyata tanpa kompleksitas berlebih.",
            },
            {
              title: "Tumbuh Bersama",
              text: "Mendampingi setiap fase perjalanan digital Anda melalui perawatan dan pengembangan berkala.",
            },
          ],
        },
        {
          key: "misi",
          tab: "Misi",
          eyebrow: "Misi Kami",
          heading: "Tiga Pilar Aksi Nyata",
          summary: "Mewujudkan transformasi digital yang efektif melalui standar kerja teruji dan terarah.",
          highlights: [
            {
              title: "Membangun Produk Fungsional",
              text: "Mengembangkan website dan aplikasi yang pas dengan alur operasional kerja harian.",
            },
            {
              title: "Perawatan & Keamanan Rutin",
              text: "Memastikan stabilitas sistem, kecepatan akses, dan pembaruan keamanan terus terjaga pasca-peluncuran.",
            },
            {
              title: "Solusi AI Praktis",
              text: "Menerapkan asisten dokumen dan automasi alur kerja di bagian yang benar-benar meringankan beban tim.",
            },
          ],
        },
        {
          key: "goals",
          tab: "Goals",
          eyebrow: "Goals & Target",
          heading: "Target Strategis dan Tolak Ukur Keberhasilan",
          summary: "Sasaran terukur yang memandu setiap proyek agar memberikan dampak nyata bagi bisnis Anda.",
          highlights: [
            {
              title: "Digitalisasi Tanpa Hambatan",
              text: "Memudahkan adopsi teknologi bagi UMKM, komunitas, dan organisasi lokal tanpa rasa takut gagal.",
            },
            {
              title: "Efisiensi Kerja Optimal",
              text: "Memangkas proses manual dan duplikasi data agar operasional usaha berjalan jauh lebih hemat waktu.",
            },
            {
              title: "Solusi yang Berkelanjutan",
              text: "Menjamin aset digital dan teknologi yang dibangun tetap adaptif saat skala usaha Anda meluas.",
            },
          ],
        },
      ],
      prev: "Sebelumnya",
      next: "Berikutnya",
    },
    services: {
      eyebrow: "Layanan",
      title: "Empat bidang utama",
      items: [
        {
          title: "Produk Digital",
          description: "Website, sistem internal, dan aplikasi web praktis yang dibangun sesuai alur operasional dan kebutuhan pengguna nyata.",
          href: "/services#digital-products",
        },
        {
          title: "Layanan AI",
          description: "Penerapan AI praktis untuk pencarian dokumen internal, asisten FAQ, dan automasi alur kerja tanpa kerumitan.",
          href: "/ai-services",
        },
        {
          title: "Integrasi",
          description: "Menghubungkan sistem yang sudah Anda gunakan mulai dari pembayaran, data pelanggan, hingga WhatsApp agar tidak ada kerja berulang.",
          href: "/services#integration",
        },
        {
          title: "Perawatan",
          description: "Dukungan pemeliharaan berkala, perbaikan bug, pembaruan keamanan, dan peningkatan performa agar produk terus andal.",
          href: "/services#maintenance",
        },
      ],
    },
    sectors: {
      eyebrow: "Sektor",
      title: "Dibangun untuk konteks lokal Indonesia.",
      description: "Kami memahami alur kerja dan tantangan spesifik di lima sektor utama yang kami layani.",
      cta: "Lihat detail sektor",
      chips: [
        "UMKM",
        "Usaha rumahan",
        "RT/RW",
        "Pendidikan",
        "Kesehatan",
      ],
    },
    howWeWork: {
      eyebrow: "Cara kerja",
      title: "Empat langkah terarah",
      steps: [
        {
          key: "pahami",
          number: "01",
          title: "Pahami",
          description: "Mendengarkan cara kerja usaha, kendala operasional, dan masalah yang paling mendesak diselesaikan.",
        },
        {
          key: "bangun",
          number: "02",
          title: "Bangun",
          description: "Mewujudkan produk digital yang ringkas, fungsional, dan langsung dapat digunakan tim Anda.",
        },
        {
          key: "rawat",
          number: "03",
          title: "Rawat",
          description: "Menjaga stabilitas, keamanan, dan keandalan sistem secara berkala setelah peluncuran.",
        },
        {
          key: "tumbuh",
          number: "04",
          title: "Tumbuh",
          description: "Mengembangkan fitur baru dan perbaikan bertahap seiring pertumbuhan skala usaha Anda.",
        },
      ],
    },
    cta: {
      title: "Ceritakan apa yang ingin dibangun.",
      description: "Mari diskusikan kebutuhan usaha atau sistem yang ingin Anda kembangkan. Ringkas, jelas, dan tanpa komitmen rumit.",
      button: "Diskusi proyek",
      mailtoText: "Kirim email langsung",
    },
    partnershipSlider: {
      eyebrow: "Kemitraan Startup & UKM",
      title: "Kolaborasi strategis untuk startup dan UKM",
      subtitle: "Bermitra dengan ekosistem teknologi, bisnis, dan institusi untuk tumbuh bersama.",
      ctaText: "Mulai Kolaborasi",
      noteText: "Direct contact ke tim kemitraan nussaspacevibe@gmail.com",
      prev: "Sebelumnya",
      next: "Berikutnya",
    },
  },

  notFound: {
    title: "Halaman tidak ditemukan.",
    description: "Halaman yang Anda cari mungkin sudah dipindahkan atau alamatnya salah ketik.",
    cta: "Kembali ke beranda",
  },
};

export type Messages = typeof id;
export default id;
