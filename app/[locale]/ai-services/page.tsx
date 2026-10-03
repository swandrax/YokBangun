import { notFound } from "next/navigation";
import { getMessages } from "@/lib/i18n/messages";
import { isLocale, localizedPath, type Locale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import styles from "./AiServicesPage.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "aiServices", "/ai-services");
}

export default async function AiServicesPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;

  const t = getMessages(locale);
  const ai = t.ai;
  const aip = t.aiPage;

  return (
    <>
      <PageHero
        locale={locale}
        crumb={{ name: t.nav.aiServices, path: "/ai-services" }}
        eyebrow={ai.eyebrow}
        title={ai.title}
        description={ai.description}
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

      {/* Practical Use Cases */}
      <section className="section" aria-labelledby="usecases-title">
        <div className="container">
          <SectionHeader
            id="usecases-title"
            eyebrow={ai.eyebrow}
            title={ai.useCasesTitle}
          />
          <div className={styles.useCasesGrid}>
            {ai.useCases.map((uc) => (
              <article key={uc.title} className={styles.useCaseCard}>
                <h3 className={styles.useCaseTitle}>{uc.title}</h3>
                <p className={styles.useCaseDesc}>{uc.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Principles & What We Do Not Promise */}
      <section className="section section--surface" aria-labelledby="principles-title">
        <div className="container">
          <div className={styles.dualGrid}>
            {/* Principles */}
            <div className={styles.col}>
              <SectionHeader
                id="principles-title"
                title={ai.principlesTitle}
              />
              <div className={styles.principlesList}>
                {ai.principles.map((pr) => (
                  <div key={pr.title} className={styles.principleItem}>
                    <h3 className={styles.principleTitle}>{pr.title}</h3>
                    <p className={styles.principleDesc}>{pr.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* What we do not promise */}
            <div className={styles.notPromiseCard}>
              <h3 className={styles.notPromiseTitle}>{aip.notPromiseTitle}</h3>
              <ul role="list" className={styles.notPromiseList}>
                {aip.notPromise.map((item) => (
                  <li key={item} className={styles.notPromiseItem}>
                    <span className={styles.notPromiseIcon} aria-hidden="true">—</span>
                    <p>{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* AI Project Stages */}
      <section className="section" aria-labelledby="approach-title">
        <div className="container">
          <SectionHeader
            id="approach-title"
            title={aip.approachTitle}
          />
          <div className={styles.stagesGrid}>
            {aip.approach.map((st, idx) => (
              <div key={st.title} className={styles.stageCard}>
                <span className={styles.stageIdx} aria-hidden="true">
                  0{idx + 1}
                </span>
                <h3 className={styles.stageTitle}>{st.title}</h3>
                <p className={styles.stageDesc}>{st.description}</p>
              </div>
            ))}
          </div>

          <div className={styles.ctaBox}>
            <p className={styles.ctaPrompt}>
              {locale === "id"
                ? "Punya bagian pekerjaan yang memakan waktu dan ingin dicek apakah AI bisa membantu?"
                : "Have a time-consuming workflow you'd like to check for practical AI assistance?"}
            </p>
            <ButtonLink
              href={localizedPath(locale, "/contact")}
              variant="primary"
              size="lg"
              arrow
            >
              {t.nav.cta}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
