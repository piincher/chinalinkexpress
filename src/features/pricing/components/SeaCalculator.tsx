/**
 * Sea Calculator
 * 
 * Interactive calculator for sea freight (CBM) pricing.
 * Handles volume calculations with density adjustments.
 * Dimensions are in meters.
 * Part of the pricing feature.
 */

'use client';

import { useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Ruler, Weight, Info, AlertCircle, ArrowRight, Ship, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePricingStore } from '../store/usePricingStore';
import { calculateSeaFreight, formatPriceFCFA, formatNumber } from '../lib/pricingEngine';
import { SEA_RATES, DENSITY_THRESHOLDS, SEA_STANDARD_ITEMS } from '../constants';
import { Input } from '@/components/common/form/FormField';

export function SeaCalculator() {
  const t = useTranslations('pricing');
  const {
    seaState,
    setSeaField,
    setSeaResult,
    seaResult,
    setError,
    error,
    isCalculating,
    setIsCalculating,
  } = usePricingStore();

  // Auto-calculate when inputs change
  useEffect(() => {
    const calculate = async () => {
      const length = parseFloat(seaState.length);
      const width = parseFloat(seaState.width);
      const height = parseFloat(seaState.height);
      const weight = parseFloat(seaState.weight) || 0;

      if (!length || !width || !height || length <= 0 || width <= 0 || height <= 0) {
        setSeaResult(null);
        return;
      }

      setIsCalculating(true);
      setError(null);

      try {
        await new Promise((resolve) => setTimeout(resolve, 300));

        const result = calculateSeaFreight({
          length,
          width,
          height,
          weight,
        });

        setSeaResult(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Calculation error');
        setSeaResult(null);
      } finally {
        setIsCalculating(false);
      }
    };

    const timer = setTimeout(calculate, 500);
    return () => clearTimeout(timer);
  }, [seaState, setSeaResult, setError, setIsCalculating]);

  const handleInputChange = useCallback(
    (field: keyof typeof seaState, value: string) => {
      if (value && !/^\d*\.?\d*$/.test(value)) return;
      setSeaField(field, value);
    },
    [setSeaField]
  );

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Input Section */}
      <div className="space-y-6">
        {/* Dimensions Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Ruler className="w-4 h-4 text-blue-500" />
            {t('seaCalculator.dimensions')}
            <span className="text-red-500">*</span>
            <span className="text-xs text-amber-600 dark:text-amber-400 font-normal ml-auto bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 rounded-full">
              {t('seaCalculator.unitMeters', { defaultValue: 'en mètres' })}
            </span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            {['length', 'width', 'height'].map((dim) => (
              <div key={dim} className="relative">
                <Input
                  type="text"
                  inputMode="decimal"
                  value={seaState[dim as keyof typeof seaState]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(dim as keyof typeof seaState, e.target.value)}
                  placeholder={t(`seaCalculator.${dim}`)}
                  className="pr-12 text-center"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                  m
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {t('seaCalculator.dimensionsHint', { defaultValue: 'Ex: 1.2m × 0.8m × 0.9m = 0.86 CBM' })}
          </p>
        </div>

        {/* Weight Input (for density calculation) */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Weight className="w-4 h-4 text-green-500" />
            {t('seaCalculator.weight')}
            <span className="text-xs text-gray-400 font-normal ml-auto">
              {t('seaCalculator.weightHint')}
            </span>
          </label>
          <div className="relative">
            <Input
              type="text"
              inputMode="decimal"
              value={seaState.weight}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('weight', e.target.value)}
              placeholder="0.00"
              className="pr-12"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
              kg
            </span>
          </div>
        </div>

        {/* Standard Items Display */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="font-medium text-sm text-gray-900 dark:text-white">
              {t('seaCalculator.standardItems.title', { defaultValue: 'Articles adaptés au fret maritime' })}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {SEA_STANDARD_ITEMS.map((item) => (
              <span
                key={item}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Rate Info */}
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-4 h-4 text-green-500" />
            <span className="font-medium text-sm text-gray-900 dark:text-white">
              {t('seaCalculator.rateInfo.title')}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('seaCalculator.rateInfo.description', {
              rate: formatPriceFCFA(SEA_RATES.rateFCFA),
              minCBM: SEA_RATES.minCBM,
            })}
          </p>
        </div>

        {/* Density Explanation */}
        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-sm text-amber-800 dark:text-amber-300">
                {t('seaCalculator.densityInfo.title')}
              </span>
              <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                {t('seaCalculator.densityInfo.description', {
                  threshold: DENSITY_THRESHOLDS.coscoMaersk,
                })}
              </p>
              <ul className="text-xs text-amber-600 dark:text-amber-500 mt-2 space-y-1">
                <li>• {t('seaCalculator.densityInfo.standardRule', { defaultValue: 'Règle standard 1:200 (densité ≤ 200)' })}</li>
                <li>• {t('seaCalculator.densityInfo.coscoRule', { defaultValue: 'Règle COSCO/MAERSK 1:250 (densité > 250)' })}</li>
              </ul>
            </div>
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
          {seaResult ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={cn(
                'rounded-2xl p-6 text-white',
                seaResult.highDensity
                  ? 'bg-gradient-to-br from-amber-500 to-orange-600 dark:from-amber-600 dark:to-orange-700'
                  : 'bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700'
              )}
            >
              {/* Price Display */}
              <div className="text-center mb-6">
                <div className="text-white/80 text-sm mb-1">{t('result.estimatedPrice')}</div>
                <div className="text-4xl md:text-5xl font-bold">
                  {formatPriceFCFA(seaResult.totalPrice)}
                </div>
                <div className="text-white/80 text-sm mt-2">
                  {t('result.deliveryTime')}: {seaResult.deliveryTime}
                </div>
              </div>

              {/* Calculation Breakdown */}
              <div className="space-y-3 bg-white/10 rounded-xl p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-white/80">{t('result.originalCBM')}</span>
                  <span className="font-medium">{formatNumber(seaResult.originalCBM, 3)} m³</span>
                </div>

                {seaResult.adjustmentApplied && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/80">{t('result.density')}</span>
                      <span className="font-medium">
                        {formatNumber(seaResult.densityRatio)} kg/m³
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-amber-200">
                      <ArrowRight className="w-4 h-4" />
                      <span>{t('result.densityAdjustment')}</span>
                    </div>
                    <div className="text-xs text-white/70 pl-6">
                      {t('result.densityRuleApplied', { defaultValue: 'Règle COSCO/MAERSK 1:250 appliquée' })}
                    </div>
                  </>
                )}

                {!seaResult.adjustmentApplied && seaResult.densityRatio > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/80">{t('result.density')}</span>
                    <span className="font-medium">
                      {formatNumber(seaResult.densityRatio)} kg/m³
                    </span>
                  </div>
                )}

                {seaResult.minCBMApplied && (
                  <div className="flex items-center gap-2 text-sm text-amber-200">
                    <ArrowRight className="w-4 h-4" />
                    <span>{t('result.minCBMApplied')}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm border-t border-white/20 pt-2">
                  <span className="text-white/80">{t('result.finalCBM')}</span>
                  <span className="font-bold">{formatNumber(seaResult.adjustedCBM, 3)} m³</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-white/80">{t('result.rate')}</span>
                  <span className="font-medium">
                    {formatPriceFCFA(seaResult.baseRate)}/m³
                  </span>
                </div>
              </div>

              {/* High Density Warning */}
              {seaResult.highDensity && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-white/20 border border-white/30 rounded-lg"
                >
                  <p className="text-sm text-white">
                    <strong>{t('result.highDensity.title')}</strong>
                    <br />
                    <span className="text-white/80 text-xs">
                      {t('result.highDensity.description')}
                    </span>
                  </p>
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
                <p className="text-center text-xs text-white/80 mt-2 italic">
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
              <Ship className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-center">
                {isCalculating ? t('result.calculating') : t('result.enterDimensions')}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Minimum CBM Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
        >
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-4 h-4 text-gray-500" />
            <span className="font-medium text-sm text-gray-900 dark:text-white">
              {t('seaCalculator.minCBM.title')}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('seaCalculator.minCBM.description', { minCBM: SEA_RATES.minCBM })}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
