/**
 * About Section Component
 *
 * Animated company information with parallax images,
 * counter animations, and scroll-triggered reveals.
 * Part of the landing page feature.
 *
 * READABILITY FIXES:
 * - Enhanced text contrast in both light and dark modes
 * - WCAG AA compliant color ratios
 * - Consistent use of CSS variables for theming
 * - Improved background/border separation
 */

"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { AnimatedSection, StaggerContainer, StaggerItem, SplitText } from "@/components/animations";
import { STATS } from "@/constants/appConstants";
import { SECTION_IDS } from "../constants";

// Animated counter component
function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
   const [count, setCount] = useState(0);
   const ref = useRef<HTMLSpanElement>(null);
   const isInView = useInView(ref, { once: true, amount: 0.5 });

   // Extract number from value (e.g., "99.9%" -> 99.9)
   const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
   const isPercentage = value.includes("%");
   const hasPlus = value.includes("+");
   const hasK = value.includes("k") || value.includes("K");

   useEffect(() => {
      if (!isInView) return;

      const duration = 2000;
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
         step++;
         current = Math.min(increment * step, numericValue);
         setCount(Number(current.toFixed(isPercentage ? 1 : 0)));

         if (step >= steps) {
            setCount(numericValue);
            clearInterval(timer);
         }
      }, duration / steps);

      return () => clearInterval(timer);
   }, [isInView, numericValue, isPercentage]);

   return (
      <span ref={ref}>
         {count}
         {suffix}
         {hasPlus ? "+" : ""}
         {hasK ? "k" : ""}
         {isPercentage ? "%" : ""}
      </span>
   );
}

