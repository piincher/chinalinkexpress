/**
 * SeasonalAtmosphere — server-side gate for the hero decoration.
 *
 * Reads the seasonal payload (deduped with SeasonalStyleOverride's fetch by
 * Next's request cache) and mounts the client canvas band only when the live
 * campaign actually asks for an effect. No campaign, no effect, or
 * `decorations.enabled: false` → renders nothing and the hero is exactly the
 * one the site ships today.
 */

import React from 'react';
import { getSeasonalExperience } from '@/lib/seasonalExperienceApi';
import { SeasonalAtmosphereBand } from './SeasonalAtmosphereBand';

export async function SeasonalAtmosphere() {
  const seasonal = await getSeasonalExperience();
  if (!seasonal || seasonal.effect === 'NONE') return null;

  return (
    <SeasonalAtmosphereBand
      effect={seasonal.effect}
      density={seasonal.density}
      accent={seasonal.accent}
    />
  );
}

export default SeasonalAtmosphere;
