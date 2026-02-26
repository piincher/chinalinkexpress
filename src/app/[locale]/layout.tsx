/**
 * Locale-Aware Root Layout - SEO Optimized
 * 
 * Features:
 * - Dynamic metadata generation per locale
 * - Proper hreflang implementation
 * - Preconnect to critical domains
 * - Structured data injection
 * - SSR-safe theme handling
 * 
 * @see https://nextjs.org/docs/app/building-your-application/routing/internationalization
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
import { PWAProvider, InstallPrompt, UpdateNotification, OfflineIndicator } from '@/components/pwa';
import { SmoothScroll } from '@/components/smooth-scroll';
import { AnimationProvider } from '@/components/animation';
import type { Theme, ResolvedTheme } from '@/store/useThemeStore';
import '../globals.css';
import '@/styles/scroll-animations.css';

// Animation component styles
import '@/components/animations/SpotlightCard.css';
import '@/components/animations/GradientMesh.css';
import '@/components/animations/GridPattern.css';
import '@/components/animations/SpotlightBorder.css';
import '@/components/animations/GradientText.css';
import '@/components/animations/Marquee.css';

// ============================================================================
// Font Configuration
// ============================================================================

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap', // Prevent invisible text during font loading
  preload: true,
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: false, // Monospace is less critical
});

// ============================================================================
// Server-Side Theme Resolution
// ============================================================================

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

// ============================================================================
// Static Generation Configuration
// ============================================================================

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

// ============================================================================
// Metadata Generation
// ============================================================================

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
  const isEn = validLocale === 'en';
  
  // Comprehensive SEO keywords by locale
  const keywords = isEn 
    ? 'freight forwarding, shipping from China, logistics company, international shipping, sea freight, air freight, freight forwarder, China Africa shipping, shipping from China to Africa, China to West Africa shipping, freight forwarding China to Mali, shipping from China to Senegal, China to Ivory Coast freight, Alibaba shipping agent, 1688 sourcing agent, China procurement services, door to door shipping China, container shipping China Africa, FCL shipping, LCL consolidation, air cargo China to Africa, express shipping China Mali, shipping China Bamako, freight forwarder China Mali, China Dakar shipping, shipping China Abidjan, customs clearance Africa'
    : 'fret maritime, fret aérien, expédition Chine, transitaire, logistique internationale, transport international, commissionnaire transport, fret Chine Afrique, expédition colis Chine Afrique, fret Chine Mali, envoi marchandises Chine Sénégal, transport maritime Chine Côte d\'Ivoire, achat fournisseur Chine, agent sourcing Chine, paiement fournisseur chinois, dédouanement Mali, livraison porte à porte Chine, conteneur Chine Afrique, conteneur complet FCL, groupage maritime LCL, cargo aérien Chine Afrique, express Chine Mali, expédition Chine Bamako, transitaire Bamako, fret Chine Dakar, déclaration en douane';
  
  return {
    title: {
      template: '%s | ChinaLink Express',
      default: messages.metadata?.title || 'ChinaLink Express | Freight Forwarding China to Africa',
    },
    description: messages.metadata?.description || 'Leading freight forwarder from China to Africa. Air & sea shipping with competitive rates.',
    keywords: keywords,
    authors: [{ name: 'ChinaLink Express' }],
    creator: 'ChinaLink Express',
    publisher: 'ChinaLink Express',
    metadataBase: new URL('https://www.chinalinkexpress.com'),
    alternates: {
      canonical: `/${validLocale}/`,
      languages: {
        'fr-FR': '/fr/',
        'en-US': '/en/',
        'zh-CN': '/zh/',
        'ar-SA': '/ar/',
        'x-default': '/fr/',
      },
    },
    openGraph: {
      title: messages.metadata?.title || 'ChinaLink Express',
      description: messages.metadata?.description || '',
      url: `https://www.chinalinkexpress.com/${validLocale}/`,
      siteName: 'ChinaLink Express',
      images: [
        {
          url: 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/og-image.jpg',
          width: 1200,
          height: 630,
          alt: isEn ? 'ChinaLink Express - Freight Forwarding China to Africa' : 'ChinaLink Express - Fret Chine Afrique',
        },
      ],
      locale: seoLocale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.metadata?.title || 'ChinaLink Express',
      description: messages.metadata?.description || '',
      images: ['https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/og-image.jpg'],
      creator: '@chinalinkexpress',
      site: '@chinalinkexpress',
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
    },
    category: 'logistics',
    classification: 'Business & Industrial > Shipping & Logistics',
    other: {
      'geo.region': 'ML-BM',
      'geo.placename': 'Bamako',
      'geo.position': '12.6392;-8.0029',
      'ICBM': '12.6392, -8.0029',
    },
    appleWebApp: {
      capable: true,
      title: 'ChinaLink Express',
      statusBarStyle: 'default',
    },
    applicationName: 'ChinaLink Express',
    manifest: '/manifest.json',
  };
}

// ============================================================================
// Layout Component
// ============================================================================

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  
  // Validate locale
  const validLocale = i18nConfig.locales.includes(locale as Locale) 
    ? locale 
    : i18nConfig.defaultLocale;

  // Set locale for static generation
  setRequestLocale(validLocale);

  // Get text direction (LTR/RTL)
  const direction = getLocaleDirection(validLocale as Locale);

  // Load messages for this locale
  const messages = (await import(`@/i18n/locales/${validLocale}/common.json`)).default;

  // Get theme from cookie for SSR
  const { resolvedTheme } = await getServerTheme();

  return (
    <html 
      lang={validLocale} 
      dir={direction}
      className={resolvedTheme === 'dark' ? 'dark' : ''}
      data-theme={resolvedTheme}
      suppressHydrationWarning // Suppress mismatch warnings for theme
    >
      <head>
        {/* Theme Initialization Script - Prevents flash */}
        <ThemeInitScript />
        
        {/* Performance: Preconnect to Critical Domains */}
        <link rel="preconnect" href="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch for Third-Party Services */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* PWA Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ChinaLink" />
        <meta name="application-name" content="ChinaLink Express" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#2563eb" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />
        
        {/* PWA Icons */}
        <link rel="apple-touch-icon" sizes="72x72" href="/icons/icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="96x96" href="/icons/icon-96x96.png" />
        <link rel="apple-touch-icon" sizes="128x128" href="/icons/icon-128x128.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/icons/icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="384x384" href="/icons/icon-384x384.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/icons/icon-512x512.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16x16.png" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#2563eb" />
        
        {/* Hreflang Tags */}
        <link rel="alternate" hrefLang="fr-FR" href="https://www.chinalinkexpress.com/fr/" />
        <link rel="alternate" hrefLang="en-US" href="https://www.chinalinkexpress.com/en/" />
        <link rel="alternate" hrefLang="zh-CN" href="https://www.chinalinkexpress.com/zh/" />
        <link rel="alternate" hrefLang="ar-SA" href="https://www.chinalinkexpress.com/ar/" />
        <link rel="alternate" hrefLang="x-default" href="https://www.chinalinkexpress.com/fr/" />
      </head>
      
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider>
          <PWAProvider>
            <NextIntlClientProvider locale={validLocale} messages={messages}>
              <AnimationProvider>
                <SmoothScroll>
                  <OfflineIndicator />
                  <UpdateNotification />
                  <SharedNavbar locale={validLocale as Locale} />
                  
                  <main className="flex-grow">
                    {children}
                  </main>
                  
                  <SharedFooter locale={validLocale as Locale} />
                  <InstallPrompt />
                </SmoothScroll>
              </AnimationProvider>
            </NextIntlClientProvider>
          </PWAProvider>
        </ThemeProvider>
        
        {/* Analytics */}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
