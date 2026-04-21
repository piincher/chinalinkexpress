/**
 * Guide Protection Utilities
 * 
 * Anti-theft, anti-copy, and security utilities for the personalized guide.
 */

import { CSSProperties } from 'react';

/**
 * Log security events for monitoring
 */
export function logSecurityEvent(
  event: string,
  details: Record<string, unknown> = {}
): void {
  const logEntry = {
    event,
    timestamp: new Date().toISOString(),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
    url: typeof window !== 'undefined' ? window.location.href : 'unknown',
    ...details,
  };

  // Send to analytics endpoint (non-blocking)
  if (typeof window !== 'undefined') {
    fetch('/api/analytics/security', {
      method: 'POST',
      body: JSON.stringify(logEntry),
      keepalive: true,
    }).catch(() => {
      // Silently fail - don't block user
    });
  }

  // Also log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.warn('[Security Event]', logEntry);
  }
}

/**
 * Block common keyboard shortcuts for copying/saving/printing
 * Returns cleanup function
 */
export function blockShortcuts(): () => void {
  if (typeof window === 'undefined') return () => {};

  const blockedKeys = new Set([
    'c', // Ctrl+C
    'x', // Ctrl+X
    's', // Ctrl+S
    'p', // Ctrl+P
    'a', // Ctrl+A
    'u', // Ctrl+U (view source)
  ]);

  const blockedCodes = new Set([
    'F12', // Dev tools
    'PrintScreen',
  ]);

  const handler = (e: KeyboardEvent) => {
    // Block Ctrl/Cmd + key combinations
    if ((e.ctrlKey || e.metaKey) && blockedKeys.has(e.key.toLowerCase())) {
      e.preventDefault();
      logSecurityEvent('shortcut_blocked', { key: e.key, ctrl: e.ctrlKey });
      return false;
    }

    // Block specific keys
    if (blockedCodes.has(e.code)) {
      e.preventDefault();
      logSecurityEvent('key_blocked', { code: e.code });
      return false;
    }
  };

  window.addEventListener('keydown', handler, true);

  // Return cleanup function
  return () => {
    window.removeEventListener('keydown', handler, true);
  };
}

/**
 * Detect print attempts
 */
export function detectPrint(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};

  // Method 1: Media query
  const mediaQuery = window.matchMedia('print');
  const mediaHandler = (e: MediaQueryListEvent) => {
    if (e.matches) callback();
  };
  mediaQuery.addEventListener('change', mediaHandler);

  // Method 2: beforeprint event
  const beforePrint = () => callback();
  window.addEventListener('beforeprint', beforePrint);

  // Method 3: Watch for print dialog shortcuts (already blocked in blockShortcuts)

  return () => {
    mediaQuery.removeEventListener('change', mediaHandler);
    window.removeEventListener('beforeprint', beforePrint);
  };
}

/**
 * Generate watermark style for React CSS-in-JS
 */
export function getWatermarkStyle(text: string): CSSProperties {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200">
      <text x="50%" y="50%" 
            font-family="system-ui, sans-serif" 
            font-size="14" 
            fill="#000000" 
            opacity="0.04"
            text-anchor="middle"
            dominant-baseline="middle"
            transform="rotate(-30, 200, 100)">
        ${text}
      </text>
    </svg>
  `;

  const encoded = typeof window !== 'undefined' 
    ? btoa(svg) 
    : Buffer.from(svg).toString('base64');

  return {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url("data:image/svg+xml;base64,${encoded}")`,
    backgroundRepeat: 'repeat',
    pointerEvents: 'none',
    zIndex: 9999,
    userSelect: 'none',
  };
}

/**
 * Generate watermark CSS for use in styled-components or CSS files
 */
export function getWatermarkCSS(text: string): string {
  return `
    .guide-watermark::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: repeating-linear-gradient(
        -30deg,
        transparent,
        transparent 150px,
        rgba(0, 0, 0, 0.02) 150px,
        rgba(0, 0, 0, 0.02) 300px
      );
      pointer-events: none;
      z-index: 9999;
    }
  `;
}

/**
 * Detect if developer tools are open
 * Note: This is not foolproof but adds friction
 */
export function detectDevTools(
  onDetect: () => void
): () => void {
  if (typeof window === 'undefined') return () => {};

  let detected = false;
  const threshold = 160;

  const check = () => {
    if (detected) return;

    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;

    if (widthThreshold || heightThreshold) {
      detected = true;
      onDetect();
      logSecurityEvent('devtools_detected', {
        widthDiff: window.outerWidth - window.innerWidth,
        heightDiff: window.outerHeight - window.innerHeight,
      });
    }
  };

  // Check periodically
  const interval = setInterval(check, 1000);
  window.addEventListener('resize', check);

  return () => {
    clearInterval(interval);
    window.removeEventListener('resize', check);
  };
}

/**
 * Disable text selection programmatically
 */
export function disableSelection(element: HTMLElement): void {
  element.style.userSelect = 'none';
  (element.style as any).webkitUserSelect = 'none';
  (element.style as any).mozUserSelect = 'none';
  (element.style as any).msUserSelect = 'none';
  (element.style as any).webkitTouchCallout = 'none';
}

/**
 * Generate a unique session fingerprint for tracking
 */
export function generateSessionFingerprint(): string {
  if (typeof window === 'undefined') return 'server';

  const components = [
    navigator.userAgent,
    navigator.language,
    screen.colorDepth,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset(),
  ];

  return btoa(components.join('|')).slice(0, 16);
}

/**
 * Add invisible tracking text for leak detection
 * Uses zero-width characters to embed user ID invisibly
 */
export function addTrackingText(userId: string): string {
  // Convert userId to binary and use zero-width characters
  const binary = userId
    .split('')
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join('');

  const zeroWidthChars = binary
    .split('')
    .map((bit) => (bit === '0' ? '\u200B' : '\u200C'))
    .join('');

  return zeroWidthChars;
}
