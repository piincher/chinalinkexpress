'use client';

/**
 * Localized 404 / app-link fallback.
 *
 * Deep links into the mobile app (e.g. /admin/order/:id, /order/:id, /goods/:id,
 * /tracking/:id) have NO marketing page on the website. When such a link is opened
 * on a device WITH the app, the OS opens the app directly via universal links — so
 * this page is only ever reached when the app is NOT installed (or the link was
 * opened manually in a browser). Instead of a hard 404, we offer "open in app" +
 * store download. No shipment data is shown (these routes are auth-gated).
 *
 * Genuine unknown paths fall back to a friendly branded 404 + home link.
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Smartphone, PackageSearch, X } from 'lucide-react';
import { AppStoreButtons } from '@/components/shared/AppStoreButtons';

const LOCALES = ['fr', 'en', 'zh', 'ar'] as const;
type Locale = (typeof LOCALES)[number];

// First path segment → this is an app deep-link route, not a website page.
// Mirrors the app's parseDeepLink / AASA components.
const APP_ROUTE_PREFIXES = new Set([
  'admin', 'admin-goods', 'admin-containers', 'order', 'goods', 'goods-list',
  'tracking', 'ticket', 'clients', 'consignees', 'packing', 'loading',
  'certificate', 'payments', 'outstanding', 'receive', 'unassigned', 'whatsapp',
  'campaigns', 'routes', 'search', 'batch', 'active-order', 'user-orders',
  'shipping', 'stats', 'notifications', 'support', 'dashboard', 'containers',
  'profile', 'orders', 'announcements', 'promos', 'reviews', 'badges', 'activity',
  'scan', 'scan-qr', 'verify',
]);

const STRINGS: Record<Locale, Record<string, string>> = {
  fr: {
    appTitle: "Disponible dans l'application",
    appSubtitle: "Cette page s'ouvre dans l'application ChinaLink Express. Ouvrez-la ci-dessous, ou téléchargez l'app.",
    genericTitle: 'Page introuvable',
    genericSubtitle: "Cette page n'existe pas ou a été déplacée.",
    openInApp: "Ouvrir dans l'application",
    noApp: "Vous n'avez pas l'application ?",
    backHome: "Retour à l'accueil",
    notOpened: "L'app ne s'est pas ouverte ?",
    notOpenedHelp: "Si l'application n'est pas installée, téléchargez-la depuis votre store.",
    close: 'Fermer',
  },
  en: {
    appTitle: 'Available in the app',
    appSubtitle: 'This page opens in the ChinaLink Express app. Open it below, or download the app.',
    genericTitle: 'Page not found',
    genericSubtitle: "This page doesn't exist or has moved.",
    openInApp: 'Open in the app',
    noApp: "Don't have the app?",
    backHome: 'Back to home',
    notOpened: "App didn't open?",
    notOpenedHelp: "If the app isn't installed, download it from your store.",
    close: 'Close',
  },
  zh: {
    appTitle: '在应用中查看',
    appSubtitle: '此页面在 ChinaLink Express 应用中打开。请在下方打开，或下载应用。',
    genericTitle: '页面未找到',
    genericSubtitle: '该页面不存在或已移动。',
    openInApp: '在应用中打开',
    noApp: '还没有应用？',
    backHome: '返回首页',
    notOpened: '应用没有打开？',
    notOpenedHelp: '如果尚未安装应用，请从应用商店下载。',
    close: '关闭',
  },
  ar: {
    appTitle: 'متوفر في التطبيق',
    appSubtitle: 'تُفتح هذه الصفحة في تطبيق ChinaLink Express. افتحها أدناه أو نزّل التطبيق.',
    genericTitle: 'الصفحة غير موجودة',
    genericSubtitle: 'هذه الصفحة غير موجودة أو تم نقلها.',
    openInApp: 'افتح في التطبيق',
    noApp: 'ليس لديك التطبيق؟',
    backHome: 'العودة إلى الرئيسية',
    notOpened: 'لم يفتح التطبيق؟',
    notOpenedHelp: 'إذا لم يكن التطبيق مثبتًا، نزّله من المتجر.',
    close: 'إغلاق',
  },
};

function parsePath(pathname: string): { locale: Locale; appPath: string | null } {
  const segments = pathname.split('/').filter(Boolean);
  let locale: Locale = 'fr';
  if (segments.length && (LOCALES as readonly string[]).includes(segments[0])) {
    locale = segments.shift() as Locale;
  }
  const appPath =
    segments.length && APP_ROUTE_PREFIXES.has(segments[0]) ? segments.join('/') : null;
  return { locale, appPath };
}

export default function LocaleNotFound() {
  const [{ locale, appPath }, setState] = useState<{ locale: Locale; appPath: string | null }>({
    locale: 'fr',
    appPath: null,
  });
  const [showStoreFallback, setShowStoreFallback] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setState(parsePath(window.location.pathname));
    }
  }, []);

  const t = STRINGS[locale];

  const handleOpenInApp = () => {
    if (!appPath) return;
    window.location.href = `chinalinkexpress://${appPath}`;
    // If nothing handled the scheme, the app isn't installed — surface stores.
    window.setTimeout(() => setShowStoreFallback(true), 2000);
  };

  const isAppRoute = Boolean(appPath);

  return (
    <div
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white dark:from-[#0a0a0a] dark:to-[#171717]"
    >
      <header className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[#0277BD] flex items-center justify-center transition-transform group-hover:scale-105">
              <PackageSearch className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <span className="font-bold text-[#0277BD] text-lg tracking-tight">ChinaLink Express</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="text-center max-w-sm w-full">
          <div className="w-16 h-16 rounded-full bg-[#EFF8FF] flex items-center justify-center mx-auto mb-4">
            {isAppRoute ? (
              <Smartphone className="w-8 h-8 text-[#0277BD]" />
            ) : (
              <PackageSearch className="w-8 h-8 text-[#0277BD]" />
            )}
          </div>

          <h1 className="text-xl font-bold text-[var(--text-primary)] mb-2">
            {isAppRoute ? t.appTitle : t.genericTitle}
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            {isAppRoute ? t.appSubtitle : t.genericSubtitle}
          </p>

          {isAppRoute && (
            <button
              onClick={handleOpenInApp}
              className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#0277BD] text-white rounded-xl text-sm font-semibold hover:bg-[#01579B] transition-colors mb-3"
            >
              <Smartphone className="w-5 h-5" />
              {t.openInApp}
            </button>
          )}

          <div className="pt-1">
            {isAppRoute && (
              <p className="text-xs text-[var(--text-muted)] mb-3">{t.noApp}</p>
            )}
            <AppStoreButtons className="justify-center" />
          </div>

          <Link
            href="/"
            className="inline-block mt-6 text-sm font-medium text-[#0277BD] hover:underline"
          >
            {t.backHome}
          </Link>
        </div>
      </main>

      {showStoreFallback && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4">
          <div className="bg-[var(--surface)] rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[var(--text-primary)]">{t.notOpened}</h3>
              <button
                onClick={() => setShowStoreFallback(false)}
                className="p-2.5 rounded-lg hover:bg-[var(--surface-elevated)] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={t.close}
              >
                <X className="w-5 h-5 text-[var(--text-secondary)]" />
              </button>
            </div>
            <p className="text-sm text-[var(--text-secondary)] mb-4">{t.notOpenedHelp}</p>
            <AppStoreButtons />
          </div>
        </div>
      )}
    </div>
  );
}
