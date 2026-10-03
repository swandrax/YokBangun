import { notFound } from "next/navigation";
import { getMessages } from "@/lib/i18n/messages";
import { isLocale, localizedPath, type Locale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { QueryProvider } from "@/lib/query/QueryProvider";
import { CaseStudyList } from "@/features/portfolio/CaseStudyList";
import { listCaseStudies } from "@/features/portfolio/data";
import styles from "./WorkPage.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "work", "/work");
}

export default async function WorkPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;

  const t = getMessages(locale);
  const w = t.work;
  const initialStudies = listCaseStudies(locale);

  return (
    <>
      <PageHero
        locale={locale}
        crumb={{ name: t.nav.work, path: "/work" }}
        eyebrow={w.eyebrow}
        title={w.title}
        description={w.description}
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

      {/* Illustrative Note Strip */}
      <section className="section section--tight section--surface" aria-label="Catatan keterbukaan">
        <div className="container">
          <div className={styles.noticeCard}>
            <span className={styles.noticeTag}>Keterbukaan</span>
            <p className={styles.noticeText}>{w.illustrativeNote}</p>
          </div>
        </div>
      </section>

      {/* Case Studies Explorer */}
      <section className="section" aria-label={w.title}>
        <div className="container">
          <QueryProvider>
            <CaseStudyList
              locale={locale}
              initialData={initialStudies}
              copy={w}
              statusCopy={t.status}
            />
          </QueryProvider>
        </div>
      </section>
    </>
  );
}
