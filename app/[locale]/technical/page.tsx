import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMessages } from "@/lib/i18n/messages";
import { isLocale, localizedPath, type Locale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import styles from "./TechnicalPage.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "technical", "/technical");
}

export default async function TechnicalPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;

  const t = getMessages(locale);
  const tech = t.technical;

  return (
    <>
      <PageHero
        locale={locale}
        crumb={{ name: t.meta.pages.technical.title, path: "/technical" }}
        eyebrow={tech.eyebrow}
        title={tech.title}
        description={tech.description}
      >
        <ButtonLink
          href={localizedPath(locale, "/contact")}
          variant="primary"
          size="md"
          arrow
        >
          {locale === "id" ? "Diskusikan Kebutuhan" : "Discuss Requirements"}
        </ButtonLink>
      </PageHero>

      <section className="section" aria-label={tech.title}>
        <div className="container">
          <div className={styles.grid}>
            {tech.sections.map((section, idx) => {
              const isLast = idx === tech.sections.length - 1 && tech.sections.length % 2 !== 0;
              return (
                <div
                  key={section.title}
                  className={`${styles.card} ${isLast ? styles.cardWide : ""}`}
                >
                  <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>{section.title}</h2>
                    <span className={styles.index} aria-hidden="true">
                      0{idx + 1}
                    </span>
                  </div>
                  <ul className={styles.list}>
                    {section.items.map((item) => (
                      <li key={item} className={styles.item}>
                        <span className={styles.bullet} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className={styles.contactBanner}>
            <div className={styles.bannerContent}>
              <h2 className={styles.bannerTitle}>
                {locale === "id"
                  ? "Punya program atau cara kerja yang sudah berjalan sebelumnya?"
                  : "Have an existing system or established workflow?"}
              </h2>
              <p className={styles.bannerText}>
                {locale === "id"
                  ? "Kami terbiasa menyambungkan sistem baru dengan pembukuan, nomor WhatsApp, atau alur kerja yang sudah Anda pakai tanpa perlu merombak semuanya dari nol."
                  : "We regularly integrate new solutions with your existing workflows, customer channels, or operational records without requiring a ground-up rewrite."}
              </p>
            </div>
            <div className={styles.bannerActions}>
              <ButtonLink
                href={localizedPath(locale, "/contact")}
                variant="primary"
                size="md"
                arrow
              >
                {locale === "id" ? "Hubungi Kami" : "Contact Us"}
              </ButtonLink>
              <ButtonLink
                href={localizedPath(locale, "/partnership")}
                variant="secondary"
                size="md"
              >
                {locale === "id" ? "Jajaki Kerja Sama" : "Explore Partnership"}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
