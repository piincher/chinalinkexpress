/**
 * ItemResultCard Component
 *
 * Result card for each dangerous goods item showing status badge,
 * bilingual name, category, description, and shipping advice.
 */

'use client';

import { motion } from 'framer-motion';
import {
  CheckCircle2,
  AlertTriangle,
  Ban,
  FileCheck,
  Smartphone,
  Laptop,
  BatteryCharging,
  Volume2,
  Tablet,
  Camera,
  Plane,
  Bike,
  Watch,
  Wind,
  Droplets,
  Paintbrush,
  SprayCan,
  Sparkles,
  Sun,
  Palette,
  Droplet,
  PaintBucket,
  ShowerHead,
  CircleDot,
  Container,
  Flame,
  Wine,
  Coffee,
  Candy,
  Soup,
  Baby,
  Snowflake,
  Hexagon,
  Shirt,
  Footprints,
  ScrollText,
  Scissors,
  ShoppingBag,
  Gem,
  Link,
  Cone,
  Zap,
  Wrench,
  Cog,
  Tractor,
  ThermometerSnowflake,
  Pill,
  Syringe,
  Shield,
  Heart,
  Activity,
  Smile,
  Eye,
  Cross,
  Trash2,
  Bug,
  Magnet,
  BatteryWarning,
  Cylinder,
  Bomb,
  Sword,
  Crosshair,
  ShieldAlert,
  Lock,
  Target,
  HardHat,
  Banknote,
  FileText,
  Receipt,
  GraduationCap,
  CreditCard,
  AlertOctagon,
  Sprout,
  Leaf,
  Shovel,
  TreePine,
  Bone,
  Fish,
  CloudRain,
  Info,
  Package,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { STATUS_CONFIGS, SHIPPING_ADVICE } from '../data';
import { DangerousGoodsItem } from '../types';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Smartphone,
  Laptop,
  BatteryCharging,
  Volume2,
  Tablet,
  Camera,
  Plane,
  Bike,
  Watch,
  Wind,
  Droplets,
  Paintbrush,
  SprayCan,
  Sparkles,
  Sun,
  Palette,
  Droplet,
  PaintBucket,
  ShowerHead,
  CircleDot,
  Container,
  Flame,
  Wine,
  Coffee,
  Candy,
  Soup,
  Baby,
  Snowflake,
  Hexagon,
  Shirt,
  Footprints,
  ScrollText,
  Scissors,
  ShoppingBag,
  Gem,
  Link,
  Cone,
  Zap,
  Wrench,
  Cog,
  Tractor,
  ThermometerSnowflake,
  Pill,
  Syringe,
  Shield,
  Heart,
  Activity,
  Smile,
  Eye,
  Cross,
  Trash2,
  Bug,
  Magnet,
  BatteryWarning,
  Cylinder,
  Bomb,
  Sword,
  Crosshair,
  ShieldAlert,
  Lock,
  Target,
  HardHat,
  Banknote,
  FileText,
  Receipt,
  GraduationCap,
  CreditCard,
  AlertOctagon,
  Sprout,
  Leaf,
  Shovel,
  TreePine,
  Bone,
  Fish,
  CloudRain,
  Info,
  Package,
};

const statusConfigStyles: Record<string, { border: string; badge: string; iconBg: string }> = {
  allowed: {
    border: 'border-emerald-500/20 hover:border-emerald-500/40',
    badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    iconBg: 'bg-emerald-500/15 text-emerald-400',
  },
  restricted: {
    border: 'border-amber-500/20 hover:border-amber-500/40',
    badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    iconBg: 'bg-amber-500/15 text-amber-400',
  },
  prohibited: {
    border: 'border-rose-500/20 hover:border-rose-500/40',
    badge: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    iconBg: 'bg-rose-500/15 text-rose-400',
  },
  'permit-required': {
    border: 'border-blue-500/20 hover:border-blue-500/40',
    badge: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    iconBg: 'bg-blue-500/15 text-blue-400',
  },
};

const statusIcons: Record<string, React.ReactNode> = {
  allowed: <CheckCircle2 className="w-4 h-4" />,
  restricted: <AlertTriangle className="w-4 h-4" />,
  prohibited: <Ban className="w-4 h-4" />,
  'permit-required': <FileCheck className="w-4 h-4" />,
};

interface ItemResultCardProps {
  item: DangerousGoodsItem;
  locale?: 'en' | 'fr';
  index?: number;
}

export function ItemResultCard({ item, locale = 'fr', index = 0 }: ItemResultCardProps) {
  const isEn = locale === 'en';
  const styles = statusConfigStyles[item.status];
  const statusConfig = STATUS_CONFIGS[item.status];
  const IconComponent = iconMap[item.icon] || Package;
  const advice = SHIPPING_ADVICE[item.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className={cn(
        'group relative overflow-hidden rounded-2xl border backdrop-blur-md transition-all duration-300',
        'bg-slate-900/60 hover:bg-slate-800/70',
        styles.border
      )}
    >
      {/* Status indicator bar */}
      <div className={cn('h-1 w-full', STATUS_CONFIGS[item.status].bgColor)} />

      <div className="p-5">
        {/* Header: Icon + Name + Badge */}
        <div className="flex items-start gap-4">
          <div
            className={cn(
              'flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center',
              styles.iconBg
            )}
          >
            <IconComponent className="w-6 h-6" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-white leading-tight">
                  {isEn ? item.name : item.nameFr}
                </h3>
                <p className="text-sm text-slate-400 mt-0.5">
                  {isEn ? item.nameFr : item.name}
                </p>
              </div>

              <span
                className={cn(
                  'flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border',
                  styles.badge
                )}
              >
                {statusIcons[item.status]}
                {isEn ? statusConfig.label : statusConfig.labelFr}
              </span>
            </div>

            {/* Category tag */}
            <div className="mt-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700/50">
                {isEn ? item.categoryFr : item.categoryFr}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <p className="text-sm text-slate-300 leading-relaxed">
            {isEn ? item.description : item.descriptionFr}
          </p>
        </div>

        {/* Special notes */}
        {(item.notes || item.notesFr) && (
          <div className="mt-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-400 leading-relaxed">
                {isEn ? item.notes : item.notesFr}
              </p>
            </div>
          </div>
        )}

        {/* Shipping advice */}
        {advice && (
          <div className="mt-3 flex items-start gap-2">
            <Package className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-slate-500 leading-relaxed">
              <span className="font-medium text-slate-400">
                {isEn ? 'Shipping tip: ' : 'Conseil d\'expédition : '}
              </span>
              {isEn ? advice.en : advice.fr}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
