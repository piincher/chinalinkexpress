/**
 * Animation Groups
 * 
 * Defines animation group configurations and tier-based selection logic.
 * Organizes animations by category and provides utilities for selecting
 * appropriate animations based on device performance tier.
 * 
 * Usage:
 *   const animation = selectAnimationForGroup('hero', 'high');
 *   // Returns: { type: 'globe-3d', quality: 'full', useGPU: true, complexity: 10 }
 */

import type { 
  AnimationGroup, 
  AnimationType,
  PerformanceTier,
  TierSelectionResult,
  HeroAnimationType,
  CardAnimationType,
  TextAnimationType,
  ScrollAnimationType,
  MicroAnimationType,
  BackgroundAnimationType
} from './types';

/**
 * Hero section animation types
 */
export const HERO_ANIMATIONS = {
  /** Parallax scrolling effect */
  PARALLAX: 'parallax' as HeroAnimationType,
  /** 3D globe visualization */
  GLOBE_3D: 'globe-3d' as HeroAnimationType,
  /** Particle field background */
  PARTICLE_FIELD: 'particle-field' as HeroAnimationType,
  /** Animated route network */
  ROUTE_NETWORK: 'route-network' as HeroAnimationType,
} as const;

/**
 * Card component animation types
 */
export const CARD_ANIMATIONS = {
  /** 3D tilt on hover */
  TILT_3D: 'tilt-3d' as CardAnimationType,
  /** Spotlight/follow cursor effect */
  SPOTLIGHT: 'spotlight' as CardAnimationType,
  /** Card flip animation */
  FLIP: 'flip' as CardAnimationType,
  /** Subtle lift on hover */
  HOVER_LIFT: 'hover-lift' as CardAnimationType,
  /** Animated gradient border */
  GRADIENT_BORDER: 'gradient-border' as CardAnimationType,
} as const;

/**
 * Text animation types
 */
export const TEXT_ANIMATIONS = {
  /** Split text with character animation */
  SPLIT_TYPE: 'split-type' as TextAnimationType,
  /** Text scramble decode effect */
  SCRAMBLE: 'scramble' as TextAnimationType,
  /** Typewriter effect */
  TYPEWRITER: 'typewriter' as TextAnimationType,
  /** Wave motion on text */
  WAVE: 'wave' as TextAnimationType,
  /** Decode/reveal effect */
  DECODE: 'decode' as TextAnimationType,
} as const;

/**
 * Scroll-triggered animation types
 */
export const SCROLL_ANIMATIONS = {
  /** Fade in with upward movement */
  FADE_UP: 'fade-up' as ScrollAnimationType,
  /** Staggered children animation */
  STAGGER: 'stagger' as ScrollAnimationType,
  /** Parallax layer movement */
  PARALLAX_LAYER: 'parallax-layer' as ScrollAnimationType,
  /** Pin element during scroll */
  PIN: 'pin' as ScrollAnimationType,
} as const;

/**
 * Micro-interaction animation types
 */
export const MICRO_ANIMATIONS = {
  /** Pulsing animation */
  PULSE: 'pulse' as MicroAnimationType,
  /** Bouncing animation */
  BOUNCE: 'bounce' as MicroAnimationType,
  /** Shake animation */
  SHAKE: 'shake' as MicroAnimationType,
  /** Spin/rotate animation */
  SPIN: 'spin' as MicroAnimationType,
} as const;

/**
 * Background animation types
 */
export const BACKGROUND_ANIMATIONS = {
  /** Shifting gradient background */
  GRADIENT_SHIFT: 'gradient-shift' as BackgroundAnimationType,
  /** Mesh gradient effect */
  MESH_GRADIENT: 'mesh-gradient' as BackgroundAnimationType,
  /** Animated noise texture */
  NOISE: 'noise' as BackgroundAnimationType,
} as const;

/**
 * All animation groups organized by category
 */
export const ANIMATION_GROUPS = {
  /** Hero section animations */
  HERO: HERO_ANIMATIONS,
  /** Card component animations */
  CARD: CARD_ANIMATIONS,
  /** Text reveal/entrance animations */
  TEXT: TEXT_ANIMATIONS,
  /** Scroll-triggered animations */
  SCROLL: SCROLL_ANIMATIONS,
  /** Micro-interaction animations */
  MICRO: MICRO_ANIMATIONS,
  /** Background effect animations */
  BACKGROUND: BACKGROUND_ANIMATIONS,
} as const;

/**
 * Type for animation group keys
 */
type AnimationGroupKey = keyof typeof ANIMATION_GROUPS;

/**
 * Tier configuration for each animation type
 * Maps animation groups to their tier-based implementations
 */
type TierConfig = {
  [K in PerformanceTier]: {
    type: AnimationType;
    quality: TierSelectionResult['quality'];
    useGPU: boolean;
    complexity: number;
  };
};

/**
 * Group-specific tier configurations
 */
