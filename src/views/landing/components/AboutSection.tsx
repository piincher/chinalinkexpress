/**
 * About Section Component
 *
 * Static company information section with clean layout.
 * Part of the landing page feature.
 */

"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { SECTION_IDS } from "../constants";

export function AboutSection() {
   const t = useTranslations();

   return (
      <section
         id={SECTION_IDS.ABOUT}
         className="relative py-24 md:py-32 overflow-hidden bg-[var(--surface)]"
      >
         {/* Subtle background pattern */}
         <div className="absolute inset-0">
            <div
               className="absolute inset-0"
               style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-primary-500) 1px, transparent 0)`,
                  backgroundSize: "40px 40px",
                  opacity: 0.08,
               }}
            />
         </div>

         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-16">
               <span className="inline-block px-4 py-1.5 bg-[var(--color-primary-100)] text-[var(--color-primary-700)] rounded-full text-sm font-semibold mb-4">
                  {t("about.sectionLabel") || "À Propos de Nous"}
               </span>

               <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6">
                  {t("about.title")}
               </h2>

               <div
                  className="w-24 h-1.5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] mx-auto rounded-full"
                  style={{ width: "96px" }}
               />
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
               {/* Image Gallery */}
               <div className="order-2 lg:order-1">
                  <div className="grid grid-cols-1 gap-4">
                     <div className="relative rounded-3xl overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-[1.02]">
                        <Image
                           src="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/warehouse%20view.jpg"
                           alt="ChinaLink Express Warehouse"
                           width={600}
                           height={400}
                           className="w-full h-64 md:h-80 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-4 left-4 text-white">
                           <div className="text-sm font-medium text-white/90">
                              Notre Entrepôt
                           </div>
                           <div className="text-lg font-bold text-white">
                              Foshan lishui, Chine
                           </div>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                        <div className="relative rounded-2xl overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105 hover:-translate-y-1">
                           <Image
                              src="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/view1.jpg"
                              alt="Professional Team"
                              width={300}
                              height={200}
                              className="w-full h-40 object-cover"
                           />
                        </div>

                        <div className="relative rounded-2xl overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105 hover:-translate-y-1">
                           <Image
                              src="https://chinalinkexpress.nyc3.cdn.digitaloceanspaces.com/airshipping/view2.jpg"
                              alt="Advanced Technology"
                              width={300}
                              height={200}
                              className="w-full h-40 object-cover"
                           />
                        </div>
                     </div>
                  </div>
               </div>

               {/* Text Content */}
               <div className="order-1 lg:order-2 space-y-6">
                  <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
                     {t("about.description1")}
                  </p>

                  <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed">
                     {t("about.description2")}
                  </p>

                  {/* Feature highlights */}
                  <div className="flex flex-wrap gap-3 pt-4">
                     {["✅ Fiable", "⚡ Rapide", "🔒 Sécurisé", "💰 Compétitif"].map((tag) => (
                        <span
                           key={tag}
                           className="px-4 py-2 bg-[var(--color-primary-50)] text-[var(--color-primary-700)] rounded-full text-sm font-medium border border-[var(--color-primary-100)] transition-all duration-300 hover:scale-105 hover:bg-[var(--color-primary-100)]"
                        >
                           {tag}
                        </span>
                     ))}
                  </div>


               </div>
            </div>
         </div>
      </section>
   );
}

export default AboutSection;
