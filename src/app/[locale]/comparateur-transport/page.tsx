/**
 * Shipping Cost Comparison Page
 *
 * Interactive comparison tool showing ChinaLink Express rates
 * side-by-side with competitors (DHL, Aramex).
 *
 * SEO Targets:
 * - Primary: comparer fret chine afrique, dhl vs transitaire chine
 * - Secondary: shipping cost comparison china africa, fret aerien vs maritime cout
 */

import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import { generatePageMetadata } from '@/config/seo-advanced';
import { FAQStructuredData, StructuredData } from '@/components/seo';
import { ComparisonPage } from '@/features/shipping-comparison/ComparisonPage';

// ============================================================================
// Dynamic Metadata
// ============================================================================

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  return generatePageMetadata({
    title: isEn
      ? 'Shipping Cost Comparison China to Africa | DHL vs ChinaLink | Free Quote'
      : 'Comparateur de Fret Chine-Afrique | DHL vs ChinaLink | Devis Gratuit',
    description: isEn
      ? 'Compare shipping costs from China to West Africa. ChinaLink Sea ($3-5/kg, 60-75 days) vs Air ($8-15/kg, 14-21 days) vs DHL ($25-45/kg). See how much you save. Instant comparison for Mali, Senegal, Ivory Coast, Ghana, Nigeria.'
      : 'Comparez les coûts d\'expédition de la Chine vers l\'Afrique de l\'Ouest. ChinaLink Maritime (3-5$/kg, 60-75 jours) vs Aérien (8-15$/kg, 14-21 jours) vs DHL (25-45$/kg). Découvrez vos économies. Comparaison instantanée.',
    keywords: isEn
      ? 'shipping cost comparison china africa, compare freight rates china to africa, DHL vs freight forwarder china, cheap shipping china west africa, air freight vs sea freight cost, cargo rates china mali, transitaire chine afrique prix, compare DHL Aramex ChinaLink, shipping calculator china africa, freight quote comparison'
      : 'comparer fret chine afrique, comparateur transport chine afrique, dhl vs transitaire chine, fret aerien vs maritime cout, tarifs cargo chine mali, comparateur prix expedition chine, chinalink vs dhl prix, devis fret chine afrique, transport chine afrique pas cher, comparateur transitaire',
    path: '/comparateur-transport',
    locale: locale as Locale,
    ogType: 'website',
  });
}

// ============================================================================
// FAQ Data
// ============================================================================

