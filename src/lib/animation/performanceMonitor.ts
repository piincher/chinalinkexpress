/**
 * Performance Monitor
 * 
 * FPS monitoring with automatic quality degradation.
 * Tracks frame rate, dropped frames, and dispatches degradation events
 * when performance falls below thresholds.
 * 
 * Usage:
 *   const monitor = PerformanceMonitor.getInstance();
 *   monitor.start();
 *   
 *   // Listen for degradation events
 *   window.addEventListener('animation:degrade', (e) => {
 *     console.log('Degraded to:', e.detail.recommendedTier);
 *   });
 *   
 *   monitor.stop();
 */

import type { 
  PerformanceTier, 
  FPSMetrics, 
  PerformanceThresholds,
  DegradationEventDetail 
} from './types';

/**
 * Default performance thresholds
 */
const DEFAULT_THRESHOLDS: PerformanceThresholds = {
  highTierMinFPS: 55,
  mediumTierMinFPS: 30,
  lowTierMinFPS: 15,
  highTierMaxPixels: 2073600, // 1920x1080
  fpsSampleWindow: 1000,
  degradationTriggerCount: 3,
};

/**
 * Custom event name for degradation events
 */
export const DEGRADATION_EVENT = 'animation:degrade';

/**
 * Performance monitor singleton class
 */
class PerformanceMonitor {
  private static instance: PerformanceMonitor | null = null;
  private rafId: number | null = null;
  private isRunning = false;
  private frameCount = 0;
  private droppedFrameCount = 0;
  private lastFrameTime = 0;
  private lastSecondTime = 0;
  private sampleStartTime = 0;
  private lowFpsStreak = 0;
  private currentTier: PerformanceTier = 'high';
  private thresholds: PerformanceThresholds;

  private metrics: FPSMetrics = {
    current: 60,
    average: 60,
    min: 60,
    max: 60,
    droppedFrames: 0,
    dropRate: 0,
    lastUpdate: 0,
  };

  private samples: number[] = [];
  private readonly maxSamples = 60; // Keep last 60 samples (approx 1 second at 60fps)

