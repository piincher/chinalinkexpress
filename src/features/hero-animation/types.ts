/**
 * Hero Animation Types
 * 
 * Type definitions for the hero animation system.
 * Part of the hero-animation feature.
 */

export type PerformanceTier = 'high' | 'medium' | 'low' | 'minimal';

export type AnimationMode = 'webgl' | 'canvas' | 'css' | 'static';

export interface DeviceCapabilities {
  tier: PerformanceTier;
  supportsWebGL: boolean;
  supportsWebGL2: boolean;
  maxTextureSize: number;
  isMobile: boolean;
  isLowPowerMode: boolean;
  prefersReducedMotion: boolean;
  connectionSpeed: 'fast' | 'slow' | 'unknown';
}

export interface RoutePoint {
  x: number;
  y: number;
}

export interface Route {
  id: string;
  from: string;
  to: string;
  points: RoutePoint[];
  color: string;
  width: number;
  dashArray?: string;
  trafficIntensity: 'high' | 'medium' | 'low';
}

export interface TransportNode {
  id: string;
  type: 'ship' | 'plane' | 'truck';
  routeId: string;
  progress: number;
  speed: number;
  icon: string;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

export interface DataPulse {
  id: string;
  routeId: string;
  progress: number;
  speed: number;
  size: number;
  color: string;
}

export interface AnimationConfig {
  particleCount: number;
  particleColors: string[];
  routeColors: string[];
  animationSpeed: number;
  enableGlow: boolean;
  enableParallax: boolean;
  enableInteractivity: boolean;
}

export const TIER_CONFIG: Record<PerformanceTier, AnimationConfig> = {
  high: {
    particleCount: 3000,
    particleColors: ['#3fb0ff', '#7fd0ff', '#dff9ff', '#9fd3ff'],
    routeColors: ['#3fb0ff', '#7fd0ff', '#ff6b6b'],
    animationSpeed: 1,
    enableGlow: true,
    enableParallax: true,
    enableInteractivity: true,
  },
  medium: {
    particleCount: 800,
    particleColors: ['#3fb0ff', '#7fd0ff', '#dff9ff'],
    routeColors: ['#3fb0ff', '#7fd0ff'],
    animationSpeed: 0.8,
    enableGlow: false,
    enableParallax: true,
    enableInteractivity: false,
  },
  low: {
    particleCount: 150,
    particleColors: ['#7fd0ff', '#dff9ff'],
    routeColors: ['#7fd0ff'],
    animationSpeed: 0.5,
    enableGlow: false,
    enableParallax: false,
    enableInteractivity: false,
  },
  minimal: {
    particleCount: 0,
    particleColors: [],
    routeColors: ['#7fd0ff'],
    animationSpeed: 0,
    enableGlow: false,
    enableParallax: false,
    enableInteractivity: false,
  },
};

export interface CityNode {
  id: string;
  name: string;
  nameCN?: string;
  x: number;
  y: number;
  region: 'china' | 'africa' | 'hub';
  importance: number;
}
