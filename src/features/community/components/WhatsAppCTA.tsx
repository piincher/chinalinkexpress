/**
 * WhatsApp CTA Section
 *
 * Prominent WhatsApp invitation with QR placeholder, group benefits,
 * member avatars cluster, and "Active now" indicator.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, MessageCircle, QrCode, Users, Zap, ShieldCheck, Bell } from 'lucide-react';
import { useAnimationActivation } from '@/hooks/useAnimationActivation';

const WHATSAPP_LINK =
  'https://wa.me/22376696177?text=Bonjour%2C%20je%20souhaite%20rejoindre%20la%20communaut%C3%A9%20ChinaLink';

const benefits = [
  { icon: Zap, text: 'Conseils sourcing en temps réel', textEn: 'Real-time sourcing tips' },
  { icon: ShieldCheck, text: 'Alertes arnaques vérifiées', textEn: 'Verified scam alerts' },
  { icon: Users, text: 'Partage de conteneurs', textEn: 'Container sharing' },
  { icon: Bell, text: 'Promos fournisseurs exclusives', textEn: 'Exclusive supplier deals' },
];

const avatarColors = [
  'bg-amber-500',
  'bg-emerald-500',
  'bg-blue-500',
  'bg-rose-500',
  'bg-violet-500',
  'bg-cyan-500',
];

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

export function WhatsAppCTA() {
  const { ref, isActive } = useAnimationActivation({ threshold: 0.15, delay: 100 });

  return (
    <section ref={ref} className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-emerald-400/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isActive ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-6 border border-white/10">
              <MessageCircle className="w-4 h-4" />
              Groupe WhatsApp officiel
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Rejoignez le groupe en{' '}
              <span className="text-emerald-200">1 clic</span>
            </h2>

            <p className="text-lg text-emerald-100 mb-8 max-w-lg">
              Accédez instantanément à 2,400+ importateurs. Posez vos questions,
              partagez vos expériences et restez informé des meilleures opportunités.
            </p>

            {/* Benefits list */}
            <div className="space-y-4 mb-10">
              {benefits.map((benefit) => (
                <div key={benefit.text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-4 h-4 text-emerald-200" />
                  </div>
                  <span className="text-white/90 font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isActive ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-emerald-700 rounded-2xl font-bold text-lg hover:bg-emerald-50 transition-all duration-300 shadow-2xl shadow-black/20 hover:shadow-black/30 hover:scale-105"
              >
                <WhatsAppIcon className="w-6 h-6" />
                Rejoindre le groupe
              </a>
            </motion.div>
          </motion.div>

          {/* Right: QR + Avatars card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isActive ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              {/* QR Code Placeholder */}
              <div className="flex flex-col items-center mb-8">
                <div className="w-48 h-48 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-4">
                  <div className="text-center">
                    <QrCode className="w-16 h-16 text-slate-800 mx-auto mb-2" />
                    <p className="text-xs text-slate-500 font-medium px-4">
                      Scanner pour rejoindre
                    </p>
                  </div>
                </div>
                <p className="text-sm text-white/70">
                  Ou cliquez sur le bouton vert
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/20 mb-6" />

              {/* Member avatars cluster */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex -space-x-3">
                    {avatarColors.map((color, i) => (
                      <div
                        key={i}
                        className={`w-10 h-10 rounded-full ${color} border-2 border-emerald-600 flex items-center justify-center text-white text-xs font-bold`}
                      >
                        {['AK', 'FD', 'MT', 'BS', 'NC', 'IO'][i]}
                      </div>
                    ))}
                  </div>
                  <div className="ml-3">
                    <p className="text-white font-semibold text-sm">+2,400 membres</p>
                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                      </span>
                      <span className="text-emerald-200 text-xs font-medium">
                        Actif maintenant
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1 text-emerald-200 text-sm font-medium">
                    <Check className="w-4 h-4" />
                    Gratuit
                  </div>
                  <div className="flex items-center gap-1 text-emerald-200 text-sm font-medium">
                    <Check className="w-4 h-4" />
                    Sans engagement
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-emerald-400/20 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
