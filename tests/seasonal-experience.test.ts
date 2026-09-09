import assert from 'node:assert/strict';
import { test } from 'node:test';
import { getSeasonalExperience } from '../src/lib/seasonalExperienceApi';

test('uses the public gradient contract and keeps color pairs together', async () => {
  const previous = globalThis.fetch;
  globalThis.fetch = async () => new Response(JSON.stringify({ data: {
    enabled: true, nextRefreshAt: new Date(Date.now() + 60000).toISOString(),
    primaryCampaign: { theme: {
      accentColor: '#0B7A3B', accentOnColor: '#FFFFFF',
      appSkin: { light: { primary: '#FFFFFF' }, dark: { primary: '#111111' } },
      heroGradient: ['#0B7A3B', '#C8A415'],
    } },
  } }));
  try {
    const result = await getSeasonalExperience();
    assert.equal(result?.skin?.accent, '#0B7A3B');
    assert.equal(result?.skin?.accentOn, '#FFFFFF');
    assert.equal(result?.skin?.darkAccent, null);
    assert.deepEqual(result?.gradient, { start: '#0B7A3B', end: '#C8A415' });
  } finally { globalThis.fetch = previous; }
});

test('does not render expired responses from the server fetch cache', async () => {
  const previous = globalThis.fetch;
  globalThis.fetch = async () => new Response(JSON.stringify({ data: {
    enabled: true, nextRefreshAt: new Date(Date.now() - 1).toISOString(),
    primaryCampaign: { theme: { accentColor: '#0B7A3B', accentOnColor: '#FFFFFF' } },
  } }));
  try { assert.equal(await getSeasonalExperience(), null); }
  finally { globalThis.fetch = previous; }
});
