"use client";

import { useEffect } from "react";

const ON = "yb-splash-on";
const LEAVING = "yb-splash-leaving";
const CALM = "yb-splash-calm";

/** Must match the CSS timeline in AppSplash.module.css. */
const DURATION_MS = 3600;
const DURATION_CALM_MS = 1400;
const FADE_MS = 450;

/**
 * Handles skip (tap / key) and cleanup for the launch splash.
 * The CSS already hides the overlay on its own; this just makes it tidy.
 */
export function AppSplashController() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains(ON)) return;

    try {
      sessionStorage.setItem("yb_splash_seen", "1");
    } catch {
      // Private mode or storage disabled: splash simply shows again next time.
    }

    const overlay = document.getElementById("yb-splash");
    let finished = false;
    const timers: number[] = [];

    const finish = () => {
      if (finished) return;
      finished = true;
      root.classList.add(LEAVING);
      timers.push(
        window.setTimeout(() => {
          root.classList.remove(ON, LEAVING, CALM);
        }, FADE_MS),
      );
    };

    const total = root.classList.contains(CALM) ? DURATION_CALM_MS : DURATION_MS;
    timers.push(window.setTimeout(finish, total));

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") finish();
    };
    overlay?.addEventListener("click", finish);
    window.addEventListener("keydown", onKey);

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      overlay?.removeEventListener("click", finish);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return null;
}
