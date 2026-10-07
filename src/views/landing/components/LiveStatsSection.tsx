/**
 * Server half of the stats band: reads the live figures, hands them to the
 * (client, animated) StatsSection. Same split as TestimonialsBand.
 * `fetchCompanyStats` never throws — on an API failure it returns the last
 * hand-verified figures with their own date.
 */

import { fetchCompanyStats } from '@/lib/publicStatsApi';
import { StatsSection } from './StatsSection';

export async function LiveStatsSection() {
  const stats = await fetchCompanyStats();
  return <StatsSection stats={stats} />;
}
