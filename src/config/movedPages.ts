/**
 * Pages merged into a stronger page with the same search intent (audit 2026-11-20).
 *
 * One list, read by next.config.ts (permanent redirects), the blog index (so it
 * links straight to the destination) and the sitemap (moved paths are left out).
 * Paths are locale-less; every locale moves the same way.
 */
export const MOVED_PAGES: Record<string, string> = {
  // Six ~200-word blog posts that duplicated a guide or a service page.
  'blog/comment-importer-chine-mali-2026': 'guides/importer-de-chine-au-mali',
  'blog/cargo-chine-mali-guide-complet': 'cargo-chine-mali',
  'blog/acheter-alibaba-mali-sans-arnaque': 'guides/acheter-sur-alibaba-depuis-le-mali',
  'blog/paiement-fournisseur-chine-guide': 'services/paiement-fournisseur-chine',
  'blog/douane-mali-import-chine': 'guides/douane-mali-import-chine',
  'blog/conteneur-chine-mali-prix-2026': 'services/sea-freight',
  // Same title as /cargo-chine-mali.
  'routes/china-to-mali': 'cargo-chine-mali',
  // DHL/Aramex prices and "500+ entreprises" that nothing backs up.
  'comparateur-transport': 'calculateur',
};

/** Where a locale-less path now lives (itself when it has not moved). */
export const currentPath = (path: string): string => MOVED_PAGES[path] ?? path;
