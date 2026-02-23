/**
 * Quick Quote Button
 * 
 * Floating action button to navigate to WhatsApp for quotes.
 * Features pulse animation and responsive positioning.
 * Part of the quick-quote feature.
 */

'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickQuoteButtonProps {
  className?: string;
  showLabel?: boolean;
}

// WhatsApp number for quotes
const WHATSAPP_NUMBER = '+8618851725957';

/**
 * Navigate to WhatsApp with pre-filled quote message
 */
function navigateToWhatsApp() {
  const message = encodeURIComponent('Bonjour, je souhaite obtenir un devis pour une expédition. Pouvez-vous m\'aider ?');
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
}

/**
 * Quick Quote Floating Action Button
 * Navigates to WhatsApp when clicked
 */
export function QuickQuoteButton({ className, showLabel = true }: QuickQuoteButtonProps) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Track scroll position for visibility
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHasScrolled(currentScrollY > 100);
      
      // Hide when scrolling down, show when scrolling up (after initial scroll)
      if (currentScrollY > 300) {
        setIsVisible(currentScrollY < lastScrollY || currentScrollY < 500);
      } else {
        setIsVisible(true);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle button click - navigate to WhatsApp
  const handleClick = () => {
    navigateToWhatsApp();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className={cn(
            'fixed z-40',
            // Desktop: bottom-right
            'right-4 sm:right-6 lg:right-8',
            'bottom-4 sm:bottom-6 lg:bottom-8',
            // Mobile: centered at bottom when not showing label
            'sm:block',
            className
          )}
        >
          {/* Pulse Animation Ring */}
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-500/30"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-500/20"
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.3,
            }}
          />

          {/* Button */}
          <button
            onClick={handleClick}
            className={cn(
              'group relative flex items-center gap-3',
              'pl-4 pr-5 py-3 sm:py-4',
              'bg-blue-600 hover:bg-blue-700',
              'text-white font-semibold',
              'rounded-full shadow-lg shadow-blue-600/30',
              'hover:shadow-xl hover:shadow-blue-600/40',
              'transition-all duration-300',
              'focus:outline-none focus:ring-4 focus:ring-blue-500/30'
            )}
            aria-label="Obtenir un devis via WhatsApp"
          >
            {/* Icon */}
            <motion.div className="relative">
              <Calculator className="w-6 h-6" />
            </motion.div>

            {/* Label - Hidden on mobile, visible on hover for desktop */}
            {showLabel && (
              <span className={cn(
                'hidden sm:inline-block whitespace-nowrap',
                'max-w-0 sm:group-hover:max-w-[200px]',
                'overflow-hidden transition-all duration-300',
                'opacity-0 sm:group-hover:opacity-100'
              )}>
                Devis Express
              </span>
            )}

            {/* Always show text on larger screens */}
            <span className="sm:hidden">Devis</span>
            <span className="hidden lg:inline-block">Devis Express</span>
          </button>

          {/* Tooltip for first-time users */}
          {!hasScrolled && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 2 }}
              className={cn(
                'absolute bottom-full right-0 mb-3',
                'hidden sm:block'
              )}
            >
              <div className="relative bg-gray-900 text-white text-sm px-4 py-2 rounded-lg whitespace-nowrap">
                Devis rapide sur WhatsApp !
                <div className="absolute top-full right-6 -translate-x-1/2">
                  <div className="border-4 border-transparent border-t-gray-900" />
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Compact version of the quick quote button (for navbars, etc.)
 * Navigates to WhatsApp when clicked
 */
export function QuickQuoteButtonCompact({ className }: { className?: string }) {
  return (
    <button
      onClick={navigateToWhatsApp}
      className={cn(
        'flex items-center gap-2 px-4 py-2',
        'bg-blue-600 hover:bg-blue-700 text-white',
        'rounded-lg font-medium text-sm',
        'transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-blue-500/50',
        className
      )}
    >
      <Calculator className="w-4 h-4" />
      <span>Devis</span>
    </button>
  );
}

/**
 * Inline version of the quick quote button (for sections, CTAs)
 * Navigates to WhatsApp when clicked
 */
export function QuickQuoteButtonInline({ className }: { className?: string }) {
  return (
    <button
      onClick={navigateToWhatsApp}
      className={cn(
        'inline-flex items-center justify-center gap-2',
        'px-6 py-3 rounded-xl',
        'bg-gradient-to-r from-blue-600 to-blue-700',
        'hover:from-blue-700 hover:to-blue-800',
        'text-white font-semibold',
        'shadow-lg shadow-blue-600/25',
        'hover:shadow-xl hover:shadow-blue-600/30',
        'transition-all duration-300',
        'focus:outline-none focus:ring-4 focus:ring-blue-500/30',
        className
      )}
    >
      <Calculator className="w-5 h-5" />
      <span>Devis Express Gratuit</span>
    </button>
  );
}

export default QuickQuoteButton;
