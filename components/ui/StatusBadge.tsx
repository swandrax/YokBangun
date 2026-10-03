import { cn } from "@/lib/utils/cn";
import styles from "./StatusBadge.module.css";

export type StatusTone = "concept" | "prototype" | "pilot" | "active" | "maintenance" | "illustrative";

type Props = { tone: StatusTone; label: string; className?: string };

/** Text label + shape, so status is never communicated by colour alone. */
export function StatusBadge({ tone, label, className }: Props) {
  return (
    <span className={cn(styles.badge, styles[tone], className)}>
      <span className={styles.dot} aria-hidden="true" />
      {label}
    </span>
  );
}
