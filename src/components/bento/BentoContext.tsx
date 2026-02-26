'use client';

import React, { createContext, useContext, useCallback, useState, useRef } from 'react';
import { gsap } from 'gsap';
import type { BentoSpan, BentoGridContextValue } from './types';

// Register GSAP Flip plugin on client
if (typeof window !== 'undefined') {
  void import('gsap/dist/Flip').then((FlipModule) => {
    const FlipPlugin = FlipModule.default || FlipModule.Flip;
    gsap.registerPlugin(FlipPlugin);
  });
}

const BentoContext = createContext<BentoGridContextValue | null>(null);

export const useBentoGrid = (): BentoGridContextValue => {
  const context = useContext(BentoContext);
  if (!context) {
    throw new Error('useBentoGrid must be used within a BentoGrid provider');
  }
  return context;
};

interface BentoProviderProps {
  children: React.ReactNode;
  gridRef: React.RefObject<HTMLElement | null>;
}

export const BentoProvider: React.FC<BentoProviderProps> = ({ children, gridRef }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const cardsRef = useRef<Set<string>>(new Set());
  const isAnimatingRef = useRef(false);

  const registerCard = useCallback((id: string, _defaultSpan: BentoSpan, _expandedSpan: BentoSpan) => {
    cardsRef.current.add(id);
  }, []);

  const unregisterCard = useCallback((id: string) => {
    cardsRef.current.delete(id);
    if (expandedId === id) {
      setExpandedId(null);
    }
  }, [expandedId]);

  const isCardExpanded = useCallback((id: string) => {
    return expandedId === id;
  }, [expandedId]);

  const performFlipAnimation = useCallback((
    newExpandedId: string | null,
    onComplete?: () => void
  ) => {
    if (!gridRef.current || typeof window === 'undefined') {
      setExpandedId(newExpandedId);
      onComplete?.();
      return;
    }

    // Dynamic import Flip
    void import('gsap/dist/Flip').then((FlipModule) => {
      const Flip = FlipModule.default || FlipModule.Flip;
      
      // Capture current state
      const cards = gridRef.current!.querySelectorAll('[data-bento-card]');
      const state = Flip.getState(cards);

      // Update state
      setExpandedId(newExpandedId);

      // Animate after state update
      requestAnimationFrame(() => {
        Flip.from(state, {
          duration: 0.6,
          ease: 'power3.out',
          scale: true,
          absolute: true,
          zIndex: 20,
          onComplete: () => {
            isAnimatingRef.current = false;
            onComplete?.();
          },
        });
      });
    }).catch(() => {
      // Fallback
      setExpandedId(newExpandedId);
      isAnimatingRef.current = false;
      onComplete?.();
    });
  }, [gridRef]);

  const expandCard = useCallback((id: string) => {
    if (isAnimatingRef.current || expandedId === id) return;
    
    isAnimatingRef.current = true;
    performFlipAnimation(id);
  }, [expandedId, performFlipAnimation]);

  const collapseCard = useCallback(() => {
    if (isAnimatingRef.current || !expandedId) return;
    
    isAnimatingRef.current = true;
    performFlipAnimation(null);
  }, [expandedId, performFlipAnimation]);

  const value: BentoGridContextValue = {
    expandedId,
    registerCard,
    unregisterCard,
    expandCard,
    collapseCard,
    isCardExpanded,
    isAnyCardExpanded: expandedId !== null,
  };

  return (
    <BentoContext.Provider value={value}>
      {children}
    </BentoContext.Provider>
  );
};

export default BentoContext;
