/**
 * ItemSearch Component
 *
 * Search interface with large search input, category filter chips,
 * real-time filtering, and popular search quick links.
 */

'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CATEGORIES, POPULAR_SEARCHES, STATUS_CONFIGS } from '../data';
import { useItemSearch } from '../hooks/useItemSearch';
import { ItemResultCard } from './ItemResultCard';
import { DangerousGoodsItem, ItemStatus } from '../types';

interface ItemSearchProps {
  locale?: 'en' | 'fr';
}

const statusFilterLabels: Record<ItemStatus, { en: string; fr: string }> = {
  allowed: { en: 'Allowed', fr: 'Autorisé' },
  restricted: { en: 'Restricted', fr: 'Restreint' },
  prohibited: { en: 'Prohibited', fr: 'Interdit' },
  'permit-required': { en: 'Permit', fr: 'Permis' },
};

const statusColors: Record<ItemStatus, string> = {
  allowed: 'bg-emerald-500',
  restricted: 'bg-amber-500',
  prohibited: 'bg-rose-500',
  'permit-required': 'bg-blue-500',
};

export function ItemSearch({ locale = 'fr' }: ItemSearchProps) {
  const isEn = locale === 'en';
  const {
    query,
    setQuery,
    activeCategory,
    setActiveCategory,
    filteredItems,
    groupedItems,
    hasResults,
    totalCount,
    statusCounts,
    clearSearch,
  } = useItemSearch();

  const [activeStatusFilter, setActiveStatusFilter] = useState<ItemStatus | 'all'>('all');

  const displayedItems =
    activeStatusFilter === 'all'
      ? filteredItems
      : filteredItems.filter((item) => item.status === activeStatusFilter);

  const handlePopularSearch = useCallback(
    (term: string) => {
      setQuery(term);
    },
    [setQuery]
  );

  return (
    <section className="py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-center">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  isEn
                    ? 'Search a product (e.g., phone, perfume, generator...)'
                    : 'Rechercher un produit (ex: téléphone, parfum, générateur...)'
                }
                className={cn(
                  'w-full pl-14 pr-12 py-5 text-lg rounded-2xl',
                  'bg-slate-900/80 border border-slate-700/50',
                  'text-white placeholder:text-slate-500',
                  'focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20',
                  'transition-all duration-300 backdrop-blur-md'
                )}
              />
              {query && (
                <button
                  onClick={clearSearch}
                  className="absolute right-5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Popular Searches */}
        {!query && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 flex flex-wrap items-center gap-2"
          >
            <span className="text-sm text-slate-500">
              {isEn ? 'Popular:' : 'Populaires :'}
            </span>
            {POPULAR_SEARCHES.map((term) => (
              <button
                key={term}
                onClick={() => handlePopularSearch(term)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm font-medium',
                  'bg-slate-800/60 text-slate-400 border border-slate-700/50',
                  'hover:bg-slate-700/60 hover:text-white hover:border-slate-600',
                  'transition-all duration-200'
                )}
              >
                {term}
              </button>
            ))}
          </motion.div>
        )}

        {/* Category Chips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-6 flex flex-wrap gap-2"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                'border backdrop-blur-sm',
                activeCategory === cat.id
                  ? 'bg-blue-500/20 text-blue-300 border-blue-500/40 shadow-lg shadow-blue-500/10'
                  : 'bg-slate-800/40 text-slate-400 border-slate-700/40 hover:bg-slate-700/40 hover:text-slate-300'
              )}
            >
              {isEn ? cat.name : cat.nameFr}
            </button>
          ))}
        </motion.div>

        {/* Results Summary */}
        {query && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 flex items-center justify-between"
          >
            <p className="text-sm text-slate-400">
              {isEn ? (
                <>
                  Found <span className="text-white font-semibold">{totalCount}</span> items
                </>
              ) : (
                <>
                  <span className="text-white font-semibold">{totalCount}</span> articles trouvés
                </>
              )}
            </p>

            {/* Status filter tabs */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveStatusFilter('all')}
                className={cn(
                  'px-2.5 py-1 rounded-lg text-xs font-medium transition-colors',
                  activeStatusFilter === 'all'
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-500 hover:text-slate-300'
                )}
              >
                {isEn ? 'All' : 'Tous'}
              </button>
              {(['allowed', 'restricted', 'permit-required', 'prohibited'] as ItemStatus[]).map(
                (status) =>
                  statusCounts[status] > 0 && (
                    <button
                      key={status}
                      onClick={() => setActiveStatusFilter(status)}
                      className={cn(
                        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors',
                        activeStatusFilter === status
                          ? 'bg-slate-700 text-white'
                          : 'text-slate-500 hover:text-slate-300'
                      )}
                    >
                      <span className={cn('w-2 h-2 rounded-full', statusColors[status])} />
                      {isEn ? statusFilterLabels[status].en : statusFilterLabels[status].fr}
                      <span className="text-slate-500">({statusCounts[status]})</span>
                    </button>
                  )
              )}
            </div>
          </motion.div>
        )}

        {/* Results Grid */}
        <div className="mt-6 space-y-3">
          <AnimatePresence mode="wait">
            {hasResults ? (
              <motion.div
                key={`${query}-${activeCategory}-${activeStatusFilter}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                {displayedItems.map((item, index) => (
                  <ItemResultCard
                    key={item.id}
                    item={item}
                    locale={locale}
                    index={index}
                  />
                ))}
              </motion.div>
            ) : query ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-800/60 flex items-center justify-center">
                  <Search className="w-8 h-8 text-slate-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {isEn ? 'No results found' : 'Aucun résultat trouvé'}
                </h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto">
                  {isEn
                    ? `We couldn't find "${query}". Try different keywords or browse by category.`
                    : `Nous n'avons pas trouvé "${query}". Essayez d'autres mots-clés ou parcourez par catégorie.`}
                </p>
                <button
                  onClick={clearSearch}
                  className="mt-4 px-4 py-2 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/30 text-sm font-medium hover:bg-blue-500/25 transition-colors"
                >
                  {isEn ? 'Clear search' : 'Effacer la recherche'}
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                {/* Default view: grouped by status */}
                {(['prohibited', 'restricted', 'permit-required', 'allowed'] as ItemStatus[]).map(
                  (status) => {
                    const items = groupedItems[status];
                    if (items.length === 0) return null;

                    return (
                      <div key={status}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className={cn('w-3 h-3 rounded-full', statusColors[status])} />
                          <h3 className="text-lg font-semibold text-white">
                            {isEn
                              ? `${STATUS_CONFIGS[status].label} (${items.length})`
                              : `${STATUS_CONFIGS[status].labelFr} (${items.length})`}
                          </h3>
                        </div>
                        <div className="space-y-3">
                          {items.slice(0, 4).map((item, index) => (
                            <ItemResultCard
                              key={item.id}
                              item={item}
                              locale={locale}
                              index={index}
                            />
                          ))}
                          {items.length > 4 && (
                            <button
                              onClick={() => {
                                setActiveStatusFilter(status);
                                setQuery(' ');
                              }}
                              className="w-full py-3 rounded-xl bg-slate-800/40 text-slate-400 text-sm font-medium hover:bg-slate-700/40 hover:text-white transition-colors border border-slate-700/30"
                            >
                              {isEn
                                ? `View all ${items.length} items`
                                : `Voir les ${items.length} articles`}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  }
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
