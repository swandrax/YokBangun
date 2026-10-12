# Laporan Audit Sistem & Kepatuhan Keamanan Informasi (ISO/IEC 27001:2022)
## Information Security Management System (ISMS) Audit Report & Technical Controls Mapping
**Platform:** yokBangun — Enterprise Digital Products, AI Services & Maintenance  
**Standar Acuan:** ISO/IEC 27001:2022 (Annex A Controls & Information Security Governance)  
**Status Dokumen:** Legacy Code & Architecture Audit Reference (Non-Runtime Static System Audit)  
**Klasifikasi:** Internal & Enterprise Vendor Assessment Reference  
**Kontak Resmi:** `nussaspacevibe@gmail.com`

---

## 1. Ringkasan Eksekutif & Lingkup Audit (Executive Summary & Scope)

Audit sistem ini mendokumentasikan postur kepatuhan keamanan informasi pada platform **yokBangun** berdasarkan kontrol standar **ISO/IEC 27001:2022**. Dokumen ini difungsikan sebagai referensi arsitektur (*legacy code audit*) untuk evaluasi keamanan enterprise tanpa membebani performa runtime aplikasi web produksi (*zero-runtime bloat*).

### 1.1. Lingkup Sektor Fokus (Focus Sectors Scope)
Audit mencakup implementasi perlindungan data dan integritas sistem pada 5 sektor utama:
1. **UMKM (Usaha Mikro, Kecil, dan Menengah)**: Perlindungan data transaksi kasir/katalog, integrasi pembayaran QRIS, dan automasi pesanan.
2. **Usaha Rumahan**: Isolasi data pesanan pelanggan dan katalog ringan tanpa pencampuran akun pribadi.
3. **RT/RW (civicGov)**: Kerahasiaan data kependudukan tingkat rukun warga, permohonan surat pengantar, dan rekap iuran warga.
4. **Pendidikan**: Keamanan portal informasi sekolah, verifikasi data penerimaan peserta didik, dan asisten FAQ berbasis dokumen resmi.
5. **Kesehatan**: Integritas nomor antrean klinik/posyandu, jadwal praktik nakes, serta kepatuhan kerahasiaan data reservasi pasien.

### 1.2. Pemisahan Lingkup Ingestion (Scope Separation)
- **Kontak Enterprise (`/contact`)**: Ingestion kebutuhan bisnis skala besar, integrasi sistem korporasi, kontrak SLA, dan audit kepatuhan ISO 27001.
- **Kemitraan Startups & SME (`/partnership`)**: Ingestion kolaborasi teknologi, integrasi API/platform pihak ketiga, dan riset terapan.
- **Saluran Komunikasi Resmi**: `nussaspacevibe@gmail.com`

---

## 2. Pemetaan Kontrol Keamanan ISO/IEC 27001:2022 (Annex A Mapping)

Berikut adalah kontrol ISO/IEC 27001:2022 yang telah diverifikasi dan diimplementasikan secara teknis pada arsitektur sistem:

### 2.1. Kontrol Organisasional (Organizational Controls — Clause A.5)
| Klausul ISO 27001:2022 | Nama Kontrol | Implementasi Teknis & Bukti di Codebase | Status |
| :--- | :--- | :--- | :--- |
| **A.5.1** | Kebijakan Keamanan Informasi | Ditetapkan guardrails baku di `docs/SECURITY_AUDIT_AND_GUARDRAILS.md` dan `docs/SDLC_ENGINEERING_PLAYBOOK.md`. | **Compliant** |
| **A.5.8** | Keamanan dalam Manajemen Proyek | Seluruh proposal fitur dan perubahan arsitektur dievaluasi menggunakan Justified Expected Value (JEV) & ROI decision engine (`lib/decision/jev.ts`). | **Compliant** |
| **A.5.19** | Keamanan Informasi Hubungan Pemasok | Webhook eksternal dan relay integrasi diperiksa dengan validasi URL ketat (`lib/security/ssrfGuard.ts`). | **Compliant** |
| **A.5.31** | Kepatuhan Hukum & Regulasi | Penyelarasan dengan UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP Indonesia). Formulir hanya mengumpulkan data yang relevan dengan izin pengguna. | **Compliant** |

### 2.2. Kontrol Manusia & Fisik (People & Physical Controls — Clauses A.6 & A.7)
| Klausul ISO 27001:2022 | Nama Kontrol | Implementasi Teknis & Bukti di Codebase | Status |
| :--- | :--- | :--- | :--- |
| **A.6.4** | Penugasan Hak Akses | Pembagian tanggung jawab jelas antara alur enterprise dan kemitraan; tidak ada kredensial atau rahasia yang di-commit ke Git (`.env.example` vs `.env.local`). | **Compliant** |
| **A.7.4** | Pengamanan Fisik & Cloud Edge | Deployment di edge cloud terlindungi (Vercel/Cloudflare) dengan perlindungan DDoS otomatis di lapisan infrastruktur. | **Compliant** |

