/**
 * Standalone Quiz Page
 * 
 * Dedicated page for the Import Readiness Quiz.
 * URL: /fr/quiz, /en/quiz, etc.
 */

import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Locale, i18nConfig } from '@/i18n/config';
import { QuizSection } from '@/views/landing/components/QuizSection';

interface QuizPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: QuizPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const isZh = locale === 'zh';
  const isAr = locale === 'ar';
  
  return {
    title: isEn 
      ? 'Import Readiness Quiz'
      : isZh ? '进口测验' : isAr ? 'اختبار الاستيراد' : 'Quiz Importation',
    description: isEn
      ? 'Take our 2-minute quiz to assess your import readiness and get a personalized guide on WhatsApp.'
      : isZh ? '完成我们 2 分钟的测验，评估您的准备情况，并在 WhatsApp 上收到个性化指南。' : isAr ? 'أجب عن اختبارنا في دقيقتين لتقييم استعدادك واستلام دليل مخصص عبر WhatsApp.' : 'Faites notre quiz de 2 minutes pour évaluer votre readiness et recevoir un guide personnalisé sur WhatsApp.',
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { locale } = await params;
  
  // Validate and set locale
  const validLocale = i18nConfig.locales.includes(locale as Locale) 
    ? locale 
    : i18nConfig.defaultLocale;
  
  setRequestLocale(validLocale);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 pt-20">
      <QuizSection />
    </div>
  );
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}
