/**
 * UI Store
 * 
 * Global UI state management using Zustand.
 * Part of the store layer for global state.
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UIState {
  // Mobile menu
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  openMobileMenu: () => void;

  // FAQ accordion
  activeFaq: number | null;
  setActiveFaq: (index: number | null) => void;
  toggleFaq: (index: number) => void;

  // Scroll state
  isScrolled: boolean;
  setIsScrolled: (value: boolean) => void;
}

/**
 * UI state store
 */
export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set) => ({
        // Mobile menu
        isMobileMenuOpen: false,
        toggleMobileMenu: () =>
          set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
        closeMobileMenu: () => set({ isMobileMenuOpen: false }),
        openMobileMenu: () => set({ isMobileMenuOpen: true }),

        // FAQ accordion
        activeFaq: null,
        setActiveFaq: (index) => set({ activeFaq: index }),
        toggleFaq: (index) =>
          set((state) => ({
            activeFaq: state.activeFaq === index ? null : index,
          })),

        // Scroll state
        isScrolled: false,
        setIsScrolled: (value) => set({ isScrolled: value }),
      }),
      {
        name: 'ui-storage',
        partialize: (state) => ({
          // Only persist certain fields
          activeFaq: state.activeFaq,
        }),
      }
    )
  )
);

export default useUIStore;
