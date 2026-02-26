/**
 * AnimationProvider
 * 
 * Wrapper component that combines AnimationOrchestrator with PerformanceMonitor
 * initialization. This is the single provider to use in your layout.
 * 
 * @example
 * ```tsx
 * // In your root layout.tsx
 * import { AnimationProvider } from '@/components/animation';
 * 
 * export default function RootLayout({ children }) {
 *   return (
 *     <AnimationProvider>
 *       {children}
 *     </AnimationProvider>
 *   );
 * }
 * ```
 */

'use client';

import React, { useEffect, useState } from 'react';
import { AnimationOrchestrator } from './AnimationOrchestrator';
import { useAnimationStore } from '@/features/hero-animation/store/useAnimationStore';
import { usePerformanceTier } from '@/features/hero-animation/hooks/usePerformanceTier';

/**
 * Props for AnimationProvider
 */
export interface AnimationProviderProps {
  /** Child components */
  children: React.ReactNode;
  /** Optional initial active section ID */
  initialActiveSection?: string | null;
}

/**
 * Internal component that initializes performance monitoring.
 * Separated to ensure it runs within the AnimationOrchestrator context.
 */
function PerformanceMonitor(): null {
  const { tier, capabilities, isReady } = usePerformanceTier();
  const setTier = useAnimationStore((state) => state.setTier);
  const setCapabilities = useAnimationStore((state) => state.setCapabilities);
  const setReady = useAnimationStore((state) => state.setReady);
  const setAnimationMode = useAnimationStore((state) => state.setAnimationMode);

  useEffect(() => {
    if (isReady) {
      // Update the global animation store with detected capabilities
      setTier(tier);
      setCapabilities(capabilities);
      setReady(true);

      // Set animation mode based on tier
      switch (tier) {
        case 'high':
          setAnimationMode('webgl');
          break;
        case 'medium':
          setAnimationMode('canvas');
          break;
        case 'low':
          setAnimationMode('css');
          break;
        case 'minimal':
          setAnimationMode('static');
          break;
        default:
          setAnimationMode('css');
      }
    }
  }, [
    isReady,
    tier,
    capabilities,
    setTier,
    setCapabilities,
    setReady,
    setAnimationMode,
  ]);

  // This is a utility component, doesn't render anything
  return null;
}

/**
 * AnimationProvider component
 * 
 * Wraps the application with all animation-related providers:
 * - AnimationOrchestrator: Manages active section state
 * - PerformanceMonitor: Initializes performance monitoring
 * 
 * Usage:
 * Place this provider at the root of your application to enable
 * animation orchestration throughout the component tree.
 */
export function AnimationProvider({
  children,
  initialActiveSection,
}: AnimationProviderProps): React.ReactElement {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <AnimationOrchestrator initialActiveSection={initialActiveSection}>
      {/* Performance monitoring - only runs on client */}
      {mounted && <PerformanceMonitor />}
      {children}
    </AnimationOrchestrator>
  );
}

export default AnimationProvider;
