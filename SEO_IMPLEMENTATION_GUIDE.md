# ChinaLink Express - Technical SEO Implementation Guide

> Complete SEO strategy for dominating China-Mali logistics keywords

## Table of Contents

1. [Core Web Vitals Optimization](#1-core-web-vitals-optimization)
2. [Next.js App Router Optimization](#2-nextjs-app-router-optimization)
3. [Internationalization (i18n) Strategy](#3-internationalization-i18n-strategy)
4. [Structured Data Implementation](#4-structured-data-implementation)
5. [Content Architecture](#5-content-architecture)
6. [Performance Optimization](#6-performance-optimization)
7. [Monitoring & Analytics](#7-monitoring--analytics)

---

## 1. Core Web Vitals Optimization

### 1.1 Targets

| Metric | Target | Current Status |
|--------|--------|----------------|
| LCP (Largest Contentful Paint) | < 2.5s | Monitor with Vercel Analytics |
| INP (Interaction to Next Paint) | < 200ms | Monitor with Vercel Analytics |
| CLS (Cumulative Layout Shift) | < 0.1 | Monitor with Vercel Analytics |
| FCP (First Contentful Paint) | < 1.8s | Monitor with Vercel Analytics |
| TTFB (Time to First Byte) | < 800ms | Monitor with Vercel Analytics |
| FID (First Input Delay) | < 100ms | Deprecated, replaced by INP |

### 1.2 LCP Optimization Strategies

```typescript
// src/lib/performance.ts

// 1. Image Optimization - Critical for LCP
export const IMAGE_SIZES = {
  hero: {
    width: 1200,
    height: 630,
    sizes: '(max-width: 768px) 100vw, 50vw',
    priority: true,  // Add loading="eager" to hero images
    quality: 85,
  },
};

// 2. Font Optimization - Prevent invisible text
import { Geist } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',  // Critical: Use swap for FOUT instead of FOIT
  preload: true,
});
```

**Implementation Checklist:**

- [ ] Hero images use `priority` prop for eager loading
- [ ] Fonts use `display: 'swap'` to prevent invisible text
- [ ] Preconnect to CDN in `<head>`
- [ ] Preload critical CSS above the fold
- [ ] Use `next/image` with proper `sizes` attribute
- [ ] Implement responsive images with srcset

### 1.3 INP (Interaction to Next Paint) Optimization

```typescript
// src/lib/performance.ts

// Debounce expensive operations
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

// Throttle scroll/resize handlers
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
```

**Implementation Checklist:**

- [ ] Use `useCallback` for event handlers
- [ ] Debounce search inputs (>300ms)
- [ ] Throttle scroll handlers to 16ms (60fps)
- [ ] Lazy load heavy components below the fold
- [ ] Use CSS transforms instead of layout properties
- [ ] Implement `content-visibility: auto` for off-screen content

### 1.4 CLS (Cumulative Layout Shift) Prevention

```tsx
// Always specify image dimensions
<Image
  src="/hero.jpg"
  width={1200}
  height={630}
  alt="Hero"
  priority
/>

// Use aspect-ratio for responsive containers
<div className="aspect-video relative">
  <Image
    src="/dynamic-image.jpg"
    fill
    className="object-cover"
    alt="Dynamic"
  />
</div>

// Reserve space for dynamic content
<div className="min-h-[200px]">
  {isLoading ? <Skeleton /> : <Content />}
</div>
```

**Implementation Checklist:**

- [ ] All images have explicit width/height
- [ ] Ads/embeds have reserved space
- [ ] Dynamic content has min-height containers
- [ ] Web fonts use `font-display: swap`
- [ ] Avoid inserting content above existing content
- [ ] Use CSS aspect-ratio for media containers

---

## 2. Next.js App Router Optimization

### 2.1 Server Components Strategy

```tsx
// app/[locale]/page.tsx - Server Component (default)
// ✅ Benefits: Zero JS bundle, direct DB access, better SEO

import { getTranslations } from 'next-intl/server';

// Runs on server - no client JS overhead
export default async function HomePage({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'home' });
  
  return (
    <main>
      <h1>{t('title')}</h1>
      {/* Server-rendered, instant hydration */}
    </main>
  );
}
```

**Server vs Client Component Decision Tree:**

| Use Case | Component Type | Reason |
|----------|---------------|--------|
| Static content, SEO-critical | Server | Zero JS, better crawlability |
| Data fetching from API/DB | Server | Direct access, no client waterfall |
| Form handling | Client | Need state and event handlers |
| Animations | Client | Need DOM access |
| Intersection Observer | Client | Browser API |
| Heavy calculations | Server | Faster, no client CPU usage |

**Implementation Checklist:**

- [ ] 80%+ of components are Server Components
- [ ] Only use 'use client' when necessary
- [ ] Keep Client Components small and leaf-level
- [ ] Use Server Actions for form submissions
- [ ] Implement streaming with `loading.tsx`

### 2.2 Route Segment Configuration

```tsx
// app/[locale]/services/air-freight/page.tsx

// Static generation for better performance
export const dynamic = 'force-static';

// ISR - revalidate every hour
export const revalidate = 3600;

// Generate all locale variants at build time
export function generateStaticParams() {
  return ['fr', 'en', 'zh', 'ar'].map((locale) => ({ locale }));
}

// Optimize fetch caching
export const fetchCache = 'force-cache';

// Segment config for specific behavior
export const runtime = 'nodejs'; // or 'edge' for edge runtime
```

**Route Segment Config Options:**

| Option | Values | Use Case |
|--------|--------|----------|
| `dynamic` | `auto`, `force-dynamic`, `force-static`, `error` | Control rendering behavior |
| `revalidate` | `false`, `0`, `number` | ISR cache duration |
| `fetchCache` | `auto`, `default-cache`, `only-cache`, `force-cache` | Fetch caching |
| `runtime` | `nodejs`, `edge` | Execution environment |
| `preferredRegion` | `home`, `edge` | Deployment region |

### 2.3 Loading & Error States

```tsx
// app/[locale]/services/loading.tsx
export default function Loading() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-5/6" />
    </div>
  );
}

// app/[locale]/services/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="text-center py-12">
      <h2>Something went wrong</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}

// app/[locale]/services/not-found.tsx
export default function NotFound() {
  return (
    <div className="text-center py-12">
      <h2>Page Not Found</h2>
      <p>Could not find requested resource</p>
    </div>
  );
}
```

---

## 3. Internationalization (i18n) Strategy

### 3.1 URL Structure

```
✅ Recommended: Subdirectory structure
https://www.chinalinkexpress.com/fr/        (French - default)
https://www.chinalinkexpress.com/en/        (English)
https://www.chinalinkexpress.com/zh/        (Chinese)
https://www.chinalinkexpress.com/ar/        (Arabic)

✅ Service pages
https://www.chinalinkexpress.com/fr/services/air-freight/
https://www.chinalinkexpress.com/en/services/air-freight/

✅ Route pages
https://www.chinalinkexpress.com/fr/routes/china-to-mali/
https://www.chinalinkexpress.com/en/routes/china-to-mali/
```

**Why Subdirectories:**
- Better for SEO (domain authority consolidates)
- Easier to implement
- Better analytics tracking
- Easier hreflang management

### 3.2 Hreflang Implementation

```tsx
// lib/metadata.ts

export function generateHreflangAlternates(
  path: string = ''
): AlternateURLs['languages'] {
  const alternates: AlternateURLs['languages'] = {};
  
  // Generate for all locales
  i18nConfig.locales.forEach(locale => {
    const seoLocale = getSeoLocale(locale);
    alternates[seoLocale] = `/${locale}${path}`;
  });
  
  // x-default points to French (primary market)
  alternates['x-default'] = `/fr${path}`;
  
  return alternates;
}

// Usage in metadata
export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    alternates: {
      canonical: `/${params.locale}/services/air-freight/`,
      languages: generateHreflangAlternates('/services/air-freight'),
    },
  };
}
```

**Hreflang Tags in HTML:**

```html
<head>
  <!-- Canonical and Alternates -->
  <link rel="canonical" href="https://www.chinalinkexpress.com/fr/services/air-freight/" />
  <link rel="alternate" hreflang="fr-FR" href="https://www.chinalinkexpress.com/fr/services/air-freight/" />
  <link rel="alternate" hreflang="en-US" href="https://www.chinalinkexpress.com/en/services/air-freight/" />
  <link rel="alternate" hreflang="zh-CN" href="https://www.chinalinkexpress.com/zh/services/air-freight/" />
  <link rel="alternate" hreflang="ar-SA" href="https://www.chinalinkexpress.com/ar/services/air-freight/" />
  <link rel="alternate" hreflang="x-default" href="https://www.chinalinkexpress.com/fr/services/air-freight/" />
</head>
```

### 3.3 Content Localization Strategy

```typescript
// i18n/locales/fr/common.json
{
  "metadata": {
    "title": "ChinaLink Express | Fret Maritime & Aérien Chine-Afrique",
    "description": "Transitaire de référence de la Chine vers l'Afrique...",
    "keywords": "fret maritime, fret aérien, expédition Chine..."
  },
  "home": {
    "hero": {
      "title": "Votre Pont Entre la Chine et l'Afrique",
      "subtitle": "Fret aérien et maritime vers le Mali, Sénégal, Côte d'Ivoire"
    }
  }
}

// i18n/locales/en/common.json
{
  "metadata": {
    "title": "ChinaLink Express | Freight Forwarding China to Africa",
    "description": "Leading freight forwarder from China to Africa...",
    "keywords": "freight forwarding, shipping from China, logistics..."
  }
}
```

---

## 4. Structured Data Implementation

### 4.1 Schema Types by Page

| Page Type | Primary Schema | Secondary Schemas |
|-----------|---------------|-------------------|
| Home | Organization, LocalBusiness | WebSite, FAQPage |
| Service | Service | Offer, BreadcrumbList |
| Route | ShippingDeliveryTime | Service, BreadcrumbList |
| About | AboutPage | Organization |
| Contact | ContactPage | LocalBusiness |
| FAQ | FAQPage | WebPage |

### 4.2 Complete Example: Service Page

```tsx
// app/[locale]/services/air-freight/page.tsx

import { generateServiceSchema, generateBreadcrumbSchema } from '@/config/seo-advanced';

export default async function AirFreightPage({ params }) {
  const isEn = params.locale === 'en';
  
  // Service schema with offers
  const serviceSchema = generateServiceSchema('air', params.locale);
  
  // Breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: isEn ? 'Home' : 'Accueil', url: `/${params.locale}/` },
    { name: isEn ? 'Services' : 'Services', url: `/${params.locale}/services/` },
    { name: isEn ? 'Air Freight' : 'Fret Aérien', url: `/${params.locale}/services/air-freight/` },
  ], params.locale);

  return (
    <>
      {/* Combined structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [serviceSchema, breadcrumbSchema],
          }),
        }}
      />
      
      <AirFreightContent locale={params.locale} />
    </>
  );
}
```

### 4.3 ShippingDeliveryTime Schema

```typescript
// Logistics-specific schema for route pages

export function generateShippingDeliveryTimeSchema(
  route: { origin: string; destination: string },
  method: 'air' | 'sea'
) {
  const duration = method === 'air' 
    ? { min: 14, max: 21, unit: 'day' }
    : { min: 60, max: 75, unit: 'day' };
    
  return {
    '@context': 'https://schema.org',
    '@type': 'ShippingDeliveryTime',
    handlingTime: {
      '@type': 'QuantitativeValue',
      minValue: 1,
      maxValue: 3,
      unitCode: 'DAY',
    },
    transitTime: {
      '@type': 'QuantitativeValue',
      minValue: duration.min,
      maxValue: duration.max,
      unitCode: 'DAY',
    },
    shippingDestination: {
      '@type': 'DefinedRegion',
      addressCountry: route.destination,
    },
    shippingOrigin: {
      '@type': 'DefinedRegion',
      addressCountry: route.origin,
    },
  };
}
```

### 4.4 Review & Rating Schema

```typescript
// For testimonials section

export function generateReviewSchema(reviews: Array<{
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
}>) {
  const aggregateRating = {
    '@type': 'AggregateRating',
    ratingValue: (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1),
    reviewCount: reviews.length,
    bestRating: 5,
    worstRating: 1,
  };
  
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'ChinaLink Express',
    aggregateRating,
    review: reviews.map(review => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: review.author },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5,
      },
      reviewBody: review.reviewBody,
      datePublished: review.datePublished,
    })),
  };
}
```

---

## 5. Content Architecture

### 5.1 URL Structure Hierarchy

```
/                           (Home)
├── /fr/                    (French Home)
│   ├── /services/          (Services Hub)
│   │   ├── /air-freight/   (Air Freight)
│   │   ├── /sea-freight/   (Sea Freight)
│   │   └── /sourcing/      (Sourcing)
│   ├── /routes/            (Routes Hub)
│   │   ├── /china-to-mali/
│   │   ├── /china-to-senegal/
│   │   └── /china-to-ivory-coast/
│   ├── /tarifs/            (Pricing)
│   ├── /calculateur/       (Calculator)
│   └── /contact/           (Contact)
└── /en/                    (English Home)
    └── ... (same structure)
```

### 5.2 Internal Linking Strategy

```tsx
// Navigation component with proper internal linking

<nav>
  {/* Main navigation - links from every page */}
  <Link href={`/${locale}/services/air-freight/`}>
    {t('nav.airFreight')}
  </Link>
  <Link href={`/${locale}/services/sea-freight/`}>
    {t('nav.seaFreight')}
  </Link>
  
  {/* Contextual links within content */}
  <p>
    Looking for faster delivery? Check out our{' '}
    <Link href={`/${locale}/services/air-freight/`}>
      air freight services
    </Link>
    {' '}for delivery in 14-21 days.
  </p>
</nav>
```

**Internal Linking Best Practices:**
- [ ] Every page links to main service pages
- [ ] Related services link to each other
- [ ] Blog posts link to relevant service pages
- [ ] Breadcrumbs on all pages except home
- [ ] Footer links to all main sections
- [ ] Use descriptive anchor text with keywords

### 5.3 Content Silos

```
Silo 1: Services
├── Air Freight (pillar)
│   ├── Express Air Freight
│   ├── Standard Air Freight
│   └── Air Freight to [Country]
├── Sea Freight (pillar)
│   ├── FCL Container
│   ├── LCL Consolidation
│   └── Sea Freight to [Country]
└── Sourcing (pillar)
    ├── Alibaba Sourcing
    ├── 1688 Procurement
    └── Quality Inspection

Silo 2: Routes
├── China to Mali
├── China to Senegal
└── China to Ivory Coast

Silo 3: Resources
├── Shipping Calculator
├── Pricing Guide
├── FAQ
└── Blog
```

---

## 6. Performance Optimization

### 6.1 Bundle Size Reduction

```typescript
// next.config.ts

const nextConfig = {
  // Tree-shake unused code
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'gsap',
      '@react-three/drei',
      'lucide-react',  // Only imports used icons
    ],
  },
  
  // Transpile specific packages
  transpilePackages: [
    'three',
    '@react-three/fiber',
    'next-intl',
  ],
};
```

### 6.2 Code Splitting

```tsx
// Lazy load heavy components
import dynamic from 'next/dynamic';

// Heavy animation component - only load on desktop
const HeroAnimation = dynamic(
  () => import('@/features/hero-animation').then(mod => mod.HeroAnimation),
  {
    ssr: false,  // Don't server-render
    loading: () => <StaticHeroPlaceholder />,
  }
);

// Calculator component - load on demand
const PriceCalculator = dynamic(
  () => import('@/features/pricing').then(mod => mod.PriceCalculator),
  {
    loading: () => <CalculatorSkeleton />,
  }
);
```

### 6.3 Prefetching Strategy

```tsx
// Prefetch on hover/touchstart for instant navigation
import Link from 'next/link';

<Link 
  href="/services/air-freight" 
  prefetch={true}  // Prefetch on viewport entry
>
  Air Freight
</Link>

// Programmatic prefetching
import { useRouter } from 'next/navigation';

function Navigation() {
  const router = useRouter();
  
  const handleHover = () => {
    router.prefetch('/contact');
  };
  
  return <a onMouseEnter={handleHover}>Contact Us</a>;
}
```

### 6.4 Edge Runtime Usage

```tsx
// Route handler for API - use Edge for low latency
export const runtime = 'edge';

export async function GET(request: Request) {
  // Runs at edge locations worldwide
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  
  return Response.json({ results: [] });
}
```

---

## 7. Monitoring & Analytics

### 7.1 Core Web Vitals Reporting

```typescript
// lib/vitals.ts

export function reportWebVitals(metric: {
  id: string;
  name: string;
  startTime: number;
  value: number;
  label: 'web-vital' | 'custom';
}) {
  // Send to Vercel Analytics (already installed)
  // Also send to Google Analytics 4
  if (typeof window !== 'undefined' && 'gtag' in window) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }
}
```

### 7.2 SEO Monitoring Checklist

**Weekly:**
- [ ] Check Google Search Console for crawl errors
- [ ] Monitor Core Web Vitals in PageSpeed Insights
- [ ] Check hreflang validity in GSC
- [ ] Review sitemap coverage

**Monthly:**
- [ ] Analyze ranking changes for target keywords
- [ ] Review structured data errors in GSC
- [ ] Check mobile usability issues
- [ ] Monitor backlink profile

**Quarterly:**
- [ ] Comprehensive technical SEO audit
- [ ] Content freshness review
- [ ] Competitor analysis
- [ ] Strategy adjustment

### 7.3 Key Performance Indicators (KPIs)

| Metric | Target | Tool |
|--------|--------|------|
| Organic Traffic | +20% MoM | Google Analytics |
| Keyword Rankings | Top 3 for 10 primary keywords | Ahrefs/SEMrush |
| Click-Through Rate | >5% for branded terms | Google Search Console |
| Bounce Rate | <40% | Google Analytics |
| Conversion Rate | >2% | Google Analytics |
| Page Speed Score | >90 | PageSpeed Insights |
| Core Web Vitals | All "Good" | Search Console |

---

## Appendix A: SEO Audit Checklist

### Technical SEO

- [ ] Robots.txt configured correctly
- [ ] Sitemap.xml submitted to Google/Bing
- [ ] HTTPS enabled sitewide
- [ ] Mobile-first indexing ready
- [ ] Page speed optimized (90+)
- [ ] Structured data validated
- [ ] Canonical URLs implemented
- [ ] Hreflang tags correct
- [ ] 404 pages customized
- [ ] Redirects implemented

### Content SEO

- [ ] Title tags optimized (50-60 chars)
- [ ] Meta descriptions unique (150-160 chars)
- [ ] H1 tags unique per page
- [ ] Header hierarchy logical
- [ ] Images have alt text
- [ ] Internal links contextual
- [ ] Content is unique and valuable
- [ ] Keywords in first 100 words

### Local SEO

- [ ] Google Business Profile claimed
- [ ] NAP consistency across web
- [ ] Local citations built
- [ ] Reviews managed
- [ ] Local keywords targeted

---

## Appendix B: Emergency SEO Fixes

### If Traffic Drops Suddenly

1. Check Google Search Console for manual actions
2. Verify robots.txt not blocking important pages
3. Check for noindex tags accidentally added
4. Verify canonical URLs correct
5. Check for broken structured data
6. Review recent code deployments

### If Rankings Drop

1. Check for algorithm updates
2. Analyze competitor changes
3. Review backlink profile for lost links
4. Check page speed degradation
5. Verify content freshness

---

*Last Updated: February 2026*
*Next Review: March 2026*
