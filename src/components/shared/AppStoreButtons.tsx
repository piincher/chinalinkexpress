'use client';

import { useState, useCallback } from 'react';
import { Smartphone, X } from 'lucide-react';

const APP_STORE_URL = 'https://apps.apple.com/app/id6503253700';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.nuvotech.chinalinkexpress';

function AppleLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.96 1.07-3.11-1.05.05-2.31.71-3.06 1.63-.68.83-1.27 2.15-1.11 3.23 1.18.09 2.38-.66 3.1-1.75z"/>
    </svg>
  );
}

function PlayLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.24-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm3.35-4.31c.34.27.59.69.59 1.19s-.22.9-.57 1.18l-2.29 1.32-2.5-2.5 2.5-2.5 2.27 1.31zM6.05 2.66l10.76 6.22-2.27 2.27L6.05 2.66z"/>
    </svg>
  );
}

export function AppStoreButton({ className }: { className?: string }) {
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 px-4 py-3 bg-black text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity ${className || ''}`}
    >
      <AppleLogo className="w-5 h-5" />
      App Store
    </a>
  );
}

export function PlayStoreButton({ className }: { className?: string }) {
  return (
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 px-4 py-3 bg-black text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity ${className || ''}`}
    >
      <PlayLogo className="w-5 h-5" />
      Google Play
    </a>
  );
}

export function OpenInAppButton({ token, className }: { token: string; className?: string }) {
  const [showFallback, setShowFallback] = useState(false);

  const handleClick = useCallback(() => {
    const deepLink = `chinalinkexpress://s/${token}`;
    window.location.href = deepLink;
    const timer = setTimeout(() => {
      setShowFallback(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [token]);

  return (
    <>
      <button
        onClick={handleClick}
        className={`inline-flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#0277BD] text-white rounded-xl text-sm font-semibold hover:bg-[#01579B] transition-colors ${className || ''}`}
      >
        <Smartphone className="w-5 h-5" />
        Ouvrir dans l'app
      </button>

      {showFallback && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4">
          <div className="bg-[var(--surface)] rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[var(--text-primary)]">L'app ne s'est pas ouverte ?</h3>
              <button onClick={() => setShowFallback(false)} className="p-1 rounded-lg hover:bg-[var(--surface-elevated)] transition-colors">
                <X className="w-5 h-5 text-[var(--text-secondary)]" />
              </button>
            </div>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              Si l'application n'est pas installée, téléchargez-la depuis votre store préféré.
            </p>
            <div className="flex flex-col gap-2">
              <AppStoreButton />
              <PlayStoreButton />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function AppStoreButtons({ token, className }: { token?: string; className?: string }) {
  return (
    <div className={`flex flex-col sm:flex-row gap-2 ${className || ''}`}>
      <AppStoreButton className="flex-1" />
      <PlayStoreButton className="flex-1" />
      {token && <OpenInAppButton token={token} className="flex-1 sm:hidden" />}
    </div>
  );
}
