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
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RevealGroup, RevealItem } from "@/components/animation/Reveal";
import { EcosystemGraphic } from "@/components/graphics/EcosystemGraphic";
import { StoryRail } from "@/components/animation/StoryRail";
import { ProcessSteps } from "@/components/graphics/ProcessSteps";
import { SectorShowcase } from "@/components/sections/SectorShowcase";
import { QueryProvider } from "@/lib/query/QueryProvider";
import { CaseStudyList } from "@/features/portfolio/CaseStudyList";
import { listCaseStudies } from "@/features/portfolio/data";
import { ContactForm } from "@/features/contact/ContactForm";
import styles from "./HomePage.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
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
  const initialCaseStudies = listCaseStudies(locale).slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          organizationSchema(locale),
          websiteSchema(locale),
          ...servicesSchema(locale),
        ]}
      />

      {/* 02. HERO SECTION */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroContent}>
            <p className="eyebrow">{t.hero.eyebrow}</p>
            <h1 id="hero-title" className={styles.heroTitle}>
              {t.hero.titleLead}{" "}
              <span className={styles.heroAccent}>{t.hero.titleAccent}</span>
            </h1>
            <p className={styles.heroDesc}>{t.hero.description}</p>
            <div className={styles.heroActions}>
              <ButtonLink
                href={localizedPath(locale, "/contact")}
                variant="primary"
                size="lg"
                arrow
              >
                {t.hero.primaryCta}
              </ButtonLink>
              <ButtonLink
                href={localizedPath(locale, "/services")}
                variant="secondary"
                size="lg"
              >
                {t.hero.secondaryCta}
              </ButtonLink>
            </div>
          </div>

          <div className={styles.heroGraphicWrap}>
            <EcosystemGraphic labels={t.hero.graphic} />
          </div>
        </div>
      </section>

      {/* 03. BUSINESS TRUST / SHORT POSITIONING STRIP */}
      <section className={styles.strip} aria-label={t.positioning.label}>
        <div className={`container ${styles.stripGrid}`}>
          {t.positioning.items.map((item) => (
            <div key={item} className={styles.stripItem}>
              <span className={styles.stripDot} aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 04. WHAT WE BUILD */}
      <section
        id="services"
        className="section"
        aria-labelledby="what-we-build-title"
      >
        <div className="container">
          <SectionHeader
            id="what-we-build-title"
            eyebrow={t.whatWeBuild.eyebrow}
            title={t.whatWeBuild.title}
            description={t.whatWeBuild.description}
            align="split"
          />

          <RevealGroup className={styles.categoriesGrid}>
            {t.whatWeBuild.categories.map((cat) => (
              <RevealItem
                key={cat.key}
                as="article"
                className={styles.categoryCard}
              >
                <div className={styles.categoryHead}>
                  <h3 className={styles.categoryTitle}>{cat.title}</h3>
                  <p className={styles.categoryDesc}>{cat.description}</p>
                </div>
                <ul role="list" className={styles.categoryList}>
                  {cat.items.map((item) => (
                    <li key={item} className={styles.categoryItem}>
                      <span className={styles.categoryDot} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 05. AI SERVICES */}
      <section
        id="ai-services"
        className="section section--surface"
        aria-labelledby="ai-title"
      >
        <div className="container">
          <SectionHeader
            id="ai-title"
            eyebrow={t.ai.eyebrow}
            title={t.ai.title}
            description={t.ai.description}
            align="split"
          />

          <div className={styles.aiGrid}>
            <div>
              <h3 className="visually-hidden">{t.ai.useCasesTitle}</h3>
              <RevealGroup className={styles.useCasesGrid}>
                {t.ai.useCases.map((uc) => (
                  <RevealItem key={uc.title} className={styles.useCaseCard}>
                    <h4 className={styles.useCaseTitle}>{uc.title}</h4>
                    <p className={styles.useCaseDesc}>{uc.description}</p>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>

            <div className={styles.principlesCard}>
              <h3 className={styles.principlesTitle}>{t.ai.principlesTitle}</h3>
              <div className={styles.principlesList}>
                {t.ai.principles.map((pr) => (
                  <div key={pr.title} className={styles.principleItem}>
                    <h4 className={styles.principleTitle}>{pr.title}</h4>
                    <p className={styles.principleDesc}>{pr.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06. PRODUCT & MAINTENANCE SERVICES */}
      <section
        id="maintenance"
        className="section"
        aria-labelledby="maintenance-title"
      >
        <div className="container">
          <SectionHeader
            id="maintenance-title"
            eyebrow={t.maintenance.eyebrow}
            title={t.maintenance.title}
            description={t.maintenance.description}
            align="split"
          />

          <div className={styles.maintenanceGrid}>
            <div>
              <StoryRail
                steps={t.maintenance.steps}
                label={t.maintenance.stepsLabel}
              />
            </div>

            <div className={styles.maintenanceIncludes}>
              <h3 className={styles.includesTitle}>
                {t.maintenance.includesTitle}
              </h3>
              <ul role="list" className={styles.includesGrid}>
                {t.maintenance.includes.map((inc) => (
                  <li key={inc} className={styles.includeItem}>
                    <span className={styles.includeCheck} aria-hidden="true">
                      ✓
                    </span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
              <p className={styles.takeoverNote}>{t.maintenance.takeover}</p>
              <div>
                <ButtonLink
                  href={localizedPath(locale, "/contact")}
                  variant="primary"
                  size="md"
                  arrow
                >
                  {t.maintenance.cta}
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 07. SECTOR SOLUTIONS */}
      <section
        id="sectors"
        className="section section--surface"
        aria-labelledby="sectors-title"
      >
        <div className="container">
          <SectionHeader
            id="sectors-title"
            eyebrow={t.sectors.eyebrow}
            title={t.sectors.title}
            description={t.sectors.description}
          />
          <SectorShowcase
            locale={locale}
            copy={t.sectors}
            commonCopy={t.common}
          />
        </div>
      </section>

      {/* 08. HOW WE WORK */}
      <section id="how-we-work" className="section" aria-labelledby="process-title">
        <div className="container">
          <SectionHeader
            id="process-title"
            eyebrow={t.process.eyebrow}
            title={t.process.title}
            description={t.process.description}
          />
          <ProcessSteps steps={t.process.steps} />
        </div>
      </section>

      {/* 09. SELECTED WORK / CASE STUDIES */}
      <section
        id="work"
        className="section section--surface"
        aria-labelledby="work-title"
      >
        <div className="container">
          <SectionHeader
            id="work-title"
            eyebrow={t.work.eyebrow}
            title={t.work.title}
            description={t.work.description}
            align="split"
          >
            <p className="muted" style={{ fontSize: "var(--fs-xs)" }}>
              {t.work.illustrativeNote}
            </p>
          </SectionHeader>

          <QueryProvider>
            <CaseStudyList
              locale={locale}
              initialData={initialCaseStudies}
              copy={t.work}
              statusCopy={t.status}
            />
          </QueryProvider>
        </div>
      </section>

      {/* 10. PARTNERSHIP & GROWTH */}
      <section
        id="partnership"
        className="section"
        aria-labelledby="partner-title"
      >
        <div className="container">
          <SectionHeader
            id="partner-title"
            eyebrow={t.partnership.eyebrow}
            title={t.partnership.title}
            description={t.partnership.description}
            align="split"
          >
            <div>
              <ButtonLink
                href={localizedPath(locale, "/partnership")}
                variant="primary"
                size="md"
                arrow
              >
                {t.partnership.cta}
              </ButtonLink>
            </div>
          </SectionHeader>

          <RevealGroup className={styles.partnerGrid}>
            {t.partnership.types.map((pt) => (
              <RevealItem key={pt.key} className={styles.partnerCard}>
                <h3 className={styles.partnerTitle}>{pt.title}</h3>
                <p className={styles.partnerDesc}>{pt.description}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 11. WHY YOKBANGUN */}
      <section
        id="why"
        className="section section--surface"
        aria-labelledby="why-title"
      >
        <div className="container">
          <SectionHeader
            id="why-title"
            eyebrow={t.why.eyebrow}
            title={t.why.title}
          />
          <RevealGroup className={styles.whyGrid}>
            {t.why.reasons.map((r) => (
              <RevealItem key={r.title} className={styles.whyCard}>
                <h3 className={styles.whyTitle}>{r.title}</h3>
                <p className={styles.whyDesc}>{r.description}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 12. CONTACT / PROJECT DISCUSSION */}
      <section id="contact" className="section" aria-labelledby="contact-title">
        <div className="container">
          <SectionHeader
            id="contact-title"
            eyebrow={t.contact.eyebrow}
            title={t.contact.title}
            description={t.contact.description}
          />

          <div className={styles.contactGrid}>
            <div className={styles.contactAside}>
              <div>
                <h3 className={styles.afterTitle}>{t.contact.afterTitle}</h3>
                <ol role="list" className={styles.afterList}>
                  {t.contact.after.map((step, idx) => (
                    <li key={step} className={styles.afterItem}>
                      <span className={styles.afterIndex} aria-hidden="true">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div>
              <QueryProvider>
                <ContactForm
                  locale={locale}
                  copy={t.contact.form}
                  validationCopy={t.validation}
                  sectors={t.sectors.items}
                />
              </QueryProvider>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
