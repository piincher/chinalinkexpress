/**
 * Animation Components
 * 
 * Barrel exports for animation orchestration components.
 * 
 * @example
 * ```tsx
 * // Import everything
 * import { AnimationProvider, useAnimationContext } from '@/components/animation';
 * 
 * // Use in layout
 * <AnimationProvider>
 *   <YourApp />
 * </AnimationProvider>
 * 
 * // Use in component
 * const { activeSection, registerSection, unregisterSection } = useAnimationContext();
 * ```
 */

// Main provider (use this in your layout)
export { AnimationProvider } from './AnimationProvider';
export type { AnimationProviderProps } from './AnimationProvider';

// Orchestrator context and hook
export { AnimationOrchestrator, AnimationContext, useAnimationContext } from './AnimationOrchestrator';
export type { AnimationContextState } from './AnimationOrchestrator';
