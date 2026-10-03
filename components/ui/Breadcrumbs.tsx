import Link from "next/link";
import { localizedPath, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/lib/seo/JsonLd";
import { Icon } from "./Icon";
import styles from "./Breadcrumbs.module.css";

type Props = { locale: Locale; trail: { name: string; path: string }[] };

export function Breadcrumbs({ locale, trail }: Props) {
  const t = getMessages(locale).common;
  const items = [{ name: t.breadcrumbHome, path: "/" }, ...trail];
  return (
    <>
      <nav aria-label={t.breadcrumbLabel} className={styles.nav}>
        <ol role="list" className={styles.list}>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.path} className={styles.item}>
                {isLast ? (
                  <span aria-current="page">{item.name}</span>
                ) : (
                  <>
                    <Link href={localizedPath(locale, item.path)}>{item.name}</Link>
                    <Icon name="chevronRight" size={14} className={styles.sep} />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(locale, trail)} />
    </>
  );
}
