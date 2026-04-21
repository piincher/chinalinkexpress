'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Package, 
  Laptop, 
  Smartphone, 
  Ship, 
  Lock,
  RefreshCw,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/common/button/Button';

// ============================================================================
// TYPES
// ============================================================================

interface PricingData {
  express: number;
  standard: number;
  electronics: number;
  phones: number;
  sea: number;
  seaUnit: 'CBM';
}

interface PricingSectionProps {
  prices?: PricingData;
  lastUpdated?: Date;
}

interface ShippingMode {
  key: keyof Omit<PricingData, 'seaUnit'>;
  name: string;
  icon: React.ElementType;
  unit: string;
  deliveryTime: string;
  description: string;
  highlighted?: boolean;
  color: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const SHIPPING_MODES: ShippingMode[] = [
  {
    key: 'express',
    name: 'Express',
    icon: Zap,
    unit: 'kg',
    deliveryTime: '3-5 jours',
    description: 'Livraison ultra-rapide pour urgences',
    highlighted: true,
    color: 'amber',
  },
  {
    key: 'standard',
    name: 'Standard',
    icon: Package,
    unit: 'kg',
    deliveryTime: '7-10 jours',
    description: 'Le meilleur rapport qualité/prix',
    color: 'blue',
  },
  {
    key: 'electronics',
    name: 'Électronique',
    icon: Laptop,
    unit: 'kg',
    deliveryTime: '7-12 jours',
    description: 'Spécial produits électroniques',
    color: 'emerald',
  },
  {
    key: 'phones',
    name: 'Téléphones',
    icon: Smartphone,
    unit: 'piece',
    deliveryTime: '5-8 jours',
    description: 'Smartphones et accessoires',
    color: 'purple',
  },
  {
    key: 'sea',
    name: 'Fret Maritime',
    icon: Ship,
    unit: 'CBM',
    deliveryTime: '45-60 jours',
    description: 'Pour les gros volumes',
    color: 'cyan',
  },
];

// ============================================================================
// LOADING SKELETON COMPONENT
// ============================================================================

function PricingCardSkeleton() {
  return (
    <div className={cn(
      'relative overflow-hidden rounded-2xl',
      'bg-gray-100 dark:bg-gray-800',
      'p-6 animate-pulse'
    )}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-700" />
        <div className="space-y-2">
          <div className="w-24 h-4 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="w-16 h-3 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="w-32 h-8 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="w-full h-3 rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
}

// ============================================================================
// PRICE CARD COMPONENT
// ============================================================================

interface PriceCardProps {
  mode: ShippingMode;
  price: number;
  index: number;
}

function PriceCard({ mode, price, index }: PriceCardProps) {
  const Icon = mode.icon;
  
  const colorVariants = {
    amber: {
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      border: 'border-amber-200 dark:border-amber-800',
      icon: 'bg-amber-100 dark:bg-amber-900/40',
      iconColor: 'text-amber-600 dark:text-amber-400',
      price: 'text-amber-700 dark:text-amber-300',
      gradient: 'from-amber-500/10 to-orange-500/10',
    },
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      icon: 'bg-blue-100 dark:bg-blue-900/40',
      iconColor: 'text-blue-600 dark:text-blue-400',
      price: 'text-blue-700 dark:text-blue-300',
      gradient: 'from-blue-500/10 to-indigo-500/10',
    },
    emerald: {
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      border: 'border-emerald-200 dark:border-emerald-800',
      icon: 'bg-emerald-100 dark:bg-emerald-900/40',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      price: 'text-emerald-700 dark:text-emerald-300',
      gradient: 'from-emerald-500/10 to-teal-500/10',
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      border: 'border-purple-200 dark:border-purple-800',
      icon: 'bg-purple-100 dark:bg-purple-900/40',
      iconColor: 'text-purple-600 dark:text-purple-400',
      price: 'text-purple-700 dark:text-purple-300',
      gradient: 'from-purple-500/10 to-pink-500/10',
    },
    cyan: {
      bg: 'bg-cyan-50 dark:bg-cyan-900/20',
      border: 'border-cyan-200 dark:border-cyan-800',
      icon: 'bg-cyan-100 dark:bg-cyan-900/40',
      iconColor: 'text-cyan-600 dark:text-cyan-400',
      price: 'text-cyan-700 dark:text-cyan-300',
      gradient: 'from-cyan-500/10 to-blue-500/10',
    },
  };

  const colors = colorVariants[mode.color as keyof typeof colorVariants];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn(
        'relative overflow-hidden rounded-2xl border-2 p-6',
        'transition-all duration-300',
        mode.highlighted 
          ? 'border-amber-300 dark:border-amber-700 shadow-xl shadow-amber-500/10 scale-105 z-10'
          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600',
        'bg-white dark:bg-gray-800'
      )}
    >
      {/* Background gradient for highlighted */}
      {mode.highlighted && (
        <div className={cn(
          'absolute inset-0 bg-gradient-to-br',
          colors.gradient,
          'opacity-50'
        )} />
      )}
      