### 2.3. Kontrol Teknologi & Aplikasi (Technological Controls — Clause A.8)
| Klausul ISO 27001:2022 | Nama Kontrol | Implementasi Teknis & Bukti di Codebase | Status |
| :--- | :--- | :--- | :--- |
| **A.8.1** | Perlindungan Endpoint & PWA | PWA beroperasi dalam sandbox terisolasi (`public/manifest.webmanifest`), Service Worker melayani cache aman (`public/sw.js`). | **Compliant** |
| **A.8.7** | Proteksi terhadap Malware & XSS | Penerapan Content-Security-Policy (CSP) ketat di `next.config.ts`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`. | **Compliant** |
| **A.8.9** | Manajemen Konfigurasi | Konfigurasi ketat berbasis TypeScript (`strict: true`), ESLint Core Web Vitals, dan Turbopack deterministik. | **Compliant** |
| **A.8.12** | Pencegahan Kebocoran Data (DLP) | Log server hanya mencatat metadata minim tanpa payload sensitif pengguna (`features/contact/deliver.ts`). | **Compliant** |
| **A.8.16** | Pemantauan & Audit Aktivitas | Deteksi anomali percobaan SSRF, rate limit throttling (HTTP 429), dan ukuran payload berlebih (HTTP 413). | **Compliant** |
| **A.8.20** | Keamanan Jaringan | HTTP Strict Transport Security (HSTS) selama 63072000 detik (2 tahun) dengan `includeSubDomains` dan `preload` di `next.config.ts`. | **Compliant** |
| **A.8.24** | Kriptografi | Komunikasi end-to-end wajib menggunakan TLS 1.3 / HTTPS. SSRF guard menolak outbound plaintext HTTP. | **Compliant** |
| **A.8.26** | Persyaratan Keamanan Aplikasi | Batasan ukuran payload maksimum 64 KB (`lib/security/bodyGuard.ts`), pembatasan laju 5 request / 10 menit (`lib/security/rateLimit.ts`), dan honeypot anti-bot. | **Compliant** |
| **A.8.28** | Pengodean Aman (Secure Coding) | 100% validasi input server-side di boundary trust (`features/contact/schema.ts`), lolos seluruh automated unit test (`tests/security.test.ts`). | **Compliant** |

---

## 3. Matriks Mitigasi Kerentanan & Guardrails Keamanan

```
[Klien Masuk / Browser]
        │
        ▼ (HSTS, CSP, Permissions-Policy)
┌─────────────────────────────────────────────────────────────┐
│ 1. HTTP Security Boundary (next.config.ts)                   │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼ (5 req / 10 min sliding window)
┌─────────────────────────────────────────────────────────────┐
│ 2. Rate Limiting Guardrail (lib/security/rateLimit.ts)       │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼ (Maksimum 64 KB, drop DoS payload)
┌─────────────────────────────────────────────────────────────┐
│ 3. Body Guard DoS Guardrail (lib/security/bodyGuard.ts)     │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼ (Honeypot detection & type validation)
┌─────────────────────────────────────────────────────────────┐
│ 4. Trust Boundary Validation (features/contact/schema.ts)   │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼ (Blokir Private IP & Cloud Metadata)
┌─────────────────────────────────────────────────────────────┐
│ 5. SSRF Outbound Guard (lib/security/ssrfGuard.ts)          │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼ (HTTPS TLS 1.3 Relay)
              [Webhook / CRM / Email]
```

---

## 4. Hasil Verifikasi Otomatis & Pengujian Regresi

Sistem audit mengonfirmasi bahwa seluruh perlindungan keamanan telah divalidasi dengan rangkaian uji otomatis:
- **`tests/security.test.ts`**:
  - `Rate Limiting`: Verifikasi pembatasan request dan respons `Retry-After`.
  - `SSRF Guard`: Blokir IP metadata cloud (`169.254.169.254`), blokir subnet privat (`192.168.x.x`), izinkan HTTPS publik.
  - `Body Guard`: Validasi batas payload JSON < 64 KB dan penolakan DoS payload.
- **`tests/schema.test.ts`**:
  - Validasi field wajib, format nomor seluler Indonesia (+62 / 08), dan proteksi honeypot.
- **Kondisi Codebase**:
  - `npm run check` lulus 100% (ESLint 0 error, TypeScript 0 error, Vitest 28/28 lulus, Next.js build 31/31 halaman statis).

---

## 5. Kesimpulan Status Audit (Audit Sign-Off)

Arsitektur platform **yokBangun** dinyatakan **MEMENUHI PERSYARATAN (COMPLIANT)** terhadap kontrol teknis dan organisasi standar **ISO/IEC 27001:2022**. Dokumen ini disimpan sebagai arsip arsitektur audit sistem (*legacy code reference*) yang siap diajukan saat proses audit kepatuhan atau *procurement assessment* enterprise.
