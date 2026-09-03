/**
 * The site is read in four languages; the calendar API answers in French only.
 *
 * It sends `targetDateLabel` already formatted as "1 octobre 2026", a French
 * `name`, and French goods terms — so the English page read "Ship before 13
 * septembre 2026": chrome translated, content not, which is worse than either
 * on its own.
 */

import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  formatOccasionDate,
  localizeGoodsSuggestion,
  localizeLaneCutoff,
  localizeOccasionName,
  localizeTargetDate,
} from '../src/features/occasions/localizeOccasion';
import type { CustomerOccasion, OccasionLane } from '../src/lib/publicOccasionsApi';

const occasion = (overrides: Partial<CustomerOccasion> = {}): CustomerOccasion =>
  ({
    id: '1',
    key: 'rentree-scolaire-2026',
    name: 'Rentrée scolaire 2026',
    emoji: '🎒',
    targetDate: '2026-10-01T00:00:00.000Z',
    targetDateLabel: '1 octobre 2026',
    dateConfidence: 'confirmed',
    daysUntilTarget: 28,
    purchaseStartDate: null,
    purchaseStartLabel: null,
    goodsSuggestions: ['uniformes', 'cartables'],
    lanes: [],
    allDeadlinesPassed: false,
    priority: 'high',
    eventType: 'commercial_mali',
    ...overrides,
  }) as CustomerOccasion;

describe('occasion localization', () => {
  it('reformats the date from the ISO instant, not the French label', () => {
    assert.match(localizeTargetDate(occasion(), 'en') ?? '', /October/);
    assert.match(localizeTargetDate(occasion(), 'fr') ?? '', /octobre/);
  });

  it('keeps the calendar day fixed regardless of the reader’s timezone', () => {
    // Stamped at UTC midnight: formatted in a western zone without care, the
    // 1st of October becomes the 30th of September.
    assert.match(formatOccasionDate('2026-10-01T00:00:00.000Z', 'en') ?? '', /1 October 2026/);
  });

  it('translates a known occasion family and keeps its year', () => {
    assert.equal(localizeOccasionName(occasion(), 'en'), 'Back to school 2026');
    assert.equal(localizeOccasionName(occasion({ key: 'ramadan-2027' }), 'en'), 'Ramadan 2027');
  });

  it('falls back to the real French name for a family it does not know', () => {
    const unknown = occasion({ key: 'fete-du-coton-2027', name: 'Fête du coton 2027' });
    // Real content beats a slug or a blank.
    assert.equal(localizeOccasionName(unknown, 'en'), 'Fête du coton 2027');
  });

  it('leaves French untouched for French readers', () => {
    assert.equal(localizeOccasionName(occasion(), 'fr'), 'Rentrée scolaire 2026');
    assert.equal(localizeGoodsSuggestion('cartables', 'fr'), 'cartables');
  });

  it('translates the goods terms it knows and passes the rest through', () => {
    assert.equal(localizeGoodsSuggestion('cartables', 'en'), 'school bags');
    assert.equal(localizeGoodsSuggestion('boubous', 'en'), 'boubous');
  });

  it('falls back to the server label when the cutoff instant is unusable', () => {
    const lane = {
      mode: 'AIR',
      state: 'open',
      recommendedCutoff: 'not-a-date',
      recommendedCutoffLabel: '13 septembre 2026',
      daysRemaining: 10,
    } as OccasionLane;

    assert.equal(localizeLaneCutoff(lane, 'en'), '13 septembre 2026');
  });
});
