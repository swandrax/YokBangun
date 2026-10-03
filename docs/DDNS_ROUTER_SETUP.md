# Panduan Konfigurasi DDNS DNS Exit: Router & Clients

URL pembaruan Dynamic DNS resmi untuk domain **`yokbangun.work.gd`**:

```text
https://api.dnsexit.com/dns/ud/?apikey=5xl1KHF2Gcrz4f4B6OfV3BJqVD89uo&host=yokbangun.work.gd
```

> **Catatan:**
> - Jika dijalankan langsung dari Router, DNS Exit akan otomatis mendeteksi **IP Publik WAN** router Anda.
> - Jika ingin mengunci ke IP spesifik (`111.94.7.240`), tambahkan parameter `&myip=111.94.7.240`:
>   ```text
>   https://api.dnsexit.com/dns/ud/?apikey=5xl1KHF2Gcrz4f4B6OfV3BJqVD89uo&host=yokbangun.work.gd&myip=111.94.7.240
>   ```

---

## 1. Konfigurasi Pada Router

### A. MikroTik RouterOS
Buka **Terminal MikroTik** atau menu **System > Scripts**, buat script baru:

```routeros
# Script Name: update-dnsexit
/tool fetch mode=https url="https://api.dnsexit.com/dns/ud/?apikey=5xl1KHF2Gcrz4f4B6OfV3BJqVD89uo&host=yokbangun.work.gd" keep-result=no
:log info "DNS Exit IP Update triggered for yokbangun.work.gd"
```

Jalankan berkala via **System > Scheduler**:
```routeros
/system scheduler add name="schedule-dnsexit" interval=12m on-event="update-dnsexit"
```

---

### B. OpenWrt
Buka menu **System > Scheduled Tasks (Cron)** atau edit `/etc/crontabs/root`:

```bash
*/12 * * * * curl -s "https://api.dnsexit.com/dns/ud/?apikey=5xl1KHF2Gcrz4f4B6OfV3BJqVD89uo&host=yokbangun.work.gd" > /dev/null 2>&1
```

---

### C. Router Asus (Asuswrt / Merlin) atau DD-WRT
Pada menu **WAN > DDNS**:
- Pilih **Custom** / **Inadyn**
- Isi URL pembaruan:
  ```text
  https://api.dnsexit.com/dns/ud/?apikey=5xl1KHF2Gcrz4f4B6OfV3BJqVD89uo&host=yokbangun.work.gd
  ```

---

### D. Modem / Router ISP (IndiHome ZTE / Huawei / TP-Link)
Jika modem Anda memiliki menu **DDNS** dengan opsi **Custom Server**:
- **Server Address:** `api.dnsexit.com`
- **URL Path / Update URL:** `/dns/ud/?apikey=5xl1KHF2Gcrz4f4B6OfV3BJqVD89uo&host=yokbangun.work.gd`
- **Port:** `443` (SSL / HTTPS)

---

## 2. Konfigurasi Pada Client (PC / Server)

### A. Windows (PowerShell)
```powershell
Invoke-RestMethod -Uri "https://api.dnsexit.com/dns/ud/?apikey=5xl1KHF2Gcrz4f4B6OfV3BJqVD89uo&host=yokbangun.work.gd"
```

### B. Windows (Task Scheduler / Background)
Telah aktif di komputer ini melalui tugas bernama **`DNS Exit IP Update`** (berjalan tiap 12 menit).

### C. Linux / VPS / Ubuntu Server (Crontab)
Jalankan `crontab -e` dan tambahkan:
```bash
*/12 * * * * curl -s "https://api.dnsexit.com/dns/ud/?apikey=5xl1KHF2Gcrz4f4B6OfV3BJqVD89uo&host=yokbangun.work.gd" > /dev/null 2>&1
```

---

## 3. Respon API yang Diharapkan
- **Jika IP baru berhasil diperbarui:**
  ```json
  {"code":0,"message":"Success - yokbangun.work.gd updated to 111.94.7.240"}
  ```
- **Jika IP tidak berubah (tetap sama):**
  ```json
  {"code":1,"message":"IP not changed - 111.94.7.240"}
  ```
