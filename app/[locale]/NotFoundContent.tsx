"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { buttonClass } from "@/components/ui/Button";
import { isLocale, localizedPath, type Locale } from "@/lib/i18n/config";

type Copy = { title: string; description: string; cta: string };

export function NotFoundContent({ copy }: { copy: Record<Locale, Copy> }) {
  const params = useParams<{ locale?: string }>();
  const locale: Locale = isLocale(params?.locale) ? params.locale : "id";
  const t = copy[locale];
  return (
    <section className="section">
      <div className="container prose">
        <p className="eyebrow">404</p>
        <h1 style={{ fontSize: "var(--fs-h2)", marginTop: "1rem" }}>{t.title}</h1>
        <p className="lead">{t.description}</p>
        <p style={{ marginTop: "2rem" }}>
          <Link href={localizedPath(locale, "/")} className={buttonClass("primary")}>
            {t.cta}
          </Link>
        </p>
      </div>
    </section>
  );
}
