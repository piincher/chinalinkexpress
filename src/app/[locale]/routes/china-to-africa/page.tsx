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
    title: 'Shipping from China to Africa | Fret Chine Afrique',
    description: 'Routes Chine-Afrique pour le Mali, Sénégal et Côte d’Ivoire. Fret aérien, fret maritime, sourcing, paiement fournisseur et consolidation.',
    keywords: 'shipping from China to Africa, fret Chine Afrique, transitaire Chine Afrique, fret Chine Afrique de l’Ouest',
    path: '/routes/china-to-africa',
    locale: locale as Locale,
  });
}

export default async function ChinaToAfricaRoute({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const breadcrumbs = [
    { name: 'Accueil', url: `/${locale}/` },
    { name: 'Routes', url: `/${locale}/routes/china-to-africa` },
    { name: 'Chine vers Afrique', url: `/${locale}/routes/china-to-africa` },
  ];

  return (
    <>
      <RouteStructuredData
        route={{ origin: 'China', destination: 'West Africa', durationDays: { min: 12, max: 75 }, methods: ['air', 'sea'] }}
        method="air"
        locale={locale as Locale}
        breadcrumbs={breadcrumbs}
      />
      <RoutePage locale={locale} routeKey="china-to-africa" country="Afrique de l’Ouest" capital="Bamako, Dakar, Abidjan" />
    </>
  );
}

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }, { locale: 'zh' }, { locale: 'ar' }];
}

export const dynamic = 'force-static';
export const revalidate = 3600;
