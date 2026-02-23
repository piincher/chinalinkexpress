/**
 * useCountdown Hook
 * 
 * Generic countdown hook that calculates time remaining to a target date.
 * Handles SSR (no hydration mismatch) and cleans up on unmount.
 * Part of the countdown feature.
 */

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { CountdownTime } from '@/features/live-features/types';

interface UseCountdownOptions {
  /** Target date as ISO string or Date object */
  targetDate: string | Date;
  /** Interval in milliseconds (default: 1000) */
  interval?: number;
  /** Callback when countdown expires */
  onExpire?: () => void;
  /** Urgent threshold in hours (default: 24) */
  urgentThreshold?: number;
}

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

/**
 * Calculate time remaining to target date
 */
function calculateTimeRemaining(targetDate: Date, urgentThresholdHours: number): CountdownTime {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const difference = target - now;

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
      isExpired: true,
      isUrgent: false,
    };
  }

  const days = Math.floor(difference / DAY);
  const hours = Math.floor((difference % DAY) / HOUR);
  const minutes = Math.floor((difference % HOUR) / MINUTE);
  const seconds = Math.floor((difference % MINUTE) / SECOND);
  const totalSeconds = Math.floor(difference / SECOND);

  // Urgent if less than threshold hours remaining
  const urgentThresholdMs = urgentThresholdHours * HOUR;
  const isUrgent = difference < urgentThresholdMs;

  return {
    days,
    hours,
    minutes,
    seconds,
    totalSeconds,
    isExpired: false,
    isUrgent,
  };
}

/**
 * Generic countdown hook
 * 
 * @example
 * ```tsx
 * const { days, hours, minutes, seconds, isExpired, isUrgent } = useCountdown({
 *   targetDate: '2026-02-25T14:00:00Z',
 *   onExpire: () => console.log('Time\'s up!'),
 * });
 * ```
 */
export function useCountdown({
  targetDate,
  interval = 1000,
  onExpire,
  urgentThreshold = 24,
}: UseCountdownOptions): CountdownTime {
  // Initialize with safe SSR values to avoid hydration mismatch
  const [time, setTime] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalSeconds: 0,
    isExpired: false,
    isUrgent: false,
  });

  const [isMounted, setIsMounted] = useState(false);
  const onExpireRef = useRef(onExpire);
  const hasExpiredRef = useRef(false);

  // Update callback ref when onExpire changes
  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  // Mark as mounted (client-side only)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Main countdown effect
  useEffect(() => {
    if (!isMounted) return;

    const target = new Date(targetDate);

    // Initial calculation
    setTime(calculateTimeRemaining(target, urgentThreshold));

    // Set up interval
    const timerId = setInterval(() => {
      const newTime = calculateTimeRemaining(target, urgentThreshold);
      setTime(newTime);

      // Call onExpire callback when countdown first expires
      if (newTime.isExpired && !hasExpiredRef.current) {
        hasExpiredRef.current = true;
        onExpireRef.current?.();
      }
    }, interval);

    // Cleanup on unmount
    return () => {
      clearInterval(timerId);
    };
  }, [targetDate, interval, urgentThreshold, isMounted]);

  return time;
}

/**
 * Hook for tracking multiple countdowns
 * Useful for dashboards with multiple delivery estimates
 */
export function useMultiCountdown(
  targets: Array<{ id: string; targetDate: string | Date; urgentThreshold?: number }>
): Record<string, CountdownTime> {
  const [times, setTimes] = useState<Record<string, CountdownTime>>({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const updateTimes = () => {
      const newTimes: Record<string, CountdownTime> = {};
      targets.forEach(({ id, targetDate, urgentThreshold = 24 }) => {
        newTimes[id] = calculateTimeRemaining(new Date(targetDate), urgentThreshold);
      });
      setTimes(newTimes);
    };

    // Initial calculation
    updateTimes();

    // Update every second
    const timerId = setInterval(updateTimes, 1000);

    return () => clearInterval(timerId);
  }, [targets, isMounted]);

  return times;
}

export default useCountdown;
