import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Icon } from "./Icon";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "text";
type Size = "md" | "lg";

type Common = {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  children: ReactNode;
  className?: string;
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(styles.button, styles[variant], styles[size], className);
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  arrow = false,
  children,
  className,
  ...rest
}: Common & Omit<ComponentProps<typeof Link>, "className" | "children">) {
  return (
    <Link className={buttonClass(variant, size, className)} {...rest}>
      <span>{children}</span>
      {arrow && <Icon name="arrowRight" className={styles.arrow} />}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  arrow = false,
  children,
  className,
  ...rest
}: Common & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={buttonClass(variant, size, className)} {...rest}>
      <span>{children}</span>
      {arrow && <Icon name="arrowRight" className={styles.arrow} />}
    </button>
  );
}
