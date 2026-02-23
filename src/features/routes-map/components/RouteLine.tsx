/**
 * RouteLine Component
 * 
 * Animated SVG path connecting two cities on the map.
 * Features draw animation, pulse effect on hover, and service-based styling.
 */

'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { TrendingRoute } from '@/features/live-features/types';

interface RouteLineProps {
  route: TrendingRoute;
  isActive?: boolean;
  isHighlighted?: boolean;
  onClick?: () => void;
  onHover?: () => void;
  onLeave?: () => void;
  animationDelay?: number;
  className?: string;
}

// Service type colors
const SERVICE_COLORS = {
  air: {
    stroke: 'stroke-cyan-500',
    glow: 'stroke-cyan-400',
    gradient: ['#06b6d4', '#22d3ee'],
  },
  sea: {
    stroke: 'stroke-blue-600',
    glow: 'stroke-blue-400',
    gradient: ['#2563eb', '#3b82f6'],
  },
  express: {
    stroke: 'stroke-amber-500',
    glow: 'stroke-amber-400',
    gradient: ['#f59e0b', '#fbbf24'],
  },
};

export function RouteLine({
  route,
  isActive = false,
  isHighlighted = false,
  onClick,
  onHover,
  onLeave,
  animationDelay = 0,
  className,
}: RouteLineProps) {
  const { origin, destination, service, popularity } = route;

  // Calculate path data with a slight curve
  const pathData = useMemo(() => {
    const startX = origin.coordinates.x * 100;
    const startY = origin.coordinates.y * 100;
    const endX = destination.coordinates.x * 100;
    const endY = destination.coordinates.y * 100;

    // Calculate control point for curve
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    // Curve downward slightly
    const curveOffset = Math.abs(endX - startX) * 0.15;
    const controlX = midX;
    const controlY = midY + curveOffset;

    return `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;
  }, [origin.coordinates, destination.coordinates]);

  // Calculate stroke width based on popularity
  const strokeWidth = useMemo(() => {
    const baseWidth = 2;
    const maxAdditional = 2.5;
    return baseWidth + (popularity / 100) * maxAdditional;
  }, [popularity]);

  // Calculate path length for animation
  const pathLength = useMemo(() => {
    // Approximate path length for animation
    const dx = (destination.coordinates.x - origin.coordinates.x) * 100;
    const dy = (destination.coordinates.y - origin.coordinates.y) * 100;
    return Math.sqrt(dx * dx + dy * dy) * 1.2;
  }, [origin.coordinates, destination.coordinates]);

  const colors = SERVICE_COLORS[service];

  return (
    <motion.g
      className={cn('cursor-pointer', className)}
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: animationDelay, duration: 0.3 }}
    >
      {/* Glow effect layer */}
      <motion.path
        d={pathData}
        fill="none"
        className={cn(colors.glow, 'opacity-0')}
        strokeWidth={strokeWidth * 2}
        strokeLinecap="round"
        animate={{
          opacity: isActive || isHighlighted ? 0.4 : 0,
          strokeWidth: isActive ? strokeWidth * 3 : strokeWidth * 2,
        }}
        transition={{ duration: 0.3 }}
        style={{
          filter: 'blur(4px)',
        }}
      />

      {/* Main path with draw animation */}
      <motion.path
        d={pathData}
        fill="none"
        className={cn(colors.stroke, 'dark:opacity-90')}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={{ 
          pathLength: 0,
          opacity: 0,
        }}
        animate={{ 
          pathLength: 1,
          opacity: isActive || isHighlighted ? 1 : 0.7,
        }}
        transition={{
          pathLength: {
            delay: animationDelay,
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
          opacity: {
            duration: 0.3,
          },
        }}
        style={{
          strokeDasharray: service === 'air' ? '6 4' : 'none',
        }}
      />

      {/* Pulse animation for active state */}
      {(isActive || isHighlighted) && (
        <motion.path
          d={pathData}
          fill="none"
          className={colors.stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 1 }}
          animate={{ 
            pathLength: [0, 1, 1],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            strokeDasharray: service === 'air' ? '6 4' : 'none',
          }}
        />
      )}

      {/* Hover hit area (invisible but wider for easier interaction) */}
      <path
        d={pathData}
        fill="none"
        stroke="transparent"
        strokeWidth={Math.max(strokeWidth * 4, 12)}
        strokeLinecap="round"
        className="cursor-pointer"
      />
    </motion.g>
  );
}

export default RouteLine;
