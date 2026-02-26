/**
 * Magnetic Button
 * 
 * A button component with magnetic hover effect that follows the cursor
 * within a specified radius. Optimized for performance with RAF throttling
 * and spring animations.
 * 
 * Features:
 * - Throttled mouse tracking (16ms)
 * - Distance-based activation
 * - Spring animation on mouse leave
 * - Respects prefers-reduced-motion
 * - Full accessibility support
 */

'use client';

import React, { useRef, useCallback, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
  disabled?: boolean;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
  'aria-pressed'?: boolean;
}

export function MagneticButton({
  children,
  className = '',
  strength = 30,
  radius = 150,
  disabled = false,
  onClick,
  variant = 'primary',
  type = 'button',
  'aria-label': ariaLabel,
  'aria-pressed': ariaPressed,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
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
  
  // Scale transforms for hover/active states
  const scale = useTransform(
    [springX, springY],
    ([latestX, latestY]) => {
      const distance = Math.sqrt((latestX as number) ** 2 + (latestY as number) ** 2);
      return 1 + (distance / strength) * 0.02;
    }
  );

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

  // Variant styles
  const variantStyles = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-white text-gray-900 border-2 border-gray-200 hover:border-gray-300 focus:ring-gray-500',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
  };

  return (
    <div
      ref={containerRef}
      className="inline-block"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ willChange: 'transform' }}
    >
      <motion.button
        ref={buttonRef}
        type={type}
        disabled={disabled}
        onClick={onClick}
        aria-label={ariaLabel}
        aria-pressed={ariaPressed}
        className={`
          relative inline-flex items-center justify-center
          px-6 py-3 rounded-lg font-medium
          transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          disabled:hover:transform-none
          ${variantStyles[variant]}
          ${className}
        `}
        style={{
          x: springX,
          y: springY,
          scale: disabled ? 1 : scale,
          willChange: 'transform',
        }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        {children}
      </motion.button>
    </div>
  );
}

export default MagneticButton;
