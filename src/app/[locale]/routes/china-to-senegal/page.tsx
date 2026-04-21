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
    title: 'Expédition Chine Sénégal | Fret vers Dakar',
    description: 'Fret aérien et maritime de la Chine vers le Sénégal. Routes vers Dakar, sourcing, paiement fournisseur, consolidation et devis ChinaLink Express.',
    keywords: 'fret Chine Sénégal, expédition Chine Dakar, transitaire Chine Sénégal, cargo Chine Dakar',
    path: '/routes/china-to-senegal',
    locale: locale as Locale,
  });
}

export default async function ChinaToSenegalRoute({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumbs = [
    { name: 'Accueil', url: `/${locale}/` },
    { name: 'Routes', url: `/${locale}/routes/china-to-senegal` },
    { name: 'Chine vers Sénégal', url: `/${locale}/routes/china-to-senegal` },
  ];

  return (
    <>
      <RouteStructuredData
        route={{ origin: 'China', destination: 'Senegal', durationDays: { min: 12, max: 60 }, methods: ['air', 'sea'] }}
        method="air"
        locale={locale as Locale}
        breadcrumbs={breadcrumbs}
      />
      <RoutePage locale={locale} routeKey="china-to-senegal" country="Sénégal" capital="Dakar" />
    </>
  );
}

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }, { locale: 'zh' }, { locale: 'ar' }];
}

export const dynamic = 'force-static';
export const revalidate = 3600;
