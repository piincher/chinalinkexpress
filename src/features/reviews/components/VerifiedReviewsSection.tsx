/**
 * VerifiedReviewsSection Component
 *
 * Main reviews section with aggregate rating header, carousel/grid of review cards,
 * auto-rotation, navigation, and multi-source credibility badges.
 */

'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Star,
  MessageSquare,
  ExternalLink,
} from 'lucide-react';
import { useAnimationActivation } from '@/hooks/useAnimationActivation';
import { StarRating } from './StarRating';
import { ReviewCard } from './ReviewCard';
import { REVIEWS, AGGREGATE_RATING } from '../data/reviews';

const AUTO_ROTATE_INTERVAL = 6000;
const CARDS_PER_VIEW = {
  desktop: 3,
  tablet: 2,
  mobile: 1,
};

function useCardsPerView() {
  const [cardsPerView, setCardsPerView] = useState(CARDS_PER_VIEW.desktop);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {
        setCardsPerView(CARDS_PER_VIEW.mobile);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(CARDS_PER_VIEW.tablet);
      } else {
        setCardsPerView(CARDS_PER_VIEW.desktop);
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return cardsPerView;
}

export function VerifiedReviewsSection() {
  const t = useTranslations('reviews');
  const { ref, isActive } = useAnimationActivation({
    threshold: 0.1,
    delay: 100,
  });

  const cardsPerView = useCardsPerView();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = Math.max(1, REVIEWS.length - cardsPerView + 1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Auto-rotate
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(nextSlide, AUTO_ROTATE_INTERVAL);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPaused, nextSlide]);

  const visibleReviews = REVIEWS.slice(currentIndex, currentIndex + cardsPerView);

  // If we're near the end and don't have enough cards, wrap around
  const wrappedReviews =
    visibleReviews.length < cardsPerView
      ? [...visibleReviews, ...REVIEWS.slice(0, cardsPerView - visibleReviews.length)]
      : visibleReviews;

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-white dark:from-slate-950 via-gray-50/80 dark:via-slate-900/80 to-white dark:to-slate-950"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative top line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-200 dark:via-amber-800 to-transparent" />

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
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
            <MessageSquare className="w-4 h-4" />
            {t('badge', { defaultValue: 'Avis clients vérifiés' })}
          </span>

          {/* Aggregate Rating */}
          <div className="flex flex-col items-center mb-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                {AGGREGATE_RATING.rating.toFixed(1)}
              </span>
              <div className="flex flex-col items-start">
                <StarRating rating={AGGREGATE_RATING.rating} size="lg" showValue={false} />
                <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {t('basedOn', {
                    count: AGGREGATE_RATING.totalReviews,
                    defaultValue: `Basé sur ${AGGREGATE_RATING.totalReviews} avis clients vérifiés`,
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Source badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            {AGGREGATE_RATING.sources.map((source) => (
              <span
                key={source}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-xs font-medium text-gray-600 dark:text-gray-400 shadow-sm"
              >
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                {source}
              </span>
            ))}
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('title', { defaultValue: 'Ce que disent nos clients' })}
          </h2>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('subtitle', {
              defaultValue:
                'Des entrepreneurs africains qui importent depuis la Chine avec ChinaLink.',
            })}
          </p>

          <div className="w-24 h-1.5 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Carousel Container */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Navigation Arrows (desktop) */}
          <button
            onClick={prevSlide}
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 items-center justify-center rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg hover:border-amber-300 dark:hover:border-amber-700 transition-all duration-200 text-gray-700 dark:text-gray-300"
            aria-label={t('prev', { defaultValue: 'Avis précédent' })}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextSlide}
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 items-center justify-center rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg hover:border-amber-300 dark:hover:border-amber-700 transition-all duration-200 text-gray-700 dark:text-gray-300"
            aria-label={t('next', { defaultValue: 'Avis suivant' })}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cards Grid / Carousel */}
          <div className="overflow-hidden px-1 py-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {wrappedReviews.map((review, i) => (
                <ReviewCard
                  key={`${review.id}-${currentIndex}-${i}`}
                  review={review}
                  index={review.id ? REVIEWS.findIndex((r) => r.id === review.id) : i}
                />
              ))}
            </div>
          </div>

          {/* Mobile Navigation Arrows */}
          <div className="flex lg:hidden items-center justify-center gap-4 mt-6">
            <button
              onClick={prevSlide}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md text-gray-700 dark:text-gray-300"
              aria-label={t('prev', { defaultValue: 'Avis précédent' })}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {Array.from({ length: Math.min(totalSlides, 6) }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? 'w-6 bg-amber-500'
                      : 'w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                  aria-label={t('goToSlide', { number: i + 1, defaultValue: `Aller à l'avis ${i + 1}` })}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md text-gray-700 dark:text-gray-300"
              aria-label={t('next', { defaultValue: 'Avis suivant' })}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop Dots */}
          <div className="hidden lg:flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: Math.min(totalSlides, 8) }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? 'w-6 bg-amber-500'
                    : 'w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={t('goToSlide', { number: i + 1, defaultValue: `Aller à l'avis ${i + 1}` })}
              />
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {t('cta', { defaultValue: 'Voir tous les avis' })}
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default VerifiedReviewsSection;
