/**
 * Trust Badges
 *
 * Grid of trust badges displaying credibility signals.
 * Animated on scroll into view with staggered entrance.
 * Part of the social-proof feature.
 */

"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { BadgeCheck, Shield, Headphones, Award, Users, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSocialProof } from "../hooks/useSocialProof";

interface TrustBadge {
   id: string;
   type: "verified" | "secure" | "support" | "experience" | "rating";
   label: string;
   icon: LucideIcon;
   description: string;
}

const trustBadges: TrustBadge[] = [
   {
      id: "verified",
      type: "verified",
      label: "Verified Business",
      icon: BadgeCheck,
      description: "Officially registered and verified",
   },
   {
      id: "secure",
      type: "secure",
      label: "Secure Payment",
      icon: Shield,
      description: "Bank-level encryption & security",
   },
   {
      id: "support",
      type: "support",
      label: "24/7 Support",
      icon: Headphones,
      description: "Round-the-clock assistance",
   },
   {
      id: "experience",
      type: "experience",
      label: "7+ Years Experience",
      icon: Award,
      description: "Since 2019 in logistics",
   },
   {
      id: "customers",
      type: "rating",
      label: "1000+ Customers",
      icon: Users,
      description: "Trusted by businesses across Africa",
   },
];

const containerVariants: Variants = {
   hidden: { opacity: 0 },
   visible: {
      opacity: 1,
      transition: {
         staggerChildren: 0.1,
         delayChildren: 0.2,
      },
   },
};

const itemVariants: Variants = {
   hidden: { opacity: 0, y: 20 },
   visible: {
      opacity: 1,
      y: 0,
      transition: {
         type: "spring" as const,
         stiffness: 300,
         damping: 24,
      },
   },
};

interface TrustBadgesProps {
   className?: string;
   variant?: "grid" | "row" | "compact";
   showDescriptions?: boolean;
}

export function TrustBadges({
   className,
   variant = "grid",
   showDescriptions = true,
}: TrustBadgesProps) {
   const { activityMetrics } = useSocialProof();

   // Update badge with dynamic data
   const dynamicBadges = trustBadges.map((badge) => {
      if (badge.id === "customers") {
         return {
            ...badge,
            label: `${activityMetrics.totalCustomers.toLocaleString()}+ Customers`,
         };
      }
      return badge;
   });

   const gridClasses = {
      grid: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4",
      row: "flex flex-wrap justify-center gap-4",
      compact: "flex flex-wrap justify-center gap-2",
   };

   return (
      <motion.div
         variants={containerVariants}
         initial="hidden"
         whileInView="visible"
         viewport={{ once: true, margin: "-50px" }}
         className={cn(gridClasses[variant], className)}
      >
         {dynamicBadges.map((badge) => (
            <TrustBadgeCard
               key={badge.id}
               badge={badge}
               variant={variant}
               showDescription={showDescriptions}
            />
         ))}
      </motion.div>
   );
}

interface TrustBadgeCardProps {
   badge: TrustBadge;
   variant: "grid" | "row" | "compact";
   showDescription: boolean;
}

function TrustBadgeCard({ badge, variant, showDescription }: TrustBadgeCardProps) {
   const Icon = badge.icon;

   const iconBgColors = {
      verified: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
      secure: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
      support: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
      experience: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
      rating: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400",
   };

   if (variant === "compact") {
      return (
         <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className={cn(
               "flex items-center gap-2 px-3 py-2 rounded-full",
               "bg-white dark:bg-slate-800",
               "border border-slate-200 dark:border-slate-700",
               "shadow-sm",
            )}
         >
            <Icon className={cn("w-4 h-4", iconBgColors[badge.type].split(" ")[1])} />
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
               {badge.label}
            </span>
         </motion.div>
      );
   }

   if (variant === "row") {
      return (
         <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -2 }}
            className={cn(
               "flex items-center gap-3 px-4 py-3 rounded-xl",
               "bg-white dark:bg-slate-800",
               "border border-slate-200 dark:border-slate-700",
               "shadow-sm hover:shadow-md transition-shadow",
            )}
         >
            <div className={cn("p-2 rounded-lg", iconBgColors[badge.type])}>
               <Icon className="w-5 h-5" />
            </div>
            <div>
               <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {badge.label}
               </p>
               {showDescription && (
                  <p className="text-xs text-slate-500 dark:text-slate-400">{badge.description}</p>
               )}
            </div>
         </motion.div>
      );
   }

   // Grid variant (default)
   return (
      <motion.div
         variants={itemVariants}
         whileHover={{ scale: 1.05, y: -4 }}
         className={cn(
            "flex flex-col items-center text-center p-5 rounded-2xl",
            "bg-white dark:bg-slate-800",
            "border border-slate-200 dark:border-slate-700",
            "shadow-sm hover:shadow-lg transition-all duration-300",
         )}
      >
         <motion.div
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
            className={cn(
               "w-14 h-14 rounded-full flex items-center justify-center mb-3",
               iconBgColors[badge.type],
            )}
         >
            <Icon className="w-7 h-7" />
         </motion.div>
         <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
            {badge.label}
         </h3>
         {showDescription && (
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
               {badge.description}
            </p>
         )}
      </motion.div>
   );
}

// Simple inline trust badge strip
interface TrustBadgeStripProps {
   className?: string;
}

export function TrustBadgeStrip({ className }: TrustBadgeStripProps) {
   const { activityMetrics } = useSocialProof();

   return (
      <div
         className={cn(
            "flex flex-wrap items-center justify-center gap-4 py-3",
            "text-sm text-slate-600 dark:text-slate-400",
            className,
         )}
      >
         <span className="flex items-center gap-1.5">
            <BadgeCheck className="w-4 h-4 text-blue-500" />
            Verified Business
         </span>
         <span className="hidden sm:inline text-slate-300">|</span>
         <span className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-green-500" />
            Secure Payment
         </span>
         <span className="hidden sm:inline text-slate-300">|</span>
         <span className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-pink-500" />
            {activityMetrics.totalCustomers.toLocaleString()}+ Customers
         </span>
      </div>
   );
}

export default TrustBadges;
