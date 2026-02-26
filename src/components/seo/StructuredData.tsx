/**
 * Structured Data Component
 * 
 * Advanced JSON-LD structured data injection for SEO.
 * Supports multiple schema types with proper @graph composition.
 * 
 * @example
 * // Basic usage
 * <StructuredData type="organization" />
 * 
 * // Service page
 * <StructuredData 
 *   type="service" 
 *   serviceType="air"
 *   locale="fr" 
 * />
 * 
 * // Combined schemas
 * <StructuredData 
 *   schemas={[
 *     generateOrganizationSchema(),
 *     generateLocalBusinessSchema(),
 *     generateBreadcrumbSchema([...])
 *   ]} 
 * />
 */

import {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateServiceSchema,
  generateBreadcrumbSchema,
  generateFAQPageSchema,
  generateReviewSchema,
  generateWebsiteSchema,
  generateShippingDeliveryTimeSchema,
} from '@/config/seo-advanced';
import type { Locale } from '@/i18n/config';

// ============================================================================
// Types
// ============================================================================

export type StructuredDataType = 
  | 'organization' 
  | 'localBusiness' 
  | 'service' 
  | 'faq' 
  | 'breadcrumb'
  | 'review'
  | 'website'
  | 'shipping'
  | 'custom';

interface FAQItem {
  question: string;
  answer: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface ReviewItem {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
}

interface ShippingRoute {
  origin: string;
  destination: string;
  durationDays: { min: number; max: number };
  methods: ('air' | 'sea')[];
}

interface StructuredDataProps {
  /** Predefined schema type */
  type?: StructuredDataType;
  /** Custom schema objects */
  schemas?: Record<string, unknown>[];
  /** Locale for localized content */
  locale?: Locale;
  /** Service type for service schema */
  serviceType?: 'air' | 'sea' | 'sourcing';
  /** Breadcrumb items */
  breadcrumbs?: BreadcrumbItem[];
  /** FAQ items */
  faqs?: FAQItem[];
  /** Review items */
  reviews?: ReviewItem[];
  /** Shipping route for delivery time schema */
  shippingRoute?: ShippingRoute;
  /** Shipping method for delivery time */
  shippingMethod?: 'air' | 'sea';
}

// ============================================================================
// Component
// ============================================================================

export function StructuredData({
  type = 'custom',
  schemas,
  locale = 'fr',
  serviceType = 'air',
  breadcrumbs,
  faqs,
  reviews,
  shippingRoute,
  shippingMethod = 'air',
}: StructuredDataProps) {
  // If custom schemas provided, use those
  if (schemas && schemas.length > 0) {
    const data = schemas.length === 1 
      ? schemas[0]
      : {
          '@context': 'https://schema.org',
          '@graph': schemas,
        };
    
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    );
  }

  // Generate schemas based on type
  const data: Record<string, unknown>[] = [];

  switch (type) {
    case 'organization':
      data.push(generateOrganizationSchema());
      break;

    case 'localBusiness':
      data.push(generateLocalBusinessSchema());
      break;

    case 'service':
      data.push(generateServiceSchema(serviceType, locale));
      break;

    case 'breadcrumb':
      if (breadcrumbs && breadcrumbs.length > 0) {
        data.push(generateBreadcrumbSchema(breadcrumbs, locale));
      }
      break;

    case 'faq':
      if (faqs && faqs.length > 0) {
        data.push(generateFAQPageSchema(faqs, locale));
      }
      break;

    case 'review':
      if (reviews && reviews.length > 0) {
        data.push(generateReviewSchema(reviews));
      }
      break;

    case 'website':
      data.push(generateWebsiteSchema(locale));
      break;

    case 'shipping':
      if (shippingRoute) {
        data.push(generateShippingDeliveryTimeSchema(shippingRoute, shippingMethod));
      }
      break;

    default:
      // Return nothing for undefined custom types
      return null;
  }

  if (data.length === 0) {
    return null;
  }

  return (
    <>
      {data.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}

// ============================================================================
// Preset Components for Common Use Cases
// ============================================================================

/**
 * Complete homepage structured data
 * Includes Organization, LocalBusiness, and Website schemas
 */
export function HomeStructuredData({ locale = 'fr' }: { locale?: Locale }) {
  const schemas = [
    generateOrganizationSchema(),
    generateLocalBusinessSchema(),
    generateWebsiteSchema(locale),
  ];

  return <StructuredData schemas={schemas} />;
}

/**
 * Service page structured data
 * Includes Service schema and breadcrumbs
 */
export function ServiceStructuredData({
  serviceType,
  locale = 'fr',
  breadcrumbs,
}: {
  serviceType: 'air' | 'sea' | 'sourcing';
  locale?: Locale;
  breadcrumbs: BreadcrumbItem[];
}) {
  const schemas = [
    generateServiceSchema(serviceType, locale),
    generateBreadcrumbSchema(breadcrumbs, locale),
  ];

  return <StructuredData schemas={schemas} />;
}

/**
 * Route page structured data
 * Includes ShippingDeliveryTime and breadcrumbs
 */
export function RouteStructuredData({
  route,
  method,
  locale = 'fr',
  breadcrumbs,
}: {
  route: ShippingRoute;
  method: 'air' | 'sea';
  locale?: Locale;
  breadcrumbs: BreadcrumbItem[];
}) {
  const schemas = [
    generateShippingDeliveryTimeSchema(route, method),
    generateBreadcrumbSchema(breadcrumbs, locale),
  ];

  return <StructuredData schemas={schemas} />;
}

/**
 * FAQ page structured data
 */
export function FAQStructuredData({
  faqs,
  locale = 'fr',
}: {
  faqs: FAQItem[];
  locale?: Locale;
}) {
  return <StructuredData type="faq" faqs={faqs} locale={locale} />;
}

/**
 * Review/Rating structured data
 */
export function ReviewStructuredData({ reviews }: { reviews: ReviewItem[] }) {
  return <StructuredData type="review" reviews={reviews} />;
}

export default StructuredData;
