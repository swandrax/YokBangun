# Architecture Decision Record (ADR)
## ADR-002: Pemisahan Jalur Pengembangan Mobile Web App (MWA) dan Progressive Web App (PWA)
**Status:** Diterima (Accepted)  
**Tanggal:** 2026-10-15  
**Pembuat Keputusan:** Auditor, Perancang, Peninjau & Tim Mobile/Web  

---

### Konteks & Latar Belakang
Pengguna yokBangun mayoritas mengakses situs menggunakan perangkat ponsel pintar (Android dan iOS) dengan kualitas jaringan yang beragam (3G/4G di pelosok dan perkotaan). Terdapat dua kebutuhan pengalaman yang berbeda:
1. **Pengunjung Baru / Santai (MWA - Mobile Web App):** Datang via tautan browser tanpa ingin memasang aplikasi apa pun. Butuh pemuatan instan (< 2 detik), navigasi satu tangan, dan touch target ramah jari.
2. **Pengguna Rutin / Pengurus RT/RW (PWA - Progressive Web App):** Ingin memasang ikon di layar utama ponsel, bekerja saat internet padam/lemah, dan mendapatkan notifikasi serta akses cepat ke formulir layanan.

Sebelumnya, terdapat tumpang tindih antara banner promosi Android (`AndroidAppBanner`) dengan bilah navigasi ponsel modern, serta duplikasi antara manifes dinamis (`app/manifest.ts`) dan manifes statis (`public/manifest.webmanifest`).

---

### Keputusan Arsitektur
1. **Pemisahan Jalur MWA:**
   - Standar touch target minimal 44 x 44 px untuk seluruh elemen tombol dan tautan.
   - Menggunakan tipografi fluida berbasis `clamp()` yang tetap dapat dibaca tanpa rusak saat perbesaran zoom peramban mencapai 200%.
   - Mengintegrasikan kompensasi `env(safe-area-inset-bottom)` dan `env(safe-area-inset-top)` pada seluruh komponen fixed/sticky.
2. **Pemisahan Jalur PWA:**
   - Menetapkan `app/manifest.ts` sebagai generator dinamis terpadu dengan penyelarasan fallback pada `public/manifest.webmanifest`.
   - Menghindari penyimpanan data sensitif pengguna dalam cache Service Worker offline.
   - Cache-First untuk aset font dan gambar statis, Stale-While-Revalidate untuk data publik, dan Network-Only untuk formulir kontak demi menjamin tanda terima server yang sah.
3. **Penyelarasan Dimensi Responsif:**
   - Seluruh halaman diuji pada 10 dimensi standar: 320, 360, 390, 414, 768, 834, 1024, 1280, 1440, dan 1920 px.

---

### Konsekuensi
- **Positif:** Antarmuka ponsel bebas dari tabrakan gesture navigation bar; pengalaman PWA bersih dan andal; tidak ada data formulir yang hilang tanpa konfirmasi server saat offline.
- **Tantangan:** Perubahan tampilan wajib diuji dalam mode simulasi ponsel di berbagai rasio aspek sebelum dirilis.
