/**
 * WhatsApp Join CTA Section
 *
 * Large final CTA with WhatsApp button, trust pills, and emerald gradient background.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Check, MessageCircle } from 'lucide-react';
import { useAnimationActivation } from '@/hooks/useAnimationActivation';

const WHATSAPP_LINK =
  'https://wa.me/8616621150801?text=Bonjour%2C%20je%20souhaite%20rejoindre%20la%20communaut%C3%A9%20ChinaLink';

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

export function WhatsAppJoinCTA() {
  const t = useTranslations('community');
  const { ref, isActive } = useAnimationActivation({
    threshold: 0.2,
    delay: 100,
  });

  const trustPills = [
    {
      key: 'free',
      defaultValue: 'Gratuit',
    },
    {
      key: 'noCommitment',
      defaultValue: 'Sans engagement',
    },
    {
      key: 'active247',
      defaultValue: 'Actif 24/7',
    },
  ];

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700">
        {/* Decorative orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-emerald-400/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isActive ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-8"
          >
            <MessageCircle className="w-8 h-8 text-white" />
          </motion.div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {t('cta.headline', {
              defaultValue:
                'Votre premier conteneur commence par une conversation',
            })}
          </h2>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto mb-10">
            {t('cta.subheadline', {
              defaultValue: 'Rejoignez +500 importateurs. C\'est gratuit.',
            })}
          </p>

          {/* WhatsApp Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="mb-8"
          >
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-emerald-700 rounded-2xl font-bold text-lg hover:bg-emerald-50 transition-all duration-300 shadow-2xl shadow-black/20 hover:shadow-black/30 hover:scale-105"
            >
              <WhatsAppIcon className="w-6 h-6" />
              {t('cta.button', { defaultValue: 'Rejoindre sur WhatsApp' })}
            </a>
          </motion.div>

          {/* Trust Pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isActive ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {trustPills.map((pill) => (
              <div
                key={pill.key}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium border border-white/10"
              >
                <Check className="w-4 h-4 text-emerald-300" />
                {t(`cta.${pill.key}`, { defaultValue: pill.defaultValue })}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
