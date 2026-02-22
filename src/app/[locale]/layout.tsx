/**
 * Locale-Aware Root Layout
 * 
 * Root layout that handles RTL/LTR direction and locale-specific settings.
 * Includes shared navigation and footer components on all pages.
 * Features SSR-safe theme initialization via cookie.
 */

import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { Geist, Geist_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { i18nConfig, type Locale, getLocaleDirection, getSeoLocale } from '@/i18n/config';
import { SharedNavbar, SharedFooter } from '@/components/layout';
import { ThemeProvider, ThemeInitScript } from '@/components/theme';
import type { Theme, ResolvedTheme } from '@/store/useThemeStore';
import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

/**
 * Get the resolved theme from cookie on server
 */
async function getServerTheme(): Promise<{ theme: Theme; resolvedTheme: ResolvedTheme }> {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get('theme')?.value;
  
  let theme: Theme = 'system';
  
  if (themeCookie && ['light', 'dark', 'system'].includes(themeCookie)) {
    theme = themeCookie as Theme;
  }
  
  // Resolve system theme (default to light on server)
  let resolvedTheme: ResolvedTheme = 'light';
  if (theme === 'dark') {
    resolvedTheme = 'dark';
  } else if (theme === 'light') {
    resolvedTheme = 'light';
  }
  // For 'system', we default to 'light' on server to avoid flash
  // Client will correct this immediately after hydration
  
  return { theme, resolvedTheme };
}

/**
 * Generate static params for all locales
 */
export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

/**
 * Generate metadata for each locale
 */
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  const validLocale = i18nConfig.locales.includes(locale as Locale) 
    ? locale 
    : i18nConfig.defaultLocale;
  
  // Load messages directly for metadata
  const messages = (await import(`@/i18n/locales/${validLocale}/common.json`)).default;
  const seoLocale = getSeoLocale(validLocale as Locale);
  
  return {
    title: messages.metadata?.title || 'ChinaLink Express',
    description: messages.metadata?.description || '',
    keywords: messages.metadata?.keywords || '',
    metadataBase: new URL('https://www.chinalinkexpress.com'),
    alternates: {
      canonical: `/${validLocale}/`,
      languages: {
        'fr-FR': '/fr/',
        'en-US': '/en/',
        'zh-CN': '/zh/',
        'ar-SA': '/ar/',
      },
    },
    openGraph: {
      title: messages.metadata?.title || 'ChinaLink Express',
      description: messages.metadata?.description || '',
      url: `https://www.chinalinkexpress.com/${validLocale}/`,
      siteName: 'ChinaLink Express',
      images: [
        {
          url: 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/logo.png',
          width: 1200,
          height: 630,
          alt: 'ChinaLink Express',
        },
      ],
      locale: seoLocale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.metadata?.title || 'ChinaLink Express',
      description: messages.metadata?.description || '',
      images: ['https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/logo.png'],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * Locale layout component
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Validate locale
  const validLocale = i18nConfig.locales.includes(locale as Locale) 
    ? locale 
    : i18nConfig.defaultLocale;

  // Set locale for static generation
  setRequestLocale(validLocale);

  // Get text direction
  const direction = getLocaleDirection(validLocale as Locale);

  // Load messages directly for the validated locale
  const messages = (await import(`@/i18n/locales/${validLocale}/common.json`)).default;

  // Get theme from cookie for SSR
  const { resolvedTheme } = await getServerTheme();

  return (
    <html 
      lang={validLocale} 
      dir={direction}
      className={resolvedTheme === 'dark' ? 'dark' : ''}
      data-theme={resolvedTheme}
    >
      <head>
        <ThemeInitScript />
        <link rel="preconnect" href="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com" />
        <link rel="alternate" hrefLang="fr-FR" href="https://www.chinalinkexpress.com/fr/" />
        <link rel="alternate" hrefLang="en-US" href="https://www.chinalinkexpress.com/en/" />
        <link rel="alternate" hrefLang="zh-CN" href="https://www.chinalinkexpress.com/zh/" />
        <link rel="alternate" hrefLang="ar-SA" href="https://www.chinalinkexpress.com/ar/" />
        <link rel="alternate" hrefLang="x-default" href="https://www.chinalinkexpress.com/fr/" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider>
          <NextIntlClientProvider locale={validLocale} messages={messages}>
            <SharedNavbar locale={validLocale as Locale} />
            <div className="flex-grow">
              {children}
            </div>
            <SharedFooter locale={validLocale as Locale} />
          </NextIntlClientProvider>
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
