/**
 * CoverSection Component
 * 
 * The cover page of the personalized import guide.
 * Displays the title, user's score, category badge, and confidentiality notice.
 */

'use client';

import { motion } from 'framer-motion';
import { Shield, Calendar, User } from 'lucide-react';
import { LeadCategory } from '@/features/import-quiz/types';
import { LEAD_CATEGORIES } from '@/features/import-quiz/lib/constants';

interface CoverSectionProps {
  score: number;
  category: LeadCategory;
  generatedAt: string;
  userName?: string;
}

const categoryStyles = {
  hot: {
    gradient: 'from-emerald-500 to-teal-600',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-700',
    ringColor: '#10b981',
  },
  warm: {
    gradient: 'from-amber-500 to-orange-600',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-700',
    ringColor: '#f59e0b',
  },
  cold: {
    gradient: 'from-sky-500 to-blue-600',
    badgeBg: 'bg-sky-100',
    badgeText: 'text-sky-700',
    ringColor: '#0ea5e9',
  },
};

function ScoreRing({ score, color }: { score: number; color: string }) {
  const radius = 70;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  return (
    <svg
      className="absolute inset-0 -rotate-90"
      width="160"
      height="160"
      viewBox="0 0 160 160"
    >
      <circle
        cx="80"
        cy="80"
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth={strokeWidth}
      />
      <motion.circle
        cx="80"
        cy="80"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: circumference - progress }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />
    </svg>
  );
}

export function CoverSection({
  score,
  category,
  generatedAt,
  userName,
}: CoverSectionProps) {
  const styles = categoryStyles[category];
  const categoryInfo = LEAD_CATEGORIES[category];
  const formattedDate = new Date(generatedAt).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className="min-h-[297mm] relative overflow-hidden">
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${styles.gradient}`} />
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[297mm] px-12 py-16 text-white">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wider uppercase">
              Guide Officiel ChinaLink Express
            </span>
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            GUIDE PRATIQUE
          </h1>
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            IMPORTER DE CHINE
          </h2>
          <div className="w-24 h-1 bg-white/50 mx-auto mb-6" />
          <p className="text-xl font-light opacity-90">
            Mali Edition 2025
          </p>
        </motion.div>

        {/* Score Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div className="relative w-[160px] h-[160px] mx-auto mb-6">
            <ScoreRing score={score} color={styles.ringColor} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold">{score}</span>
              <span className="text-sm opacity-80">/ 100</span>
            </div>
          </div>

          {/* Category Badge */}
          <div className="flex justify-center">
            <span className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full ${styles.badgeBg} ${styles.badgeText} font-semibold`}>
              <span>{categoryInfo.emoji}</span>
              <span>{categoryInfo.label}</span>
            </span>
          </div>
        </motion.div>

        {/* Personalized Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm">
            <User className="w-5 h-5" />
            <span className="font-medium">
              Personnalisé pour {userName || 'vous'}
            </span>
          </div>
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-auto text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-2 text-sm opacity-80">
            <Calendar className="w-4 h-4" />
            <span>Généré le {formattedDate}</span>
          </div>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/80 text-xs">
            <Shield className="w-3 h-3" />
            <span className="font-medium">Confidentiel - Ne pas partager</span>
          </div>

          <div className="pt-4">
            <p className="text-lg font-semibold">ChinaLink Express</p>
            <p className="text-sm opacity-80">Votre pont vers la Chine</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CoverSection;
