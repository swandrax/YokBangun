import type { Metadata } from "next";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import Link from "next/link";
import { isLocale, localizedPath, type Locale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/sections/PageHero";
import styles from "./DownloadPage.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "download", "/download");
}

export default async function DownloadPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;

  // Check if actual APK has been uploaded to public/download/yokbangun.apk
  const apkPath = path.join(process.cwd(), "public", "download", "yokbangun.apk");
  let apkExists = false;
  let apkSize = "18.4 MB";
  try {
    const stat = fs.statSync(apkPath);
    apkExists = stat.size > 1024 * 50; // true if file is larger than 50KB stub
    if (stat.size > 0) {
      apkSize = `${(stat.size / (1024 * 1024)).toFixed(1)} MB`;
    }
  } catch {
    apkExists = false;
  }

  const isId = locale === "id";

  const copy = {
    eyebrow: isId ? "Aplikasi Android Resmi" : "Official Android App",
    heroTitle: isId ? "Aplikasi Native yokBangun" : "yokBangun Native App",
    heroSubtitle: isId
      ? "Lebih nyaman, cepat, dan responsif dengan Jetpack Compose, offline-ready caching, serta deep link parity."
      : "Smoother, faster, and responsive with Jetpack Compose, offline-ready caching, and full deep link parity.",
    downloadBadgePlaceholder: isId
      ? "Versi Pratinjau · Segera Hadir di Google Play Store"
      : "Preview Release · Coming Soon on Google Play Store",
    downloadBadgeReady: isId
      ? "APK Siap Diunduh · Versi 1.0.0"
      : "APK Ready for Download · Version 1.0.0",
    downloadBtnText: isId ? "Unduh yokbangun.apk" : "Download yokbangun.apk",
    metaVersion: isId ? "Versi 1.0.0 (Build 100)" : "Version 1.0.0 (Build 100)",
    metaOs: isId ? "Android 8.0+ (Oreo atau lebih baru)" : "Android 8.0+ (Oreo or later)",
    metaSize: apkSize,
    featuresTitle: isId ? "Fitur Utama Aplikasi Native" : "Key Native App Features",
    features: [
      {
        icon: "⚡",
        title: isId ? "Jetpack Compose Native UI" : "Jetpack Compose Native UI",
        desc: isId
          ? "Pengalaman visual 120 FPS tanpa hambatan, animasi transisi halus, dan tata letak Material 3 yang dirancang khusus untuk kenyamanan genggaman."
          : "Fluid 120 FPS visual experience, silky micro-animations, and ergonomic Material 3 layouts tailored for mobile viewports.",
      },
      {
        icon: "📶",
        title: isId ? "Offline-Ready Caching" : "Offline-Ready Caching",
        desc: isId
          ? "Tetap dapat membaca ringkasan produk, katalog solusi, dan studi kasus saat berada di area jaringan minim atau saat mode pesawat aktif."
          : "Keep exploring product overviews, sector solutions, and case studies even in low-signal areas or airplane mode.",
      },
      {
        icon: "🔗",
        title: isId ? "Deep Link Parity Lengkap" : "Complete Deep Link Parity",
        desc: isId
          ? "Tautan produk (/?status=concept), filter karya (/work?sector=umkm), dan konsultasi (/contact) terbuka langsung pada state yang persis di aplikasi."
          : "Product status links (/?status=concept), work filters (/work?sector=umkm), and contact forms open directly to the exact state inside the app.",
      },
      {
        icon: "🌐",
        title: isId ? "Bilingual Penuh (ID / EN)" : "Full Bilingual Support (ID / EN)",
        desc: isId
          ? "Beralih antara Bahasa Indonesia dan English secara instan dengan sinkronisasi preferensi lokal tanpa perlu memuat ulang aplikasi."
          : "Toggle between Indonesian and English instantly with localized preference synchronization without restarting the application.",
      },
    ],
    stepsTitle: isId ? "Cara Pasang APK di Android" : "How to Install APK on Android",
    stepsDesc: isId
      ? "Ikuti 4 langkah mudah berikut untuk menginstal aplikasi yokBangun secara langsung di perangkat Anda:"
      : "Follow these 4 simple steps to install the yokBangun app directly onto your Android device:",
    steps: [
      {
        num: "1",
        title: isId ? "Unduh File APK" : "Download the APK",
        desc: isId
          ? "Ketuk tombol 'Unduh yokbangun.apk' di atas. Konfirmasi unduhan jika browser meminta persetujuan."
          : "Tap the 'Download yokbangun.apk' button above. Confirm the download if prompted by your browser.",
      },
      {
        num: "2",
        title: isId ? "Buka Notifikasi Unduhan" : "Open Download Notification",
        desc: isId
          ? "Tarik bilah notifikasi ponsel Anda ke bawah dan ketuk file 'yokbangun.apk' yang baru saja selesai diunduh."
          : "Pull down your notification shade and tap the completed 'yokbangun.apk' file notification.",
      },
      {
        num: "3",
        title: isId ? "Izinkan Sumber Tidak Dikenal" : "Allow Unknown Sources",
        desc: isId
          ? "Jika muncul peringatan keamanan, buka Setelan lalu centang opsi 'Izinkan dari sumber ini' (Install from unknown apps)."
          : "If a security prompt appears, open Settings and toggle 'Allow from this source' for your browser or file manager.",
      },
      {
        num: "4",
        title: isId ? "Pasang & Nikmati" : "Install & Enjoy",
        desc: isId
          ? "Pilih 'Instal' pada jendela instalasi. Setelah selesai, buka aplikasi yokBangun dan jelajahi solusi kami."
          : "Tap 'Install' on the installer prompt. Once complete, open yokBangun and enjoy the native experience.",
      },
    ],
    specTitle: isId ? "Informasi Teknis Paket Aplikasi" : "Technical Package Specifications",
    specs: [
      { label: isId ? "Nama Paket (Package Name)" : "Package Name", value: "id.yokbangun.app" },
      { label: isId ? "Versi Rilis" : "Release Version", value: "1.0.0 (Production Release)" },
      { label: isId ? "Target SDK" : "Target SDK", value: "Android 15 (API Level 35)" },
      { label: isId ? "Minimum SDK" : "Minimum SDK", value: "Android 8.0 (API Level 26 - Oreo)" },
      {
        label: isId ? "Fingerprint Sertifikat SHA-256" : "SHA-256 Certificate Fingerprint",
        value: "9C:3D:07:58:29:B2:00:4B:BA:1B:64:98:9D:3A:53:09:41:FE:00:AE:1C:1D:14:75:63:2D:AE:36:11:DD:DC:04",
      },
      {
        label: isId ? "Dukungan App Links" : "App Links Support",
        value: "https://yok-bangun.vercel.app/* (Verified via /.well-known/assetlinks.json)",
      },
    ],
  };

  return (
    <>
      <PageHero
        locale={locale}
        crumb={{ name: copy.heroTitle, path: "/download" }}
        eyebrow={copy.eyebrow}
        title={copy.heroTitle}
        description={copy.heroSubtitle}
      />

      <section className="section" aria-label="Download yokBangun APK">
        <div className="container" style={{ maxWidth: 760 }}>
          <div className={styles.downloadCard}>
            <span
              className={apkExists ? styles.badgeReady : styles.badgePlaceholder}
              id="apk-status-badge"
            >
              <span className={styles.eyebrowDot} aria-hidden="true" />
              {apkExists ? copy.downloadBadgeReady : copy.downloadBadgePlaceholder}
            </span>

            <a
              href="/download/yokbangun.apk"
              download="yokbangun.apk"
              className={styles.downloadBtn}
              id="btn-primary-download-apk"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>{copy.downloadBtnText}</span>
            </a>

            <div className={styles.downloadMeta}>
              <span className={styles.metaItem}>📦 {copy.metaVersion}</span>
              <span className={styles.metaItem}>📱 {copy.metaOs}</span>
              <span className={styles.metaItem}>💾 {copy.metaSize}</span>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: 16 }}>
            <Link
              href={localizedPath(locale, "/contact")}
              className="text-sm font-semibold text-emerald-800 hover:underline"
            >
              {isId ? "Butuh bantuan teknis seputar aplikasi? Hubungi kami →" : "Need technical assistance with the app? Contact us →"}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section section--surface" aria-labelledby="features-title">
        <div className="container">
          <h2 id="features-title" className="text-center font-bold text-2xl text-neutral-900 mb-8" style={{ fontFamily: "var(--font-headings)" }}>
            {copy.featuresTitle}
          </h2>
          <div className={styles.featuresGrid}>
            {copy.features.map((feat) => (
              <article key={feat.title} className={styles.featureCard}>
                <div className={styles.featureIcon} aria-hidden="true">
                  {feat.icon}
                </div>
                <h3 className={styles.featureTitle}>{feat.title}</h3>
                <p className={styles.featureDesc}>{feat.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Step by Step Installation Instructions */}
      <section className={styles.stepsSection} aria-labelledby="steps-title">
        <div className="container">
          <div className={styles.stepsHeader}>
            <h2 id="steps-title" className="text-2xl font-bold text-neutral-900 mb-3" style={{ fontFamily: "var(--font-headings)" }}>
              {copy.stepsTitle}
            </h2>
            <p className="text-neutral-600 text-sm md:text-base">
              {copy.stepsDesc}
            </p>
          </div>

          <div className={styles.stepsGrid}>
            {copy.steps.map((st) => (
              <div key={st.num} className={styles.stepCard}>
                <span className={styles.stepNumber} aria-hidden="true">{st.num}</span>
                <h3 className={styles.stepTitle}>{st.title}</h3>
                <p className={styles.stepDesc}>{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Package Details */}
      <section className={styles.specSection} aria-labelledby="spec-title">
        <div className="container">
          <h2 id="spec-title" className="text-center font-bold text-xl text-neutral-900 mb-6" style={{ fontFamily: "var(--font-headings)" }}>
            {copy.specTitle}
          </h2>
          <div className={styles.specCard}>
            <table className={styles.specTable}>
              <tbody>
                {copy.specs.map((sp) => (
                  <tr key={sp.label}>
                    <td className={styles.specLabel}>{sp.label}</td>
                    <td className={styles.specValue}>{sp.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
