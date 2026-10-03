import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import styles from "./SectionHeader.module.css";

type Props = {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  as?: "h1" | "h2";
  align?: "start" | "split";
  children?: ReactNode;
  className?: string;
};

/**
 * Consistent section heading. "split" puts the description beside the title
 * on wide screens, an editorial layout that avoids walls of centred text.
 */
export function SectionHeader({
  id,
  eyebrow,
  title,
  description,
  as: Heading = "h2",
  align = "start",
  children,
  className,
}: Props) {
  return (
    <header className={cn(styles.header, align === "split" && styles.split, className)}>
      <div className={styles.titleBlock}>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <Heading id={id} className={Heading === "h1" ? styles.h1 : styles.h2}>
          {title}
        </Heading>
      </div>
      {(description || children) && (
        <div className={styles.aside}>
          {description && <p className={styles.description}>{description}</p>}
          {children}
        </div>
      )}
    </header>
  );
}
