"use client";

import { m, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";
import styles from "./StoryRail.module.css";

type Step = { title: string; description: string };

/**
 * Sticky storytelling rail (Motion). A progress line fills as the visitor
 * scrolls, and steps light up in sequence. Every step is always readable;
 * the highlight is an enhancement, not the only way information is shown.
 */
export function StoryRail({ steps, label }: { steps: Step[]; label: string }) {
  const ref = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(-1);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const spring = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const reduced = useReducedMotion();
  const scaleY = reduced ? scrollYProgress : spring;

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(steps.length - 1, Math.floor(value * steps.length));
    setActive(value <= 0 ? -1 : next);
  });

  return (
    <div className={styles.wrap}>
      <p className={styles.label}>{label}</p>
      <div className={styles.rail}>
        <span className={styles.track} aria-hidden="true">
          <m.span className={styles.fill} style={{ scaleY }} />
        </span>
        <ol ref={ref} role="list" className={styles.list}>
          {steps.map((step, i) => (
            <li key={step.title} className={cn(styles.step, i <= active && styles.reached)}>
              <span className={styles.marker} aria-hidden="true" />
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.description}>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
