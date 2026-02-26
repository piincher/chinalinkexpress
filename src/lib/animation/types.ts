/**
 * Animation System Types
 * 
 * Core type definitions for the animation infrastructure.
 * Part of the core animation library.
 */

/**
 * Performance tier levels for adaptive animation quality
 */
export type PerformanceTier = 'high' | 'medium' | 'low' | 'minimal';

/**
 * Animation group categories for organizing related animations
 */
export type AnimationGroup = 'hero' | 'card' | 'text' | 'scroll' | 'micro' | 'background';

/**
 * Specific animation types within each group
 */
export type HeroAnimationType = 'parallax' | 'globe-3d' | 'particle-field' | 'route-network';
export type CardAnimationType = 'tilt-3d' | 'spotlight' | 'flip' | 'hover-lift' | 'gradient-border';
export type TextAnimationType = 'split-type' | 'scramble' | 'typewriter' | 'wave' | 'decode';
export type ScrollAnimationType = 'fade-up' | 'stagger' | 'parallax-layer' | 'pin';
export type MicroAnimationType = 'pulse' | 'bounce' | 'shake' | 'spin';
export type BackgroundAnimationType = 'gradient-shift' | 'mesh-gradient' | 'noise';

/**
 * Union type for all animation types
 */
export type AnimationType = 
  | HeroAnimationType 
  | CardAnimationType 
  | TextAnimationType 
  | ScrollAnimationType 
  | MicroAnimationType 
  | BackgroundAnimationType;

/**
 * Configuration for an animation instance
 */
export interface AnimationConfig {
  /** Whether the animation is enabled */
  enabled: boolean;
  /** Animation duration in milliseconds */
  duration: number;
  /** Easing function name or cubic-bezier */
  easing: string;
  /** Delay before animation starts in milliseconds */
  delay: number;
  /** Number of times to repeat (0 = infinite) */
  repeat: number;
  /** Whether to reverse animation on alternate cycles */
  yoyo: boolean;
  /** Performance tier this config is optimized for */
  tier: PerformanceTier;
}

/**
 * Callback function for RAF scheduler
 */
export type RAFCallback = (deltaTime: number, timestamp: number) => void;

/**
 * Animation frame registration handle for cleanup
 */
export interface RAFHandle {
  /** Unique identifier for this registration */
  id: number;
  /** The callback function */
  callback: RAFCallback;
  /** Whether this callback is currently active */
  active: boolean;
}

/**
 * FPS monitoring metrics
 */
export interface FPSMetrics {
  /** Current frames per second */
  current: number;
  /** Average FPS over the sampling window */
  average: number;
  /** Minimum FPS recorded */
  min: number;
  /** Maximum FPS recorded */
  max: number;
  /** Number of dropped frames in the last second */
  droppedFrames: number;
  /** Percentage of frames dropped (0-100) */
  dropRate: number;
  /** Timestamp of last update */
  lastUpdate: number;
}

/**
 * Animation group configuration map
 */
export type AnimationGroupConfig = {
  [K in AnimationGroup]: {
    [key: string]: AnimationType;
  };
};

/**
 * Tier-based animation selection result
 */
export interface TierSelectionResult {
  /** The selected animation type appropriate for the tier */
  type: AnimationType;
  /** Quality settings for this tier */
  quality: 'full' | 'reduced' | 'minimal' | 'static';
  /** Whether to use GPU acceleration */
  useGPU: boolean;
  /** Maximum complexity level (1-10) */
  complexity: number;
}

/**
 * Event detail for animation degradation events
 */
export interface DegradationEventDetail {
  /** Current FPS that triggered degradation */
  fps: number;
  /** Recommended tier for current performance */
  recommendedTier: PerformanceTier;
  /** Previous tier before degradation */
  previousTier: PerformanceTier;
  /** Severity of the performance issue */
  severity: 'mild' | 'moderate' | 'severe';
}

/**
 * Performance thresholds for tier determination
 */
export interface PerformanceThresholds {
  /** FPS threshold for high tier */
  highTierMinFPS: number;
  /** FPS threshold for medium tier */
  mediumTierMinFPS: number;
  /** FPS threshold for low tier */
  lowTierMinFPS: number;
  /** Maximum pixel count for high tier devices */
  highTierMaxPixels: number;
  /** Sampling window size for FPS averaging in ms */
  fpsSampleWindow: number;
  /** Number of consecutive low FPS readings before degradation */
  degradationTriggerCount: number;
}
