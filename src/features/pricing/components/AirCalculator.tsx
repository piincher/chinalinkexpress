/**
 * Air Calculator
 * 
 * Interactive calculator for air freight pricing.
 * Handles weight, dimensions (in cm), and category selection.
 * Part of the pricing feature.
 */

'use client';

import { useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Package, Ruler, Tag, Info, AlertCircle, Plane, MessageCircle, Lightbulb, TrendingDown, ShieldCheck, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePricingStore } from '../store/usePricingStore';
import { calculateAirFreight, formatPriceFCFA, formatNumber } from '../lib/pricingEngine';
import { AIR_RATES, ITEM_CATEGORIES, STANDARD_ITEMS, DELIVERY_PERFORMANCE, type ItemCategory, type ItemCategoryInfo } from '../constants';
import { Input } from '@/components/common/form/FormField';

export function AirCalculator() {
  const t = useTranslations('pricing');
  const {
    airState,
    setAirField,
    setAirResult,
    airResult,
    setError,
    error,
    isCalculating,
    setIsCalculating,
  } = usePricingStore();

  // Auto-calculate when inputs change
  useEffect(() => {
    const calculate = async () => {
      const weight = parseFloat(airState.weight);
      if (!weight || weight <= 0) {
        setAirResult(null);
        return;
      }

      setIsCalculating(true);
      setError(null);

      try {
        await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate calculation delay

        const result = calculateAirFreight({
          weight,
          length: airState.length ? parseFloat(airState.length) : undefined,
          width: airState.width ? parseFloat(airState.width) : undefined,
          height: airState.height ? parseFloat(airState.height) : undefined,
          category: airState.category as ItemCategory,
        });

        setAirResult(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Calculation error');
        setAirResult(null);
      } finally {
        setIsCalculating(false);
      }
    };

    const timer = setTimeout(calculate, 500);
    return () => clearTimeout(timer);
  }, [airState, setAirResult, setError, setIsCalculating]);

  const handleInputChange = useCallback(
    (field: keyof typeof airState, value: string) => {
      // Only allow numbers and decimal points
      if (value && !/^\d*\.?\d*$/.test(value)) return;
      setAirField(field, value);
    },
    [setAirField]
  );

  const selectedRate = AIR_RATES.find((r) => r.category === airState.category);

  // Calculate savings vs express for standard category
  const expressRate = AIR_RATES.find((r) => r.category === 'express');
  const standardRate = AIR_RATES.find((r) => r.category === 'standard');
  const savingsPercent = expressRate && standardRate
    ? Math.floor(((expressRate.rateFCFA - standardRate.rateFCFA) / expressRate.rateFCFA) * 100)
    : 37;

  const isStandardSelected = airState.category === 'standard';
  const deliveryPerf = isStandardSelected
    ? DELIVERY_PERFORMANCE.airStandard
    : airState.category === 'express'
      ? DELIVERY_PERFORMANCE.flashExpress
      : null;

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Input Section */}
      <div className="space-y-6">
        {/* Weight/Quantity Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Package className="w-4 h-4 text-blue-500" />
            {airState.category === 'phones' ? t('airCalculator.quantity') : t('airCalculator.weight')}
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Input
              type="text"
              inputMode="decimal"
              value={airState.weight}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('weight', e.target.value)}
              placeholder={airState.category === 'phones' ? '1' : '0.00'}
              className="pr-12 text-lg"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
              {airState.category === 'phones' ? t('categories.phones.unit') : 'kg'}
            </span>
          </div>
          {airState.category === 'phones' && (
            <p className="text-xs text-blue-600 dark:text-blue-400">
              {t('airCalculator.phoneHint')}
            </p>
          )}
        </div>

        {/* Dimensions Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Ruler className="w-4 h-4 text-green-500" />
            {t('airCalculator.dimensions')}
            <span className="text-xs text-gray-400 font-normal ml-auto">
              {t('airCalculator.optional')}
            </span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            {['length', 'width', 'height'].map((dim) => (
              <div key={dim} className="relative">
                <Input
                  type="text"
                  inputMode="decimal"
                  value={airState[dim as keyof typeof airState]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(dim as keyof typeof airState, e.target.value)}
                  placeholder={dim.charAt(0).toUpperCase()}
                  className="pr-10 text-center"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                  cm
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {t('airCalculator.dimensionsHint')}
          </p>
        </div>

        {/* Category Selection */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Tag className="w-4 h-4 text-purple-500" />
            {t('airCalculator.category')}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {ITEM_CATEGORIES.filter((c: ItemCategoryInfo) => c.id !== 'containers').map((category: ItemCategoryInfo) => (
              <button
                key={category.id}
                onClick={() => setAirField('category', category.id)}
                className={cn(
                  'p-3 rounded-xl border-2 text-left transition-all duration-200 relative',
                  airState.category === category.id
                    ? category.id === 'standard'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : category.id === 'express'
                        ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20'
                        : 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                )}
              >
                {category.id === 'express' && (
                  <div className="absolute -top-2 -right-1 px-1.5 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center gap-0.5">
                    <Zap className="w-2.5 h-2.5 fill-current" />
                    2-5j
                  </div>
                )}
                {category.id === 'standard' && airState.category === 'standard' && (
                  <div className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center gap-0.5">
                    <Lightbulb className="w-2.5 h-2.5" />
                    {t('smartChoice.badge')}
                  </div>
                )}
                <div className={cn(
                  "font-medium text-sm",
                  category.id === 'express' ? 'text-amber-900 dark:text-amber-100' : 'text-gray-900 dark:text-white'
                )}>
                  {t(`categories.${category.id}.name`)}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {formatPriceFCFA(category.rate)}/{t(`categories.${category.id}.unit`)}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Standard Items Display */}
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="font-medium text-sm text-gray-900 dark:text-white">
              {t('airCalculator.standardItems.title', { defaultValue: 'Articles courants' })}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {STANDARD_ITEMS.map((item) => (
              <span
                key={item}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm"
            >
              <AlertCircle className="w-4 h-4" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results Section */}
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          {airResult ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={cn(
                'rounded-2xl p-6 text-white',
                isStandardSelected
                  ? 'bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700'
                  : 'bg-gradient-to-br from-amber-500 to-orange-600 dark:from-amber-600 dark:to-orange-700'
              )}
            >
              {/* Price Display */}
              <div className="text-center mb-6">
                <div className={cn(
                  "text-sm mb-1",
                  isStandardSelected ? 'text-blue-100' : 'text-amber-100'
                )}>{t('result.estimatedPrice')}</div>
                <div className="text-4xl md:text-5xl font-bold">
                  {formatPriceFCFA(airResult.totalPrice)}
                </div>
                <div className={cn(
                  "text-sm mt-2",
                  isStandardSelected ? 'text-blue-100' : 'text-amber-100'
                )}>
                  {t('result.deliveryTime')}: {airResult.deliveryTime}
                </div>
              </div>

              {/* Smart Choice Banner for Standard */}
              {isStandardSelected && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-white/20 border border-white/30 rounded-lg"
                >
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-white">
                      <strong>{t('result.smartChoice', { percent: savingsPercent })}</strong>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Delivery Confidence Indicator */}
              {deliveryPerf && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-4 p-3 bg-white/10 border border-white/20 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-300" />
                    <span className="text-sm text-emerald-100">
                      {t('deliveryPerformance.earlyDelivery')}
                    </span>
                    <span className="text-xs text-white/70 ml-auto">
                      {t('deliveryPerformance.actualAverage')}: {deliveryPerf.actualAverage}j
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Calculation Breakdown */}
              <div className="space-y-3 bg-white/10 rounded-xl p-4">
                {airResult.volumetricWeight && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className={isStandardSelected ? 'text-blue-100' : 'text-amber-100'}>{t('result.actualWeight')}</span>
                      <span className="font-medium">{formatNumber(airResult.actualWeight)} kg</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={isStandardSelected ? 'text-blue-100' : 'text-amber-100'}>{t('result.volumetricWeight')}</span>
                      <span className="font-medium">
                        {formatNumber(airResult.volumetricWeight)} kg
                      </span>
                    </div>
                    <div className="flex justify-between text-sm border-t border-white/20 pt-2">
                      <span className={isStandardSelected ? 'text-blue-100' : 'text-amber-100'}>{t('result.chargeableWeight')}</span>
                      <span className="font-bold">{formatNumber(airResult.chargeableWeight)} kg</span>
                    </div>
                  </>
                )}
                {!airResult.volumetricWeight && (
                  <div className="flex justify-between text-sm">
                    <span className={isStandardSelected ? 'text-blue-100' : 'text-amber-100'}>{t('result.quantity')}</span>
                    <span className="font-medium">
                      {airResult.actualWeight} {t(`categories.${airResult.category}.unit`)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className={isStandardSelected ? 'text-blue-100' : 'text-amber-100'}>{t('result.rate')}</span>
                  <span className="font-medium">
                    {formatPriceFCFA(airResult.baseRate)}/{t(`categories.${airResult.category}.unit`)}
                  </span>
                </div>
              </div>

              {/* Sea Recommendation */}
              {airResult.seaRecommended && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-amber-400/20 border border-amber-400/30 rounded-lg"
                >
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-amber-200 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-amber-100">
                      <strong>{t('result.seaRecommendation.title')}</strong>
                      <p className="mt-1 text-xs opacity-90">
                        {t('result.seaRecommendation.description', {
                          density: formatNumber(airResult.densityRatio || 0),
                        })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* WhatsApp Contact Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6"
              >
                <a
                  href="https://wa.me/8618851725957"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-green-500 hover:bg-green-400 text-white font-semibold rounded-xl transition-colors duration-200"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t('result.contactWhatsApp', { defaultValue: 'Demander un devis sur WhatsApp' })}
                </a>
                <p className="text-center text-xs text-white/70 mt-2 italic">
                  {t('result.estimateDisclaimer', { defaultValue: 'Ces prix sont des estimations uniquement' })}
                </p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700"
            >
              <Plane className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-center">
                {isCalculating ? t('result.calculating') : t('result.enterDetails')}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rate Info Card */}
        {selectedRate && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "p-4 rounded-xl",
              selectedRate.category === 'standard'
                ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                : 'bg-gray-50 dark:bg-gray-800/50'
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              <Info className={cn(
                "w-4 h-4",
                selectedRate.category === 'standard' ? 'text-blue-500' : 'text-blue-500'
              )} />
              <span className="font-medium text-sm text-gray-900 dark:text-white">
                {t(`categories.${selectedRate.category}.name`)}
              </span>
              {selectedRate.category === 'standard' && (
                <span className="ml-auto text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 rounded-full">
                  {t('smartChoice.badge')}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t(`categories.${selectedRate.category}.description`)}
            </p>
            {selectedRate.category === 'standard' && (
              <p className="mt-2 text-xs text-blue-600 dark:text-blue-400 font-medium">
                {t('savings.vsExpress', { percent: savingsPercent })}
              </p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
