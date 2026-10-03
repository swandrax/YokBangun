import { brand } from "@/lib/site";
import styles from "./Logo.module.css";

type Props = { showTagline?: boolean; className?: string };

/** Inline SVG mark + wordmark. No image request, so it never affects LCP. */
export function Logo({ showTagline = true, className }: Props) {
  return (
    <span className={`${styles.logo} ${className ?? ""}`}>
      <svg className={styles.mark} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <rect width="32" height="32" rx="8" fill="currentColor" />
        <path
          d="M9.6 9.6 16 18.4M22.4 9.6 13 24.6"
          fill="none"
          stroke="#fff"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <circle cx="23.4" cy="23.2" r="2.6" fill="#E3936A" />
      </svg>
      <span className={styles.text}>
        <span className={styles.name}>{brand.name}</span>
        {showTagline && (
          <span className={styles.tagline}>
            <span aria-hidden="true">— </span>
            {brand.tagline}
          </span>
        )}
      </span>
    </span>
  );
}
