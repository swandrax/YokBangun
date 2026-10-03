# Decision Layer: Justified Expected Value (JEV) & ROI Gate
## Quantitative Framework for Product & Engineering Decisions — yokBangun

---

## 1. Mengapa Decision Layer Diperlukan?

Dalam pengembangan software modern, bahaya terbesar bukan kegagalan teknis, melainkan **membangun fitur yang salah dengan biaya tinggi yang tidak menghasilkan nilai ekonomi nyata (vanity engineering / AI hype trap)**.

`yokBangun` menerapkan **Decision Layer (JEV)** sebagai filter gerbang pertama (*first-line gatekeeper*) sebelum sebuah tiket masuk ke sprint backlog.

---

## 2. Rumus Matematis JEV

$$\text{JEV} = \text{EGV} - \text{ERP} - \text{TCO}$$

Dimana:

### 1. Total Cost of Ownership (TCO)
$$\text{TCO} = \text{CapEx (Biaya Development)} + \text{OpEx 1 Tahun (Server, Token LLM, Maintenance)}$$

### 2. Expected Gross Value (EGV)
$$\text{EGV} = (\text{Estimasi Peningkatan Omzet} + \text{Estimasi Penghematan Biaya Operasional}) \times P(\text{Success})$$

### 3. Expected Risk Penalty (ERP)
$$\text{ERP} = \text{Biaya Dampak Kegagalan / Blast Radius} \times P(\text{Failure})$$

### 4. Risk-Adjusted ROI
$$\text{Risk-Adjusted ROI} = \frac{\text{EGV} - \text{ERP}}{\text{TCO}}$$

---

## 3. Threshold Gerbang Keputusan (Go / No-Go Criteria)

| Status Keputusan | Kriteria Ambang Batas | Aksi yang Dijalankan |
| :--- | :--- | :--- |
| **🟢 GO (Lolos)** | $\text{JEV} > 0$, $\text{ROI} \ge 2.5\times$ (250%), $P(\text{Success}) \ge 70\%$ untuk Type 1. | Langsung masuk sprint development aktif. |
| **🟡 CONDITIONAL (Spike)** | $\text{JEV} > 0$, $\text{ROI} \ge 1.8\times$, namun $P(\text{Success}) < 65\%$. | Diberi waktu maksimal 2 hari (*timeboxed spike*) untuk memvalidasi prototype sebelum komitmen penuh. |
| **🔴 NO-GO (Ditolak)** | $\text{JEV} \le 0$, $\text{ROI} < 1.8\times$, atau Risiko Keamanan `CRITICAL`. | Inisiatif dibatalkan atau ditunda (*shelved*). Pengalihan sumber daya ke inisiatif bernilai tinggi. |

---

## 4. Studi Kasus Nyata

### Kasus A: Client Maintenance SLA Portal (STATUS: 🟢 GO)
- **Problem:** Klien retainer sering menanyakan status update via WhatsApp secara sporadis.
- **Biaya Development:** Rp 25.000.000
- **OpEx Tahunan:** Rp 5.000.000 $\rightarrow$ **TCO: Rp 30.000.000**
- **Potensi Nilai (Gain):** Rp 120.000.000 (retensi klien naik) + Rp 30.000.000 (hemat waktu admin) = Rp 150.000.000
- **Probabilitas Sukses:** 85% ($P(\text{Fail}) = 15\%$)
- **Downside Risk:** Rp 10.000.000
- **Hasil Hitungan:**
  - $\text{EGV} = 150.000.000 \times 0.85 = \text{Rp } 127.500.000$
  - $\text{ERP} = 10.000.000 \times 0.15 = \text{Rp } 1.500.000$
  - $\text{JEV} = 127.500.000 - 1.500.000 - 30.000.000 = \mathbf{\text{Rp } 96.000.000}$
  - $\text{Risk-Adjusted ROI} = \mathbf{420\%}$ ($\ge 250\%$)
  - **Keputusan:** **🟢 GO**

---

### Kasus B: Autonomous AI Agent Tanpa Pengawasan Manusia (STATUS: 🔴 NO-GO)
- **Problem:** Tren bot AI yang menjanjikan eksekusi transaksi otomatis tanpa verifikasi staf.
- **Biaya Development:** Rp 35.000.000
- **OpEx Token LLM Tahunan:** Rp 20.000.000 $\rightarrow$ **TCO: Rp 55.000.000**
- **Potensi Nilai:** Rp 55.000.000
- **Probabilitas Sukses:** 40% (Tingkat halusinasi dan risiko hukum tinggi)
- **Downside Risk (Kehilangan Klien Enterprise):** Rp 80.000.000
- **Hasil Hitungan:**
  - $\text{EGV} = 55.000.000 \times 0.40 = \text{Rp } 22.000.000$
  - $\text{ERP} = 80.000.000 \times 0.60 = \text{Rp } 48.000.000$
  - $\text{JEV} = 22.000.000 - 48.000.000 - 55.000.000 = \mathbf{\text{Rp } -81.000.000}$
  - $\text{Risk-Adjusted ROI} = \mathbf{-47\%}$
  - **Keputusan:** **🔴 NO-GO (Ditolak Tegas)**

---

## 5. Cara Menjalankan JEV Decision CLI

Engine JEV telah diimplementasikan dalam kode di [`lib/decision/jev.ts`](file:///c:/Users/user/Desktop/company-profile/lib/decision/jev.ts).
Untuk menjalankan evaluasi terhadap proposal baru:

```bash
npx tsx scripts/jev-decision.ts
```
