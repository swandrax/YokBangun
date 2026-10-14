"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { localizedPath, stripLocale, type Locale } from "@/lib/i18n/config";
import styles from "./AndroidAppBanner.module.css";

const SESSION_DISMISSED_KEY = "yokbangun_android_banner_dismissed";

type Props = {
  locale: Locale;
};

function subscribe(callback: () => void) {
  if (typeof window !== "undefined") {
    window.addEventListener("storage", callback);
    return () => window.removeEventListener("storage", callback);
  }
  return () => {};
}

function getAndroidSnapshot(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return false;
  }
  return /Android/i.test(navigator.userAgent);
}

function getServerSnapshot(): boolean {
  return false;
}

export function AndroidAppBanner({ locale }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [dismissed, setDismissed] = useState(false);

  const isAndroid = useSyncExternalStore(
    subscribe,
    getAndroidSnapshot,
    getServerSnapshot
  );

  // 1. Condition: User agent is Android
  if (!isAndroid) {
    return null;
  }

  // 2. Condition: Not already running inside native app WebView
  const sourceParam = searchParams?.get("source");
  const isInsideNativeApp =
    sourceParam === "android_app" ||
    sourceParam === "app" ||
    (typeof navigator !== "undefined" &&
      (navigator.userAgent.includes("yokBangunMobile") ||
        navigator.userAgent.includes("id.yokbangun.app")));

  if (isInsideNativeApp) {
    return null;
  }

  // 3. Condition: Not dismissed in session
  let sessionDismissed = false;
  try {
    sessionDismissed =
      typeof window !== "undefined" &&
      sessionStorage.getItem(SESSION_DISMISSED_KEY) === "1";
  } catch {
    // ignore
  }

  if (dismissed || sessionDismissed) {
    return null;
  }

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(SESSION_DISMISSED_KEY, "1");
    } catch {
      // ignore
    }
  };

  // Construct current path + query for deep link parity
  const basePath = stripLocale(pathname || "/");
  const canonicalPath =
    locale === "en" ? `/en${basePath === "/" ? "" : basePath}` : basePath;
  const queryString = searchParams?.toString()
    ? `?${searchParams.toString()}`
    : "";
  const currentPathAndQuery = `${canonicalPath}${queryString}`;

  // Intent deep link pattern for Android
  const fallbackUrl = encodeURIComponent(
    "https://yok-bangun.vercel.app/download"
  );
  const intentUrl = `intent://yok-bangun.vercel.app${currentPathAndQuery}#Intent;scheme=https;package=id.yokbangun.app;S.browser_fallback_url=${fallbackUrl};end`;

  const downloadPageUrl = localizedPath(locale, "/download");

  const titleText =
    locale === "id"
      ? "Lebih nyaman dengan aplikasi Native Android yokBangun"
      : "Get the full native experience with the yokBangun Android app";

  const subtitleText =
    locale === "id"
      ? "Jetpack Compose · Performa cepat & offline-ready"
      : "Jetpack Compose · Fast performance & offline-ready";

  const openInAppText = locale === "id" ? "Buka di Aplikasi" : "Open in App";
  const downloadApkText = locale === "id" ? "Unduh APK" : "Download APK";
  const closeAriaLabel =
    locale === "id" ? "Tutup pemberitahuan" : "Close banner";

  return (
    <aside
      className={styles.banner}
      role="complementary"
      aria-label="Android App Promotion"
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.iconWrap} aria-hidden="true">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="#1F5D45" />
              <path
                d="M9.6 9.6 16 18.4M22.4 9.6 13 24.6"
                fill="none"
                stroke="#fff"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              <circle cx="23.4" cy="23.2" r="2.6" fill="#E3936A" />
            </svg>
          </div>
          <div className={styles.textWrap}>
            <span className={styles.title}>{titleText}</span>
            <span className={styles.subtitle}>{subtitleText}</span>
          </div>
        </div>

        <div className={styles.actions}>
          <a
            href={intentUrl}
            className={styles.primaryBtn}
            id="btn-open-android-app"
          >
            {openInAppText}
          </a>
          <Link
            href={downloadPageUrl}
            className={styles.secondaryBtn}
            id="btn-download-apk-banner"
          >
            {downloadApkText}
          </Link>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={handleDismiss}
            aria-label={closeAriaLabel}
            title={closeAriaLabel}
          >
            ✕
          </button>
        </div>
      </div>
    </aside>
  );
}
