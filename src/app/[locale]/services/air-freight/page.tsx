/**
 * Air Freight Service Page - SEO Optimized
 * 
 * Features:
 * - Dynamic metadata with comprehensive SEO
 * - Enhanced structured data with Service schema
 * - Breadcrumb navigation structured data
 * - OpenGraph and Twitter card optimization
 * 
 * Target Keywords:
 * - Primary: air freight China Africa, air cargo, express shipping
 * - Long-tail: air freight Bamako, China to Mali air shipping
 * - Location: shipping China Bamako, air freight Dakar
 */

import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import { generateServiceMetadata } from '@/lib/metadata';
import { FAQStructuredData, ServiceStructuredData } from '@/components/seo';
import { AirFreightPage } from '@/features/services/AirFreightPage';

// ============================================================================
// Dynamic Metadata
// ============================================================================

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  return generateServiceMetadata(locale as Locale, 'air');
}

// ============================================================================
// Page Component
// ============================================================================

interface PageProps {
  params: Promise<{ locale: string }>;
}

const airFreightFaqs = {
  fr: [
    {
      question: 'Combien de temps prend le fret aérien Chine-Mali ?',
      answer: 'Le fret aérien de Chine vers Bamako prend généralement 14 à 21 jours ouvrables selon la ville de départ, la consolidation et les contrôles avant embarquement.',
    },
    {
      question: 'Quels produits conviennent au cargo aérien Chine-Mali ?',
      answer: 'Le fret aérien convient aux vêtements, accessoires, pièces, petits équipements, échantillons et marchandises urgentes. Les batteries, liquides et produits dangereux demandent une validation avant expédition.',
    },
    {
      question: 'Pouvez-vous acheter la marchandise avant de l’expédier ?',
      answer: 'Oui. ChinaLink peut sourcer, payer le fournisseur, contrôler la marchandise, consolider les colis puis organiser le fret aérien vers Bamako.',
    },
    {
      question: 'Comment recevoir un devis de fret aérien ?',
      answer: 'Envoyez le poids, le volume, la catégorie produit, la ville de départ en Chine et la destination à Bamako sur WhatsApp. Nous estimons le mode le plus adapté.',
    },
  ],
  en: [
    {
      question: 'How long does China to Mali air freight take?',
      answer: 'Air freight from China to Bamako usually takes 14 to 21 business days depending on origin city, consolidation and pre-flight checks.',
    },
    {
      question: 'Which products are suitable for China to Africa air cargo?',
      answer: 'Air freight works well for clothing, accessories, parts, small equipment, samples and urgent goods. Batteries, liquids and dangerous goods require validation before shipping.',
    },
    {
      question: 'Can you buy the goods before shipping them?',
      answer: 'Yes. ChinaLink can source products, pay the supplier, inspect goods, consolidate parcels and organize air freight to Bamako or another supported West African destination.',
    },
    {
      question: 'How do I get an air freight quote?',
      answer: 'Send the weight, volume, product category, China origin city and destination on WhatsApp. We will estimate the most suitable freight mode.',
    },
  ],
};

export default async function AirFreightService({ params }: PageProps) {
  const { locale } = await params;
  
  // Set locale for static generation
  setRequestLocale(locale);
  
  const isEn = locale === 'en';
  const faqs = isEn ? airFreightFaqs.en : airFreightFaqs.fr;
  
  // Breadcrumb data for structured data
  const breadcrumbs = [
    { name: isEn ? 'Home' : 'Accueil', url: `/${locale}/` },
    { name: isEn ? 'Services' : 'Services', url: `/${locale}/services` },
    { name: isEn ? 'Air Freight' : 'Fret Aérien', url: `/${locale}/services/air-freight` },
  ];

  return (
    <>
      {/* Enhanced Structured Data */}
      <ServiceStructuredData 
        serviceType="air" 
        locale={locale as Locale}
        breadcrumbs={breadcrumbs}
      />
      <FAQStructuredData faqs={faqs} locale={locale as Locale} />
      
      {/* Page Content */}
      <AirFreightPage locale={locale} />
    </>
  );
}

// ============================================================================
// Static Generation Configuration
// ============================================================================

// Generate static pages for all locales at build time
export function generateStaticParams() {
  return [
    { locale: 'fr' },
    { locale: 'en' },
    { locale: 'zh' },
    { locale: 'ar' },
  ];
}

// Route segment config for caching
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour
