/**
 * Offline Fallback Page
 * 
 * Displayed when the user is offline and the requested page is not cached.
 * Provides useful information and actions while offline.
 */

import type { Metadata } from 'next';
import { OfflinePageClient } from './OfflinePageClient';

export const metadata: Metadata = {
  title: 'Offline - ChinaLink Express',
  description: 'You are currently offline. Some features may be unavailable.',
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return <OfflinePageClient />;
}
