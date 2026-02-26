/**
 * useSpotlight Hook
 * 
 * Tracks mouse position within an element for spotlight/radial gradient effects.
 * Returns CSS percentage values (0-100) for easy use in CSS gradients.
 */

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export interface SpotlightPosition {
  /** X position as CSS percentage (0-100) */
  x: number;
  /** Y position as CSS percentage (0-100) */
  y: number;
}

export interface UseSpotlightReturn extends SpotlightPosition {
  /** Whether the element is currently being hovered */
  isHovered: boolean;
}

/**
 * Hook for spotlight/radial gradient position tracking
 * 
 * @example
 * function SpotlightCard() {
 *   const ref = useRef<HTMLDivElement>(null);
 *   const { x, y, isHovered } = useSpotlight(ref);
 *   
 *   return (
 *     <div 
 *       ref={ref}
 *       style={{
 *         background: `radial-gradient(circle at ${x}% ${y}%, 
 *           rgba(255,255,255,0.15) 0%, 
 *           transparent 50%)`
 *       }}
 *     >
 *       Content
 *     </div>
 *   );
 * }
 */
export function useSpotlight(
  elementRef: React.RefObject<HTMLElement | null>
): UseSpotlightReturn {
  const [position, setPosition] = useState<SpotlightPosition>({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const lastUpdateRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!elementRef.current) return;

    const now = performance.now();
    // Throttle updates for performance
    if (now - lastUpdateRef.current < 8) return; // ~120fps max
    lastUpdateRef.current = now;

    const rect = elementRef.current.getBoundingClientRect();
    
    // Calculate position as percentage (0-100)
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    // Clamp to valid range
    const clampedX = Math.max(0, Math.min(100, x));
    const clampedY = Math.max(0, Math.min(100, y));

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      setPosition({ x: clampedX, y: clampedY });
    });
  }, [elementRef]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    // Reset to center when leaving
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(() => {
      setPosition({ x: 50, y: 50 });
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

export default useSpotlight;
