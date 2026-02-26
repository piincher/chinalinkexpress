/**
 * Services Section Component - Bento Grid Edition with Spotlight Borders
 * 
 * Features:
 * - Bento Grid layout with variable card spans
 * - Spotlight border effect on hover (mouse-following gradient border)
 * - Premium "Linear-style" border glow effect
 * - Gradient text headline with shimmer
 * - Subtle grid pattern background
 * - Expandable cards with smooth GSAP Flip animations
 * - Responsive: Mobile stack → Tablet 2-col → Desktop Bento
 */

'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { BentoGrid, BentoCard, BentoCardContent } from '@/components/bento';
import { 
  SpotlightCard, 
  CSSSpotlightBorder, 
  GridPattern,
  GradientTextEnhanced as GradientText,
} from '@/components/animations';
import { useAnimationActivation } from '@/hooks/animation';
import { SECTION_IDS } from '../constants';
import Link from 'next/link';

// Service configuration with spans for bento layout and brand colors
const SERVICES_CONFIG = [
  {
    key: 'sourcing' as const,
    icon: '🛒',
    gradient: 'rgba(37, 99, 235, 0.3), rgba(30, 64, 175, 0.3)',
    borderGlow: ['rgba(59, 130, 246, 0.8)', 'rgba(37, 99, 235, 0.4)', 'rgba(29, 78, 216, 0.6)'], // Blue gradient
    span: '2x2' as const,
    features: ['supplierVerification', 'qualityControl', 'negotiation', 'consolidation'],
  },
  {
    key: 'airFreight' as const,
    icon: '✈️',
    gradient: 'rgba(251, 191, 36, 0.3), rgba(249, 115, 22, 0.3)',
    borderGlow: ['rgba(251, 191, 36, 0.8)', 'rgba(245, 158, 11, 0.4)', 'rgba(217, 119, 6, 0.6)'], // Amber gradient
    span: '1x2' as const,
    features: ['expressDelivery', 'tracking', 'insurance', 'doorToDoor'],
  },
  {
    key: 'seaFreight' as const,
    icon: '🚢',
    gradient: 'rgba(6, 182, 212, 0.3), rgba(37, 99, 235, 0.3)',
    borderGlow: ['rgba(6, 182, 212, 0.8)', 'rgba(8, 145, 178, 0.4)', 'rgba(14, 116, 144, 0.6)'], // Cyan gradient
    span: '1x1' as const,
    features: ['fullContainer', 'sharedContainer', 'economical', 'tracking'],
  },
  {
    key: 'payment' as const,
    icon: '💳',
    gradient: 'rgba(168, 85, 247, 0.3), rgba(219, 39, 119, 0.3)',
    borderGlow: ['rgba(168, 85, 247, 0.8)', 'rgba(147, 51, 234, 0.4)', 'rgba(126, 34, 206, 0.6)'], // Purple gradient
    span: '2x1' as const,
    features: ['alipay', 'wechat', 'secure', 'fast'],
  },
  {
    key: 'recharge' as const,
    icon: '📱',
    gradient: 'rgba(16, 185, 129, 0.3), rgba(8, 145, 178, 0.3)',
    borderGlow: ['rgba(16, 185, 129, 0.8)', 'rgba(5, 150, 105, 0.4)', 'rgba(4, 120, 87, 0.6)'], // Emerald gradient
    span: '1x1' as const,
    features: ['orangeMoney', 'wave', 'cash', 'instant'],
  },
];

// Collapsed card content
function CollapsedContent({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <div className="text-4xl md:text-5xl mb-4">
          {icon}
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
          {title}
        </h3>
        <p className="text-white/80 text-sm md:text-base leading-relaxed">
          {description}
        </p>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute -top-10 -left-10 w-24 h-24 bg-white/5 rounded-full blur-xl" />
    </div>
  );
}

