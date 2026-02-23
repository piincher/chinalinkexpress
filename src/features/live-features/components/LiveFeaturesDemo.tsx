/**
 * Live Features Demo Component
 * 
 * Showcase component demonstrating all live, interactive, and social features.
 * This is a client component that brings together all implemented features.
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { 
  Activity, 
  Clock, 
  Map, 
  Package, 
  TrendingUp, 
  Users,
  Zap,
  ChevronRight,
  Sparkles
} from 'lucide-react';

// Import all live features
import { LiveShipmentFeed } from '@/features/live-feed';
import { DeliveryCountdown } from '@/features/countdown';
import { SocialProofBanner, TrustBadges, ActivityTicker, RecentActivityToast } from '@/features/social-proof';
import { TrackingTimeline, TrackingCard } from '@/features/tracking';
import { TrendingRoutesMap } from '@/features/routes-map';
import { QuickQuoteButton, QuickQuoteButtonCompact, QuickQuoteButtonInline, QuickQuotePopup } from '@/features/quick-quote';

interface LiveFeaturesDemoProps {
  locale: string;
}

const features = [
  {
    id: 'live-feed',
    title: 'Live Shipment Feed',
    description: 'Real-time shipment activity with animated cards showing origin to destination',
    icon: Activity,
    color: 'blue',
  },
  {
    id: 'countdown',
    title: 'Delivery Countdown',
    description: 'Visual countdown timer with urgency indicators and progress tracking',
    icon: Clock,
    color: 'amber',
  },
  {
    id: 'social-proof',
    title: 'Social Proof Banners',
    description: 'Trust signals and real-time activity notifications',
    icon: Users,
    color: 'green',
  },
  {
    id: 'tracking',
    title: 'Tracking Timeline',
    description: 'Visual timeline of shipment journey with status updates',
    icon: Package,
    color: 'purple',
  },
  {
    id: 'routes-map',
    title: 'Trending Routes Map',
    description: 'Interactive map showing popular shipping routes',
    icon: Map,
    color: 'cyan',
  },
  {
    id: 'quick-quote',
    title: 'Quick Quote Popup',
    description: 'Fast quote request without leaving the current page',
    icon: Zap,
    color: 'orange',
  },
];

const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-600', border: 'border-blue-200' },
  amber: { bg: 'bg-amber-500/10', text: 'text-amber-600', border: 'border-amber-200' },
  green: { bg: 'bg-green-500/10', text: 'text-green-600', border: 'border-green-200' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-600', border: 'border-purple-200' },
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-600', border: 'border-cyan-200' },
  orange: { bg: 'bg-orange-500/10', text: 'text-orange-600', border: 'border-orange-200' },
};

export function LiveFeaturesDemo({ locale }: LiveFeaturesDemoProps) {
  const t = useTranslations();
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Production Ready
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Live, Interactive &<br />
              <span className="text-blue-200">Social Features</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              Experience our new real-time shipment tracking, countdown timers, 
              social proof banners, and interactive maps.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#features"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-700 font-semibold hover:bg-blue-50 transition-colors"
              >
                Explore Features
                <ChevronRight className="w-5 h-5" />
              </a>
              <a
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors"
              >
                Back to Home
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Overview */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Feature Overview
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Six powerful features designed to enhance user engagement, 
              build trust, and provide real-time logistics visibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const colors = colorClasses[feature.color];
              const Icon = feature.icon;
              
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onClick={() => setActiveFeature(activeFeature === feature.id ? null : feature.id)}
                  className={`
                    group relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300
                    ${activeFeature === feature.id 
                      ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20' 
                      : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700'
                    }
                    bg-white dark:bg-slate-800
                  `}
                >
                  <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center mb-4
                    ${colors.bg} ${colors.text}
                  `}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                  <div className="mt-4 flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
                    {activeFeature === feature.id ? 'Hide Demo' : 'View Demo'}
                    <ChevronRight className={`
                      w-4 h-4 ml-1 transition-transform
                      ${activeFeature === feature.id ? 'rotate-90' : 'group-hover:translate-x-1'}
                    `} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Demos */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Live Shipment Feed Demo */}
          {(activeFeature === null || activeFeature === 'live-feed') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Live Shipment Feed
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Real-time updates of shipments in progress
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <LiveShipmentFeed />
              </div>
            </motion.div>
          )}

          {/* Delivery Countdown Demo */}
          {(activeFeature === null || activeFeature === 'countdown') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Delivery Countdown
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Visual countdown with urgency indicators
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DeliveryCountdown trackingNumber="CLE-2024-001" variant="full" />
                <DeliveryCountdown trackingNumber="CLE-2024-003" variant="compact" />
              </div>
            </motion.div>
          )}

          {/* Social Proof Demo */}
          {(activeFeature === null || activeFeature === 'social-proof') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Social Proof Banners
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Trust signals and real-time activity
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                {/* Trust Badges */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                  <h4 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Trust Badges</h4>
                  <TrustBadges variant="grid" />
                </div>
                
                {/* Activity Ticker */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                  <h4 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Activity Ticker</h4>
                  <ActivityTicker variant="horizontal" />
                </div>
                
                {/* Social Proof Banner */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                  <h4 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Rotating Banner</h4>
                  <div className="relative h-16">
                    <SocialProofBanner position="bottom" />
                  </div>
                </div>
                
                {/* Toast Notifications */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                  <h4 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Toast Notifications</h4>
                  <RecentActivityToast />
                  <p className="text-sm text-slate-500 mt-4">Toasts appear when new events occur</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tracking Timeline Demo */}
          {(activeFeature === null || activeFeature === 'tracking') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Package className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Tracking Timeline
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Visual journey of your shipment
                  </p>
                </div>
              </div>
              
              {/* Full Timeline */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <h4 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Full Timeline View</h4>
                <TrackingTimeline trackingNumber="CLE-AIR-2026-001" />
              </div>
              
              {/* Compact Card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <h4 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Compact Card View</h4>
                <div className="max-w-md">
                  <TrackingCard trackingNumber="CLE-AIR-2026-002" />
                </div>
              </div>
            </motion.div>
          )}

          {/* Trending Routes Map Demo */}
          {(activeFeature === null || activeFeature === 'routes-map') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                  <Map className="w-5 h-5 text-cyan-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Trending Routes Map
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Popular shipping routes visualization
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <TrendingRoutesMap />
              </div>
            </motion.div>
          )}

          {/* Quick Quote Demo */}
          {(activeFeature === null || activeFeature === 'quick-quote') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Quick Quote Popup
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Fast quote request in seconds
                  </p>
                </div>
              </div>
              
              {/* Quick Quote Button Variants */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <h4 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Button Variants</h4>
                <div className="flex flex-wrap gap-6 items-center justify-center">
                  <div className="text-center">
                    <div className="mb-2">
                      <QuickQuoteButton showLabel={true} />
                    </div>
                    <span className="text-xs text-slate-500">Default</span>
                  </div>
                  <div className="text-center">
                    <div className="mb-2">
                      <QuickQuoteButtonCompact />
                    </div>
                    <span className="text-xs text-slate-500">Compact</span>
                  </div>
                  <div className="text-center">
                    <div className="mb-2">
                      <QuickQuoteButtonInline />
                    </div>
                    <span className="text-xs text-slate-500">Inline</span>
                  </div>
                </div>
                <p className="text-sm text-slate-500 text-center mt-6">
                  The FAB appears in the bottom-right corner of the page
                </p>
              </div>
              
              {/* Quick Quote Popup (Inline Demo) */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                <h4 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Popup Preview</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Click any button above to see the full multi-step quote wizard with route selection, package details, service options, and instant pricing.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '6', label: 'Live Features', icon: Sparkles },
              { value: '4', label: 'Languages', icon: TrendingUp },
              { value: '60fps', label: 'Animations', icon: Zap },
              { value: '100%', label: 'TypeScript', icon: Activity },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Quote Popup (Always Available) */}
      <QuickQuotePopup />
      
      {/* Floating Quick Quote Button */}
      <QuickQuoteButton />
    </div>
  );
}
