/**
 * Language Selector
 * 
 * Dropdown for selecting language with flags.
 * Part of the language components.
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { i18nConfig, type Locale } from '@/i18n/config';

interface LanguageSelectorProps {
  locale: Locale;
  variant?: 'default' | 'compact' | 'minimal';
  className?: string;
  align?: 'left' | 'right';
}

const LANGUAGE_INFO: Record<Locale, { name: string; flag: string; dir: 'ltr' | 'rtl' }> = {
  fr: { name: 'Français', flag: '🇫🇷', dir: 'ltr' },
  en: { name: 'English', flag: '🇬🇧', dir: 'ltr' },
  zh: { name: '中文', flag: '🇨🇳', dir: 'ltr' },
  ar: { name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
};

export function LanguageSelector({ 
  locale, 
  variant = 'default', 
  className,
  align = 'right'
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (newLocale: Locale) => {
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }

    // Replace locale in pathname
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
    setIsOpen(false);
  };

  const currentLang = LANGUAGE_INFO[locale];

  if (variant === 'minimal') {
    return (
      <div className={cn('relative', className)} ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Select language"
        >
          <span className="text-xl">{currentLang.flag}</span>
          <ChevronDown className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={cn(
                'absolute top-full mt-2 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 min-w-[160px]',
                align === 'right' ? 'right-0' : 'left-0'
              )}
            >
              {i18nConfig.locales.map((l) => (
                <button
                  key={l}
                  onClick={() => handleLanguageChange(l)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors',
                    l === locale && 'bg-blue-50 dark:bg-blue-900/20'
                  )}
                >
                  <span className="text-xl">{LANGUAGE_INFO[l].flag}</span>
                  <span className={cn(
                    'text-sm',
                    l === locale ? 'font-medium text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                  )}>
                    {LANGUAGE_INFO[l].name}
                  </span>
                  {l === locale && <Check className="w-4 h-4 text-blue-500 ml-auto" />}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={cn('relative', className)} ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Select language"
        >
          <span className="text-lg">{currentLang.flag}</span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase">
            {locale}
          </span>
          <ChevronDown className={cn('w-4 h-4 text-gray-500 transition-transform', isOpen && 'rotate-180')} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={cn(
                'absolute top-full mt-2 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 min-w-[180px]',
                align === 'right' ? 'right-0' : 'left-0'
              )}
            >
              {i18nConfig.locales.map((l) => (
                <button
                  key={l}
                  onClick={() => handleLanguageChange(l)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors',
                    l === locale && 'bg-blue-50 dark:bg-blue-900/20'
                  )}
                >
                  <span className="text-xl">{LANGUAGE_INFO[l].flag}</span>
                  <span className={cn(
                    'text-sm',
                    l === locale ? 'font-medium text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                  )}>
                    {LANGUAGE_INFO[l].name}
                  </span>
                  {l === locale && <Check className="w-4 h-4 text-blue-500 ml-auto" />}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors w-full"
        aria-label="Select language"
      >
        <span className="text-2xl">{currentLang.flag}</span>
        <div className="text-left flex-1">
          <span className="block text-sm font-medium text-gray-900 dark:text-white">
            {currentLang.name}
          </span>
          <span className="block text-xs text-gray-500 dark:text-gray-400">
            {locale.toUpperCase()}
          </span>
        </div>
        <ChevronDown className={cn('w-5 h-5 text-gray-500 transition-transform', isOpen && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'absolute top-full mt-2 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 min-w-[220px]',
              align === 'right' ? 'right-0' : 'left-0'
            )}
          >
            {i18nConfig.locales.map((l) => (
              <button
                key={l}
                onClick={() => handleLanguageChange(l)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors',
                  l === locale && 'bg-blue-50 dark:bg-blue-900/20'
                )}
              >
                <span className="text-2xl">{LANGUAGE_INFO[l].flag}</span>
                <div className="flex-1">
                  <span className={cn(
                    'block text-sm',
                    l === locale ? 'font-medium text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                  )}>
                    {LANGUAGE_INFO[l].name}
                  </span>
                  <span className="block text-xs text-gray-500 dark:text-gray-400">
                    {l.toUpperCase()}
                  </span>
                </div>
                {l === locale && <Check className="w-5 h-5 text-blue-500" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
