import assert from 'node:assert/strict';
import { test } from 'node:test';
import { estimatePrice, getEstimateRate } from '../src/features/pricing/lib/estimate';

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

test('sea applies the 0.1 CBM minimum', () => {
  assert.equal(estimatePrice('sea', 2), 600000);
  assert.equal(estimatePrice('sea', 0.05), 30000);
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
