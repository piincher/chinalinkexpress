/**
 * Sourcing & Procurement Service Page
 *
 * China sourcing, minimal and platform-free (owner 2026-11-24).
 */

import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from '@/i18n/config';
import { generateServiceMetadata } from '@/lib/metadata';
import { ServiceStructuredData } from '@/components/seo';
import { StepsServicePage } from '@/features/services/StepsServicePage';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generateServiceMetadata(locale as Locale, 'sourcing');
}

export default async function Sourcing({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';
  const breadcrumbs = [
    { name: isEn ? 'Home' : isZh ? '首页' : isAr ? 'الرئيسية' : 'Accueil', url: `/${locale}/` },
    { name: isEn ? 'Services' : 'Services', url: `/${locale}/services` },
    { name: isEn ? 'China Sourcing' : isZh ? '中国采购' : isAr ? 'التوريد من الصين' : 'Sourcing Chine', url: `/${locale}/services/sourcing` },
  ];

  return (
    <>
      <ServiceStructuredData
        serviceType="sourcing"
        locale={locale as Locale}
        breadcrumbs={breadcrumbs}
      />
      <StepsServicePage ns="sourcingPage" steps={['find', 'check', 'pay', 'ship']} cta="sourcing-whatsapp" />
    </>
  );
}

export function generateStaticParams() {
  return [
    { locale: 'fr' },
    { locale: 'en' },
    { locale: 'zh' },
    { locale: 'ar' },
  ];
}

export const dynamic = 'force-static';
export const revalidate = 3600;
