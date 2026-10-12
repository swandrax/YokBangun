import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMessages } from "@/lib/i18n/messages";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { QueryProvider } from "@/lib/query/QueryProvider";
import { PartnershipForm } from "@/features/partnership/PartnershipForm";
import { CopyButton } from "@/components/ui/CopyButton";
import { publicContact } from "@/lib/site";
import styles from "./PartnershipPage.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "partnership", "/partnership");
}

export default async function PartnershipPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;

  const t = getMessages(locale);
  const part = t.partnership;

  return (
    <>
      <PageHero
        locale={locale}
        crumb={{ name: t.nav.partnership, path: "/partnership" }}
        eyebrow={part.eyebrow}
        title={part.title}
        description={part.description}
      />

      {/* 6 Partnership Types */}
      <section className="section" aria-labelledby="partner-types-title">
        <div className="container">
          <SectionHeader
            id="partner-types-title"
            title={locale === "id" ? "Bentuk Kemitraan" : "Partnership Models"}
          />
          <div className={styles.typesGrid}>
            {part.types.map((pt) => (
              <article key={pt.key} className={styles.typeCard}>
                <h3 className={styles.typeTitle}>{pt.title}</h3>
                <p className={styles.typeDesc}>{pt.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How a Collaboration Works */}
      <section className="section section--surface" aria-labelledby="how-title">
        <div className="container">
          <SectionHeader
            id="how-title"
            title={part.howTitle}
          />
          <div className={styles.howGrid}>
            {part.how.map((h, idx) => (
              <div key={h.title} className={styles.howCard}>
                <span className={styles.howIdx} aria-hidden="true">
                  0{idx + 1}
                </span>
                <h3 className={styles.howTitle}>{h.title}</h3>
                <p className={styles.howDesc}>{h.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Inquiry Form & Direct Email */}
      <section className="section" aria-labelledby="partner-form-title">
        <div className="container">
          <div className={styles.formContainer}>
            <div className="mb-8 p-6 bg-[#fbf9f6] border border-neutral-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="block text-xs uppercase tracking-wider text-[#bf572b] font-semibold mb-1">
                  {locale === "id" ? "Kontak Langsung Kemitraan" : "Direct Partnership Contact"}
                </span>
                <p className="text-sm text-neutral-600 mb-1">
                  {locale === "id"
                    ? "Untuk diskusi awal startup, integrasi platform, atau penjajakan kolaborasi UKM:"
                    : "For early startup discussions, platform integrations, or SME collaboration inquiries:"}
                </p>
                <a
                  href={`mailto:${publicContact.email || "nussaspacevibe@gmail.com"}?subject=${encodeURIComponent(
                    locale === "id"
                      ? "Inquiry Kemitraan Startup & UKM — yokBangun"
                      : "Startup & SME Partnership Inquiry — yokBangun"
                  )}`}
                  className="text-base font-semibold text-neutral-900 hover:underline"
                >
                  {publicContact.email || "nussaspacevibe@gmail.com"}
                </a>
              </div>
              <CopyButton
                text={publicContact.email || "nussaspacevibe@gmail.com"}
                label={locale === "id" ? "Salin Email" : "Copy Email"}
                successLabel={locale === "id" ? "Tersalin!" : "Copied!"}
              />
            </div>

            <QueryProvider>
              <PartnershipForm
                locale={locale}
                copy={part.form}
                validationCopy={t.validation}
                partnershipTypes={part.types}
              />
            </QueryProvider>
          </div>
        </div>
      </section>
    </>
  );
}
