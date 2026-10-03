"use client";

import { m, type Variants } from "motion/react";
import type { ReactNode } from "react";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "header";
};

/** Section entrance (480ms). Server-rendered children pass straight through. */
export function Reveal({ children, className, delay = 0, y = 18, as = "div" }: RevealProps) {
  const Comp = as === "section" ? m.section : as === "header" ? m.header : m.div;
  return (
    <Comp
      className={className}
      data-reveal=""
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.48, ease: EASE_OUT, delay }}
    >
      {children}
    </Comp>
  );
}

const groupVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: EASE_OUT } },
};

type GroupProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
  role?: string;
  "aria-label"?: string;
};

/** Staggered container for cards and lists. */
export function RevealGroup({ children, className, as = "div", ...rest }: GroupProps) {
  const Comp = as === "ul" ? m.ul : as === "ol" ? m.ol : m.div;
  return (
    <Comp
      className={className}
      data-reveal=""
      variants={groupVariants}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      {...rest}
    >
      {children}
    </Comp>
  );
}

type ItemProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
  id?: string;
};

export function RevealItem({ children, className, as = "div", id }: ItemProps) {
  const Comp = as === "li" ? m.li : as === "article" ? m.article : m.div;
  return (
    <Comp className={className} id={id} data-reveal="" variants={itemVariants}>
      {children}
    </Comp>
  );
}
