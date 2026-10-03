import { NextResponse, type NextRequest } from "next/server";
import { listProducts } from "@/features/products/data";
import { defaultLocale, isLocale } from "@/lib/i18n/config";

export function GET(request: NextRequest) {
  const param = request.nextUrl.searchParams.get("locale");
  const locale = isLocale(param) ? param : defaultLocale;
  return NextResponse.json(listProducts(locale), {
    headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400" },
  });
}
