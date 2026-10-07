"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const VIDEOS = [
  "/landing/desa.mp4",
  "/landing/kota.mp4",
  "/landing/umkm.mp4",
];
const POSTER = "/landing/hero-poster.jpg";

function checkShouldUsePosterOnly(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return true;
    }
    const nav = navigator as unknown as {
      connection?: {
        saveData?: boolean;
        effectiveType?: string;
      };
    };
    const connection = nav.connection;
    if (
      connection?.saveData ||
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "2g"
    ) {
      return true;
    }
  } catch {
    // Fallback safe: continue with video
  }
  return false;
}

export function HeroVideo() {
  const [usePosterOnly, setUsePosterOnly] = useState(false);
  const [activeSlot, setActiveSlot] = useState<0 | 1>(0);
  const [videoIndex0, setVideoIndex0] = useState(0);
  const [videoIndex1, setVideoIndex1] = useState<number | null>(null);
  const [hasError, setHasError] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef0 = useRef<HTMLVideoElement>(null);
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const isInViewportRef = useRef(true);

  // 1. Initial environmental checks: reduced motion, slow connection / saveData
  useEffect(() => {
    if (checkShouldUsePosterOnly()) {
      queueMicrotask(() => {
        setUsePosterOnly(true);
      });
    }
  }, []);

  // 2. Pause when tab is inactive (visibilitychange) or hero is outside viewport (IntersectionObserver)
  useEffect(() => {
    if (usePosterOnly || hasError) return;

    const handleVisibilityChange = () => {
      const isVisible = document.visibilityState === "visible";
      const currentRef = activeSlot === 0 ? videoRef0.current : videoRef1.current;
      if (!currentRef) return;

      if (!isVisible) {
        currentRef.pause();
      } else if (isInViewportRef.current) {
        currentRef.play().catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        isInViewportRef.current = entry.isIntersecting;
        const currentRef = activeSlot === 0 ? videoRef0.current : videoRef1.current;
        if (!currentRef) return;

        if (entry.isIntersecting) {
          if (document.visibilityState === "visible") {
            currentRef.play().catch(() => {});
          }
        } else {
          currentRef.pause();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
    };
  }, [activeSlot, usePosterOnly, hasError]);

  // When slot 0 starts playing for the first time, lazy-load slot 1's source
  const handleSlot0Play = () => {
    if (videoIndex1 === null) {
      setVideoIndex1(1 % VIDEOS.length);
    }
  };

  const handleEnded = (endedSlot: 0 | 1) => {
    if (endedSlot === 0) {
      // Switch to slot 1
      const nextIndex = videoIndex1 ?? 1;
      setActiveSlot(1);
      const nextVideo = videoRef1.current;
      if (nextVideo) {
        nextVideo.currentTime = 0;
        nextVideo.play().catch(() => {});
      }
      // Prepare subsequent video index for slot 0 (lazy)
      setVideoIndex0((nextIndex + 1) % VIDEOS.length);
    } else {
      // Switch to slot 0
      setActiveSlot(0);
      const nextVideo = videoRef0.current;
      if (nextVideo) {
        nextVideo.currentTime = 0;
        nextVideo.play().catch(() => {});
      }
      // Prepare subsequent video index for slot 1
      setVideoIndex1((videoIndex0 + 1) % VIDEOS.length);
    }
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full overflow-hidden bg-[#1A1411]"
    >
      {/* Base poster layer: always present as fallback / instant paint */}
      <Image
        src={POSTER}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover select-none pointer-events-none"
      />

      {/* Videos with crossfade (unless poster-only mode or error) */}
      {!usePosterOnly && !hasError && (
        <>
          <video
            ref={videoRef0}
            src={VIDEOS[videoIndex0]}
            poster={POSTER}
            autoPlay
            muted
            playsInline
            preload="metadata"
            onPlay={handleSlot0Play}
            onEnded={() => handleEnded(0)}
            onError={handleError}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[600ms] ease-in-out pointer-events-none ${
              activeSlot === 0 ? "opacity-100" : "opacity-0"
            }`}
          />

          {videoIndex1 !== null && (
            <video
              ref={videoRef1}
              src={VIDEOS[videoIndex1]}
              poster={POSTER}
              muted
              playsInline
              preload="metadata"
              onEnded={() => handleEnded(1)}
              onError={handleError}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[600ms] ease-in-out pointer-events-none ${
                activeSlot === 1 ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </>
      )}

      {/* Overlay gradient: dark vignette top and bottom to guarantee >= 4.5:1 text contrast */}
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/60 via-black/35 to-black/75"
        style={{ mixBlendMode: "multiply" }}
      />
      <div className="absolute inset-0 pointer-events-none bg-black/20" />
    </div>
  );
}
