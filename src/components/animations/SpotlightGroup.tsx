'use client';

import React, { createContext } from 'react';

/**
 * Context interface for sharing spotlight configuration
 */
interface SpotlightContextValue {
  color: string;
  size: number;
  borderGlow: boolean;
  gradientBorder: boolean;
}

/**
 * Context for sharing spotlight configuration across cards
 */
export const SpotlightContext = createContext<SpotlightContextValue | null>(null);

interface SpotlightGroupProps {
  children: React.ReactNode;
  className?: string;
  /** Default spotlight color for all child cards */
  color?: string;
  /** Default spotlight size for all child cards (in pixels) */
  size?: number;
  /** Default border glow enabled for all child cards */
  borderGlow?: boolean;
  /** Default gradient border for all child cards */
  gradientBorder?: boolean;
}

/**
 * SpotlightGroup - Container for multiple spotlight cards
 * 
 * Manages shared configuration that can be overridden by individual cards.
 * Use this to maintain consistent styling across a group of cards.
 * 
 * @example
 * <SpotlightGroup color="rgba(100, 200, 255, 0.2)" size={250}>
 *   <SpotlightCard>
 *     <h3>Card 1</h3>
 *   </SpotlightCard>
 *   <SpotlightCard spotlightColor="rgba(255, 100, 100, 0.2)">
 *     <h3>Card 2 (override color)</h3>
 *   </SpotlightCard>
 * </SpotlightGroup>
 */
export const SpotlightGroup: React.FC<SpotlightGroupProps> = ({
  children,
  className = '',
  color = 'rgba(255, 255, 255, 0.15)',
  size = 200,
  borderGlow = true,
  gradientBorder = false,
}) => {
  const contextValue: SpotlightContextValue = {
    color,
    size,
    borderGlow,
    gradientBorder,
  };

  return (
    <SpotlightContext.Provider value={contextValue}>
      <div className={className}>
        {children}
      </div>
    </SpotlightContext.Provider>
  );
};

export default SpotlightGroup;
