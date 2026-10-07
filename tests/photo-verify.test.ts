import assert from 'node:assert/strict';
import { afterEach, describe, it } from 'node:test';

import { normalizePhotoCode, verifyPhotoCode } from '../src/lib/photoVerifyApi';

const realFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = realFetch;
});

const answer = (status: number, body: unknown) => {
  const calls: string[] = [];
  globalThis.fetch = (async (url: string) => {
    calls.push(String(url));
    return new Response(JSON.stringify(body), { status });
  }) as typeof fetch;
  return calls;
};

describe('photo code normalisation', () => {
  it('accepts the forms people type', () => {
    for (const input of ['7F3A-92CD', '7f3a92cd', ' 7f3a 92cd ', 'IMG:7f3a92cd']) {
      assert.equal(normalizePhotoCode(input), '7F3A-92CD');
    }
  });

  it('rejects everything else', () => {
    for (const input of ['', '7F3A', 'ZZZZ-ZZZZ', '7F3A-92CD<script>', 'x'.repeat(64), null, 42, ['7f3a92cd']]) {
      assert.equal(normalizePhotoCode(input), null);
    }
  });
});

describe('verifyPhotoCode', () => {
  it('never calls the API with an invalid code', async () => {
    const calls = answer(200, {});
    assert.deepEqual(await verifyPhotoCode('nope'), { status: 'invalid' });
    assert.equal(calls.length, 0);
  });

  it('sends the normalised code, URL-encoded', async () => {
    const calls = answer(404, {});
    await verifyPhotoCode('7f3a 92cd');
    assert.match(calls[0], /\/api\/v2\/photos\/verify\?code=7F3A-92CD$/);
  });

  it('maps API statuses', async () => {
    answer(404, {});
    assert.equal((await verifyPhotoCode('7F3A-92CD')).status, 'not-found');
    answer(429, {});
    assert.equal((await verifyPhotoCode('7F3A-92CD')).status, 'rate-limited');
    answer(500, {});
    assert.equal((await verifyPhotoCode('7F3A-92CD')).status, 'error');
  });

  it('keeps only expected fields and refuses a non-https image', async () => {
    answer(200, {
      success: true,
      data: {
        code: '7F3A-92CD',
        isValid: true,
        reference: 'GDS-2610-0412',
        stage: 'LABELED',
        capturedAt: null,
        processedAt: '2026-10-07T16:34:00.000Z',
        imageUrl: 'javascript:alert(1)',
        driverName: 'should not pass through',
      },
    });
    const outcome = await verifyPhotoCode('7F3A-92CD');
    assert.equal(outcome.status, 'valid');
    if (outcome.status !== 'valid') return;
    assert.equal(outcome.photo.imageUrl, null);
    assert.equal('driverName' in outcome.photo, false);
  });

  it('treats a malformed success body as an error, not a valid photo', async () => {
    answer(200, { success: true, data: { isValid: 'yes' } });
    assert.equal((await verifyPhotoCode('7F3A-92CD')).status, 'error');
  });
});
