/**
 * Server wrapper around TestimonialsSection.
 *
 * The landing page is a server component and the section is a client one, so
 * the fetch happens here: the review text ships inside the HTML rather than
 * arriving after hydration. That matters for a page whose whole job is being
 * read by someone deciding whether to trust us, and by a crawler.
 *
 * `fetchPublicReviews` never throws and returns an empty payload when the API
 * is unreachable, so the band degrades to the three WhatsApp quotes it had
 * before rather than to an error.
 */

import React from 'react';
import { fetchPublicReviews } from '@/lib/publicReviewsApi';
import { TestimonialsSection } from './TestimonialsSection';

export async function TestimonialsBand() {
  const { reviews, stats } = await fetchPublicReviews();

  return <TestimonialsSection appReviews={reviews} stats={stats} />;
}

export default TestimonialsBand;
