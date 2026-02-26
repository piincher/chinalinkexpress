/**
 * Home Page - SEO Optimized
 * 
 * Features:
 * - Dynamic metadata generation for each locale
 * - Complete structured data (Organization, LocalBusiness, WebSite)
 * - OpenGraph and Twitter card optimization
 * - Canonical and hreflang tags
 * 
 * Target Keywords:
 * - Primary: freight forwarding, shipping from China, logistics company
 * - Long-tail: shipping from China to Africa, China to West Africa shipping
 * - Local: shipping China Bamako, freight forwarder China Mali
 */

import type { Metadata, Viewport } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale, i18nConfig } from '@/i18n/config';
import { generateHomeMetadata, defaultViewport } from '@/lib/metadata';
import { HomeStructuredData } from '@/components/seo';
import { LandingPage } from '@/views/landing';

// ============================================================================
// Viewport Configuration
// ============================================================================

export const viewport: Viewport = defaultViewport;

// ============================================================================
// Dynamic Metadata
// ============================================================================

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  return generateHomeMetadata(locale as Locale);
}

// ============================================================================
// Page Component
// ============================================================================

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  
  // Validate and set locale for static generation
  const validLocale = i18nConfig.locales.includes(locale as Locale) 
    ? locale 
    : i18nConfig.defaultLocale;

  // Set locale for next-intl
  setRequestLocale(validLocale);

  return (
    <>
      {/* Complete structured data for homepage */}
      <HomeStructuredData locale={validLocale as Locale} />
      
      {/* Landing page content */}
      <LandingPage locale={validLocale as Locale} />
    </>
  );
}

// ============================================================================
// Static Generation Configuration
// ============================================================================

/**
 * Generate static pages for all supported locales at build time.
 * This ensures optimal performance and SEO.
 */
export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

// Use static generation with ISR
export const dynamic = 'force-static';

// Revalidate every hour for content freshness
export const revalidate = 3600;

// Use Node.js runtime for full Next.js features
export const runtime = 'nodejs';
