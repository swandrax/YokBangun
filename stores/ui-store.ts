"use client";

import { create } from "zustand";

/**
 * Ephemeral UI state. Not persisted, and never holds API data
 * (server state belongs to TanStack Query).
 */
type UiState = {
  mobileNavOpen: boolean;
  openMobileNav: () => void;
  closeMobileNav: () => void;
};

export const useUiStore = create<UiState>()((set) => ({
  mobileNavOpen: false,
  openMobileNav: () => set({ mobileNavOpen: true }),
  closeMobileNav: () => set({ mobileNavOpen: false }),
}));
