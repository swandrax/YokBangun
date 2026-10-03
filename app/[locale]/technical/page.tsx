import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMessages } from "@/lib/i18n/messages";
import { isLocale, localizedPath, type Locale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
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

          {/* Modern Frontend & Integration Specifications */}
          <div className="mt-8 p-6 md:p-8 bg-white border border-neutral-200 rounded-xl shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900">
                  {locale === "id"
                    ? "Arsitektur Frontend & Distribusi Standar"
                    : "Frontend Architecture & Standard Distribution"}
                </h3>
                <p className="text-sm text-neutral-600 mt-1">
                  {locale === "id"
                    ? "Daftar pustaka, UI framework, serta protokol integrasi yang aktif pada sistem ini."
                    : "Active libraries, UI frameworks, and integration protocols in this system."}
                </p>
              </div>
              <CopyButton
                text={`yokBangun Frontend Stack:\n• Core: Next.js 16 (React 19, TypeScript)\n• UI & Styling: Tailwind CSS 3.4 & Preline UI 4.2\n• Utilities: Clipboard.js 2.0\n• Syndication: RSS 2.0 XML (/feed.xml)\n• Protocol: Open Graph Protocol`}
                label={locale === "id" ? "Salin Spesifikasi" : "Copy Specs"}
                successLabel={locale === "id" ? "Tersalin!" : "Copied!"}
                size="md"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200/70">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">UI Framework</span>
                <p className="text-sm font-semibold text-neutral-900 mt-1">Tailwind CSS & Preline UI</p>
                <p className="text-xs text-neutral-600 mt-1">Tailwind 3.4 + Preline UI components & interactions</p>
              </div>

              <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200/70">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">JavaScript Libraries</span>
                <p className="text-sm font-semibold text-neutral-900 mt-1">Clipboard.js</p>
                <p className="text-xs text-neutral-600 mt-1">Lightweight copy-to-clipboard utilities</p>
              </div>

              <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200/70">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Syndication</span>
                <p className="text-sm font-semibold text-neutral-900 mt-1">RSS 2.0 Feed</p>
                <p className="text-xs text-neutral-600 mt-1">
                  Tersedia di{" "}
                  <a href="/feed.xml" target="_blank" rel="noopener noreferrer" className="text-[#1F5D45] underline font-medium">
                    /feed.xml
                  </a>
                </p>
              </div>

              <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200/70">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Metadata & Social</span>
                <p className="text-sm font-semibold text-neutral-900 mt-1">Open Graph</p>
                <p className="text-xs text-neutral-600 mt-1">Structured meta tags & social preview</p>
              </div>
            </div>
          </div>

          <div className={styles.contactBanner}>
            <div className={styles.bannerContent}>
              <h2 className={styles.bannerTitle}>
                {locale === "id"
                  ? "Punya infrastruktur atau sistem yang sudah berjalan?"
                  : "Have an existing infrastructure or legacy system?"}
              </h2>
              <p className={styles.bannerText}>
                {locale === "id"
                  ? "Kami terbiasa menyambungkan produk baru ke API, database, atau layanan internal yang sudah ada tanpa perlu merombak semuanya dari nol."
                  : "We regularly integrate new products with existing APIs, databases, or internal services without requiring a ground-up rewrite."}
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
                {locale === "id" ? "Kemitraan Teknis" : "Technical Partnership"}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
