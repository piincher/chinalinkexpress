/**
 * Terms & Conditions Page (Conditions Générales)
 * 
 * Comprehensive legal page covering shipping terms, pricing, CBM calculations,
 * prohibited items, and user responsibilities.
 * 
 * Supports: French (primary), English, Chinese, Arabic
 */

import type { Metadata } from 'next';
import { TermsContent } from '@/components/terms/TermsContent';

interface Props {
  params: Promise<{ locale: string }>;
}

const metadataByLocale: Record<string, Metadata> = {
  fr: {
    title: 'Conditions Générales | ChinaLink Express',
    description: 'Conditions générales de vente et transport. Règles CBM, poids volumétrique, articles interdits, responsabilités client. Contact: +86 188 5172 5957',
    keywords: 'conditions générales, CGV, fret maritime, fret aérien, calcul CBM, articles interdits, responsabilités, assurance transport',
  },
  en: {
    title: 'Terms & Conditions | ChinaLink Express',
    description: 'Terms and conditions of sale and transport. CBM rules, volumetric weight, prohibited items, customer responsibilities. Contact: +86 188 5172 5957',
    keywords: 'terms and conditions, sea freight, air freight, CBM calculation, prohibited items, responsibilities, shipping insurance',
  },
  zh: {
    title: '条款和条件 | ChinaLink Express',
    description: '销售和运输条款。CBM规则、体积重量、禁运物品、客户责任。联系方式：+86 188 5172 5957',
    keywords: '条款和条件, 海运, 空运, CBM计算, 禁运物品, 责任, 运输保险',
  },
  ar: {
    title: 'الشروط والأحكام | ChinaLink Express',
    description: 'شروط وأحكام البيع والنقل. قواعد CBM، الوزن الحجمي، العناصر المحظورة، مسؤوليات العميل. اتصل: +86 188 5172 5957',
    keywords: 'الشروط والأحكام, الشحن البحري, الشحن الجوي, حساب CBM, العناصر المحظورة, المسؤوليات, تأمين النقل',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = metadataByLocale[locale] || metadataByLocale.fr;
  
  return {
    ...meta,
    alternates: {
      canonical: `/${locale}/terms/`,
      languages: {
        'fr-FR': '/fr/terms/',
        'en-US': '/en/terms/',
        'zh-CN': '/zh/terms/',
        'ar-SA': '/ar/terms/',
      },
    },
    openGraph: {
      title: meta.title || '',
      description: meta.description || '',
      type: 'website',
      locale: locale === 'fr' ? 'fr_FR' : locale === 'en' ? 'en_US' : locale === 'zh' ? 'zh_CN' : 'ar_SA',
    },
  };
}

export default function TermsPage() {
  return <TermsContent />;
}
