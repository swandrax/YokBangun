# Architecture Decision Record (ADR)
## ADR-001: Kebijakan Bahasa Publik & Penghapusan Jargon Teknologi
**Status:** Diterima (Accepted)  
**Tanggal:** 2026-10-15  
**Pembuat Keputusan:** Auditor, Perancang, Peninjau & Pemilik Platform  

---

### Konteks & Latar Belakang
Platform yokBangun menyasar segmen pengguna:
- Pemilik UMKM dan usaha rumahan (F&B, toko ritel, bengkel, jasa).
- Pengurus lingkungan warga (RT/RW / civicGov).
- Lembaga pendidikan (sekolah dasar/menengah, lembaga kursus) dan orang tua murid.
- Layanan kesehatan masyarakat (klinik pratama, posyandu).

Sebelumnya, codebase memuat banyak teks publik teknis: "Arsitektur frontend modern", "integrasi embedding RAG", "PostgreSQL", "Next.js", "REST API & GraphQL", serta kata kunci SEO "ISO 27001" tanpa sertifikasi resmi. Istilah-istilah ini memicu kebingungan pembaca awam dan menciptakan jarak psikologis.

---

### Keputusan Arsitektur
1. **Redaksi Berorientasi Manfaat:** Seluruh teks pada halaman publik (`app/`, `messages/`, `features/`) wajib menggunakan Bahasa Indonesia sehari-hari dengan kalimat pendek setara tingkat baca anak SMP.
2. **Pembersihan Nama Stack:** Dilarang menyebutkan nama bahasa pemrograman, framework, pustaka, database, nama model AI, atau hosting pada antarmuka publik.
3. **Penyelarasan Halaman Teknis:** Halaman publik `/technical` ("Catatan Teknis") dialihkan fungsinya menjadi "Cara Kami Menjaga Kualitas" yang menjelaskan keawetan kode, keamanan data, dan kepemilikan aset atas nama klien.
4. **Pembersihan Studi Kasus:** Label "Teknologi" diubah menjadi "Cara Kami Membangunnya" dengan badge fungsi nyata (contoh: *Katalog Menu Digital*, *Pemberitahuan WhatsApp*, *Pembayaran QRIS*).
5. **Kepatuhan Klaim:** Menghapus kata kunci "ISO 27001" dari metadata SEO publik untuk mencegah misleading advertising sebelum ada sertifikat resmi.

---

### Konsekuensi
- **Positif:** Tingkat keterbacaan (*readability*) meningkat drastis; rasio konversi konsultasi warga dan UMKM diproyeksikan naik; risiko regulasi terkait klaim sertifikasi tertutup.
- **Tantangan:** Tim teknis internal yang memerlukan rincian stack harus merujuk ke berkas internal (`docs/SYSTEM_ARCHITECTURE_5_UNSUR_UML.md` dan `legacy/ISO_27001_SYSTEM_AUDIT_REPORT.md`), bukan melihat halaman publik.
