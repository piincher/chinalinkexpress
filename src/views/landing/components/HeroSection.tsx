/**
 * Hero Section Component
 *
 * Ultimate hero section with layered animations.
 * Part of the landing page feature.
 */

"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useScrollTo } from "@/hooks/useScrollTo";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { SplitText, GlowText, MagneticButton } from "@/components/animations";
import { HeroAnimation, KineticTypography } from "@/features/hero-animation";
import { SECTION_IDS } from "../constants";

// Floating data orb component
function DataOrb({
   delay,
   x,
   y,
   size,
   color,
}: {
   delay: number;
   x: string;
   y: string;
   size: number;
   color: string;
}) {
   return (
      <motion.div
         className="absolute rounded-full blur-sm"
         style={{
            left: x,
            top: y,
            width: size,
            height: size,
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
         }}
         animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            y: [0, -20, 0],
         }}
         transition={{
            duration: 4,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
         }}
      />
   );
}

// Floating icon component
function FloatingIcon({
   icon,
   delay,
   x,
   y,
}: {
   icon: string;
   delay: number;
   x: string;
   y: string;
}) {
   return (
      <motion.div
         className="absolute text-4xl"
         style={{ left: x, top: y }}
         animate={{
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0],
         }}
         transition={{
            duration: 5,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
         }}
      >
         {icon}
      </motion.div>
   );
}

// Stats counter with animation
function AnimatedStat({
   value,
   label,
   suffix = "",
}: {
   value: number;
   label: string;
   suffix?: string;
}) {
   const [count, setCount] = useState(0);
   const ref = useRef<HTMLDivElement>(null);
   const [hasAnimated, setHasAnimated] = useState(false);

   useEffect(() => {
      const observer = new IntersectionObserver(
         ([entry]) => {
            if (entry.isIntersecting && !hasAnimated) {
               setHasAnimated(true);
               const duration = 2000;
               const steps = 60;
               const increment = value / steps;
               let current = 0;

               const timer = setInterval(() => {
                  current += increment;
                  if (current >= value) {
                     setCount(value);
                     clearInterval(timer);
                  } else {
                     setCount(Math.floor(current));
                  }
               }, duration / steps);
            }
         },
         { threshold: 0.5 },
      );

      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
   }, [value, hasAnimated]);

   return (
      <motion.div
         ref={ref}
         className="text-center"
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
      >
         <div className="text-4xl md:text-5xl font-bold text-white mb-2">
            {count}
            {suffix}
         </div>
         <div className="text-blue-200 text-sm uppercase tracking-wider">{label}</div>
      </motion.div>
   );
}

