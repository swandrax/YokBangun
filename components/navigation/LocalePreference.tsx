"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { isLocale, localizedPath, stripLocale, type Locale } from "@/lib/i18n/config";
import { useLanguageStore } from "@/stores/language-store";

const SESSION_KEY = "yb-session-started";

/**
 * Synchronizes language preference across:
 * 1. URL search query `?lang=id|en` (Deep Link Parity)
 * 2. `localStorage.getItem("yokbangun_lang")`
 * 3. Persisted Zustand language store
 */
export function LocalePreference({ locale }: { locale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 1. Deep Link Query Parameter Synchronization (?lang=id|en)
    const langParam = searchParams?.get("lang")?.toLowerCase();
    if (langParam && isLocale(langParam)) {
      try {
        localStorage.setItem("yokbangun_lang", langParam);
      } catch {}
      useLanguageStore.getState().setLanguage(langParam);

      if (langParam !== locale) {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("lang"); // remove redundant lang param or keep it clean
        const newPath = localizedPath(langParam, stripLocale(pathname || "/"));
        const queryString = params.toString() ? `?${params.toString()}` : "";
        router.replace(`${newPath}${queryString}`);
        return;
      }
    }

    // 2. Initial Session Check: Restore visitor preference from localStorage
    let firstView = false;
    try {
      firstView = !sessionStorage.getItem(SESSION_KEY);
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      return;
    }
    if (!firstView) return;

    const apply = () => {
      let savedLang: string | null = null;
      try {
        savedLang = localStorage.getItem("yokbangun_lang");
      } catch {}

      const storeState = useLanguageStore.getState();
      const targetLang =
        savedLang && isLocale(savedLang)
          ? savedLang
          : storeState.hasChosen
          ? storeState.language
          : null;

      if (targetLang && targetLang !== locale) {
        const query = searchParams?.toString();
        const queryString = query ? `?${query}` : "";
        router.replace(
          `${localizedPath(targetLang, stripLocale(pathname || "/"))}${queryString}`
        );
      }
    };

    if (useLanguageStore.persist.hasHydrated()) {
      apply();
    } else {
      return useLanguageStore.persist.onFinishHydration(apply);
    }
  }, [locale, pathname, searchParams, router]);

  return null;
}
