/**
 * ReviewCard Component
 *
 * Individual review card with avatar, verified badge, stars,
 * review text, service tag, and glassmorphism design.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { StarRating } from './StarRating';
import { SERVICE_COLORS } from '../data/reviews';
import type { Review } from '../data/reviews';

interface ReviewCardProps {
  review: Review;
  index?: number;
}

const AVATAR_GRADIENTS = [
  'from-blue-400 to-blue-600',
  'from-emerald-400 to-emerald-600',
  'from-violet-400 to-violet-600',
  'from-amber-400 to-orange-500',
  'from-rose-400 to-rose-600',
  'from-cyan-400 to-cyan-600',
  'from-indigo-400 to-indigo-600',
  'from-teal-400 to-teal-600',
];

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function getAvatarGradient(index: number): string {
  return AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length];
}

export function ReviewCard({ review, index = 0 }: ReviewCardProps) {
  const serviceColor = SERVICE_COLORS[review.service] || SERVICE_COLORS['Full Service'];

  return (
    <motion.div
      className="group h-full"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <div className="relative h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-5 md:p-6 shadow-lg border border-gray-100/80 dark:border-gray-700/80 hover:shadow-xl transition-shadow duration-300">
        {/* Top gradient accent */}
        <div
          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getAvatarGradient(index)} rounded-t-2xl`}
        />

        {/* Header: Avatar + Name + Verified */}
        <div className="flex items-start gap-3 mb-4">
          {/* Avatar */}
          <div
            className={`w-11 h-11 rounded-full bg-gradient-to-br ${getAvatarGradient(index)} flex items-center justify-center text-sm font-bold text-white shadow-md flex-shrink-0`}
          >
            {getInitials(review.name)}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                {review.name}
              </h4>
              <span className="text-base leading-none" role="img" aria-label={review.country}>
                {review.countryFlag}
              </span>
            </div>

            {/* Verified badge */}
            <div className="flex items-center gap-1.5 mt-1">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-[10px] font-semibold">
                <CheckCircle className="w-3 h-3" />
                Verified
              </span>
              <span className="text-[11px] text-gray-400 dark:text-gray-500">
                {review.date}
              </span>
            </div>
          </div>
        </div>

        {/* Star rating */}
        <div className="mb-3">
          <StarRating rating={review.rating} size="sm" showValue={false} />
        </div>

        {/* Review text */}
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4 line-clamp-4">
          &ldquo;{review.text}&rdquo;
        </p>

        {/* Service tag */}
        <div className="mt-auto">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold ${serviceColor}`}
          >
            {review.service}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default ReviewCard;
