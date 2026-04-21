/**
 * WhatsApp Section Component
 * 
 * A full-width call-to-action section promoting WhatsApp contact.
 * Features a green gradient background, benefits list, and prominent CTA button.
 * 
 * @example
 * // Basic usage
 * <WhatsAppSection />
 * 
 * // With QR code placeholder
 * <WhatsAppSection showQRCode />
 * 
 * // With custom message
 * <WhatsAppSection message="Custom message" />
 */

'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Clock, UserCheck, CalendarCheck, QrCode } from 'lucide-react';
import { cn } from '@/lib/utils';
import { WhatsAppButton } from './WhatsAppButton';

export interface WhatsAppSectionProps {
  /** Pre-filled message for WhatsApp */
  message?: string;
  /** Whether to show QR code placeholder */
  showQRCode?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Default pre-filled message for guide context
 */
const DEFAULT_MESSAGE = "Bonjour ChinaLink, j'ai lu votre guide et je suis intéressé par l'import.";

/**
 * Benefits list data
 */
const BENEFITS = [
  {
    icon: Clock,
    text: 'Réponse en 10 minutes',
    description: 'Notre équipe répond rapidement à vos questions',
  },
  {
    icon: UserCheck,
    text: 'Conseil personnalisé gratuit',
    description: 'Expertise import adaptée à votre situation',
  },
  {
    icon: CalendarCheck,
    text: 'Disponible 7j/7',
    description: 'De 8h à 20h, y compris week-ends',
  },
];

/**
 * WhatsApp Section Component
 * 
 * Full-width CTA section with:
 * - Green gradient background
 * - WhatsApp icon and headline
 * - Benefits list with icons
 * - Large CTA button
 * - Optional QR code placeholder
 */
export function WhatsAppSection({
  message = DEFAULT_MESSAGE,
  showQRCode = false,
  className,
}: WhatsAppSectionProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden',
        'py-16 sm:py-20 lg:py-24',
        className
      )}
      aria-labelledby="whatsapp-section-title"
    >
      {/* Green gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-500 to-emerald-500"
        aria-hidden="true"
      />
      
      {/* Subtle pattern overlay */}
      <div 
        className={cn(
          'absolute inset-0 opacity-10',
          'bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)]',
          'bg-[length:20px_20px]'
        )}
        aria-hidden="true"
      />
      
      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn(
          'flex flex-col lg:flex-row items-center gap-12 lg:gap-16',
          showQRCode ? 'justify-between' : 'justify-center'
        )}>
          
          {/* Main content */}
          <div className="flex-1 max-w-2xl text-center lg:text-left">
            {/* WhatsApp icon */}
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-6"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ 
                type: 'spring',
                stiffness: 260,
                damping: 20 
              }}
            >
              <MessageCircle 
                size={40} 
                className="text-white"
                aria-hidden="true"
              />
            </motion.div>

            {/* Headline */}
            <motion.h2
              id="whatsapp-section-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Discutez avec nous sur WhatsApp
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              className="text-lg sm:text-xl text-green-50 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Une question? Besoin d&apos;aide pour votre import? 
              Notre équipe est là pour vous accompagner.
            </motion.p>

            {/* Benefits list */}
            <motion.ul
              className="space-y-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {BENEFITS.map((benefit, index) => (
                <motion.li
                  key={index}
                  className={cn(
                    'flex items-start gap-4',
                    'p-4 rounded-xl bg-white/10 backdrop-blur-sm',
                    'transition-colors duration-200',
                    'hover:bg-white/20'
                  )}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.3 + (index * 0.1) 
                  }}
                >
                  {/* Icon */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                    <benefit.icon 
                      size={20} 
                      className="text-white"
                      aria-hidden="true"
                    />
                  </div>
                  
                  {/* Text content */}
                  <div className="text-left">
                    <p className="font-semibold text-white text-lg">
                      {benefit.text}
                    </p>
                    <p className="text-green-100 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <WhatsAppButton 
                message={message}
                size="lg"
                variant="primary"
                className={cn(
                  'bg-white text-green-600',
                  'hover:bg-green-50',
                  'shadow-xl shadow-green-900/20',
                  'hover:shadow-2xl hover:shadow-green-900/30',
                  'focus:ring-white'
                )}
              />
            </motion.div>

            {/* Trust note */}
            <motion.p
              className="mt-6 text-sm text-green-100"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              +500 importateurs nous font confiance chaque mois
            </motion.p>
          </div>

          {/* QR Code section (optional) */}
          {showQRCode && (
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div
                className={cn(
                  'bg-white rounded-2xl p-6 shadow-2xl',
                  'w-64 sm:w-72'
                )}
              >
                {/* QR Code placeholder */}
                <div
                  className={cn(
                    'aspect-square rounded-xl mb-4',
                    'bg-gradient-to-br from-gray-100 to-gray-200',
                    'flex flex-col items-center justify-center',
                    'border-2 border-dashed border-gray-300'
                  )}
                >
                  <QrCode 
                    size={64} 
                    className="text-gray-400 mb-2"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-gray-500 font-medium">
                    Scanner pour discuter
                  </span>
                </div>

                {/* Instructions */}
                <div className="text-center space-y-2">
                  <p className="font-semibold text-gray-900">
                    Scannez ce code
                  </p>
                  <p className="text-sm text-gray-600">
                    Ouvrez WhatsApp sur votre téléphone et scannez pour démarrer la conversation
                  </p>
                </div>

                {/* WhatsApp number hint */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-center text-gray-500">
                    Ou écrivez-nous au{' '}
                    <span className="font-medium text-green-600">
                      +86 188 5172 5957
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Decorative elements */}
      <div 
        className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div 
        className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl"
        aria-hidden="true"
      />
    </section>
  );
}

export default WhatsAppSection;
