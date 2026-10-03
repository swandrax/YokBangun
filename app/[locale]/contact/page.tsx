import { notFound } from "next/navigation";
import { getMessages } from "@/lib/i18n/messages";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo/metadata";
import { publicContact } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { QueryProvider } from "@/lib/query/QueryProvider";
import { ContactForm } from "@/features/contact/ContactForm";
import styles from "./ContactPage.module.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
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

              {(publicContact.email || publicContact.whatsapp) && (
                <div className={styles.directBox}>
                  <h3 className={styles.directTitle}>{con.directTitle}</h3>
                  <div className={styles.directLinks}>
                    {publicContact.email && (
                      <p>
                        <span className={styles.directLabel}>{con.emailLabel}:</span>{" "}
                        <a href={`mailto:${publicContact.email}`} className={styles.directLink}>
                          {publicContact.email}
                        </a>
                      </p>
                    )}
                    {publicContact.whatsapp && (
                      <p>
                        <span className={styles.directLabel}>{con.whatsappLabel}:</span>{" "}
                        <a
                          href={`https://wa.me/${publicContact.whatsapp.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.directLink}
                        >
                          {publicContact.whatsapp}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div>
              <QueryProvider>
                <ContactForm
                  locale={locale}
                  copy={con.form}
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
