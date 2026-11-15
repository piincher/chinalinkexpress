/**
 * /[locale]/suivi — "Suivre mon colis": parcel code + last 4 phone digits.
 * The lookup runs in the browser (see lib/parcelTrackApi).
 */

import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale, i18nConfig } from '@/i18n/config';
import { generatePageMetadata } from '@/config/seo-advanced';
import { ParcelTrackView } from '@/features/parcelTrack/ParcelTrackView';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';
  return generatePageMetadata({
    title: isEn ? 'Track my parcel' : isZh ? '查询我的包裹' : isAr ? 'تتبّع طردي' : 'Suivre mon colis',
    description: isEn
      ? 'Enter your parcel code and the last 4 digits of your phone number to see where your goods are between China and Bamako or Kampala.'
      : isZh ? '输入包裹编号和手机号码后 4 位，查看您的货物在中国到巴马科或坎帕拉途中的位置。' : isAr ? 'أدخل رمز الطرد وآخر 4 أرقام من هاتفك لمعرفة مكان بضاعتك بين الصين وباماكو أو كمبالا.' : 'Saisissez le code de votre colis et les 4 derniers chiffres de votre téléphone pour voir où en est votre marchandise entre la Chine et Bamako ou Kampala.',
    keywords: isEn ? 'track parcel, ChinaLink Express, China Mali tracking' : isZh ? '包裹查询, ChinaLink Express, 中国马里货物跟踪' : isAr ? 'تتبع الطرد، ChinaLink Express، تتبع الشحن الصين مالي' : 'suivi colis, ChinaLink Express, suivi colis Chine Mali',
    path: '/suivi',
    locale: locale as Locale,
  });
}

export default async function ParcelTrackPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(i18nConfig.locales.includes(locale as Locale) ? locale : i18nConfig.defaultLocale);
  return <ParcelTrackView />;
}
