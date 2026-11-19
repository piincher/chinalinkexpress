import assert from 'node:assert/strict';
import { test } from 'node:test';
import { estimatePrice, getEstimateRate } from '../src/features/pricing/lib/estimate';
import { calculateSeaFreight } from '../src/features/pricing/lib/pricingEngine';
import { parseBackendPricing } from '../src/features/pricing/lib/livePricing';

test('air bills kilos rounded up to 0.1 kg', () => {
  assert.equal(estimatePrice('standard', 10), 105000);
  assert.equal(estimatePrice('standard', 1.21), 13650);
  assert.equal(estimatePrice('express', 5), 80000);
  assert.equal(estimatePrice('electronics', 2), 24000);
});

test('phones bill per whole piece', () => {
  assert.equal(estimatePrice('phones', 3), 36000);
  assert.equal(estimatePrice('phones', 2.5), 36000);
});

test('sea bills the volume with the 0.1 CBM minimum', () => {
  assert.equal(estimatePrice('sea', 2), 620000);
  assert.equal(estimatePrice('sea', 0.05), 31000);
});

test('sea calculator bills max(0.1, volume, weight / 200)', () => {
  const light = calculateSeaFreight({ length: 1, width: 1, height: 1, weight: 150 });
  assert.equal(light.totalPrice, 310000);
  assert.equal(light.highDensity, false);
  const heavy = calculateSeaFreight({ length: 1, width: 1, height: 1, weight: 300 });
  assert.equal(heavy.adjustedCBM, 1.5);
  assert.equal(heavy.totalPrice, 465000);
  assert.equal(heavy.highDensity, true);
  // Tiny parcels: the minimum covers up to 20 kg, and is not "high density".
  const tiny = calculateSeaFreight({ length: 0.5, width: 0.5, height: 0.2, weight: 15 });
  assert.equal(tiny.totalPrice, 31000);
  assert.equal(tiny.highDensity, false);
  assert.equal(calculateSeaFreight({ length: 0.5, width: 0.5, height: 0.2, weight: 30 }).totalPrice, 46500);
});

test('live prices from the backend replace the fallbacks', () => {
  const live = parseBackendPricing({
    sea: { ratePerCbm: 330000, kgPerCbm: 250, minCbm: 0.2 },
    air: [
      { code: 'NORMAL', rate: 11000 },
      { code: 'SENSITIVE', rate: 12500 },
      { code: 'PHONE', rate: 13000 },
    ],
  });
  assert.ok(live);
  assert.equal(estimatePrice('sea', 0.1, live), 66000);
  assert.equal(estimatePrice('standard', 10, live), 110000);
  assert.equal(estimatePrice('phones', 2, live), 26000);
  assert.equal(calculateSeaFreight({ length: 1, width: 1, height: 1, weight: 500 }, live.sea).totalPrice, 660000);
});

test('a partial or broken backend payload is ignored as a whole', () => {
  assert.equal(parseBackendPricing(null), null);
  assert.equal(parseBackendPricing({ sea: { ratePerCbm: 330000, kgPerCbm: 250, minCbm: 0.2 }, air: [] }), null);
  assert.equal(
    parseBackendPricing({
      sea: { ratePerCbm: 'x', kgPerCbm: 250, minCbm: 0.2 },
      air: [{ code: 'NORMAL', rate: 1 }, { code: 'SENSITIVE', rate: 1 }, { code: 'PHONE', rate: 1 }],
    }),
    null,
  );
});

test('nothing to ship costs nothing', () => {
  assert.equal(estimatePrice('standard', 0), 0);
  assert.equal(estimatePrice('sea', 0), 0);
  assert.equal(estimatePrice('standard', -3), 0);
  assert.equal(estimatePrice('standard', Number.NaN), 0);
});

test('transit ranges come from the published tables', () => {
  assert.equal(getEstimateRate('standard').days, '14-21');
  assert.equal(getEstimateRate('express').days, '2-5');
  assert.equal(getEstimateRate('sea').days, '60-75');
});
