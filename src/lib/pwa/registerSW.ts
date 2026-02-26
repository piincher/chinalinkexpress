/**
 * Service Worker Registration
 * 
 * Handles registration, updates, and communication with the service worker.
 */

export interface SWRegistrationResult {
  registration: ServiceWorkerRegistration | null;
  isUpdateAvailable: boolean;
  isOfflineReady: boolean;
  error: Error | null;
}

// Register service worker
export async function registerServiceWorker(): Promise<SWRegistrationResult> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return {
      registration: null,
      isUpdateAvailable: false,
      isOfflineReady: false,
      error: new Error('Service workers not supported'),
    };
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'imports',
    });

    // Handle updates
    let isUpdateAvailable = false;

    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            isUpdateAvailable = true;
          }
        });
      }
    });

    // Check if offline ready
    const isOfflineReady = registration.active !== null;

    return {
      registration,
      isUpdateAvailable,
      isOfflineReady,
      error: null,
    };
  } catch (error) {
    return {
      registration: null,
      isUpdateAvailable: false,
      isOfflineReady: false,
      error: error instanceof Error ? error : new Error(String(error)),
    };
  }
}

// Update service worker
export async function updateServiceWorker(): Promise<void> {
  if (!('serviceWorker' in navigator)) return;

  const registration = await navigator.serviceWorker.ready;
  await registration.update();
}

// Skip waiting and activate new service worker
export async function skipWaiting(): Promise<void> {
  if (!('serviceWorker' in navigator)) return;

  const registration = await navigator.serviceWorker.ready;
  if (registration.waiting) {
    registration.waiting.postMessage('skipWaiting');
  }
}

// Check for app updates
export async function checkForUpdates(): Promise<boolean> {
  if (!('serviceWorker' in navigator)) return false;

  const registration = await navigator.serviceWorker.ready;
  await registration.update();
  
  return new Promise((resolve) => {
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            resolve(true);
          }
        });
      }
    });
    
    // Resolve false if no update found within 5 seconds
    setTimeout(() => resolve(false), 5000);
  });
}

// Check online status
export function isOnline(): boolean {
  return typeof navigator !== 'undefined' && navigator.onLine;
}

// Listen to online/offline events
export function listenToNetworkChanges(
  onOnline: () => void,
  onOffline: () => void
): () => void {
  if (typeof window === 'undefined') return () => {};

  window.addEventListener('online', onOnline);
  window.addEventListener('offline', onOffline);

  return () => {
    window.removeEventListener('online', onOnline);
    window.removeEventListener('offline', onOffline);
  };
}

// Check if app is installed
export function isAppInstalled(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check display mode
  const displayMode = window.matchMedia('(display-mode: standalone)').matches;
  const displayModeFullscreen = window.matchMedia('(display-mode: fullscreen)').matches;
  
  // Check iOS standalone
  const iOSStandalone = (window.navigator as { standalone?: boolean }).standalone === true;
  
  return displayMode || displayModeFullscreen || iOSStandalone;
}

// Get installation prompt (for manual install button)
let deferredPrompt: Event | null = null;

export function captureInstallPrompt(): void {
  if (typeof window === 'undefined') return;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
  });
}

// Show install prompt
export async function showInstallPrompt(): Promise<boolean> {
  if (!deferredPrompt) return false;

  // @ts-expect-error - beforeinstallprompt event
  deferredPrompt.prompt();
  
  // @ts-expect-error - beforeinstallprompt event
  const { outcome } = await deferredPrompt.userChoice;
  
  deferredPrompt = null;
  return outcome === 'accepted';
}
