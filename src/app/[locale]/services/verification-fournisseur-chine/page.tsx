/**
 * Supplier verification — simple page (owner 2026-11-24): title, one line, four
 * steps on the flow line, one action. Targets Chinese suppliers; no buying
 * platform names. Steps only state checks the site already promises.
 */

import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import { generatePageMetadata, generateBreadcrumbSchema, generateOrganizationSchema } from '@/config/seo-advanced';
import { StructuredData } from '@/components/seo';
import { StepsServicePage } from '@/features/services/StepsServicePage';

interface Props {
  params: Promise<{ locale: string }>;
}

const PATH = '/services/verification-fournisseur-chine';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'verificationPage' });
  return generatePageMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    keywords: t('title'),
    path: PATH,
    locale: locale as Locale,
  });
}

export default async function SupplierVerificationPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'verificationPage' });

  const schemas = [
    generateOrganizationSchema(),
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: t('title'),
      serviceType: 'Supplier Verification Service',
      provider: { '@id': 'https://www.chinalinkexpress.com/#organization' },
      areaServed: [
        { '@type': 'Country', name: 'Mali' },
        { '@type': 'Country', name: 'Uganda' },
        { '@type': 'Country', name: 'China' },
      ],
      description: t('metaDescription'),
    },
    generateBreadcrumbSchema([
      { name: 'ChinaLink Express', url: `/${locale}/` },
      { name: 'Services', url: `/${locale}/services` },
      { name: t('title'), url: `/${locale}${PATH}` },
    ], locale as Locale),
  ];

  return (
    <>
      <StructuredData schemas={schemas} />
      <StepsServicePage ns="verificationPage" steps={['send', 'company', 'goods', 'decide']} cta="verification-whatsapp" />
    </>
  );
}

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }, { locale: 'zh' }, { locale: 'ar' }];
}

export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = 3600;
