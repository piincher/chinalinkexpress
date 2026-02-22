/**
 * Testimonials Section Component
 * 
 * Animated testimonial cards with auto-rotating carousel,
 * star ratings animation, and floating quote marks.
 * Part of the landing page feature.
 * 
 * READABILITY FIXES:
 * - Fixed card backgrounds for dark mode support
 * - WCAG AA compliant text contrast
 * - Proper star rating visibility
 * - Improved industry card text legibility
 * - Consistent use of CSS variables
 */

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { AnimatedSection, SplitText } from '@/components/animations';
import { TESTIMONIALS, SECTION_IDS } from '../constants';
import type { Testimonial } from '@/types';

// Animated star rating - FIXED: improved visibility
function StarRating({ rating, delay = 0 }: { rating: number; delay?: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <motion.span
          key={i}
          className={`text-xl ${i < rating ? 'text-yellow-500' : 'text-[var(--border-strong)]'}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + i * 0.1, type: 'spring' }}
        >
          ★
        </motion.span>
      ))}
    </div>
  );
}

// Testimonial card with flip animation - FIXED: proper dark mode support
function TestimonialCard({ 
  testimonial, 
  index,
  isActive,
}: { 
  testimonial: Testimonial; 
  index: number;
  isActive?: boolean;
}) {
  return (
    <motion.div
      className={`relative bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 shadow-lg overflow-hidden ${isActive ? 'ring-2 ring-[var(--color-primary)] ring-offset-2 ring-offset-[var(--background)]' : ''}`}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      whileHover={{ y: -10, boxShadow: 'var(--shadow-xl)' }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Quote mark decoration - uses CSS variable */}
      <motion.div
        className="absolute -top-4 -left-4 text-8xl text-[var(--color-primary-100)] dark:text-[var(--color-primary-50)]/30 font-serif select-none"
        animate={{ 
          y: [0, -5, 0],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
      >
        &ldquo;
      </motion.div>
      
      {/* Header */}
      <div className="flex items-center mb-6 relative z-10">
        <motion.div
          className="relative"
          whileHover={{ scale: 1.1 }}
        >
          <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-[var(--color-primary-100)]">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Status indicator */}
          <motion.div
            className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-[var(--surface)]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        
        <div className="ml-4">
          <motion.div 
            className="font-bold text-[var(--text-primary)] text-lg"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.2 }}
          >
            {testimonial.name}
          </motion.div>
          <motion.div 
            className="text-[var(--text-tertiary)] text-sm"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.3 }}
          >
            {testimonial.company}
          </motion.div>
        </div>
      </div>

      {/* Rating */}
      <div className="mb-4">
        <StarRating rating={testimonial.rating} delay={index * 0.15 + 0.4} />
      </div>

      {/* Quote - FIXED: improved text contrast */}
      <motion.p 
        className="text-[var(--text-secondary)] italic text-lg leading-relaxed relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.15 + 0.5 }}
      >
        &ldquo;{testimonial.text}&rdquo;
      </motion.p>
      
      {/* Bottom decoration */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)]"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.15 + 0.6, duration: 0.8 }}
      />
    </motion.div>
  );
}

// Industry card with hover effects - FIXED: improved text legibility
function IndustryCard({ 
  image, 
  title, 
  index 
}: { 
  image: string; 
  title: string; 
  index: number;
}) {
  return (
    <motion.div
      className="group relative rounded-2xl overflow-hidden"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, type: 'spring' }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />
        {/* FIXED: Stronger gradient for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <motion.div 
          className="font-bold text-white text-lg drop-shadow-lg"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15 + 0.2 }}
        >
          {title}
        </motion.div>
      </div>
      
      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 bg-[var(--color-primary)]/20 opacity-0 group-hover:opacity-100 transition-opacity"
      />
    </motion.div>
  );
}

export function TestimonialsSection() {
  const t = useTranslations();
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const industries = [
    { image: 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/retails.jpg', title: t('testimonials.industries.retail') },
    { image: 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/tech.jpg', title: t('testimonials.industries.tech') },
    { image: 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/auto%20part.jpg', title: t('testimonials.industries.automotive') },
  ];

  return (
    <section id={SECTION_IDS.TESTIMONIALS} className="relative py-24 md:py-32 overflow-hidden bg-[var(--surface-elevated)]">
      {/* FIXED: Subtle background using CSS variables */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--surface)] via-[var(--surface-elevated)] to-[var(--surface)]" />
      
      {/* Decorative elements */}
      <motion.div
        className="absolute top-40 right-0 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl"
        animate={{ 
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <AnimatedSection>
            <span className="inline-block px-4 py-1.5 bg-[var(--color-accent-light)]/30 text-[var(--color-accent-dark)] rounded-full text-sm font-semibold mb-4">
              {t('testimonials.sectionLabel')}
            </span>
          </AnimatedSection>
          
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
            <SplitText animation="fadeUp">
              {t('testimonials.title')}
            </SplitText>
          </h2>
          
          <motion.div
            className="w-24 h-1.5 bg-gradient-to-r from-[var(--color-accent)] to-orange-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial} 
              index={index}
              isActive={activeIndex === index}
            />
          ))}
        </div>
        
        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mb-16">
          {TESTIMONIALS.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                activeIndex === index ? 'bg-[var(--color-primary)]' : 'bg-[var(--border-strong)]'
              }`}
              onClick={() => setActiveIndex(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div 
          className="relative bg-gradient-to-r from-[var(--color-primary-600)] via-[var(--color-primary-700)] to-[var(--color-primary-dark)] rounded-3xl p-8 md:p-12 text-white text-center overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          
          <div className="relative z-10">
            <motion.h3 
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {t('testimonials.ctaTitle')}
            </motion.h3>
            
            <motion.p 
              className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {t('testimonials.ctaDescription')}
            </motion.p>

            {/* Industry Examples */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {industries.map((industry, index) => (
                <IndustryCard
                  key={industry.title}
                  image={industry.image}
                  title={industry.title}
                  index={index}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
