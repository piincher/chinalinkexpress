/**
 * WhatsApp Button Component
 * 
 * A reusable WhatsApp call-to-action button with multiple variants and sizes.
 * Opens WhatsApp with a pre-filled message on click.
 * 
 * @example
 * // Primary button (default)
 * <WhatsAppButton message="Hello!" />
 * 
 * // Floating action button
 * <WhatsAppButton variant="floating" />
 * 
 * // Large size
 * <WhatsAppButton size="lg" />
 */

'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { generateWhatsAppLink } from '../../lib/whatsapp';
import { QUIZ_CONFIG } from '../../lib/constants';

/**
 * Default pre-filled message for guide context
 */
const DEFAULT_GUIDE_MESSAGE = "Bonjour ChinaLink, j'ai lu votre guide et je suis intéressé par l'import.";

/**
 * WhatsApp business phone number from config
 */
const WHATSAPP_NUMBER = QUIZ_CONFIG.whatsappBusinessNumber;

export interface WhatsAppButtonProps {
  /** Pre-filled message to open in WhatsApp */
  message?: string;
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Button variant */
  variant?: 'primary' | 'floating';
  /** Additional CSS classes */
  className?: string;
  /** Click handler (optional, called before opening WhatsApp) */
  onClick?: () => void;
}

/**
 * WhatsApp Button Component
 * 
 * Opens WhatsApp click-to-chat link with pre-filled message.
 * Features hover animations and multiple sizing options.
 */
export function WhatsAppButton({
  message = DEFAULT_GUIDE_MESSAGE,
  size = 'md',
  variant = 'primary',
  className,
  onClick,
}: WhatsAppButtonProps) {
  // Generate WhatsApp link with pre-filled message
  const whatsappUrl = generateWhatsAppLink(WHATSAPP_NUMBER, message);

  // Size configurations
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  // Icon sizes based on button size
  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  // Handle click - open WhatsApp in new tab
  const handleClick = () => {
    onClick?.();
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // Primary button variant
  if (variant === 'primary') {
    return (
      <motion.button
        onClick={handleClick}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center gap-2',
          'font-semibold text-white',
          'rounded-xl',
          'bg-gradient-to-r from-green-600 to-green-500',
          'shadow-lg shadow-green-200',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2',
          // Size
          sizeClasses[size],
          // Hover states
          'hover:from-green-700 hover:to-green-600',
          'hover:shadow-xl hover:shadow-green-200',
          // Active state
          'active:from-green-800 active:to-green-700',
          className
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Discuter sur WhatsApp"
      >
        <MessageCircle 
          size={iconSizes[size]} 
          className="flex-shrink-0"
          aria-hidden="true"
        />
        <span>Discuter sur WhatsApp</span>
      </motion.button>
    );
  }

  // Floating action button variant (fixed position)
  return (
    <motion.button
      onClick={handleClick}
      className={cn(
        // Fixed positioning
        'fixed bottom-6 right-6 z-50',
        // Base styles
        'inline-flex items-center justify-center gap-2',
        'font-semibold text-white',
        'rounded-full',
        'bg-gradient-to-r from-green-600 to-green-500',
        'shadow-xl shadow-green-300',
        'transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2',
        // Size (floating uses fixed dimensions)
        'px-5 py-4',
        // Hover states
        'hover:from-green-700 hover:to-green-600',
        'hover:shadow-2xl hover:shadow-green-300',
        // Pulse animation ring
        'before:absolute before:inset-0 before:rounded-full',
        'before:bg-green-500 before:animate-ping before:opacity-20',
        className
      )}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: 1 
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Discuter sur WhatsApp"
    >
      <MessageCircle 
        size={24} 
        className="flex-shrink-0 relative z-10"
        aria-hidden="true"
      />
      <span className="relative z-10 hidden sm:inline">WhatsApp</span>
    </motion.button>
  );
}

export default WhatsAppButton;
