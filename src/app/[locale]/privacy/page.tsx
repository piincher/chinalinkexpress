/**
 * Privacy Policy Page Route
 * 
 * Displays privacy policy information.
 * @see src/features/legal/PrivacyPolicyPage.tsx
 */

import { PrivacyPolicyPage } from '@/features/legal';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: locale === 'en' ? 'Privacy Policy' : locale === 'zh' ? '隐私政策' : locale === 'ar' ? 'سياسة الخصوصية' : 'Politique de Confidentialité',
    description:
      locale === 'en'
        ? 'How ChinaLink Express protects customer data for sourcing, supplier payment, and freight services.'
        : locale === 'zh' ? 'ChinaLink Express 如何在采购、供应商付款和中国—马里货运中保护客户数据。' : locale === 'ar' ? 'كيف تحمي ChinaLink Express بيانات العملاء في التوريد والدفع للموردين والشحن من الصين إلى مالي.' : 'Comment ChinaLink Express protège les données clients pour le sourcing, le paiement fournisseur et le fret Chine-Mali.',
    alternates: {
      canonical: `/${locale}/privacy`,
      languages: {
        'fr': '/fr/privacy',
        'en': '/en/privacy',
        'zh': '/zh/privacy',
        'ar': '/ar/privacy',
        'x-default': '/fr/privacy',
      },
    },
  };
}

export default function PrivacyRoute() {
  return <PrivacyPolicyPage />;
}
