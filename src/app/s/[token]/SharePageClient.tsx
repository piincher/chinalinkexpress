'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { NextIntlClientProvider } from 'next-intl';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  Warehouse,
  Ship,
  Plane,
  Truck,
  MapPin,
  PackageCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Smartphone,
  ChevronRight,
  Link2Off,
  RefreshCw,
  Container,
  HelpCircle,
} from 'lucide-react';
import {
  SharedShipmentResult,
  SharedShipmentGoods,
  SharedShipmentContainer,
  SharedShipmentOrder,
  PlatformInfo,
  getStatusConfig,
  TYPE_LABELS,
  type StatusConfig,
} from './types';
import { AppStoreButtons, OpenInAppButton } from '@/components/shared/AppStoreButtons';

// ============================================================================
// Types
// ============================================================================

type ShareError = 'not_found' | 'revoked' | 'rate_limited' | 'api_error';

interface SharePageClientProps {
  token: string;
  data?: SharedShipmentResult;
  error?: ShareError;
  locale: string;
  messages: Record<string, unknown>;
  platform: PlatformInfo;
}

// ============================================================================
// Icon Mapping
// ============================================================================

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Package,
  Warehouse,
  Ship,
  Plane,
  Truck,
  MapPin,
  PackageCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Container,
  HelpCircle,
};

function StatusIcon({ config, className }: { config: StatusConfig; className?: string }) {
  const Icon = ICON_MAP[config.icon] || Package;
  return <Icon className={className} />;
}

function ShippingModeIcon({ mode, className }: { mode?: string; className?: string }) {
  if (!mode) return <Truck className={className} />;
  const m = mode.toUpperCase();
  if (m === 'AIR') return <Plane className={className} />;
  if (m === 'SEA') return <Ship className={className} />;
  return <Truck className={className} />;
}

// ============================================================================
// Date Formatting
// ============================================================================

function useFormatters(locale: string) {
  const formatDate = useCallback(
    (dateStr: string | undefined) => {
      if (!dateStr) return '-';
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return '-';
      return new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(d);
    },
    [locale]
  );

  const formatDateTime = useCallback(
    (dateStr: string | undefined) => {
      if (!dateStr) return '-';
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return '-';
      return new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      }).format(d);
    },
    [locale]
  );

  return { formatDate, formatDateTime };
}

// ============================================================================
// Animation Variants
// ============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
} as const;

const timelineItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

const errorContainerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
} as const;

// ============================================================================
// Sub-Components
// ============================================================================

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="w-8 h-8 rounded-lg bg-[#0277BD] flex items-center justify-center transition-transform group-hover:scale-105">
        <Package className="w-5 h-5 text-white" />
      </div>
      <span className="font-bold text-[#0277BD] text-lg tracking-tight">ChinaLink Express</span>
    </Link>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config = getStatusConfig(status);
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold"
      style={{ color: config.color, backgroundColor: config.bg }}
    >
      <StatusIcon config={config} className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
}

function DetailRow({
  label,
  value,
  icon,
}: {
  label: string;
  value?: string | number | null;
  icon?: React.ReactNode;
}) {
  if (value === undefined || value === null || value === '') return null;
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-[var(--border)] last:border-0">
      <span className="text-sm text-[var(--text-secondary)] flex items-center gap-2">
        {icon}
        {label}
      </span>
      <span className="text-sm font-medium text-[var(--text-primary)]">{value}</span>
    </div>
  );
}

