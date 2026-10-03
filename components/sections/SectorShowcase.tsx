"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { buttonClass } from "@/components/ui/Button";
import { localizedPath, type Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/messages";
import styles from "./SectorShowcase.module.css";

type Props = {
  locale: Locale;
  copy: Messages["sectors"];
  commonCopy: Messages["common"];
  standalone?: boolean;
};

export function SectorShowcase({ locale, copy, commonCopy, standalone = false }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  function checkScroll() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  }

  function handleScroll(direction: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("article")?.clientWidth || 340;
    const scrollAmount = direction === "left" ? -cardWidth * 1.5 : cardWidth * 1.5;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }

  return (
    <div className={styles.root}>
      {/* Scroll controls */}
      <div className={styles.headerRow}>
        <div className={styles.hintText}>{commonCopy.scrollHint}</div>
        <div className={styles.navControls} aria-hidden="true">
          <button
            type="button"
            className={styles.navBtn}
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            aria-label={commonCopy.previous}
          >
            <Icon name="chevronRight" className={styles.iconPrev} />
          </button>
          <button
            type="button"
            className={styles.navBtn}
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            aria-label={commonCopy.next}
          >
            <Icon name="chevronRight" />
          </button>
        </div>
      </div>

      {/* Responsive Horizontal Scroll Container */}
      <div
        ref={scrollRef}
        className={styles.scrollTrack}
        onScroll={checkScroll}
        tabIndex={0}
        role="region"
        aria-label={copy.title}
      >
        {copy.items.map((item) => (
          <article key={item.key} className={styles.card}>
            <div className={styles.cardTop}>
              <h3 className={styles.sectorName}>{item.name}</h3>
              {item.tag ? (
                <span className={styles.tag}>{item.tag}</span>
              ) : null}
            </div>

            <p className={styles.summary}>{item.summary}</p>

            <div className={styles.sectionDivider} />

            <div className={styles.block}>
              <span className={styles.blockLabel}>{copy.labels.problem}</span>
              <p className={styles.blockText}>{item.problem}</p>
            </div>

            <div className={styles.block}>
              <span className={styles.blockLabel}>{copy.labels.solution}</span>
              <p className={styles.blockText}>{item.solution}</p>
            </div>

            <div className={styles.outcomeBlock}>
              <span className={styles.outcomeLabel}>{copy.labels.outcome}</span>
              <p className={styles.outcomeText}>{item.outcome}</p>
            </div>
          </article>
        ))}
      </div>

      {/* Outcome Note */}
      <p className={styles.note}>{copy.outcomeNote}</p>

      {/* civicGov Spotlight */}
      <div className={styles.civicGovSpotlight}>
        <div className={styles.civicGovHead}>
          <div>
            <span className="eyebrow">{copy.civicGov.eyebrow}</span>
            <h3 className={styles.civicGovTitle}>{copy.civicGov.title}</h3>
          </div>
          <p className={styles.civicGovDesc}>{copy.civicGov.description}</p>
        </div>

        <div className={styles.civicGovCapabilities}>
          <h4 className={styles.capHeading}>{copy.civicGov.capabilitiesTitle}</h4>
          <ul role="list" className={styles.capGrid}>
            {copy.civicGov.capabilities.map((cap) => (
              <li key={cap} className={styles.capItem}>
                <span className={styles.capCheck} aria-hidden="true">✓</span>
                <span>{cap}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className={styles.disclaimer}>{copy.civicGov.disclaimer}</p>
      </div>

      {!standalone && (
        <div className={styles.viewAllRow}>
          <Link
            href={localizedPath(locale, "/sectors")}
            className={buttonClass("secondary", "md")}
          >
            {copy.viewAll}
          </Link>
        </div>
      )}
    </div>
  );
}
