import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { buttonClass } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/navigation/LanguageSwitcher";
import { MobileNav } from "@/components/navigation/MobileNav";
import { NavLinks } from "@/components/navigation/NavLinks";
import { localizedPath, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { primaryNav } from "@/lib/navigation";
import styles from "./SiteHeader.module.css";

/**
 * Server component. Only the interactive pieces (active link state, language
 * switcher, mobile drawer) are client islands.
 */
export function SiteHeader({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const items = primaryNav.map((item) => ({ ...item, label: t.nav[item.key] }));
  // Desktop: logo = Home and the Contact button is the CTA, so the bar stays short.
  const desktopItems = items.filter((item) => item.key !== "home" && item.key !== "contact");

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href={localizedPath(locale, "/")} className={styles.brand} aria-label={t.common.homeLabel}>
          <Logo />
        </Link>

        <nav aria-label={t.common.mainNav} className={styles.desktopNav}>
          <NavLinks locale={locale} items={desktopItems} className={styles.navList} linkClassName={styles.navLink} />
        </nav>

        <div className={styles.actions}>
          <LanguageSwitcher locale={locale} label={t.common.languageLabel} />
          <Link
            href={localizedPath(locale, "/contact")}
            className={buttonClass("primary", "md", styles.cta)}
          >
            {t.nav.contact}
          </Link>
          <div className={styles.mobileOnly}>
            <MobileNav
              locale={locale}
              items={items}
              labels={{
                menu: t.common.menu,
                open: t.common.openMenu,
                close: t.common.closeMenu,
                nav: t.common.mainNav,
                language: t.common.languageLabel,
                cta: t.nav.cta,
                home: t.common.homeLabel,
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
