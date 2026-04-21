/**
 * VideoTestimonialCard Component
 *
 * Individual video testimonial card with gradient thumbnail,
 * play button overlay, duration badge, and result pill.
 * Shows a "Vidéo réelle" badge when a videoUrl is present.
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Mic, Film } from 'lucide-react';
import type { VideoTestimonial } from '../data/videoTestimonials';

interface VideoTestimonialCardProps {
  testimonial: VideoTestimonial;
  index?: number;
}

export function VideoTestimonialCard({ testimonial, index = 0 }: VideoTestimonialCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const hasVideo = Boolean(testimonial.videoUrl);

  return (
    <motion.div
      className="group h-full"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/80 dark:border-gray-700/80 hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${testimonial.thumbnailColor}`}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />

          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
                backgroundSize: '20px 20px',
              }}
            />
          </div>

          {/* Real video badge */}
          {hasVideo && (
            <motion.div
              className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 px-2.5 py-1 bg-red-600 text-white text-[10px] font-bold rounded-full shadow-md"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Film className="w-3 h-3" />
              VIDÉO RÉELLE
            </motion.div>
          )}

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm ${
                hasVideo
                  ? 'bg-red-600/90 text-white'
                  : 'bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white'
              }`}
              animate={{ scale: isHovered ? 1.12 : 1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <Play className="w-7 h-7 fill-current ml-1" />
            </motion.div>
          </div>

          {/* Duration badge */}
          <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 dark:bg-black/80 text-white text-xs font-semibold rounded-md backdrop-blur-sm">
            {testimonial.duration}
          </div>

          {/* Top gradient line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Header: Name + Business + Country */}
          <div className="flex items-start gap-2 mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                  {testimonial.name}
                </h4>
                <span className="text-base leading-none" role="img" aria-label={testimonial.country}>
                  {testimonial.countryFlag}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
                {testimonial.business}
              </p>
            </div>
          </div>

          {/* Language badge */}
          <div className="flex items-center gap-1.5 mb-3">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-full text-[10px] font-semibold border border-amber-100 dark:border-amber-800/40">
              <Mic className="w-3 h-3" />
              {testimonial.language}
            </span>
          </div>

          {/* Quote */}
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4 italic line-clamp-4">
            &ldquo;{testimonial.quote}&rdquo;
          </p>

          {/* Result badge */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-bold border border-emerald-100 dark:border-emerald-800/40">
              {testimonial.result}
            </span>
            <span className="text-[11px] text-gray-500 dark:text-gray-400">
              {testimonial.resultLabel}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default VideoTestimonialCard;
