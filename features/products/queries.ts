import { queryOptions } from "@tanstack/react-query";
import { getJson } from "@/lib/api/http";
import type { Locale } from "@/lib/i18n/config";
import type { Product } from "./data";

export const productKeys = {
  all: ["products"] as const,
  list: (locale: Locale) => [...productKeys.all, "list", locale] as const,
};

export function productsQueryOptions(locale: Locale) {
  return queryOptions({
    queryKey: productKeys.list(locale),
    queryFn: ({ signal }) => getJson<Product[]>(`/api/v1/products?locale=${locale}`, { signal }),
  });
}
