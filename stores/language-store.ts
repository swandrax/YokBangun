"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { defaultLocale, type Locale } from "@/lib/i18n/config";

/**
 * Language PREFERENCE (client UI state only).
 *
 * The URL is the source of truth for what is rendered (/services vs /en/services),
 * so server components can render the right language with zero client JS.
 * This store remembers the visitor's explicit choice in localStorage so a
 * returning visitor lands in the language they picked last time.
 */
type LanguageState = {
  language: Locale;
  /** True only after the visitor explicitly used the language switcher. */
  hasChosen: boolean;
  setLanguage: (language: Locale) => void;
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: defaultLocale,
      hasChosen: false,
      setLanguage: (language) => set({ language, hasChosen: true }),
    }),
    {
      name: "yb-language",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ language: state.language, hasChosen: state.hasChosen }),
    },
  ),
);
