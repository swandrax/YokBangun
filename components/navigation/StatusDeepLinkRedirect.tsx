"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { localizedPath, type Locale } from "@/lib/i18n/config";

/**
 * On home page, deep links with ?status=... (e.g. /?status=concept)
 * are smoothly forwarded to /products?status=concept so Web and Android
 * deep links maintain parity and open the exact same product filter state.
 */
export function StatusDeepLinkRedirect({ locale }: { locale: Locale }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const status = searchParams?.get("status");
    if (status) {
      const target = `${localizedPath(locale, "/products")}?status=${encodeURIComponent(status)}`;
      router.replace(target);
    }
  }, [locale, router, searchParams]);

  return null;
}
