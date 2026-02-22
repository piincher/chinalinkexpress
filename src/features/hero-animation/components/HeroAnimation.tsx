/**
 * Hero Animation
 * 
 * Main animation component that orchestrates all tiers and effects.
 * Features mind-blowing, never-before-seen animations:
 * - Holographic Globe (3D cyberpunk Earth)
 * - Liquid Background (fluid simulation)
 * - Morphing Constellations (shape-shifting particles)
 * - Holographic Cards (3D glassmorphism)
 * - Kinetic Typography (physics text)
 * - Quantum Teleport (dissolve/reassemble effect)
 * 
 * Part of the hero-animation feature.
 */

'use client';

import React, { useEffect, useState } from 'react';
import { usePerformanceTier, useReducedMotion, useIntersectionObserver } from '../hooks';
import { useAnimationStore } from '../store/useAnimationStore';
import { Fallback } from './Fallback';
import { CSSParticleField } from './CSSParticleField';
import { SVGRouteNetwork } from './SVGRouteNetwork';
import { CanvasParticleSystem } from './CanvasParticleSystem';
import { WebGLParticleSystem } from './WebGLParticleSystem';

// NEW: Mind-blowing effects
import { HolographicGlobe } from './HolographicGlobe';
import { LiquidBackground } from './LiquidBackground';
import { MorphingConstellations } from './MorphingConstellations';
import { KineticTypography } from './KineticTypography';
import { QuantumTeleport } from './QuantumTeleport';

import type { AnimationMode } from '../types';

interface HeroAnimationProps {
  className?: string;
  /** Enable the crazy mind-blowing effects (default: true) */
  enableMindBlowing?: boolean;
  /** Which effect layer to show (default: 'combined') */
  effectMode?: 'combined' | 'globe' | 'liquid' | 'morphing' | 'teleport' | 'classic';
}

/**
 * Determine the best animation mode based on device capabilities
 */
function determineAnimationMode(
  tier: ReturnType<typeof usePerformanceTier>['tier'],
  capabilities: ReturnType<typeof usePerformanceTier>['capabilities'],
  prefersReducedMotion: boolean
): AnimationMode {
  if (prefersReducedMotion || tier === 'minimal') {
    return 'static';
  }

  if (tier === 'high' && capabilities.supportsWebGL2) {
    return 'webgl';
  }

  if (tier === 'medium' || tier === 'high') {
    return 'canvas';
  }

  if (tier === 'low') {
    return 'css';
  }

  return 'static';
}

export function HeroAnimation({ 
  className = '',
  enableMindBlowing = true,
  effectMode = 'combined',
}: HeroAnimationProps) {
  const { tier, capabilities, isReady } = usePerformanceTier();
  const prefersReducedMotion = useReducedMotion();
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0 });
  
  const [animationMode, setAnimationMode] = useState<AnimationMode>('static');
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Get store actions
  const setStoreTier = useAnimationStore((state) => state.setTier);
  const setStoreCapabilities = useAnimationStore((state) => state.setCapabilities);
  const setStoreAnimationMode = useAnimationStore((state) => state.setAnimationMode);
  const setStoreReady = useAnimationStore((state) => state.setReady);
  const setInViewport = useAnimationStore((state) => state.setInViewport);

  // Determine and set animation mode
  useEffect(() => {
    if (!isReady) return;

    const mode = determineAnimationMode(tier, capabilities, prefersReducedMotion);
    setAnimationMode(mode);
    
    // Update store
    setStoreTier(tier);
    setStoreCapabilities(capabilities);
    setStoreAnimationMode(mode);
    setStoreReady(true);

    // Simulate load complete
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, [
    isReady, 
    tier, 
    capabilities, 
    prefersReducedMotion,
    setStoreTier,
    setStoreCapabilities,
    setStoreAnimationMode,
    setStoreReady,
  ]);

  // Update viewport visibility
  useEffect(() => {
    setInViewport(isIntersecting);
  }, [isIntersecting, setInViewport]);

  // Render appropriate effect layer
  const renderEffectLayer = () => {
    // If mind-blowing effects are disabled, use classic animation
    if (!enableMindBlowing || tier === 'minimal' || tier === 'low') {
      return renderClassicAnimation();
    }

    switch (effectMode) {
      case 'globe':
        return <HolographicGlobe tier={tier} />;
      
      case 'liquid':
        return (
          <>
            <LiquidBackground tier={tier} />
            {renderClassicAnimation()}
          </>
        );
      
      case 'morphing':
        return <MorphingConstellations tier={tier} />;
      
      case 'teleport':
        return <QuantumTeleport tier={tier} />;
      
      case 'classic':
        return renderClassicAnimation();
      
      case 'combined':
      default:
        // Layer multiple effects for maximum impact
        return (
          <>
            {/* Layer 1: Liquid background for organic feel */}
            <LiquidBackground tier={tier} className="z-0 opacity-40" />
            
            {/* Layer 2: Classic route network */}
            <div className="absolute inset-0 z-10 opacity-60">
              <SVGRouteNetwork tier={tier} />
            </div>
            
            {/* Layer 3: Morphing constellations overlay */}
            <div className="absolute inset-0 z-20 opacity-30 pointer-events-none">
              <MorphingConstellations tier={tier} />
            </div>
            
            {/* Layer 4: Holographic globe (high tier only) */}
            {tier === 'high' && (
              <div className="absolute right-0 top-0 w-1/2 h-full z-30 opacity-50 pointer-events-none">
                <HolographicGlobe tier={tier} />
              </div>
            )}
          </>
        );
    }
  };

  // Render classic tiered animation
  const renderClassicAnimation = () => {
    switch (animationMode) {
      case 'webgl':
        return (
          <>
            <WebGLParticleSystem tier={tier} />
            <SVGRouteNetwork tier={tier} />
          </>
        );
      
      case 'canvas':
        return (
          <>
            <CanvasParticleSystem tier={tier} />
            <SVGRouteNetwork tier={tier} />
          </>
        );
      
      case 'css':
        return (
          <>
            <CSSParticleField tier={tier} />
            <SVGRouteNetwork tier={tier} />
          </>
        );
      
      case 'static':
      default:
        return <Fallback />;
    }
  };

  return (
    <div 
      ref={ref}
      className={`absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Fade in animation */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000"
        style={{ 
          opacity: isLoaded ? 1 : 0,
        }}
      >
        {renderEffectLayer()}
      </div>

      {/* Accessibility: Hidden description */}
      <span className="sr-only">
        Animated visualization of China-Africa logistics network showing shipping routes 
        connecting major cities including Shanghai, Shenzhen, Guangzhou to Bamako, Lagos, 
        and Dakar via sea and air freight corridors. Features real-time data visualization,
        holographic effects, and quantum teleportation animations.
      </span>
    </div>
  );
}

export default HeroAnimation;
