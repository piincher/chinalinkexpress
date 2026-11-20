import assert from 'node:assert/strict';
import { test } from 'node:test';
import { withSiteRef } from '../src/lib/analytics';
import { MOVED_PAGES, currentPath } from '../src/config/movedPages';

const textOf = (href: string) => new URL(href).searchParams.get('text');

test('WhatsApp messages get the page they came from', () => {
  const href = 'https://wa.me/8618851725957?text=' + encodeURIComponent('Bonjour, devis 10 kg');
  assert.equal(textOf(withSiteRef(href, '/fr/calculateur', 'Bonjour')), 'Bonjour, devis 10 kg\n\n(Réf. site : /fr/calculateur)');
});

test('a bare WhatsApp link gets the greeting and the reference', () => {
  assert.equal(textOf(withSiteRef('https://wa.me/8618851725957', '/fr', 'Bonjour ChinaLink Express')), 'Bonjour ChinaLink Express\n\n(Réf. site : /fr)');
});

test('the reference is added once, even on a second click', () => {
  const once = withSiteRef('https://wa.me/8618851725957?text=Salut', '/fr/tarifs', 'x');
  assert.equal(withSiteRef(once, '/fr/tarifs', 'x'), once);
});

test('a link that is not a URL is left alone', () => {
  assert.equal(withSiteRef('not a url', '/fr', 'x'), 'not a url');
});

test('moved pages point at pages that were not moved themselves', () => {
  for (const to of Object.values(MOVED_PAGES)) assert.equal(MOVED_PAGES[to], undefined, to);
  assert.equal(currentPath('blog/douane-mali-import-chine'), 'guides/douane-mali-import-chine');
  assert.equal(currentPath('tarifs'), 'tarifs');
});

test('spaces are encoded as %20, never "+"', () => {
  const out = withSiteRef('https://wa.me/8618851725957?text=Bonjour%20ChinaLink', '/fr', 'x');
  assert.ok(!out.includes('+'), out);
  assert.ok(out.startsWith('https://wa.me/8618851725957?text=Bonjour%20ChinaLink'));
});
