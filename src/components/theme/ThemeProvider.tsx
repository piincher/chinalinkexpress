/**
 * Theme Provider
 * 
 * Client-side theme synchronization component.
 * Works with ThemeInitScript to prevent hydration flicker.
 * 
 * @example
 * ```tsx
 * <ThemeProvider>{children}</ThemeProvider>
 * ```
 */

'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/store/useThemeStore';
import { isClient } from '@/lib/utils';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { initialize } = useThemeStore();

  // Initialize theme on mount
  useEffect(() => {
    if (!isClient()) return;
    
    // Check if inline script already set the theme
    const prehydrationTheme = window.__THEME__;
    
    if (prehydrationTheme) {
      // Sync store without re-applying (already done by script)
      useThemeStore.setState({
        theme: prehydrationTheme.theme,
        resolvedTheme: prehydrationTheme.resolvedTheme,
        isInitialized: true,
      });
      delete window.__THEME__;
    } else {
      // Fallback: initialize from cookie
      initialize();
    }
  }, [initialize]);

  return <>{children}</>;
}
