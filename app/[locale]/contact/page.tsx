import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMessages } from "@/lib/i18n/messages";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo/metadata";
import { publicContact, siteUrl } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { CopyButton } from "@/components/ui/CopyButton";
import styles from "./ContactPage.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "contact", "/contact");
}

export default async function ContactPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;

  const t = getMessages(locale);
  const con = t.contact;

  return (
    <>
      <PageHero
        locale={locale}
        crumb={{ name: t.nav.contact, path: "/contact" }}
        eyebrow={con.eyebrow}
        title={con.title}
        description={con.description}
      />

      <section className="section" aria-label={con.title}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.aside}>
              <div>
                <h2 className={styles.asideTitle}>{con.afterTitle}</h2>
                <ol role="list" className={styles.afterList}>
                  {con.after.map((step, idx) => (
                    <li key={step} className={styles.afterItem}>
                      <span className={styles.afterIdx} aria-hidden="true">
                        0{idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className={styles.directBox}>
                <h3 className={styles.directTitle}>{con.directTitle}</h3>
                <div className={styles.directLinks}>
                  {publicContact.email && (
                    <div className="flex items-center justify-between gap-2 py-1">
                      <div>
                        <span className={styles.directLabel}>{con.emailLabel}:</span>{" "}
                        <a href={`mailto:${publicContact.email}`} className={styles.directLink}>
                          {publicContact.email}
                        </a>
                      </div>
                      <CopyButton
                        text={publicContact.email}
                        label={locale === "id" ? "Salin" : "Copy"}
                        successLabel={locale === "id" ? "Tersalin!" : "Copied!"}
                      />
                    </div>
                  )}
                  {publicContact.whatsapp && (
                    <div className="flex items-center justify-between gap-2 py-1">
                      <div>
                        <span className={styles.directLabel}>{con.whatsappLabel}:</span>{" "}
                        <a
                          href={`https://wa.me/${publicContact.whatsapp.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.directLink}
                        >
                          {publicContact.whatsapp}
                        </a>
                      </div>
                      <CopyButton
                        text={publicContact.whatsapp}
                        label={locale === "id" ? "Salin" : "Copy"}
                        successLabel={locale === "id" ? "Tersalin!" : "Copied!"}
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-neutral-200">
                    <span className="text-xs text-neutral-600">
                      {locale === "id" ? "Bagikan tautan halaman" : "Share page link"}
                    </span>
                    <CopyButton
                      text={`${siteUrl}/${locale}/contact`}
                      label={locale === "id" ? "Salin URL" : "Copy URL"}
                      successLabel={locale === "id" ? "Tersalin!" : "Copied!"}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className={styles.directEmailCard}>
                <div className={styles.emailCardHeader}>
                  <div className={styles.emailCardBadge} aria-hidden="true">
                    ✉️
                  </div>
                  <div>
                    <h2 className={styles.emailCardTitle}>
                      {locale === "id"
                        ? "Hubungi Langsung Tim Enterprise"
                        : "Contact Our Enterprise Team"}
                    </h2>
                    <p className={styles.emailCardDesc}>
                      {locale === "id"
                        ? "Diskusikan kebutuhan proyek skala enterprise, integrasi sistem, transformasi operasional, serta audit dan pemeliharaan digital langsung melalui email resmi kami."
                        : "Discuss enterprise-scale digital projects, system integrations, operational transformation, and long-term maintenance directly via our official email."}
                    </p>
                  </div>
                </div>

                <div className={styles.emailDetailBox}>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-neutral-500 mb-1">
                      {locale === "id" ? "Alamat Email Resmi" : "Official Email Address"}
                    </span>
                    <span className={styles.emailAddressText}>
                      {publicContact.email || "nussaspacevibe@gmail.com"}
                    </span>
                  </div>
                  <CopyButton
                    text={publicContact.email || "nussaspacevibe@gmail.com"}
                    label={locale === "id" ? "Salin Email" : "Copy Email"}
                    successLabel={locale === "id" ? "Tersalin!" : "Copied!"}
                  />
                </div>

                <div className={styles.emailActionRow}>
                  <a
                    href={`mailto:${publicContact.email || "nussaspacevibe@gmail.com"}?subject=${encodeURIComponent(
                      locale === "id"
                        ? "Inquiry Proyek Enterprise — yokBangun"
                        : "Enterprise Project Inquiry — yokBangun"
                    )}`}
                    className={styles.primaryEmailBtn}
                  >
                    <span>
                      {locale === "id" ? "Buka Email Sekarang" : "Open Email Client"}
                    </span>
                    <span aria-hidden="true">→</span>
                  </a>
                </div>

                <div className={styles.benefitList}>
                  <div className={styles.benefitItem}>
                    <span className={styles.benefitCheck}>✓</span>
                    <span>
                      {locale === "id"
                        ? "Respons cepat dalam 1x24 jam kerja untuk enterprise & bisnis"
                        : "Fast response within 24 business hours for enterprise & businesses"}
                    </span>
                  </div>
                  <div className={styles.benefitItem}>
                    <span className={styles.benefitCheck}>✓</span>
                    <span>
                      {locale === "id"
                        ? "Keamanan informasi & data mengacu standar ISO 27001:2022"
                        : "Information security & data protection aligned with ISO 27001:2022"}
                    </span>
                  </div>
                  <div className={styles.benefitItem}>
                    <span className={styles.benefitCheck}>✓</span>
                    <span>
                      {locale === "id"
                        ? "Konsultasi teknis langsung dengan tim engineer tanpa perantara"
                        : "Direct technical consultation with engineers without intermediaries"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
