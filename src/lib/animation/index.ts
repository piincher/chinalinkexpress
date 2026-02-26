/**
 * Animation Library
 * 
 * Core animation infrastructure for the application.
 * Provides RAF batching, performance monitoring, and animation group management.
 * 
 * @example
 * import { 
 *   rafScheduler, 
 *   performanceMonitor, 
 *   selectAnimationForGroup,
 *   ANIMATION_GROUPS 
 * } from '@/lib/animation';
 */

// Types
export type {
  PerformanceTier,
  AnimationGroup,
  AnimationType,
  HeroAnimationType,
  CardAnimationType,
  TextAnimationType,
  ScrollAnimationType,
  MicroAnimationType,
  BackgroundAnimationType,
  AnimationConfig,
  RAFCallback,
  RAFHandle,
  FPSMetrics,
  PerformanceThresholds,
  TierSelectionResult,
  DegradationEventDetail,
} from './types';

// RAF Scheduler
export {
  rafScheduler,
  addRAF,
  removeRAF,
  pauseRAF,
  resumeRAF,
} from './rafScheduler';

// Performance Monitor
export {
  performanceMonitor,
  PerformanceMonitor,
  startPerformanceMonitor,
  stopPerformanceMonitor,
  getFPSMetrics,
  getCurrentTier,
  DEFAULT_THRESHOLDS,
  DEGRADATION_EVENT,
} from './performanceMonitor';

// Animation Groups
export {
  ANIMATION_GROUPS,
  HERO_ANIMATIONS,
  CARD_ANIMATIONS,
  TEXT_ANIMATIONS,
  SCROLL_ANIMATIONS,
  MICRO_ANIMATIONS,
  BACKGROUND_ANIMATIONS,
  selectAnimationForGroup,
  getAnimationsForGroup,
  isAnimationSuitableForTier,
  getAnimationWithFallback,
  COMPLEXITY_THRESHOLDS,
  shouldUseGPU,
  GROUP_PRIORITY,
} from './groups';
