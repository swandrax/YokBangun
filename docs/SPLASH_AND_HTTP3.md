# Launch Splash & HTTP/3

## 1. Splash saat aplikasi dibuka

Muncul hanya ketika yokBangun dibuka dari ikon aplikasi yang sudah dipasang
(PWA standalone di Android, iOS, Windows, macOS). Pengunjung web biasa tidak
melihatnya, jadi skor Lighthouse dan LCP situs tidak terpengaruh.

Urutan animasi (total sekitar 3,6 detik, bisa dilewati dengan ketuk / Enter / Esc):

| Waktu | Yang terjadi |
| :--- | :--- |
| 0,00 s | Kotak hijau logo muncul |
| 0,40 s | Dua garis putih logo tergambar |
| 1,00 s | Titik clay muncul |
| 1,05 s | Tulisan "yokBangun" dan "growth with u" masuk |
| 1,80 s | "Bangun digitalnya." naik kata per kata |
| 2,10 s | "Tumbuh usahanya." naik kata per kata (hijau brand) |
| 3,60 s | Layar splash memudar, halaman siap dipakai |

Perilaku:

- Sekali per sesi. Membuka ulang aplikasi setelah ditutup akan menampilkan splash lagi.
- Pengguna dengan pengaturan "kurangi gerakan" mendapat versi singkat tanpa gerak (1,4 detik).
- Kalau JavaScript gagal dimuat, splash tetap hilang sendiri karena semua timing ada di CSS.
- Banner "Pasang Aplikasi" tidak muncul lagi di dalam aplikasi yang sudah terpasang.

Responsif:

- Ponsel potret: logo di atas, kalimat di bawah, ukuran mengikuti lebar layar.
- Ponsel lanskap / jendela pendek: logo dan kalimat berdampingan.
- Desktop: tata letak sama dengan jarak lebih lega.
- Notch dan home indicator aman lewat `env(safe-area-inset-*)`.

Mencoba tanpa memasang aplikasi: buka URL mana pun dengan `?splash=1`,
misalnya `http://localhost:3000/?splash=1` atau `/en?splash=1`.

File terkait:

- `components/pwa/AppSplash.tsx` (markup + skrip deteksi sebelum render)
- `components/pwa/AppSplash.module.css` (seluruh animasi)
- `components/pwa/AppSplashController.tsx` (lewati + bersih bersih)
- `messages/id.ts` dan `messages/en.ts` kunci `splash`

## 2. HTTP/3

| Lingkungan | Status | Yang perlu dilakukan |
| :--- | :--- | :--- |
| Vercel | Aktif otomatis | Tidak ada. Edge Vercel melayani HTTP/3 untuk domain yang terhubung. |
| Server sendiri (111.94.7.240) | Lewat Caddy | Jalankan `deploy/Caddyfile` di depan `next start`. |
| `npm run dev` / localhost | Tidak tersedia | Server Node.js hanya HTTP/1.1. Ini normal untuk pengembangan. |

Langkah server sendiri:

1. `npm run build` lalu `npm run start` (port 3000).
2. Pasang Caddy (`winget install CaddyServer.Caddy`).
3. `caddy run --config deploy/Caddyfile`.
4. Di router, teruskan TCP 80, TCP 443, dan **UDP 443** ke komputer server.
   UDP 443 wajib untuk HTTP/3; tanpa itu browser otomatis turun ke HTTP/2.

Cek hasil:

```bash
curl -I --http3 https://yokbangun.work.gd
```

Atau buka DevTools > Network, tampilkan kolom Protocol, nilai `h3` berarti HTTP/3 aktif.