const GROUP_TIER_CONFIGS: Record<AnimationGroupKey, TierConfig> = {
  HERO: {
    high: { type: 'globe-3d', quality: 'full', useGPU: true, complexity: 10 },
    medium: { type: 'particle-field', quality: 'reduced', useGPU: true, complexity: 6 },
    low: { type: 'route-network', quality: 'minimal', useGPU: false, complexity: 3 },
    minimal: { type: 'parallax', quality: 'static', useGPU: false, complexity: 1 },
  },
  CARD: {
    high: { type: 'tilt-3d', quality: 'full', useGPU: true, complexity: 8 },
    medium: { type: 'spotlight', quality: 'reduced', useGPU: true, complexity: 5 },
    low: { type: 'hover-lift', quality: 'minimal', useGPU: false, complexity: 2 },
    minimal: { type: 'hover-lift', quality: 'static', useGPU: false, complexity: 1 },
  },
  TEXT: {
    high: { type: 'split-type', quality: 'full', useGPU: true, complexity: 7 },
    medium: { type: 'scramble', quality: 'reduced', useGPU: false, complexity: 4 },
    low: { type: 'typewriter', quality: 'minimal', useGPU: false, complexity: 2 },
    minimal: { type: 'typewriter', quality: 'static', useGPU: false, complexity: 1 },
  },
  SCROLL: {
    high: { type: 'parallax-layer', quality: 'full', useGPU: true, complexity: 8 },
    medium: { type: 'fade-up', quality: 'reduced', useGPU: true, complexity: 4 },
    low: { type: 'stagger', quality: 'minimal', useGPU: false, complexity: 2 },
    minimal: { type: 'fade-up', quality: 'static', useGPU: false, complexity: 1 },
  },
  MICRO: {
    high: { type: 'pulse', quality: 'full', useGPU: true, complexity: 3 },
    medium: { type: 'pulse', quality: 'reduced', useGPU: false, complexity: 2 },
    low: { type: 'bounce', quality: 'minimal', useGPU: false, complexity: 1 },
    minimal: { type: 'bounce', quality: 'static', useGPU: false, complexity: 1 },
  },
  BACKGROUND: {
    high: { type: 'mesh-gradient', quality: 'full', useGPU: true, complexity: 9 },
    medium: { type: 'gradient-shift', quality: 'reduced', useGPU: true, complexity: 5 },
    low: { type: 'noise', quality: 'minimal', useGPU: false, complexity: 2 },
    minimal: { type: 'gradient-shift', quality: 'static', useGPU: false, complexity: 1 },
  },
};

/**
 * Select the appropriate animation configuration for a given group and tier
 * 
 * @param group - The animation group category
 * @param tier - The performance tier ('high' | 'medium' | 'low' | 'minimal')
 * @returns TierSelectionResult with animation type and quality settings
 * 
 * @example
 * const result = selectAnimationForGroup('hero', 'high');
 * // { type: 'globe-3d', quality: 'full', useGPU: true, complexity: 10 }
 */
export function selectAnimationForGroup(
  group: AnimationGroup | AnimationGroupKey,
  tier: PerformanceTier
): TierSelectionResult {
  const upperGroup = group.toUpperCase() as AnimationGroupKey;
  const config = GROUP_TIER_CONFIGS[upperGroup];
  
  if (!config) {
    // Return a safe fallback for unknown groups
    return {
      type: 'fade-up',
      quality: 'static',
      useGPU: false,
      complexity: 1,
    };
  }

  return config[tier];
}

/**
 * Get all available animation types for a specific group
 * 
 * @param group - The animation group category
 * @returns Array of animation type names
 */
export function getAnimationsForGroup(group: AnimationGroup | AnimationGroupKey): string[] {
  const upperGroup = group.toUpperCase() as AnimationGroupKey;
  const groupConfig = ANIMATION_GROUPS[upperGroup];
  
  if (!groupConfig) return [];
  
  return Object.values(groupConfig);
}

/**
 * Check if a specific animation type is available for a given tier
 * 
 * @param group - The animation group category
 * @param type - The animation type to check
 * @param tier - The performance tier
 * @returns True if the animation is suitable for the tier
 */
export function isAnimationSuitableForTier(
  group: AnimationGroup | AnimationGroupKey,
  type: AnimationType,
  tier: PerformanceTier
): boolean {
  const selection = selectAnimationForGroup(group, tier);
  return selection.type === type;
}

/**
 * Get the best available animation for the current tier,
 * falling back to lower tiers if needed
 * 
 * @param group - The animation group category
 * @param tier - The target performance tier
 * @returns TierSelectionResult with fallback applied
 */
export function getAnimationWithFallback(
  group: AnimationGroup | AnimationGroupKey,
  tier: PerformanceTier
): TierSelectionResult {
  const tiers: PerformanceTier[] = ['high', 'medium', 'low', 'minimal'];
  const startIndex = tiers.indexOf(tier);
  
  for (let i = startIndex; i < tiers.length; i++) {
    const selection = selectAnimationForGroup(group, tiers[i]);
    // Return if we found a valid selection (always will, but for future extensibility)
    if (selection) return selection;
  }
  
  // Ultimate fallback
  return {
    type: 'fade-up',
    quality: 'static',
    useGPU: false,
    complexity: 1,
  };
}

/**
 * Complexity threshold constants for quick checks
 */
export const COMPLEXITY_THRESHOLDS = {
  /** Animations with complexity <= 3 are considered lightweight */
  LIGHTWEIGHT: 3,
  /** Animations with complexity <= 6 are considered medium */
  MEDIUM: 6,
  /** Animations with complexity > 6 are considered heavy */
  HEAVY: 7,
} as const;

/**
 * Check if an animation complexity level is GPU-intensive
 * 
 * @param complexity - The complexity score (1-10)
 * @returns True if the animation should use GPU acceleration
 */
export function shouldUseGPU(complexity: number): boolean {
  return complexity >= COMPLEXITY_THRESHOLDS.MEDIUM;
}

/**
 * Group priority levels for load ordering
 */
export const GROUP_PRIORITY = {
  HERO: 1,      // Load first - most visible
  TEXT: 2,      // Second - user-facing content
  SCROLL: 3,    // Third - scroll interactions
  CARD: 4,      // Fourth - interactive elements
  MICRO: 5,     // Fifth - small interactions
  BACKGROUND: 6, // Last - least critical
} as const;
