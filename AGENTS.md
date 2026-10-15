# Tata Kelola Ruang Kerja Pengembangan Bersama Agent (Agent Governance Playbook)
## Platform: yokBangun — Mitra Digital UMKM, RT/RW, Sekolah & Layanan Kesehatan

Dokumen ini menetapkan aturan baku kerja sama antara agent AI dan insinyur manusia dalam memelihara serta mengembangkan repositori `yokBangun`.

---

## 1. Pembagian Zona Ruang Kerja (Workspace Zones)

Untuk mencegah kerusakan kode, perubahan tanpa sengaja, dan kebocoran informasi, repositori dibagi menjadi 5 zona tegas:

| Nama Zona | Cakupan Folder / Berkas | Batasan & Aturan Akses |
| :--- | :--- | :--- |
| **ZONA 1: LEGACY** | `legacy/`, berkas arsip audit lama | **Hanya Baca (Read-Only).** Tidak boleh diubah, ditimpa, atau dipindahkan tanpa persetujuan eksplisit pemilik. |
| **ZONA 2: DEVELOPMENT** | `app/`, `components/`, `features/`, `lib/` | **Boleh Diubah Melalui Cabang Fitur.** Dilarang langsung *commit* ke `main`. Wajib lolos seluruh gerbang pengujian. |
| **ZONA 3: SANDBOX** | `scratch/`, `.temp/`, direktori uji lokal | **Uji Coba Bebas.** Khusus eksperimen terisolasi; wajib terdaftar dalam `.gitignore` agar tidak masuk repositori. |
| **ZONA 4: KONTEN PUBLIK** | `messages/`, `content/`, teks antarmuka | **Wajib Lolos Filter Bahasa.** Tidak boleh menyebut nama bahasa, framework, library, database, AI model, atau singkatan teknis (RAG, API, frontend, backend, SLA, dll.). Tingkat baca setara SMP. |
| **ZONA 5: DOKUMEN** | `docs/`, `docs/adr/`, catatan serah terima | **Pencatatan Keputusan.** Setiap perubahan arsitektur besar wajib dicatat dalam berkas Architecture Decision Record (ADR). |

---

## 2. Struktur Peran & Batas Izin (Separation of Duties)

Kerja sama agent wajib mematuhi pemisahan 4 peran fungsional:

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│   1. AUDITOR    │  ──►  │  2. PERANCANG   │  ──►  │  3. PELAKSANA   │  ──►  │   4. PENINJAU   │
│   (Baca Saja)   │       │(Rancang Usulan) │       │ (Ubah di Cabang)│       │ (Gatekeeper/DoD)│
└─────────────────┘       └─────────────────┘       └─────────────────┘       └─────────────────┘
```

1. **Auditor (Mode Baca Saja):**
   - *Tugas:* Memeriksa kode, mencari celah keamanan, utang teknis, dan kebocoran bahasa teknologi.
   - *Izin:* Hanya membaca berkas dan menjalankan diagnosa pasif. Dilarang mengubah kode.
2. **Perancang:**
   - *Tugas:* Merumuskan solusi, memetakan pilar arsitektur TOGAF, merancang ADR, dan menulis ulang bahasa publik.
   - *Izin:* Menyusun draf usulan dan rencana paket kerja.
3. **Pelaksana:**
   - *Tugas:* Mengimplementasikan paket kerja yang telah disetujui pada cabang kerja terisolasi (`feature/*`).
   - *Izin:* Mengubah kode sesuai spesifikasi paket yang disetujui.
4. **Peninjau (Gatekeeper):**
   - *Tugas:* Memeriksa kebenaran hasil pengujian, memverifikasi tidak ada pelanggaran aturan bahasa publik, dan memastikan rencana pembatalan siap.
   - *Aturan Mutlak:* Satu peran tidak boleh menyetujui pekerjaannya sendiri.

---

## 3. Matriks Tindakan Agent

| Kategori Tindakan | Status Izin | Prosedur Operasional |
| :--- | :---: | :--- |
| Membaca kode, struktur, konfigurasi, dan dokumen | **DIPERBOLEHKAN** | Bebas dijalankan untuk keperluan analisis. |
| Menjalankan `npm run test`, `typecheck`, `lint` | **DIPERBOLEHKAN** | Wajib dijalankan untuk memverifikasi kualitas. |
| Membaca isi file lingkungan rahasia (`.env.local`) | **DILARANG KERAS** | Hanya laporkan keberadaan file, jangan pernah mencetak isi rahasia ke konsol/chat. |
| Mengubah/menghapus berkas di mode audit awal | **DILARANG KERAS** | Wajib menunggu persetujuan tertulis pemilik sistem. |
| Menjalankan perintah destruktif (`rm -rf`, force push) | **DILARANG KERAS** | Perubahan wajib dilakukan secara teratur via git commit terukur. |
| Menulis teks publik dengan istilah framework/stack | **DILARANG KERAS** | Wajib diterjemahkan menjadi manfaat harian warga/UMKM. |
| Membuat klaim sertifikasi/angka performa tanpa bukti | **DILARANG KERAS** | Wajib diberi tanda "perlu verifikasi". |
| Menggabungkan cabang fitur ke `main` | **BUTUH PERSETUJUAN MANUSIA** | Manusia memegang kendali rilis produksi final. |

---

## 4. Definisi Selesai (Definition of Done - DoD)

Suatu paket pekerjaan baru dinyatakan **SELESAI (DONE)** bila memenuhi 8 kriteria berikut:
1. **Tes Otomatis Lolos 100%:** `npm run test` (Vitest) seluruh berkas pengujian lulus tanpa kegagalan.
2. **Kesesuaian Tipe:** `npx tsc --noEmit` bersih tanpa kesalahan tipe.
3. **Pemeriksaan Linter:** `npm run lint` (ESLint) bersih tanpa peringatan/eror.
4. **Validasi Build Produksi:** `npm run build` berhasil mengompilasi seluruh rute statis & dinamis.
5. **Lolos Uji Bahasa Publik:** Tidak ada istilah stack teknis di halaman umum, metadata, alt-text, atau feed.
6. **Lolos Uji Dimensi Ponsel & PWA:** Responsif pada lebar 320px–1920px, touch target $\ge 44$px, safe-area inset aktif.
7. **Dokumentasi Diperbarui:** Dokumen arsitektur atau berkas ADR terkait telah ditulis.
8. **Rencana Pembatalan Tersedia:** Tersedia perintah rollback git yang jelas jika terjadi anomali.

---

## 5. Standar Keamanan & Perlindungan Data (Data Protection Guardrails)

1. **Prinsip Bebas Kredensial:** Kunci API, webhook URL, dan token rahasia tidak boleh di-commit ke Git.
2. **Batas Muatan (Body Guard):** Seluruh masukan formulir dibatasi maksimal 64 KB untuk mencegah kebanjiran data (DoS).
3. **Pembatasan Laju (Rate Limiting):** Endpoint publik dibatasi maksimal 5 pengiriman per 10 menit per IP.
4. **Perlindungan Jaringan Keluar (SSRF Guard):** Outbound webhook dilarang menghubungi alamat IP privat atau metadata cloud internal.
5. **Anti-Spam Pasif (Honeypot):** Formulir kontak menyertakan perangkap bot tanpa mengganggu aksesibilitas manusia.
