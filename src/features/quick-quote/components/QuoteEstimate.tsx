/**
 * Quote Estimate
 * 
 * Displays estimated price with breakdown, delivery time, and action buttons.
 * Part of the quick-quote feature.
 */

'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  Package, 
  Shield, 
  FileText, 
  Clock, 
  Share2, 
  Bookmark,
  MessageCircle,
  ArrowRight,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQuickQuote } from '../hooks/useQuickQuote';
import { useQuickQuoteStore } from '../store/useQuickQuoteStore';

/**
 * Format price in USD
 */
function formatPriceUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format date
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Quote Estimate Component
 */
export function QuoteEstimate() {
  const { estimate, formData } = useQuickQuote();
  const { submitSuccess } = useQuickQuoteStore();

  if (!estimate) {
    return (
      <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-center">
        <Package className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Complétez les informations pour obtenir une estimation
        </p>
      </div>
    );
  }

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: 'Devis ChinaLink Express',
        text: `Estimation pour ${formData.origin} → ${formData.destination}: ${formatPriceUSD(estimate.price.amount)}`,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      const text = `Devis ChinaLink Express\nRoute: ${formData.origin} → ${formData.destination}\nService: ${formData.service}\nEstimation: ${formatPriceUSD(estimate.price.amount)}\nDélai: ${estimate.estimatedDays} jours`;
      navigator.clipboard.writeText(text);
      // Show toast notification would go here
    }
  }, [estimate, formData]);

  const handleSave = useCallback(() => {
    // Quote is automatically saved to recent quotes on submission
    // This could trigger a toast or other feedback
  }, []);

  const handleWhatsApp = useCallback(() => {
    const text = encodeURIComponent(
      `Bonjour, j'ai obtenu un devis estimé de ${formatPriceUSD(estimate.price.amount)} ` +
      `pour une expédition de ${formData.origin} vers ${formData.destination}. ` +
      `Je souhaite obtenir un devis détaillé.`
    );
    window.open(`https://wa.me/8618851725957?text=${text}`, '_blank');
  }, [estimate, formData]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 space-y-4"
    >
      {/* Main Price Card */}
      <div className={cn(
        'rounded-2xl p-6 text-white',
        formData.service === 'air' && 'bg-gradient-to-br from-blue-500 to-blue-600',
        formData.service === 'sea' && 'bg-gradient-to-br from-cyan-500 to-cyan-600',
        formData.service === 'express' && 'bg-gradient-to-br from-amber-500 to-amber-600'
      )}>
        <div className="text-center mb-6">
          <p className="text-white/80 text-sm mb-1">Estimation totale</p>
          <div className="text-4xl font-bold">
            {formatPriceUSD(estimate.price.amount)}
          </div>
          <p className="text-white/70 text-sm mt-1">
            Validé jusqu&apos;au {formatDate(estimate.validUntil)}
          </p>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-2 bg-white/10 rounded-xl p-4">
          <BreakdownItem
            icon={DollarSign}
            label="Fret"
            amount={estimate.breakdown.freight}
          />
          <BreakdownItem
            icon={Package}
            label="Manutention"
            amount={estimate.breakdown.handling}
          />
          <BreakdownItem
            icon={Shield}
            label="Assurance"
            amount={estimate.breakdown.insurance}
          />
          <BreakdownItem
            icon={FileText}
            label="Douane"
            amount={estimate.breakdown.customs}
          />
          <div className="border-t border-white/20 pt-2 mt-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total</span>
              <span className="font-bold text-lg">
                {formatPriceUSD(estimate.price.amount)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Info */}
      <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
          <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Délai estimé</p>
          <p className="font-semibold text-gray-900 dark:text-white">
            {estimate.estimatedDays} jours
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>Livraison estimée</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleShare}
          className={cn(
            'flex items-center justify-center gap-2 px-4 py-3 rounded-xl',
            'border-2 border-gray-200 dark:border-gray-700',
            'text-gray-700 dark:text-gray-300 font-medium',
            'hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
          )}
        >
          <Share2 className="w-4 h-4" />
          Partager
        </button>
        <button
          onClick={handleSave}
          className={cn(
            'flex items-center justify-center gap-2 px-4 py-3 rounded-xl',
            'border-2 border-gray-200 dark:border-gray-700',
            'text-gray-700 dark:text-gray-300 font-medium',
            'hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
          )}
        >
          <Bookmark className="w-4 h-4" />
          Sauvegarder
        </button>
      </div>

      {/* WhatsApp CTA */}
      <button
        onClick={handleWhatsApp}
        className={cn(
          'w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl',
          'bg-green-500 hover:bg-green-600 text-white font-semibold',
          'transition-colors shadow-lg shadow-green-500/25'
        )}
      >
        <MessageCircle className="w-5 h-5" />
        Demander un devis détaillé
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* Disclaimer */}
      <p className="text-xs text-center text-gray-400 dark:text-gray-500">
        Cette estimation est indicative. Le prix final peut varier selon 
        les caractéristiques exactes de votre envoi.
      </p>
    </motion.div>
  );
}

// Breakdown item component
interface BreakdownItemProps {
  icon: typeof DollarSign;
  label: string;
  amount: number;
}

function BreakdownItem({ icon: Icon, label, amount }: BreakdownItemProps) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-white/70" />
        <span className="text-white/80">{label}</span>
      </div>
      <span className="font-medium">{formatPriceUSD(amount)}</span>
    </div>
  );
}

export default QuoteEstimate;
