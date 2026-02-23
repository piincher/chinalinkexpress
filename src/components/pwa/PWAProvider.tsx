/**
 * PWA Provider
 * 
 * Manages PWA functionality including service worker registration,
 * offline status, and update notifications.
 */

'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { 
  registerServiceWorker, 
  isOnline, 
  listenToNetworkChanges,
  checkForUpdates,
  skipWaiting,
  captureInstallPrompt,
  isAppInstalled,
} from '@/lib/pwa/registerSW';

interface PWAContextType {
  isInstalled: boolean;
  isOnline: boolean;
  isUpdateAvailable: boolean;
  isOfflineReady: boolean;
  installPrompt: () => Promise<boolean>;
  updateApp: () => Promise<void>;
  checkUpdates: () => Promise<boolean>;
  swRegistration: ServiceWorkerRegistration | null;
}

const PWAContext = createContext<PWAContextType | null>(null);

export function usePWA() {
  const context = useContext(PWAContext);
  if (!context) {
    throw new Error('usePWA must be used within PWAProvider');
  }
  return context;
}

interface PWAProviderProps {
  children: React.ReactNode;
}

export function PWAProvider({ children }: PWAProviderProps) {
  const [isInstalled, setIsInstalled] = useState(false);
  const [online, setOnline] = useState(true);
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [isOfflineReady, setIsOfflineReady] = useState(false);
  const [swRegistration, setSwRegistration] = useState<ServiceWorkerRegistration | null>(null);

  // Register service worker on mount
  useEffect(() => {
    let unregisterNetworkListener: (() => void) | null = null;

    const initPWA = async () => {
      // Check if already installed
      setIsInstalled(isAppInstalled());

      // Check online status
      setOnline(isOnline());

      // Listen to network changes
      unregisterNetworkListener = listenToNetworkChanges(
        () => setOnline(true),
        () => setOnline(false)
      );

      // Capture install prompt
      captureInstallPrompt();

      // Register service worker
      const result = await registerServiceWorker();
      
      if (result.registration) {
        setSwRegistration(result.registration);
        setIsOfflineReady(result.isOfflineReady);
        setIsUpdateAvailable(result.isUpdateAvailable);

        // Listen for updates
        result.registration.addEventListener('updatefound', () => {
          const newWorker = result.registration?.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setIsUpdateAvailable(true);
              }
            });
          }
        });
      }
    };

    initPWA();

    return () => {
      unregisterNetworkListener?.();
    };
  }, []);

  // Install prompt
  const installPrompt = useCallback(async (): Promise<boolean> => {
    if (typeof window === 'undefined') return false;
    
    // Try to use the deferred prompt if available
    const { showInstallPrompt } = await import('@/lib/pwa/registerSW');
    const result = await showInstallPrompt();
    
    if (result) {
      setIsInstalled(true);
    }
    
    return result;
  }, []);

  // Update app
  const updateApp = useCallback(async () => {
    await skipWaiting();
    window.location.reload();
  }, []);

  // Check for updates
  const checkUpdates = useCallback(async (): Promise<boolean> => {
    const hasUpdate = await checkForUpdates();
    setIsUpdateAvailable(hasUpdate);
    return hasUpdate;
  }, []);

  const value: PWAContextType = {
    isInstalled,
    isOnline: online,
    isUpdateAvailable,
    isOfflineReady,
    installPrompt,
    updateApp,
    checkUpdates,
    swRegistration,
  };

  return (
    <PWAContext.Provider value={value}>
      {children}
    </PWAContext.Provider>
  );
}
