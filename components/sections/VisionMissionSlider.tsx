"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import styles from "./VisionMissionSlider.module.css";

export type SlideItem = {
  key: string;
  tab: string;
  eyebrow: string;
  heading: string;
  summary: string;
  highlights: {
    title: string;
    text: string;
  }[];
};

export type VisionMissionCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  slides: SlideItem[];
  prev: string;
  next: string;
};

export function VisionMissionSlider({ copy }: { copy: VisionMissionCopy }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const slides = copy.slides;
  const count = slides.length;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % count);
  }, [count]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + count) % count);
  }, [count]);

  // Auto rotation every 7 seconds, pauses when user hovers
  useEffect(() => {
    if (isPaused || count <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused, handleNext, count]);

  const currentSlide = slides[activeIndex];

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

  if (!currentSlide) return null;

  return (
    <section
      id="vision-mission"
      className={styles.section}
      aria-roledescription="carousel"
      aria-label={copy.title}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="container">
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>{copy.eyebrow}</span>
          <h2 className={styles.title}>{copy.title}</h2>
          <p className={styles.subtitle}>{copy.subtitle}</p>
        </div>

        {/* Tab Pills */}
        <div className={styles.tabsContainer} role="tablist" aria-label={copy.eyebrow}>
          {slides.map((slide, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={slide.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`slide-${slide.key}`}
                className={`${styles.tabBtn} ${isActive ? styles.tabBtnActive : ""}`}
                onClick={() => setActiveIndex(idx)}
              >
                <span>{slide.tab}</span>
                <span className={styles.tabBadge}>0{idx + 1}</span>
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
            key={currentSlide.key}
            id={`slide-${currentSlide.key}`}
            role="tabpanel"
            aria-label={currentSlide.tab}
            className={styles.card}
          >
            <div className={styles.cardHead}>
              <div>
                <span className={styles.cardEyebrow}>{currentSlide.eyebrow}</span>
                <h3 className={styles.cardHeading}>{currentSlide.heading}</h3>
              </div>
              <div className={styles.cardIndex} aria-hidden="true">
                0{activeIndex + 1} / 0{count}
              </div>
            </div>

            <p className={styles.cardSummary}>{currentSlide.summary}</p>

            <div className={styles.highlightsGrid}>
              {currentSlide.highlights.map((h) => (
                <div key={h.title} className={styles.highlightItem}>
                  <div className={styles.highlightHead}>
                    <span className={styles.highlightDot} aria-hidden="true" />
                    <h4 className={styles.highlightTitle}>{h.title}</h4>
                  </div>
                  <p className={styles.highlightText}>{h.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
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
              {slides.map((slide, idx) => (
                <button
                  key={slide.key}
                  type="button"
                  aria-label={`Slide ${idx + 1}: ${slide.tab}`}
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
