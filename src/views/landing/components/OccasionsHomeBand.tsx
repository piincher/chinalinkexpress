/**
 * Server wrapper around OccasionsBand.
 *
 * Same arrangement as TestimonialsBand: the landing page is a server component
 * and the band is a client one, so the fetch happens here and the deadlines
 * ship inside the HTML. That matters for a section whose whole job is to be
 * read by someone deciding whether they still have time — and by a crawler
 * indexing "quand expedier pour la rentree".
 *
 * `fetchPublicOccasions` never throws and returns an empty list out of season,
 * and the band renders nothing on an empty list, so the home page simply does
 * not carry the section rather than carrying an empty one.
 */

import React from 'react';
import { fetchPublicOccasions } from '@/lib/publicOccasionsApi';
import { OccasionsBand } from '@/features/occasions/OccasionsBand';

export async function OccasionsHomeBand() {
  const occasions = await fetchPublicOccasions(6);

  return <OccasionsBand occasions={occasions} max={3} />;
}

export default OccasionsHomeBand;
