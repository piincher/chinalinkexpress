/**
 * GradientText
 * 
 * A premium text gradient shimmer component with animated background.
 * Creates the shimmering headline effect seen on Stripe/Vercel landing pages.
 * Uses CSS background-clip with animated gradient position for smooth performance.
 * 
 * @example
 * <GradientText colors={['#3b82f6', '#8b5cf6', '#06b6d4']}>
 *   ChinaLink Express
 * </GradientText>
 */

'use client';

import { CSSProperties, ElementType, ReactNode, useMemo } from 'react';
import './GradientText.css';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'span' | 'p';
type GradientDirection = 'left' | 'right';

interface GradientTextProps {
  /** Text content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Gradient colors (default: ['#3b82f6', '#8b5cf6', '#06b6d4']) */
  colors?: string[];
  /** Animation direction - 'left' reverses the animation (default: 'right') */
  direction?: GradientDirection;
  /** Animation duration in seconds (default: 3) */
  duration?: number;
  /** HTML element to render as (default: 'span') */
  as?: HeadingTag;
  /** Inline styles */
  style?: CSSProperties;
}

/**
 * Creates a CSS gradient string from color array
 */
function createGradient(colors: string[]): string {
  if (colors.length < 2) {
    return `linear-gradient(90deg, ${colors[0] || '#3b82f6'}, ${colors[0] || '#8b5cf6'})`;
  }
  return `linear-gradient(90deg, ${colors.join(', ')})`;
}

export function GradientText({
  children,
  className = '',
  colors = ['#3b82f6', '#8b5cf6', '#06b6d4'],
  direction = 'right',
  duration = 3,
  as: Component = 'span',
  style = {},
}: GradientTextProps) {
  // Create the gradient CSS value
  const gradientValue = useMemo(() => createGradient(colors), [colors]);
  
  // Determine animation direction
  const animationDirection = direction === 'left' ? 'reverse' : 'normal';
  
  // Compute dynamic styles
  const dynamicStyles: CSSProperties = {
    backgroundImage: gradientValue,
    backgroundSize: '200% 100%',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    WebkitTextFillColor: 'transparent',
    animationName: 'gradient-shimmer',
    animationDuration: `${duration}s`,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    animationDirection: animationDirection,
    ...style,
  };

  return (
    <Component 
      className={`gradient-text ${className}`}
      style={dynamicStyles}
    >
      {children}
    </Component>
  );
}

// Preset configurations for common use cases

/**
 * ShimmerHeading - Pre-configured shimmer effect for headlines
 * 
 * @example
 * <ShimmerHeading level={1}>Premium Headline</ShimmerHeading>
 */
interface ShimmerHeadingProps extends Omit<GradientTextProps, 'as'> {
  level?: 1 | 2 | 3;
}

export function ShimmerHeading({
  level = 1,
  duration = 4,
  colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#8b5cf6', '#3b82f6'],
  direction = 'right',
  className = '',
  children,
  ...props
}: ShimmerHeadingProps) {
  const tag = `h${level}` as HeadingTag;
  
  return (
    <GradientText
      as={tag}
      colors={colors}
      direction={direction}
      duration={duration}
      className={`shimmer-heading shimmer-heading-${level} ${className}`}
      {...props}
    >
      {children}
    </GradientText>
  );
}

/**
 * ShimmerText - Inline shimmer text for highlighting words
 * 
 * @example
 * <p>Experience <ShimmerText>premium shipping</ShimmerText> today</p>
 */
export function ShimmerText({
  duration = 3,
  colors = ['#3b82f6', '#8b5cf6', '#06b6d4'],
  direction = 'right',
  className = '',
  children,
  ...props
}: Omit<GradientTextProps, 'as'>) {
  return (
    <GradientText
      as="span"
      colors={colors}
      direction={direction}
      duration={duration}
      className={`shimmer-text ${className}`}
      {...props}
    >
      {children}
    </GradientText>
  );
}

/**
 * PremiumShimmer - Enhanced shimmer with more colors and slower animation
 * Perfect for hero sections and premium CTAs
 */
export function PremiumShimmer({
  duration = 5,
  colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#3b82f6'],
  direction = 'right',
  className = '',
  children,
  ...props
}: GradientTextProps) {
  return (
    <GradientText
      colors={colors}
      direction={direction}
      duration={duration}
      className={`premium-shimmer ${className}`}
      {...props}
    >
      {children}
    </GradientText>
  );
}

/**
 * SubtleShimmer - Softer shimmer effect for secondary text
 */
export function SubtleShimmer({
  duration = 4,
  colors = ['#64748b', '#94a3b8', '#64748b'],
  direction = 'right',
  className = '',
  children,
  ...props
}: GradientTextProps) {
  return (
    <GradientText
      colors={colors}
      direction={direction}
      duration={duration}
      className={`subtle-shimmer ${className}`}
      {...props}
    >
      {children}
    </GradientText>
  );
}

export default GradientText;
