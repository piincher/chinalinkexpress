/**
 * GridPattern Component
 * 
 * A subtle grid pattern overlay that creates a "precision/logistics" feeling.
 * Perfect for hero sections, feature cards, and background textures.
 * 
 * Features:
 * - Dots or lines pattern type
 * - Configurable size and opacity
 * - Optional subtle pulse animation
 * - SVG-based for crisp rendering at any size
 * - CSS-based animation for performance
 */

'use client';

import React from 'react';
import './GridPattern.css';

export interface GridPatternProps {
  /** Pattern type - dots (circular) or lines (crosshatch grid) */
  type?: 'dots' | 'lines';
  /** Gap between dots/lines in pixels */
  size?: number;
  /** Pattern opacity (0-1) */
  opacity?: number;
  /** Additional CSS classes */
  className?: string;
  /** Enable subtle pulse/fade animation */
  animated?: boolean;
  /** Dot radius (only for dots type) */
  dotRadius?: number;
  /** Line thickness (only for lines type) */
  lineThickness?: number;
  /** Pattern color (hex or rgb) */
  color?: string;
}

export function GridPattern({
  type = 'dots',
  size = 20,
  opacity = 0.1,
  className = '',
  animated = false,
  dotRadius = 1,
  lineThickness = 1,
  color = 'currentColor',
}: GridPatternProps) {
  const patternId = `grid-pattern-${type}-${size}-${Math.random().toString(36).substr(2, 9)}`;
  
  const animationClass = animated ? 'grid-pattern--animated' : '';
  const typeClass = `grid-pattern--${type}`;

  if (type === 'dots') {
    return (
      <svg
        className={`grid-pattern ${typeClass} ${animationClass} ${className}`}
        style={{
          opacity,
          color,
          '--grid-size': `${size}px`,
          '--dot-radius': dotRadius,
        } as React.CSSProperties}
        aria-hidden="true"
      >
        <defs>
          <pattern
            id={patternId}
            width={size}
            height={size}
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx={size / 2}
              cy={size / 2}
              r={dotRadius}
              fill="currentColor"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    );
  }

  // Lines pattern (crosshatch grid)
  return (
    <svg
      className={`grid-pattern ${typeClass} ${animationClass} ${className}`}
      style={{
        opacity,
        color,
        '--grid-size': `${size}px`,
        '--line-thickness': lineThickness,
      } as React.CSSProperties}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={patternId}
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
        >
          {/* Horizontal line */}
          <line
            x1="0"
            y1={size / 2}
            x2={size}
            y2={size / 2}
            stroke="currentColor"
            strokeWidth={lineThickness}
          />
          {/* Vertical line */}
          <line
            x1={size / 2}
            y1="0"
            x2={size / 2}
            y2={size}
            stroke="currentColor"
            strokeWidth={lineThickness}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

/**
 * CSS-only Grid Pattern variant
 * 
 * Uses background-image with gradients instead of SVG.
 * Better for very simple use cases where SVG overhead isn't needed.
 */
export interface CSSGridPatternProps extends Omit<GridPatternProps, 'dotRadius' | 'lineThickness'> {
  /** Background color behind the pattern */
  backgroundColor?: string;
}

export function CSSGridPattern({
  type = 'dots',
  size = 20,
  opacity = 0.1,
  className = '',
  animated = false,
  color = 'currentColor',
  backgroundColor = 'transparent',
}: CSSGridPatternProps) {
  const animationClass = animated ? 'css-grid-pattern--animated' : '';
  const typeClass = `css-grid-pattern--${type}`;

  return (
    <div
      className={`css-grid-pattern ${typeClass} ${animationClass} ${className}`}
      style={{
        opacity,
        color,
        backgroundColor,
        '--grid-size': `${size}px`,
      } as React.CSSProperties}
      aria-hidden="true"
    />
  );
}

export default GridPattern;