// Client-side only parallax wrapper
function ParallaxHero({ children }: { children: React.ReactNode }) {
   const [scrollY, setScrollY] = useState(0);
   const [isMounted, setIsMounted] = useState(false);

   useEffect(() => {
      setIsMounted(true);
      const handleScroll = () => setScrollY(window.scrollY);
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   if (!isMounted) {
      return <>{children}</>;
   }

   const opacity = Math.max(0, 1 - scrollY / 600);
   const y = scrollY * 0.5;

   return <motion.div style={{ y, opacity }}>{children}</motion.div>;
}

export function HeroSection() {
   const t = useTranslations();
   const { scrollToElement } = useScrollTo();
   const isDesktop = useIsDesktop();
   const [isLoaded, setIsLoaded] = useState(false);

   useEffect(() => {
      setIsLoaded(true);
   }, []);

   const handleScrollToServices = () => {
      scrollToElement(SECTION_IDS.SERVICES);
   };

   return (
      <section
         id={SECTION_IDS.HERO}
         className="relative min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-hidden pt-20"
      >
         {/* Layer 1: Background Animation */}
         <div className="absolute inset-0 z-0">
            <HeroAnimation effectMode="combined" enableMindBlowing={true} />
         </div>

         {/* Layer 2: Floating Data Orbs */}
         <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
            <DataOrb delay={0} x="10%" y="20%" size={200} color="rgba(59, 130, 246, 0.3)" />
            <DataOrb delay={1} x="80%" y="30%" size={150} color="rgba(236, 72, 153, 0.2)" />
            <DataOrb delay={2} x="70%" y="70%" size={180} color="rgba(16, 185, 129, 0.2)" />
            <DataOrb delay={1.5} x="20%" y="60%" size={120} color="rgba(245, 158, 11, 0.2)" />
         </div>

         {/* Layer 3: Floating Icons */}
         <div className="absolute inset-0 z-[2] pointer-events-none hidden lg:block">
            <FloatingIcon icon="📦" delay={0} x="15%" y="40%" />
            <FloatingIcon icon="🚢" delay={0.5} x="75%" y="25%" />
            <FloatingIcon icon="✈️" delay={1} x="85%" y="60%" />
            <FloatingIcon icon="🌍" delay={1.5} x="10%" y="75%" />
         </div>

         {/* Layer 4: Gradient Overlays */}
         <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-blue-950/70 to-transparent z-[3]" />
         <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-blue-950/50 z-[3]" />

         {/* Content with parallax */}
         <ParallaxHero>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 min-h-screen flex items-center">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
                  {/* Left Content */}
                  <div className="space-y-8">
                     {/* Badge */}
                     <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={isLoaded ? { opacity: 1, scale: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
                     >
                        <motion.span
                           className="w-2 h-2 bg-green-400 rounded-full"
                           animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                           transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-sm font-medium text-blue-100">
                           {t("hero.badge") || "Opérationnel 24/7 • Livraison garantie"}
                        </span>
                     </motion.div>

                     {/* Headline */}
                     {isDesktop ? (
                        <div className="space-y-2">
                           <KineticTypography tier="high" />
                        </div>
                     ) : (
                        <div className="space-y-2">
                           <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black">
                              <SplitText delay={0.3} animation="fadeUp">
                                 CHINALINK
                              </SplitText>
                           </h1>
                           <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                              <GlowText color="#fbbf24">EXPRESS</GlowText>
                           </h2>
                        </div>
                     )}

                     {/* Subtitle */}
                     <motion.p
                        className="text-xl md:text-2xl text-blue-100 max-w-xl leading-relaxed"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.8 }}
                     >
                        {t("hero.subtitle")}
                     </motion.p>

                     {/* CTA Buttons */}
                     <motion.div
                        className="flex flex-col sm:flex-row gap-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 1 }}
                     >
                        <MagneticButton strength={15}>
                           <motion.a
                              href="https://wa.me/8618851725957"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group relative bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-2xl shadow-green-500/30 overflow-hidden inline-flex items-center gap-3"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                           >
                              <motion.span
                                 className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                 animate={{ x: ["-100%", "100%"] }}
                                 transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                              />
                              <motion.span
                                 animate={{ rotate: [0, -10, 10, 0] }}
                                 transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 5 }}
                              >
                                 📱
                              </motion.span>
                              <span className="relative">{t("cta.getQuote")}</span>
                           </motion.a>
                        </MagneticButton>

                        <motion.button
                           onClick={handleScrollToServices}
                           className="group relative border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all backdrop-blur-sm inline-flex items-center gap-3 overflow-hidden"
                           whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                           whileTap={{ scale: 0.95 }}
                        >
                           <span>{t("cta.discoverServices")}</span>
                           <motion.span
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                           >
                              →
                           </motion.span>
                        </motion.button>
                     </motion.div>

                     {/* Stats Row */}
                     <motion.div
                        className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10"
                        initial={{ opacity: 0 }}
                        animate={isLoaded ? { opacity: 1 } : {}}
                        transition={{ duration: 0.8, delay: 1.2 }}
                     >
                        <AnimatedStat
                           value={7}
                           suffix="+"
                           label={t("stats.experienceYears") || "Années d'expérience"}
                        />
                        <AnimatedStat value={1000} suffix="+" label={t("stats.satisfiedClients")} />
                        <AnimatedStat
                           value={95.5}
                           suffix="%"
                           label={t("stats.deliveryRate") || "Taux de livraison"}
                        />
                     </motion.div>
                  </div>

                  {/* Right Side - Visual Element */}
                  <motion.div
                     className="hidden lg:flex items-center justify-center relative"
                     initial={{ opacity: 0, scale: 0.8, x: 50 }}
                     animate={isLoaded ? { opacity: 1, scale: 1, x: 0 } : {}}
                     transition={{ duration: 1, delay: 0.5, type: "spring" }}
                  >
                     {/* Central rotating element */}
                     <div className="relative w-96 h-96">
                        {/* Outer ring */}
                        <motion.div
                           className="absolute inset-0 border-2 border-blue-500/30 rounded-full"
                           animate={{ rotate: 360 }}
                           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Middle ring */}
                        <motion.div
                           className="absolute inset-8 border-2 border-cyan-500/30 rounded-full"
                           animate={{ rotate: -360 }}
                           transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Inner ring */}
                        <motion.div
                           className="absolute inset-16 border-2 border-purple-500/30 rounded-full"
                           animate={{ rotate: 360 }}
                           transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Center content */}
                        <div className="absolute inset-24 flex items-center justify-center">
                           <motion.div
                              className="text-8xl"
                              animate={{
                                 scale: [1, 1.1, 1],
                                 rotate: [0, 5, -5, 0],
                              }}
                              transition={{ duration: 4, repeat: Infinity }}
                           >
                              🌏
                           </motion.div>
                        </div>

                        {/* Orbiting elements */}
                        {[0, 120, 240].map((deg, i) => (
                           <motion.div
                              key={deg}
                              className="absolute w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-blue-500/50"
                              style={{
                                 top: "50%",
                                 left: "50%",
                              }}
                              animate={{
                                 x: [0, Math.cos((deg * Math.PI) / 180) * 160],
                                 y: [0, Math.sin((deg * Math.PI) / 180) * 160],
                              }}
                              transition={{
                                 duration: 3,
                                 delay: i * 0.3,
                                 repeat: Infinity,
                                 repeatType: "reverse",
                                 ease: "easeInOut",
                              }}
                           >
                              {i === 0 ? "📦" : i === 1 ? "✈️" : "🚢"}
                           </motion.div>
                        ))}
                     </div>
                  </motion.div>
               </div>
            </div>
         </ParallaxHero>

         {/* Bottom Gradient Fade */}
         <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white dark:from-slate-950 to-transparent z-[4]" />

         {/* Scroll indicator */}
         <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: -20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 2 }}
         >
            <span className="text-white/60 text-sm">Scroll</span>
            <motion.div
               className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
               animate={{ opacity: [0.5, 1, 0.5] }}
               transition={{ duration: 2, repeat: Infinity }}
            >
               <motion.div
                  className="w-1.5 h-1.5 bg-white rounded-full"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
               />
            </motion.div>
         </motion.div>
      </section>
   );
}

export default HeroSection;
