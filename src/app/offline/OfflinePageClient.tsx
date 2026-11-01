/**
 * Offline Page Client Component
 * 
 * Interactive client component for the offline fallback page.
 */

'use client';

import Link from 'next/link';

export function OfflinePageClient() {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <main className="min-h-screen bg-[var(--surface)] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Offline Icon */}
        <div className="w-24 h-24 mx-auto mb-6 bg-[var(--surface-elevated)] rounded-full flex items-center justify-center">
          <svg 
            className="w-12 h-12 text-[var(--text-tertiary)]" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" 
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
          You are offline
        </h1>
        <p className="text-[var(--text-secondary)] mb-8">
          Please check your internet connection and try again.
        </p>

        {/* Available Offline Features */}
        <div className="bg-[var(--surface-elevated)] rounded-2xl p-6 mb-6 text-left">
          <h2 className="font-semibold text-[var(--text-primary)] mb-4">
            Available offline:
          </h2>
          <ul className="space-y-3 text-[var(--text-secondary)]">
            <li className="flex items-center gap-3">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              View cached pricing information
            </li>
            <li className="flex items-center gap-3">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Use shipping calculator
            </li>
            <li className="flex items-center gap-3">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Read FAQ and help articles
            </li>
            <li className="flex items-center gap-3">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              View contact information
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleReload}
            className="w-full py-3 px-4 bg-[var(--color-primary)] text-white rounded-xl font-semibold hover:bg-[var(--color-primary-dark)] transition-colors"
          >
            Retry Connection
          </button>
          <Link
            href="/"
            className="block w-full py-3 px-4 bg-[var(--surface-elevated)] text-[var(--text-primary)] border border-[var(--border)] rounded-xl font-semibold hover:bg-[var(--surface-lowered)] transition-colors text-center"
          >
            Go to Homepage
          </Link>
        </div>

        {/* WhatsApp Contact */}
        <div className="mt-8 pt-6 border-t border-[var(--border)]">
          <p className="text-sm text-[var(--text-tertiary)] mb-3">
            Need help? Contact us on WhatsApp
          </p>
          <a
            href="https://wa.me/8618851725957"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 py-2 px-4 bg-green-500 text-white rounded-full text-sm font-medium hover:bg-green-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            +86 188 5172 5957
          </a>
        </div>
      </div>
    </main>
  );
}
