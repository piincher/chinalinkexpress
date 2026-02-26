/**
 * Smooth Scroll Components
 * 
 * Exports Lenis smooth scroll components and utilities.
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

export { SmoothScroll, type SmoothScrollProps } from './SmoothScroll';

// Re-export Lenis utilities for convenience
export {
  initLenis,
  getLenis,
  destroyLenis,
  scrollTo,
  registerGsap,
  isLenisInitialized,
  isReducedMotion,
  stopLenis,
  startLenis,
} from '@/lib/animation/lenis';
