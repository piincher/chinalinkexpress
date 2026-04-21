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
    title: 'Cargo Chine Niger | Fret Aérien & Maritime vers Niamey',
    description: 'Fret aérien et maritime de la Chine vers le Niger. Routes vers Niamey, sourcing, paiement fournisseur, consolidation et devis ChinaLink Express.',
    keywords: 'cargo chine niger, fret chine niamey, transitaire chine niger, expédition chine niamey',
    path: '/routes/china-to-niger',
    locale: locale as Locale,
  });
}

export default async function ChinaToNigerRoute({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumbs = [
    { name: 'Accueil', url: `/${locale}/` },
    { name: 'Routes', url: `/${locale}/routes/china-to-niger` },
    { name: 'Chine vers Niger', url: `/${locale}/routes/china-to-niger` },
  ];

  return (
    <>
      <RouteStructuredData
        route={{ origin: 'China', destination: 'Niger', durationDays: { min: 14, max: 75 }, methods: ['air', 'sea'] }}
        method="air"
        locale={locale as Locale}
        breadcrumbs={breadcrumbs}
      />
      <RoutePage locale={locale} routeKey="china-to-niger" country="Niger" capital="Niamey" />
    </>
  );
}

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }, { locale: 'zh' }, { locale: 'ar' }];
}

export const dynamic = 'force-static';
export const revalidate = 3600;
