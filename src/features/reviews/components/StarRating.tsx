/**
 * StarRating Component
 *
 * Reusable star rating display with numeric value.
 * Supports sm/md/lg sizes and dark mode.
 */

'use client';

import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
}

const SIZE_MAP = {
  sm: {
    star: 'w-3.5 h-3.5',
    text: 'text-xs',
    gap: 'gap-0.5',
  },
  md: {
    star: 'w-5 h-5',
    text: 'text-sm',
    gap: 'gap-1',
  },
  lg: {
    star: 'w-7 h-7',
    text: 'text-lg',
    gap: 'gap-1',
  },
};

export function StarRating({ rating, size = 'md', showValue = true }: StarRatingProps) {
  const styles = SIZE_MAP[size];
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-2">
      <div className={`flex ${styles.gap}`}>
        {Array.from({ length: 5 }).map((_, i) => {
          const isFilled = i < fullStars;
          const isHalf = i === fullStars && hasHalf;

          return (
            <div key={i} className="relative">
              {/* Background star (empty) */}
              <Star
                className={`${styles.star} text-gray-200 dark:text-gray-700`}
                strokeWidth={1.5}
              />
              {/* Foreground star (filled or half) */}
              {(isFilled || isHalf) && (
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: isHalf ? '50%' : '100%' }}
                >
                  <Star
                    className={`${styles.star} text-amber-400 fill-amber-400`}
                    strokeWidth={1.5}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {showValue && (
        <span className={`${styles.text} font-semibold text-gray-900 dark:text-white`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}

export default StarRating;
