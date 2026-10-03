"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { localizedPath, locales, stripLocale, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils/cn";
import { useLanguageStore } from "@/stores/language-store";
import styles from "./LanguageSwitcher.module.css";

const languageNames: Record<Locale, string> = { id: "Bahasa Indonesia", en: "English" };

/**
 * Compact [ ID | EN ] control with a sliding indicator.
 * Real links (work without JS, crawlable, hreflang). Clicking also records
 * the visitor's explicit preference in the persisted Zustand store.
 */
export function LanguageSwitcher({ locale, label, className }: { locale: Locale; label: string; className?: string }) {
  const pathname = usePathname();
  const basePath = stripLocale(pathname || "/");
  const setLanguage = useLanguageStore((s) => s.setLanguage);
  const [target, setTarget] = useState<Locale>(locale);
  const position = target === locale ? locale : target;

  return (
    <div role="group" aria-label={label} className={cn(styles.switch, className)} data-active={position}>
      <span className={styles.indicator} aria-hidden="true" />
      {locales.map((l) => (
        <Link
          key={l}
          href={localizedPath(l, basePath)}
          hrefLang={l}
          lang={l}
          prefetch={false}
          scroll={false}
          aria-current={l === locale ? "true" : undefined}
          className={cn(styles.option, l === position && styles.selected)}
          onClick={() => {
            setTarget(l);
            setLanguage(l);
          }}
        >
          {l.toUpperCase()}
          <span className="visually-hidden"> – {languageNames[l]}</span>
        </Link>
      ))}
    </div>
  );
}
