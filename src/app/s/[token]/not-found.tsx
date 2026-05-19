'use client';

import { Link2Off } from 'lucide-react';
import Link from 'next/link';

export default function ShareNotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <header className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#0277BD] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m7.5 4.27 9 5.15" /><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" />
              </svg>
            </div>
            <span className="font-bold text-[#0277BD] text-lg tracking-tight">ChinaLink Express</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-[#FEF3C7] flex items-center justify-center mx-auto mb-4">
            <Link2Off className="w-8 h-8 text-[#D97706]" />
          </div>
          <h1 className="text-xl font-bold text-[var(--text-primary)] mb-2">
            Lien expiré
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            Ce lien de partage n&apos;est plus valide. Demandez à l&apos;expéditeur un nouveau lien.
          </p>

          {/* App CTA */}
          <div className="pt-6 border-t border-[var(--border)]">
            <p className="text-xs text-[var(--text-muted)] mb-3">Téléchargez l&apos;app pour suivre vos envois</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <a href="https://apps.apple.com/app/id6503253700" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.96 1.07-3.11-1.05.05-2.31.71-3.06 1.63-.68.83-1.27 2.15-1.11 3.23 1.18.09 2.38-.66 3.1-1.75z"/></svg>
                App Store
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.nuvotech.chinalinkexpress" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--surface-elevated)] border border-[var(--border)] rounded-xl text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.24-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm3.35-4.31c.34.27.59.69.59 1.19s-.22.9-.57 1.18l-2.29 1.32-2.5-2.5 2.5-2.5 2.27 1.31zM6.05 2.66l10.76 6.22-2.27 2.27L6.05 2.66z"/></svg>
                Google Play
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
