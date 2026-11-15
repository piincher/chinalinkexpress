import assert from 'node:assert/strict';
import { test } from 'node:test';
import { estimatePrice, getEstimateRate } from '../src/features/pricing/lib/estimate';
import { calculateSeaFreight } from '../src/features/pricing/lib/pricingEngine';

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

test('sea bills the real volume, no minimum (as the backend does)', () => {
  assert.equal(estimatePrice('sea', 2), 600000);
  assert.equal(estimatePrice('sea', 0.05), 15000);
});

test('sea calculator bills max(volume, weight / 1000)', () => {
  const light = calculateSeaFreight({ length: 1, width: 1, height: 1, weight: 400 });
  assert.equal(light.totalPrice, 300000);
  assert.equal(light.highDensity, false);
  const heavy = calculateSeaFreight({ length: 1, width: 1, height: 1, weight: 2000 });
  assert.equal(heavy.adjustedCBM, 2);
  assert.equal(heavy.totalPrice, 600000);
  assert.equal(heavy.highDensity, true);
  assert.equal(calculateSeaFreight({ length: 0.5, width: 0.5, height: 0.2, weight: 5 }).totalPrice, 15000);
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
