import type { Messages } from "@/lib/i18n/messages";
import { brand } from "@/lib/site";
import { AppSplashController } from "./AppSplashController";
import styles from "./AppSplash.module.css";

/**
 * Launch splash for the installed app (PWA standalone / fullscreen).
 *
 * How it stays cheap:
 * - The overlay is in the server HTML but `display: none` by default, so it is
 *   never an LCP candidate for normal browser visits.
 * - A tiny blocking script (runs before first paint) adds `yb-splash-on` to
 *   <html> only when the app was opened from the home screen, once per session.
 *   That avoids a flash of page content before the splash appears.
 * - All motion is CSS. The overlay fades itself out even if JS never hydrates;
 *   the client controller only handles skip and cleanup.
 *
 * Preview in a normal browser tab: add `?splash=1` to any URL.
 */
const bootScript = `(function(){try{var d=document.documentElement,q=new URLSearchParams(location.search),m=function(s){return window.matchMedia&&window.matchMedia(s).matches};var app=m('(display-mode: standalone)')||m('(display-mode: fullscreen)')||m('(display-mode: minimal-ui)')||navigator.standalone===true||q.get('source')==='pwa';if(q.get('splash')==='1'||(app&&!sessionStorage.getItem('yb_splash_seen'))){d.classList.add('yb-splash-on');if(m('(prefers-reduced-motion: reduce)'))d.classList.add('yb-splash-calm')}}catch(e){}})();`;

type Props = { copy: Messages["splash"] };

export function AppSplash({ copy }: Props) {
  const line1 = copy.line1.split(" ");
  const line2 = copy.line2.split(" ");

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      <div id="yb-splash" className={styles.overlay} role="presentation">
        <div className={styles.stage}>
          <div className={styles.brand}>
            <svg className={styles.mark} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
              <rect className={styles.markBg} width="32" height="32" rx="8" />
              <path className={`${styles.stroke} ${styles.strokeA}`} d="M9.6 9.6 16 18.4" pathLength={1} />
              <path className={`${styles.stroke} ${styles.strokeB}`} d="M22.4 9.6 13 24.6" pathLength={1} />
              <circle className={styles.dot} cx="23.4" cy="23.2" r="2.6" />
            </svg>
            <div className={styles.wordmark}>
              <span className={styles.name}>{brand.name}</span>
              <span className={styles.tagline}>{brand.tagline}</span>
            </div>
          </div>

          <p className={styles.headline}>
            <span className={styles.line}>
              {line1.map((word, i) => (
                <span key={`a${i}`} className={styles.word} style={{ "--i": i } as React.CSSProperties}>
                  {word}
                </span>
              ))}
            </span>
            <span className={`${styles.line} ${styles.lineAccent}`}>
              {line2.map((word, i) => (
                <span
                  key={`b${i}`}
                  className={styles.word}
                  style={{ "--i": i + line1.length } as React.CSSProperties}
                >
                  {word}
                </span>
              ))}
            </span>
          </p>
        </div>

        <span className={styles.progress} aria-hidden="true" />
        <span className={styles.skip}>{copy.skip}</span>
      </div>
      <AppSplashController />
    </>
  );
}
