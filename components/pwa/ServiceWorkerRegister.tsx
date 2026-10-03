"use client";

import { useEffect } from "react";

/**
 * Registers the production PWA service worker on window load.
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      process.env.NODE_ENV === "production"
    ) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((reg) => {
            reg.onupdatefound = () => {
              const installing = reg.installing;
              if (installing) {
                installing.onstatechange = () => {
                  if (
                    installing.state === "installed" &&
                    navigator.serviceWorker.controller
                  ) {
                    // Update available
                  }
                };
              }
            };
          })
          .catch((err) => {
            console.warn("[PWA] SW register skipped/failed:", err);
          });
      });
    }
  }, []);

  return null;
}
