/**
 * GradientMesh Component
 * 
 * Ambient gradient mesh background with morphing blob animations.
 * Creates a premium backdrop similar to Stripe/Vercel landing pages.
 * 
 * Features:
 * - 4 animated gradient blobs with different colors and movements
 * - Configurable intensity (low/medium/high)
 * - Reduced motion support
 * - Dark mode compatible
 * 
 * @example
 * <GradientMesh intensity="medium" className="opacity-50" />
 */

'use client';

import React, { useEffect, useState } from 'react';
import './GradientMesh.css';

export interface GradientMeshProps {
  /** Animation intensity level (default: 'medium') */
  intensity?: 'low' | 'medium' | 'high';
  /** Additional CSS classes */
  className?: string;
  /** Number of blobs to render (1-4, default: 4) */
  blobCount?: 1 | 2 | 3 | 4;
  /** Custom blob colors as array of hex/rgba strings */
  colors?: string[];
}

export function GradientMesh({
  intensity = 'medium',
  className = '',
  blobCount = 4,
  colors,
}: GradientMeshProps) {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const intensityClass = `gradient-mesh--${intensity}`;
  const staticClass = isReducedMotion ? 'gradient-mesh--static' : '';

  // Default blob colors if none provided
  const defaultColors = [
    'rgba(59, 130, 246, 0.8)',   // Blue
    'rgba(147, 51, 234, 0.7)',   // Purple
    'rgba(6, 182, 212, 0.6)',    // Cyan
    'rgba(99, 102, 241, 0.7)',   // Indigo
  ];

  const blobColors = colors || defaultColors;

  return (
    <div 
      className={`gradient-mesh ${intensityClass} ${staticClass} ${className}`}
      aria-hidden="true"
    >
      {blobCount >= 1 && (
        <div 
          className="gradient-mesh__blob gradient-mesh__blob--1"
          style={blobColors[0] ? { background: `radial-gradient(circle at 30% 30%, ${blobColors[0]} 0%, transparent 70%)` } : undefined}
        />
      )}
      {blobCount >= 2 && (
        <div 
          className="gradient-mesh__blob gradient-mesh__blob--2"
          style={blobColors[1] ? { background: `radial-gradient(circle at 50% 50%, ${blobColors[1]} 0%, transparent 70%)` } : undefined}
        />
      )}
      {blobCount >= 3 && (
        <div 
          className="gradient-mesh__blob gradient-mesh__blob--3"
          style={blobColors[2] ? { background: `radial-gradient(circle at 40% 60%, ${blobColors[2]} 0%, transparent 70%)` } : undefined}
        />
      )}
      {blobCount >= 4 && (
        <div 
          className="gradient-mesh__blob gradient-mesh__blob--4"
          style={blobColors[3] ? { background: `radial-gradient(circle at 60% 40%, ${blobColors[3]} 0%, transparent 70%)` } : undefined}
        />
      )}
    </div>
  );
}

/**
 * SimpleGradientMesh - A simplified version with just 2 blobs
 * Use this for cards or smaller containers
 */
export function SimpleGradientMesh({
  className = '',
}: {
  className?: string;
}) {
  return <GradientMesh intensity="low" blobCount={2} className={className} />;
}

/**
 * HeroGradientMesh - Full intensity mesh for hero sections
 */
export function HeroGradientMesh({
  className = '',
}: {
  className?: string;
}) {
  return <GradientMesh intensity="high" blobCount={4} className={className} />;
}

export default GradientMesh;
