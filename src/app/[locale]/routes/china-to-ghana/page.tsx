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
    title: 'Cargo Chine Ghana | Fret Aérien & Maritime vers Accra',
    description: 'Fret aérien et maritime de la Chine vers le Ghana. Routes vers Accra, sourcing, paiement fournisseur, consolidation et devis ChinaLink Express.',
    keywords: 'cargo chine ghana, fret chine accra, transitaire chine ghana, expédition chine accra, conteneur chine ghana',
    path: '/routes/china-to-ghana',
    locale: locale as Locale,
  });
}

export default async function ChinaToGhanaRoute({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumbs = [
    { name: 'Accueil', url: `/${locale}/` },
    { name: 'Routes', url: `/${locale}/routes/china-to-ghana` },
    { name: 'Chine vers Ghana', url: `/${locale}/routes/china-to-ghana` },
  ];

  return (
    <>
      <RouteStructuredData
        route={{ origin: 'China', destination: 'Ghana', durationDays: { min: 12, max: 60 }, methods: ['air', 'sea'] }}
        method="air"
        locale={locale as Locale}
        breadcrumbs={breadcrumbs}
      />
      <RoutePage locale={locale} routeKey="china-to-ghana" country="Ghana" capital="Accra" />
    </>
  );
}

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }, { locale: 'zh' }, { locale: 'ar' }];
}

export const dynamic = 'force-static';
export const revalidate = 3600;
