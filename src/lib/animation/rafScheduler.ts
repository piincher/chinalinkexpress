/**
 * RAF Scheduler
 * 
 * Global singleton for batching all animation RAF calls.
 * Deduplicates multiple RAF requests into a single frame callback
 * for optimal performance.
 * 
 * Usage:
 *   const id = rafScheduler.add((deltaTime, timestamp) => {
 *     // Animation frame logic
 *   });
 *   
 *   rafScheduler.remove(id);
 *   
 *   // Cleanup all
 *   rafScheduler.destroy();
 */

import type { RAFCallback, RAFHandle } from './types';

/**
 * Singleton RAF scheduler class
 */
class RAFScheduler {
  private static instance: RAFScheduler | null = null;
  private callbacks: Map<number, RAFCallback> = new Map();
  private handles: Map<number, RAFHandle> = new Map();
  private nextId = 1;
  private rafId: number | null = null;
  private isRunning = false;
  private lastTimestamp = 0;
  private lastDeltaTime = 0;

  /**
   * Get the singleton instance
   */
  static getInstance(): RAFScheduler {
    if (!RAFScheduler.instance) {
      RAFScheduler.instance = new RAFScheduler();
    }
    return RAFScheduler.instance;
  }

  /**
   * Private constructor to enforce singleton
   */
  private constructor() {
    // Ensure we start fresh
    this.reset();
  }

  /**
   * Reset the scheduler state
   */
  private reset(): void {
    this.callbacks.clear();
    this.handles.clear();
    this.nextId = 1;
    this.lastTimestamp = 0;
    this.lastDeltaTime = 0;
  }

  /**
   * Add a callback to be invoked on each animation frame
   * @param callback - The function to call on each frame
   * @returns Handle ID for removal
   */
  add(callback: RAFCallback): number {
    const id = this.nextId++;
    this.callbacks.set(id, callback);
    this.handles.set(id, {
      id,
      callback,
      active: true,
    });

    // Start the scheduler if not already running
    if (!this.isRunning) {
      this.start();
    }

    return id;
  }

  /**
   * Remove a callback by its handle ID
   * @param id - The handle ID returned by add()
   * @returns True if a callback was removed
   */
  remove(id: number): boolean {
    const existed = this.callbacks.has(id);
    this.callbacks.delete(id);
    this.handles.delete(id);

    // Stop scheduler if no more callbacks
    if (this.callbacks.size === 0) {
      this.stop();
    }

    return existed;
  }

  /**
   * Check if a handle is active
   * @param id - The handle ID
   */
  isActive(id: number): boolean {
    return this.handles.has(id) && this.handles.get(id)!.active;
  }

  /**
   * Get the number of active callbacks
   */
  get activeCount(): number {
    return this.callbacks.size;
  }

  /**
   * Get the last recorded delta time
   */
  get deltaTime(): number {
    return this.lastDeltaTime;
  }

  /**
   * Get the last recorded timestamp
   */
  get timestamp(): number {
    return this.lastTimestamp;
  }

  /**
   * Start the RAF loop
   */
  private start(): void {
    if (this.isRunning || typeof window === 'undefined') return;

    this.isRunning = true;
    this.lastTimestamp = performance.now();
    this.rafId = requestAnimationFrame(this.tick);
  }

  /**
   * Stop the RAF loop
   */
  private stop(): void {
    if (!this.isRunning) return;

    this.isRunning = false;

    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  /**
   * Main animation frame tick - calls all registered callbacks
   */
  private tick = (timestamp: number): void => {
    // Calculate delta time (clamped to prevent large jumps)
    const rawDelta = timestamp - this.lastTimestamp;
    this.lastDeltaTime = Math.min(rawDelta, 100); // Cap at 100ms
    this.lastTimestamp = timestamp;

    // Call all registered callbacks
    // Use a copy to allow callbacks to add/remove during iteration
    const callbacks = Array.from(this.callbacks.values());
    for (let i = 0; i < callbacks.length; i++) {
      try {
        callbacks[i](this.lastDeltaTime, timestamp);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('RAF callback error:', error);
      }
    }

    // Continue the loop if still running
    if (this.isRunning) {
      this.rafId = requestAnimationFrame(this.tick);
    }
  };

  /**
   * Pause all animations (stops RAF but keeps callbacks)
   */
  pause(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.isRunning = false;
  }

  /**
   * Resume animations after pause
   */
  resume(): void {
    if (!this.isRunning && this.callbacks.size > 0) {
      this.start();
    }
  }

  /**
   * Destroy the scheduler and clean up all resources
   */
  destroy(): void {
    this.stop();
    this.reset();
    RAFScheduler.instance = null;
  }

  /**
   * Clear all callbacks without destroying the scheduler
   */
  clear(): void {
    this.callbacks.clear();
    this.handles.clear();
    this.stop();
  }
}

/**
 * Global RAF scheduler singleton instance
 */
export const rafScheduler = RAFScheduler.getInstance();

/**
 * Convenience function to add a RAF callback
 * @param callback - The animation callback
 * @returns Handle ID for removal
 */
export function addRAF(callback: RAFCallback): number {
  return rafScheduler.add(callback);
}

/**
 * Convenience function to remove a RAF callback
 * @param id - The handle ID
 */
export function removeRAF(id: number): void {
  rafScheduler.remove(id);
}

/**
 * Convenience function to pause all animations
 */
export function pauseRAF(): void {
  rafScheduler.pause();
}

/**
 * Convenience function to resume animations
 */
export function resumeRAF(): void {
  rafScheduler.resume();
}
