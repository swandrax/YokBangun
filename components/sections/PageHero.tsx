import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n/config";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import styles from "./PageHero.module.css";

type Props = {
  locale: Locale;
  crumb: { name: string; path: string };
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

/** Inner-page header. Plain typography; no animation on the LCP text. */
export function PageHero({ locale, crumb, eyebrow, title, description, children }: Props) {
  return (
    <section className={styles.hero} aria-labelledby="page-title">
      <div className="container">
        <Breadcrumbs locale={locale} trail={[crumb]} />
        <p className="eyebrow">{eyebrow}</p>
        <h1 id="page-title" className={styles.title}>
          {title}
        </h1>
        <p className={styles.description}>{description}</p>
        {children && <div className={styles.actions}>{children}</div>}
      </div>
    </section>
  );
}
