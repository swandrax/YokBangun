import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMessages } from "@/lib/i18n/messages";
import { isLocale, localizedPath, type Locale } from "@/lib/i18n/config";
import { alternatesFor } from "@/lib/seo/metadata";
import {
  organizationSchema,
  websiteSchema,
  servicesSchema,
} from "@/lib/seo/schema";
import { JsonLd } from "@/lib/seo/JsonLd";
import { HeroVideo } from "@/components/HeroVideo";
import { VisionMissionSlider } from "@/components/sections/VisionMissionSlider";
import { PartnershipSlider } from "@/components/sections/PartnershipSlider";
import { publicContact } from "@/lib/site";
import styles from "./HomePage.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const t = getMessages(rawLocale);
  return {
    title: t.meta.siteTitle,
    description: t.meta.siteDescription,
    alternates: alternatesFor(rawLocale, "/"),
  };
}

export default async function HomePage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;

  const t = getMessages(locale);
  const landing = t.landing;
  const mailAddress = publicContact.email || "nussaspacevibe@gmail.com";

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(locale),
          websiteSchema(locale),
          ...servicesSchema(locale),
        ]}
      />

      {/* 1. HERO (100vh) WITH VIDEO BACKGROUND */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <HeroVideo />

        <div className={`container ${styles.heroContent}`}>
          <h1 id="hero-title" className={styles.heroTitle}>
            {landing.hero.title}
          </h1>
          <p className={styles.heroSub}>{landing.hero.description}</p>
          <div className={styles.heroActions}>
            <a
              href={`mailto:${mailAddress}?subject=${encodeURIComponent(
                locale === "id" ? "Diskusi Proyek yokBangun" : "Discuss Project yokBangun"
              )}`}
              className={styles.primaryPillBtn}
            >
              {landing.hero.primaryCta}
            </a>
            <a href="#services" className={styles.secondaryPillBtn}>
              {landing.hero.secondaryCta}
            </a>
          </div>
        </div>
      </section>

      {/* 2. VISI, MISI & GOALS ANIMATED SLIDER */}
      <VisionMissionSlider copy={landing.visionMission} />

      {/* 3. LAYANAN (4 BARIS, 2 KOLOM) */}
      <section
        id="services"
        className={styles.section}
        aria-labelledby="services-title"
      >
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>{landing.services.eyebrow}</span>
            <h2 id="services-title" className={styles.sectionTitle}>
              {landing.services.title}
            </h2>
          </div>

          <div className={styles.servicesTable}>
            {landing.services.items.map((item) => (
              <div key={item.title} className={styles.serviceRow}>
                <div className={styles.serviceColLeft}>
                  <h3 className={styles.serviceTitle}>{item.title}</h3>
                </div>
                <div className={styles.serviceColRight}>
                  <p className={styles.serviceDesc}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SEKTOR (HEADING + KALIMAT + CHIP PILLS) */}
      <section
        id="sectors"
        className={styles.section}
        aria-labelledby="sectors-title"
      >
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>{landing.sectors.eyebrow}</span>
            <h2 id="sectors-title" className={styles.sectionTitle}>
              {landing.sectors.title}
            </h2>
            <p className={styles.sectionDesc}>{landing.sectors.description}</p>
          </div>

          <div className={styles.chipGrid} role="list" aria-label={landing.sectors.title}>
            {landing.sectors.chips.map((chip) => (
              <span key={chip} role="listitem" className={styles.chip}>
                {chip}
              </span>
            ))}
          </div>

          <div className={styles.sectorLinkWrapper}>
            <Link
              href={localizedPath(locale, "/sectors")}
              className={styles.sectorLink}
            >
              <span>{landing.sectors.cta}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. CARA KERJA (4 LANGKAH: PAHAMI, BANGUN, RAWAT, TUMBUH) */}
      <section
        id="how-we-work"
        className={styles.section}
        aria-labelledby="how-we-work-title"
      >
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>{landing.howWeWork.eyebrow}</span>
            <h2 id="how-we-work-title" className={styles.sectionTitle}>
              {landing.howWeWork.title}
            </h2>
          </div>

          <div className={styles.stepsGrid}>
            {landing.howWeWork.steps.map((step) => (
              <div key={step.key} className={styles.stepCard}>
                <span className={styles.stepNum}>{step.number}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MARKETING & PARTNERSHIPS SLIDER */}
      <PartnershipSlider
        copy={{
          ...landing.partnershipSlider,
          items: t.partnership.types.map((pt) => ({
            key: pt.key,
            title: pt.title,
            description: pt.description,
          })),
        }}
        email={mailAddress}
      />

      {/* 6. CTA PENUTUP */}
      <section
        id="contact"
        className={`${styles.section} ${styles.ctaSection}`}
        aria-labelledby="cta-title"
      >
        <div className="container">
          <div className={styles.ctaCard}>
            <h2 id="cta-title" className={styles.ctaTitle}>
              {landing.cta.title}
            </h2>
            <p className={styles.ctaDesc}>{landing.cta.description}</p>
            <div className={styles.ctaActions}>
              <a
                href={`mailto:${mailAddress}?subject=${encodeURIComponent(
                  locale === "id" ? "Diskusi Proyek yokBangun" : "Discuss Project yokBangun"
                )}`}
                className={styles.primaryPillBtn}
              >
                {landing.cta.button}
              </a>
              <a
                href={`mailto:${mailAddress}`}
                className={styles.mailtoBtn}
              >
                {landing.cta.mailtoText} ({mailAddress})
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
