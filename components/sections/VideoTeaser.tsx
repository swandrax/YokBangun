"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
import styles from "./VideoTeaser.module.css";

type Props = {
  /** Path to the teaser video (e.g. "/videos/yokbangun_teaser_20s.mp4") */
  src: string;
  /** Poster image fallback */
  poster?: string;
  /** Eyebrow label or badge */
  eyebrow?: ReactNode;
  /** Section title */
  title?: ReactNode;
  /** Section description */
  description?: ReactNode;
  /** Action buttons */
  actions?: ReactNode;
  /** Backward-compatible children if used as custom header */
  children?: ReactNode;
  /** Optional section ID */
  id?: string;
};

/**
 * Dedicated product showcase section with a separated text header
 * and an interactive, responsive 16:9 video player card below.
 * Prevents text overlapping on all viewport sizes (mobile & desktop).
 */
export function VideoTeaser({
  src,
  poster,
  eyebrow,
  title,
  description,
  actions,
  children,
  id = "teaser",
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;

    const handleCanPlay = () => setIsLoaded(true);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    // Modern autoplay with fallback
    video.play().catch(() => {
      setIsPlaying(false);
    });

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, [src]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    if (!nextMuted) {
      video.volume = 1;
    }
    setIsMuted(nextMuted);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    setProgress((video.currentTime / video.duration) * 100);
  };

  return (
    <section className={styles.section} id={id} aria-labelledby={`${id}-heading`}>
      <div className="container">
        <div className={styles.contentWrapper}>
          {/* 1. Header Text Container (Cleanly separated above video, no overlap) */}
          <div className={styles.headerBlock}>
            {children ? (
              children
            ) : (
              <>
                {eyebrow && <div className={styles.eyebrowBadge}>{eyebrow}</div>}
                {title && (
                  <h2 id={`${id}-heading`} className={styles.title}>
                    {title}
                  </h2>
                )}
                {description && <p className={styles.description}>{description}</p>}
                {actions && <div className={styles.actions}>{actions}</div>}
              </>
            )}
          </div>

          {/* 2. Dedicated Video Showcase Container */}
          <div className={styles.videoCard}>
            {/* Top window bar */}
            <div className={styles.videoCardHeader}>
              <div className={styles.windowDots} aria-hidden="true">
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
              </div>
              <div className={styles.statusPill}>
                <span className={styles.statusPulse} aria-hidden="true" />
                <span className={styles.statusText}>Live Preview • 0:20</span>
              </div>
              <div className={styles.headerSpacer} aria-hidden="true" />
            </div>

            {/* Video Viewport with 16:9 ratio */}
            <div className={styles.videoViewport}>
              <video
                ref={videoRef}
                className={`${styles.video} ${isLoaded ? styles.videoLoaded : ""}`}
                src={src}
                poster={poster}
                muted={isMuted}
                loop
                playsInline
                autoPlay
                preload="metadata"
                disablePictureInPicture
                controls={false}
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
              />

              {/* Floating controls */}
              <div className={styles.controlsBar}>
                <button
                  type="button"
                  className={styles.controlBtn}
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Jeda video teaser" : "Putar video teaser"}
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16" rx="1.5" />
                      <rect x="14" y="4" width="4" height="16" rx="1.5" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                <button
                  type="button"
                  className={styles.controlBtn}
                  onClick={toggleMute}
                  aria-label={isMuted ? "Aktifkan suara" : "Bisukan suara"}
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  ) : (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Progress Bar indicator */}
              <div className={styles.progressBarWrapper} aria-hidden="true">
                <div
                  className={styles.progressBar}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
