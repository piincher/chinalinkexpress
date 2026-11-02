import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { isDecimalInput, parseDecimalInput } from '../src/lib/decimalInput';
import {
  calculateAirFreight,
  calculateSeaFreight,
} from '../src/features/pricing/lib/pricingEngine';

describe('calculator decimal input', () => {
  it('accepts comma and dot decimals, including values below one', () => {
    for (const [input, expected] of [
      ['1,25', 1.25], ['1.25', 1.25], ['0,5', 0.5], ['0.5', 0.5],
      [',5', 0.5], ['.5', 0.5], ['12,', 12], ['12.', 12], ['0', 0],
    ] as const) {
      assert.equal(isDecimalInput(input), true, input);
      assert.equal(parseDecimalInput(input), expected, input);
    }
  });

  it('allows clearing and entering a separator without treating them as numbers', () => {
    for (const input of ['', ',', '.']) {
      assert.equal(isDecimalInput(input), true, input);
      assert.equal(Number.isNaN(parseDecimalInput(input)), true, input);
    }
  });

  it('rejects mixed separators and malformed values instead of parsing a prefix', () => {
    for (const input of [
      '1,234.5', '1.234,5', '1,2,3', '1.2.3', '1 234,5', '1\u202f234,5',
      '1,25kg', ' 1,25', '1,25 ', '-1,25', '+1.25', '1e3', 'Infinity', 'NaN',
    ]) {
      assert.equal(isDecimalInput(input), false, input);
      assert.equal(Number.isNaN(parseDecimalInput(input)), true, input);
    }
    assert.equal(Number.isNaN(parseDecimalInput('9'.repeat(400))), true);
  });

  it('calculates the same CBM and sea price with comma or dot dimensions', () => {
    const calculate = (values: string[]) => calculateSeaFreight({
      length: parseDecimalInput(values[0]),
      width: parseDecimalInput(values[1]),
      height: parseDecimalInput(values[2]),
      weight: parseDecimalInput(values[3]),
    });
    const result = calculate(['1,25', '0,8', '0,5', '10,5']);
    assert.equal(result.originalCBM, 0.5);
    assert.equal(result.adjustedCBM, 0.5);
    assert.deepEqual(result, calculate(['1.25', '0.8', '0.5', '10.5']));
  });

  it('keeps decimal air weights and volumetric dimensions accurate', () => {
    const calculate = (values: string[]) => calculateAirFreight({
      weight: parseDecimalInput(values[0]),
      length: parseDecimalInput(values[1]),
      width: parseDecimalInput(values[2]),
      height: parseDecimalInput(values[3]),
      category: 'standard',
    });
    const result = calculate(['0,5', '100,5', '80,5', '60,5']);
    assert.equal(result.actualWeight, 0.5);
    assert.equal(result.volumetricWeight, 97.89);
    assert.deepEqual(result, calculate(['0.5', '100.5', '80.5', '60.5']));
  });

  it('preserves centimetre-to-metre conversion used for deadline sea estimates', () => {
    const result = calculateSeaFreight({
      length: parseDecimalInput('125,0') / 100,
      width: parseDecimalInput('80,0') / 100,
      height: parseDecimalInput('50,0') / 100,
      weight: parseDecimalInput('10,5'),
    });
    assert.equal(result.originalCBM, 0.5);
  });
});
