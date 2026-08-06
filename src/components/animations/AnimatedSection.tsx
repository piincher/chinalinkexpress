/**
 * Animated Section
 * 
 * Wrapper component that adds scroll-triggered animations to any section.
 * Uses Intersection Observer for performance and supports multiple animation types.
 * Part of the shared animation system.
 */

'use client';

import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform, Variants } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scaleUp' | 'blurIn' | 'unfold' | 'none';
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

/**
 * Entering elements decelerate into place. This is the token easing from
 * tokens.css (--ease-out); framer-motion needs the raw array, so the two must
 * be kept in step. The browser-default curve reads as uncrafted.
 */
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/**
 * Reveal travel: enough to read as movement, short enough that the content —
 * not the animation — is what the eye lands on. `blurIn` and `unfold` carry the
 * heavier, more cinematic entrances for hero-adjacent blocks.
 */
const animations: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -48 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 48 },
    visible: { opacity: 1, x: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.94 },
    visible: { opacity: 1, scale: 1 },
  },
  /** Rack-focus entrance — the block resolves as it settles. */
  blurIn: {
    hidden: { opacity: 0, y: 24, filter: 'blur(12px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  /** Perspective tilt, as if the panel were hinging into the page. */
  unfold: {
    hidden: { opacity: 0, rotateX: -12, y: 40, transformPerspective: 1200 },
    visible: { opacity: 1, rotateX: 0, y: 0, transformPerspective: 1200 },
  },
};

/** Spatial motion collapses to a plain crossfade when the OS asks for less. */
const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function AnimatedSection({
  children,
  className = '',
  animation = 'fadeUp',
  delay = 0,
  duration = 0.6,
  threshold = 0.2,
  once = true,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const prefersReduced = useReducedMotion();

  if (animation === 'none') {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={prefersReduced ? reducedVariants : animations[animation]}
      transition={{
        duration: prefersReduced ? 0.15 : duration,
        delay: prefersReduced ? 0 : delay,
        ease: EASE_OUT,
      }}
    >
      {children}
    </motion.div>
  );
}

// Stagger container for child animations
interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  threshold?: number;
  /** Passed through so a wrapped grid keeps its own track definition. */
  style?: React.CSSProperties;
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
  threshold = 0.2,
  style,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            // Total stagger stays under ~500ms or the section feels slow to
            // settle — so the per-child delay shrinks as the list grows.
            staggerChildren: prefersReduced ? 0 : staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// Stagger item for use inside StaggerContainer
interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scaleUp' | 'blurIn' | 'unfold';
  /** Passed through so a wrapped element keeps its own borders/colours. */
  style?: React.CSSProperties;
}

export function StaggerItem({
  children,
  className = '',
  animation = 'fadeUp',
  style,
}: StaggerItemProps) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      variants={prefersReduced ? reducedVariants : animations[animation]}
      transition={{ duration: prefersReduced ? 0.15 : 0.5, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

// Magnetic button effect
interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticButton({
  children,
  className = '',
  strength = 30,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    ref.current.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0, 0)';
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      style={{ willChange: 'transform' }}
    >
      {children}
    </motion.div>
  );
}

// Parallax wrapper - Client side only
interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

export function Parallax({ children, className = '', speed = 0.5 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = React.useState(false);
  
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

  return (
    <motion.div 
      ref={ref} 
      className={className} 
      style={{ y: isMounted ? y : 0 }}
    >
      {children}
    </motion.div>
  );
}
