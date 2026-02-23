/**
 * Structured Data Component
 * 
 * Injects JSON-LD structured data for SEO.
 * Includes Organization, LocalBusiness, Service, and FAQ schemas.
 */

import { STRUCTURED_DATA } from '@/config/seo';

interface FAQItem {
  question: string;
  answer: string;
}

interface StructuredDataProps {
  type?: 'organization' | 'localBusiness' | 'service' | 'faq' | 'all';
  faqs?: FAQItem[];
}

export function StructuredData({ type = 'all', faqs }: StructuredDataProps) {
  const data: Record<string, unknown>[] = [];

  if (type === 'all' || type === 'organization') {
    data.push(STRUCTURED_DATA.organization);
  }

  if (type === 'all' || type === 'localBusiness') {
    data.push(STRUCTURED_DATA.localBusiness);
  }

  if (type === 'all' || type === 'service') {
    data.push(STRUCTURED_DATA.service);
  }

  if ((type === 'all' || type === 'faq') && faqs && faqs.length > 0) {
    data.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
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

export default StructuredData;
