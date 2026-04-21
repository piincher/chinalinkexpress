/**
 * Sea Freight Service Page
 *
 * SEO-optimized page for FCL/LCL shipping from China to Mali.
 */

import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import { generateServiceMetadata } from '@/lib/metadata';
import { FAQStructuredData, ServiceStructuredData } from '@/components/seo';
import { SeaFreightPage } from '@/features/services/SeaFreightPage';

interface Props {
  params: Promise<{ locale: string }>;
}

const seaFreightFaqs = [
  {
    question: 'Combien de temps prend le fret maritime Chine-Mali ?',
    answer: 'Le fret maritime vers Bamako prend généralement 60 à 75 jours, selon le port de départ en Chine, le port d’arrivée en Afrique de l’Ouest et le transport terrestre vers le Mali.',
  },
  {
    question: 'Quelle est la différence entre FCL et LCL ?',
    answer: 'FCL signifie conteneur complet pour un seul client. LCL signifie groupage maritime, où vos marchandises partagent un conteneur avec d’autres envois.',
  },
  {
    question: 'Par quels ports passent les conteneurs vers Bamako ?',
    answer: 'Les routes fréquentes passent par Lomé, Dakar ou Abidjan, puis continuent par transport terrestre jusqu’à Bamako.',
  },
  {
    question: 'Le fret maritime convient-il aux petits colis ?',
    answer: 'Le maritime est surtout intéressant pour les gros volumes, meubles, machines, cartons en quantité ou marchandises lourdes. Pour les urgences, le fret aérien est plus adapté.',
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generateServiceMetadata(locale as Locale, 'sea');
}

export default async function SeaFreight({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isEn = locale === 'en';
  const breadcrumbs = [
    { name: isEn ? 'Home' : 'Accueil', url: `/${locale}/` },
    { name: isEn ? 'Services' : 'Services', url: `/${locale}/services` },
    { name: isEn ? 'Sea Freight' : 'Fret Maritime', url: `/${locale}/services/sea-freight` },
  ];

  return (
    <>
      <ServiceStructuredData
        serviceType="sea"
        locale={locale as Locale}
        breadcrumbs={breadcrumbs}
      />
      <FAQStructuredData faqs={seaFreightFaqs} locale={locale as Locale} />
      <SeaFreightPage locale={locale} />
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
