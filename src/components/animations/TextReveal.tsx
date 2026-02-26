/**
 * TextReveal
 * 
 * A text reveal animation component using SplitType for splitting text
 * and Framer Motion for smooth animations.
 * Ideal for hero headlines and section titles.
 */

'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SplitType from 'split-type';
import { useAnimationActivation } from '@/hooks/useAnimationActivation';

type SplitTypeOption = 'chars' | 'words' | 'lines';
type ElementType = 'h1' | 'h2' | 'h3' | 'p' | 'span';

interface TextRevealProps {
  /** Text to animate */
  children: string;
  /** Additional CSS classes */
  className?: string;
  /** Type of text split (default: 'words') */
  type?: SplitTypeOption;
  /** Delay between elements in seconds (default: 0.05) */
  stagger?: number;
  /** Animation duration in seconds (default: 0.8) */
  duration?: number;
  /** Initial Y offset in pixels (default: 30) */
  y?: number;
  /** Animate only once (default: true) */
  once?: boolean;
  /** Intersection threshold 0-1 (default: 0.5) */
  threshold?: number;
  /** HTML element to render as (default: 'span') */
  as?: ElementType;
  /** Additional delay before animation starts (seconds) */
  delay?: number;
  /** Easing function */
  ease?: [number, number, number, number];
}

export function TextReveal({
  children,
  className = '',
  type = 'words',
  stagger = 0.05,
  duration = 0.8,
  y = 30,
  once = true,
  threshold = 0.5,
  as: Component = 'span',
  delay = 0,
  ease: easeProp = [0.25, 0.46, 0.45, 0.94],
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const splitRef = useRef<SplitType | null>(null);
  const [elements, setElements] = useState<string[]>([]);
  const { isActive } = useAnimationActivation({
    once,
    threshold,
    delay: delay * 1000,
  });

  // Split text using SplitType
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Store original text for cleanup
    const originalText = children;

    // Create SplitType instance
    splitRef.current = new SplitType(container as HTMLElement, {
      types: type,
    });

    // Extract split elements
    const splitElements = splitRef.current[type] || [];
    setElements(splitElements.map((el) => el.innerText || el.textContent || ''));

    // Cleanup: restore original text on unmount
    return () => {
      if (splitRef.current) {
        splitRef.current.revert();
        splitRef.current = null;
      }
      // Ensure original text is restored
      if (container) {
        container.textContent = originalText;
      }
    };
  }, [children, type]);

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration,
        ease: easeProp,
      },
    },
  };

  return (
    <Component
      ref={containerRef as React.RefObject<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>}
      className={`inline-block ${className}`}
    >
      <motion.span
        className="inline-flex flex-wrap"
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
        aria-label={children}
      >
        {elements.map((element, index) => (
          <motion.span
            key={`${type}-${index}`}
            className={`inline-block ${type === 'lines' ? 'w-full' : ''}`}
            variants={itemVariants}
            style={{ willChange: 'transform, opacity' }}
          >
            {element === ' ' || element === '\u00A0' ? '\u00A0' : element}
            {type === 'words' && index < elements.length - 1 && '\u00A0'}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
}

// Preset configurations for common use cases
export function TextRevealHeading({
  children,
  level = 1,
  ...props
}: Omit<TextRevealProps, 'as'> & { level?: 1 | 2 | 3 }) {
  const tag = `h${level}` as ElementType;
  return (
    <TextReveal as={tag} type="words" stagger={0.08} duration={0.6} {...props}>
      {children}
    </TextReveal>
  );
}

export function TextRevealChars({
  children,
  ...props
}: Omit<TextRevealProps, 'type'>) {
  return (
    <TextReveal type="chars" stagger={0.02} duration={0.5} {...props}>
      {children}
    </TextReveal>
  );
}

export function TextRevealLines({
  children,
  ...props
}: Omit<TextRevealProps, 'type'>) {
  return (
    <TextReveal type="lines" stagger={0.1} duration={0.7} {...props}>
      {children}
    </TextReveal>
  );
}

export default TextReveal;
