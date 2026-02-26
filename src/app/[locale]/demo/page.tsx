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
import Link from 'next/link';

interface DemoPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: DemoPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  
  return {
    title: `Demo | ${t('title')}`,
    description: 'Experience our shipment tracking and interactive features.',
    robots: { index: false, follow: false },
  };
}

export default async function DemoPage({ params }: DemoPageProps) {
  const { locale } = await params;
  
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-3xl font-bold mb-4">Demo Page</h1>
        <p className="text-gray-600 mb-6">This demo page is under construction.</p>
        <Link href={`/${locale}`} className="text-blue-600 hover:underline">
          Return to Home
        </Link>
      </div>
    </main>
  );
}
