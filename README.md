# yokBangun — growth with u

> Website profil perusahaan resmi yokBangun (Solusi Digital, Layanan AI, Maintenance & Rekayasa Perangkat Lunak untuk UMKM, Bisnis Menengah, dan Kebutuhan Sektoral di Indonesia).
> Production URL: **https://yok-bangun.vercel.app/**

---

## 🚀 Fitur Utama & Arsitektur

- **Framework**: Next.js 16 (App Router) dengan TypeScript 5 (Strict Mode).
- **Styling**: Vanilla CSS Modules murni dengan custom design tokens (`app/globals.css`).
- **i18n Engine**: Zero-middleware subpath routing (`/` untuk Bahasa Indonesia, `/en/*` untuk English) menggunakan `next.config.ts` rewrite engine yang 100% kompatibel dengan Vercel Serverless dan Edge CDN.
- **Companion PWA Specification**:
  - Web App Manifest (`public/manifest.webmanifest`) dengan tema `#1F5D45` dan entri ikon 192x192, 512x512, serta 512x512 maskable.
  - Service Worker (`public/sw.js`) dengan strategi `Stale-While-Revalidate`, `Cache-First`, dan `Network-Only` terproteksi untuk formulir kontak.
  - Halaman offline mandiri dwibahasa (`public/offline.html`).
- **Android App Links Verification**:
  - Konfigurasi `/.well-known/assetlinks.json` untuk verifikasi paket `id.yokbangun.app` (SHA-256 fingerprint).
  - Smart Android App Transition Banner (`components/AndroidAppBanner`) dengan fallback intent URL ke halaman `/download`.
  - Halaman `/download` dengan panduan instalasi APK dan tabel spesifikasi teknis.
- **Header Keamanan & Vercel**:
  - Konfigurasi terpusat di `vercel.json` dan `next.config.ts` untuk CSP, HSTS, CORS `/api/*`, dan mime-type statis.

---

## 📚 Dokumentasi Arsitektur & Desain Sistem

Dokumentasi lengkap proyek tersedia di direktori `docs/`:

1. [**Arsitektur Sistem & 5 Unsur Perancangan UML**](./docs/SYSTEM_ARCHITECTURE_5_UNSUR_UML.md)
   - **ERD** (Entity Relationship Diagram)
   - **LRS** (Logical Record Structure)
   - **LSF** (Logical System Flow / Diagram Alir Sistem Logis)
   - **Use Case Diagram & Spesifikasi Use Case**
   - **Activity Diagram & Pemodelan UML** (Class, Sequence, Component, & Deployment Diagram)
2. [**Panduan Deployment (Vercel & Cloudflare)**](./docs/deployment.md)
3. [**Product Requirements Document (PRD)**](./docs/PRD_PRODUCT_REQUIREMENTS_DOCUMENT.md)
4. [**Audit Keamanan & Guardrails Ingest**](./docs/SECURITY_AUDIT_AND_GUARDRAILS.md)
5. [**SDLC Engineering Playbook**](./docs/SDLC_ENGINEERING_PLAYBOOK.md)

---

## 🛠️ Perintah Pengembangan (Scripts)

```bash
# Menjalankan development server
npm run dev

# Memeriksa tipe data TypeScript
npm run typecheck

# Menjalankan linting ESLint
npm run lint

# Menjalankan pengujian Vitest
npm run test

# Menjalankan kompilasi produksi Next.js
npm run build

# Menjalankan seluruh pipeline validasi
npm run check
```

---

## 📦 Lisensi

MIT License © yokBangun.
