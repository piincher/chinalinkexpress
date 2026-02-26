/**
 * Animation Hooks
 * 
 * Collection of reusable animation hooks for viewport detection,
 * performance tiering, and interactive effects.
 */

export { useAnimationActivation } from './useAnimationActivation';
export type { 
  UseAnimationActivationOptions, 
  UseAnimationActivationReturn 
} from './useAnimationActivation';

export { useAnimationTier } from './useAnimationTier';
export type { AnimationTier, AnimationDegradeEvent } from './useAnimationTier';

export { 
  useSectionAnimation, 
  AnimationContext 
} from './useSectionAnimation';
export type { 
  UseSectionAnimationOptions, 
  UseSectionAnimationReturn,
  AnimationContextType 
} from './useSectionAnimation';

export { useMagneticEffect } from './useMagneticEffect';
export type { MagneticPosition, UseMagneticEffectReturn } from './useMagneticEffect';

export { useSpotlight } from './useSpotlight';
export type { SpotlightPosition, UseSpotlightReturn } from './useSpotlight';
