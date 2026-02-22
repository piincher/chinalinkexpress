/**
 * Language Store
 * 
 * Global language state management using Zustand with localStorage persistence.
 * Handles language switching, RTL detection, and URL synchronization.
 * Part of the store layer for global state.
 */

'use client';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { i18nConfig, type Locale, getLocaleDirection } from '@/i18n/config';

interface LanguageState {
  // Current locale
  locale: Locale;
  
  // Actions
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  
  // Getters
  getLocaleDirection: () => 'ltr' | 'rtl';
  getLocaleLabel: () => string;
  getLocaleFlag: () => string;
}

/**
 * Get the next locale in rotation
 */
function getNextLocale(currentLocale: Locale): Locale {
  const locales = i18nConfig.locales;
  const currentIndex = locales.indexOf(currentLocale);
  const nextIndex = (currentIndex + 1) % locales.length;
  return locales[nextIndex];
}

/**
 * Language state store with localStorage persistence
 */
export const useLanguageStore = create<LanguageState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial locale from config
        locale: i18nConfig.defaultLocale,
        
        /**
         * Set a specific locale
         */
        setLocale: (locale) => {
          set({ locale }, false, 'setLocale');
        },
        
        /**
         * Toggle to the next locale in rotation
         */
        toggleLocale: () => {
          const newLocale = getNextLocale(get().locale);
          set({ locale: newLocale }, false, 'toggleLocale');
        },
        
        /**
         * Get text direction for current locale
         */
        getLocaleDirection: () => {
          return getLocaleDirection(get().locale);
        },
        
        /**
         * Get display label for current locale
         */
        getLocaleLabel: () => {
          return i18nConfig.localeLabels[get().locale].label;
        },
        
        /**
         * Get flag emoji for current locale
         */
        getLocaleFlag: () => {
          return i18nConfig.localeLabels[get().locale].flag;
        },
      }),
      {
        name: 'language-storage',
        // Only persist the locale
        partialize: (state) => ({ locale: state.locale }),
      }
    ),
    { name: 'LanguageStore' }
  )
);

export default useLanguageStore;
