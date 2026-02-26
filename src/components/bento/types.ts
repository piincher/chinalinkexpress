/**
 * Bento Grid Types
 * Type definitions for the Bento Grid component system
 */

export type BentoSpan = '1x1' | '1x2' | '2x1' | '2x2' | '3x3';

export interface BentoCardState {
  id: string;
  isExpanded: boolean;
  defaultSpan: BentoSpan;
  expandedSpan: BentoSpan;
}

export interface BentoGridContextValue {
  expandedId: string | null;
  registerCard: (id: string, defaultSpan: BentoSpan, expandedSpan: BentoSpan) => void;
  unregisterCard: (id: string) => void;
  expandCard: (id: string) => void;
  collapseCard: () => void;
  isCardExpanded: (id: string) => boolean;
  isAnyCardExpanded: boolean;
}

export interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  id: string;
  defaultSpan?: BentoSpan;
  expandedSpan?: BentoSpan;
  gradient?: string;
}

export interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: number;
  gap?: string;
}

export interface BentoCardContentProps {
  children?: React.ReactNode;
  className?: string;
  collapsedContent?: React.ReactNode;
  expandedContent?: React.ReactNode;
}

// Use global Flip type
declare global {
  type FlipState = Flip.FlipState;
}

export type { FlipState };
