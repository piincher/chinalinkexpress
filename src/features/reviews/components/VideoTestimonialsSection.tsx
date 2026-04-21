/**
 * VideoTestimonialsSection Component
 *
 * Prominent section showcasing real client video testimonials.
 * Features scroll-triggered animations, trust badges, and a
 * competitive comparison strip.
 */

'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Video,
  ShieldCheck,
  Globe,
  Play,
  X,
  ChevronRight,
  Camera,
} from 'lucide-react';
import { useAnimationActivation } from '@/hooks/useAnimationActivation';
import { VideoTestimonialCard } from './VideoTestimonialCard';
import { VIDEO_TESTIMONIALS } from '../data/videoTestimonials';

export function VideoTestimonialsSection() {
  const t = useTranslations('videoTestimonials');
  const { ref, isActive } = useAnimationActivation({
    threshold: 0.1,
    delay: 100,
  });
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const selectedTestimonial = VIDEO_TESTIMONIALS.find(
    (v) => v.id === selectedVideo
  );

  return (
    <>
      <section
        ref={ref}
        className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-amber-50/60 dark:from-amber-950/20 via-white dark:via-slate-950 to-white dark:to-slate-950"
      >
        {/* Decorative top line */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-300 dark:via-amber-800 to-transparent" />

        {/* Background warm glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-amber-200/20 dark:bg-amber-900/10 rounded-full blur-3xl pointer-events-none" />

        {/* Subtle dot pattern */}
        <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            className="text-center mb-14 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-amber-100 dark:from-amber-900/30 to-orange-100 dark:to-orange-900/30 text-amber-700 dark:text-amber-400 rounded-full text-sm font-semibold mb-5">
              <Video className="w-4 h-4" />
              {t('badge', { defaultValue: 'Témoignages vidéo' })}
            </span>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {t('title', {
                defaultValue: 'Ils parlent de nous. En vrai.',
              })}
            </h2>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('subtitle', {
                defaultValue:
                  "Pas d'acteurs. Pas de scripts. Des importateurs africains qui racontent leur expérience dans leur langue.",
              })}
            </p>

            <div className="w-24 h-1.5 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mt-6 rounded-full" />
          </motion.div>

          {/* Trust badge */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 mb-10"
            initial={{ opacity: 0, y: 12 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-xs font-medium text-gray-600 dark:text-gray-400 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              {t('trustBadge.unpaid', {
                defaultValue: 'Avis vidéo non rémunérés',
              })}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-xs font-medium text-gray-600 dark:text-gray-400 shadow-sm">
              <Camera className="w-3.5 h-3.5 text-amber-500" />
              {t('trustBadge.filmedOnSite', {
                defaultValue: 'Tournés chez le client',
              })}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-xs font-medium text-gray-600 dark:text-gray-400 shadow-sm">
              <Globe className="w-3.5 h-3.5 text-sky-500" />
              {t('trustBadge.localLanguage', {
                defaultValue: 'Langues locales',
              })}
            </span>
          </motion.div>

          {/* Comparison strip */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 12 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200 bg-gradient-to-r from-amber-100 dark:from-amber-900/20 to-orange-100 dark:to-orange-900/20 px-5 py-2.5 rounded-full border border-amber-200 dark:border-amber-800/30">
              <ChevronRight className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              {t('comparisonStrip', {
                defaultValue:
                  'Nos concurrents ont 0 vidéo. Nous avons 6. Et ça change tout.',
              })}
            </p>
          </motion.div>

          {/* Video Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            {VIDEO_TESTIMONIALS.map((testimonial, i) => (
              <button
                key={testimonial.id}
                onClick={() => setSelectedVideo(testimonial.id)}
                className="text-left w-full"
                aria-label={t('watchVideo', {
                  name: testimonial.name,
                  defaultValue: `Regarder la vidéo de ${testimonial.name}`,
                })}
              >
                <VideoTestimonialCard
                  testimonial={testimonial}
                  index={i}
                />
              </button>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            className="text-center mt-14"
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {t('ctaText', {
                defaultValue:
                  'Vous aussi, partagez votre expérience avec ChinaLink.',
              })}
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Play className="w-4 h-4" />
              {t('ctaButton', {
                defaultValue: 'Devenir client',
              })}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Video Modal (placeholder since no real videos) */}
      <AnimatePresence>
        {selectedTestimonial && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/70 dark:bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedVideo(null)}
            />

            {/* Modal */}
            <motion.div
              className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
              initial={{ scale: 0.92, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 16 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 dark:bg-white/20 text-white hover:bg-black/60 dark:hover:bg-white/30 transition-colors"
                aria-label={t('close', { defaultValue: 'Fermer' })}
              >
                <X className="w-4 h-4" />
              </button>

              {/* Placeholder video area */}
              <div className="relative aspect-video">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${selectedTestimonial.thumbnailColor}`}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <Play className="w-14 h-14 mb-3 opacity-90" />
                  <p className="text-sm font-medium opacity-80">
                    {t('videoComingSoon', {
                      defaultValue: 'Vidéo bientôt disponible',
                    })}
                  </p>
                </div>
              </div>

              {/* Modal content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {selectedTestimonial.name}
                  </h3>
                  <span
                    className="text-lg leading-none"
                    role="img"
                    aria-label={selectedTestimonial.country}
                  >
                    {selectedTestimonial.countryFlag}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {selectedTestimonial.business}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 italic leading-relaxed mb-4">
                  &ldquo;{selectedTestimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-lg text-xs font-bold border border-emerald-100 dark:border-emerald-800/40">
                    {selectedTestimonial.result}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {selectedTestimonial.resultLabel}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default VideoTestimonialsSection;
