import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  calculateScore,
  generateQuizResult,
  getLeadCategory,
  validateQuizAnswers,
} from '../src/features/import-quiz/lib/scoring';
import { generateDiagnostic } from '../src/features/import-quiz/lib/diagnostics';
import { validateQuizSubmissionPayload } from '../src/features/import-quiz/lib/validation';
import {
  generateWhatsAppLink,
  maskPhoneNumber,
  validateWhatsAppNumber,
} from '../src/features/import-quiz/lib/whatsapp';

describe('import quiz scoring', () => {
  it('categorizes scores at the configured thresholds', () => {
    assert.equal(getLeadCategory(0), 'cold');
    assert.equal(getLeadCategory(49), 'cold');
    assert.equal(getLeadCategory(50), 'warm');
    assert.equal(getLeadCategory(79), 'warm');
    assert.equal(getLeadCategory(80), 'hot');
    assert.equal(getLeadCategory(100), 'hot');
  });

  it('calculates and clamps total answer score', () => {
    const answers = {
      1: 'yes',
      2: '>5m',
      3: 'fashion',
      4: 'expert',
      5: '2weeks',
    };

    assert.equal(calculateScore(answers), 100);
  });

  it('generates a quiz result from warm lead answers', () => {
    const result = generateQuizResult({
      1: 'several',
      2: '500k-2m',
      3: 'beauty',
      4: 'first',
      5: '3months',
    });

    assert.deepEqual(result, {
      score: 58,
      category: 'warm',
      maxPossibleScore: 100,
      percentage: 58,
    });
  });
});

describe('import quiz answer validation', () => {
  it('accepts complete answer sets', () => {
    const result = validateQuizAnswers(
      {
        1: 'yes',
        2: '>5m',
        3: 'fashion',
        4: 'expert',
        5: '2weeks',
      },
      5
    );

    assert.deepEqual(result, { isValid: true, missingQuestions: [] });
  });

  it('reports missing required questions', () => {
    const result = validateQuizAnswers(
      {
        1: 'yes',
        3: 'fashion',
        5: '2weeks',
      },
      5
    );

    assert.deepEqual(result, { isValid: false, missingQuestions: [2, 4] });
  });
});

describe('import quiz WhatsApp utilities', () => {
  it('rejects invalid WhatsApp numbers', () => {
    const result = validateWhatsAppNumber('123');

    assert.equal(result.isValid, false);
    assert.equal(result.formattedNumber, '');
    assert.equal(result.countryCode, '');
    assert.equal(typeof result.error, 'string');
  });

  it('masks display numbers and builds click-to-chat links', () => {
    assert.equal(maskPhoneNumber('+223 76 69 61 77'), '223****177');
    assert.equal(
      generateWhatsAppLink('+223 76 69 61 77', 'Bonjour ChinaLink'),
      'https://wa.me/22376696177?text=Bonjour%20ChinaLink'
    );
  });
});

describe('import quiz production diagnostics', () => {
  it('generates service recommendations from answers', () => {
    const diagnostic = generateDiagnostic({
      1: 'searching',
      2: '2m-5m',
      3: 'electronics',
      4: 'first',
      5: '2weeks',
    });

    assert.equal(diagnostic.recommendation.primaryService, 'sourcing');
    assert.equal(diagnostic.recommendation.shippingMode, 'air');
    assert.equal(diagnostic.dimensions.riskLevel, 'high');
    assert.ok(diagnostic.recommendation.leadPriority > 0);
  });

  it('validates full submission payloads and rejects invalid answers', () => {
    const valid = validateQuizSubmissionPayload({
      whatsappNumber: '+22376696177',
      locale: 'fr',
      sessionId: 'session-1',
      answers: {
        1: 'yes',
        2: '>5m',
        3: 'fashion',
        4: 'expert',
        5: '2weeks',
      },
      attribution: {
        source: 'google',
        campaign: 'china-mali',
      },
    });

    assert.equal(valid.success, true);

    const invalid = validateQuizSubmissionPayload({
      whatsappNumber: '+22376696177',
      answers: {
        1: 'made-up-answer',
        2: '>5m',
        3: 'fashion',
        4: 'expert',
        5: '2weeks',
      },
    });

    assert.equal(invalid.success, false);
  });
});
