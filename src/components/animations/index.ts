/**
 * Animation Components
 * 
 * Shared animation components for consistent animations across the site.
 * All components are optimized for performance with GPU acceleration.
 * 
 * @example
 * import { 
 *   AnimatedSection, 
 *   GradientText, 
 *   SpotlightBorder,
 *   GridPattern,
 *   Marquee,
 *   GradientMesh 
 * } from '@/components/animations';
 */

// ============================================================================
// Core animated section components
// ============================================================================
export {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
  MagneticButton,
  Parallax,
} from './AnimatedSection';

// ============================================================================
// Text animation components (basic text effects)
// ============================================================================
export {
  SplitText,
  GradientText,
  Typewriter,
  GlowText,
  ScrambleText as ScrambleTextBasic,
} from './TextAnimations';

// Enhanced gradient text components
export {
  GradientText as GradientTextEnhanced,
  ShimmerHeading,
  ShimmerText,
  PremiumShimmer,
  SubtleShimmer,
} from './GradientText';

// ============================================================================
// Text reveal with SplitType
// ============================================================================
export {
  TextReveal,
  TextRevealHeading,
  TextRevealChars,
  TextRevealLines,
} from './TextReveal';

// ============================================================================
// Enhanced scramble text effects
// ============================================================================
export {
  ScrambleText,
  ScrambleTextEnhanced,
  DecodeText,
  TypeScramble,
} from './ScrambleText';

// ============================================================================
// Background pattern components
// ============================================================================
export {
  GridPattern,
  CSSGridPattern,
} from './GridPattern';

// ============================================================================
// Background mesh effects
// ============================================================================
export {
  GradientMesh,
  SimpleGradientMesh,
  HeroGradientMesh,
} from './GradientMesh';

// ============================================================================
// Spotlight and border effects
// ============================================================================
export { SpotlightCard } from './SpotlightCard';
export { SpotlightBorder, CSSSpotlightBorder } from './SpotlightBorder';
export { SpotlightGroup } from './SpotlightGroup';

// ============================================================================
// Scrolling/Marquee components
// ============================================================================
export {
  Marquee,
  LogoMarquee,
  TestimonialMarquee,
} from './Marquee';

// ============================================================================
// Interactive wrapper components
// ============================================================================
export { MagneticWrapper } from './MagneticWrapper';

// ============================================================================
// Counter animation
// ============================================================================
export { Counter } from './Counter';

// ============================================================================
// Type re-exports for convenience
// ============================================================================
export type { GradientMeshProps } from './GradientMesh';
export type { MarqueeProps, LogoMarqueeProps } from './Marquee';
export type { SpotlightBorderProps } from './SpotlightBorder';
export type { GridPatternProps, CSSGridPatternProps } from './GridPattern';
export type { SpotlightCardProps } from './SpotlightCard';
