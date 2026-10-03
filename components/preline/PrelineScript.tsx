"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Loads and auto-initializes Preline UI components on every client-side route change.
 */
export function PrelineScript() {
  const path = usePathname();

  useEffect(() => {
    import("preline")
      .then(() => {
        if (
          typeof window !== "undefined" &&
          (window as unknown as { HSStaticMethods?: { autoInit: () => void } }).HSStaticMethods
        ) {
          (window as unknown as { HSStaticMethods: { autoInit: () => void } }).HSStaticMethods.autoInit();
        }
      })
      .catch(() => {
        // Silent catch if in SSR/non-browser environment
      });
  }, [path]);

  return null;
}
