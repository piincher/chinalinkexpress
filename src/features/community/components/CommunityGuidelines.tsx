/**
 * Community Guidelines Section
 *
 * Simple, clear guidelines for community members.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Ban, ShieldCheck, Flag, HandHeart } from 'lucide-react';
import { useAnimationActivation } from '@/hooks/useAnimationActivation';

const guidelines = [
  {
    icon: Heart,
    title: 'Soyez respectueux',
    titleEn: 'Be respectful',
    description:
      'Traitez chaque membre avec courtoisie. Nous venons tous d\'horizons différents, mais nous partageons le même objectif.',
    descriptionEn:
      'Treat every member with courtesy. We all come from different backgrounds but share the same goal.',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
  },
  {
    icon: Ban,
    title: 'Pas de spam / promotion',
    titleEn: 'No spam / promotion',
    description:
      'Interdiction de publier des liens promotionnels non sollicités ou de spammer le groupe avec des messages répétitifs.',
    descriptionEn:
      'No unsolicited promotional links or repetitive spam messages.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
  {
    icon: ShieldCheck,
    title: 'Partagez des infos vérifiées',
    titleEn: 'Share verified info only',
    description:
      'Avant de partager une alerte fournisseur ou une info douanière, assurez-vous de sa source. La précision sauve des affaires.',
    descriptionEn:
      'Before sharing supplier alerts or customs info, verify the source. Accuracy saves businesses.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  {
    icon: Flag,
    title: 'Signalez les arnaques',
    titleEn: 'Report scams',
    description:
      'Si vous repérez un comportement suspect ou une arnaque, signalez-le immédiatement aux modérateurs.',
    descriptionEn:
      'If you spot suspicious behavior or a scam, report it to moderators immediately.',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
  },
  {
    icon: HandHeart,
    title: 'Aidez les nouveaux',
    titleEn: 'Help newcomers',
    description:
      'Nous avons tous été débutants. Accordez votre temps pour guider les nouveaux importateurs — la communauté grandit grâce à vous.',
    descriptionEn:
      'We all started as beginners. Take time to guide new importers — the community grows because of you.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
];

export function CommunityGuidelines() {
  const { ref, isActive } = useAnimationActivation({ threshold: 0.15, delay: 100 });

  return (
    <section ref={ref} className="relative py-20 md:py-28 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Règles de la communauté
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Quelques lignes directrices simples pour garder cet espace utile,
            respectueux et collaboratif pour tous les importateurs.
          </p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Guidelines grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {guidelines.map((guideline, index) => (
            <motion.div
              key={guideline.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group"
            >
              <div className="h-full bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300">
                <div
                  className={`w-12 h-12 rounded-xl ${guideline.bg} ${guideline.border} border flex items-center justify-center mb-5`}
                >
                  <guideline.icon className={`w-6 h-6 ${guideline.color}`} />
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  {guideline.title}
                </h3>

                <p className="text-sm text-slate-400 leading-relaxed">
                  {guideline.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
