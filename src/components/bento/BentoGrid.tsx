'use client';

import React, { useRef, forwardRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { BentoProvider } from './BentoContext';
import type { BentoGridProps } from './types';

/**
 * Utility for merging tailwind classes
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * BentoGrid Component
 * 
 * Main container for the Bento Grid layout system.
 * Manages the expanded state and provides GSAP Flip context to child cards.
 * 
 * @example
 * ```tsx
 * <BentoGrid className="max-w-6xl mx-auto" columns={4}>
 *   <BentoCard id="card-1" defaultSpan="1x1" expandedSpan="2x2">
 *     Content
 *   </BentoCard>
 *   <BentoCard id="card-2" defaultSpan="1x2">
 *     Content
 *   </BentoCard>
 * </BentoGrid>
 * ```
 */
const BentoGrid = forwardRef<HTMLElement, BentoGridProps>(
  ({ children, className, columns = 4, gap = '1rem' }, forwardedRef) => {
    const internalRef = useRef<HTMLElement>(null);
    const gridRef = forwardedRef && 'current' in forwardedRef 
      ? forwardedRef as React.RefObject<HTMLElement | null>
      : internalRef;

    // Generate grid template columns style
    const gridStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      gap,
    };

    return (
      <BentoProvider gridRef={gridRef}>
        <section
          ref={gridRef as React.RefObject<HTMLElement>}
          className={cn(
            'bento-grid relative',
            'auto-rows-[200px]',
            className
          )}
          style={gridStyle}
          data-bento-grid
        >
          {children}
        </section>
      </BentoProvider>
    );
  }
);

BentoGrid.displayName = 'BentoGrid';

export default BentoGrid;
