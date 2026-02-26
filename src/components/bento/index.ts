/**
 * Bento Grid Components
 * 
 * A flexible, animated Bento Grid system using GSAP Flip for smooth layout transitions.
 * 
 * @example
 * ```tsx
 * import { BentoGrid, BentoCard, BentoCardContent } from '@/components/bento';
 * 
 * function ServicesSection() {
 *   return (
 *     <BentoGrid columns={4} gap="1rem" className="max-w-6xl mx-auto">
 *       <BentoCard 
 *         id="air-freight" 
 *         defaultSpan="1x1" 
 *         expandedSpan="2x2"
 *         gradient="rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2)"
 *       >
 *         <BentoCardContent
 *           collapsedContent={<div>Air Freight Preview</div>}
 *           expandedContent={<div>Full Air Freight Details</div>}
 *         />
 *       </BentoCard>
 *       
 *       <BentoCard id="sea-freight" defaultSpan="1x2">
 *         <div>Sea Freight Content</div>
 *       </BentoCard>
 *     </BentoGrid>
 *   );
 * }
 * ```
 */

// Main components
export { default as BentoGrid } from './BentoGrid';
export { default as BentoCard } from './BentoCard';
export { default as BentoCardContent } from './BentoCardContent';

// Context and hooks
export { useBentoGrid, BentoProvider } from './BentoContext';
export { default as useBentoFlip } from './useBentoFlip';

// Types
export type {
  BentoSpan,
  BentoCardState,
  BentoGridContextValue,
  BentoCardProps,
  BentoGridProps,
  BentoCardContentProps,
  FlipState,
} from './types';

// Re-export hook return type
export type { UseBentoFlipReturn } from './useBentoFlip';
