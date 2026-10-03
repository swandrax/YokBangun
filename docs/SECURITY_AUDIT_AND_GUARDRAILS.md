# Audit Keamanan, Mitigasi Vulnerability & Penerapan Guardrails
## Security Audit, Vulnerability Mitigation & Technical Debt Resolution — yokBangun

---

## 1. Ringkasan Audit Kerentanan (Vulnerability Detection)

Berikut adalah daftar kerentanan potensial (*plausible vulnerabilities*), bug, dan technical debt yang terdeteksi pada codebase, beserta mitigasi nyata yang telah diimplementasikan:

| ID | Kategori | Temuan Kerentanan / Technical Debt | Dampak (Severity) | Status & Solusi Mitigasi |
| :--- | :--- | :--- | :--- | :--- |
| **VULN-01** | **API Security** | Endpoint `/api/contact` & `/api/partnership` tidak memiliki pembatasan laju (*rate limiting*). Bot dapat melakukan spam ribuan request. | **HIGH** | **Resolved.** Diimplementasikan `lib/security/rateLimit.ts` dengan sliding window (5 request / 10 menit / IP) + header `Retry-After`. |
| **VULN-02** | **DoS / Memory** | `request.json()` mem-parsing seluruh stream request tanpa batas ukuran. Payload raksasa (puluhan MB) dapat menghabiskan memori RAM Node.js. | **HIGH** | **Resolved.** Diimplementasikan `lib/security/bodyGuard.ts` (`parseSafeJson`) dengan batasan keras 64 KB per payload (HTTP 413). |
| **VULN-03** | **SSRF** | `deliverSubmission` meneruskan webhook ke sembarang URL dari environment tanpa sanitasi. Berisiko probe jaringan internal atau pencurian metadata cloud (`169.254.169.254`). | **CRITICAL** | **Resolved.** Diimplementasikan `lib/security/ssrfGuard.ts` yang memblokir IP lokal, subnet privat, dan endpoint metadata cloud. |
| **VULN-04** | **HTTP Headers** | Header `Strict-Transport-Security` (HSTS) dan `X-DNS-Prefetch-Control` belum aktif secara penuh di `next.config.ts`. | **MEDIUM** | **Resolved.** Menambahkan HSTS (2 tahun) dan proteksi header modern di `next.config.ts`. |
| **DEBT-01** | **Mobile Config** | `mobile/tsconfig.json` mengalami crash karena dependensi eksternal `"expo/tsconfig.base"` tidak ditemukan di workspace root. | **MEDIUM** | **Resolved.** Dibuat konfigurasi mandiri React Native / Expo yang self-contained di `mobile/tsconfig.json`. |
| **DEBT-02** | **SEO Routing** | Tag `hreflang="id"` sempat mengarah ke path `/id` yang kemudian me-redirect (308) ke `/`. | **LOW** | **Resolved.** Seluruh tag alternates di `lib/seo/metadata.ts` dikanonisasi ke root `/` tanpa redirect. |
| **DEBT-03** | **Metadata Base** | Warning `metadataBase property is not set in root layout` saat resolusi aset OpenGraph. | **LOW** | **Resolved.** Diekspor konstanta `metadataBase` pada `app/layout.tsx`. |

---

## 2. Guardrails Arsitektur & Rekayasa

Guardrails adalah batasan mutlak (*non-negotiable constraints*) yang dipaksakan secara terprogram:

### 2.1. Guardrail Keamanan (Security Guardrails)
1. **Trust Boundary di Route Handlers:** Validasi di browser hanyalah untuk UX. Seluruh data form wajib divalidasi ulang di server menggunakan `schema.ts`.
2. **Honeypot Anti-Bot:** Field tersembunyi `website` mendeteksi bot pengisi form otomatis; request bot langsung diabaikan secara diam-diam (*dropped silently* dengan respons sukses 201 palsu) tanpa membebani webhook.
3. **SSRF Guard:** Webhook ke sistem eksternal wajib menggunakan HTTPS terverifikasi.

### 2.2. Guardrail Layanan AI (AI Safety & Human-in-the-Loop)
1. **No Autonomous Destructive Actions:** Modul AI tidak diizinkan melakukan mutasi database krusial (hapus data, transfer dana, ubah status kontrak) tanpa tombol persetujuan (*approval gate*) manusia.
2. **Grounded Knowledge Only:** AI hanya boleh menjawab berdasarkan data dokumen bisnis yang sudah diverifikasi (RAG), dengan sitasi sumber yang dapat diperiksa ulang.
3. **Token Quota Breaker:** Pembatasan kuota biaya token API per bulan untuk mencegah tagihan membengkak akibat *infinite loop* atau *prompt injection*.

### 2.3. Guardrail Identitas Brand & Desain
1. **Strict Light Theme Only:** Kode warna wajib merujuk ke token CSS `--color-bg: #FFFFFF` dan `--color-canvas: #F7F8F6`. Larangan keras menambahkan dark-mode styles liar.
2. **Standard Brand Naming:** Nama resmi brand wajib konsisten: `yokBangun — growth with u`.
3. **No Excessive Dashes & Natural Copy:** Menghilangkan em-dash berlebih pada teks UI dan menggunakan gaya bahasa Indonesia teknik yang membumi tanpa kata-kata klise LLM (*unleash, revolutionary, cutting-edge*).

### 2.4. Guardrail Performa & PWA
1. **Performance Budget:** LCP $\le$ 2.0 detik pada audit produksi.
2. **Zero-Bundle Bloat:** Mengaktifkan `optimizePackageImports` di `next.config.ts` untuk memecah library besar (`motion/react`, `preline`, `@tanstack/react-query`).
3. **Offline Resilience:** Service worker menyimpan aset shell statis sehingga PWA tetap dapat dibuka saat koneksi seluler terputus.

---

## 3. Hasil Pengujian Otomatis

Seluruh modul guardrails dan decision layer telah diuji menggunakan rangkaian pengujian otomatis:
```
✓ tests/jev.test.ts (3 tests)
✓ tests/security.test.ts (6 tests)
✓ tests/schema.test.ts (10 tests)
✓ tests/routes.test.ts (3 tests)
✓ tests/i18n.test.ts (4 tests)
✓ tests/feed.test.ts (1 test)
✓ tests/manifest.test.ts (1 test)

Test Files:  7 passed (7)
Tests:       28 passed (28)
Typecheck:   0 errors (npx tsc --noEmit)
```
Semua perlindungan aktif dan siap untuk deployment produksi di Vercel.
