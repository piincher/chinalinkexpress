/**
 * Hero Animation Feature
 * 
 * Complete animation system for the hero section.
 * 
 * NOW FEATURES:
 * - Classic tiered animations (CSS/Canvas/WebGL)
 * - Holographic Globe (3D cyberpunk Earth)
 * - Liquid Background (WebGL fluid simulation)
 * - Morphing Constellations (shape-shifting particles)
 * - Holographic Cards (3D glassmorphism)
 * - Kinetic Typography (physics-based text)
 * - Quantum Teleport (dissolve/reassemble effect)
 * 
 * @example
 * ```tsx
 * import { HeroAnimation } from '@/features/hero-animation';
 * 
 * // Combined mode (all effects layered)
 * <HeroAnimation effectMode="combined" />
 * 
 * // Individual effect modes
 * <HeroAnimation effectMode="globe" />      // 3D holographic globe only
 * <HeroAnimation effectMode="liquid" />     // Fluid simulation only
 * <HeroAnimation effectMode="morphing" />   // Shape-shifting particles only
 * <HeroAnimation effectMode="teleport" />   // Quantum teleport only
 * <HeroAnimation effectMode="classic" />    // Original tiered animation
 * 
 * // Disable mind-blowing effects
 * <HeroAnimation enableMindBlowing={false} />
 * ```
 */

// Components
export { 
  // Classic
  HeroAnimation,
  Fallback,
  CSSParticleField,
  SVGRouteNetwork,
  CanvasParticleSystem,
  WebGLParticleSystem,
  // Mind-blowing
  HolographicGlobe,
  LiquidBackground,
  MorphingConstellations,
  HolographicCards,
  KineticTypography,
  QuantumTeleport,
} from './components';

// Hooks
export {
  usePerformanceTier,
  useReducedMotion,
  useScrollProgress,
  useParallax,
  useIntersectionObserver,
  useVisibilityPause,
  usePageVisibility,
} from './hooks';

// Store
export { 
  useAnimationStore,
  useAnimationTier,
  useAnimationMode,
  useIsAnimationPlaying,
  useAnimationFrame,
  useMousePosition,
} from './store/useAnimationStore';

// Utilities
export {
  calculateBezierCurve,
  generateRouteControlPoints,
  calculateRoutes,
  getPointAtProgress,
  getRouteAngle,
  svgPathToPoints,
  pointsToSvgPath,
} from './lib';

// Types
export type {
  PerformanceTier,
  AnimationMode,
  DeviceCapabilities,
  RoutePoint,
  Route,
  TransportNode,
  Particle,
  DataPulse,
  AnimationConfig,
  CityNode,
} from './types';

// Constants
export { TIER_CONFIG } from './types';
export { CITIES, ROUTES, TRANSPORT_NODES, ANIMATION_TIMING, VISUAL } from './constants';
