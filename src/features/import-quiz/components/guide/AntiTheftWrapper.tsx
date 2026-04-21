/**
 * AntiTheftWrapper Component
 * Protects guide content from copying, printing, and unauthorized access
 */

'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  blockShortcuts,
  detectPrint,
  detectDevTools,
  getWatermarkStyle,
  logSecurityEvent,
  disableSelection,
  generateSessionFingerprint,
} from '../../lib/guide-protection';

interface AntiTheftWrapperProps {
  children: React.ReactNode;
  watermarkText: string;
  /** Enable dev tools detection (default: true) */
  detectDevTools?: boolean;
  /** Enable print detection (default: true) */
  detectPrinting?: boolean;
  /** Enable keyboard shortcut blocking (default: true) */
  blockKeyboardShortcuts?: boolean;
  /** Enable right-click blocking (default: true) */
  blockRightClick?: boolean;
  /** Enable text selection blocking (default: true) */
  blockSelection?: boolean;
  /** Content to show when dev tools detected (optional) */
  devToolsDetectedContent?: React.ReactNode;
  /** Content to show when printing detected (optional) */
  printDetectedContent?: React.ReactNode;
  /** Additional CSS class for content area */
  className?: string;
  /** Callback when suspicious activity detected */
  onSecurityEvent?: (event: string, details: object) => void;
}

