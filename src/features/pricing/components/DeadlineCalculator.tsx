/**
 * Deadline Calculator
 *
 * "Choose your deadline, we'll find the cheapest option"
 * Shifts the conversation from "here's what we offer" to "when do you need it?"
 * Part of the pricing feature.
 */

'use client';

import { useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  Package,
  Ruler,
  Tag,
  CalendarClock,
  MapPin,
  AlertCircle,
  Zap,
  MessageCircle,
  Clock,
  ChevronRight,
  Sparkles,
  TrendingDown,
  AlertTriangle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePricingStore } from '../store/usePricingStore';
import {
  calculateAirFreight,
  calculateSeaFreight,
  formatPriceFCFA,
} from '../lib/pricingEngine';
import {
  ITEM_CATEGORIES,
  DELIVERY_TIERS,
  DESTINATIONS,
  type ItemCategoryInfo,
} from '../constants';
import { Input } from '@/components/common/form/FormField';

interface TierRecommendation {
  tier: (typeof DELIVERY_TIERS)[number];
  meetsDeadline: boolean;
  price: number;
  priceLabel: string;
  isRecommended: boolean;
}

export function DeadlineCalculator() {
  const t = useTranslations('pricing');
  const {
    deadlineState,
    setDeadlineField,
    error,
    setError,
  } = usePricingStore();

  const weightNum = parseFloat(deadlineState.weight) || 0;
  const lengthNum = parseFloat(deadlineState.length) || 0;
  const widthNum = parseFloat(deadlineState.width) || 0;
  const heightNum = parseFloat(deadlineState.height) || 0;
  const deadlineDays = deadlineState.deadlineDays;

  // Calculate recommendations whenever inputs change
  const recommendations = useMemo(() => {
    if (weightNum <= 0) return null;

    const results: TierRecommendation[] = [];

    // Flash Express (air express)
    try {
      const flashResult = calculateAirFreight({
        weight: weightNum,
        length: lengthNum || undefined,
        width: widthNum || undefined,
        height: heightNum || undefined,
        category: 'express',
      });
      const tier = DELIVERY_TIERS.find((t) => t.id === 'flash')!;
      results.push({
        tier,
        meetsDeadline: deadlineDays >= tier.minDays,
        price: flashResult.totalPrice,
        priceLabel: formatPriceFCFA(flashResult.totalPrice),
        isRecommended: false,
      });
    } catch {
      // ignore
    }

    // Air Standard
    try {
      const airResult = calculateAirFreight({
        weight: weightNum,
        length: lengthNum || undefined,
        width: widthNum || undefined,
        height: heightNum || undefined,
        category: deadlineState.category,
      });
      const tier = DELIVERY_TIERS.find((t) => t.id === 'air_standard')!;
      results.push({
        tier,
        meetsDeadline: deadlineDays >= tier.minDays,
        price: airResult.totalPrice,
        priceLabel: formatPriceFCFA(airResult.totalPrice),
        isRecommended: false,
      });
    } catch {
      // ignore
    }

    // Sea Economy (only if dimensions provided)
    if (lengthNum > 0 && widthNum > 0 && heightNum > 0) {
      try {
        const seaResult = calculateSeaFreight({
          length: lengthNum / 100, // cm to meters
          width: widthNum / 100,
          height: heightNum / 100,
          weight: weightNum,
        });
        const tier = DELIVERY_TIERS.find((t) => t.id === 'sea_economy')!;
        results.push({
          tier,
          meetsDeadline: deadlineDays >= tier.minDays,
          price: seaResult.totalPrice,
          priceLabel: formatPriceFCFA(seaResult.totalPrice),
          isRecommended: false,
        });
      } catch {
        // ignore
      }
    } else {
      // Show sea as option without specific price
      const tier = DELIVERY_TIERS.find((t) => t.id === 'sea_economy')!;
      results.push({
        tier,
        meetsDeadline: deadlineDays >= tier.minDays,
        price: 0,
        priceLabel: `${formatPriceFCFA(tier.rateFCFA)}/m³`,
        isRecommended: false,
      });
    }

    // Determine recommendation based on deadline
    // Sort by price ascending
    const byPrice = [...results].sort((a, b) => a.price - b.price);
    // Find cheapest that meets deadline
    const cheapestMeeting = byPrice.find((r) => r.meetsDeadline && r.price > 0);

    if (cheapestMeeting) {
      cheapestMeeting.isRecommended = true;
    } else if (results.length > 0) {
      // No tier meets deadline — recommend fastest (cheapest among meeting... none, so fastest)
      const fastest = [...results].sort((a, b) => a.tier.maxDays - b.tier.maxDays)[0];
      if (fastest) fastest.isRecommended = true;
    }

    return results;
  }, [weightNum, lengthNum, widthNum, heightNum, deadlineDays, deadlineState.category]);

  const recommendedTier = recommendations?.find((r) => r.isRecommended);
  const cheaperAlternative = useMemo(() => {
    if (!recommendations || !recommendedTier) return null;
    // Find a cheaper option that still meets deadline (but is slower)
    const cheaper = recommendations
      .filter((r) => r.meetsDeadline && r.price > 0 && r.price < recommendedTier.price)
      .sort((a, b) => b.price - a.price)[0];
    if (cheaper) return cheaper;
    // If recommended is already cheapest meeting deadline, no cheaper alt
    return null;
  }, [recommendations, recommendedTier]);

  const fasterAlternative = useMemo(() => {
    if (!recommendations || !recommendedTier) return null;
    const faster = recommendations
      .filter((r) => r.price > 0 && r.price > recommendedTier.price && r.tier.maxDays < recommendedTier.tier.maxDays)
      .sort((a, b) => a.tier.maxDays - b.tier.maxDays)[0];
    return faster || null;
  }, [recommendations, recommendedTier]);

  const anyMeetsDeadline = recommendations?.some((r) => r.meetsDeadline);

  const handleInputChange = useCallback(
    (field: keyof typeof deadlineState, value: string) => {
      if (value && !/^\d*\.?\d*$/.test(value)) return;
      setDeadlineField(field, value);
    },
    [setDeadlineField]
  );

  const deadlineLabel = useMemo(() => {
    if (deadlineDays <= 5) return t('deadlineCalculator.urgent', { defaultValue: 'Urgent' });
    if (deadlineDays <= 21) return t('deadlineCalculator.standard', { defaultValue: 'Standard' });
    if (deadlineDays <= 60) return t('deadlineCalculator.relaxed', { defaultValue: 'Relaxed' });
    return t('deadlineCalculator.economy', { defaultValue: 'Economy' });
  }, [deadlineDays, t]);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Input Section */}
      <div className="space-y-6">
        {/* Weight Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Package className="w-4 h-4 text-blue-500" />
            {t('deadlineCalculator.weight', { defaultValue: 'Poids estimé' })}
            <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Input
              type="text"
              inputMode="decimal"
              value={deadlineState.weight}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('weight', e.target.value)}
              placeholder="0.00"
              className="pr-12 text-lg"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">kg</span>
          </div>
        </div>

        {/* Dimensions Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Ruler className="w-4 h-4 text-green-500" />
            {t('deadlineCalculator.dimensions', { defaultValue: 'Dimensions (cm)' })}
            <span className="text-xs text-gray-400 font-normal ml-auto">
              {t('deadlineCalculator.optional', { defaultValue: 'optionnel' })}
            </span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(['length', 'width', 'height'] as const).map((dim) => (
              <div key={dim} className="relative">
                <Input
                  type="text"
                  inputMode="decimal"
                  value={deadlineState[dim]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(dim, e.target.value)}
                  placeholder={dim.charAt(0).toUpperCase()}
                  className="pr-10 text-center"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">cm</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {t('deadlineCalculator.dimensionsHint', { defaultValue: 'Pour calculer le poids volumétrique et le CBM' })}
          </p>
        </div>

        {/* Category Selection */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Tag className="w-4 h-4 text-purple-500" />
            {t('deadlineCalculator.category', { defaultValue: 'Catégorie' })}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {ITEM_CATEGORIES.filter((c: ItemCategoryInfo) => c.id !== 'containers').map((category: ItemCategoryInfo) => (
              <button
                key={category.id}
                onClick={() => setDeadlineField('category', category.id)}
                className={cn(
                  'p-3 rounded-xl border-2 text-left transition-all duration-200',
                  deadlineState.category === category.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                )}
              >
                <div className="font-medium text-sm text-gray-900 dark:text-white">
                  {t(`categories.${category.id}.name`)}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {formatPriceFCFA(category.rate)}/{t(`categories.${category.id}.unit`)}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Deadline Slider */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <CalendarClock className="w-4 h-4 text-amber-500" />
            {t('deadlineCalculator.whenDoYouNeedIt', { defaultValue: 'Quand en avez-vous besoin ?' })}
          </label>
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{deadlineDays}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {deadlineDays === 1
                  ? t('deadlineCalculator.day', { defaultValue: 'jour' })
                  : t('deadlineCalculator.days', { defaultValue: 'jours' })}
              </span>
            </div>
            <input
              type="range"
              min={3}
              max={90}
              step={1}
              value={deadlineDays}
              onChange={(e) => setDeadlineField('deadlineDays', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>3 {t('deadlineCalculator.days', { defaultValue: 'jours' })}</span>
              <span className="font-medium text-blue-500">{deadlineLabel}</span>
              <span>90 {t('deadlineCalculator.days', { defaultValue: 'jours' })}</span>
            </div>
          </div>
        </div>

        {/* Destination */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <MapPin className="w-4 h-4 text-red-500" />
            {t('deadlineCalculator.destination', { defaultValue: 'Destination' })}
          </label>
          <select
            value={deadlineState.destination}
            onChange={(e) => setDeadlineField('destination', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {DESTINATIONS.map((dest) => (
              <option key={dest.code} value={dest.code}>
                {dest.flag} {t(dest.nameKey, { defaultValue: dest.code })}
              </option>
            ))}
          </select>
        </div>

        {/* Error */}
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
          {weightNum > 0 && recommendations ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-4"
            >
              {/* Recommended Tier */}
              {recommendedTier && (
                <div
                  className={cn(
                    'rounded-2xl p-6 text-white bg-gradient-to-br',
                    recommendedTier.tier.color
                  )}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5" />
                    <span className="font-semibold text-sm uppercase tracking-wide opacity-90">
                      {t('deadlineCalculator.recommended', { defaultValue: 'Recommandé pour votre deadline' })}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{recommendedTier.tier.icon}</span>
                    <div>
                      <h3 className="text-2xl font-bold">{recommendedTier.tier.nameFr}</h3>
                      <p className="text-sm opacity-90">
                        {t(`deadlineCalculator.positioning.${recommendedTier.tier.id}`, {
                          defaultValue: recommendedTier.tier.positioningFr,
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="text-center my-6">
                    <div className="text-4xl md:text-5xl font-bold">
                      {recommendedTier.price > 0 ? recommendedTier.priceLabel : recommendedTier.priceLabel}
                    </div>
                    {recommendedTier.price > 0 && (
                      <div className="text-sm opacity-80 mt-1">
                        {t('deadlineCalculator.forYourShipment', { defaultValue: 'pour votre envoi' })}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 bg-white/10 rounded-xl p-4">
                    <div className="flex justify-between text-sm">
                      <span className="opacity-80">{t('result.deliveryTime', { defaultValue: 'Délai' })}</span>
                      <span className="font-medium">
                        {recommendedTier.tier.minDays}-{recommendedTier.tier.maxDays}{' '}
                        {t('deadlineCalculator.days', { defaultValue: 'jours' })}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="opacity-80">{t('result.rate', { defaultValue: 'Tarif' })}</span>
                      <span className="font-medium">
                        {formatPriceFCFA(recommendedTier.tier.rateFCFA)}/{recommendedTier.tier.unit}
                      </span>
                    </div>
                  </div>

                  {/* Too late warning */}
                  {!anyMeetsDeadline && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-3 bg-white/20 border border-white/30 rounded-lg flex items-start gap-2"
                    >
                      <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium">
                          {t('deadlineCalculator.tooLate', { defaultValue: 'Aucune option ne garantit cette deadline' })}
                        </p>
                        <p className="text-xs opacity-80 mt-1">
                          {t('deadlineCalculator.tooLateDescription', {
                            defaultValue: 'Même notre option la plus rapide (Flash Express) nécessite 2-5 jours. Contactez-nous pour une solution sur mesure.',
                          })}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* WhatsApp CTA */}
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
                  </motion.div>
                </div>
              )}

              {/* Cheaper Alternative */}
              {cheaperAlternative && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl"
                >
                  <div className="flex items-start gap-3">
                    <TrendingDown className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                        {t('deadlineCalculator.cheaperOption', { defaultValue: 'Option moins chère disponible' })}
                      </p>
                      <p className="text-sm text-emerald-700 dark:text-emerald-400 mt-1">
                        {t('deadlineCalculator.cheaperOptionDescription', {
                          defaultValue: '{{tier}} arrive en {{min}}-{{max}} jours pour {{price}} — économisez {{savings}} si vous avez le temps.',
                          tier: cheaperAlternative.tier.nameFr,
                          min: cheaperAlternative.tier.minDays,
                          max: cheaperAlternative.tier.maxDays,
                          price: cheaperAlternative.priceLabel,
                          savings: formatPriceFCFA(recommendedTier!.price - cheaperAlternative.price),
                        })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Faster Alternative */}
              {fasterAlternative && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl"
                >
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                        {t('deadlineCalculator.fasterOption', { defaultValue: 'Besoin de plus de vitesse ?' })}
                      </p>
                      <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                        {t('deadlineCalculator.fasterOptionDescription', {
                          defaultValue: '{{tier}} livre en {{min}}-{{max}} jours pour {{price}}.',
                          tier: fasterAlternative.tier.nameFr,
                          min: fasterAlternative.tier.minDays,
                          max: fasterAlternative.tier.maxDays,
                          price: fasterAlternative.priceLabel,
                        })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Timeline */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  {t('deadlineCalculator.timelineLabel', { defaultValue: 'Comparatif des délais' })}
                </h4>
                <div className="space-y-3">
                  {recommendations.map((rec) => {
                    const meets = rec.meetsDeadline;
                    const isRec = rec.isRecommended;
                    return (
                      <div
                        key={rec.tier.id}
                        className={cn(
                          'relative flex items-center gap-3 p-3 rounded-lg border transition-all',
                          isRec
                            ? 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20'
                            : meets
                              ? 'border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/10'
                              : 'border-gray-200 dark:border-gray-700 opacity-60'
                        )}
                      >
                        <span className="text-xl">{rec.tier.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm text-gray-900 dark:text-white">
                              {rec.tier.nameFr}
                            </span>
                            {meets && (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300">
                                {t('deadlineCalculator.meetsDeadline', { defaultValue: 'OK' })}
                              </span>
                            )}
                            {isRec && (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300">
                                {t('deadlineCalculator.bestChoice', { defaultValue: 'Meilleur choix' })}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {rec.tier.minDays}-{rec.tier.maxDays}{' '}
                            {t('deadlineCalculator.days', { defaultValue: 'jours' })} • {rec.priceLabel}
                          </div>
                        </div>
                        {!meets && (
                          <span className="text-xs text-red-500 dark:text-red-400 font-medium">
                            {t('deadlineCalculator.tooLateShort', { defaultValue: 'Trop tard' })}
                          </span>
                        )}
                        {isRec && <ChevronRight className="w-4 h-4 text-blue-500" />}
                      </div>
                    );
                  })}
                </div>

                {/* Deadline marker line */}
                <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400">
                      {t('deadlineCalculator.yourDeadline', { defaultValue: 'Votre deadline' })}:
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {deadlineDays}{' '}
                      {deadlineDays === 1
                        ? t('deadlineCalculator.day', { defaultValue: 'jour' })
                        : t('deadlineCalculator.days', { defaultValue: 'jours' })}
                    </span>
                  </div>
                  <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative">
                    {/* Tier ranges as background segments */}
                    <div className="absolute inset-0 flex">
                      <div className="h-full bg-red-400/30" style={{ width: `${(5 / 90) * 100}%` }} />
                      <div className="h-full bg-blue-400/30" style={{ width: `${((21 - 5) / 90) * 100}%` }} />
                      <div className="h-full bg-emerald-400/30" style={{ width: `${((75 - 21) / 90) * 100}%` }} />
                      <div className="flex-1 h-full bg-gray-300/30" />
                    </div>
                    {/* Deadline marker */}
                    <div
                      className="absolute top-0 w-1 h-full bg-amber-500 rounded-full"
                      style={{ left: `${(deadlineDays / 90) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>0j</span>
                    <span className="text-red-400">5j</span>
                    <span className="text-blue-400">21j</span>
                    <span className="text-emerald-400">75j</span>
                    <span>90j</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 min-h-[400px]"
            >
              <CalendarClock className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-center font-medium">
                {t('deadlineCalculator.enterWeight', { defaultValue: 'Entrez un poids pour voir les options' })}
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-center text-sm mt-2">
                {t('deadlineCalculator.enterWeightHint', {
                  defaultValue: 'Choisissez votre deadline et nous trouvons la meilleure option',
                })}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
