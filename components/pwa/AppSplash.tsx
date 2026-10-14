import type { Messages } from "@/lib/i18n/messages";
import { brand } from "@/lib/site";
import { AppSplashController } from "./AppSplashController";
import styles from "./AppSplash.module.css";

/**
 * Launch splash screen for PWA (standalone) and mobile app migration (WebView).
 *
 * Sequence:
 * - 0.0s - 2.0s: Loader / Brand mark animation with rotating loader ring.
 * - 2.0s: Text appears: "Bangun digitalnya. Tumbuh usahanya."
 * - 4.0s: Overlay fades out into the main application.
 *
 * Can also be skipped at any moment by tapping anywhere on the screen.
 * Test in browser: add `?splash=1` to the URL.
 */
const bootScript = `(function(){try{var d=document.documentElement,q=new URLSearchParams(location.search),m=function(s){return window.matchMedia&&window.matchMedia(s).matches};var ua=navigator.userAgent||'';var isMobileApp=/yokBangunMobile|ReactNative|wv|Expo/i.test(ua)||window.ReactNativeWebView!==undefined||q.get('source')==='mobile'||q.get('source')==='app';var isPwa=m('(display-mode: standalone)')||m('(display-mode: fullscreen)')||m('(display-mode: minimal-ui)')||navigator.standalone===true||q.get('source')==='pwa'||q.get('pwa')==='1';var force=q.get('splash')==='1';var seen=sessionStorage.getItem('yb_splash_seen');if(force||((isPwa||isMobileApp)&&!seen)){d.classList.add('yb-splash-on');if(m('(prefers-reduced-motion: reduce)'))d.classList.add('yb-splash-calm')}}catch(e){}})();`;

type Props = { copy: Messages["splash"] };

export function AppSplash({ copy }: Props) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      <div id="yb-splash" className={styles.overlay} role="presentation">
        <div className={styles.stage}>
          {/* Brand & Loader Ring (0.0s - 2.0s) */}
          <div className={styles.brand}>
            <div className={styles.markWrapper}>
              <div className={styles.loaderRing} aria-hidden="true" />
              <svg className={styles.mark} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
                <rect className={styles.markBg} width="32" height="32" rx="8" />
                <path className={`${styles.stroke} ${styles.strokeA}`} d="M9.6 9.6 16 18.4" pathLength={1} />
                <path className={`${styles.stroke} ${styles.strokeB}`} d="M22.4 9.6 13 24.6" pathLength={1} />
                <circle className={styles.dot} cx="23.4" cy="23.2" r="2.6" />
              </svg>
            </div>
            <div className={styles.wordmark}>
              <span className={styles.name}>{brand.name}</span>
              <span className={styles.tagline}>{brand.tagline}</span>
            </div>
          </div>

          {/* Headline Text: appears at 2.0s */}
          <div className={styles.headline}>
            <span className={styles.line1}>{copy.line1}</span>
            <span className={styles.line2}>{copy.line2}</span>
          </div>
        </div>

        {/* Progress bar (completes at 4.0s) */}
        <span className={styles.progress} aria-hidden="true" />
        <span className={styles.skip}>{copy.skip}</span>
      </div>
      <AppSplashController />
    </>
  );
}
