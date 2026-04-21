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
    title: 'Cargo Chine Burkina Faso | Fret vers Ouagadougou',
    description: 'Fret aérien et maritime de la Chine vers le Burkina Faso. Routes vers Ouagadougou, sourcing, paiement fournisseur, consolidation et devis ChinaLink Express.',
    keywords: 'cargo chine burkina faso, fret chine ouagadougou, transitaire chine burkina, expédition chine ouagadougou',
    path: '/routes/china-to-burkina-faso',
    locale: locale as Locale,
  });
}

export default async function ChinaToBurkinaRoute({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumbs = [
    { name: 'Accueil', url: `/${locale}/` },
    { name: 'Routes', url: `/${locale}/routes/china-to-burkina-faso` },
    { name: 'Chine vers Burkina Faso', url: `/${locale}/routes/china-to-burkina-faso` },
  ];

  return (
    <>
      <RouteStructuredData
        route={{ origin: 'China', destination: 'Burkina Faso', durationDays: { min: 14, max: 75 }, methods: ['air', 'sea'] }}
        method="air"
        locale={locale as Locale}
        breadcrumbs={breadcrumbs}
      />
      <RoutePage locale={locale} routeKey="china-to-burkina-faso" country="Burkina Faso" capital="Ouagadougou" />
    </>
  );
}

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }, { locale: 'zh' }, { locale: 'ar' }];
}

export const dynamic = 'force-static';
export const revalidate = 3600;
