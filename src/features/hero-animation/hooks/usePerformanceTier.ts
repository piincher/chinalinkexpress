/**
 * Performance Tier Detection Hook
 * 
 * Detects device capabilities and determines the appropriate animation tier.
 * Part of the hero-animation feature.
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import type { PerformanceTier, DeviceCapabilities } from '../types';
import { PERFORMANCE_THRESHOLDS } from '../constants';

interface PerformanceMetrics {
  fps: number;
  memory: number;
  pixelCount: number;
}

function detectWebGLSupport(): { supported: boolean; version: number; maxTextureSize: number } {
  if (typeof window === 'undefined') {
    return { supported: false, version: 0, maxTextureSize: 0 };
  }

  try {
    const canvas = document.createElement('canvas');
    
    // Try WebGL2 first
    const gl2 = canvas.getContext('webgl2');
    if (gl2) {
      return { 
        supported: true, 
        version: 2, 
        maxTextureSize: gl2.getParameter(gl2.MAX_TEXTURE_SIZE) 
      };
    }
    
    // Fall back to WebGL1
    const gl1 = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl1) {
      return { 
        supported: true, 
        version: 1, 
        maxTextureSize: (gl1 as WebGLRenderingContext).getParameter((gl1 as WebGLRenderingContext).MAX_TEXTURE_SIZE) 
      };
    }
  } catch {
    // WebGL not supported
  }
  
  return { supported: false, version: 0, maxTextureSize: 0 };
}

function detectConnectionSpeed(): 'fast' | 'slow' | 'unknown' {
  if (typeof navigator === 'undefined') return 'unknown';
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const connection = (navigator as any).connection;
  
  if (!connection) return 'unknown';
  
  const effectiveType = connection.effectiveType as string | undefined;
  
  if (effectiveType === '4g') return 'fast';
  if (effectiveType === '3g' || effectiveType === '2g') return 'slow';
  
  return 'unknown';
}

function useFPSMonitor(): number {
  const [fps, setFps] = useState(60);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let frameCount = 0;
    let lastTime = performance.now();
    let rafId: number;

    const measure = () => {
      frameCount++;
      const currentTime = performance.now();
      const delta = currentTime - lastTime;

      if (delta >= 1000) {
        setFps(Math.round((frameCount * 1000) / delta));
        frameCount = 0;
        lastTime = currentTime;
      }

      rafId = requestAnimationFrame(measure);
    };

    rafId = requestAnimationFrame(measure);

    return () => cancelAnimationFrame(rafId);
  }, []);

  return fps;
}

export function usePerformanceTier(): {
  tier: PerformanceTier;
  capabilities: DeviceCapabilities;
  isReady: boolean;
} {
  const [tier, setTier] = useState<PerformanceTier>('medium');
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    tier: 'medium',
    supportsWebGL: false,
    supportsWebGL2: false,
    maxTextureSize: 0,
    isMobile: false,
    isLowPowerMode: false,
    prefersReducedMotion: false,
    connectionSpeed: 'unknown',
  });
  const [isReady, setIsReady] = useState(false);
  const fps = useFPSMonitor();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const detectCapabilities = () => {
      const webgl = detectWebGLSupport();
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const pixelCount = window.screen.width * window.screen.height;
      
      // Detect low power mode (battery API)
      let isLowPowerMode = false;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const nav = navigator as any;
      if (nav.getBattery) {
        nav.getBattery().then((battery: { charging: boolean; level: number }) => {
          isLowPowerMode = !battery.charging && battery.level < 0.2;
        }).catch(() => {
          // Battery API not available
        });
      }

      const caps: DeviceCapabilities = {
        tier: 'medium',
        supportsWebGL: webgl.supported,
        supportsWebGL2: webgl.version === 2,
        maxTextureSize: webgl.maxTextureSize,
        isMobile,
        isLowPowerMode,
        prefersReducedMotion,
        connectionSpeed: detectConnectionSpeed(),
      };

      // Determine tier based on capabilities
      let detectedTier: PerformanceTier = 'medium';

      if (prefersReducedMotion || isLowPowerMode) {
        detectedTier = 'minimal';
      } else if (!webgl.supported || fps < PERFORMANCE_THRESHOLDS.mediumTierMinFPS) {
        detectedTier = 'low';
      } else if (isMobile || pixelCount > PERFORMANCE_THRESHOLDS.highTierMaxPixels || fps < PERFORMANCE_THRESHOLDS.highTierMinFPS) {
        detectedTier = 'medium';
      } else {
        detectedTier = 'high';
      }

      // Adjust for slow connection
      if (caps.connectionSpeed === 'slow' && detectedTier === 'high') {
        detectedTier = 'medium';
      }

      caps.tier = detectedTier;
      setCapabilities(caps);
      setTier(detectedTier);
      setIsReady(true);
    };

    // Delay detection to allow for FPS stabilization
    const timeoutId = setTimeout(detectCapabilities, 500);

    return () => clearTimeout(timeoutId);
  }, [fps]);

  return { tier, capabilities, isReady };
}

export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return reducedMotion;
}
