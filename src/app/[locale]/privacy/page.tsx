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
    title: locale === 'en' ? 'Privacy Policy' : 'Politique de Confidentialité',
    description:
      locale === 'en'
        ? 'How ChinaLink Express protects customer data for sourcing, supplier payment, and freight services.'
        : 'Comment ChinaLink Express protège les données clients pour le sourcing, le paiement fournisseur et le fret Chine-Mali.',
    alternates: {
      canonical: `/${locale}/privacy`,
      languages: {
        'fr-FR': '/fr/privacy',
        'en-US': '/en/privacy',
        'zh-CN': '/zh/privacy',
        'ar-SA': '/ar/privacy',
        'x-default': '/fr/privacy',
      },
    },
  };
}

export default function PrivacyRoute() {
  return <PrivacyPolicyPage />;
}
