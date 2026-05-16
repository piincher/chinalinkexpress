/**
 * Topic Card
 *
 * Discussion topic card with author initials, bilingual title,
 * category badge, reply/like counts, and glassmorphism hover effect.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Heart, Pin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CommunityTopic, categoryColors } from '../data';

function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "À l'instant";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `Il y a ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Il y a ${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `Il y a ${days}j`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `Il y a ${weeks} sem.`;
  const months = Math.floor(days / 30);
  return `Il y a ${months} mois`;
}

interface TopicCardProps {
  topic: CommunityTopic;
  index?: number;
}

export function TopicCard({ topic, index = 0 }: TopicCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <div
        className={cn(
          'relative h-full rounded-2xl p-[1px] transition-all duration-500',
          'bg-gradient-to-br from-slate-700/50 to-slate-800/50',
          'group-hover:from-amber-400/30 group-hover:via-orange-400/20 group-hover:to-amber-400/30'
        )}
      >
        <div className="relative h-full bg-slate-900/80 backdrop-blur-xl rounded-2xl p-5 md:p-6 overflow-hidden border border-white/5 group-hover:border-white/10 transition-colors">
          {/* Pinned indicator */}
          {topic.isPinned && (
            <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-amber-500/10 text-amber-400 rounded-full text-xs font-semibold border border-amber-500/20">
              <Pin className="w-3 h-3" />
              Épinglé
            </div>
          )}

          {/* Top row: Author + Category */}
          <div className="flex items-center gap-3 mb-4">
            {/* Author initials */}
            <div
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0',
                topic.authorColor
              )}
            >
              {topic.authorInitials}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm truncate">{topic.author}</p>
              <p className="text-slate-500 text-xs">{timeAgo(topic.createdAt)}</p>
            </div>

            {/* Category badge */}
            <span
              className={cn(
                'px-2.5 py-1 rounded-full text-xs font-medium border flex-shrink-0',
                categoryColors[topic.category] || categoryColors.general
              )}
            >
              {topic.categoryFr}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-white font-bold text-base md:text-lg mb-2 group-hover:text-amber-300 transition-colors line-clamp-2">
            {topic.titleFr}
          </h3>

          {/* Content preview */}
          <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
            {topic.contentFr}
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-4 text-slate-500 text-sm">
            <div className="flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4" />
              <span>{topic.replies}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Heart className="w-4 h-4" />
              <span>{topic.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
