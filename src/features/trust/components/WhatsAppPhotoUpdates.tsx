/**
 * WhatsApp Photo Updates Section
 *
 * Highlights the rich media advantage: customers receive PHOTOS at each stage
 * via WhatsApp — not just text SMS notifications. Visual proof builds trust.
 *
 * 4 stages:
 * 1. Goods at warehouse (photo)
 * 2. Packed shipment (photo)
 * 3. Customs clearance (confirmation photo/doc)
 * 4. Delivery (photo at doorstep)
 *
 * Comparison: WhatsApp (rich media) vs SMS (text-only)
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import {
  Camera,
  Package,
  Boxes,
  FileCheck,
  Home,
  MessageCircle,
  Smartphone,
  CheckCircle2,
  XCircle,
  ImageIcon,
  Text,
} from 'lucide-react';
import { useAnimationActivation } from '@/hooks/animation';

interface PhotoStage {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  key: string;
  gradient: string;
  bgLight: string;
  bgDark: string;
  iconColor: string;
  imageUrl: string;
}

const STAGES: PhotoStage[] = [
  {
    icon: Boxes,
    key: 'warehouse',
    gradient: 'from-emerald-500 to-green-600',
    bgLight: 'bg-emerald-50',
    bgDark: 'dark:bg-emerald-900/20',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    imageUrl: 'https://chinalinkexpress1.nyc3.cdn.digitaloceanspaces.com/goods/entrepot.jpg',
  },
  {
    icon: Package,
    key: 'packed',
    gradient: 'from-teal-500 to-cyan-600',
    bgLight: 'bg-teal-50',
    bgDark: 'dark:bg-teal-900/20',
    iconColor: 'text-teal-600 dark:text-teal-400',
    imageUrl: 'https://chinalinkexpress1.nyc3.cdn.digitaloceanspaces.com/goods/pret.jpg',
  },
  {
    icon: FileCheck,
    key: 'customs',
    gradient: 'from-sky-500 to-blue-600',
    bgLight: 'bg-sky-50',
    bgDark: 'dark:bg-sky-900/20',
    iconColor: 'text-sky-600 dark:text-sky-400',
    imageUrl: 'https://chinalinkexpress1.nyc3.cdn.digitaloceanspaces.com/goods/douane.jpg',
  },
  {
    icon: Home,
    key: 'delivery',
    gradient: 'from-violet-500 to-purple-600',
    bgLight: 'bg-violet-50',
    bgDark: 'dark:bg-violet-900/20',
    iconColor: 'text-violet-600 dark:text-violet-400',
    imageUrl: 'https://chinalinkexpress1.nyc3.cdn.digitaloceanspaces.com/goods/ready.jpg',
  },
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

function PhotoStageCard({
  stage,
  index,
  isActive,
}: {
  stage: PhotoStage;
  index: number;
  isActive: boolean;
}) {
  const t = useTranslations('whatsappUpdates');
  const Icon = stage.icon;

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 30 }}
      animate={isActive ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.12 * index, ease: 'easeOut' }}
    >
      {/* WhatsApp-style message bubble */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-sm shadow-lg border border-gray-100 dark:border-gray-700 p-5 hover:shadow-xl transition-shadow duration-300">
        {/* Header: icon + stage name */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`w-10 h-10 rounded-xl ${stage.bgLight} ${stage.bgDark} flex items-center justify-center flex-shrink-0`}
          >
            <Icon className={`w-5 h-5 ${stage.iconColor}`} strokeWidth={2} />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              {t(`stages.${stage.key}.label`, {
                defaultValue: 'Étape ' + (index + 1),
              })}
            </p>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">
              {t(`stages.${stage.key}.title`)}
            </h4>
          </div>
        </div>

        {/* Photo area */}
        <div
          className={`relative rounded-xl overflow-hidden mb-3 bg-gradient-to-br ${stage.gradient} aspect-[4/3]`}
        >
          <Image
            src={stage.imageUrl}
            alt={t(`stages.${stage.key}.title`, { defaultValue: 'Photo' })}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {/* Subtle gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          {/* WhatsApp timestamp overlay */}
          <div className="absolute bottom-2 right-2 flex items-center gap-1">
            <span className="text-[10px] text-white/90 font-medium">
              {10 + index}:30
            </span>
            <CheckCircle2 className="w-3 h-3 text-blue-300" />
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
          {t(`stages.${stage.key}.description`)}
        </p>
      </div>
    </motion.div>
  );
}