  /**
   * Get the singleton instance
   */
  static getInstance(thresholds?: Partial<PerformanceThresholds>): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor(thresholds);
    }
    return PerformanceMonitor.instance;
  }

  /**
   * Private constructor
   */
  private constructor(thresholds?: Partial<PerformanceThresholds>) {
    this.thresholds = { ...DEFAULT_THRESHOLDS, ...thresholds };
    this.reset();
  }

  /**
   * Reset all metrics
   */
  private reset(): void {
    this.frameCount = 0;
    this.droppedFrameCount = 0;
    this.lastFrameTime = 0;
    this.lastSecondTime = 0;
    this.sampleStartTime = 0;
    this.lowFpsStreak = 0;
    this.currentTier = 'high';
    this.samples = [];
    this.metrics = {
      current: 60,
      average: 60,
      min: 60,
      max: 60,
      droppedFrames: 0,
      dropRate: 0,
      lastUpdate: 0,
    };
  }

  /**
   * Start monitoring performance
   */
  start(): void {
    if (this.isRunning || typeof window === 'undefined') return;

    this.isRunning = true;
    this.lastFrameTime = performance.now();
    this.lastSecondTime = this.lastFrameTime;
    this.sampleStartTime = this.lastFrameTime;

    this.tick();
  }

  /**
   * Stop monitoring performance
   */
  stop(): void {
    this.isRunning = false;

    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  /**
   * Destroy the monitor instance
   */
  destroy(): void {
    this.stop();
    this.reset();
    PerformanceMonitor.instance = null;
  }

  /**
   * Get current FPS metrics
   */
  getMetrics(): FPSMetrics {
    return { ...this.metrics };
  }

  /**
   * Get current performance tier
   */
  getCurrentTier(): PerformanceTier {
    return this.currentTier;
  }

  /**
   * Set performance thresholds
   */
  setThresholds(thresholds: Partial<PerformanceThresholds>): void {
    this.thresholds = { ...this.thresholds, ...thresholds };
  }

  /**
   * Force a specific tier (disables auto-degradation)
   */
  forceTier(tier: PerformanceTier): void {
    this.currentTier = tier;
    this.lowFpsStreak = 0; // Reset streak to prevent immediate override
  }

  /**
   * Check if the monitor is currently running
   */
  get running(): boolean {
    return this.isRunning;
  }

  /**
   * Calculate the appropriate tier based on FPS
   */
  private calculateTierForFPS(fps: number): PerformanceTier {
    if (fps >= this.thresholds.highTierMinFPS) return 'high';
    if (fps >= this.thresholds.mediumTierMinFPS) return 'medium';
    if (fps >= this.thresholds.lowTierMinFPS) return 'low';
    return 'minimal';
  }

  /**
   * Determine severity of performance degradation
   */
  private getSeverity(fps: number): 'mild' | 'moderate' | 'severe' {
    if (fps < this.thresholds.lowTierMinFPS) return 'severe';
    if (fps < this.thresholds.mediumTierMinFPS) return 'moderate';
    return 'mild';
  }

  /**
   * Dispatch degradation event
   */
  private dispatchDegradationEvent(recommendedTier: PerformanceTier, fps: number): void {
    const previousTier = this.currentTier;
    
    // Only dispatch if tier actually changed
    if (recommendedTier === previousTier) return;

    const detail: DegradationEventDetail = {
      fps,
      recommendedTier,
      previousTier,
      severity: this.getSeverity(fps),
    };

    const event = new CustomEvent(DEGRADATION_EVENT, { detail });
    window.dispatchEvent(event);

    this.currentTier = recommendedTier;
  }

  /**
   * Update metrics and check for degradation
   */
  private updateMetrics(timestamp: number): void {
    // Calculate frame time
    const frameTime = timestamp - this.lastFrameTime;
    this.lastFrameTime = timestamp;

    // Calculate expected frame time (assuming 60fps target)
    const expectedFrameTime = 1000 / 60;

    // Count dropped frames (frames that took longer than expected)
    if (frameTime > expectedFrameTime * 1.5) {
      const dropped = Math.floor(frameTime / expectedFrameTime) - 1;
      this.droppedFrameCount += Math.max(0, dropped);
    }

    this.frameCount++;

    // Calculate FPS every second
    const timeSinceLastSecond = timestamp - this.lastSecondTime;
    if (timeSinceLastSecond >= this.thresholds.fpsSampleWindow) {
      const currentFPS = Math.round((this.frameCount * 1000) / timeSinceLastSecond);
      
      // Update samples
      this.samples.push(currentFPS);
      if (this.samples.length > this.maxSamples) {
        this.samples.shift();
      }

      // Calculate average
      const avgFPS = Math.round(
        this.samples.reduce((a, b) => a + b, 0) / this.samples.length
      );

      // Update metrics
      this.metrics = {
        current: currentFPS,
        average: avgFPS,
        min: Math.min(this.metrics.min, currentFPS),
        max: Math.max(this.metrics.max, currentFPS),
        droppedFrames: this.droppedFrameCount,
        dropRate: Math.round((this.droppedFrameCount / (this.frameCount + this.droppedFrameCount)) * 100),
        lastUpdate: timestamp,
      };

      // Check for degradation
      const recommendedTier = this.calculateTierForFPS(currentFPS);
      
      if (recommendedTier !== this.currentTier && recommendedTier !== 'high') {
        this.lowFpsStreak++;
        
        // Trigger degradation after consecutive low readings
        if (this.lowFpsStreak >= this.thresholds.degradationTriggerCount) {
          this.dispatchDegradationEvent(recommendedTier, currentFPS);
          this.lowFpsStreak = 0;
        }
      } else {
        // Reset streak if performance recovers
        this.lowFpsStreak = Math.max(0, this.lowFpsStreak - 1);
        
        // Also handle upgrade (tier improved)
        if (recommendedTier !== this.currentTier && this.currentTier !== 'high') {
          this.dispatchDegradationEvent(recommendedTier, currentFPS);
        }
      }

      // Reset counters
      this.frameCount = 0;
      this.droppedFrameCount = 0;
      this.lastSecondTime = timestamp;
    }
  }

  /**
   * Main RAF tick
   */
  private tick = (): void => {
    if (!this.isRunning) return;

    const timestamp = performance.now();
    this.updateMetrics(timestamp);

    this.rafId = requestAnimationFrame(this.tick);
  };
}

/**
 * Global performance monitor singleton
 */
export const performanceMonitor = PerformanceMonitor.getInstance();

/**
 * Start performance monitoring
 */
export function startPerformanceMonitor(thresholds?: Partial<PerformanceThresholds>): PerformanceMonitor {
  const monitor = PerformanceMonitor.getInstance(thresholds);
  monitor.start();
  return monitor;
}

/**
 * Stop performance monitoring
 */
export function stopPerformanceMonitor(): void {
  performanceMonitor.stop();
}

/**
 * Get current FPS metrics
 */
export function getFPSMetrics(): FPSMetrics {
  return performanceMonitor.getMetrics();
}

/**
 * Get current performance tier
 */
export function getCurrentTier(): PerformanceTier {
  return performanceMonitor.getCurrentTier();
}

export { PerformanceMonitor, DEFAULT_THRESHOLDS };
