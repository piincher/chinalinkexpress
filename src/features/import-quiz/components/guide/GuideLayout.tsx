/**
 * GuideLayout Component
 * 
 * Main layout wrapper for the personalized import guide page.
 * Provides a full-page layout with sticky header, scrollable content,
 * anti-print protection, and watermark for security.
 */

'use client';

import { cn } from '@/lib/utils';
import { Package, MessageCircle, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

interface GuideLayoutProps {
  /** Main content to render */
  children: React.ReactNode;
  /** User phone number for watermark (masked format recommended) */
  userPhone: string;
  /** Lead category based on quiz score */
  category: 'hot' | 'warm' | 'cold';
  /** Quiz score (0-100) */
  score: number;
}

const categoryConfig = {
  hot: {
    label: 'Prêt à importer',
    badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    gradient: 'from-emerald-500 to-emerald-600',
  },
  warm: {
    label: 'Presque prêt',
    badgeColor: 'bg-amber-100 text-amber-700 border-amber-200',
    gradient: 'from-amber-500 to-amber-600',
  },
  cold: {
    label: 'En apprentissage',
    badgeColor: 'bg-sky-100 text-sky-700 border-sky-200',
    gradient: 'from-sky-500 to-sky-600',
  },
};

/**
 * ScoreBadge - Animated score display for header
 */
function ScoreBadge({ score, category }: { score: number; category: 'hot' | 'warm' | 'cold' }) {
  const config = categoryConfig[category];

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className={cn(
        'flex items-center gap-2 px-3 py-1.5 rounded-full',
        'bg-white border shadow-sm',
        config.badgeColor
      )}
    >
      <span className="text-sm font-semibold">{score}/100</span>
      <span className="hidden sm:inline text-xs opacity-75">• {config.label}</span>
    </motion.div>
  );
}

/**
 * Watermark - Semi-transparent repeating watermark
 */
function Watermark({ userPhone }: { userPhone: string }) {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
      aria-hidden="true"
    >
      <div
        className={cn(
          'absolute inset-0 opacity-[0.03]',
          'text-slate-900 text-lg font-medium',
          'select-none'
        )}
        style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
              <text x="50%" y="50%" transform="rotate(-45 200 200)" text-anchor="middle" font-family="system-ui" font-size="16" fill="currentColor">
                ChinaLink • ${userPhone}
              </text>
            </svg>`
          )}")`,
          backgroundRepeat: 'repeat',
        }}
      />
    </div>
  );
}

/**
 * GuideLayout - Full-page layout for personalized import guide
 */
export function GuideLayout({
  children,
  userPhone,
  category,
  score,
}: GuideLayoutProps) {
  const config = categoryConfig[category];

  return (
    <>
      {/* Anti-Print Protection */}
      <style jsx global>{`
        @media print {
          body {
            display: none !important;
          }
        }
        
        /* Prevent text selection for security */
        .guide-content {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }
        
        /* Allow selection on interactive elements */
        .guide-content a,
        .guide-content button,
        .guide-content input {
          user-select: text;
          -webkit-user-select: text;
        }
      `}</style>

      {/* Watermark Layer */}
      <Watermark userPhone={userPhone} />

      {/* Main Layout */}
      <div
        className={cn(
          'min-h-screen flex flex-col',
          'bg-gradient-to-br from-slate-50 via-white to-blue-50',
          'dark:from-slate-950 dark:via-slate-900 dark:to-slate-950',
          'guide-content'
        )}
      >
        {/* Header - Sticky */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className={cn(
            'sticky top-0 z-50',
            'bg-white/80 dark:bg-slate-900/80',
            'backdrop-blur-md',
            'border-b border-slate-200 dark:border-slate-800',
            'shadow-sm'
          )}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'w-9 h-9 rounded-lg flex items-center justify-center',
                    'bg-gradient-to-br from-red-600 to-red-500',
                    'shadow-lg shadow-red-500/25'
                  )}
                >
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                    ChinaLink Express
                  </span>
                  <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                    Votre partenaire Chine-Afrique
                  </span>
                </div>
              </div>

              {/* Greeting & Score */}
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Guide personnalisé
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    pour {userPhone}
                  </span>
                </div>
                <ScoreBadge score={score} category={category} />
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content - Scrollable */}
        <main className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
          >
            {/* Category Banner */}
            <div
              className={cn(
                'mb-8 p-4 rounded-xl border',
                'bg-gradient-to-r',
                config.gradient,
                'text-white shadow-lg'
              )}
            >
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 flex-shrink-0" />
                <div>
                  <h1 className="font-semibold">{config.label}</h1>
                  <p className="text-sm opacity-90">
                    Votre score: {score}/100 - Ce guide est adapté à votre niveau de readiness
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            {children}
          </motion.div>
        </main>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className={cn(
            'mt-auto',
            'bg-white dark:bg-slate-900',
            'border-t border-slate-200 dark:border-slate-800'
          )}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* WhatsApp Contact */}
              <a
                href="https://wa.me/22300000000?text=Bonjour%20ChinaLink%2C%20j'ai%20une%20question%20sur%20mon%20guide%20personnalisé"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg',
                  'bg-emerald-50 dark:bg-emerald-900/20',
                  'text-emerald-700 dark:text-emerald-400',
                  'hover:bg-emerald-100 dark:hover:bg-emerald-900/30',
                  'transition-colors'
                )}
              >
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Contactez-nous sur WhatsApp</span>
              </a>

              {/* Copyright & Security Note */}
              <div className="text-center sm:text-right">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  © {new Date().getFullYear()} ChinaLink Express
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                  Guide confidentiel - Usage personnel uniquement
                </p>
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </>
  );
}

export default GuideLayout;
