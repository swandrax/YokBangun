"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { caseStudiesQueryOptions } from "./queries";
import type { CaseStudy } from "./data";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/messages";
import styles from "./CaseStudyList.module.css";

type Props = {
  locale: Locale;
  initialData: CaseStudy[];
  copy: Messages["work"];
  statusCopy: Messages["status"];
};

export function CaseStudyList({
  locale,
  initialData,
  copy,
  statusCopy,
}: Props) {
  const searchParams = useSearchParams();

  const sectorFilters = [
    { key: "all", label: copy.filterAll },
    { key: "umkm", label: "UMKM" },
    {
      key: "home-business",
      label: locale === "id" ? "Usaha Rumahan" : "Home Businesses",
    },
    { key: "civicgov", label: "RT/RW · civicGov" },
    {
      key: "pendidikan",
      label: locale === "id" ? "Pendidikan" : "Education",
    },
    {
      key: "kesehatan",
      label: locale === "id" ? "Kesehatan" : "Health Services",
    },
  ];

  const sectorParam = searchParams?.get("sector")?.toLowerCase()?.trim();
  const urlMatchedSector: string =
    sectorParam === "rt-rw" || sectorParam === "rtrw"
      ? "civicgov"
      : sectorFilters.some((f) => f.key === sectorParam)
      ? sectorParam!
      : "all";

  const [localSector, setLocalSector] = useState<string | null>(null);
  const selectedSector = localSector ?? urlMatchedSector;

  const handleSelectSector = (key: string) => {
    setLocalSector(key);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (key === "all") {
        url.searchParams.delete("sector");
      } else {
        url.searchParams.set("sector", key);
      }
      window.history.replaceState(null, "", url.toString());
    }
  };

  const { data: studies = initialData } = useQuery({
    ...caseStudiesQueryOptions(locale),
    initialData,
  });

  const filtered =
    selectedSector === "all"
      ? studies
      : studies.filter((s) => s.sectorKey === selectedSector);

  return (
    <div className={styles.root}>
      {/* Sector filter tabs */}
      <div
        className={styles.filters}
        role="tablist"
        aria-label={copy.filterLabel}
      >
        {sectorFilters.map((sf) => {
          const isSelected = selectedSector === sf.key;
          return (
            <button
              key={sf.key}
              role="tab"
              aria-selected={isSelected}
              className={isSelected ? styles.filterBtnActive : styles.filterBtn}
              onClick={() => handleSelectSector(sf.key)}
            >
              {sf.label}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className={styles.empty}>{copy.empty}</p>
      ) : (
        <div className={styles.list}>
          {filtered.map((study) => (
            <article key={study.slug} className={styles.card}>
              <div className={styles.topBar}>
                <span className={styles.sector}>{study.sector}</span>
                <StatusBadge
                  tone="illustrative"
                  label={statusCopy.illustrative.label}
                />
              </div>

              <h3 className={styles.title}>{study.title}</h3>

              <div className={styles.grid}>
                <div className={styles.column}>
                  <div className={styles.sectionBlock}>
                    <h4 className={styles.blockTitle}>
                      {copy.labels.problem}
                    </h4>
                    <p className={styles.blockText}>{study.problem}</p>
                  </div>

                  <div className={styles.sectionBlock}>
                    <h4 className={styles.blockTitle}>
                      {copy.labels.technology}
                    </h4>
                    <div className={styles.tags}>
                      {study.technology.map((t) => (
                        <span key={t} className={styles.tag}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={styles.column}>
                  <div className={styles.sectionBlock}>
                    <h4 className={styles.blockTitle}>{copy.labels.built}</h4>
                    <ul role="list" className={styles.builtList}>
                      {study.built.map((b) => (
                        <li key={b} className={styles.builtItem}>
                          <span className={styles.checkIcon} aria-hidden="true">✓</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.outcomeBlock}>
                    <h4 className={styles.outcomeTitle}>
                      {copy.labels.outcome}
                    </h4>
                    <p className={styles.outcomeText}>{study.outcome}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
