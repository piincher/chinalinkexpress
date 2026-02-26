/**
 * SpotlightCard Component
 * 
 * A card component with a mouse-following spotlight/gradient effect.
 * Creates an interactive lighting effect that responds to mouse movement.
 */

'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

export interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightSize?: number;
  borderGlow?: boolean;
  disabled?: boolean;
}

export function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(255, 255, 255, 0.15)',
  spotlightSize = 200,
  borderGlow = true,
  disabled = false,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const spotlightX = useSpring(mouseX, springConfig);
  const spotlightY = useSpring(mouseY, springConfig);

  const background = useMotionTemplate`
    radial-gradient(
      ${spotlightSize}px circle at ${spotlightX}px ${spotlightY}px,
      ${spotlightColor},
      transparent 80%
    )
  `;

  const borderBackground = useMotionTemplate`
    radial-gradient(
      ${spotlightSize * 1.5}px circle at ${spotlightX}px ${spotlightY}px,
      rgba(255, 255, 255, 0.4),
      transparent 60%
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
    if (disabled || !isVisible) return;
    
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
      <div className={`relative overflow-hidden ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Border glow effect */}
      {borderGlow && (
        <motion.div
          className="absolute inset-0 rounded-inherit pointer-events-none z-0"
          style={{
            background: borderBackground,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}

      {/* Inner spotlight effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background,
          opacity: isHovered ? 1 : 0,
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
}
