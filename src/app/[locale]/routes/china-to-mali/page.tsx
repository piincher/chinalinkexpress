/**
 * China to Mali Route Page - SEO Optimized
 * 
 * Features:
 * - Route-specific metadata targeting "shipping China Mali" keywords
 * - ShippingDeliveryTime structured data
 * - Geographic targeting for Mali market
 * 
 * Target Keywords:
 * - Primary: shipping China Mali, freight forwarder Bamako
 * - Long-tail: import China Mali, China to Bamako shipping
 * - Local: transitaire Bamako, fret Chine Mali
 */

import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import { generateRouteMetadata } from '@/lib/metadata';
import { RouteStructuredData, StructuredData } from '@/components/seo';
import { generateOrganizationSchema, generateLocalBusinessSchema } from '@/config/seo-advanced';
import { RoutePage } from '@/features/routes/RoutePage';

// ============================================================================
// Dynamic Metadata
// ============================================================================

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  return generateRouteMetadata(locale as Locale, 'mali');
}

// ============================================================================
// Page Component
// ============================================================================

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function ChinaToMaliRoute({ params }: PageProps) {
  const { locale } = await params;
  
  // Set locale for static generation
  setRequestLocale(locale);
  
  const isEn = locale === 'en';
  
  // Breadcrumb data
  const breadcrumbs = [
    { name: isEn ? 'Home' : 'Accueil', url: `/${locale}/` },
    { name: isEn ? 'Routes' : 'Routes', url: `/${locale}/routes/` },
    { name: isEn ? 'China to Mali' : 'Chine vers Mali', url: `/${locale}/routes/china-to-mali/` },
  ];
  
  // Shipping route data for structured data
  const shippingRoute = {
    origin: 'China',
    destination: 'Mali',
    durationDays: { min: 14, max: 75 },
    methods: ['air', 'sea'] as ('air' | 'sea')[],
  };

  // Additional schemas for route page
  const additionalSchemas = [
    generateOrganizationSchema(),
    generateLocalBusinessSchema(),
  ];

  return (
    <>
      {/* Route-specific Structured Data */}
      <RouteStructuredData 
        route={shippingRoute}
        method="air"
        locale={locale as Locale}
        breadcrumbs={breadcrumbs}
      />
      
      {/* Organization & LocalBusiness */}
      <StructuredData schemas={additionalSchemas} />
      
      {/* Page Content */}
      <RoutePage 
        locale={locale} 
        routeKey="china-to-mali"
        country="Mali"
        capital="Bamako"
      />
    </>
  );
}

// ============================================================================
// Static Generation Configuration
// ============================================================================

export function generateStaticParams() {
  return [
    { locale: 'fr' },
    { locale: 'en' },
    { locale: 'zh' },
    { locale: 'ar' },
  ];
}

export const dynamic = 'force-static';
export const revalidate = 3600;
