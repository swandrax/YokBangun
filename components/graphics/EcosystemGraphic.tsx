"use client";

import { m, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";
import styles from "./EcosystemGraphic.module.css";

type NodeKey = "business" | "product" | "customer" | "ai" | "data" | "operations" | "maintenance" | "growth";

export type EcosystemLabels = {
  label: string;
  stagesLabel: string;
  center: string;
  nodes: Record<NodeKey, string>;
  stages: { key: string; label: string; description: string }[];
};

type AnimeAnimation = { pause: () => unknown; play: () => unknown; revert: () => unknown };
type AnimateFn = (targets: Element | Element[], params: Record<string, unknown>) => AnimeAnimation;

/* Geometry: nodes sit on an ellipse (centre 300,220 · rx 210 · ry 160), clockwise:
   Business → Product → Customer → AI → Data → Operations → Maintenance → Growth → Business */
const CX = 300;
const CY = 220;
const LOOP_PATH = "M90 220 A210 160 0 0 1 510 220 A210 160 0 0 1 90 220";

const NODES: {
  key: NodeKey;
  x: number;
  y: number;
  stage: number;
  lx: number;
  ly: number;
  anchor: "start" | "middle" | "end";
}[] = [
  { key: "business", x: 90, y: 220, stage: 0, lx: -20, ly: 5, anchor: "end" },
  { key: "product", x: 151.5, y: 106.9, stage: 1, lx: -16, ly: -14, anchor: "end" },
  { key: "customer", x: 300, y: 60, stage: 1, lx: 0, ly: -22, anchor: "middle" },
  { key: "ai", x: 448.5, y: 106.9, stage: 2, lx: 16, ly: -14, anchor: "start" },
  { key: "data", x: 510, y: 220, stage: 2, lx: 20, ly: 5, anchor: "start" },
  { key: "operations", x: 448.5, y: 333.1, stage: 2, lx: 16, ly: 26, anchor: "start" },
  { key: "maintenance", x: 300, y: 380, stage: 3, lx: 0, ly: 34, anchor: "middle" },
  { key: "growth", x: 151.5, y: 333.1, stage: 4, lx: -16, ly: 26, anchor: "end" },
];

const DOT_COUNT = 3;
const CYCLE_MS = 2800;

function spoke(x: number, y: number) {
  const dx = x - CX;
  const dy = y - CY;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  return { x1: CX + ux * 52, y1: CY + uy * 52, x2: x - ux * 14, y2: y - uy * 14 };
}

/**
 * Hero ecosystem visual. SVG + CSS + Anime.js (no WebGL).
 * - The SVG is server-rendered, so it occupies its space immediately (no CLS).
 * - Anime.js is dynamically imported only when the graphic is visible and
 *   reduced motion is not requested, so it never blocks first render.
 * - Animations pause when the graphic leaves the viewport.
 * - Motion (parallax) animates the wrapper; Anime.js animates inner SVG
 *   elements. They never touch the same element.
 */
export function EcosystemGraphic({ labels }: { labels: EcosystemLabels }) {
  const titleId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const loopRef = useRef<SVGPathElement>(null);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const pulseRefs = useRef<(SVGCircleElement | null)[]>([]);
  const animsRef = useRef<AnimeAnimation[]>([]);
  const animateRef = useRef<AnimateFn | null>(null);

  const reduced = useReducedMotion() ?? false;
  const inView = useInView(rootRef, { amount: 0.15 });

  const [stage, setStage] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [animReady, setAnimReady] = useState(false);

  // Gentle parallax on the wrapper only.
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, reduced ? 0 : -28]);

  // Auto-advance stages while visible, unless the visitor has taken control.
  useEffect(() => {
    if (reduced || !inView || hovered || pinned) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setStage((s: number) => (s + 1) % labels.stages.length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduced, inView, hovered, pinned, labels.stages.length]);

  // Load Anime.js lazily, start/resume when visible, pause when not.
  useEffect(() => {
    if (reduced || !inView) return;
    let cancelled = false;

    if (animsRef.current.length) {
      animsRef.current.forEach((a: AnimeAnimation) => a.play());
    } else {
      Promise.all([import("animejs/animation"), import("animejs/svg")]).then(([animation, svg]) => {
        if (cancelled || !loopRef.current) return;
        const animate = animation.animate as unknown as AnimateFn;
        animateRef.current = animate;
        const narrow = window.matchMedia("(max-width: 640px)").matches;
        const count = narrow ? 1 : DOT_COUNT;
        const path = svg.createMotionPath(loopRef.current, 0.0001);
        if (!path) return;
        animsRef.current = dotRefs.current.slice(0, count).flatMap((dot: SVGCircleElement | null, i: number) => {
          if (!dot) return [];
          const offsetPath = svg.createMotionPath(loopRef.current!, i / count + 0.0001);
          if (!offsetPath) return [];
          return [
            animate(dot, {
              translateX: offsetPath.translateX,
              translateY: offsetPath.translateY,
              duration: 18000,
              ease: "linear",
              loop: true,
            }),
          ];
        });
        setAnimReady(true);
      });
    }

    return () => {
      cancelled = true;
      animsRef.current.forEach((a: AnimeAnimation) => a.pause());
    };
  }, [reduced, inView]);

  // Soft pulse on the nodes of the active stage.
  useEffect(() => {
    const animate = animateRef.current;
    if (!animate || reduced || !inView) return;
    const targets = NODES.flatMap((n, i) => (n.stage === stage && pulseRefs.current[i] ? [pulseRefs.current[i]!] : []));
    if (!targets.length) return;
    const pulse = animate(targets, { scale: [1, 2.4], opacity: [0.35, 0], duration: 1400, ease: "outQuad" });
    return () => {
      pulse.pause();
    };
  }, [stage, reduced, inView, animReady]);

  // Full cleanup on unmount.
  useEffect(() => {
    return () => {
      animsRef.current.forEach((a: AnimeAnimation) => a.revert());
      animsRef.current = [];
    };
  }, []);

  const selectStage = useCallback((index: number) => {
    setStage(index);
    setPinned(true);
  }, []);

  const activeStage = labels.stages[stage];

  return (
    <div
      ref={rootRef}
      className={styles.root}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <m.div className={styles.canvas} style={{ y }}>
        <svg
          className={cn(styles.svg, animReady && styles.ready)}
          viewBox="0 0 600 440"
          role="img"
          aria-labelledby={titleId}
        >
          <title id={titleId}>{labels.label}</title>

          <path ref={loopRef} d={LOOP_PATH} className={styles.loop} />

          <g aria-hidden="true">
            {NODES.map((n) => {
              const s = spoke(n.x, n.y);
              return (
                <line
                  key={n.key}
                  {...s}
                  className={cn(styles.spoke, n.stage === stage && styles.spokeActive)}
                />
              );
            })}
          </g>

          <g aria-hidden="true">
            {Array.from({ length: DOT_COUNT }, (_, i) => (
              <circle
                key={i}
                ref={(el: SVGCircleElement | null) => {
                  dotRefs.current[i] = el;
                }}
                r={i === 0 ? 4.5 : 3.5}
                className={cn(styles.dot, i === 0 && styles.dotAccent)}
              />
            ))}
          </g>

          <g aria-hidden="true" className={styles.center}>
            <circle cx={CX} cy={CY} r={48} className={styles.centerDisc} />
            <text x={CX} y={CY - 3} textAnchor="middle" className={styles.centerText}>
              {labels.center.split(" ").slice(0, 1).join(" ")}
            </text>
            <text x={CX} y={CY + 15} textAnchor="middle" className={styles.centerText}>
              {labels.center.split(" ").slice(1).join(" ")}
            </text>
          </g>

          <g aria-hidden="true">
            {NODES.map((n, i) => {
              const active = n.stage === stage;
              return (
                <g
                  key={n.key}
                  transform={`translate(${n.x} ${n.y})`}
                  className={cn(styles.node, active && styles.active)}
                  onMouseEnter={() => setStage(n.stage)}
                  onClick={() => selectStage(n.stage)}
                >
                  <circle
                    ref={(el: SVGCircleElement | null) => {
                      pulseRefs.current[i] = el;
                    }}
                    r={10}
                    className={styles.pulse}
                  />
                  <circle r={20} className={styles.halo} />
                  <circle r={9} className={styles.core} />
                  <text x={n.lx} y={n.ly} textAnchor={n.anchor} className={styles.label}>
                    {labels.nodes[n.key]}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </m.div>

      <div className={styles.stages}>
        <p className="visually-hidden" id={`${titleId}-stages`}>
          {labels.stagesLabel}
        </p>
        <ol role="list" className={styles.stageList} aria-labelledby={`${titleId}-stages`}>
          {labels.stages.map((s, i) => (
            <li key={s.key}>
              <button
                type="button"
                className={cn(styles.stageButton, i === stage && styles.stageActive)}
                aria-pressed={i === stage}
                onClick={() => selectStage(i)}
              >
                <span className={styles.stageIndex} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.label}
              </button>
            </li>
          ))}
        </ol>
        {activeStage && <p className={styles.stageDescription}>{activeStage.description}</p>}
      </div>
    </div>
  );
}
