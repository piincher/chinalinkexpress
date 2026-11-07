import test from 'node:test';
import assert from 'node:assert/strict';
import { phrase } from '../src/i18n/phrases';

test('phrase translates known French and falls back to it otherwise', () => {
  assert.equal(phrase('zh', 'Précédent'), '上一步');
  assert.equal(phrase('ar', 'Précédent'), 'السابق');
  assert.equal(phrase('en', 'Précédent'), 'Previous');
  assert.equal(phrase('fr', 'Précédent'), 'Précédent');
  assert.equal(phrase('zh', 'Texte inconnu'), 'Texte inconnu');
});
