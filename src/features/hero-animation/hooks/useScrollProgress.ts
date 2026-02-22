/**
 * Scroll Progress Hook
 * 
 * Tracks scroll position for scroll-linked animations.
 * Part of the hero-animation feature.
 */

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface ScrollProgress {
  progress: number; // 0 to 1
  velocity: number; // pixels per frame
  direction: 'up' | 'down' | 'none';
}

export function useScrollProgress(elementRef?: React.RefObject<HTMLElement | null>): ScrollProgress {
  const [scrollData, setScrollData] = useState<ScrollProgress>({
    progress: 0,
    velocity: 0,
    direction: 'none',
  });

  const lastScrollY = useRef<number>(0);
  const lastTime = useRef<number>(performance.now());
  const rafId = useRef<number | undefined>(undefined);

  const updateScrollProgress = useCallback(() => {
    const currentTime = performance.now();
    const deltaTime = currentTime - lastTime.current;
    
    let scrollY: number;
    let maxScroll: number;

    if (elementRef?.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const elementHeight = elementRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      scrollY = -rect.top;
      maxScroll = elementHeight - viewportHeight;
    } else {
      scrollY = window.scrollY;
      maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    }

    const progress = maxScroll > 0 ? Math.max(0, Math.min(1, scrollY / maxScroll)) : 0;
    const deltaY = scrollY - lastScrollY.current;
    const velocity = deltaTime > 0 ? (deltaY / deltaTime) * 16 : 0; // Normalize to ~60fps
    const direction = deltaY > 0 ? 'down' : deltaY < 0 ? 'up' : 'none';

    setScrollData({
      progress,
      velocity: Math.abs(velocity),
      direction,
    });

    lastScrollY.current = scrollY;
    lastTime.current = currentTime;
  }, [elementRef]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      if (rafId.current) return;
      
      rafId.current = requestAnimationFrame(() => {
        updateScrollProgress();
        rafId.current = undefined;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [updateScrollProgress]);

  return scrollData;
}

export function useParallax(intensity: number = 0.5): {
  x: number;
  y: number;
  ref: React.RefObject<HTMLDivElement | null>;
} {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement | null>(null);
  const rafId = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId.current) return;

      rafId.current = requestAnimationFrame(() => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const x = (e.clientX - centerX) / rect.width * intensity * 100;
        const y = (e.clientY - centerY) / rect.height * intensity * 100;

        setOffset({ x, y });
        rafId.current = undefined;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [intensity]);

  return { x: offset.x, y: offset.y, ref };
}
