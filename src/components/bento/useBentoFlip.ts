'use client';

import { useCallback, useRef, useState } from 'react';
import { gsap } from 'gsap';
import type { BentoSpan, BentoCardState } from './types';

// Register GSAP Flip plugin
if (typeof window !== 'undefined') {
  // Dynamic import to avoid SSR issues
  void import('gsap/dist/Flip').then((FlipModule) => {
    const FlipPlugin = FlipModule.default || FlipModule.Flip;
    gsap.registerPlugin(FlipPlugin);
  });
}

// Type for Flip vars
export interface UseBentoFlipReturn {
  /** Register a card with the flip system */
  registerCard: (id: string, defaultSpan: BentoSpan, expandedSpan: BentoSpan) => void;
  /** Unregister a card from the flip system */
  unregisterCard: (id: string) => void;
  /** Expand a specific card */
  expandCard: (id: string) => void;
  /** Collapse the currently expanded card */
  collapseCard: () => void;
  /** Get the currently expanded card ID */
  expandedId: string | null;
  /** Check if a specific card is expanded */
  isCardExpanded: (id: string) => boolean;
  /** Check if any card is currently expanded */
  isAnyCardExpanded: boolean;
}

/**
 * Hook that manages GSAP Flip animations for the Bento Grid
 * Handles card expansion/collapse with smooth layout transitions
 */
export function useBentoFlip(): UseBentoFlipReturn {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const cardsRef = useRef<Map<string, BentoCardState>>(new Map());
  const gridRef = useRef<HTMLElement | null>(null);
  const isAnimatingRef = useRef(false);

  // Register a card with the system
  const registerCard = useCallback((id: string, defaultSpan: BentoSpan, expandedSpan: BentoSpan) => {
    cardsRef.current.set(id, {
      id,
      isExpanded: false,
      defaultSpan,
      expandedSpan,
    });
  }, []);

  // Unregister a card
  const unregisterCard = useCallback((id: string) => {
    cardsRef.current.delete(id);
    if (expandedId === id) {
      setExpandedId(null);
    }
  }, [expandedId]);

  // Check if a card is expanded
  const isCardExpanded = useCallback((id: string) => {
    return expandedId === id;
  }, [expandedId]);

  // Expand a card
  const expandCard = useCallback((id: string) => {
    if (isAnimatingRef.current || expandedId === id) return;
    
    isAnimatingRef.current = true;
    
    if (typeof window === 'undefined' || !gridRef.current) {
      setExpandedId(id);
      isAnimatingRef.current = false;
      return;
    }

    // Dynamic import Flip and animate
    void import('gsap/dist/Flip').then((FlipModule) => {
      const Flip = FlipModule.default || FlipModule.Flip;
      
      // Capture current state before expansion
      const cards = gridRef.current!.querySelectorAll('[data-bento-card]');
      const state = Flip.getState(cards);
      
      // Update expanded ID
      setExpandedId(id);
      
      // Update card state
      const card = cardsRef.current.get(id);
      if (card) {
        card.isExpanded = true;
      }

      // Animate on next frame when DOM has updated
      requestAnimationFrame(() => {
        Flip.from(state, {
          duration: 0.6,
          ease: 'power3.out',
          scale: true,
          absolute: true,
          zIndex: 10,
          onComplete: () => {
            isAnimatingRef.current = false;
          },
        });
      });
    }).catch(() => {
      // Fallback if Flip fails to load
      setExpandedId(id);
      isAnimatingRef.current = false;
    });
  }, [expandedId]);

  // Collapse the expanded card
  const collapseCard = useCallback(() => {
    if (isAnimatingRef.current || !expandedId) return;
    
    isAnimatingRef.current = true;
    
    if (typeof window === 'undefined' || !gridRef.current) {
      setExpandedId(null);
      isAnimatingRef.current = false;
      return;
    }

    // Dynamic import Flip and animate
    void import('gsap/dist/Flip').then((FlipModule) => {
      const Flip = FlipModule.default || FlipModule.Flip;
      
      // Capture current state before collapse
      const cards = gridRef.current!.querySelectorAll('[data-bento-card]');
      const state = Flip.getState(cards);
      
      // Update card state
      const card = cardsRef.current.get(expandedId);
      if (card) {
        card.isExpanded = false;
      }
      
      // Update expanded ID
      setExpandedId(null);

      // Animate on next frame
      requestAnimationFrame(() => {
        Flip.from(state, {
          duration: 0.5,
          ease: 'power3.out',
          scale: true,
          absolute: true,
          zIndex: 10,
          onComplete: () => {
            isAnimatingRef.current = false;
          },
        });
      });
    }).catch(() => {
      // Fallback if Flip fails to load
      setExpandedId(null);
      isAnimatingRef.current = false;
    });
  }, [expandedId]);

  return {
    registerCard,
    unregisterCard,
    expandCard,
    collapseCard,
    expandedId,
    isCardExpanded,
    isAnyCardExpanded: expandedId !== null,
  };
}

export default useBentoFlip;
