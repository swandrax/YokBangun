"use client";

import { useRef, useEffect, useState } from "react";
import styles from "./VideoTeaser.module.css";

type Props = {
  /** Path to the teaser video (e.g. "/teaser.mp4") */
  src: string;
  /** Poster image fallback */
  poster?: string;
  /** Overlay content */
  children?: React.ReactNode;
};

/**
 * Full-width section with a looping, muted background video and
 * semi-transparent overlay for readable text content on top.
 */
export function VideoTeaser({ src, poster, children }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Strictly ensure no audio / completely silent playback
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;

    const handleLoaded = () => setIsLoaded(true);
    video.addEventListener("canplay", handleLoaded);

    // Attempt autoplay (muted videos autoplay seamlessly on all modern browsers)
    video.play().catch(() => {
      // Fallback to poster image if device blocks autoplay
    });

    return () => video.removeEventListener("canplay", handleLoaded);
  }, []);

  return (
    <section className={styles.wrapper} aria-label="Video teaser">
      <video
        ref={videoRef}
        className={`${styles.video} ${isLoaded ? styles.videoLoaded : ""}`}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        disablePictureInPicture
        controls={false}
      />
      <div className={styles.overlay} />
      {children && <div className={styles.content}>{children}</div>}
    </section>
  );
}
