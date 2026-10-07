"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { LanguageSwitcher } from "@/components/navigation/LanguageSwitcher";
import { MobileNav } from "@/components/navigation/MobileNav";
import { localizedPath, stripLocale, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { publicContact } from "@/lib/site";
import styles from "./SiteHeader.module.css";

export function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const currentPath = stripLocale(pathname || "/");
  const isHome = currentPath === "" || currentPath === "/";

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) return;

    const checkScroll = () => {
      const isPast = window.scrollY > 60;
      setScrolled((prev) => (prev !== isPast ? isPast : prev));
    };

    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, [isHome]);

  const isTransparent = isHome && !scrolled;
  const t = getMessages(locale);

  // Homepage focused navigation: Layanan, Sektor, Cara kerja
  const navItems = isHome
    ? [
        { key: "services", href: "#services", label: t.nav.services },
        { key: "sectors", href: "#sectors", label: t.nav.sectors },
        { key: "howWeWork", href: "#how-we-work", label: t.nav.howWeWork },
      ]
    : [
        { key: "services", href: localizedPath(locale, "/#services"), label: t.nav.services },
        { key: "sectors", href: localizedPath(locale, "/sectors"), label: t.nav.sectors },
        { key: "howWeWork", href: localizedPath(locale, "/#how-we-work"), label: t.nav.howWeWork },
      ];

  const fullDrawerItems = [
    { key: "home" as const, href: "/", label: t.nav.home },
    { key: "services" as const, href: isHome ? "#services" : localizedPath(locale, "/#services"), label: t.nav.services },
    { key: "sectors" as const, href: isHome ? "#sectors" : localizedPath(locale, "/sectors"), label: t.nav.sectors },
    { key: "howWeWork" as const, href: isHome ? "#how-we-work" : localizedPath(locale, "/#how-we-work"), label: t.nav.howWeWork },
    { key: "contact" as const, href: "/contact", label: t.nav.contact },
  ];

  return (
    <header className={`${styles.header} ${isTransparent ? styles.transparent : styles.solid}`}>
      <div className={`container ${styles.inner}`}>
        <Link
          href={localizedPath(locale, "/")}
          className={styles.brand}
          aria-label={t.common.homeLabel}
        >
          <Logo inverted={isTransparent} />
        </Link>

        <nav aria-label={t.common.mainNav} className={styles.desktopNav}>
          <ul role="list" className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.key}>
                <Link href={item.href} className={styles.navLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <LanguageSwitcher
            locale={locale}
            label={t.common.languageLabel}
            className={isTransparent ? styles.langTransparent : undefined}
          />

          <a
            href={`mailto:${publicContact.email || "nussaspacevibe@gmail.com"}?subject=${encodeURIComponent(
              locale === "id" ? "Diskusi Proyek yokBangun" : "Discuss Project yokBangun"
            )}`}
            className={styles.cta}
          >
            {t.nav.discussProject}
          </a>

          <div className={styles.mobileOnly}>
            <MobileNav
              locale={locale}
              items={fullDrawerItems}
              labels={{
                menu: t.common.menu,
                open: t.common.openMenu,
                close: t.common.closeMenu,
                nav: t.common.mainNav,
                language: t.common.languageLabel,
                cta: t.nav.discussProject,
                home: t.common.homeLabel,
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
