import { queryOptions } from "@tanstack/react-query";
import { getJson } from "@/lib/api/http";
import type { Locale } from "@/lib/i18n/config";
import type { CaseStudy } from "./data";

export const caseStudyKeys = {
  all: ["case-studies"] as const,
  list: (locale: Locale) => [...caseStudyKeys.all, "list", locale] as const,
};

export function caseStudiesQueryOptions(locale: Locale) {
  return queryOptions({
    queryKey: caseStudyKeys.list(locale),
    queryFn: ({ signal }) => getJson<CaseStudy[]>(`/api/v1/case-studies?locale=${locale}`, { signal }),
  });
}
