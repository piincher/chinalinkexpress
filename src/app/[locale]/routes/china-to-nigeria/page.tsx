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
    title: 'Cargo Chine Nigeria | Fret Aérien & Maritime vers Lagos',
    description: 'Fret aérien et maritime de la Chine vers le Nigeria. Routes vers Lagos, sourcing, paiement fournisseur, consolidation et devis ChinaLink Express.',
    keywords: 'cargo chine nigeria, fret chine lagos, transitaire chine nigeria, expédition chine lagos, conteneur chine nigeria',
    path: '/routes/china-to-nigeria',
    locale: locale as Locale,
  });
}

export default async function ChinaToNigeriaRoute({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumbs = [
    { name: 'Accueil', url: `/${locale}/` },
    { name: 'Routes', url: `/${locale}/routes/china-to-nigeria` },
    { name: 'Chine vers Nigeria', url: `/${locale}/routes/china-to-nigeria` },
  ];

  return (
    <>
      <RouteStructuredData
        route={{ origin: 'China', destination: 'Nigeria', durationDays: { min: 10, max: 60 }, methods: ['air', 'sea'] }}
        method="air"
        locale={locale as Locale}
        breadcrumbs={breadcrumbs}
      />
      <RoutePage locale={locale} routeKey="china-to-nigeria" country="Nigeria" capital="Lagos" />
    </>
  );
}

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }, { locale: 'zh' }, { locale: 'ar' }];
}

export const dynamic = 'force-static';
export const revalidate = 3600;
