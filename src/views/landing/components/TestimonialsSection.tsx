/**
 * Testimonials Section Component
 * 
 * Simple static testimonial cards in a responsive grid layout.
 * No animations, no auto-rotation - clean and accessible.
 * Part of the landing page feature.
 */

import React from 'react';
import { useTranslations } from 'next-intl';
import { SECTION_IDS } from '../constants';
import type { Testimonial } from '@/types';

// Testimonials data
const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Amadou Diallo',
    company: 'Diallo Electronics, Bamako',
    text: 'ChinaLink Express a transformé mon business. La livraison en 14 jours est réelle et le service client est exceptionnel.',
    rating: 5,
    image: 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/team-member-1.jpg',
  },
  {
    id: '2',
    name: 'Fatou Coulibaly',
    company: 'Mode Africaine, Abidjan',
    text: 'Je recommande vivement pour le fret maritime. Mes conteneurs arrivent toujours à temps et en parfait état.',
    rating: 5,
    image: 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/team-member-2.jpg',
  },
  {
    id: '3',
    name: 'Oumar Touré',
    company: 'Touré Import-Export, Dakar',
    text: 'Le service de sourcing est incroyable. Ils ont négocié des prix 20% plus bas que ce que j\'obtenais seul.',
    rating: 5,
    image: 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/team-member-3.jpg',
  },
];

// Simple star rating without animations
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`text-xl ${i < rating ? 'text-yellow-500' : 'text-[var(--border-strong)]'}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

// Simple testimonial card without animations
function TestimonialCard({ 
  testimonial,
}: { 
  testimonial: Testimonial;
}) {
  return (
    <div
      className="relative bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 shadow-lg overflow-hidden"
    >
      {/* Quote mark decoration */}
      <div
        className="absolute -top-4 -left-4 text-8xl text-[var(--color-primary-100)] dark:text-[var(--color-primary-50)]/30 font-serif select-none"
      >
        &ldquo;
      </div>
      
      {/* Header */}
      <div className="flex items-center mb-6 relative z-10">
        <div className="relative">
          <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-[var(--color-primary-100)]">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="ml-4">
          <div className="font-bold text-[var(--text-primary)] text-lg">
            {testimonial.name}
          </div>
          <div className="text-[var(--text-tertiary)] text-sm">
            {testimonial.company}
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="mb-4">
        <StarRating rating={testimonial.rating} />
      </div>

      {/* Quote */}
      <p className="text-[var(--text-secondary)] italic text-lg leading-relaxed relative z-10">
        &ldquo;{testimonial.text}&rdquo;
      </p>
      
      {/* Bottom decoration */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)]"
      />
    </div>
  );
}

// Simple industry card without animations
function IndustryCard({ 
  image, 
  title, 
}: { 
  image: string; 
  title: string; 
}) {
  return (
    <div className="group relative rounded-2xl overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="font-bold text-white text-lg drop-shadow-lg">
          {title}
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const t = useTranslations();

  const industries = [
    { image: 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/retails.jpg', title: t('testimonials.industries.retail') },
    { image: 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/tech.jpg', title: t('testimonials.industries.tech') },
    { image: 'https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/auto%20part.jpg', title: t('testimonials.industries.automotive') },
  ];

  return (
    <section id={SECTION_IDS.TESTIMONIALS} className="relative py-24 md:py-32 overflow-hidden bg-[var(--surface-elevated)]">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--surface)] via-[var(--surface-elevated)] to-[var(--surface)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-[var(--color-accent-light)]/30 text-[var(--color-accent-dark)] rounded-full text-sm font-semibold mb-4">
            {t('testimonials.sectionLabel')}
          </span>
          
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
            {t('testimonials.title')}
          </h2>
          
          <div className="w-24 h-1.5 bg-gradient-to-r from-[var(--color-accent)] to-orange-500 mx-auto rounded-full" />
        </div>

        {/* Testimonials Grid - Static, no rotation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial}
            />
          ))}
        </div>

        {/* CTA Banner */}
        <div className="relative bg-gradient-to-r from-[var(--color-primary-600)] via-[var(--color-primary-700)] to-[var(--color-primary-dark)] rounded-3xl p-8 md:p-12 text-white text-center overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              {t('testimonials.ctaTitle')}
            </h3>
            
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {t('testimonials.ctaDescription')}
            </p>

            {/* Industry Examples */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {industries.map((industry) => (
                <IndustryCard
                  key={industry.title}
                  image={industry.image}
                  title={industry.title}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
