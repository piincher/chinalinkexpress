/**
 * AnimationOrchestrator
 * 
 * Context provider that manages the active animation section state.
 * Only ONE section can be active at a time.
 * 
 * @example
 * ```tsx
 * <AnimationOrchestrator>
 *   <YourApp />
 * </AnimationOrchestrator>
 * ```
 */

'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

/**
 * Animation context state interface
 */
export interface AnimationContextState {
  /** Currently active section ID, null if no section is active */
  activeSection: string | null;
  /** Register a section as active */
  registerSection: (id: string) => void;
  /** Unregister a section (clears if it's the current active) */
  unregisterSection: (id: string) => void;
}

/**
 * Animation context with default values
 */
export const AnimationContext = createContext<AnimationContextState>({
  activeSection: null,
  registerSection: () => {
    // no-op default
  },
  unregisterSection: () => {
    // no-op default
  },
});

/**
 * Props for AnimationOrchestrator provider component
 */
export interface AnimationOrchestratorProps {
  /** Child components */
  children: React.ReactNode;
  /** Optional initial active section ID */
  initialActiveSection?: string | null;
}

/**
 * AnimationOrchestrator provider component
 * 
 * Manages the active section state and provides registration functions.
 * Only one section can be active at a time - registering a new section
 * will replace the currently active one.
 */
export function AnimationOrchestrator({
  children,
  initialActiveSection = null,
}: AnimationOrchestratorProps): React.ReactElement {
  const [activeSection, setActiveSection] = useState<string | null>(initialActiveSection);

  /**
   * Register a section as the active section.
   * This will replace any currently active section.
   */
  const registerSection = useCallback((id: string) => {
    setActiveSection((current) => {
      // Always update to the new section (only one active at a time)
      return id;
    });
  }, []);

  /**
   * Unregister a section.
   * Only clears the active section if the provided ID matches the current active.
   */
  const unregisterSection = useCallback((id: string) => {
    setActiveSection((current) => {
      // Only clear if this is the currently active section
      if (current === id) {
        return null;
      }
      return current;
    });
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo<AnimationContextState>(
    () => ({
      activeSection,
      registerSection,
      unregisterSection,
    }),
    [activeSection, registerSection, unregisterSection]
  );

  return (
    <AnimationContext.Provider value={contextValue}>
      {children}
    </AnimationContext.Provider>
  );
}

/**
 * Hook to access the animation context.
 * 
 * @throws Error if used outside of AnimationOrchestrator
 * @returns AnimationContextState
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { activeSection, registerSection, unregisterSection } = useAnimationContext();
 *   // ...
 * }
 * ```
 */
export function useAnimationContext(): AnimationContextState {
  const context = useContext(AnimationContext);
  
  if (context === undefined) {
    throw new Error(
      'useAnimationContext must be used within an AnimationOrchestrator'
    );
  }
  
  return context;
}

export default AnimationOrchestrator;
