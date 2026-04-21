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
import { FAQStructuredData, RouteStructuredData, StructuredData } from '@/components/seo';
import { generateOrganizationSchema, generateLocalBusinessSchema } from '@/config/seo-advanced';
import { Breadcrumb } from '@/components/Breadcrumb';
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

const routeFaqs = [
  {
    question: 'Combien de temps prend le fret Chine-Mali ?',
    answer: 'Le fret aérien prend généralement 14 à 21 jours vers Bamako. Le fret maritime prend généralement 60 à 75 jours depuis le port de Foshan jusqu’au port de Dakar, puis par transport terrestre vers Bamako.',
  },
  {
    question: 'ChinaLink peut-il gérer le sourcing avant l’expédition ?',
    answer: 'Oui. ChinaLink peut rechercher le fournisseur, gérer le paiement, contrôler la marchandise, consolider les colis et organiser l’expédition vers le Mali.',
  },
  {
    question: 'Quels produits sont adaptés au fret aérien Chine-Mali ?',
    answer: 'Le fret aérien convient aux colis urgents, vêtements, accessoires, petites pièces, échantillons et produits à forte marge. Les batteries, liquides et produits dangereux doivent être validés avant expédition.',
  },
  {
    question: 'Quels produits sont adaptés au fret maritime Chine-Mali ?',
    answer: 'Le fret maritime convient aux gros volumes, meubles, machines, cartons lourds et marchandises non urgentes.',
  },
];

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

  const breadcrumbItems = breadcrumbs.map((b) => ({
    label: b.name,
    href: b.url,
  }));

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
      <FAQStructuredData faqs={routeFaqs} locale={locale as Locale} />

      {/* Visible Breadcrumb Navigation */}
      <div className="bg-white pt-28 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} locale={locale as Locale} />
        </div>
      </div>
      
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
