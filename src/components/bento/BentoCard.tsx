'use client';

import React, { useEffect, useCallback, useRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useBentoGrid } from './BentoContext';
import type { BentoCardProps } from './types';

/**
 * Utility for merging tailwind classes
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Span class mapping for grid placement
 */
const spanClasses: Record<string, string> = {
  '1x1': 'col-span-1 row-span-1',
  '1x2': 'col-span-1 row-span-2',
  '2x1': 'col-span-2 row-span-1',
  '2x2': 'col-span-2 row-span-2',
};

/**
 * BentoCard Component
 * 
 * Individual card within the Bento Grid that can expand/collapse.
 * Uses GSAP Flip for smooth layout transitions.
 * 
 * @example
 * ```tsx
 * <BentoCard
 *   id="shipping-card"
 *   defaultSpan="1x1"
 *   expandedSpan="2x2"
 *   gradient="from-blue-500/20 to-purple-500/20"
 *   className="rounded-2xl"
 * >
 *   <BentoCardContent
 *     collapsedContent={<CollapsedView />}
 *     expandedContent={<ExpandedView />}
 *   />
 * </BentoCard>
 * ```
 */
const BentoCard: React.FC<BentoCardProps> = ({
  children,
  className,
  id,
  defaultSpan = '1x1',
  expandedSpan = '2x2',
  gradient,
}) => {
  const { registerCard, unregisterCard, expandCard, collapseCard, isCardExpanded, isAnyCardExpanded } = useBentoGrid();
  const cardRef = useRef<HTMLDivElement>(null);
  const isExpanded = isCardExpanded(id);

  // Register/unregister card with context
  useEffect(() => {
    registerCard(id, defaultSpan, expandedSpan);
    return () => unregisterCard(id);
  }, [id, defaultSpan, expandedSpan, registerCard, unregisterCard]);

  // Handle click to expand/collapse
  const handleClick = useCallback((e: React.MouseEvent) => {
    // Prevent event bubbling to avoid unintended interactions
    e.stopPropagation();
    
    if (isExpanded) {
      collapseCard();
    } else if (!isAnyCardExpanded) {
      expandCard(id);
    }
  }, [isExpanded, isAnyCardExpanded, expandCard, collapseCard, id]);

  // Handle keyboard interaction
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e as unknown as React.MouseEvent);
    }
    
    // Collapse on Escape key
    if (e.key === 'Escape' && isExpanded) {
      collapseCard();
    }
  }, [handleClick, isExpanded, collapseCard]);

  // Determine current span based on expanded state
  const currentSpan = isExpanded ? expandedSpan : defaultSpan;
  const spanClass = spanClasses[currentSpan] || spanClasses['1x1'];

  return (
    <div
      ref={cardRef}
      data-bento-card={id}
      data-flip-id={id}
      data-expanded={isExpanded}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      aria-label={isExpanded ? 'Collapse card' : 'Expand card'}
      className={cn(
        // Base styles
        'bento-card relative overflow-hidden',
        'cursor-pointer select-none',
        'transition-shadow duration-300',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        
        // Grid span
        spanClass,
        
        // Visual styles
        'rounded-2xl border border-border/50',
        'bg-card/50 backdrop-blur-sm',
        
        // Interactive states
        'hover:shadow-lg hover:border-border/80',
        isExpanded && 'shadow-xl border-border z-10',
        
        // Conditional: dim other cards when one is expanded
        isAnyCardExpanded && !isExpanded && 'opacity-60 scale-[0.98]',
        
        className
      )}
      style={{
        background: gradient ? `linear-gradient(135deg, ${gradient})` : undefined,
        willChange: isAnyCardExpanded ? 'transform' : 'auto',
      }}
    >
      {/* Gradient overlay */}
      {gradient && (
        <div 
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${gradient})`,
          }}
        />
      )}
      
      {/* Content container */}
      <div className="relative h-full w-full p-4">
        {children}
      </div>

      {/* Expand indicator */}
      {!isExpanded && !isAnyCardExpanded && (
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="text-muted-foreground"
          >
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
        </div>
      )}

      {/* Close button when expanded */}
      {isExpanded && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            collapseCard();
          }}
          className={cn(
            'absolute top-3 right-3 z-20',
            'p-2 rounded-full',
            'bg-background/80 backdrop-blur-sm',
            'hover:bg-background',
            'transition-colors duration-200',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring'
          )}
          aria-label="Close expanded view"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
};

BentoCard.displayName = 'BentoCard';

export default BentoCard;
