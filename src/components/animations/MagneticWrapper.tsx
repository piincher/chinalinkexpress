/**
 * Magnetic Wrapper
 * 
 * A wrapper component that adds magnetic hover effect to any child element.
 * Uses cloneElement to pass refs and event handlers to the child.
 * 
 * Features:
 * - Works with any React element
 * - Throttled mouse tracking (16ms)
 * - Distance-based activation
 * - Spring animation on mouse leave
 * - Respects prefers-reduced-motion
 */

'use client';

import React, { useRef, useCallback, useEffect, useState, cloneElement, isValidElement, ReactElement, CSSProperties } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticWrapperProps {
  children: React.ReactElement;
  className?: string;
  strength?: number;
  radius?: number;
  disabled?: boolean;
}

export function MagneticWrapper({
  children,
  className = '',
  strength = 30,
  radius = 150,
  disabled = false,
}: MagneticWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  
  // Reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  // Motion values for smooth animation
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring configuration for natural feel
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Calculate magnetic effect
  const updateMagneticPosition = useCallback(() => {
    if (!containerRef.current || disabled || prefersReducedMotion) {
      rafRef.current = null;
      return;
    }

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = mousePositionRef.current.x - centerX;
    const distanceY = mousePositionRef.current.y - centerY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    if (distance < radius) {
      // Calculate magnetic pull (stronger as cursor gets closer)
      const pull = (1 - distance / radius) * strength;
      const angle = Math.atan2(distanceY, distanceX);
      
      x.set(Math.cos(angle) * pull);
      y.set(Math.sin(angle) * pull);
    } else {
      x.set(0);
      y.set(0);
    }

    rafRef.current = null;
  }, [disabled, prefersReducedMotion, radius, strength, x, y]);

  // Throttled mouse move handler (16ms = ~60fps)
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (disabled || prefersReducedMotion) return;
    
    mousePositionRef.current = { x: e.clientX, y: e.clientY };
    
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(updateMagneticPosition);
    }
  }, [disabled, prefersReducedMotion, updateMagneticPosition]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, [x, y]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Validate children
  if (!isValidElement(children)) {
    console.warn('MagneticWrapper: children must be a valid React element');
    return <>{children}</>;
  }

  return (
    <div
      ref={containerRef}
      className={`inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ willChange: 'transform' }}
    >
      <motion.div
        style={{
          x: springX,
          y: springY,
          willChange: 'transform',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        {cloneElement(children as ReactElement<{ style?: CSSProperties }>, {
          style: {
            ...(children as ReactElement<{ style?: CSSProperties }>).props.style,
            willChange: 'transform',
          },
        })}
      </motion.div>
    </div>
  );
}

export default MagneticWrapper;
