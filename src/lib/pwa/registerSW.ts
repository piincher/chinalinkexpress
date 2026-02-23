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

    console.log('[PWA] Service Worker registered:', registration.scope);

    // Handle updates
    let isUpdateAvailable = false;

    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            isUpdateAvailable = true;
            console.log('[PWA] New version available');
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
    console.error('[PWA] Service Worker registration failed:', error);
    return {
      registration: null,
      isUpdateAvailable: false,
      isOfflineReady: false,
      error: error instanceof Error ? error : new Error(String(error)),
    };
  }
}

// Unregister service worker (for debugging)
export async function unregisterServiceWorker(): Promise<boolean> {
  if (!('serviceWorker' in navigator)) return false;

  const registration = await navigator.serviceWorker.ready;
  const result = await registration.unregister();
  console.log('[PWA] Service Worker unregistered:', result);
  return result;
}

// Update service worker
export async function updateServiceWorker(): Promise<void> {
  if (!('serviceWorker' in navigator)) return;

  const registration = await navigator.serviceWorker.ready;
  await registration.update();
  console.log('[PWA] Service Worker update check triggered');
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

// Listen for messages from service worker
export function listenToSWMessages(
  callback: (event: MessageEvent) => void
): () => void {
  if (!('serviceWorker' in navigator)) return () => {};

  navigator.serviceWorker.addEventListener('message', callback);
  
  return () => {
    navigator.serviceWorker.removeEventListener('message', callback);
  };
}

// Send message to service worker
export async function sendMessageToSW(message: unknown): Promise<void> {
  if (!('serviceWorker' in navigator)) return;

  const registration = await navigator.serviceWorker.ready;
  if (registration.active) {
    registration.active.postMessage(message);
  }
}

// Cache specific URLs
export async function cacheUrls(urls: string[]): Promise<void> {
  return sendMessageToSW({ type: 'CACHE_URLS', urls });
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

// Request background sync
export async function requestBackgroundSync(tag: string): Promise<void> {
  if (!('serviceWorker' in navigator) || !('SyncManager' in window)) {
    console.warn('[PWA] Background sync not supported');
    return;
  }

  const registration = await navigator.serviceWorker.ready;
  try {
    // @ts-expect-error - sync is not in standard types yet
    await registration.sync.register(tag);
    console.log('[PWA] Background sync registered:', tag);
  } catch (error) {
    console.error('[PWA] Background sync registration failed:', error);
  }
}

// Request periodic sync (for content updates)
export async function requestPeriodicSync(tag: string, minInterval: number): Promise<void> {
  if (!('serviceWorker' in navigator)) {
    console.warn('[PWA] Periodic sync not supported');
    return;
  }

  const registration = await navigator.serviceWorker.ready;
  
  if (!('periodicSync' in registration)) {
    console.warn('[PWA] Periodic sync not supported');
    return;
  }

  try {
    // @ts-expect-error - periodicSync is not in standard types yet
    await registration.periodicSync.register(tag, { minInterval });
    console.log('[PWA] Periodic sync registered:', tag);
  } catch (error) {
    console.error('[PWA] Periodic sync registration failed:', error);
  }
}

// Get installation prompt (for manual install button)
let deferredPrompt: Event | null = null;

export function captureInstallPrompt(): void {
  if (typeof window === 'undefined') return;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log('[PWA] Install prompt captured');
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

// Check if install prompt is available
export function isInstallPromptAvailable(): boolean {
  return deferredPrompt !== null;
}

// Get PWA installability info
export function getPWAInfo(): {
  isStandalone: boolean;
  isOnline: boolean;
  isInstallable: boolean;
  hasSW: boolean;
} {
  return {
    isStandalone: isAppInstalled(),
    isOnline: isOnline(),
    isInstallable: isInstallPromptAvailable(),
    hasSW: 'serviceWorker' in navigator,
  };
}
