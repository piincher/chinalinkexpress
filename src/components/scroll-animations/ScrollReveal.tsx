'use client';

/**
 * ScrollReveal Component
 * 
 * Zero-JavaScript-overhead scroll animations using CSS animation-timeline: view()
 * Progressive enhancement - gracefully degrades on unsupported browsers
 * 
 * @example
 * ```tsx
 * <ScrollReveal animation="fade-in-up">
 *   <YourContent />
 * </ScrollReveal>
 * ```
 */

import React, { ReactNode, CSSProperties } from 'react';

export type ScrollAnimation = 
  | 'fade-in' 
  | 'fade-in-up' 
  | 'scale-in' 
  | 'slide-in-left' 
  | 'slide-in-right';

export type AnimationRange = 
  | 'default'   // entry 0% cover 25%
  | 'quick'     // entry 0% cover 15%
  | 'slow'      // entry 0% cover 40%
  | 'full'      // entry 0% exit 100%
  | 'exit';     // exit 0% exit 50%

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  animation?: ScrollAnimation;
  range?: AnimationRange;
  /**
   * Delay in milliseconds for stagger effects
   * Only works when parent has scroll-stagger class
   */
  delay?: number;
  /**
   * Custom styles for the element
   */
  style?: CSSProperties;
  /**
   * HTML tag to render (default: div)
   */
  as?: keyof React.JSX.IntrinsicElements;
}

const animationClassMap: Record<ScrollAnimation, string> = {
  'fade-in': 'scroll-fade-in',
  'fade-in-up': 'scroll-fade-in-up',
  'scale-in': 'scroll-scale-in',
  'slide-in-left': 'scroll-slide-in-left',
  'slide-in-right': 'scroll-slide-in-right',
};

const rangeClassMap: Record<AnimationRange, string> = {
  'default': '',
  'quick': 'scroll-quick',
  'slow': 'scroll-slow',
  'full': 'scroll-full',
  'exit': 'scroll-exit',
};

export function ScrollReveal({
  children,
  className = '',
  animation = 'fade-in-up',
  range = 'default',
  delay,
  style,
  as: Component = 'div',
}: ScrollRevealProps) {
  const animationClass = animationClassMap[animation];
  const rangeClass = rangeClassMap[range];
  
  // Combine classes: base animation + range modifier + user classes
  const combinedClasses = [
    'scroll-animate',
    animationClass,
    rangeClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Apply delay via CSS custom property if provided
  const customStyles: CSSProperties = {
    ...style,
    ...(delay !== undefined && { 
      animationDelay: `${delay}ms` 
    }),
  };

  // Use createElement to support dynamic tag
  const Tag = Component as unknown as React.ComponentType<{
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
  }>;

  return (
    <Tag 
      className={combinedClasses}
      style={customStyles}
    >
      {children}
    </Tag>
  );
}

/**
 * ScrollRevealGroup
 * 
 * Wrapper component for staggered animations on child elements.
 * Children should use ScrollReveal with delay prop or rely on CSS nth-child.
 * 
 * @example
 * ```tsx
 * <ScrollRevealGroup className="grid grid-cols-3">
 *   {items.map((item, i) => (
 *     <ScrollReveal key={item.id} animation="fade-in-up" delay={i * 100}>
 *       <Card {...item} />
 *     </ScrollReveal>
 *   ))}
 * </ScrollRevealGroup>
 * ```
 */
interface ScrollRevealGroupProps {
  children: ReactNode;
  className?: string;
  /**
   * Use CSS nth-child stagger instead of manual delay props
   */
  useStagger?: boolean;
  style?: CSSProperties;
}

export function ScrollRevealGroup({
  children,
  className = '',
  useStagger = false,
  style,
}: ScrollRevealGroupProps) {
  const combinedClasses = [
    useStagger && 'scroll-stagger',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={combinedClasses} style={style}>
      {children}
    </div>
  );
}

/**
 * Preset: HeroScrollReveal
 * Optimized for hero section content with scale-in effect
 */
interface HeroScrollRevealProps {
  children: ReactNode;
  className?: string;
}

export function HeroScrollReveal({ children, className = '' }: HeroScrollRevealProps) {
  return (
    <div className={`scroll-hero ${className}`}>
      {children}
    </div>
  );
}

/**
 * Preset: CardScrollReveal
 * Optimized for card components with fade-in-up effect
 */
interface CardScrollRevealProps {
  children: ReactNode;
  className?: string;
  index?: number; // For stagger calculation
}

export function CardScrollReveal({ 
  children, 
  className = '',
  index,
}: CardScrollRevealProps) {
  const style: CSSProperties | undefined = index !== undefined 
    ? { animationDelay: `${index * 50}ms` }
    : undefined;

  return (
    <div className={`scroll-card scroll-animate ${className}`} style={style}>
      {children}
    </div>
  );
}

/**
 * Preset: TextScrollReveal
 * Optimized for text blocks with simple fade-in
 */
interface TextScrollRevealProps {
  children: ReactNode;
  className?: string;
}

export function TextScrollReveal({ children, className = '' }: TextScrollRevealProps) {
  return (
    <div className={`scroll-text scroll-animate ${className}`}>
      {children}
    </div>
  );
}

export default ScrollReveal;
