/**
 * useAnimationActivation
 * 
 * A hook for triggering animations based on scroll position and viewport intersection.
 * Combines Intersection Observer with additional activation controls.
 */

'use client';

import { useRef, useState, useEffect, useCallback } from 'react';

interface UseAnimationActivationOptions {
  /** Trigger animation only once (default: true) */
  once?: boolean;
  /** Intersection threshold (0-1, default: 0.5) */
  threshold?: number;
  /** Root margin for intersection observer */
  rootMargin?: string;
  /** Delay before activation (ms) */
  delay?: number;
}

interface UseAnimationActivationReturn {
  /** Ref to attach to target element */
  ref: React.RefObject<HTMLElement | null>;
  /** Whether the animation should be active */
  isActive: boolean;
  /** Whether the element is in view */
  isInView: boolean;
  /** Manually trigger the animation */
  activate: () => void;
  /** Reset the animation state */
  reset: () => void;
}

export function useAnimationActivation(
  options: UseAnimationActivationOptions = {}
): UseAnimationActivationReturn {
  const {
    once = true,
    threshold = 0.5,
    rootMargin = '0px',
    delay = 0,
  } = options;

  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const hasTriggered = useRef(false);

  const activate = useCallback(() => {
    if (delay > 0) {
      setTimeout(() => setIsActive(true), delay);
    } else {
      setIsActive(true);
    }
    hasTriggered.current = true;
  }, [delay]);

  const reset = useCallback(() => {
    setIsActive(false);
    hasTriggered.current = false;
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setIsInView(inView);

        if (inView) {
          if (once && hasTriggered.current) return;
          activate();
        } else if (!once) {
          setIsActive(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [once, threshold, rootMargin, activate]);

  return { ref, isActive, isInView, activate, reset };
}

export default useAnimationActivation;
