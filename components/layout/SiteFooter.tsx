import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { localizedPath, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { brand, publicContact } from "@/lib/site";
import styles from "./SiteFooter.module.css";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getMessages(locale);
  const href = (path: string) => localizedPath(locale, path);
  const year = new Date().getFullYear();

  const serviceLinks = [
    { label: t.whatWeBuild.categories[0]?.title, path: "/services#digital-products" },
    { label: t.nav.aiServices, path: "/ai-services" },
    { label: t.whatWeBuild.categories[2]?.title, path: "/services#maintenance" },
    { label: t.whatWeBuild.categories[3]?.title, path: "/services#integration" },
    { label: t.nav.sectors, path: "/sectors" },
  ];

  const companyLinks = [
    { label: t.nav.home, path: "/" },
    { label: t.nav.products, path: "/products" },
    { label: t.nav.work, path: "/work" },
    { label: t.nav.partnership, path: "/partnership" },
    { label: t.nav.about, path: "/about" },
    { label: t.nav.technical, path: "/technical" },
  ];

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brandCol}>
          <Logo />
          <p className={styles.description}>{t.footer.description}</p>
        </div>

        <nav aria-labelledby="footer-services" className={styles.col}>
          <h2 id="footer-services" className={styles.heading}>
            {t.footer.servicesTitle}
          </h2>
          <ul role="list" className={styles.list}>
            {serviceLinks.map((link) => (
              <li key={link.path}>
                <Link href={href(link.path)}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-company" className={styles.col}>
          <h2 id="footer-company" className={styles.heading}>
            {t.footer.companyTitle}
          </h2>
          <ul role="list" className={styles.list}>
            {companyLinks.map((link) => (
              <li key={link.path}>
                <Link href={href(link.path)}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.col}>
          <h2 className={styles.heading}>{t.footer.contactTitle}</h2>
          <p className={styles.small}>{t.footer.contactText}</p>
          <ul role="list" className={styles.list}>
            <li>
              <Link href={href("/contact")}>{t.nav.cta}</Link>
            </li>
            <li>
              <a href="/feed.xml" target="_blank" rel="noopener noreferrer">
                RSS Feed
              </a>
            </li>
            {publicContact.email && (
              <li>
                <a href={`mailto:${publicContact.email}`}>{publicContact.email}</a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>
          © {year} {brand.full}. {t.footer.rights}
        </p>
        <p>{t.footer.madeIn}</p>
      </div>
    </footer>
  );
}
