#!/usr/bin/env node

const baseUrl = (process.argv[2] || process.env.QA_BASE_URL || 'http://localhost:3000').replace(/\/$/, '');

const pages = [
  '/en',
  '/en/routes/china-to-africa',
  '/en/routes/china-to-mali',
  '/en/cargo-chine-mali',
  '/en/blog',
  '/en/blog/comment-importer-chine-mali-2026',
  '/en/blog/cargo-chine-mali-guide-complet',
  '/en/guides/douane-mali-import-chine',
  '/en/services/air-freight',
  '/en/services/sea-freight',
  '/en/services/sourcing',
];

const forbiddenFrench = [
  /\bAccueil\b/i,
  /\bFret\b/i,
  /\bA[eé]rien\b/i,
  /\bMaritime\b/i,
  /\bChine\b/i,
  /\bAfrique\b/i,
  /\bjours\b/i,
  /\bDouane\b/i,
  /\bDemander\b/i,
  /\bdevis\b/i,
  /\bfournisseur\b/i,
  /\bT[eé]moignages\b/i,
  /\bQuestions fr[eé]quentes\b/i,
  /\b[EÊ]tes-vous\b/i,
  /\bR[eé]pondez\b/i,
  /\b[EÉ]valuation gratuite\b/i,
  /\bGuide personnalis[eé]\b/i,
  /\bConseils d'experts\b/i,
];

const strip = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const extractMetaContent = (html) =>
  [...html.matchAll(/<meta\b[^>]*\bcontent=(["'])(.*?)\1[^>]*>/gi)]
    .map((match) => match[2])
    .join(' ');

const extractJsonLd = (html) =>
  [...html.matchAll(/<script\b[^>]*type=(["'])application\/ld\+json\1[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => match[2])
    .join(' ');

const decodeHtml = (value) =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

const removeUrls = (value) =>
  value
    .replace(/https?:\/\/[^\s"'}]+/gi, ' ')
    .replace(/\\?\/(?:fr|en|zh|ar)\\?\/[^\s"'}]+/gi, ' ')
    .replace(/\s+/g, ' ');

const extractImageUrls = (html, pageUrl) => {
  const urls = new Set();
  for (const match of html.matchAll(/<img\b[^>]*\bsrc=(["'])(.*?)\1/gi)) {
    urls.add(new URL(decodeHtml(match[2]), pageUrl).toString());
  }
  for (const match of html.matchAll(/<meta\b[^>]*(?:property|name)=(["'])(?:og:image|twitter:image)\1[^>]*\bcontent=(["'])(.*?)\2[^>]*>/gi)) {
    urls.add(new URL(decodeHtml(match[3]), pageUrl).toString());
  }
  return [...urls];
};

async function fetchPage(path) {
  const url = `${baseUrl}${path}`;
  const response = await fetch(url, { redirect: 'manual' });
  if (!response.ok) {
    throw new Error(`${path} returned ${response.status}`);
  }
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('text/html')) {
    throw new Error(`${path} returned non-HTML content-type: ${contentType}`);
  }
  return { url, html: await response.text() };
}

async function checkImage(url) {
  let response = await fetch(url, { method: 'HEAD', redirect: 'follow' });
  if (!response.ok || !(response.headers.get('content-type') || '').startsWith('image/')) {
    response = await fetch(url, { method: 'GET', redirect: 'follow' });
  }

  const contentType = response.headers.get('content-type') || '';
  if (!response.ok || !contentType.startsWith('image/')) {
    throw new Error(`${response.status} ${contentType || 'unknown content-type'}`);
  }
}

const failures = [];
const imageUrls = new Set();

for (const path of pages) {
  try {
    const { url, html } = await fetchPage(path);
    const searchable = removeUrls([strip(html), extractMetaContent(html), extractJsonLd(html)].join(' '));
    const matches = forbiddenFrench
      .filter((pattern) => pattern.test(searchable))
      .map((pattern) => pattern.source.replace(/\\b|\\/g, ''));

    if (matches.length) {
      failures.push(`${path} contains French terms: ${matches.join(', ')}`);
    }

    extractImageUrls(html, url).forEach((imageUrl) => imageUrls.add(imageUrl));
  } catch (error) {
    failures.push(error.message);
  }
}

for (const imageUrl of imageUrls) {
  try {
    await checkImage(imageUrl);
  } catch (error) {
    failures.push(`${imageUrl} failed image check: ${error.message}`);
  }
}

if (failures.length) {
  console.error('SEO/image QA failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`SEO/image QA passed for ${pages.length} pages and ${imageUrls.size} images.`);