const getFaqs = (isEn: boolean) => [
  {
    question: isEn
      ? 'Why is ChinaLink cheaper than DHL for shipping to Africa?'
      : 'Pourquoi ChinaLink est-il moins cher que DHL pour expédier vers l\'Afrique ?',
    answer: isEn
      ? 'ChinaLink specializes in China-to-Africa logistics with consolidation warehouses in Yiwu, bulk shipping contracts, and local partner networks. DHL charges premium express rates for global coverage. For non-urgent shipments, ChinaLink saves 50-80% while still providing reliable delivery and WhatsApp tracking.'
      : 'ChinaLink se spécialise dans la logistique Chine-Afrique avec des entrepôts de consolidation à Yiwu, des contrats de fret en vrac et des réseaux de partenaires locaux. DHL facture des tarifs express premium pour une couverture mondiale. Pour les envois non urgents, ChinaLink économise 50-80% tout en assurant une livraison fiable avec suivi WhatsApp.',
  },
  {
    question: isEn
      ? 'How accurate is this shipping cost comparison?'
      : 'À quel point cette comparaison de tarifs est-elle précise ?',
    answer: isEn
      ? 'Our rates are based on real 2026 pricing for West African destinations. Prices include customs clearance and door-to-door delivery for ChinaLink services. Final quotes may vary slightly based on product category, packaging, and seasonal demand. Contact us on WhatsApp for a confirmed quote.'
      : 'Nos tarifs sont basés sur les prix réels de 2026 pour les destinations d\'Afrique de l\'Ouest. Les prix incluent le dédouanement et la livraison porte-à-porte pour les services ChinaLink. Les devis finaux peuvent légèrement varier selon la catégorie de produit, l\'emballage et la demande saisonnière. Contactez-nous sur WhatsApp pour un devis confirmé.',
  },
  {
    question: isEn
      ? 'Should I choose sea freight or air freight from China?'
      : 'Dois-je choisir le fret maritime ou aérien depuis la Chine ?',
    answer: isEn
      ? 'Choose sea freight for large, heavy, or non-urgent shipments (60-75 days, $3-5/kg). It\'s ideal for containers, furniture, machinery, and bulk goods. Choose air freight for urgent, lightweight, or high-value items (14-21 days, $8-15/kg). Electronics, samples, and seasonal fashion items are perfect for air cargo.'
      : 'Choisissez le fret maritime pour les envois volumineux, lourds ou non urgents (60-75 jours, 3-5$/kg). Idéal pour les conteneurs, meubles, machines et marchandises en vrac. Choisissez le fret aérien pour les articles urgents, légers ou de valeur (14-21 jours, 8-15$/kg). L\'électronique, les échantillons et les articles de mode saisonniers sont parfaits pour le cargo aérien.',
  },
  {
    question: isEn
      ? 'Does ChinaLink include customs clearance in the price?'
      : 'ChinaLink inclut-il le dédouanement dans le prix ?',
    answer: isEn
      ? 'Yes. Both our sea and air freight quotes include customs clearance at destination. We handle all documentation, duties, and border processing. You only pay the shipping cost quoted — no hidden fees. This is a major advantage over DHL and Aramex where customs charges are often billed separately.'
      : 'Oui. Nos devis de fret maritime et aérien incluent le dédouanement à destination. Nous gérons tous les documents, droits de douane et formalités frontalières. Vous ne payez que le coût d\'expédition indiqué — pas de frais cachés. C\'est un avantage majeur par rapport à DHL et Aramex où les frais de douane sont souvent facturés séparément.',
  },
  {
    question: isEn
      ? 'How do I get a confirmed quote after using the comparison tool?'
      : 'Comment obtenir un devis confirmé après avoir utilisé l\'outil de comparaison ?',
    answer: isEn
      ? 'Click the WhatsApp button on the results page and send us your shipment details (weight, destination, product type). Our team in China and Mali will reply within minutes with a confirmed quote, pickup instructions, and estimated delivery date. No account needed — just message us on WhatsApp.'
      : 'Cliquez sur le bouton WhatsApp sur la page de résultats et envoyez-nous les détails de votre envoi (poids, destination, type de produit). Notre équipe en Chine et au Mali répondra en quelques minutes avec un devis confirmé, les instructions d\'enlèvement et la date de livraison estimée. Pas de compte nécessaire — envoyez-nous simplement un message sur WhatsApp.',
  },
];

// ============================================================================
// Breadcrumb Schema
// ============================================================================

function getBreadcrumbs(isEn: boolean, locale: string) {
  return [
    { name: isEn ? 'Home' : 'Accueil', url: `/${locale}/` },
    { name: isEn ? 'Tools' : 'Outils', url: `/${locale}/calculateur` },
    { name: isEn ? 'Shipping Comparison' : 'Comparateur Transport', url: `/${locale}/comparateur-transport` },
  ];
}

// ============================================================================
// Page Component
// ============================================================================

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function ComparisonPageRoute({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isEn = locale === 'en';
  const faqs = getFaqs(isEn);
  const breadcrumbs = getBreadcrumbs(isEn, locale);

  return (
    <>
      {/* Structured Data */}
      <FAQStructuredData faqs={faqs} locale={locale as Locale} />
      <StructuredData
        type="breadcrumb"
        breadcrumbs={breadcrumbs}
        locale={locale as Locale}
      />

      {/* Page Content */}
      <ComparisonPage locale={locale} />
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
  ];
}

export const dynamic = 'force-static';
export const revalidate = 3600;
