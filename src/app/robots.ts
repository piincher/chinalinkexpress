import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      /*
       * Two blanket patterns were removed from the wildcard rule.
       *
       *   '/*?*'      blocked every URL carrying a query string. The share
       *               pages, the guide token pages and the locale-switch links
       *               all take query strings, and the pattern also blocks
       *               Google's own parameterised fetches of otherwise public
       *               pages. Nothing on this site needs protecting by it: the
       *               private surfaces are the API and admin paths, which are
       *               listed explicitly below.
       *
       *   '/*.json$'  blocked '/manifest.json' — the PWA manifest, which must
       *               be fetchable, and which Google reads when it evaluates
       *               installability. It also blocked the App Links and
       *               Universal Links association files under '/.well-known/',
       *               which Apple's and Google's verifiers fetch directly.
       *
       * Blocking a path in robots.txt is not a security control — it is a
       * request, and it makes the URL unindexable rather than inaccessible.
       * The list keeps exactly the paths that should never appear in an index.
       */
      {
        userAgent: '*',
        allow: ['/'],
        disallow: ['/api/', '/test-db/', '/_next/', '/admin/', '/private/'],
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot',
        allow: ['/'],
      },
      {
        userAgent: 'Bingbot',
        allow: ['/'],
      },
    ],
    sitemap: 'https://www.chinalinkexpress.com/sitemap.xml',
    host: 'https://www.chinalinkexpress.com',
  };
}
