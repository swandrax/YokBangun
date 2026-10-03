"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { RevealGroup, RevealItem } from "@/components/animation/Reveal";
import { cn } from "@/lib/utils/cn";
import styles from "./ProcessSteps.module.css";

type Step = { key: string; title: string; description: string };

/**
 * "How we work" steps. Each step has a short SVG rule that Anime.js draws
 * in sequence when the section enters the viewport. Motion handles the
 * list-item entrance; Anime.js only touches the <line> elements.
 */
export function ProcessSteps({ steps }: { steps: Step[] }) {
  const listRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const reduced = useReducedMotion() ?? false;
  const inView = useInView(listRef, { once: true, amount: 0.25 });
  const [armed, setArmed] = useState(false);
  const doneRef = useRef(false);

  // Hide the rules just before they are drawn (only when animation will run).
  useEffect(() => {
    if (reduced || doneRef.current) return;
    const rect = listRef.current?.getBoundingClientRect();
    // Already on screen at mount (deep link / reload): skip the effect entirely.
    if (rect && rect.top < window.innerHeight) {
      doneRef.current = true;
      return;
    }
    setArmed(true);
  }, [reduced]);

  useEffect(() => {
    if (!armed || !inView || doneRef.current) return;
    doneRef.current = true;
    let animation: { revert: () => unknown } | undefined;
    Promise.all([import("animejs/animation"), import("animejs/svg"), import("animejs/utils")]).then(
      ([{ animate }, { createDrawable }, { stagger, set }]) => {
        const lines = lineRefs.current.filter((l): l is SVGLineElement => Boolean(l));
        const drawables = createDrawable(lines);
        set(drawables, { draw: "0 0" });
        setArmed(false);
        animation = animate(drawables, {
          draw: ["0 0", "0 1"],
          duration: 720,
          ease: "inOutQuad",
          delay: stagger(110),
        });
      },
    );
    return () => {
      animation?.revert();
    };
  }, [armed, inView]);

  return (
    <div ref={listRef}>
      <RevealGroup as="ol" role="list" className={cn(styles.list, armed && styles.armed)}>
        {steps.map((step, i) => (
          <RevealItem as="li" key={step.key} className={styles.step}>
            <div className={styles.head}>
              <span className={styles.index} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <svg className={styles.rule} viewBox="0 0 100 2" preserveAspectRatio="none" aria-hidden="true">
                <line
                  ref={(el) => {
                    lineRefs.current[i] = el;
                  }}
                  x1="0"
                  y1="1"
                  x2="100"
                  y2="1"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
            <h3 className={styles.title}>{step.title}</h3>
            <p className={styles.description}>{step.description}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
