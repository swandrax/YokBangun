"use client";

import { useEffect } from "react";

const ON = "yb-splash-on";
const LEAVING = "yb-splash-leaving";
const CALM = "yb-splash-calm";

/** Total duration: 4.0 seconds (4000ms), followed by a 450ms fade out. */
const DURATION_MS = 4000;
const DURATION_CALM_MS = 1600;
const FADE_MS = 450;

/**
 * Handles skip (tap anywhere / key press) and clean removal for the launch splash.
 * The CSS handles animation and auto-hiding; this ensures clean class cleanup and state persistence.
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
    overlay?.addEventListener("touchend", finish);
    window.addEventListener("keydown", onKey);

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      overlay?.removeEventListener("click", finish);
      overlay?.removeEventListener("touchend", finish);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return null;
}
