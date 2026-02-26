/**
 * Counter Animation Component
 * 
 * Lightweight counter animation that triggers when entering viewport.
 * Uses refs and textContent updates to avoid React re-renders during counting.
 * Features easeOutExpo easing for natural deceleration.
 */

'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useIntersectionObserver } from '@/features/hero-animation/hooks/useIntersectionObserver';

interface CounterProps {
  /** Target number to count to */
  end: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Suffix to display after the number (e.g., '+', '%', 'K') */
  suffix?: string;
  /** Prefix to display before the number (e.g., '$') */
  prefix?: string;
  /** Additional CSS classes */
  className?: string;
  /** Number of decimal places */
  decimals?: number;
  /** Whether to start animation when in view */
  startOnView?: boolean;
}

/**
 * EaseOutExpo easing function for natural deceleration
 * Starts fast and slows down towards the end
 */
function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function Counter({
  end,
  duration = 2,
  suffix = '',
  prefix = '',
  className = '',
  decimals = 0,
  startOnView = true,
}: CounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
    triggerOnce: true,
  });

  // Format number with locale and decimals
  const formatNumber = useCallback(
    (value: number): string => {
      const formatted = value.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
      return `${prefix}${formatted}${suffix}`;
    },
    [decimals, prefix, suffix]
  );

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Trigger animation when in view
  useEffect(() => {
    if (!counterRef.current) return;
    if (startOnView && !isIntersecting) return;
    if (hasAnimated.current) return;

    hasAnimated.current = true;
    const startValue = 0;
    const durationMs = duration * 1000;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / durationMs, 1);
      const easedProgress = easeOutExpo(progress);
      const currentValue = startValue + (end - startValue) * easedProgress;

      // Update textContent directly - no React re-render
      if (counterRef.current) {
        counterRef.current.textContent = formatNumber(currentValue);
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        // Ensure final value is exact
        if (counterRef.current) {
          counterRef.current.textContent = formatNumber(end);
        }
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isIntersecting, startOnView, end, duration, formatNumber]);

  return (
    <span ref={ref} className={className}>
      <span ref={counterRef}>
        {formatNumber(0)}
      </span>
    </span>
  );
}

export default Counter;