export const AntiTheftWrapper: React.FC<AntiTheftWrapperProps> = ({
  children,
  watermarkText,
  detectDevTools: enableDevToolsDetection = true,
  detectPrinting: enablePrintDetection = true,
  blockKeyboardShortcuts: enableShortcutBlocking = true,
  blockRightClick: enableRightClickBlocking = true,
  blockSelection: enableSelectionBlocking = true,
  devToolsDetectedContent,
  printDetectedContent,
  className = '',
  onSecurityEvent,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [showDevToolsWarning, setShowDevToolsWarning] = useState(false);
  const [showPrintWarning, setShowPrintWarning] = useState(false);
  const [sessionId] = useState(() => generateSessionFingerprint());

  // Log session start
  useEffect(() => {
    logSecurityEvent('guide_session_started', {
      sessionId,
      timestamp: new Date().toISOString(),
    });

    return () => {
      logSecurityEvent('guide_session_ended', {
        sessionId,
        duration: Date.now(),
      });
    };
  }, [sessionId]);

  // Block keyboard shortcuts
  useEffect(() => {
    if (!enableShortcutBlocking) return;

    const cleanup = blockShortcuts();
    return cleanup;
  }, [enableShortcutBlocking]);

  // Detect print attempts
  useEffect(() => {
    if (!enablePrintDetection) return;

    const cleanup = detectPrint(() => {
      setShowPrintWarning(true);
      onSecurityEvent?.('print_attempted', { sessionId });

      // Auto-hide after 3 seconds
      setTimeout(() => setShowPrintWarning(false), 3000);
    });

    return cleanup;
  }, [enablePrintDetection, onSecurityEvent, sessionId]);

  // Detect dev tools
  useEffect(() => {
    if (!enableDevToolsDetection) return;

    const cleanup = detectDevTools(() => {
      setShowDevToolsWarning(true);
      onSecurityEvent?.('devtools_state_changed', {
        isOpen: true,
        sessionId,
      });
    });

    return cleanup;
  }, [enableDevToolsDetection, onSecurityEvent, sessionId]);

  // Disable text selection
  useEffect(() => {
    if (!enableSelectionBlocking || !contentRef.current) return;

    const cleanup = disableSelection(contentRef.current);
    return cleanup;
  }, [enableSelectionBlocking]);

  // Handle right click
  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      if (enableRightClickBlocking) {
        e.preventDefault();
        logSecurityEvent('right_click_blocked', {
          x: e.clientX,
          y: e.clientY,
          sessionId,
        });
        onSecurityEvent?.('right_click_blocked', { sessionId });
      }
    },
    [enableRightClickBlocking, onSecurityEvent, sessionId]
  );

  // Handle drag attempts
  const handleDragStart = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      logSecurityEvent('drag_attempt_blocked', { sessionId });
      onSecurityEvent?.('drag_attempt_blocked', { sessionId });
    },
    [onSecurityEvent, sessionId]
  );

  // Handle copy attempts (additional layer)
  const handleCopy = useCallback(
    (e: React.ClipboardEvent) => {
      e.preventDefault();
      logSecurityEvent('copy_attempt_blocked', { sessionId });
      onSecurityEvent?.('copy_attempt_blocked', { sessionId });
    },
    [onSecurityEvent, sessionId]
  );

  // Handle cut attempts
  const handleCut = useCallback(
    (e: React.ClipboardEvent) => {
      e.preventDefault();
      logSecurityEvent('cut_attempt_blocked', { sessionId });
      onSecurityEvent?.('cut_attempt_blocked', { sessionId });
    },
    [onSecurityEvent, sessionId]
  );

  // Watermark style
  const watermarkStyle = getWatermarkStyle(watermarkText);

  return (
    <div
      ref={containerRef}
      className="guide-page relative"
      onContextMenu={handleContextMenu}
      onDragStart={handleDragStart}
      onCopy={handleCopy}
      onCut={handleCut}
    >
      {/* Global styles for this component */}
      <style jsx global>{`
        .guide-content {
          user-select: none !important;
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          -webkit-touch-callout: none !important;
        }

        .guide-content * {
          user-select: none !important;
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
        }

        /* Prevent image dragging */
        .guide-content img {
          -webkit-user-drag: none !important;
          -khtml-user-drag: none !important;
          -moz-user-drag: none !important;
          -o-user-drag: none !important;
          user-drag: none !important;
          pointer-events: none !important;
        }

        /* Hide on print */
        @media print {
          .guide-page {
            display: none !important;
          }
        }

        /* Disable text selection for mobile */
        @media (pointer: coarse) {
          .guide-content {
            -webkit-touch-callout: none !important;
          }
        }
      `}</style>

      {/* Watermark layer */}
      <div
        className="guide-watermark"
        style={watermarkStyle}
        aria-hidden="true"
      />

      {/* Dev tools warning overlay */}
      {showDevToolsWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          {devToolsDetectedContent || (
            <div className="max-w-md rounded-lg bg-white p-6 text-center shadow-2xl">
              <div className="mb-4 text-5xl">🔒</div>
              <h2 className="mb-2 text-xl font-bold text-gray-900">
                Developer Tools Detected
              </h2>
              <p className="text-gray-600">
                For security reasons, guide content is hidden while developer tools are open.
                Please close developer tools to continue viewing.
              </p>
              <p className="mt-4 text-xs text-gray-400">Session ID: {sessionId}</p>
            </div>
          )}
        </div>
      )}

      {/* Print warning overlay */}
      {showPrintWarning && !showDevToolsWarning && (
        <div className="pointer-events-none fixed left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-red-600 px-6 py-4 text-center text-white shadow-2xl">
          {printDetectedContent || (
            <>
              <div className="mb-2 text-3xl">🚫</div>
              <p className="font-semibold">Printing is not allowed</p>
              <p className="text-sm text-red-200">
                This content is protected and cannot be printed.
              </p>
            </>
          )}
        </div>
      )}

      {/* Main content */}
      <div
        ref={contentRef}
        className={`guide-content relative z-10 ${className}`}
        style={{
          opacity: showDevToolsWarning ? 0.1 : 1,
          filter: showDevToolsWarning ? 'blur(8px)' : 'none',
          transition: 'opacity 0.3s ease, filter 0.3s ease',
        }}
      >
        {children}
      </div>

      {/* Hidden tracking element */}
      <div
        className="sr-only"
        aria-hidden="true"
        data-session-id={sessionId}
        data-timestamp={Date.now()}
      />
    </div>
  );
};

/**
 * Lightweight version with basic protections only
 * Use this for better performance when advanced protection isn't needed
 */
export const BasicAntiTheftWrapper: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

  const handleCopy = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div
      className={`guide-page ${className}`}
      onContextMenu={handleContextMenu}
      onCopy={handleCopy}
    >
      <style jsx global>{`
        .guide-content-basic {
          user-select: none !important;
          -webkit-user-select: none !important;
        }

        @media print {
          .guide-page {
            display: none !important;
          }
        }
      `}</style>
      <div className="guide-content-basic">{children}</div>
    </div>
  );
};

export default AntiTheftWrapper;
