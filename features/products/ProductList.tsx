"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Link from "next/link";
import { productsQueryOptions } from "./queries";
import type { Product, ProductStatus } from "./data";
import { StatusBadge, type StatusTone } from "@/components/ui/StatusBadge";
import { buttonClass } from "@/components/ui/Button";
import { localizedPath, type Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/messages";
import styles from "./ProductList.module.css";

type Props = {
  locale: Locale;
  initialData: Product[];
  copy: Messages["products"];
  statusCopy: Messages["status"];
  contactCtaText: string;
};

export function ProductList({
  locale,
  initialData,
  copy,
  statusCopy,
  contactCtaText,
}: Props) {
  const [selectedStatus, setSelectedStatus] = useState<ProductStatus | "all">(
    "all"
  );

  const { data: products = initialData } = useQuery({
    ...productsQueryOptions(locale),
    initialData,
  });

  const statuses: (ProductStatus | "all")[] = [
    "all",
    "prototype",
    "concept",
    "pilot",
    "active",
    "maintenance",
  ];

  const filtered =
    selectedStatus === "all"
      ? products
      : products.filter((p) => p.status === selectedStatus);

  return (
    <div className={styles.root}>
      {/* Filter Tabs */}
      <div
        className={styles.filters}
        role="tablist"
        aria-label={copy.filterLabel}
      >
        {statuses.map((st) => {
          const isSelected = selectedStatus === st;
          const label =
            st === "all" ? copy.filterAll : statusCopy[st]?.label || st;
          return (
            <button
              key={st}
              role="tab"
              aria-selected={isSelected}
              className={isSelected ? styles.filterBtnActive : styles.filterBtn}
              onClick={() => setSelectedStatus(st)}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Grid of Products */}
      {filtered.length === 0 ? (
        <p className={styles.empty}>{copy.empty}</p>
      ) : (
        <div className={styles.grid}>
          {filtered.map((prod) => {
            const tone = prod.status as StatusTone;
            const badgeLabel = statusCopy[prod.status]?.label || prod.status;

            return (
              <article key={prod.slug} className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.titleWrap}>
                    <h3 className={styles.cardTitle}>{prod.name}</h3>
                    <p className={styles.forWhom}>
                      <span className={styles.metaLabel}>{copy.labels.forWhom}:</span>{" "}
                      {prod.forWhom}
                    </p>
                  </div>
                  <StatusBadge tone={tone} label={badgeLabel} />
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.block}>
                    <p className={styles.blockLabel}>{copy.labels.problem}</p>
                    <p className={styles.blockText}>{prod.problem}</p>
                  </div>

                  <div className={styles.block}>
                    <p className={styles.blockLabel}>
                      {copy.labels.capabilities}
                    </p>
                    <ul role="list" className={styles.capList}>
                      {prod.capabilities.map((cap) => (
                        <li key={cap} className={styles.capItem}>
                          <span className={styles.capDot} aria-hidden="true" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <Link
                    href={`${localizedPath(locale, "/contact")}?subject=${encodeURIComponent(
                      prod.name
                    )}`}
                    className={buttonClass("secondary", "md", styles.ctaLink)}
                  >
                    {contactCtaText}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
