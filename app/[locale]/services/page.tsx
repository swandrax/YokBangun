import { notFound } from "next/navigation";
import { getMessages } from "@/lib/i18n/messages";
import { isLocale, localizedPath, type Locale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo/metadata";
import { servicesSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/lib/seo/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import styles from "./ServicesPage.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "services", "/services");
}

export default async function ServicesPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;

  const t = getMessages(locale);
  const sp = t.servicesPage;
  const build = t.whatWeBuild;

  return (
    <>
      <JsonLd data={servicesSchema(locale)} />

      <PageHero
        locale={locale}
        crumb={{ name: t.nav.services, path: "/services" }}
        eyebrow={sp.eyebrow}
        title={sp.title}
        description={sp.description}
      >
        <ButtonLink
          href={localizedPath(locale, "/contact")}
          variant="primary"
          size="md"
          arrow
        >
          {t.nav.cta}
        </ButtonLink>
      </PageHero>

      {/* Scope guidance */}
      <section className="section section--tight section--surface" aria-labelledby="scope-title">
        <div className="container">
          <div className={styles.scopeBox}>
            <h2 id="scope-title" className={styles.scopeTitle}>
              {sp.scopeTitle}
            </h2>
            <div className={styles.scopeGrid}>
              {sp.scope.map((item, idx) => (
                <div key={item} className={styles.scopeItem}>
                  <span className={styles.scopeNum} aria-hidden="true">
                    0{idx + 1}
                  </span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4 Service Categories in Detail */}
      <section className="section" aria-label={t.nav.services}>
        <div className="container">
          <div className={styles.categoriesList}>
            {build.categories.map((cat, idx) => (
              <article key={cat.key} id={cat.key} className={styles.categoryCard}>
                <div className={styles.categoryHead}>
                  <div className={styles.catNum}>0{idx + 1}</div>
                  <div>
                    <h2 className={styles.categoryTitle}>{cat.title}</h2>
                    <p className={styles.categoryDesc}>{cat.description}</p>
                  </div>
                </div>

                <div className={styles.categoryItems}>
                  <h3 className={styles.itemsLabel}>
                    {locale === "id" ? "Kemampuan yang disediakan" : "Capabilities included"}
                  </h3>
                  <ul role="list" className={styles.itemsGrid}>
                    {cat.items.map((item) => (
                      <li key={item} className={styles.itemRow}>
                        <span className={styles.itemDot} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
