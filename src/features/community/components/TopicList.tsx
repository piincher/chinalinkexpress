/**
 * Topic List
 *
 * Filterable list of discussion topics with pinned topics at top,
 * sort options, and load-more pagination.
 */

'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Flame, Clock, ChevronDown, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAnimationActivation } from '@/hooks/useAnimationActivation';
import { communityTopics, categories } from '../data';
import { TopicCard } from './TopicCard';

type SortOption = 'recent' | 'popular';

const ITEMS_PER_PAGE = 6;

export function TopicList() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const { ref, isActive } = useAnimationActivation({ threshold: 0.1, delay: 100 });

  const filteredTopics = useMemo(() => {
    let topics = [...communityTopics];

    if (activeCategory !== 'all') {
      topics = topics.filter((t) => t.category === activeCategory);
    }

    if (sortBy === 'recent') {
      topics.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else {
      topics.sort((a, b) => b.likes + b.replies - (a.likes + a.replies));
    }

    // Always keep pinned topics at the top
    const pinned = topics.filter((t) => t.isPinned);
    const unpinned = topics.filter((t) => !t.isPinned);
    return [...pinned, ...unpinned];
  }, [activeCategory, sortBy]);

  const visibleTopics = filteredTopics.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTopics.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 text-blue-400 rounded-full text-sm font-semibold mb-4 border border-blue-500/20">
            <MessageSquare className="w-4 h-4" />
            Discussions récentes
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            De quoi parle la communauté ?
          </h2>

          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10"
        >
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setVisibleCount(ITEMS_PER_PAGE);
                }}
                className={cn(
                  'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300',
                  activeCategory === cat.id
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 hover:text-white'
                )}
              >
                {cat.labelFr}
              </button>
            ))}
          </div>

          {/* Sort toggle */}
          <div className="flex items-center gap-2 bg-white/5 rounded-xl p-1 border border-white/10">
            <button
              onClick={() => setSortBy('recent')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all',
                sortBy === 'recent'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-white'
              )}
            >
              <Clock className="w-4 h-4" />
              Récent
            </button>
            <button
              onClick={() => setSortBy('popular')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all',
                sortBy === 'popular'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-white'
              )}
            >
              <Flame className="w-4 h-4" />
              Populaire
            </button>
          </div>
        </motion.div>

        {/* Topic grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleTopics.map((topic, index) => (
            <TopicCard key={topic.id} topic={topic} index={index} />
          ))}
        </div>

        {/* Empty state */}
        {visibleTopics.length === 0 && (
          <div className="text-center py-16">
            <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">Aucun sujet dans cette catégorie pour le moment.</p>
          </div>
        )}

        {/* Load more */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 px-8 py-3 bg-white/5 text-white rounded-xl font-medium border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              Voir plus de discussions
              <ChevronDown className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
