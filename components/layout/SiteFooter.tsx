import { Logo } from "@/components/brand/Logo";
import { type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { brand } from "@/lib/site";
import styles from "./SiteFooter.module.css";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <Logo showTagline={false} />
        </div>
        <div className={styles.meta}>
          <p className={styles.copyright}>
            © {year} {brand.full}. {t.footer.rights}
          </p>
          <span className={styles.divider} aria-hidden="true">
            ·
          </span>
          <p className={styles.madeIn}>{t.footer.madeIn}</p>
        </div>
      </div>
    </footer>
  );
}
