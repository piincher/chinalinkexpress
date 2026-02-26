/**
 * useMagneticEffect Hook
 * 
 * Magnetic button effect that pulls the element toward the cursor.
 * Throttled to 60fps with max displacement of 30px.
 */

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export interface MagneticPosition {
  /** X displacement in pixels */
  x: number;
  /** Y displacement in pixels */
  y: number;
}

export interface UseMagneticEffectReturn extends MagneticPosition {
  /** Whether the element is currently being hovered */
  isHovered: boolean;
}

/**
 * Hook for magnetic button effect
 * 
 * @example
 * function MagneticButton() {
 *   const ref = useRef<HTMLButtonElement>(null);
 *   const { x, y, isHovered } = useMagneticEffect(ref);
 *   
 *   return (
 *     <button 
 *       ref={ref}
 *       style={{ transform: `translate(${x}px, ${y}px)` }}
 *     >
 *       Hover me
 *     </button>
 *   );
 * }
 */
export function useMagneticEffect(
  elementRef: React.RefObject<HTMLElement | null>,
  maxDisplacement: number = 30
): UseMagneticEffectReturn {
  const [position, setPosition] = useState<MagneticPosition>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const lastUpdateRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef<MagneticPosition>({ x: 0, y: 0 });

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!elementRef.current) return;

    const now = performance.now();
    // Throttle to ~60fps (16ms)
    if (now - lastUpdateRef.current < 16) return;
    lastUpdateRef.current = now;

    const rect = elementRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from center
    const distanceX = event.clientX - centerX;
    const distanceY = event.clientY - centerY;

    // Calculate magnetic pull (closer = stronger pull)
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    const maxDistance = Math.max(rect.width, rect.height);
    const strength = Math.max(0, 1 - distance / maxDistance);

    // Calculate displacement toward cursor
    targetRef.current = {
      x: (distanceX / maxDistance) * maxDisplacement * strength * 2,
      y: (distanceY / maxDistance) * maxDisplacement * strength * 2,
    };

    // Clamp to max displacement
    const clampedX = Math.max(-maxDisplacement, Math.min(maxDisplacement, targetRef.current.x));
    const clampedY = Math.max(-maxDisplacement, Math.min(maxDisplacement, targetRef.current.y));

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      setPosition({ x: clampedX, y: clampedY });
    });
  }, [elementRef, maxDisplacement]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    // Reset position with animation
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(() => {
      setPosition({ x: 0, y: 0 });
    });
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [elementRef, handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return { ...position, isHovered };
}

export default useMagneticEffect;
