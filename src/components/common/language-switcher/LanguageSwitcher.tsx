/**
 * Language Switcher Component
 * 
 * A dropdown component for switching between supported languages.
 * Supports RTL layouts and shows flags + language names.
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Link } from '@/lib/i18n/navigation';
import { i18nConfig, type Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  currentLocale: Locale;
  className?: string;
}

/**
 * Language Switcher Dropdown
 */
export function LanguageSwitcher({ currentLocale, className }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get current locale info
  const currentLocaleInfo = i18nConfig.localeLabels[currentLocale];

  // Remove locale prefix from pathname
  const pathnameWithoutLocale = pathname.replace(/^\/(fr|en|zh|ar)/, '') || '/';

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="text-lg">{currentLocaleInfo.flag}</span>
        <span className="text-sm font-medium text-gray-700 hidden sm:inline">
          {currentLocaleInfo.label}
        </span>
        <svg
          className={cn(
            'w-4 h-4 text-gray-500 transition-transform',
            isOpen && 'rotate-180'
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={cn(
            'absolute mt-2 w-48 rounded-lg bg-white shadow-lg border border-gray-200 py-1 z-50',
            currentLocaleInfo.dir === 'rtl' ? 'left-0' : 'right-0'
          )}
        >
          {i18nConfig.locales.map((locale) => {
            const localeInfo = i18nConfig.localeLabels[locale];
            const isActive = locale === currentLocale;

            return (
              <Link
                key={locale}
                href={pathnameWithoutLocale}
                locale={locale}
                className={cn(
                  'flex items-center px-4 py-2 text-sm transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
                onClick={() => setIsOpen(false)}
              >
                <span className="text-lg mr-3">{localeInfo.flag}</span>
                <span className="flex-1">{localeInfo.label}</span>
                {isActive && (
                  <svg
                    className="w-4 h-4 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

/**
 * Mobile Language Switcher (Horizontal scroll)
 */
export function MobileLanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname();
  const pathnameWithoutLocale = pathname.replace(/^\/(fr|en|zh|ar)/, '') || '/';

  return (
    <div className="flex space-x-2 overflow-x-auto pb-2">
      {i18nConfig.locales.map((locale) => {
        const localeInfo = i18nConfig.localeLabels[locale];
        const isActive = locale === currentLocale;

        return (
          <Link
            key={locale}
            href={pathnameWithoutLocale}
            locale={locale}
            className={cn(
              'flex items-center px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-colors',
              isActive
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            <span className="mr-2">{localeInfo.flag}</span>
            <span>{localeInfo.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

export default LanguageSwitcher;
