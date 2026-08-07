/**
 * useAnimationActivation Hook
 * 
 * Viewport-aware activation with delay for entrance animations.
 * Uses framer-motion's useInView for efficient viewport detection.
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

export interface UseAnimationActivationOptions {
  /** Threshold for intersection (0-1) */
  threshold?: number;
  /** Root margin for intersection detection */
  rootMargin?: string;
  /** Delay before activation in ms */
  delay?: number;
  /** Whether to deactivate when off-screen */
  deactivateOnExit?: boolean;
}

export interface UseAnimationActivationReturn {
  /** Ref to attach to the element */
  ref: React.RefObject<HTMLDivElement | null>;
  /** Whether the animation should be active */
  isActive: boolean;
  /** Whether the element is currently in view */
  isInView: boolean;
}

/**
 * Hook for viewport-aware animation activation
 * 
 * @example
 * const { ref, isActive } = useAnimationActivation({ threshold: 0.1 });
 * 
 * return (
 *   <div ref={ref}>
 *     <motion.div animate={isActive ? 'visible' : 'hidden'} />
 *   </div>
 * );
 */
export function useAnimationActivation(
  options: UseAnimationActivationOptions = {}
): UseAnimationActivationReturn {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    delay = 100,
    /*
     * Default flipped from true.
     *
     * With `deactivateOnExit: true`, every section this hook drives faded back
     * out the moment it left the viewport and re-animated on the way back — so
     * scrolling up the page replayed the whole document, and any reader who
     * scrolls past something and returns to check it watched it assemble
     * itself again. Fourteen files used the default.
     *
     * An entrance is a first impression; playing it repeatedly is what makes a
     * long page feel restless. This now matches the GSAP `Reveal` primitive in
     * src/components/motion, which plays once and stays.
     *
     * Callers that genuinely want a re-triggering animation can still opt in by
     * passing `deactivateOnExit: true` explicitly.
     */
    deactivateOnExit = false,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    amount: threshold,
    margin: rootMargin as `${number}px`,
  });
  const [isActive, setIsActive] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isInView) {
      // Activate with delay when entering viewport
      timeoutRef.current = setTimeout(() => {
        setIsActive(true);
      }, delay);
    } else if (deactivateOnExit) {
      // Deactivate immediately when leaving viewport
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setIsActive(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isInView, delay, deactivateOnExit]);

  return { ref, isActive, isInView };
}

export default useAnimationActivation;
