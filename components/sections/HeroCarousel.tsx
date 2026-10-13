"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import styles from "./HeroCarousel.module.css";

export type CarouselSlide = {
  src: string;
  alt: string;
  caption?: string;
};

type Props = {
  slides: CarouselSlide[];
  /** Auto-advance interval in ms. 0 = no autoplay. */
  interval?: number;
};

export function HeroCarousel({ slides, interval = 5000 }: Props) {
  const [current, setCurrent] = useState(0);
  const len = slides.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % len), [len]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + len) % len), [len]);

  useEffect(() => {
    if (interval <= 0 || len <= 1) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [interval, len, next]);

  if (len === 0) return null;

  return (
    <div className={styles.carousel} aria-roledescription="carousel" aria-label="Showcase images">
      <div className={styles.track}>
        {slides.map((slide, idx) => (
          <div
            key={slide.src}
            className={`${styles.slide} ${idx === current ? styles.slideActive : ""}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${idx + 1} of ${len}`}
            aria-hidden={idx !== current}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              width={1200}
              height={675}
              sizes="100vw"
              priority={idx === 0}
              className={styles.image}
            />
            {slide.caption && (
              <p className={styles.caption}>{slide.caption}</p>
            )}
          </div>
        ))}
      </div>

      {len > 1 && (
        <>
          <button
            type="button"
            className={`${styles.navBtn} ${styles.navPrev}`}
            onClick={prev}
            aria-label="Previous slide"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            className={`${styles.navBtn} ${styles.navNext}`}
            onClick={next}
            aria-label="Next slide"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className={styles.dots} role="tablist" aria-label="Slide navigation">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                role="tab"
                className={`${styles.dot} ${idx === current ? styles.dotActive : ""}`}
                aria-selected={idx === current}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => setCurrent(idx)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
