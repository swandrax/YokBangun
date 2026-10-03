"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { localizedPath, stripLocale, type Locale } from "@/lib/i18n/config";
import { useLanguageStore } from "@/stores/language-store";

const SESSION_KEY = "yb-session-started";

/**
 * Applies a returning visitor's saved language once per browser session.
 * Only after an explicit choice (hasChosen). Crawlers and first-time visitors
 * are never redirected, and the URL stays the source of truth afterwards.
 */
export function LocalePreference({ locale }: { locale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let firstView = false;
    try {
      firstView = !sessionStorage.getItem(SESSION_KEY);
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      return;
    }
    if (!firstView) return;

    const apply = () => {
      const { language, hasChosen } = useLanguageStore.getState();
      if (hasChosen && language !== locale) {
        router.replace(localizedPath(language, stripLocale(pathname || "/")));
      }
    };

    if (useLanguageStore.persist.hasHydrated()) apply();
    else return useLanguageStore.persist.onFinishHydration(apply);
    // Run once per mount: later navigations are driven by the URL.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
