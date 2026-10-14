"use client";

import { useEffect } from "react";

/**
 * Registers the PWA service worker on window load.
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const handleLoad = () => {
        navigator.serviceWorker
          .register("/sw.js", { scope: "/" })
          .then((reg) => {
            reg.onupdatefound = () => {
              const installing = reg.installing;
              if (installing) {
                installing.onstatechange = () => {
                  if (
                    installing.state === "installed" &&
                    navigator.serviceWorker.controller
                  ) {
                    // New service worker update available
                  }
                };
              }
            };
          })
          .catch((err) => {
            console.warn("[PWA] SW registration failed:", err);
          });
      };

      if (document.readyState === "complete") {
        handleLoad();
      } else {
        window.addEventListener("load", handleLoad, { once: true });
        return () => window.removeEventListener("load", handleLoad);
      }
    }
  }, []);

  return null;
}
