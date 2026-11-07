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
import { GoogleAnalytics } from '@/components/seo';
import { ThemeProvider, ThemeInitScript } from '@/components/theme';
import { PWAProvider, InstallPrompt, UpdateNotification, OfflineIndicator } from '@/components/pwa';
import { PromoModalProvider } from '@/features/promoCampaigns';
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
  const isZh = validLocale === 'zh';
  const isAr = validLocale === 'ar';
  
  // Comprehensive SEO keywords by locale
  const keywords = isEn 
    ? 'freight forwarding, shipping from China, logistics company, international shipping, sea freight, air freight, freight forwarder, China Mali shipping, shipping from China to Mali, freight forwarding China to Bamako, Alibaba shipping agent, China procurement services, door to door shipping China Mali, container shipping China Mali, FCL shipping, LCL consolidation, air cargo China to Mali, express shipping China Mali, shipping China Bamako, freight forwarder China Mali, import China Mali, customs clearance Mali, sourcing agent Mali'
    : isZh ? '海运, 空运, 中国发货, 货代, 国际物流, 国际运输, 运输代理, 中国马里货运, 中国马里寄包裹, 中国巴马科货运, 中国供应商采购, 中国采购代理, 中国供应商付款, 马里清关, 中国马里门到门, 中国马里集装箱, FCL 整箱, LCL 拼箱, 中国马里空运, 中国马里快递, 中国巴马科发货, 巴马科货代, 中国马里进口, 马里采购' : isAr ? 'الشحن البحري، الشحن الجوي، الشحن من الصين، وكيل شحن، الخدمات اللوجستية الدولية، النقل الدولي، وكيل نقل، الشحن من الصين إلى مالي، إرسال طرد من الصين إلى مالي، الشحن من الصين إلى باماكو، الشراء من مورد صيني، وكيل توريد في الصين، الدفع لمورد صيني، التخليص الجمركي في مالي، التسليم من الباب إلى الباب من الصين إلى مالي، حاوية من الصين إلى مالي، حاوية كاملة FCL، شحن مجمّع LCL، الشحن الجوي من الصين إلى مالي، الشحن السريع من الصين إلى مالي، وكيل شحن في باماكو، الاستيراد من الصين إلى مالي، التوريد إلى مالي' : 'fret maritime, fret aérien, expédition Chine, transitaire, logistique internationale, transport international, commissionnaire transport, fret Chine Mali, expédition colis Chine Mali, fret Chine Bamako, achat fournisseur Chine, agent sourcing Chine, paiement fournisseur chinois, dédouanement Mali, livraison porte à porte Chine Mali, conteneur Chine Mali, conteneur complet FCL, groupage maritime LCL, cargo aérien Chine Mali, express Chine Mali, expédition Chine Bamako, transitaire Bamako, import Chine Mali, sourcing Mali';
  
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
    icons: {
      icon: '/images/chinalink-logo-square.png',
      shortcut: '/images/chinalink-logo-square.png',
      apple: '/images/chinalink-logo-square.png',
    },
    metadataBase: new URL('https://www.chinalinkexpress.com'),
    alternates: {
      // No trailing slash: next.config.ts sets `trailingSlash: false`, so `/fr/`
      // 308-redirects to `/fr`. A canonical (or hreflang) pointing at a redirect
      // is discarded by Google, which then picks its own — reported in Search
      // Console as "Duplicate, Google chose different canonical than user".
      canonical: `/${validLocale}`,
      languages: {
        'fr': '/fr',
        'en': '/en',
        'zh': '/zh',
        'ar': '/ar',
        'x-default': '/fr',
      },
    },
    openGraph: {
      title: messages.metadata?.title || 'ChinaLink Express',
      description: messages.metadata?.description || '',
      url: `https://www.chinalinkexpress.com/${validLocale}`,
      siteName: 'ChinaLink Express',
      images: [
        {
          url: 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/warehouse%20view.jpg',
          width: 1200,
          height: 630,
          alt: isEn ? 'ChinaLink Express - Freight Forwarding China to Africa' : isZh ? 'ChinaLink Express - 中国非洲货运' : isAr ? 'ChinaLink Express - الشحن من الصين إلى أفريقيا' : 'ChinaLink Express - Fret Chine Afrique',
        },
      ],
      locale: seoLocale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.metadata?.title || 'ChinaLink Express',
      description: messages.metadata?.description || '',
      images: ['https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/warehouse%20view.jpg'],
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
    <>
      {/* The <html> tag lives in the locale-free root layout (share links and QR
          routes also use it), so language and direction are set here, before paint. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(validLocale)};document.documentElement.dir=${JSON.stringify(direction)};`,
        }}
      />

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
      <meta name="msapplication-TileColor" content="#0b1f4b" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      <meta name="theme-color" content="#0b1f4b" media="(prefers-color-scheme: light)" />
      <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />
      
      {/* PWA Icons */}
      <link rel="apple-touch-icon" sizes="72x72" href="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/logo.png" />
      <link rel="apple-touch-icon" sizes="96x96" href="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/logo.png" />
      <link rel="apple-touch-icon" sizes="128x128" href="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/logo.png" />
      <link rel="apple-touch-icon" sizes="144x144" href="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/logo.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/logo.png" />
      <link rel="apple-touch-icon" sizes="192x192" href="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/logo.png" />
      <link rel="apple-touch-icon" sizes="384x384" href="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/logo.png" />
      <link rel="apple-touch-icon" sizes="512x512" href="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/logo.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/logo.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/logo.png" />
      <link rel="mask-icon" href="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/logo.png" color="#0b1f4b" />
      
      <div className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider>
          <PWAProvider>
            <NextIntlClientProvider locale={validLocale} messages={messages}>
              <AnimationProvider>
                <SmoothScroll>
                  <PromoModalProvider>
                    <OfflineIndicator />
                    <UpdateNotification />
                    <SharedNavbar locale={validLocale as Locale} />
                    
                    <main className="flex-grow">
                      {children}
                    </main>
                    
                    <SharedFooter locale={validLocale as Locale} />
                    <InstallPrompt />
                  </PromoModalProvider>
                </SmoothScroll>
              </AnimationProvider>
            </NextIntlClientProvider>
          </PWAProvider>
        </ThemeProvider>
        
        {/* Analytics */}
        <SpeedInsights />
        <Analytics />
        <GoogleAnalytics />
      </div>
    </>
  );
}