// Stat card with hover effect - FIXED: improved contrast
function StatCard({ value, labelKey, index }: { value: string; labelKey: string; index: number }) {
   const t = useTranslations("stats");
   const colors = [
      "from-blue-600 to-cyan-500",
      "from-purple-600 to-pink-500",
      "from-green-600 to-emerald-500",
      "from-orange-600 to-yellow-500",
   ];

   return (
      <motion.div
         className="relative group"
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ delay: index * 0.1 }}
         whileHover={{ y: -5 }}
      >
         {/* Card with consistent background in both modes */}
         <div className="relative p-6 bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-lg overflow-hidden">
            {/* Subtle hover gradient overlay */}
            <motion.div
               className={`absolute inset-0 bg-gradient-to-br ${colors[index % colors.length]} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
            />

            {/* Value with high contrast gradient */}
            <div
               className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${colors[index % colors.length]} bg-clip-text text-transparent mb-2`}
            >
               <AnimatedCounter value={value} />
            </div>

            {/* Label with proper contrast - uses CSS variables */}
            <div className="text-[var(--text-secondary)] font-medium">{t(labelKey)}</div>

            {/* Decorative line */}
            <motion.div
               className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${colors[index % colors.length]}`}
               initial={{ width: 0 }}
               whileInView={{ width: "100%" }}
               viewport={{ once: true }}
               transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
            />
         </div>
      </motion.div>
   );
}

// Parallax image component - Client side only
function ParallaxImage({
   src,
   alt,
   width,
   height,
   className,
   speed = 0.5,
}: {
   src: string;
   alt: string;
   width: number;
   height: number;
   className?: string;
   speed?: number;
}) {
   const ref = useRef<HTMLDivElement>(null);
   const [offset, setOffset] = useState(0);
   const [isMounted, setIsMounted] = useState(false);

   useEffect(() => {
      setIsMounted(true);
      const handleScroll = () => {
         if (!ref.current) return;
         const rect = ref.current.getBoundingClientRect();
         const windowHeight = window.innerHeight;
         const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
         setOffset((progress - 0.5) * 100 * speed);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
   }, [speed]);

   return (
      <div ref={ref} className={`overflow-hidden ${className}`}>
         <motion.div
            animate={{ y: isMounted ? offset : 0 }}
            transition={{ type: "tween", ease: "linear" }}
            className="relative h-full"
         >
            <Image
               src={src}
               alt={alt}
               width={width}
               height={height}
               className="w-full h-full object-cover"
            />
         </motion.div>
      </div>
   );
}

export function AboutSection() {
   const t = useTranslations();
   const sectionRef = useRef<HTMLElement>(null);
   const [bgOffset, setBgOffset] = useState(0);
   const [isMounted, setIsMounted] = useState(false);

   useEffect(() => {
      setIsMounted(true);
      const handleScroll = () => {
         if (!sectionRef.current) return;
         const rect = sectionRef.current.getBoundingClientRect();
         const windowHeight = window.innerHeight;
         const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
         setBgOffset((progress - 0.5) * 100);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   return (
      <section
         ref={sectionRef}
         id={SECTION_IDS.ABOUT}
         className="relative py-24 md:py-32 overflow-hidden bg-[var(--surface)]"
      >
         {/* FIXED: Subtle background pattern without opacity issues */}
         <motion.div
            className="absolute inset-0"
            animate={{ y: isMounted ? bgOffset : 0 }}
            transition={{ type: "tween", ease: "linear" }}
         >
            {/* Grid pattern - uses CSS variables for consistency */}
            <div
               className="absolute inset-0"
               style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-primary-500) 1px, transparent 0)`,
                  backgroundSize: "40px 40px",
                  opacity: 0.08,
               }}
            />
         </motion.div>

         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16">
               <motion.span
                  className="inline-block px-4 py-1.5 bg-[var(--color-primary-100)] text-[var(--color-primary-700)] rounded-full text-sm font-semibold mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
               >
                  {t("about.sectionLabel") || "À Propos de Nous"}
               </motion.span>

               {/* FIXED: Uses CSS variables for guaranteed contrast */}
               <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
                  <SplitText animation="fadeUp">{t("about.title")}</SplitText>
               </h2>

               <motion.div
                  className="w-24 h-1.5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] mx-auto rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: 96 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
               />
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
               {/* Image Gallery with parallax */}
               <StaggerContainer className="order-2 lg:order-1" staggerDelay={0.15}>
                  <div className="grid grid-cols-1 gap-4">
                     <StaggerItem>
                        <motion.div
                           className="relative rounded-3xl overflow-hidden shadow-2xl"
                           whileHover={{ scale: 1.02 }}
                           transition={{ duration: 0.3 }}
                        >
                           <ParallaxImage
                              src="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/warehouse%20view.jpg"
                              alt="ChinaLink Express Warehouse"
                              width={600}
                              height={400}
                              className="w-full h-64 md:h-80"
                              speed={0.3}
                           />
                           {/* FIXED: Stronger gradient for text readability */}
                           <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                           <div className="absolute bottom-4 left-4 text-white">
                              <div className="text-sm font-medium text-white/90">
                                 Notre Entrepôt
                              </div>
                              <div className="text-lg font-bold text-white">
                                 Foshan lishui, Chine
                              </div>
                           </div>
                        </motion.div>
                     </StaggerItem>

                     <div className="grid grid-cols-2 gap-4">
                        <StaggerItem>
                           <motion.div
                              className="relative rounded-2xl overflow-hidden shadow-xl"
                              whileHover={{ scale: 1.05, y: -5 }}
                           >
                              <ParallaxImage
                                 src="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/view1.jpg"
                                 alt="Professional Team"
                                 width={300}
                                 height={200}
                                 className="w-full h-40"
                                 speed={0.5}
                              />
                           </motion.div>
                        </StaggerItem>

                        <StaggerItem>
                           <motion.div
                              className="relative rounded-2xl overflow-hidden shadow-xl"
                              whileHover={{ scale: 1.05, y: -5 }}
                           >
                              <ParallaxImage
                                 src="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/view2.jpg"
                                 alt="Advanced Technology"
                                 width={300}
                                 height={200}
                                 className="w-full h-40"
                                 speed={0.5}
                              />
                           </motion.div>
                        </StaggerItem>
                     </div>
                  </div>
               </StaggerContainer>

               {/* Text Content */}
               <div className="order-1 lg:order-2 space-y-6">
                  <AnimatedSection animation="slideRight" delay={0.2}>
                     {/* FIXED: Uses CSS variables for text colors */}
                     <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
                        {t("about.description1")}
                     </p>
                  </AnimatedSection>

                  <AnimatedSection animation="slideRight" delay={0.4}>
                     <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
                        {t("about.description2")}
                     </p>
                  </AnimatedSection>

                  {/* Feature highlights */}
                  <AnimatedSection animation="fadeUp" delay={0.6}>
                     <div className="flex flex-wrap gap-3 pt-4">
                        {["✅ Fiable", "⚡ Rapide", "🔒 Sécurisé", "💰 Compétitif"].map(
                           (tag, i) => (
                              <motion.span
                                 key={tag}
                                 className="px-4 py-2 bg-[var(--color-primary-50)] text-[var(--color-primary-700)] rounded-full text-sm font-medium border border-[var(--color-primary-100)]"
                                 initial={{ opacity: 0, scale: 0.8 }}
                                 whileInView={{ opacity: 1, scale: 1 }}
                                 viewport={{ once: true }}
                                 transition={{ delay: 0.8 + i * 0.1 }}
                                 whileHover={{
                                    scale: 1.05,
                                    backgroundColor: "var(--color-primary-100)",
                                 }}
                              >
                                 {tag}
                              </motion.span>
                           ),
                        )}
                     </div>
                  </AnimatedSection>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 pt-8">
                     <StatCard
                        value={STATS.SATISFIED_CLIENTS}
                        labelKey="satisfiedClients"
                        index={0}
                     />
                     <StatCard
                        value={STATS.COUNTRIES_SERVED}
                        labelKey="countriesServed"
                        index={1}
                     />
                     <StatCard value={STATS.SUCCESS_RATE} labelKey="successRate" index={2} />
                     <StatCard value={STATS.SUPPORT_HOURS} labelKey="support" index={3} />
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

export default AboutSection;
