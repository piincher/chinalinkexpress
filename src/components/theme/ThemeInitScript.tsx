/**
 * Theme Initialization Script
 * 
 * Injects an inline script that sets the theme class BEFORE React hydration.
 * This prevents the theme flicker on page load.
 */

const THEME_SCRIPT = `
(function() {
  try {
    // Get cookie value
    const match = document.cookie.match(new RegExp('(^| )theme=([^;]+)'));
    const stored = match ? decodeURIComponent(match[2]) : null;
    
    // Validate theme value
    const theme = stored === 'light' || stored === 'dark' || stored === 'system' 
      ? stored 
      : 'system';
    
    // Resolve system theme
    const resolved = theme === 'system' 
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme;
    
    // Apply class immediately
    if (resolved === 'dark') {
      document.documentElement.classList.add('dark');
    }
    
    // Store for React sync
    window.__THEME__ = { theme, resolvedTheme: resolved };
  } catch (e) {
    // Fallback: check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
      window.__THEME__ = { theme: 'system', resolvedTheme: 'dark' };
    }
  }
})();
`;

declare global {
  interface Window {
    __THEME__?: {
      theme: 'light' | 'dark' | 'system';
      resolvedTheme: 'light' | 'dark';
    };
  }
}

export function ThemeInitScript() {
  return (
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Safe inline theme script
      dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }}
    />
  );
}
