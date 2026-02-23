/**
 * HeatmapOverlay Component
 * 
 * Radial gradients showing volume intensity at high-traffic locations.
 * Subtle animated pulses that don't overwhelm the main content.
 */

'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { RoutePoint } from '@/features/live-features/types';

interface HeatPoint {
  point: RoutePoint;
  intensity: number; // 0-1
}

interface HeatmapOverlayProps {
  points: RoutePoint[];
  className?: string;
}

export function HeatmapOverlay({ points, className }: HeatmapOverlayProps) {
  // Calculate heat points with normalized intensity
  const heatPoints = useMemo<HeatPoint[]>(() => {
    const maxVolume = Math.max(...points.map(p => p.volume));
    return points.map(point => ({
      point,
      intensity: point.volume / maxVolume,
    }));
  }, [points]);

  return (
    <svg
      className={cn('absolute inset-0 w-full h-full pointer-events-none', className)}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {heatPoints.map(({ point, intensity }) => (
          <radialGradient
            key={point.id}
            id={`heat-gradient-${point.id}`}
            cx="50%"
            cy="50%"
            r="50%"
          >
            <stop
              offset="0%"
              stopColor="currentColor"
              stopOpacity={intensity * 0.15}
            />
            <stop
              offset="50%"
              stopColor="currentColor"
              stopOpacity={intensity * 0.08}
            />
            <stop
              offset="100%"
              stopColor="currentColor"
              stopOpacity="0"
            />
          </radialGradient>
        ))}
      </defs>

      {/* Static heat circles */}
      {heatPoints.map(({ point, intensity }) => (
        <ellipse
          key={`heat-${point.id}`}
          cx={point.coordinates.x * 100}
          cy={point.coordinates.y * 100}
          rx={8 + intensity * 12}
          ry={6 + intensity * 9}
          fill={`url(#heat-gradient-${point.id})`}
          className="text-cyan-500 dark:text-cyan-400"
        />
      ))}

      {/* Animated pulse for high-intensity points */}
      {heatPoints
        .filter(({ intensity }) => intensity > 0.7)
        .map(({ point, intensity }) => (
          <motion.ellipse
            key={`pulse-${point.id}`}
            cx={point.coordinates.x * 100}
            cy={point.coordinates.y * 100}
            rx={8 + intensity * 12}
            ry={6 + intensity * 9}
            fill="none"
            className="text-cyan-400 dark:text-cyan-300"
            strokeWidth={0.5}
            initial={{ opacity: 0.3, scale: 0.8 }}
            animate={{
              opacity: [0.3, 0.1, 0.3],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 2,
            }}
            style={{
              stroke: 'currentColor',
            }}
          />
        ))}
    </svg>
  );
}

// Simplified version for mobile
interface MobileHeatmapOverlayProps {
  points: RoutePoint[];
  className?: string;
}

export function MobileHeatmapOverlay({ points, className }: MobileHeatmapOverlayProps) {
  const heatPoints = useMemo<HeatPoint[]>(() => {
    const maxVolume = Math.max(...points.map(p => p.volume));
    return points.map(point => ({
      point,
      intensity: point.volume / maxVolume,
    }));
  }, [points]);

  return (
    <svg
      className={cn('absolute inset-0 w-full h-full pointer-events-none', className)}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {heatPoints.map(({ point, intensity }) => (
          <radialGradient
            key={`mobile-heat-${point.id}`}
            id={`mobile-heat-gradient-${point.id}`}
            cx="50%"
            cy="50%"
            r="50%"
          >
            <stop
              offset="0%"
              stopColor="currentColor"
              stopOpacity={intensity * 0.12}
            />
            <stop
              offset="100%"
              stopColor="currentColor"
              stopOpacity="0"
            />
          </radialGradient>
        ))}
      </defs>

      {/* Simplified heat circles without animation for mobile */}
      {heatPoints.map(({ point, intensity }) => (
        <ellipse
          key={`mobile-heat-circle-${point.id}`}
          cx={point.coordinates.x * 100}
          cy={point.coordinates.y * 100}
          rx={6 + intensity * 8}
          ry={4 + intensity * 6}
          fill={`url(#mobile-heat-gradient-${point.id})`}
          className="text-cyan-500 dark:text-cyan-400"
        />
      ))}
    </svg>
  );
}

export default HeatmapOverlay;
