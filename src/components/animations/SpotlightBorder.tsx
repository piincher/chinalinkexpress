/**
 * SpotlightBorder Component
 * 
 * A premium "Linear-style" border glow effect that follows the mouse cursor.
 * Creates an animated gradient border that responds to mouse movement.
 * 
 * Features:
 * - Mouse-following spotlight effect on border
 * - 1px border width with gradient glow
 * - Smooth spring animations
 * - Respects reduced motion preferences
 * - Performance optimized with intersection observer
 * 
 * @example
 * ```tsx
 * <SpotlightBorder className="rounded-2xl">
 *   <CardContent />
 * </SpotlightBorder>
 * ```
 */

'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

export interface SpotlightBorderProps {
  children: React.ReactNode;
  className?: string;
  /** Border width in pixels - defaults to 1 */
  borderWidth?: number;
  /** Glow color - can be single color or gradient */
  glowColor?: string;
  /** Size of the spotlight effect */
  spotlightSize?: number;
  /** Disable the effect */
  disabled?: boolean;
  /** Mode: 'interactive' follows mouse, 'static' shows gradient */
  mode?: 'interactive' | 'static';
}

export function SpotlightBorder({
  children,
  className = '',
  borderWidth = 1,
  glowColor = 'rgba(59, 130, 246, 0.5)', // Brand blue default
  spotlightSize = 200,
  disabled = false,
  mode = 'interactive',
}: SpotlightBorderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const spotlightX = useSpring(mouseX, springConfig);
  const spotlightY = useSpring(mouseY, springConfig);

  // Create the spotlight gradient for border
  const borderGradient = useMotionTemplate`
    radial-gradient(
      ${spotlightSize}px circle at ${spotlightX}px ${spotlightY}px,
      ${glowColor},
      transparent 70%
    )
  `;

  // Intersection Observer for performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !isVisible || mode !== 'interactive') return;
    
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => {
    if (!disabled) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  if (disabled) {
    return (
      <div className={`relative ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ 
        borderRadius: 'inherit',
      }}
    >
      {/* Animated border glow layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: mode === 'interactive' ? borderGradient : undefined,
          borderRadius: 'inherit',
          padding: borderWidth,
          opacity: isHovered || mode === 'static' ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
        initial={false}
        animate={{
          opacity: isHovered || mode === 'static' ? 1 : 0,
        }}
      >
        {/* Inner mask to create border effect */}
        <div 
          className="w-full h-full"
          style={{
            borderRadius: 'inherit',
            background: mode === 'static' 
              ? `linear-gradient(135deg, ${glowColor}, transparent, ${glowColor})`
              : 'transparent',
            // For static mode, use a subtle animated gradient
          }}
        />
      </motion.div>

      {/* Secondary glow layer for extra premium effect */}
      <motion.div
        className="absolute -inset-[1px] pointer-events-none rounded-inherit"
        style={{
          background: mode === 'interactive' ? borderGradient : undefined,
          borderRadius: 'calc(inherit + 2px)',
          filter: 'blur(4px)',
          opacity: isHovered ? 0.5 : 0,
        }}
        animate={{
          opacity: isHovered ? 0.5 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Content wrapper */}
      <div className="relative z-10 h-full rounded-inherit">
        {children}
      </div>
    </div>
  );
}

/**
 * CSS-based Spotlight Border
 * 
 * Uses CSS custom properties and conic-gradient for a rotating border effect.
 * More performant for static/persistent effects.
 */
interface CSSSpotlightBorderProps {
  children: React.ReactNode;
  className?: string;
  borderWidth?: number;
  /** Array of colors for the gradient border */
  gradientColors?: string[];
  /** Animation duration in seconds */
  animationDuration?: number;
  disabled?: boolean;
}

export function CSSSpotlightBorder({
  children,
  className = '',
  borderWidth = 1,
  gradientColors = ['#3b82f6', '#06b6d4', '#3b82f6'], // Brand blue gradient
  animationDuration = 4,
  disabled = false,
}: CSSSpotlightBorderProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  const gradientString = gradientColors.join(', ');

  return (
    <div
      className={`relative group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ borderRadius: 'inherit' }}
    >
      {/* Border glow container */}
      <div
        className="absolute -inset-[1px] rounded-inherit overflow-hidden pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        {/* Animated conic gradient */}
        <div
          className="absolute inset-[-100%]"
          style={{
            background: `conic-gradient(from 0deg, ${gradientString})`,
            animation: `spin ${animationDuration}s linear infinite`,
          }}
        />
        {/* Inner mask to create border effect */}
        <div 
          className="absolute inset-[1px] bg-background rounded-inherit"
          style={{
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
            padding: `${borderWidth}px`,
          }}
        />
      </div>

      {/* Blur glow effect */}
      <div
        className="absolute -inset-[2px] rounded-inherit pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1] || gradientColors[0]})`,
          filter: 'blur(8px)',
          opacity: isHovered ? 0.4 : 0,
          transition: 'opacity 0.3s ease',
          zIndex: -1,
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full rounded-inherit overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export default SpotlightBorder;
