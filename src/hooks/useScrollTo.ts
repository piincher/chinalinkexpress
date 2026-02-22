/**
 * useScrollTo Hook
 * 
 * A reusable hook for smooth scrolling to elements.
 * Part of the global hooks library.
 */

'use client';

import { useCallback } from 'react';
import { ANIMATION } from '@/constants/appConstants';

interface UseScrollToOptions {
  offset?: number;
  behavior?: ScrollBehavior;
}

/**
 * Hook for smooth scrolling to elements by ID
 */
export function useScrollTo(options: UseScrollToOptions = {}) {
  const { offset = ANIMATION.SCROLL_OFFSET, behavior = 'smooth' } = options;

  const scrollToElement = useCallback(
    (elementId: string) => {
      if (typeof window === 'undefined') return;

      const element = document.getElementById(elementId);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior,
        });
      }
    },
    [offset, behavior]
  );

  const scrollToTop = useCallback(() => {
    if (typeof window === 'undefined') return;

    window.scrollTo({
      top: 0,
      behavior,
    });
  }, [behavior]);

  return { scrollToElement, scrollToTop };
}

export default useScrollTo;