// Expanded card content
function ExpandedContent({
  icon,
  title,
  description,
  features,
  t,
  serviceKey,
  ctaText,
}: {
  icon: string;
  title: string;
  description: string;
  features: string[];
  t: ReturnType<typeof useTranslations>;
  serviceKey: string;
  ctaText: string;
}) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-start gap-4 mb-6">
        <div className="text-5xl md:text-6xl">
          {icon}
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {title}
          </h3>
          <p className="text-white/90 text-base leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Features grid */}
      <div className="flex-1 grid grid-cols-2 gap-3 mb-6">
        {features.map((feature) => (
          <div
            key={feature}
            className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2"
          >
            <svg className="w-5 h-5 text-white/80 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-white/90 text-sm">
              {t(`features.${serviceKey}.${feature}`)}
            </span>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div>
        <Link
          href={`/services/${serviceKey}`}
          className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-white/90 transition-colors"
        >
          {ctaText}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

// Individual service card with spotlight border wrapper
function ServiceCardWithSpotlightBorder({
  service,
  t,
  ctaText,
}: {
  service: typeof SERVICES_CONFIG[0];
  t: ReturnType<typeof useTranslations>;
  ctaText: string;
}) {
  const title = t(`items.${service.key}.title`);
  const description = t(`items.${service.key}.description`);

  return (
    <CSSSpotlightBorder
      className="h-full rounded-2xl"
      borderWidth={1}
      gradientColors={service.borderGlow}
      animationDuration={4}
    >
      <SpotlightCard
        className="h-full rounded-2xl"
        spotlightColor="rgba(255, 255, 255, 0.12)"
        spotlightSize={250}
        borderGlow={false} // Disable built-in border glow to use CSSSpotlightBorder
      >
        <BentoCard
          id={service.key}
          defaultSpan={service.span}
          expandedSpan="2x2"
          gradient={service.gradient}
          className="h-full bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-white/10 hover:border-white/20"
        >
          <BentoCardContent
            collapsedContent={
              <CollapsedContent
                icon={service.icon}
                title={title}
                description={description}
              />
            }
            expandedContent={
              <ExpandedContent
                icon={service.icon}
                title={title}
                description={description}
                features={service.features}
                t={t}
                serviceKey={service.key}
                ctaText={ctaText}
              />
            }
          />
        </BentoCard>
      </SpotlightCard>
    </CSSSpotlightBorder>
  );
}

// Main services section
export function ServicesSection() {
  const t = useTranslations('services');
  const ctaT = useTranslations('cta');
  const { ref, isActive } = useAnimationActivation({
    threshold: 0.1,
    delay: 200,
  });

  return (
    <section
      id={SECTION_IDS.SERVICES}
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-white dark:from-slate-950 via-blue-50/50 dark:via-blue-950/20 to-white dark:to-slate-950" />
      
      {/* Subtle grid pattern background */}
      <GridPattern
        type="dots"
        size={24}
        opacity={0.03}
        className="absolute inset-0 w-full h-full"
        animated={false}
        color="currentColor"
      />
      
      {/* Animated background shapes - only when visible */}
      {isActive && (
        <>
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 bg-blue-200/30 dark:bg-blue-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200/30 dark:bg-cyan-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.4, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />
        </>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Gradient Text */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
            {t('sectionLabel')}
          </span>
          
          {/* Premium Gradient Text Title with Shimmer */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <GradientText
              colors={['#2563eb', '#06b6d4', '#2563eb']}
              duration={3}
            >
              {t('title')}
            </GradientText>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
          
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Bento Grid - Desktop: Full layout, Tablet: 2 cols, Mobile: Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <BentoGrid columns={3} gap="1.5rem">
            {SERVICES_CONFIG.map((service, index) => (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 20 }}
                animate={isActive ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="contents"
              >
                <ServiceCardWithSpotlightBorder 
                  service={service} 
                  t={t} 
                  ctaText={ctaT('learnMore')} 
                />
              </motion.div>
            ))}
          </BentoGrid>
        </motion.div>

        {/* App Download Section */}
        <motion.div
          className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* QR Codes Card */}
          <CSSSpotlightBorder
            className="rounded-3xl"
            borderWidth={1}
            gradientColors={['rgba(59, 130, 246, 0.8)', 'rgba(6, 182, 212, 0.6)', 'rgba(59, 130, 246, 0.8)']}
          >
            <SpotlightCard
              className="rounded-3xl"
              spotlightColor="rgba(255, 255, 255, 0.2)"
              spotlightSize={300}
              borderGlow={false}
            >
              <div className="relative bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl p-8 text-white overflow-hidden h-full">
                {/* Static background decoration */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">{t('appSection.title')}</h3>
                  <p className="text-white/80 mb-8">{ctaT('downloadApp')}</p>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-6">
                    <motion.div
                      className="bg-white rounded-2xl p-4 shadow-2xl"
                      whileHover={{ scale: 1.05, y: -5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Image
                        src="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/app%20store%20qr%20code.png"
                        alt="App Store QR Code"
                        width={120}
                        height={120}
                        className="rounded-xl"
                      />
                      <p className="text-center text-gray-800 dark:text-gray-200 text-sm mt-2 font-medium">App Store</p>
                    </motion.div>
                    
                    <motion.div
                      className="bg-white rounded-2xl p-4 shadow-2xl"
                      whileHover={{ scale: 1.05, y: -5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Image
                        src="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/play%20store.png"
                        alt="Google Play QR Code"
                        width={120}
                        height={120}
                        className="rounded-xl"
                      />
                      <p className="text-center text-gray-800 dark:text-gray-200 text-sm mt-2 font-medium">Play Store</p>
                    </motion.div>
                  </div>
                  
                  <p className="mt-6 text-sm text-white/70">
                    {t('appSection.note')}
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </CSSSpotlightBorder>

          {/* App Preview Card */}
          <CSSSpotlightBorder
            className="rounded-3xl"
            borderWidth={1}
            gradientColors={['rgba(99, 102, 241, 0.6)', 'rgba(168, 85, 247, 0.5)', 'rgba(99, 102, 241, 0.6)']}
          >
            <SpotlightCard
              className="rounded-3xl"
              spotlightColor="rgba(255, 255, 255, 0.1)"
              spotlightSize={300}
              borderGlow={false}
            >
              <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 text-white overflow-hidden h-full">
                {/* Grid pattern overlay */}
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px',
                  }}
                />
                
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{t('appSection.previewTitle')}</h3>
                  <p className="text-gray-400 dark:text-gray-500 mb-6">{t('appSection.previewDescription')}</p>
                  
                  <motion.div
                    className="relative rounded-2xl overflow-hidden shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Image
                      src="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/app-flyer.png"
                      alt="Mobile App Preview"
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                    
                    {/* Feature badges */}
                    <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                      {['📍 Tracking', '🔔 Notifications', '💬 Support'].map((badge) => (
                        <span key={badge} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </SpotlightCard>
          </CSSSpotlightBorder>
        </motion.div>
      </div>
    </section>
  );
}

export default ServicesSection;
