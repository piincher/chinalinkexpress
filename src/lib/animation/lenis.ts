/**
 * Lenis Smooth Scroll Instance Management
 * 
 * Provides a singleton Lenis instance for consistent smooth scrolling
 * across the application with GSAP ScrollTrigger integration.
 * 
 * Features:
 * - Singleton pattern for single instance management
 * - Automatic GSAP ScrollTrigger integration when available
 * - Reduced motion support
 * - React StrictMode safe (handles double mount)
 */

import Lenis from 'lenis';

// Global Lenis instance
let lenisInstance: Lenis | null = null;

// Track if reduced motion is preferred
let prefersReducedMotion = false;

// Track RAF ID for cleanup
let rafId: number | null = null;

// Track if initialized
let isInitialized = false;

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

// Store GSAP references for integration
let gsapRef: GSAPInstance | null = null;
let scrollTriggerRef: ScrollTriggerInstance | null = null;

/**
 * Check if user prefers reduced motion
 */
function checkReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Default Lenis options
 */
const defaultOptions: ConstructorParameters<typeof Lenis>[0] = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
  infinite: false,
};

/**
 * Initialize Lenis instance
 * 
 * @param options - Lenis configuration options
 * @returns Lenis instance
 */
export function initLenis(options?: ConstructorParameters<typeof Lenis>[0]): Lenis {
  // Check for reduced motion preference
  prefersReducedMotion = checkReducedMotion();
  
  // If reduced motion is preferred, return a minimal mock instance
  if (prefersReducedMotion) {
    return createReducedMotionMock();
  }

  // Return existing instance if already initialized
  if (lenisInstance && isInitialized) {
    return lenisInstance;
  }

  // Create new Lenis instance
  lenisInstance = new Lenis({
    ...defaultOptions,
    ...options,
  });

  isInitialized = true;

  // Start the RAF loop
  startRaf();

  // Setup GSAP integration if available
  setupGsapIntegration();

  return lenisInstance;
}

/**
 * Create a mock Lenis instance for reduced motion preference
 */
function createReducedMotionMock(): Lenis {
  const mock = {
    raf: () => {},
    destroy: () => {},
    scrollTo: () => {},
    on: () => mock,
    off: () => mock,
    stop: () => {},
    start: () => {},
  } as unknown as Lenis;

  return mock;
}

/**
 * Start the RequestAnimationFrame loop for Lenis
 */
function startRaf(): void {
  if (rafId !== null) return;
  
  function raf(time: number) {
    lenisInstance?.raf(time);
    rafId = requestAnimationFrame(raf);
  }
  
  rafId = requestAnimationFrame(raf);
}

/**
 * Stop the RequestAnimationFrame loop
 */
function stopRaf(): void {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

/**
 * Setup GSAP ScrollTrigger integration
 * This is called automatically when GSAP is available
 */
export function setupGsapIntegration(): void {
  if (!lenisInstance) return;
  
  // Check if GSAP and ScrollTrigger are available on window
  if (typeof window !== 'undefined') {
    const win = window as unknown as { 
      gsap?: GSAPInstance;
      ScrollTrigger?: ScrollTriggerInstance;
    };
    
    if (win.gsap && win.ScrollTrigger) {
      gsapRef = win.gsap;
      scrollTriggerRef = win.ScrollTrigger;
      
      // Update ScrollTrigger on Lenis scroll
      lenisInstance.on('scroll', () => {
        scrollTriggerRef?.update();
      });
      
      // Tell ScrollTrigger to use Lenis's scroll values
      gsapRef.ticker.add((time: number) => {
        lenisInstance?.raf(time * 1000);
      });
      
      gsapRef.ticker.lagSmoothing(0);
    }
  }
}

/**
 * Manually register GSAP for integration
 * Call this if GSAP is loaded after Lenis initialization
 * 
 * @param gsap - GSAP instance
 * @param ScrollTrigger - ScrollTrigger plugin
 */
export function registerGsap(
  gsap: GSAPInstance,
  ScrollTrigger: ScrollTriggerInstance
): void {
  gsapRef = gsap;
  scrollTriggerRef = ScrollTrigger;
  
  if (lenisInstance && ScrollTrigger) {
    // Update ScrollTrigger on Lenis scroll
    lenisInstance.on('scroll', () => {
      ScrollTrigger.update();
    });
    
    // Tell ScrollTrigger to use Lenis's scroll values
    gsap.ticker.add((time: number) => {
      lenisInstance?.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);
  }
}

/**
 * Get the current Lenis instance
 * 
 * @returns Lenis instance or null if not initialized
 */
export function getLenis(): Lenis | null {
  return lenisInstance;
}

/**
 * Destroy Lenis instance and cleanup
 */
export function destroyLenis(): void {
  stopRaf();
  
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
  
  gsapRef = null;
  scrollTriggerRef = null;
  isInitialized = false;
}

/**
 * Scroll to a target position
 * 
 * @param target - Target element or position
 * @param options - Scroll options
 */
export function scrollTo(
  target: string | number | HTMLElement,
  options?: {
    offset?: number;
    duration?: number;
    easing?: (t: number) => number;
    onComplete?: () => void;
  }
): void {
  if (!lenisInstance) return;
  
  lenisInstance.scrollTo(target, {
    offset: options?.offset ?? 0,
    duration: options?.duration ?? 1.2,
    easing: options?.easing,
    onComplete: options?.onComplete,
  });
}

/**
 * Check if Lenis is initialized
 */
export function isLenisInitialized(): boolean {
  return isInitialized && lenisInstance !== null;
}

/**
 * Check if reduced motion is preferred
 */
export function isReducedMotion(): boolean {
  return prefersReducedMotion;
}

/**
 * Stop Lenis scrolling (useful for modal overlays)
 */
export function stopLenis(): void {
  lenisInstance?.stop();
}

/**
 * Resume Lenis scrolling
 */
export function startLenis(): void {
  lenisInstance?.start();
}
