/**
 * Live Features Demo Page
 * 
 * Showcase page for all live, interactive, and social features.
 * Demonstrates the production-ready implementation of:
 * - Live Shipment Feed
 * - Delivery Countdown
 * - Social Proof Banners
 * - Tracking Timeline
 * - Trending Routes Map
 * - Quick Quote Popup
 */

import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { LiveFeaturesDemo } from '@/features/live-features/components/LiveFeaturesDemo';

interface DemoPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: DemoPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  
  return {
    title: `Live Features Demo | ${t('title')}`,
    description: 'Experience our live shipment tracking, real-time updates, and interactive features.',
    robots: { index: false, follow: false }, // Don't index demo page
  };
}

export default async function DemoPage({ params }: DemoPageProps) {
  const { locale } = await params;
  
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <LiveFeaturesDemo locale={locale} />
    </main>
  );
}
