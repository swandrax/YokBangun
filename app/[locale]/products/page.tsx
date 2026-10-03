import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMessages } from "@/lib/i18n/messages";
import { isLocale, localizedPath, type Locale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { QueryProvider } from "@/lib/query/QueryProvider";
import { ProductList } from "@/features/products/ProductList";
import { listProducts, productStatuses } from "@/features/products/data";
import styles from "./ProductsPage.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "products", "/products");
}

export default async function ProductsPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;

  const t = getMessages(locale);
  const prod = t.products;
  const initialProducts = listProducts(locale);

  return (
    <>
      <PageHero
        locale={locale}
        crumb={{ name: t.nav.products, path: "/products" }}
        eyebrow={prod.eyebrow}
        title={prod.title}
        description={prod.description}
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

      {/* Status Legend Strip */}
      <section className="section section--tight section--surface" aria-labelledby="status-legend-title">
        <div className="container">
          <div className={styles.legendBox}>
            <h2 id="status-legend-title" className={styles.legendTitle}>
              {prod.legendTitle}
            </h2>
            <div className={styles.legendGrid}>
              {productStatuses.map((st) => (
                <div key={st} className={styles.legendItem}>
                  <div className={styles.legendHead}>
                    <span className={styles.legendDot} data-status={st} aria-hidden="true" />
                    <span className={styles.legendBadge}>{t.status[st].label}</span>
                  </div>
                  <p className={styles.legendDesc}>{t.status[st].description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product List with Filter Tabs */}
      <section className="section" aria-label={prod.title}>
        <div className="container">
          <QueryProvider>
            <ProductList
              locale={locale}
              initialData={initialProducts}
              copy={prod}
              statusCopy={t.status}
              contactCtaText={t.nav.cta}
            />
          </QueryProvider>
        </div>
      </section>
    </>
  );
}
