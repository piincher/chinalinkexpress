/**
 * /[locale]/verifier — check the code printed under a ChinaLink photo.
 *
 * The path is printed on every watermarked photo ("chinalinkexpress.com/
 * verifier", which the locale middleware sends to /fr/verifier), so it must
 * never move.
 *
 * The form page is indexable; a result is not a page of its own (the code only
 * rides in the query string and the canonical drops it). The lookup itself runs
 * in the browser — see lib/photoVerifyApi for why.
 */

import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale, i18nConfig } from '@/i18n/config';
import { generatePageMetadata } from '@/config/seo-advanced';
import { normalizePhotoCode } from '@/lib/photoVerifyApi';
import { PhotoVerifyView } from '@/features/photoVerify/PhotoVerifyView';

interface PhotoVerifyPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ code?: string | string[] }>;
}

export async function generateMetadata({ params }: PhotoVerifyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';
  return generatePageMetadata({
    title: isEn
      ? 'Verify a photo | ChinaLink Express'
      : isZh ? '验证照片 | ChinaLink Express' : isAr ? 'التحقق من صورة | ChinaLink Express' : 'Vérifier une photo | ChinaLink Express',
    description: isEn
      ? 'Enter the code printed under a ChinaLink Express photo to check that it is genuine and unaltered.'
      : isZh ? '输入 ChinaLink Express 照片下方印的代码，验证照片是否真实且未被修改。' : isAr ? 'أدخل الرمز المطبوع أسفل صورة ChinaLink Express للتحقق من أنها أصلية ولم تُعدَّل.' : 'Saisissez le code imprimé sous une photo ChinaLink Express pour vérifier qu’elle est authentique et non modifiée.',
    keywords: isEn ? 'verify photo, ChinaLink Express, authenticity' : isZh ? '验证照片, ChinaLink Express, 真实性' : isAr ? 'التحقق من الصورة، ChinaLink Express، الأصالة' : 'vérifier photo, ChinaLink Express, authenticité',
    path: '/verifier',
    locale: locale as Locale,
  });
}

export default async function PhotoVerifyPage({ params, searchParams }: PhotoVerifyPageProps) {
  const { locale } = await params;
  const { code } = await searchParams;

  const validLocale = i18nConfig.locales.includes(locale as Locale) ? locale : i18nConfig.defaultLocale;
  setRequestLocale(validLocale);

  // Only a well-formed code is handed to the client; anything else is dropped.
  const initialCode = normalizePhotoCode(Array.isArray(code) ? code[0] : code);

  return <PhotoVerifyView initialCode={initialCode} />;
}
