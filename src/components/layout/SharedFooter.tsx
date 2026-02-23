/**
 * Shared Footer Component
 *
 * Site-wide footer with links, contact info, and social links.
 * Supports RTL layouts and dark mode.
 * Part of the layout components.
 */

'use client';

import Link from 'next/link';
import { Facebook, Linkedin, Twitter, Instagram, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { getCurrentYear } from '@/lib/utils';
import type { Locale } from '@/i18n/config';

interface SharedFooterProps {
  locale: Locale;
  className?: string;
}

const SOCIAL_LINKS = [
  { icon: Facebook, href: 'https://facebook.com/chinalinkexpress', label: 'Facebook', color: 'hover:bg-blue-500' },
  { icon: Instagram, href: 'https://instagram.com/chinalinkexpress', label: 'Instagram', color: 'hover:bg-pink-500' },
  { icon: Linkedin, href: 'https://linkedin.com/company/chinalinkexpress', label: 'LinkedIn', color: 'hover:bg-blue-700' },
] as const;

export function SharedFooter({ locale, className }: SharedFooterProps) {
  const t = useTranslations();
  const year = getCurrentYear();

  return (
    <footer className={cn('bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href={`/${locale}/`} className="inline-block mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                CHINALINK
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={cn(
                      'w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-white transition-colors',
                      social.color
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              {t('footer.services')}
            </h3>
            <ul className="space-y-3">
              {['navigation.services', 'navigation.tracking', 'navigation.pricing', 'navigation.calculator'].map((key) => (
                <li key={key}>
                  <Link
                    href={`/${locale}/services`}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              {t('footer.links')}
            </h3>
            <ul className="space-y-3">
              {['navigation.about', 'navigation.faq', 'navigation.contact', 'navigation.privacy', 'navigation.terms'].map((key) => {
                const getHref = () => {
                  if (key === 'navigation.about') return '#about';
                  if (key === 'navigation.contact') return '#contact';
                  if (key === 'navigation.privacy') return 'privacy';
                  if (key === 'navigation.terms') return 'terms';
                  return 'faq';
                };
                return (
                  <li key={key}>
                    <Link
                      href={`/${locale}/${getHref()}`}
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                    >
                      {t(key)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              {t('contact.info.title')}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  Kalaban Coura, Bamako, Mali
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  <a href="tel:+8618851725957" className="hover:text-blue-600 dark:hover:text-blue-400 block">+86 188 5172 5957</a>
                  <a href="tel:+22376696177" className="hover:text-blue-600 dark:hover:text-blue-400 block">+223 76 69 61 77</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <a
                  href="mailto:contact@chinalinkexpress.com"
                  className="text-gray-600 dark:text-gray-400 text-sm hover:text-blue-600 dark:hover:text-blue-400"
                >
                  contact@chinalinkexpress.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  <p>{t('contact.info.hoursWeekday')}</p>
                  <p>{t('contact.info.hoursSaturday')}</p>
                  <p>{t('contact.info.hoursSunday')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 dark:text-gray-500 text-sm text-center md:text-left">
              &copy; {year} ChinaLink Express. {t('footer.copyright')}
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm">
              {t('footer.developedBy')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SharedFooter;
