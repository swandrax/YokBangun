import { ImageResponse } from "next/og";
import { brand } from "@/lib/site";
import { getMessages } from "@/lib/i18n/messages";
import { isLocale, defaultLocale, type Locale } from "@/lib/i18n/config";

export const runtime = "nodejs";
export const alt = "yokBangun — growth with u";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ locale: string }> };

export default async function Image({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = getMessages(locale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#FFFFFF",
          color: "#151817",
          fontFamily: "sans-serif",
          border: "16px solid #1F5D45",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: "#1F5D45",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            yb
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em" }}>
              {brand.name}
            </span>
            <span style={{ fontSize: 16, color: "#606762" }}>
              — {brand.tagline}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 900 }}>
          <div
            style={{
              fontSize: 54,
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              color: "#151817",
            }}
          >
            {locale === "id" ? "Bangun digitalnya. Tumbuh usahanya." : "Build better digital products. Grow with the right support."}
          </div>
          <div style={{ fontSize: 24, lineHeight: 1.4, color: "#606762" }}>
            {t.meta.siteDescription}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            fontSize: 18,
            fontWeight: 600,
            color: "#1F5D45",
          }}
        >
          <span>Digital Products</span>
          <span style={{ color: "#CBD1C9" }}>•</span>
          <span>AI Services</span>
          <span style={{ color: "#CBD1C9" }}>•</span>
          <span>Maintenance</span>
          <span style={{ color: "#CBD1C9" }}>•</span>
          <span>Sector Solutions</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
