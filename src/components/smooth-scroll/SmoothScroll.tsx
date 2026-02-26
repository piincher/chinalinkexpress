'use client';

/**
 * SmoothScroll Component
 * 
 * Initializes Lenis smooth scrolling for the application.
 * Integrates with GSAP ScrollTrigger when available.
 * Respects prefers-reduced-motion for accessibility.
 * 
 * Features:
 * - Automatic Lenis initialization
 * - GSAP ScrollTrigger integration
 * - React StrictMode safe (handles double mount/unmount)
 * - Cleanup on unmount
 * - Reduced motion support
 * 
 * @example
 * ```tsx
 * import { SmoothScroll } from '@/components/smooth-scroll';
 * 
 * <SmoothScroll>
 *   <App />
 * </SmoothScroll>
 * ```
 */

import { ReactNode, useEffect, useRef } from 'react';
import Lenis from 'lenis';

// GSAP type definitions (loose typing to avoid conflicts)
type GSAPInstance = {
  ticker: {
    add: (callback: (time: number) => void) => void;
    lagSmoothing: (value: number) => void;
  };
};

type ScrollTriggerInstance = {
  update: () => void;
};

export interface SmoothScrollProps {
  children: ReactNode;
  options?: {
    duration?: number;
    easing?: (t: number) => number;
    orientation?: 'vertical' | 'horizontal';
    gestureOrientation?: 'vertical' | 'horizontal' | 'both';
    smoothWheel?: boolean;
    wheelMultiplier?: number;
    touchMultiplier?: number;
    infinite?: boolean;
  };
}

export function SmoothScroll({ children, options }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    // Prevent double initialization in React StrictMode
    if (isInitializedRef.current) return;
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Respect user preference - no smooth scrolling
      return;
    }

    // Mark as initialized
    isInitializedRef.current = true;

    // Initialize Lenis with options
    lenisRef.current = new Lenis({
      duration: options?.duration ?? 1.2,
      easing: options?.easing ?? ((t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
      orientation: options?.orientation ?? 'vertical',
      gestureOrientation: options?.gestureOrientation ?? 'vertical',
      smoothWheel: options?.smoothWheel ?? true,
      wheelMultiplier: options?.wheelMultiplier ?? 1,
      touchMultiplier: options?.touchMultiplier ?? 2,
      infinite: options?.infinite ?? false,
    });

    // Setup GSAP integration
    setupGsapIntegration();

    // Start the animation frame loop
    function raf(time: number) {
      lenisRef.current?.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }
    
    rafRef.current = requestAnimationFrame(raf);

    // Cleanup function
    return () => {
      // Cancel RAF
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      // Destroy Lenis instance
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }

      // Reset initialization flag
      isInitializedRef.current = false;
    };
  }, [options?.duration, options?.easing, options?.orientation, options?.gestureOrientation, options?.smoothWheel, options?.wheelMultiplier, options?.touchMultiplier, options?.infinite]);

  /**
   * Setup GSAP ScrollTrigger integration
   * Works whether GSAP is loaded before or after Lenis
   */
  function setupGsapIntegration() {
    if (!lenisRef.current) return;

    // Try to find GSAP on window
    const win = window as unknown as { 
      gsap?: GSAPInstance;
      ScrollTrigger?: ScrollTriggerInstance;
    };

    if (win.gsap && win.ScrollTrigger) {
      const { gsap, ScrollTrigger } = win;

      // Update ScrollTrigger on Lenis scroll
      lenisRef.current.on('scroll', () => {
        ScrollTrigger.update();
      });

      // Tell GSAP ticker to use Lenis
      gsap.ticker.add((time: number) => {
        lenisRef.current?.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    } else {
      // GSAP not loaded yet, try again after a short delay
      // This handles cases where GSAP is loaded dynamically
      const checkGsap = () => {
        if (win.gsap && win.ScrollTrigger && lenisRef.current) {
          const { gsap, ScrollTrigger } = win;

          lenisRef.current.on('scroll', () => {
            ScrollTrigger.update();
          });

          gsap.ticker.add((time: number) => {
            lenisRef.current?.raf(time * 1000);
          });

          gsap.ticker.lagSmoothing(0);
        }
      };

      // Try immediately and after a short delay
      checkGsap();
      setTimeout(checkGsap, 100);
      setTimeout(checkGsap, 500);
    }
  }

  return <>{children}</>;
}

export default SmoothScroll;
