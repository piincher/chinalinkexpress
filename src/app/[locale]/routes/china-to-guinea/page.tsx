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
    title: 'Cargo Chine Guinée | Fret Aérien & Maritime vers Conakry',
    description: 'Fret aérien et maritime de la Chine vers la Guinée. Routes vers Conakry, sourcing, paiement fournisseur, consolidation et devis ChinaLink Express.',
    keywords: 'cargo chine guinee, fret chine conakry, transitaire chine guinee, expédition chine conakry',
    path: '/routes/china-to-guinea',
    locale: locale as Locale,
  });
}

export default async function ChinaToGuineaRoute({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumbs = [
    { name: 'Accueil', url: `/${locale}/` },
    { name: 'Routes', url: `/${locale}/routes/china-to-guinea` },
    { name: 'Chine vers Guinée', url: `/${locale}/routes/china-to-guinea` },
  ];

  return (
    <>
      <RouteStructuredData
        route={{ origin: 'China', destination: 'Guinea', durationDays: { min: 12, max: 60 }, methods: ['air', 'sea'] }}
        method="air"
        locale={locale as Locale}
        breadcrumbs={breadcrumbs}
      />
      <RoutePage locale={locale} routeKey="china-to-guinea" country="Guinée" capital="Conakry" />
    </>
  );
}

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }, { locale: 'zh' }, { locale: 'ar' }];
}

export const dynamic = 'force-static';
export const revalidate = 3600;
