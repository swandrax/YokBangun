import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getMessages } from "@/lib/i18n/messages";
import { isLocale, localizedPath, type Locale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import styles from "./AboutPage.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "about", "/about");
}

export default async function AboutPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;

  const t = getMessages(locale);
  const ab = t.about;

  return (
    <>
      <PageHero
        locale={locale}
        crumb={{ name: t.nav.about, path: "/about" }}
        eyebrow={ab.eyebrow}
        title={ab.title}
        description={ab.intro}
      >
        <ButtonLink
          href={localizedPath(locale, "/contact")}
          variant="primary"
          size="md"
          arrow
        >
          {ab.cta}
        </ButtonLink>
      </PageHero>

      {/* Editorial Neighbourhood Illustration */}
      <section className={styles.illustrationSection} aria-label={ab.illustrationAlt}>
        <div className="container">
          <div className={styles.imageWrap}>
            <Image
              src="/about/neighbourhood.jpg"
              alt={ab.illustrationAlt}
              width={1200}
              height={800}
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
              className={styles.image}
            />
          </div>
        </div>
      </section>

      {/* Vision & Meaning of "growth with u" */}
      <section className="section" aria-labelledby="vision-title">
        <div className="container">
          <div className={styles.visionGrid}>
            <div className={styles.visionCard}>
              <span className="eyebrow">{ab.visionTitle}</span>
              <h2 id="vision-title" className={styles.visionText}>
                “{ab.vision}”
              </h2>
            </div>

            <div className={styles.meaningCard}>
              <h3 className={styles.meaningTitle}>{ab.meaningTitle}</h3>
              <div className={styles.meaningText}>
                {ab.meaning.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Purposes */}
      <section className="section section--surface" aria-labelledby="purpose-title">
        <div className="container">
          <SectionHeader
            id="purpose-title"
            title={ab.purposeTitle}
          />
          <div className={styles.purposeGrid}>
            {ab.purposes.map((p, idx) => (
              <div key={p.title} className={styles.purposeCard}>
                <span className={styles.purposeIdx} aria-hidden="true">
                  0{idx + 1}
                </span>
                <h3 className={styles.purposeHead}>{p.title}</h3>
                <p className={styles.purposeDesc}>{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="section" aria-labelledby="audience-title">
        <div className="container">
          <div className={styles.audienceBox}>
            <h2 id="audience-title" className={styles.audienceTitle}>
              {ab.audienceTitle}
            </h2>
            <p className={styles.audienceText}>{ab.audience}</p>
            <div>
              <ButtonLink
                href={localizedPath(locale, "/contact")}
                variant="primary"
                size="lg"
                arrow
              >
                {ab.cta}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
