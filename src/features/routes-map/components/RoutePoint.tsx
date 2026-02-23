/**
 * RoutePoint Component
 * 
 * City marker on the map with volume-based sizing,
 * hover tooltip, and click interaction.
 */

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Ship, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { RoutePoint as RoutePointType } from '@/features/live-features/types';

interface RoutePointProps {
  point: RoutePointType;
  isActive?: boolean;
  isHighlighted?: boolean;
  connectedRoutes?: { service: 'air' | 'sea'; count: number }[];
  onClick?: () => void;
  onHover?: () => void;
  onLeave?: () => void;
  animationDelay?: number;
  className?: string;
}

export function RoutePoint({
  point,
  isActive = false,
  isHighlighted = false,
  connectedRoutes = [],
  onClick,
  onHover,
  onLeave,
  animationDelay = 0,
  className,
}: RoutePointProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  // Calculate marker size based on volume
  const markerSize = Math.max(8, Math.min(20, 8 + (point.volume / 100) * 12));
  
  // Calculate pulse ring size
  const pulseSize = markerSize * 2.5;

  // Determine if this is a China city (origin) or Africa city (destination)
  const isChinaCity = ['shanghai', 'shenzhen', 'guangzhou', 'beijing', 'yiwu'].includes(point.id);

  const handleMouseEnter = () => {
    setShowTooltip(true);
    onHover?.();
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
    onLeave?.();
  };

  return (
    <motion.g
      className={cn('cursor-pointer', className)}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: animationDelay,
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Pulse animation for high volume or active state */}
      {(point.volume > 70 || isActive) && (
        <motion.circle
          cx={point.coordinates.x * 100}
          cy={point.coordinates.y * 100}
          r={pulseSize}
          fill="none"
          className={cn(
            'stroke-cyan-500',
            isActive ? 'stroke-blue-500' : 'stroke-cyan-500/50'
          )}
          strokeWidth={1}
          initial={{ opacity: 0.6, scale: 0.5 }}
          animate={{ 
            opacity: [0.6, 0],
            scale: [0.5, 1.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      )}

      {/* Glow effect */}
      <motion.circle
        cx={point.coordinates.x * 100}
        cy={point.coordinates.y * 100}
        r={markerSize * 1.5}
        className={cn(
          'fill-cyan-400/30 dark:fill-cyan-400/20',
          isActive && 'fill-blue-400/40 dark:fill-blue-400/30',
          isHighlighted && 'fill-amber-400/30 dark:fill-amber-400/20'
        )}
        animate={{
          scale: isActive ? [1, 1.2, 1] : 1,
        }}
        transition={{
          duration: 1.5,
          repeat: isActive ? Infinity : 0,
        }}
      />

      {/* Main marker circle */}
      <motion.circle
        cx={point.coordinates.x * 100}
        cy={point.coordinates.y * 100}
        r={markerSize}
        className={cn(
          'fill-white stroke-cyan-500 dark:fill-slate-800 dark:stroke-cyan-400',
          isActive && 'fill-blue-50 stroke-blue-600 dark:fill-blue-900/30 dark:stroke-blue-400',
          isHighlighted && 'fill-amber-50 stroke-amber-500 dark:fill-amber-900/30 dark:stroke-amber-400'
        )}
        strokeWidth={2}
        whileHover={{ scale: 1.2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      />

      {/* Inner dot */}
      <circle
        cx={point.coordinates.x * 100}
        cy={point.coordinates.y * 100}
        r={markerSize * 0.4}
        className={cn(
          'fill-cyan-500 dark:fill-cyan-400',
          isActive && 'fill-blue-600 dark:fill-blue-400',
          isHighlighted && 'fill-amber-500 dark:fill-amber-400'
        )}
      />

      {/* City label */}
      <motion.text
        x={point.coordinates.x * 100}
        y={point.coordinates.y * 100 + markerSize + 12}
        textAnchor="middle"
        className={cn(
          'text-xs font-medium fill-slate-700 dark:fill-slate-300',
          'pointer-events-none select-none'
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive || showTooltip ? 1 : 0.8 }}
      >
        {point.city}
      </motion.text>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.foreignObject
            x={(point.coordinates.x * 100) - 80}
            y={(point.coordinates.y * 100) - 110}
            width={160}
            height={100}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 p-3 pointer-events-none">
              {/* Header */}
              <div className="flex items-center gap-2 mb-2">
                <div className={cn(
                  'w-2 h-2 rounded-full',
                  isChinaCity ? 'bg-red-500' : 'bg-green-500'
                )} />
                <span className="font-semibold text-sm text-slate-900 dark:text-white">
                  {point.city}
                </span>
              </div>
              
              {/* Country */}
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                {point.country}
              </p>

              {/* Volume indicator */}
              <div className="flex items-center gap-2 text-xs">
                <TrendingUp className="w-3 h-3 text-cyan-500" />
                <span className="text-slate-600 dark:text-slate-400">
                  Volume: {point.volume}%
                </span>
              </div>

              {/* Connected routes */}
              {connectedRoutes.length > 0 && (
                <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                    Routes connectés:
                  </p>
                  <div className="flex gap-2">
                    {connectedRoutes.map((route, idx) => (
                      <div key={idx} className="flex items-center gap-1 text-xs">
                        {route.service === 'air' ? (
                          <Plane className="w-3 h-3 text-cyan-500" />
                        ) : (
                          <Ship className="w-3 h-3 text-blue-500" />
                        )}
                        <span className="text-slate-600 dark:text-slate-400">
                          {route.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.foreignObject>
        )}
      </AnimatePresence>
    </motion.g>
  );
}

export default RoutePoint;
