import type { Metadata } from 'next';

// Internal animation showcase: it repeated the homepage title and was indexable (audit 2026-11-20).
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function AnimationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
