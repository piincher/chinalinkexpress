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
    title: 'Cargo Chine Togo | Fret Aérien & Maritime vers Lomé',
    description: 'Fret aérien et maritime de la Chine vers le Togo. Routes vers Lomé, sourcing, paiement fournisseur, consolidation et devis ChinaLink Express.',
    keywords: 'cargo chine togo, fret chine lome, transitaire chine togo, expédition chine lome',
    path: '/routes/china-to-togo',
    locale: locale as Locale,
  });
}

export default async function ChinaToTogoRoute({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumbs = [
    { name: 'Accueil', url: `/${locale}/` },
    { name: 'Routes', url: `/${locale}/routes/china-to-togo` },
    { name: 'Chine vers Togo', url: `/${locale}/routes/china-to-togo` },
  ];

  return (
    <>
      <RouteStructuredData
        route={{ origin: 'China', destination: 'Togo', durationDays: { min: 12, max: 60 }, methods: ['air', 'sea'] }}
        method="air"
        locale={locale as Locale}
        breadcrumbs={breadcrumbs}
      />
      <RoutePage locale={locale} routeKey="china-to-togo" country="Togo" capital="Lomé" />
    </>
  );
}

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }, { locale: 'zh' }, { locale: 'ar' }];
}

export const dynamic = 'force-static';
export const revalidate = 3600;
