"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// Animation features are code-split and loaded after hydration.
const loadFeatures = () => import("./motion-features").then((mod) => mod.default);

/**
 * LazyMotion keeps the initial Motion payload small (`m` components only).
 * reducedMotion="user" disables transform/layout animation for visitors who
 * request reduced motion; opacity fades remain.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