      {/* Popular badge */}
      {mode.highlighted && (
        <div className="absolute -right-8 top-4 rotate-45">
          <div className="bg-amber-500 text-white text-xs font-bold px-10 py-1 shadow-lg">
            POPULAIRE
          </div>
        </div>
      )}

      <div className="relative">
        {/* Icon and title */}
        <div className="flex items-center gap-3 mb-4">
          <div className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center',
            colors.icon
          )}>
            {/* @ts-ignore */}
            <Icon className={cn('w-6 h-6', colors.iconColor)} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">
              {mode.name}
            </h3>
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <Clock className="w-3 h-3" />
              {mode.deliveryTime}
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="mb-3">
          <span className={cn(
            'text-3xl font-bold',
            colors.price
          )}>
            {price.toLocaleString('fr-FR')}
          </span>
          <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">
            FCFA / {mode.unit}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {mode.description}
        </p>
      </div>
    </motion.div>
  );
}

// ============================================================================
// COMPARISON TABLE COMPONENT
// ============================================================================

interface ComparisonTableProps {
  prices: PricingData;
}

function ComparisonTable({ prices }: ComparisonTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="mt-8 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700"
    >
      <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h4 className="font-semibold text-gray-900 dark:text-white">
          Comparaison des modes d&apos;expédition
        </h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-gray-800/30">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Mode
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Prix
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Délai
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Idéal pour
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {SHIPPING_MODES.map((mode) => (
              <tr 
                key={mode.key}
                className={cn(
                  'hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors',
                  mode.highlighted && 'bg-amber-50/30 dark:bg-amber-900/10'
                )}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {(() => {
                      const Icon = mode.icon;
                      {/* @ts-ignore */}
                      return <Icon className={cn(
                        'w-4 h-4',
                        mode.highlighted ? 'text-amber-500' : 'text-gray-400'
                      )} />;
                    })()}
                    <span className={cn(
                      'font-medium',
                      mode.highlighted 
                        ? 'text-amber-700 dark:text-amber-300' 
                        : 'text-gray-900 dark:text-white'
                    )}>
                      {mode.name}
                    </span>
                    {mode.highlighted && (
                      <span className="text-xs bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full">
                        Recommandé
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  {prices[mode.key].toLocaleString('fr-FR')} FCFA/{mode.unit}
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                  {mode.deliveryTime}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {mode.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function PricingSection({ prices: initialPrices, lastUpdated: initialLastUpdated }: PricingSectionProps) {
  const [prices, setPrices] = useState<PricingData | null>(initialPrices || null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(initialLastUpdated || null);
  const [isLoading, setIsLoading] = useState(!initialPrices);
  const [error, setError] = useState<string | null>(null);
  const [isLocking, setIsLocking] = useState(false);

  // Fetch prices dynamically if not provided
  const fetchPrices = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Use relative URL for local API route
      const response = await fetch('/api/pricing/current');
      if (!response.ok) {
        throw new Error('Failed to fetch pricing');
      }
      const data = await response.json();
      setPrices(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des tarifs');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!initialPrices) {
      fetchPrices();
    }
  }, [initialPrices, fetchPrices]);

  // Handle price lock
  const handleLockPrice = useCallback(async () => {
    if (!prices) {
      alert('Les tarifs ne sont pas encore chargés. Veuillez réessayer.');
      return;
    }
    
    setIsLocking(true);
    try {
      const response = await fetch('/api/pricing/lock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prices }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Price lock error:', response.status, errorText);
        throw new Error('Failed to lock price');
      }
      const data = await response.json();
      
      // Show success message or redirect
      alert(`Tarif verrouillé jusqu'au ${new Date(data.expiresAt).toLocaleDateString('fr-FR')}`);
    } catch (err) {
      console.error('Lock price error:', err);
      alert('Erreur lors du verrouillage du tarif. Veuillez réessayer.');
    } finally {
      setIsLocking(false);
    }
  }, [prices]);

  // Format last updated date
  const formattedLastUpdated = lastUpdated 
    ? new Intl.DateTimeFormat('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(lastUpdated)
    : null;

  return (
    <section className={cn(
      'w-full py-8',
      'bg-gradient-to-br from-gray-50 to-white',
      'dark:from-gray-900 dark:to-gray-800'
    )}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Nos Tarifs Actuels
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Découvrez nos tarifs compétitifs pour l&apos;expédition Chine-Mali. 
            Tous les prix sont en FCFA et incluent les frais de douane.
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <PricingCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            <Button 
              variant="outline" 
              onClick={fetchPrices}
              leftIcon={<RefreshCw className="w-4 h-4" />}
            >
              Réessayer
            </Button>
          </motion.div>
        )}

        {/* Pricing Cards */}
        {!isLoading && !error && prices && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
              {SHIPPING_MODES.map((mode, index) => (
                <PriceCard
                  key={mode.key}
                  mode={mode}
                  price={prices[mode.key]}
                  index={index}
                />
              ))}
            </div>

            {/* Comparison Table */}
            <ComparisonTable prices={prices} />

            {/* Last Updated & CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              {/* Last Updated */}
              {formattedLastUpdated && (
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Mis à jour le: {formattedLastUpdated}
                </p>
              )}

              {/* Price Lock CTA */}
              <Button
                size="lg"
                onClick={handleLockPrice}
                disabled={isLocking}
                leftIcon={<Lock className="w-5 h-5" />}
                className={cn(
                  'shadow-lg shadow-blue-500/25',
                  'transition-all duration-300',
                  'hover:shadow-xl hover:shadow-blue-500/30'
                )}
              >
                {isLocking ? 'Verrouillage...' : '🔒 Verrouiller ce tarif'}
              </Button>
            </motion.div>

            {/* Note */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="mt-4 text-xs text-center text-gray-400 dark:text-gray-500"
            >
              * Les tarifs sont susceptibles de changer sans préavis. 
              Verrouillez votre tarif pour le garantir pendant 24h.
            </motion.p>
          </>
        )}
      </div>
    </section>
  );
}

// ============================================================================
// HOOK FOR DYNAMIC PRICING (Optional export for external use)
// ============================================================================

export function usePricingData() {
  const [prices, setPrices] = useState<PricingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchPrices = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/pricing/current');
      if (!response.ok) {
        throw new Error('Failed to fetch pricing');
      }
      const data = await response.json();
      setPrices(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]);

  const refetch = useCallback(() => {
    fetchPrices();
  }, [fetchPrices]);

  return { prices, isLoading, error, lastUpdated, refetch };
}

export default PricingSection;
