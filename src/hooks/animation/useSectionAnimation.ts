/**
 * useSectionAnimation Hook
 * 
 * Implements the "One Active Section" rule using AnimationContext.
 * Only the most visible section should have active animations.
 */

'use client';

import { useState, useEffect, useRef, useContext, createContext } from 'react';

export interface AnimationContextType {
  activeSectionId: string | null;
  registerSection: (id: string, visibility: number) => void;
  unregisterSection: (id: string) => void;
}

// Create the AnimationContext
export const AnimationContext = createContext<AnimationContextType>({
  activeSectionId: null,
  registerSection: () => {},
  unregisterSection: () => {},
});

export interface UseSectionAnimationOptions {
  /** Unique identifier for this section */
  sectionId: string;
  /** Threshold for considering section visible (0-1) */
  threshold?: number;
}

export interface UseSectionAnimationReturn {
  /** Whether this section should have active animations */
  isAnimationActive: boolean;
  /** Ref to attach to the section element */
  ref: React.RefObject<HTMLDivElement | null>;
}

/**
 * Hook for "One Active Section" animation management
 * 
 * @example
 * function HeroSection() {
 *   const { ref, isAnimationActive } = useSectionAnimation({ 
 *     sectionId: 'hero',
 *     threshold: 0.5 
 *   });
 *   
 *   return (
 *     <section ref={ref}>
 *       <AnimatedBackground isActive={isAnimationActive} />
 *     </section>
 *   );
 * }
 */
export function useSectionAnimation(
  options: UseSectionAnimationOptions
): UseSectionAnimationReturn {
  const { sectionId, threshold = 0.5 } = options;
  const { activeSectionId, registerSection, unregisterSection } = useContext(AnimationContext);
  const ref = useRef<HTMLDivElement>(null);
  const isAnimationActive = activeSectionId === sectionId;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visibility = entry.isIntersecting ? entry.intersectionRatio : 0;
        registerSection(sectionId, visibility);
      },
      { 
        threshold: [0, threshold, 1],
        rootMargin: '0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      unregisterSection(sectionId);
    };
  }, [sectionId, threshold, registerSection, unregisterSection]);

  return { isAnimationActive, ref };
}

export default useSectionAnimation;
