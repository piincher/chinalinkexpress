'use client';

import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { BentoCardContentProps } from './types';

/**
 * Utility for merging tailwind classes
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * BentoCardContent Component
 * 
 * Content wrapper for BentoCards that handles visibility transitions
 * between collapsed and expanded states.
 * 
 * @example
 * ```tsx
 * <BentoCardContent
 *   collapsedContent={
 *     <div className="h-full flex flex-col justify-end">
 *       <h3 className="font-semibold">Air Freight</h3>
 *       <p className="text-sm text-muted-foreground">2-5 days</p>
 *     </div>
 *   }
 *   expandedContent={
 *     <div className="h-full flex flex-col">
 *       <h3 className="text-2xl font-bold mb-4">Air Freight Services</h3>
 *       <p>Detailed content about air freight...</p>
 *     </div>
 *   }
 * />
 * ```
 */
const BentoCardContent: React.FC<BentoCardContentProps> = ({
  children,
  className,
  collapsedContent,
  expandedContent,
}) => {
  return (
    <div 
      className={cn(
        'bento-card-content',
        'h-full w-full',
        'flex flex-col',
        className
      )}
    >
      {/* Collapsed content - always visible but may be partially hidden */}
      {collapsedContent && (
        <div 
          className={cn(
            'bento-collapsed-content',
            'transition-opacity duration-300',
            // When using both collapsed and expanded content, 
            // the parent card manages visibility via data-expanded
            '[&[data-expanded="true"]_.bento-collapsed-content]:opacity-0',
            '[&[data-expanded="true"]_.bento-collapsed-content]:pointer-events-none'
          )}
        >
          {collapsedContent}
        </div>
      )}

      {/* Expanded content */}
      {expandedContent && (
        <div 
          className={cn(
            'bento-expanded-content',
            'absolute inset-0 p-4',
            'opacity-0 pointer-events-none',
            'transition-opacity duration-300 delay-150',
            // Show when parent is expanded
            '[&[data-expanded="true"]_.bento-expanded-content]:opacity-100',
            '[&[data-expanded="true"]_.bento-expanded-content]:pointer-events-auto'
          )}
        >
          {expandedContent}
        </div>
      )}

      {/* Generic children (used when not using collapsed/expanded pattern) */}
      {!collapsedContent && !expandedContent && children && (
        <div className="bento-default-content h-full">
          {children}
        </div>
      )}
    </div>
  );
};

BentoCardContent.displayName = 'BentoCardContent';

export default BentoCardContent;
