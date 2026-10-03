import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMessages } from "@/lib/i18n/messages";
import { isLocale, localizedPath, type Locale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { SectorShowcase } from "@/components/sections/SectorShowcase";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, "sectors", "/sectors");
}

export default async function SectorsPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;

  const t = getMessages(locale);
  const sec = t.sectors;

  return (
    <>
      <PageHero
        locale={locale}
        crumb={{ name: t.nav.sectors, path: "/sectors" }}
        eyebrow={sec.eyebrow}
        title={sec.title}
        description={sec.description}
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

      <section className="section" aria-label={sec.title}>
        <div className="container">
          <SectorShowcase
            locale={locale}
            copy={sec}
            commonCopy={t.common}
            standalone={true}
          />
        </div>
      </section>
    </>
  );
}
