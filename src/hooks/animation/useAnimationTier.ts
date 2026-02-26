/**
 * useAnimationTier Hook
 * 
 * Performance tier detection with auto-degradation support.
 * Listens for 'animation:degrade' events to reduce animation quality.
 */

'use client';

import { useState, useEffect, useCallback } from 'react';

export type AnimationTier = 'full' | 'reduced' | 'minimal';

export interface AnimationDegradeEvent extends CustomEvent {
  detail: {
    tier: AnimationTier;
    reason?: string;
  };
}

/**
 * Hook for animation tier management with auto-degradation
 * 
 * @example
 * const tier = useAnimationTier();
 * 
 * // Use tier to determine animation complexity
 * const particleCount = tier === 'full' ? 1000 : tier === 'reduced' ? 500 : 0;
 * 
 * // Manually trigger degradation
 * window.dispatchEvent(new CustomEvent('animation:degrade', {
 *   detail: { tier: 'reduced', reason: 'low-battery' }
 * }));
 */
export function useAnimationTier(): AnimationTier {
  const [tier, setTier] = useState<AnimationTier>('full');

  const handleDegrade = useCallback((event: AnimationDegradeEvent) => {
    setTier(event.detail.tier);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check for reduced motion preference on mount
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setTier('minimal');
    }

    // Listen for degradation events
    window.addEventListener('animation:degrade', handleDegrade as EventListener);

    return () => {
      window.removeEventListener('animation:degrade', handleDegrade as EventListener);
    };
  }, [handleDegrade]);

  return tier;
}

export default useAnimationTier;
