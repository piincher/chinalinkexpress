/**
 * Sourcing & Procurement Service Page
 *
 * SEO-optimized page for China sourcing services for Mali importers.
 */

import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import { generateServiceMetadata } from '@/lib/metadata';
import { FAQStructuredData, ServiceStructuredData } from '@/components/seo';
import { SourcingPage } from '@/features/services/SourcingPage';

interface Props {
  params: Promise<{ locale: string }>;
}

const sourcingFaqs = [
  {
    question: 'Pouvez-vous acheter sur Alibaba pour un client au Mali ?',
    answer: 'Oui. ChinaLink Express peut rechercher le fournisseur, vérifier ses informations, payer la commande en Chine, contrôler les marchandises et organiser l’expédition vers Bamako.',
  },
  {
    question: 'Comment vérifiez-vous un fournisseur chinois ?',
    answer: 'Nous vérifions les informations de l’entreprise, la cohérence des prix, les photos/vidéos de production, les références disponibles et les risques avant tout paiement important.',
  },
  {
    question: 'Pouvez-vous regrouper plusieurs achats avant expédition ?',
    answer: 'Oui. Nous consolidons les colis de plusieurs fournisseurs dans notre réseau en Chine afin de réduire le coût du fret vers le Mali.',
  },
  {
    question: 'Le sourcing inclut-il le paiement fournisseur ?',
    answer: 'Oui, nous pouvons régler le fournisseur via les moyens de paiement utilisés en Chine, puis vous envoyer une preuve de paiement et le suivi de commande.',
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generateServiceMetadata(locale as Locale, 'sourcing');
}

export default async function Sourcing({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isEn = locale === 'en';
  const breadcrumbs = [
    { name: isEn ? 'Home' : 'Accueil', url: `/${locale}/` },
    { name: isEn ? 'Services' : 'Services', url: `/${locale}/services` },
    { name: isEn ? 'China Sourcing' : 'Sourcing Chine', url: `/${locale}/services/sourcing` },
  ];

  return (
    <>
      <ServiceStructuredData
        serviceType="sourcing"
        locale={locale as Locale}
        breadcrumbs={breadcrumbs}
      />
      <FAQStructuredData faqs={sourcingFaqs} locale={locale as Locale} />
      <SourcingPage locale={locale} />
    </>
  );
}

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
