/**
 * Communauté / Community Page Route
 *
 * Dedicated page for the ChinaLink Community Hub — a WhatsApp-integrated space
 * where importers share tips, discuss products, and make connections.
 * URL: /fr/communaute, /en/communaute
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { Locale, i18nConfig } from '@/i18n/config';
import { generatePageMetadata, generateBreadcrumbSchema, generateOrganizationSchema } from '@/config/seo-advanced';
import { StructuredData } from '@/components/seo';
import { CommunityPage } from '@/features/community/CommunityPage';

interface CommunityPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: CommunityPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';

  return generatePageMetadata({
    title: isEn
      ? 'WhatsApp group for China–Africa importers'
      : isZh ? '中非进口商 WhatsApp 群' : isAr ? 'مجموعة WhatsApp لمستوردي الصين وأفريقيا' : 'Groupe WhatsApp des importateurs Chine–Afrique',
    description: isEn
      ? 'The ChinaLink Express WhatsApp group for importers in West and East Africa: sourcing tips, scam alerts and container sharing. Free to join.'
      : isZh ? 'ChinaLink Express 面向西非和东非进口商的 WhatsApp 群：采购建议、诈骗提醒和拼柜信息。免费加入。' : isAr ? 'مجموعة WhatsApp من ChinaLink Express للمستوردين في غرب أفريقيا وشرقها: نصائح التوريد وتنبيهات الاحتيال ومشاركة الحاويات. الانضمام مجاني.' : 'Le groupe WhatsApp ChinaLink Express pour les importateurs d’Afrique de l’Ouest et de l’Est : conseils sourcing, alertes arnaques et partage de conteneurs. Gratuit.',
    keywords: isEn
      ? 'importers community west africa, china sourcing community, cargo discussion group mali, african importers forum, china import group, whatsapp group import chine, communauté importateurs afrique, groupe whatsapp import chine, alibaba community africa, 1688 discussion group, container sharing mali, bamako importers network, west africa trade community, chinese supplier reviews africa, import tips africa'
      : isZh ? '非洲进口商社区, 中国进口 WhatsApp 群, 马里进口商论坛, 中国采购社区, 非洲 Alibaba 采购群, 巴马科拼柜, 中国供应商诈骗提醒, 中国非洲进口建议, 货代社区, 中国马里货运讨论, 巴马科进口商网络, 中国供应商评价, 中国非洲团购, 中国马里进口指南' : isAr ? 'مجتمع المستوردين في أفريقيا، مجموعة WhatsApp للاستيراد من الصين، منتدى المستوردين في مالي، مجتمع التوريد من الصين، مجموعة شراء Alibaba في أفريقيا، مشاركة حاوية إلى باماكو، تنبيه احتيال الموردين الصينيين، نصائح الاستيراد من الصين إلى أفريقيا، مجتمع وكلاء الشحن، نقاش الشحن من الصين إلى مالي، شبكة مستوردي باماكو، آراء الموردين الصينيين، الشراء الجماعي من الصين، دليل الاستيراد من الصين إلى مالي' : 'communaute importateurs afrique, groupe whatsapp import chine, forum importateurs mali, communauté sourcing chine, groupe achat alibaba afrique, partage conteneur bamako, alerte arnaque fournisseur chine, conseils importation chine afrique, transitaire communauté, cargo chine mali discussion, importateurs bamako réseau, avis fournisseurs chine afrique, achat groupé chine afrique, guide importation chine mali',
    path: '/communaute',
    locale: locale as Locale,
    ogType: 'website',
  });
}

export default async function CommunautePage({
  params,
}: CommunityPageProps) {
  const { locale } = await params;

  // Validate and set locale
  const validLocale = i18nConfig.locales.includes(locale as Locale)
    ? locale
    : i18nConfig.defaultLocale;

  setRequestLocale(validLocale);

  const isEn = validLocale === 'en';
  const isZh = validLocale === 'zh';
  const isAr = validLocale === 'ar';

  // Breadcrumb schema
  const breadcrumbs = [
    { name: isEn ? 'Home' : isZh ? '首页' : isAr ? 'الرئيسية' : 'Accueil', url: `/${validLocale}/` },
    { name: isEn ? 'Community' : isZh ? '社区' : isAr ? 'المجتمع' : 'Communauté', url: `/${validLocale}/communaute/` },
  ];

  const schemas = [
    generateOrganizationSchema(),
    generateBreadcrumbSchema(breadcrumbs, validLocale as Locale),
  ];

  return (
    <>
      <StructuredData schemas={schemas} />
      <CommunityPage />
      {/* Moderation link */}
      <div className="bg-slate-950 border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-500 text-sm">
            {isEn
              ? 'Need to report an issue or contact a moderator?'
              : isZh ? '要报告问题或联系版主？' : isAr ? 'هل تريد الإبلاغ عن مشكلة أو التواصل مع مشرف؟' : 'Un problème à signaler ou besoin de contacter un modérateur ?'}{' '}
            <Link
              href={`/${validLocale}/contact`}
              className="text-amber-400 hover:text-amber-300 underline underline-offset-4 transition-colors"
            >
              {isEn ? 'Contact us' : isZh ? '联系我们' : isAr ? 'تواصل معنا' : 'Contactez-nous'}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export function generateStaticParams() {
  return ['fr', 'en', 'zh', 'ar'].map((locale) => ({ locale }));
}

export const dynamic = 'force-static';
