/**
 * Community Hero Section
 *
 * Headline, subheadline, WhatsApp CTA, trust badges, and community stats.
 * Warm, welcoming dark gradient with floating message bubbles.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Activity, Globe, ShieldCheck, MessageCircle, Star, Phone } from 'lucide-react';
import { communityStats } from '../data';

const WHATSAPP_LINK =
  'https://wa.me/22376696177?text=Bonjour%2C%20je%20souhaite%20rejoindre%20la%20communaut%C3%A9%20ChinaLink';

function WhatsAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function FloatingBubble({
  delay,
  duration,
  size,
  left,
}: {
  delay: number;
  duration: number;
  size: number;
  left: string;
}) {
  return (
    <motion.div
      className="absolute rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
      style={{ width: size, height: size, left, bottom: '-10%' }}
      animate={{ y: [0, -700], opacity: [0, 0.6, 0.6, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <MessageCircle className="w-1/3 h-1/3 text-white/20" />
      </div>
    </motion.div>
  );
}

export function CommunityHero() {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
      {/* Animated background bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingBubble delay={0} duration={12} size={60} left="10%" />
        <FloatingBubble delay={2} duration={15} size={80} left="25%" />
        <FloatingBubble delay={4} duration={11} size={50} left="40%" />
        <FloatingBubble delay={1} duration={14} size={70} left="55%" />
        <FloatingBubble delay={3} duration={13} size={55} left="70%" />
        <FloatingBubble delay={5} duration={16} size={90} left="85%" />
        <FloatingBubble delay={6} duration={12} size={45} left="15%" />
        <FloatingBubble delay={7} duration={15} size={65} left="50%" />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 text-amber-300 rounded-full text-sm font-semibold mb-6 border border-amber-500/20"
          >
            <Users className="w-4 h-4" />
            Communauté privée
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Rejoignez{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
              2,400+
            </span>{' '}
            importateurs africains
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            Échangez conseils, découvrez des fournisseurs vérifiés, recevez des alertes
            arnaques et bénéficiez de la force de l&apos;achat groupé. Chaque jour sur WhatsApp.
          </p>

          {/* WhatsApp CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#25D366] to-emerald-500 text-white rounded-2xl font-bold text-lg hover:from-[#128C7E] hover:to-emerald-600 transition-all duration-300 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105"
            >
              <WhatsAppIcon className="w-6 h-6" />
              Rejoindre sur WhatsApp
            </a>

            <a
              href={`tel:+22376696177`}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/10 text-white rounded-2xl font-semibold text-base hover:bg-white/20 transition-all duration-300 border border-white/10"
            >
              <Phone className="w-5 h-5" />
              +223 76 69 61 77
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            {[
              { icon: ShieldCheck, text: 'Membres vérifiés' },
              { icon: Star, text: 'Conseils quotidiens' },
              { icon: MessageCircle, text: 'Alertes arnaques' },
            ].map((badge) => (
              <div
                key={badge.text}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 backdrop-blur-sm rounded-full text-slate-300 text-sm border border-white/10"
              >
                <badge.icon className="w-4 h-4 text-amber-400" />
                {badge.text}
              </div>
            ))}
          </motion.div>

          {/* Social Proof Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-white font-bold text-xl">{communityStats.memberCount.toLocaleString()}+</div>
              <div className="text-xs text-slate-400">Membres</div>
            </div>

            <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <Activity className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="text-white font-bold text-xl">{communityStats.activeTopics}</div>
              <div className="text-xs text-slate-400">Sujets actifs</div>
            </div>

            <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-white font-bold text-xl">{communityStats.dailyMessages}+</div>
              <div className="text-xs text-slate-400">Messages/jour</div>
            </div>

            <div className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                <Globe className="w-5 h-5 text-violet-400" />
              </div>
              <div className="text-white font-bold text-xl">{communityStats.countriesRepresented}</div>
              <div className="text-xs text-slate-400">Pays représentés</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
