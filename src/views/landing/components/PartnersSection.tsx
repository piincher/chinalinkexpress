/**
 * Partners Section Component
 *
 * Infinite scrolling partner logos with smooth animations,
 * hover effects, and gradient masks.
 * Part of the landing page feature.
 *
 * READABILITY FIXES:
 * - Partner logos now have proper backgrounds for visibility
 * - Dark mode support for logo containers
 * - Gradient masks using CSS variables
 * - Trust indicator text uses CSS variables
 * - WCAG AA compliant contrast
 */

"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { AnimatedSection, SplitText } from "@/components/animations";
import { PARTNERS, SECTION_IDS } from "../constants";
import type { Partner } from "@/types";

// Partner logo with hover effect - FIXED: proper dark mode backgrounds
function PartnerLogo({ partner, index }: { partner: Partner; index: number }) {
   return (
      <motion.div
         className="group relative bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-md flex items-center justify-center h-28"
         initial={{ opacity: 0, scale: 0.8 }}
         whileInView={{ opacity: 1, scale: 1 }}
         viewport={{ once: true }}
         transition={{ delay: index * 0.05, type: "spring" }}
         whileHover={{
            scale: 1.05,
            y: -5,
            boxShadow: "var(--shadow-xl)",
         }}
      >
         {/* Hover glow effect */}
         <motion.div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-primary-light)]/10 opacity-0 group-hover:opacity-100 transition-opacity" />

         <motion.div
            className="relative z-10 grayscale group-hover:grayscale-0 transition-all duration-500"
            whileHover={{ scale: 1.1 }}
         >
            <Image
               width={120}
               height={60}
               src={partner.logo}
               alt={partner.name}
               className="max-h-12 object-contain"
            />
         </motion.div>

         {/* Partner name tooltip - FIXED: uses CSS variables */}
         <motion.div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-[var(--text-primary)] text-[var(--text-inverse)] text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
            initial={{ y: 10 }}
            whileHover={{ y: 0 }}
         >
            {partner.name}
         </motion.div>
      </motion.div>
   );
}

// Infinite scroll row component - FIXED: dark mode gradient masks
function InfiniteScrollRow({
   partners,
   direction = "left",
   speed = 30,
}: {
   partners: Partner[];
   direction?: "left" | "right";
   speed?: number;
}) {
   // Double the partners for seamless loop
   const doubledPartners = [...partners, ...partners];

   return (
      <div className="relative overflow-hidden py-4">
         {/* FIXED: Gradient masks using CSS variables for proper theming */}
         <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--surface)] to-transparent z-10 pointer-events-none" />
         <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--surface)] to-transparent z-10 pointer-events-none" />

         <motion.div
            className="flex gap-6"
            animate={{
               x:
                  direction === "left"
                     ? [0, -50 * partners.length + "%"]
                     : [-50 * partners.length + "%", 0],
            }}
            transition={{
               x: {
                  duration: speed,
                  repeat: Infinity,
                  ease: "linear",
               },
            }}
         >
            {doubledPartners.map((partner, index) => (
               <div key={`${partner.id}-${index}`} className="flex-shrink-0 w-48">
                  {/* FIXED: Consistent background in both modes */}
                  <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4 shadow-sm h-24 flex items-center justify-center grayscale hover:grayscale-0 transition-all hover:shadow-lg hover:scale-105">
                     <Image
                        width={120}
                        height={60}
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-10 object-contain"
                     />
                  </div>
               </div>
            ))}
         </motion.div>
      </div>
   );
}

export function PartnersSection() {
   const t = useTranslations("partners");

   // Split partners into two rows for bidirectional scrolling
   const midPoint = Math.ceil(PARTNERS.length / 2);
   const topRow = PARTNERS.slice(0, midPoint);
   const bottomRow = PARTNERS.slice(midPoint);

   return (
      <section
         id={SECTION_IDS.PARTNERS}
         className="relative py-24 overflow-hidden bg-[var(--surface)]"
      >
         {/* Decorative elements using CSS variables */}
         <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--border-strong)] to-transparent" />
         <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--border-strong)] to-transparent" />

         <div className="relative">
            {/* Section Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
               <AnimatedSection>
                  <span className="inline-block px-4 py-1.5 bg-[var(--color-primary-50)] text-[var(--color-primary-700)] rounded-full text-sm font-semibold mb-4">
                     {t("sectionLabel") || "Nos Partenaires"}
                  </span>
               </AnimatedSection>

               <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
                  <SplitText animation="fadeUp">{t("title")}</SplitText>
               </h2>

               <AnimatedSection delay={0.2}>
                  <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
                     {t("subtitle")}
                  </p>
               </AnimatedSection>

               <motion.div
                  className="w-24 h-1.5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] mx-auto mt-6 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: 96 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
               />
            </div>

            {/* Infinite Scroll Rows */}
            <div className="space-y-4 mb-16">
               <InfiniteScrollRow partners={topRow} direction="left" speed={40} />
               <InfiniteScrollRow partners={bottomRow} direction="right" speed={35} />
            </div>

            {/* Static Grid for Mobile */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:hidden">
               <div className="grid grid-cols-2 gap-4">
                  {PARTNERS.map((partner, index) => (
                     <PartnerLogo key={partner.id} partner={partner} index={index} />
                  ))}
               </div>
            </div>

            {/* Trust indicators - FIXED: uses CSS variables */}
            <motion.div
               className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16"
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.5 }}
            >
               <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 shadow-lg">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                     {[
                        { value: "7+", label: "Années de partenariat" },
                        { value: "10+", label: "Compagnies maritimes" },
                        { value: "3", label: "Compagnies aériennes" },
                        { value: "95.5%", label: "Taux de satisfaction" },
                     ].map((stat, index) => (
                        <motion.div
                           key={stat.label}
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: 0.6 + index * 0.1 }}
                        >
                           <div className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-2">
                              {stat.value}
                           </div>
                           <div className="text-[var(--text-secondary)] text-sm">{stat.label}</div>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </motion.div>
         </div>
      </section>
   );
}

export default PartnersSection;
