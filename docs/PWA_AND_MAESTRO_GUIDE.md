# Panduan PWA, Maestro Expo, dan Dynamic DNS (111.94.7.240)

Dokumen ini menjelaskan implementasi fitur Progressive Web App (PWA), integrasi Maestro UI automation dengan Expo, serta automasi dynamic DNS untuk `yokbangun.work.gd` dengan IP `111.94.7.240`.

---

## 1. Implementasi PWA (Progressive Web App)

Aplikasi web Next.js kini telah dilengkapi dengan arsitektur PWA lengkap:

1. **Web App Manifest (`app/manifest.ts`)**:
   - Mendefinisikan nama aplikasi (`yokBangun — growth with u`), tema warna (`#1F5D45`), mode tampilan (`standalone`), orientasi, serta jalan pintas navigasi (Layanan, Layanan AI, Kontak).
   - Menghasilkan rute resmi `/manifest.webmanifest`.

2. **Ikon PWA (`public/icons/`)**:
   - `icon-192.png`: Resolusi 192x192 untuk layar perangkat Android standar.
   - `icon-512.png`: Resolusi 512x512 untuk splash screen dan launcher beresolusi tinggi.
   - `maskable-512.png`: Ikon adaptif maskable dengan padding zona aman (safe zone) 10%.
   - `apple-touch-icon.png`: Resolusi 180x180 untuk perangkat iOS/iPadOS Safari.
   - `icon.svg`: Ikon vektor resolusi tak terbatas.

3. **Service Worker (`public/sw.js`)**:
   - **Cache Shell**: Mem-prefetch aset statis utama pada saat pemasangan.
   - **Stale-While-Revalidate**: Mempercepat pemuatan berkas CSS, chunk JS, dan gambar sembari memperbarui cache di latar belakang.
   - **Network-First dengan Offline Fallback**: Memastikan navigasi halaman tetap dapat dibuka bahkan saat pengguna kehilangan koneksi internet.

4. **Komponen PWA Client**:
   - [`ServiceWorkerRegister.tsx`](file:///c:/Users/user/Desktop/company-profile/components/pwa/ServiceWorkerRegister.tsx): Mendaftarkan service worker secara otomatis pada mode produksi.
   - [`PwaInstallPrompt.tsx`](file:///c:/Users/user/Desktop/company-profile/components/pwa/PwaInstallPrompt.tsx): Menampilkan dialog ramah bagi pengguna mobile atau desktop untuk memasang aplikasi yokBangun ke layar beranda (Add to Home Screen).

---

## 2. Maestro UI Automation & Expo Mobile

Aplikasi pendamping Expo dan alur pengujian otomatis Maestro berada pada direktori:
- **Expo Mobile App**: [`mobile/`](file:///c:/Users/user/Desktop/company-profile/mobile/)
- **Maestro Flows**: [`.maestro/`](file:///c:/Users/user/Desktop/company-profile/.maestro/)

### Struktur Alur Maestro (`.maestro/flows/`)
- `01-launch-and-home.yaml`: Pengujian peluncuran awal, verifikasi brand guardrails (`yokBangun`, `growth with u`, `Bangun digitalnya.`), dan tombol CTA.
- `02-services-navigation.yaml`: Pengujian navigasi ke menu Layanan dan verifikasi 4 pilar utama.
- `03-contact-inquiry.yaml`: Pengujian formulir kontak, input data, dan tombol kirim.
- `04-pwa-features.yaml`: Pengujian tombol salin URL (Clipboard.js) dan interaksi PWA.

### Menjalankan Maestro
1. **Instalasi Maestro CLI** (jika belum terpasang):
   ```bash
   # Windows (PowerShell):
   npm install -g maestro-cli
   # atau via installer resmi:
   curl -FsSL "https://get.maestro.mobile.dev" | bash
   ```
2. **Menjalankan Pengujian**:
   ```bash
   # Jalankan semua skenario pengujian:
   maestro test .maestro/flows/

   # Atau jalankan skenario tertentu:
   maestro test .maestro/flows/01-launch-and-home.yaml
   ```

### Menjalankan Expo Mobile
```bash
cd mobile
npx expo start
```

---

## 3. Dynamic DNS (DNS Exit IP Update - 111.94.7.240)

Pembaruan alamat IP publik `111.94.7.240` untuk domain `yokbangun.work.gd` telah disiapkan:

1. **API Endpoint & Kunci**:
   - Host: `yokbangun.work.gd`
   - IP Target: `111.94.7.240`
   - Hasil Uji Coba: `{"code":0,"message":"Success - yokbangun.work.gd updated to 111.94.7.240"}`

2. **Windows Scheduled Task (`DNS Exit IP Update`)**:
   - Tugas berkala telah aktif di Windows Task Scheduler untuk mengeksekusi pembaruan setiap **12 menit**.
   - Perintah pengecekan status tugas:
     ```powershell
     schtasks /query /tn "DNS Exit IP Update" /fo LIST
     ```

3. **Berkas Skrip Batch**:
   - Skrip proyek: [`scripts/dns-exit-update.bat`](file:///c:/Users/user/Desktop/company-profile/scripts/dns-exit-update.bat)
   - Skrip Desktop pengguna: `C:\Users\user\Desktop\file BAT\dns-exit-update.bat`
