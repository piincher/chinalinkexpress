/**
 * Theme Store
 * 
 * Global state management for dark/light mode with cookie-based persistence.
 * SSR-safe implementation with no hydration mismatches.
 */

'use client';

import { useEffect } from 'react';
import { create } from 'zustand';
import { getCookie, setCookie } from '@/lib/cookies';
import { isClient } from '@/lib/utils';

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

const COOKIE_NAME = 'theme';

interface ThemeState {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  isInitialized: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  initialize: () => void;
}

function getSystemTheme(): ResolvedTheme {
  if (!isClient()) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function resolveTheme(theme: Theme): ResolvedTheme {
  return theme === 'system' ? getSystemTheme() : theme;
}

function applyThemeClass(resolvedTheme: ResolvedTheme): void {
  if (!isClient()) return;
  
  const root = document.documentElement;
  
  if (resolvedTheme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  
  root.setAttribute('data-theme', resolvedTheme);
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: 'system',
  resolvedTheme: 'light',
  isInitialized: false,
  
  setTheme: (theme: Theme) => {
    const resolved = resolveTheme(theme);
    
    set({ theme, resolvedTheme: resolved });
    applyThemeClass(resolved);
    setCookie(COOKIE_NAME, theme, { days: 365 });
  },
  
  toggleTheme: () => {
    const { resolvedTheme } = get();
    const newTheme = resolvedTheme === 'light' ? 'dark' : 'light';
    get().setTheme(newTheme);
  },
  
  initialize: () => {
    if (get().isInitialized || !isClient()) return;
    
    const cookieValue = getCookie(COOKIE_NAME);
    const theme: Theme = 
      cookieValue === 'light' || cookieValue === 'dark' || cookieValue === 'system'
        ? cookieValue 
        : 'system';
    
    const resolved = resolveTheme(theme);
    
    applyThemeClass(resolved);
    set({ theme, resolvedTheme: resolved, isInitialized: true });
  },
}));

// Hook to initialize theme
export function useInitTheme(): void {
  const { initialize } = useThemeStore();
  
  useEffect(() => {
    initialize();
  }, [initialize]);
}
