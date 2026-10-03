# Product Requirements Document (PRD)
## Project: yokBangun — growth with u

---

## 1. Executive Summary & Brand Identity

- **Official Brand Name:** `yokBangun — growth with u`
- **Core Mission:** Menjadi mitra rekayasa digital (digital engineering partner) dan pemeliharaan teknologi tepercaya bagi pemilik bisnis, UMKM, dan komunitas di Indonesia.
- **Brand Positioning:** Anti-hype, membumi, berorientasi hasil jangka panjang, transparan secara teknis, dan mengutamakan keberlanjutan produk (maintainability).
- **Core Visual Identity:** **Strict Light Theme Only** (Background `#FFFFFF`, Canvas `#F7F8F6`, Primary Green `#1F5D45`, Clay Accent `#B4572F`, Text `#1A2421`).

---

## 2. Problem Statement & Value Proposition

### The Problem
Banyak pemilik bisnis dan organisasi di Indonesia menghadapi kendala ketika mendigitalisasi operasional mereka:
1. **Vendor Abandonment:** Banyak vendor software hanya membangun MVP awal lalu meninggalkan klien tanpa pemeliharaan berkala, dokumentasi arsitektur, atau SLA perbaikan bug.
2. **AI Hype over Substance:** Tren implementasi AI sering kali dipaksakan (over-engineered) tanpa melihat relevansi bisnis atau ROI nyata, sehingga menghabiskan anggaran tanpa memecahkan masalah esensial.
3. **Overcomplicated UI & Dark Mode Clutter:** Desain yang terlalu rumit dan tidak ramah pengguna lapangan di iklim kerja Indonesia.

### The Solution: yokBangun
`yokBangun` menawarkan pendekatan rekayasa holistik:
- **Produk Digital Siap Produksi:** Web apps, internal tools, mobile apps berbasis Next.js App Router dan Expo.
- **Integrasi AI yang Masuk Akal:** Automasi alur kerja, ekstraksi dokumen, pencarian semantik lokal, dengan *human-in-the-loop* sebagai safeguard.
- **Maintenance & Retainer Terstruktur:** Penanganan bug berkala, pembaruan dependensi, audit keamanan, dan pemantauan performa dengan SLA jelas.
- **Solusi Sektoral yang Terbukti:** Arsitektur spesifik untuk F&B, logistik/distribusi, agritech, kesehatan, edukasi, dan koperasi/asosiasi.

---

## 3. User Personas & Target Segments

| Persona | Profil & Kebutuhan | Pain Point Utama | Solusi yokBangun |
| :--- | :--- | :--- | :--- |
| **Pak Hendra (Owner Usaha Menengah / F&B / Ritel)** | Pemilik bisnis 35–50 tahun, fokus pada omzet, margin, dan kelancaran staf. | Sistem POS/kasir sering hang, vendor lama lepas tangan. | Maintenance retainer, pemulihan kode, sistem stabil. |
| **Mbak Sarah (Operations Lead / Logistik)** | Mengelola puluhan armada dan gudang, butuh automasi dokumen. | Input nota dan surat jalan masih manual, sering salah ketik. | AI Document Parsing praktis + dashboard data sederhana. |
| **Mas Radit (Founder Startup Sektoral)** | Founder non-teknis dengan modal terbatas yang butuh MVP kokoh. | Takut biaya membengkak dan vendor membuat arsitektur rapuh. | JEV decision framework, arsitektur transparan, Expo PWA. |

---

## 4. Product Scope & Functional Specifications

### 4.1. Internationalization (i18n) Engine
- **Default Locale:** Bahasa Indonesia (`id`, tanpa prefix URL seperti `/services`).
- **Secondary Locale:** English (`en`, dengan prefix `/en/services`).
- **Routing:** Config-level rewrites dan redirects di `next.config.ts` tanpa middleware overhead, kompatibel dengan Edge Runtime, Vercel, dan Cloudflare.

### 4.2. Route Architecture & Core Pages
1. **Beranda (`/` / `/en`):**
   - Hero section dengan value proposition jelas dan tombol CTA.
   - Peta ekosistem layanan (Digital Product, Practical AI, Maintenance, Sektor).
   - Story Rail & Showcase sektor industri.
   - Studi kasus ringkas dan formulir konsultasi cepat.
2. **Layanan Teknis (`/services`):**
   - Rincian rekayasa aplikasi web, dashboard operasional, audit kode, dan paket maintenance.
3. **Layanan AI Praktis (`/ai-services`):**
   - Solusi AI yang terukur (Document extraction, smart catalog search, workflow triage).
   - Penegasan batasan: *Apa yang TIDAK kami janjikan* (tidak ada AI otonom tanpa pengawasan manusia).
4. **Produk Digital (`/products`):**
   - Showcase modul siap pakai: POS ritel, dashboard inventori, engine booking, bot customer intake.
5. **Solusi Sektoral (`/sectors`):**
   - Arsitektur spesifik untuk 12 sektor industri Indonesia.
6. **Studi Kasus (`/work`):**
   - Bukti kerja nyata dengan metrik bisnis terukur (penurunan waktu proses, efisiensi server).
7. **Kemitraan (`/partnership`):**
   - Formulir pengajuan kolaborasi untuk software house, agensi, dan institusi.
8. **Tentang Kami (`/about`):**
   - Filosofi kerja, prinsip rekayasa, dan transparansi standar kerja tim.
9. **Kontak Langsung (`/contact`):**
   - Formulir kebutuhan proyek interaktif (React Query + sliding-window rate limit).
   - Jalur direct email (`mailto:`) dan WhatsApp (`wa.me`).

### 4.3. Mobile & PWA Companion
- **Web App Manifest (`/manifest.webmanifest`):** Standar PWA modern dengan status bar light theme, offline badge, dan shortcut navigasi.
- **Service Worker (`public/sw.js`):** Cache-first untuk aset statis, network-first untuk navigasi halaman.
- **Expo Companion (`/mobile`):** Arsitektur React Native mandiri untuk kebutuhan build iOS/Android native.
- **Maestro E2E Testing (`.maestro/flows/`):** Otomasi uji fungsional alur aplikasi secara headless.

---

## 5. Non-Functional Requirements & Performance Budgets

| Metrik | Target SLA | Metode Verifikasi |
| :--- | :--- | :--- |
| **First Contentful Paint (FCP)** | $\le$ 1.5 detik | Lighthouse Production Audit |
| **Largest Contentful Paint (LCP)** | $\le$ 2.0 detik | Lighthouse Mobile Throttle |
| **Total Blocking Time (TBT)** | $\le$ 200 ms | Web Vitals Chrome Profiler |
| **Cumulative Layout Shift (CLS)** | $\le$ 0.05 | Layout Shift Tracker |
| **Accessibility Score** | $\ge$ 95 (WCAG 2.1 AA) | Lighthouse a11y audit |
| **SEO Score** | 100 / 100 | Lighthouse SEO Audit |
| **Payload Size Protection** | Max 64 KB per POST | `lib/security/bodyGuard.ts` |
| **API Rate Limiting** | Max 5 req / 10 menit / IP | `lib/security/rateLimit.ts` |
| **Uptime Target** | 99.9% Uptime | Vercel Edge SLA / DNS Exit |
