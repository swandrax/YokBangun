"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./PartnershipSlider.module.css";

export type PartnershipItem = {
  key: string;
  title: string;
  description: string;
  benefit?: string;
};

export type PartnershipSliderCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaText: string;
  noteText: string;
  prev: string;
  next: string;
  items: PartnershipItem[];
};

export function PartnershipSlider({
  copy,
  email,
}: {
  copy: PartnershipSliderCopy;
  email: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const items = copy.items;
  const count = items.length;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % count);
  }, [count]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + count) % count);
  }, [count]);

  useEffect(() => {
    if (isPaused || count <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused, handleNext, count]);

  const currentItem = items[activeIndex];

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      touchStartX.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touch = e.changedTouches[0];
    if (touch) {
      const diff = touchStartX.current - touch.clientX;
      if (diff > 50) {
        handleNext();
      } else if (diff < -50) {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  if (!currentItem) return null;

  return (
    <section
      id="partnerships-slider"
      className={styles.section}
      aria-roledescription="carousel"
      aria-label={copy.title}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="container">
        <div className={styles.header}>
          <span className={styles.eyebrow}>{copy.eyebrow}</span>
          <h2 className={styles.title}>{copy.title}</h2>
          <p className={styles.subtitle}>{copy.subtitle}</p>
        </div>

        {/* Tab Pills */}
        <div className={styles.tabsContainer} role="tablist" aria-label={copy.eyebrow}>
          {items.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`${styles.tabBtn} ${isActive ? styles.tabBtnActive : ""}`}
                onClick={() => setActiveIndex(idx)}
              >
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Slider Card */}
        <div
          className={styles.sliderWrapper}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            key={currentItem.key}
            role="tabpanel"
            aria-label={currentItem.title}
            className={styles.card}
          >
            <div className={styles.cardHead}>
              <div>
                <span className={styles.tagPill}>Partnership Model</span>
                <h3 className={styles.cardTitle}>{currentItem.title}</h3>
              </div>
              <div className={styles.cardCounter} aria-hidden="true">
                0{activeIndex + 1} / 0{count}
              </div>
            </div>

            <p className={styles.cardDesc}>{currentItem.description}</p>

            <div className={styles.benefitsRow}>
              <div className={styles.benefitItem}>
                <span className={styles.checkIcon}>✓</span>
                <p className={styles.benefitText}>
                  Kolaborasi praktis dengan integrasi teknologi langsung.
                </p>
              </div>
              <div className={styles.benefitItem}>
                <span className={styles.checkIcon}>✓</span>
                <p className={styles.benefitText}>
                  Komunikasi langsung tanpa birokrasi berbelit.
                </p>
              </div>
            </div>

            <div className={styles.ctaRow}>
              <a
                href={`mailto:${email}?subject=${encodeURIComponent(
                  `Kemitraan: ${currentItem.title}`
                )}`}
                className={styles.ctaBtn}
              >
                <span>{copy.ctaText}</span>
                <span aria-hidden="true">→</span>
              </a>
              <span className={styles.ctaNote}>{copy.noteText}</span>
            </div>
          </div>

          {/* Controls */}
          <div className={styles.controls}>
            <div className={styles.navArrows}>
              <button
                type="button"
                className={styles.arrowBtn}
                aria-label={copy.prev}
                onClick={handlePrev}
              >
                ←
              </button>
              <button
                type="button"
                className={styles.arrowBtn}
                aria-label={copy.next}
                onClick={handleNext}
              >
                →
              </button>
            </div>

            <div className={styles.dots} role="group" aria-label="Slide indicators">
              {items.map((item, idx) => (
                <button
                  key={item.key}
                  type="button"
                  aria-label={`Slide ${idx + 1}: ${item.title}`}
                  className={`${styles.dot} ${idx === activeIndex ? styles.dotActive : ""}`}
                  onClick={() => setActiveIndex(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
