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
    title: 'Cargo Chine Bénin | Fret Aérien & Maritime vers Cotonou',
    description: 'Fret aérien et maritime de la Chine vers le Bénin. Routes vers Cotonou, sourcing, paiement fournisseur, consolidation et devis ChinaLink Express.',
    keywords: 'cargo chine benin, fret chine cotonou, transitaire chine benin, expédition chine cotonou',
    path: '/routes/china-to-benin',
    locale: locale as Locale,
  });
}

export default async function ChinaToBeninRoute({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumbs = [
    { name: 'Accueil', url: `/${locale}/` },
    { name: 'Routes', url: `/${locale}/routes/china-to-benin` },
    { name: 'Chine vers Bénin', url: `/${locale}/routes/china-to-benin` },
  ];

  return (
    <>
      <RouteStructuredData
        route={{ origin: 'China', destination: 'Benin', durationDays: { min: 12, max: 60 }, methods: ['air', 'sea'] }}
        method="air"
        locale={locale as Locale}
        breadcrumbs={breadcrumbs}
      />
      <RoutePage locale={locale} routeKey="china-to-benin" country="Bénin" capital="Cotonou" />
    </>
  );
}

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }, { locale: 'zh' }, { locale: 'ar' }];
}

export const dynamic = 'force-static';
export const revalidate = 3600;
