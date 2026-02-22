/**
 * Animation Store
 * 
 * Global state management for hero animations using Zustand.
 * Part of the hero-animation feature.
 */

'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { PerformanceTier, AnimationMode, DeviceCapabilities } from '../types';

interface AnimationState {
  // Device capabilities
  tier: PerformanceTier;
  capabilities: DeviceCapabilities;
  animationMode: AnimationMode;
  isReady: boolean;
  
  // Animation control
  isPlaying: boolean;
  isPaused: boolean;
  frameCount: number;
  lastFrameTime: number;
  
  // Interactivity
  mouseX: number;
  mouseY: number;
  isHovering: boolean;
  
  // Visibility
  isInViewport: boolean;
  isPageVisible: boolean;
  
  // Actions
  setTier: (tier: PerformanceTier) => void;
  setCapabilities: (capabilities: DeviceCapabilities) => void;
  setAnimationMode: (mode: AnimationMode) => void;
  setReady: (ready: boolean) => void;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  setMousePosition: (x: number, y: number) => void;
  setHovering: (hovering: boolean) => void;
  setInViewport: (inViewport: boolean) => void;
  setPageVisible: (visible: boolean) => void;
  incrementFrame: () => void;
}

export const useAnimationStore = create<AnimationState>()(
  devtools(
    (set, get) => ({
      // Initial state
      tier: 'medium',
      capabilities: {
        tier: 'medium',
        supportsWebGL: false,
        supportsWebGL2: false,
        maxTextureSize: 0,
        isMobile: false,
        isLowPowerMode: false,
        prefersReducedMotion: false,
        connectionSpeed: 'unknown',
      },
      animationMode: 'css',
      isReady: false,
      isPlaying: true,
      isPaused: false,
      frameCount: 0,
      lastFrameTime: 0,
      mouseX: 0,
      mouseY: 0,
      isHovering: false,
      isInViewport: true,
      isPageVisible: true,

      // Actions
      setTier: (tier) => set({ tier }),
      
      setCapabilities: (capabilities) => set({ capabilities }),
      
      setAnimationMode: (mode) => set({ animationMode: mode }),
      
      setReady: (ready) => set({ isReady: ready }),
      
      play: () => set({ isPlaying: true, isPaused: false }),
      
      pause: () => set({ isPaused: true }),
      
      toggle: () => {
        const { isPaused } = get();
        set({ isPaused: !isPaused });
      },
      
      setMousePosition: (x, y) => set({ mouseX: x, mouseY: y }),
      
      setHovering: (hovering) => set({ isHovering: hovering }),
      
      setInViewport: (inViewport) => set({ isInViewport: inViewport }),
      
      setPageVisible: (visible) => set({ isPageVisible: visible }),
      
      incrementFrame: () => {
        const state = get();
        set({
          frameCount: state.frameCount + 1,
          lastFrameTime: performance.now(),
        });
      },
    }),
    { name: 'hero-animation-store' }
  )
);

// Selector hooks for better performance
export const useAnimationTier = () => useAnimationStore((state) => state.tier);
export const useAnimationMode = () => useAnimationStore((state) => state.animationMode);
export const useIsAnimationPlaying = () => useAnimationStore((state) => state.isPlaying && !state.isPaused && state.isInViewport && state.isPageVisible);
export const useAnimationFrame = () => useAnimationStore((state) => state.frameCount);
export const useMousePosition = () => useAnimationStore((state) => ({ x: state.mouseX, y: state.mouseY }));
