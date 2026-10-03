import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { MotionProvider } from "@/components/animation/MotionProvider";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { LocalePreference } from "@/components/navigation/LocalePreference";
import { htmlLang, isLocale, locales } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { baseMetadata } from "@/lib/seo/metadata";
import { PrelineScript } from "@/components/preline/PrelineScript";
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkerRegister";
import { PwaInstallPrompt } from "@/components/pwa/PwaInstallPrompt";
import "../globals.css";

// Two families max. Plus Jakarta Sans (designed in Jakarta) for headings, Inter for body.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

type Props = { children: ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return baseMetadata(locale);
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getMessages(locale);

  return (
    <html lang={htmlLang[locale]} className={`${jakarta.variable} ${inter.variable}`}>
      <body>
        {/* Without JS, reveal animations never run, so keep content visible. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a href="#main" className="skip-link">
          {t.common.skipToContent}
        </a>
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100dvh" }}>
          <SiteHeader locale={locale} />
          <MotionProvider>
            <main id="main" tabIndex={-1} style={{ outline: "none" }}>
              {children}
            </main>
          </MotionProvider>
          <SiteFooter locale={locale} />
        </div>
        <LocalePreference locale={locale} />
        <PrelineScript />
        <ServiceWorkerRegister />
        <PwaInstallPrompt locale={locale} />
      </body>
    </html>
  );
}