function Timeline({
  events,
  currentStatus,
  locale,
}: {
  events: SharedShipmentResult['timeline'];
  currentStatus: string;
  locale: string;
}) {
  const { formatDate } = useFormatters(locale);
  const t = useTranslations('sharedShipment');

  if (!events || events.length === 0) {
    return (
      <div className="text-center py-8 text-[var(--text-muted)]">
        <Clock className="w-10 h-10 mx-auto mb-2 opacity-50" />
        <p className="text-sm">{t('noTimeline')}</p>
      </div>
    );
  }

  const currentIndex = events.findIndex((e) => e.status === currentStatus);
  const activeIndex = currentIndex >= 0 ? currentIndex : events.length - 1;

  return (
    <div className="space-y-0">
      <AnimatePresence>
        {events.map((event, index) => {
          const config = getStatusConfig(event.status);
          const isPast = index < activeIndex;
          const isCurrent = index === activeIndex;
          const isFuture = index > activeIndex;

          const dotColor = isFuture ? '#9CA3AF' : config.color;
          const lineColor = isPast || isCurrent ? config.color : 'var(--border)';
          const isLast = index === events.length - 1;

          return (
            <motion.div
              key={`${event.status}-${index}`}
              custom={index}
              variants={timelineItemVariants}
              initial="hidden"
              animate="visible"
              className="flex gap-3"
            >
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div
                    className="w-3 h-3 rounded-full shrink-0 mt-1.5"
                    style={{ backgroundColor: dotColor }}
                  />
                  {isCurrent && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: config.color }}
                      animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                    />
                  )}
                </div>
                {!isLast && (
                  <div
                    className="w-0.5 flex-1 my-1"
                    style={{ backgroundColor: lineColor, opacity: isFuture ? 0.4 : 1 }}
                  />
                )}
              </div>
              <div className="pb-6 flex-1 min-w-0">
                <div className="flex items-center justify-between gap-4">
                  <span
                    className="text-sm font-semibold truncate"
                    style={{ color: isFuture ? 'var(--text-muted)' : 'var(--text-primary)' }}
                  >
                    {config.label}
                  </span>
                  <span className="text-xs text-[var(--text-muted)] whitespace-nowrap shrink-0">
                    {formatDate(event.timestamp)}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">{event.location}</p>
                {event.description && (
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{event.description}</p>
                )}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

function DetailCard({ data, locale }: { data: SharedShipmentResult; locale: string }) {
  const { type, data: details, estimatedDelivery } = data;
  const { formatDate } = useFormatters(locale);
  const t = useTranslations('sharedShipment');

  return (
    <motion.div variants={itemVariants} className="rounded-2xl card-surface p-5">
      <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">{t('details')}</h2>

      {type === 'goods' && (
        <>
          <DetailRow label={t('description')} value={(details as SharedShipmentGoods).description} />
          <DetailRow label={t('category')} value={(details as SharedShipmentGoods).category} />
          <DetailRow
            label={t('weight')}
            value={(details as SharedShipmentGoods).weightKg ? `${(details as SharedShipmentGoods).weightKg} kg` : undefined}
          />
          <DetailRow
            label={t('volume')}
            value={(details as SharedShipmentGoods).cbm ? `${(details as SharedShipmentGoods).cbm} CBM` : undefined}
          />
          <DetailRow label={t('quantity')} value={(details as SharedShipmentGoods).quantity} />
          <DetailRow
            label={t('shippingMode')}
            value={(details as SharedShipmentGoods).shippingMode}
            icon={<ShippingModeIcon mode={(details as SharedShipmentGoods).shippingMode} className="w-4 h-4 text-[var(--text-muted)]" />}
          />
          {(details as SharedShipmentGoods).container?.virtualContainerNumber && (
            <DetailRow
              label={t('container')}
              value={(details as SharedShipmentGoods).container?.virtualContainerNumber}
            />
          )}
          {(details as SharedShipmentGoods).airwayBill?.awbNumber && (
            <DetailRow
              label={t('awb')}
              value={(details as SharedShipmentGoods).airwayBill?.awbNumber}
            />
          )}
        </>
      )}

      {type === 'container' && (
        <>
          <DetailRow
            label={t('containerNumber')}
            value={(details as SharedShipmentContainer).containerNumber}
          />
          <DetailRow
            label={t('shippingLine')}
            value={(details as SharedShipmentContainer).shippingLine}
          />
          <DetailRow
            label={t('shippingMode')}
            value={(details as SharedShipmentContainer).shippingMode}
            icon={<ShippingModeIcon mode={(details as SharedShipmentContainer).shippingMode} className="w-4 h-4 text-[var(--text-muted)]" />}
          />
          <DetailRow label={t('origin')} value={(details as SharedShipmentContainer).origin} />
          <DetailRow
            label={t('destination')}
            value={(details as SharedShipmentContainer).destination}
          />
          <DetailRow
            label={t('goods')}
            value={`${(details as SharedShipmentContainer).goodsCount} ${t('items')}`}
          />
        </>
      )}

      {type === 'order' && (
        <>
          <DetailRow label={t('orderId')} value={(details as SharedShipmentOrder).orderId} />
          <DetailRow
            label={t('shippingMode')}
            value={(details as SharedShipmentOrder).shippingMode}
            icon={<ShippingModeIcon mode={(details as SharedShipmentOrder).shippingMode} className="w-4 h-4 text-[var(--text-muted)]" />}
          />
          <DetailRow
            label={t('destination')}
            value={(details as SharedShipmentOrder).destinationCountry}
          />
          <DetailRow label={t('line')} value={(details as SharedShipmentOrder).shipmentLine} />
          <DetailRow label={t('weight')} value={(details as SharedShipmentOrder).packageWeight} />
          <DetailRow label={t('quantity')} value={(details as SharedShipmentOrder).quantity} />
          <DetailRow
            label={t('goods')}
            value={`${(details as SharedShipmentOrder).goodsCount} ${t('items')}`}
          />
        </>
      )}

      {estimatedDelivery && (
        <div className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-[#EFF8FF]">
          <Clock className="w-5 h-5 text-[#0277BD] shrink-0" />
          <div>
            <p className="text-xs text-[var(--text-secondary)]">{t('estimatedDelivery')}</p>
            <p className="text-base font-bold text-[#0277BD]">{formatDate(estimatedDelivery)}</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}

function AppCTA({ token, platform }: { token: string; platform: PlatformInfo }) {
  const t = useTranslations('sharedShipment');
  const [qrUrl, setQrUrl] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const webUrl = window.location.href;
      setQrUrl(
        `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(webUrl)}`
      );
    }
  }, []);

  return (
    <motion.div variants={itemVariants} className="rounded-2xl card-surface p-5 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#0277BD]/10 flex items-center justify-center">
          <Smartphone className="w-5 h-5 text-[#0277BD]" />
        </div>
        <div>
          <h3 className="text-base font-bold text-[var(--text-primary)]">{t('downloadApp')}</h3>
          <p className="text-xs text-[var(--text-secondary)]">{t('appDescription')}</p>
        </div>
      </div>

      {(platform.isIOS || platform.isAndroid) && (
        <div className="space-y-2">
          <OpenInAppButton token={token} />
          <p className="text-xs text-[var(--text-muted)] text-center">
            {platform.isIOS ? t('iosDetected') : t('androidDetected')}
          </p>
        </div>
      )}

      {platform.isDesktop && qrUrl && (
        <div className="text-center">
          <div className="inline-block p-3 bg-white rounded-xl border border-[var(--border)] mb-3">
            <img src={qrUrl} alt="QR Code" className="w-32 h-32" />
          </div>
          <p className="text-xs text-[var(--text-muted)] mb-4">{t('qrCodeHint')}</p>
        </div>
      )}

      <div className="pt-3 border-t border-[var(--border)]">
        <p className="text-xs text-[var(--text-muted)] text-center mb-3">{t('noApp')}</p>
        <AppStoreButtons token={token} className="justify-center" />
      </div>
    </motion.div>
  );
}

function ErrorView({
  icon: Icon,
  title,
  description,
  actions,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  actions?: React.ReactNode;
}) {
  return (
    <motion.div
      variants={errorContainerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen flex flex-col"
    >
      <header className="sticky top-0 z-10 border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center">
          <Logo />
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-[#FEF2F2] flex items-center justify-center mx-auto mb-4">
            <Icon className="w-8 h-8 text-[#EF4444]" />
          </div>
          <h1 className="text-xl font-bold text-[var(--text-primary)] mb-2">{title}</h1>
          <p className="text-sm text-[var(--text-secondary)] mb-6">{description}</p>
          {actions || (
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0277BD] text-white rounded-xl text-sm font-semibold hover:bg-[#01579B] transition-colors"
            >
              {title}
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </main>
    </motion.div>
  );
}

// ============================================================================
// Loading Spinner
// ============================================================================

function LoadingSpinner() {
  const t = useTranslations('sharedShipment');
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white">
      <div className="text-center">
        <div className="w-10 h-10 border-3 border-[var(--border)] border-t-[#0277BD] rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-[var(--text-secondary)]">{t('loading')}</p>
      </div>
    </div>
  );
}

// ============================================================================
// Main Content
// ============================================================================

function SharePageContent({
  token,
  initialData,
  initialError,
  platform,
  locale,
}: {
  token: string;
  initialData?: SharedShipmentResult;
  initialError?: ShareError;
  platform: PlatformInfo;
  locale: string;
}) {
  const t = useTranslations('sharedShipment');
  const { formatDate } = useFormatters(locale);
  const [data, setData] = useState(initialData);
  const [error, setError] = useState<ShareError | undefined>(initialError);
  const [loading, setLoading] = useState(false);

  const handleRetry = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    try {
      const res = await fetch(`/api/v2/public/share/${token}`);
      if (res.status === 404) {
        setError('not_found');
        setData(undefined);
      } else if (res.status === 410) {
        setError('revoked');
        setData(undefined);
      } else if (res.status === 429) {
        setError('rate_limited');
        setData(undefined);
      } else if (!res.ok) {
        setError('api_error');
        setData(undefined);
      } else {
        const json = (await res.json()) as { data?: SharedShipmentResult };
        setData(json.data);
        setError(undefined);
      }
    } catch {
      setError('api_error');
      setData(undefined);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Initial client-side fetch if server returned no data and no error
  useEffect(() => {
    if (!initialData && !initialError) {
      handleRetry();
    }
  }, [initialData, initialError, handleRetry]);

  if (loading) {
    return <LoadingSpinner />;
  }

  // Error states
  if (error === 'not_found' || (!data && !loading && !error)) {
    return (
      <ErrorView
        icon={Link2Off}
        title={t('notFoundTitle')}
        description={t('notFoundDescription')}
        actions={
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0277BD] text-white rounded-xl text-sm font-semibold hover:bg-[#01579B] transition-colors"
          >
            {t('backHome')}
            <ChevronRight className="w-4 h-4" />
          </Link>
        }
      />
    );
  }

  if (error === 'revoked') {
    return (
      <ErrorView
        icon={AlertTriangle}
        title={t('revokedTitle')}
        description={t('revokedDescription')}
        actions={
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0277BD] text-white rounded-xl text-sm font-semibold hover:bg-[#01579B] transition-colors"
          >
            {t('backHome')}
            <ChevronRight className="w-4 h-4" />
          </Link>
        }
      />
    );
  }

  if (error === 'rate_limited') {
    return (
      <ErrorView
        icon={Clock}
        title={t('rateLimitedTitle')}
        description={t('rateLimitedDescription')}
        actions={
          <div className="flex flex-col gap-3">
            <button
              onClick={handleRetry}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0277BD] text-white rounded-xl text-sm font-semibold hover:bg-[#01579B] transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              {t('retry')}
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--text-primary)] rounded-xl text-sm font-semibold hover:bg-[var(--surface)] transition-colors"
            >
              {t('backHome')}
            </Link>
          </div>
        }
      />
    );
  }

  if (error === 'api_error') {
    return (
      <ErrorView
        icon={AlertTriangle}
        title={t('apiErrorTitle')}
        description={t('apiErrorDescription')}
        actions={
          <div className="flex flex-col gap-3">
            <button
              onClick={handleRetry}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0277BD] text-white rounded-xl text-sm font-semibold hover:bg-[#01579B] transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              {t('retry')}
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--text-primary)] rounded-xl text-sm font-semibold hover:bg-[var(--surface)] transition-colors"
            >
              {t('backHome')}
            </Link>
          </div>
        }
      />
    );
  }

  if (!data) {
    return (
      <ErrorView
        icon={AlertTriangle}
        title={t('unknownErrorTitle')}
        description={t('unknownErrorDescription')}
        actions={
          <button
            onClick={handleRetry}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0277BD] text-white rounded-xl text-sm font-semibold hover:bg-[#01579B] transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            {t('retry')}
          </button>
        }
      />
    );
  }

  const { type, data: details, currentStatus, timeline, sharedAt } = data;
  const typeLabel = TYPE_LABELS[type] || type;
  const statusConfig = getStatusConfig(currentStatus);

  let reference = '';
  if (type === 'goods') reference = (details as SharedShipmentGoods).goodsId || '';
  else if (type === 'container') reference = (details as SharedShipmentContainer).containerNumber || '';
  else if (type === 'order') reference = (details as SharedShipmentOrder).orderId || '';

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <Logo />
          <Link
            href="/"
            className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1"
          >
            {t('home')}
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <motion.main
        className="max-w-lg mx-auto px-4 py-6 space-y-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Status Card */}
        <motion.div
          variants={itemVariants}
          className="rounded-2xl card-surface p-5 text-center relative overflow-hidden"
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-1"
            style={{ backgroundColor: statusConfig.color }}
          />
          <p className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider mb-2">
            {typeLabel}
          </p>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-3 break-all">
            {reference}
          </h1>
          <div className="flex justify-center">
            <StatusBadge status={currentStatus} />
          </div>
          {sharedAt && (
            <p className="text-xs text-[var(--text-muted)] mt-3">
              {t('sharedAt')} {formatDate(sharedAt)}
            </p>
          )}
        </motion.div>

        {/* Details */}
        <DetailCard data={data} locale={locale} />

        {/* Timeline */}
        <motion.div variants={itemVariants} className="rounded-2xl card-surface p-5">
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">{t('history')}</h2>
          <Timeline events={timeline} currentStatus={currentStatus} locale={locale} />
        </motion.div>

        {/* App CTA */}
        <AppCTA token={token} platform={platform} />

        {/* Footer */}
        <motion.p
          variants={itemVariants}
          className="text-center text-xs text-[var(--text-muted)] pb-4"
        >
          {t('footer')}
        </motion.p>
      </motion.main>
    </div>
  );
}

// ============================================================================
// Exported Wrapper
// ============================================================================

export function SharePageClient({
  token,
  data,
  error,
  locale,
  messages,
  platform,
}: SharePageClientProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SharePageContent
        token={token}
        initialData={data}
        initialError={error}
        platform={platform}
        locale={locale}
      />
    </NextIntlClientProvider>
  );
}
