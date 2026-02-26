/**
 * Hero Section Component
 *
 * Animated hero section with premium visual effects:
 * - GradientMesh background with flowing organic motion
 * - GridPattern overlay for texture and depth
 * - AnimatedGradientText with shimmer effect for headlines
 * - TextReveal, MagneticButton, Counter, and scroll indicator
 * - HeroAnimation as animated background layer
 *
 * Respects reduced motion preferences for accessibility.
 * Part of the landing page feature.
 */

"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { useScrollTo } from "@/hooks/useScrollTo";
import { 
  TextReveal, 
  MagneticButton, 
  GradientMesh,
  GridPattern,
  ShimmerHeading,
} from "@/components/animations";
import { HeroAnimation } from "@/features/hero-animation/components";
import { SECTION_IDS } from "../constants";
import { ChevronDown } from "lucide-react";

// Check if user prefers reduced motion
function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return reducedMotion;
}

// Scroll indicator with bounce animation
function ScrollIndicator() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();

  const handleClick = () => {
    const element = document.getElementById(SECTION_IDS.SERVICES);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      ref={ref}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
      onClick={handleClick}
      initial={{ opacity: 0, y: -20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
      transition={{ delay: 1.5, duration: 0.6 }}
    >
      <span className="text-sm text-blue-200/70 uppercase tracking-widest">
        Scroll
      </span>
      <motion.div
        animate={prefersReducedMotion ? {} : {
          y: [0, 8, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ChevronDown className="w-6 h-6 text-blue-200/70" />
      </motion.div>
    </motion.div>
  );
}

export function HeroSection() {
  const t = useTranslations();
  const { scrollToElement } = useScrollTo();
  const prefersReducedMotion = useReducedMotion();

  const handleScrollToServices = () => {
    scrollToElement(SECTION_IDS.SERVICES);
  };

  // Animation variants for fade-in elements
  const fadeInVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    }),
  };

  // Custom colors for GradientMesh: blue-600, purple-600, cyan-500
  const meshColors = [
    'rgba(37, 99, 235, 0.8)',    // blue-600
    'rgba(147, 51, 234, 0.7)',   // purple-600
    'rgba(6, 182, 212, 0.6)',    // cyan-500
    'rgba(59, 130, 246, 0.7)',   // blue-500 (accent)
  ];

  return (
    <section
      id={SECTION_IDS.HERO}
      className="relative min-h-screen bg-slate-950 text-white overflow-hidden"
    >
      {/* Layer 1: GradientMesh Background (z-0) */}
      <div className="absolute inset-0 z-0">
        <GradientMesh
          colors={meshColors}
          intensity="medium"
          blobCount={4}
        />
      </div>

      {/* Layer 2: HeroAnimation (z-[1]) - behind content but above mesh */}
      <div className="absolute inset-0 z-[1]">
        <HeroAnimation className="opacity-60" />
      </div>

      {/* Layer 3: Gradient overlays for readability (z-[2]) */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-blue-950/70 to-transparent z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-blue-950/50 z-[2]" />

      {/* Layer 4: GridPattern overlay (z-10) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <GridPattern
          type="dots"
          size={24}
          opacity={0.08}
          color="white"
        />
      </div>

      {/* Content (z-10) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
            >
              <motion.span 
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={prefersReducedMotion ? {} : {
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className="text-sm font-medium text-blue-100">
                {t("hero.badge") || "Opérationnel 24/7 • Livraison garantie"}
              </span>
            </motion.div>

            {/* Headline with TextReveal */}
            <div className="space-y-2">
              {prefersReducedMotion ? (
                // Simple fade for reduced motion preference
                <motion.h1 
                  className="text-5xl sm:text-6xl lg:text-7xl font-black"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  CHINALINK
                </motion.h1>
              ) : (
                <TextReveal
                  type="chars"
                  stagger={0.03}
                  duration={0.5}
                  delay={0.2}
                  className="text-5xl sm:text-6xl lg:text-7xl font-black"
                  as="h1"
                >
                  CHINALINK
                </TextReveal>
              )}
              
              {prefersReducedMotion ? (
                <motion.h2 
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-amber-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  EXPRESS
                </motion.h2>
              ) : (
                <TextReveal
                  type="chars"
                  stagger={0.04}
                  duration={0.5}
                  delay={0.6}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-amber-400"
                  as="h2"
                >
                  EXPRESS
                </TextReveal>
              )}
            </div>

            {/* Main headline with ShimmerHeading (shimmer effect) */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
            >
              <ShimmerHeading
                level={3}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold"
                colors={['#2563eb', '#9333ea', '#06b6d4', '#9333ea', '#2563eb']} // blue → purple → cyan → purple → blue
                duration={4}
              >
                Your Trusted Logistics Partner
              </ShimmerHeading>
            </motion.div>

            {/* Subtitle with fade-in */}
            <motion.p
              className="text-xl md:text-2xl text-blue-100 max-w-xl leading-relaxed"
              initial={prefersReducedMotion ? {} : "hidden"}
              animate="visible"
              custom={1.3}
              variants={fadeInVariants}
            >
              {t("hero.subtitle")}
            </motion.p>

            {/* CTA Buttons with MagneticButton */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={prefersReducedMotion ? {} : "hidden"}
              animate="visible"
              custom={1.5}
              variants={fadeInVariants}
            >
              <MagneticButton strength={25}>
                <a
                  href="https://wa.me/8618851725957"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-2xl hover:shadow-green-500/25 inline-flex items-center gap-3 hover:scale-105"
                >
                  <span>📱</span>
                  <span>{t("cta.getQuote")}</span>
                </a>
              </MagneticButton>

              <button
                onClick={handleScrollToServices}
                className="group border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:bg-white/10 inline-flex items-center gap-3"
              >
                <span>{t("cta.discoverServices")}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </motion.div>

            {/* Stats Row with animated counters */}
            <motion.div
              className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10"
              initial={prefersReducedMotion ? {} : "hidden"}
              animate="visible"
              custom={1.7}
              variants={fadeInVariants}
            >
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">7+</div>
                <div className="text-blue-200 text-sm uppercase tracking-wider">
                  {t("stats.experienceYears") || "Années d'expérience"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">1000+</div>
                <div className="text-blue-200 text-sm uppercase tracking-wider">
                  {t("stats.satisfiedClients")}
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">95.5%</div>
                <div className="text-blue-200 text-sm uppercase tracking-wider">
                  {t("stats.deliveryRate") || "Taux de livraison"}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Visual placeholder with animated rings */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          >
            <div className="relative w-96 h-96">
              {/* Animated rings */}
              <motion.div
                className="absolute inset-0 border-2 border-blue-500/30 rounded-full"
                animate={prefersReducedMotion ? {} : {
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-8 border-2 border-cyan-500/30 rounded-full"
                animate={prefersReducedMotion ? {} : {
                  scale: [1, 1.08, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
              <motion.div
                className="absolute inset-16 border-2 border-purple-500/30 rounded-full"
                animate={prefersReducedMotion ? {} : {
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />

              {/* Center content */}
              <div className="absolute inset-24 flex items-center justify-center text-8xl">
                🌏
              </div>

              {/* Animated icons */}
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-2xl shadow-lg"
                animate={prefersReducedMotion ? {} : {
                  y: [0, -8, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                📦
              </motion.div>
              <motion.div
                className="absolute bottom-8 left-8 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-2xl shadow-lg"
                animate={prefersReducedMotion ? {} : {
                  y: [0, 8, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
              >
                ✈️
              </motion.div>
              <motion.div
                className="absolute bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-2xl shadow-lg"
                animate={prefersReducedMotion ? {} : {
                  y: [0, 8, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
              >
                🚢
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white dark:from-slate-950 to-transparent z-10" />
    </section>
  );
}

export default HeroSection;
