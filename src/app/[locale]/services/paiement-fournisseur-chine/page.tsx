/**
 * Supplier payment — simple page (owner 2026-11-24): title, one line, four
 * steps on the flow line, one action. No buying or payment platform names.
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

const PATH = '/services/paiement-fournisseur-chine';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'paymentPage' });
  return generatePageMetadata({
    title: t('metaTitle'),
    description: t('metaDescription'),
    keywords: t('title'),
    path: PATH,
    locale: locale as Locale,
  });
}

export default async function SupplierPaymentPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'paymentPage' });

  const schemas = [
    generateOrganizationSchema(),
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: t('title'),
      serviceType: 'Supplier Payment Service',
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
      <StepsServicePage ns="paymentPage" steps={['quote', 'payUs', 'wePay', 'proof']} cta="payment-whatsapp" />
    </>
  );
}

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }, { locale: 'zh' }, { locale: 'ar' }];
}

export const dynamic = 'force-static';
export const dynamicParams = false;
export const revalidate = 3600;
