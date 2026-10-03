"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Logo } from "@/components/brand/Logo";
import { Icon } from "@/components/ui/Icon";
import { buttonClass } from "@/components/ui/Button";
import { localizedPath, type Locale } from "@/lib/i18n/config";
import type { NavItem } from "@/lib/navigation";
import { useUiStore } from "@/stores/ui-store";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { NavLinks } from "./NavLinks";
import styles from "./MobileNav.module.css";

type Props = {
  locale: Locale;
  items: (NavItem & { label: string })[];
  labels: { menu: string; open: string; close: string; nav: string; language: string; cta: string; home: string };
};

/**
 * Compact mobile drawer built on the native <dialog> element:
 * focus is trapped, the page behind is inert, Escape closes it, and focus
 * returns to the menu button. Open state lives in the UI store.
 */
export function MobileNav({ locale, items, labels }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const open = useUiStore((s) => s.mobileNavOpen);
  const openNav = useUiStore((s) => s.openMobileNav);
  const closeNav = useUiStore((s) => s.closeMobileNav);
  const pathname = usePathname();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // Close on navigation.
  useEffect(() => {
    closeNav();
  }, [pathname, closeNav]);

  return (
    <>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={openNav}
      >
        <Icon name="menu" size={22} />
        <span className="visually-hidden">{labels.open}</span>
      </button>

      <dialog
        ref={dialogRef}
        id="mobile-nav"
        className={styles.dialog}
        aria-label={labels.nav}
        onClose={() => {
          document.documentElement.style.overflow = "";
          closeNav();
        }}
        onClick={(event) => {
          // Click on the backdrop closes the drawer.
          if (event.target === event.currentTarget) closeNav();
        }}
      >
        <div className={styles.panel}>
          <div className={styles.top}>
            <Link href={localizedPath(locale, "/")} aria-label={labels.home} onClick={closeNav}>
              <Logo showTagline={false} />
            </Link>
            <button type="button" className={styles.close} onClick={closeNav}>
              <Icon name="close" size={22} />
              <span className="visually-hidden">{labels.close}</span>
            </button>
          </div>

          <nav aria-label={labels.nav}>
            <NavLinks
              locale={locale}
              items={items}
              className={styles.list}
              linkClassName={styles.link}
              onNavigate={closeNav}
            />
          </nav>

          <div className={styles.bottom}>
            <LanguageSwitcher locale={locale} label={labels.language} />
            <Link
              href={localizedPath(locale, "/contact")}
              className={buttonClass("primary", "lg", styles.cta)}
              onClick={closeNav}
            >
              {labels.cta}
            </Link>
          </div>
        </div>
      </dialog>
    </>
  );
}