export function WhatsAppPhotoUpdates() {
  const t = useTranslations('whatsappUpdates');
  const { ref, isActive } = useAnimationActivation({
    threshold: 0.12,
    delay: 100,
  });

  const whatsappFeatures = [
    { key: 'photos', icon: ImageIcon },
    { key: 'liveChat', icon: MessageCircle },
    { key: 'voice', icon: Smartphone },
    { key: 'location', icon: Camera },
  ];

  const smsFeatures = [
    { key: 'textOnly', icon: Text },
    { key: 'noPhotos', icon: XCircle },
    { key: 'noTracking', icon: XCircle },
    { key: 'delayed', icon: XCircle },
  ];

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-white dark:from-slate-950 via-gray-50 dark:via-slate-900 to-white dark:to-slate-950"
    >
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-200 dark:via-emerald-800 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-14 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-emerald-100 dark:from-emerald-900/30 to-green-100 dark:to-green-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-semibold mb-4">
            <WhatsAppIcon className="w-4 h-4" />
            {t('badge', { defaultValue: 'Mises à jour WhatsApp' })}
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('headline', {
              defaultValue: 'Vous voyez vos marchandises à chaque étape',
            })}
          </h2>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('subheadline', {
              defaultValue:
                'Pas de SMS vague. Des photos réelles de vos produits sur WhatsApp.',
            })}
          </p>

          <div className="w-24 h-1.5 bg-gradient-to-r from-emerald-500 to-green-500 mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Photo stages grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14 md:mb-18">
          {STAGES.map((stage, index) => (
            <PhotoStageCard
              key={stage.key}
              stage={stage}
              index={index}
              isActive={isActive}
            />
          ))}
        </div>

        {/* Comparison: WhatsApp vs SMS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden">
            {/* Top label */}
            <div className="px-6 py-3 bg-gradient-to-r from-gray-50 dark:from-gray-800 to-gray-100 dark:to-gray-750 border-b border-gray-100 dark:border-gray-700">
              <p className="text-center text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t('comparison.label', { defaultValue: 'La preuve visuelle bat le texte' })}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-gray-700">
              {/* WhatsApp column */}
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <WhatsAppIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">
                      {t('comparison.whatsapp.label', { defaultValue: 'ChinaLink (WhatsApp)' })}
                    </h4>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                      {t('comparison.whatsapp.badge', { defaultValue: 'Média riche' })}
                    </p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {whatsappFeatures.map(({ key, icon: Icon }) => (
                    <li key={key} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {t(`comparison.whatsapp.features.${key}`, {
                          defaultValue: key,
                        })}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* SMS column */}
              <div className="p-6 md:p-8 bg-gray-50/50 dark:bg-gray-900/30">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">
                      {t('comparison.sms.label', { defaultValue: 'Les autres (SMS)' })}
                    </h4>
                    <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                      {t('comparison.sms.badge', { defaultValue: 'Texte uniquement' })}
                    </p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {smsFeatures.map(({ key, icon: Icon }) => (
                    <li key={key} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <XCircle className="w-3 h-3 text-gray-400 dark:text-gray-500" />
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {t(`comparison.sms.features.${key}`, {
                          defaultValue: key,
                        })}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="px-6 py-4 bg-gradient-to-r from-emerald-50 dark:from-emerald-900/20 to-green-50 dark:to-green-900/20 border-t border-gray-100 dark:border-gray-700">
              <p className="text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                {t('comparison.cta', {
                  defaultValue:
                    'Visual proof > text notification. Vous méritez de voir ce que vous payez.',
                })}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default WhatsAppPhotoUpdates;
