import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import { generatePageMetadata } from '@/config/seo-advanced';
import { RouteStructuredData } from '@/components/seo';
import { RoutePage } from '@/features/routes/RoutePage';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'Expédition Chine Côte d’Ivoire | Fret vers Abidjan',
    description: 'Fret aérien et maritime de la Chine vers la Côte d’Ivoire. Routes vers Abidjan, sourcing, paiement fournisseur, consolidation et devis.',
    keywords: 'fret Chine Côte d’Ivoire, expédition Chine Abidjan, transitaire Chine Côte d’Ivoire, cargo Chine Abidjan',
    path: '/routes/china-to-cote-divoire',
    locale: locale as Locale,
  });
}

export default async function ChinaToCoteDIvoireRoute({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumbs = [
    { name: 'Accueil', url: `/${locale}/` },
    { name: 'Routes', url: `/${locale}/routes/china-to-cote-divoire` },
    { name: 'Chine vers Côte d’Ivoire', url: `/${locale}/routes/china-to-cote-divoire` },
  ];

  return (
    <>
      <RouteStructuredData
        route={{ origin: 'China', destination: 'Ivory Coast', durationDays: { min: 12, max: 60 }, methods: ['air', 'sea'] }}
        method="air"
        locale={locale as Locale}
        breadcrumbs={breadcrumbs}
      />
      <RoutePage locale={locale} routeKey="china-to-cote-divoire" country="Côte d’Ivoire" capital="Abidjan" />
    </>
  );
}

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }, { locale: 'zh' }, { locale: 'ar' }];
}

export const dynamic = 'force-static';
export const revalidate = 3600;
