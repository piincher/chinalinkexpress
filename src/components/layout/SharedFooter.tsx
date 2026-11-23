/**
 * Site footer: a statement block, three short link columns + contact, one small
 * row of SEO landing pages (each keeps an internal link), and the wordmark.
 */

'use client';

import Link from 'next/link';
import { Facebook, Linkedin, Instagram, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn, getCurrentYear } from '@/lib/utils';
import { Cta } from '@/components/site/Cta';
import { WHATSAPP_URL } from '@/constants/contact';
import type { Locale } from '@/i18n/config';

interface SharedFooterProps {
  locale: Locale;
  className?: string;
}

const SOCIAL_LINKS = [
  { icon: Facebook, href: 'https://facebook.com/chinalinkexpress', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com/chinalinkexpress', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com/company/chinalinkexpress', label: 'LinkedIn' },
] as const;

// Minimal footer (owner 2026-11-23): three short columns. The SEO landing
// pages keep one internal link each in the small row under the directory.
const COLUMNS = [
  {
    heading: 'footer.services',
    links: [
      { key: 'services.items.sourcing.title', href: 'services/sourcing' },
      { key: 'services.items.airFreight.title', href: 'services/air-freight' },
      { key: 'services.items.seaFreight.title', href: 'services/sea-freight' },
      { key: 'navigation.pricing', href: 'tarifs' },
    ],
  },
  {
    heading: 'footer.company',
    links: [
      { key: 'navigation.about', href: 'qui-sommes-nous' },
      { key: 'navigation.reviews', href: 'avis' },
      { key: 'navigation.faq', href: 'faq' },
      { key: 'navigation.contact', href: 'contact' },
    ],
  },
  {
    heading: 'navigation.tools',
    links: [
      { key: 'navigation.trackParcel', href: 'suivi' },
      { key: 'navigation.application', href: 'application' },
      { key: 'navigation.calculator', href: 'calculateur' },
    ],
  },
] as const;

const MORE_LINKS = [
  { labels: { fr: 'Cargo Chine Mali', en: 'China to Mali cargo', zh: '中国马里货运', ar: 'الشحن من الصين إلى مالي' }, href: 'cargo-chine-mali' },
  { labels: { fr: 'Transitaire Chine Mali', en: 'China to Mali freight forwarder', zh: '中国马里货代', ar: 'وكيل شحن من الصين إلى مالي' }, href: 'transitaire-chine-mali' },
  { key: 'navigation.whyUs', href: 'pourquoi-nous' },
  { key: 'navigation.shippingCalendar', href: 'calendrier' },
  { key: 'navigation.blog', href: 'blog' },
  { key: 'navigation.community', href: 'communaute' },
  { key: 'navigation.checkProduct', href: 'verifier-produit' },
] as const;

const LEGAL_LINKS = [
  { key: 'navigation.privacy', href: 'privacy' },
  { key: 'navigation.terms', href: 'terms' },
] as const;

export function SharedFooter({ locale, className }: SharedFooterProps) {
  const t = useTranslations();
  const year = getCurrentYear();

  return (
    <footer className={cn('band-void ft', className)}>
      <div className="ft-shell">
        {/* ── statement ──────────────────────────────────────────────────── */}
        <div className="ft-statement">
          <Link href={`/${locale}`} className="ft-wordmark">
            CHINALINK
          </Link>

          <p className="ft-desc">{t('footer.description')}</p>

          <Cta
            href={WHATSAPP_URL}
            external
            variant="solid"
            tone="void"
            icon={<MessageCircle size={17} aria-hidden />}
          >
            {t('cta.getQuote')}
          </Cta>

          <ul className="ft-social">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <Icon size={17} aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ── directory ──────────────────────────────────────────────────── */}
        <nav className="ft-dir" aria-label={t('footer.links')}>
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h2 className="ft-h">{t(col.heading)}</h2>
              <ul className="ft-list">
                {col.links.map(({ key, href }) => (
                  <li key={key}>
                    <Link href={`/${locale}/${href}`}>{t(key)}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="ft-h">{t('contact.info.title')}</h2>
            <ul className="ft-list ft-list--contact">
              <li>
                <MapPin size={15} aria-hidden />
                <span>Kalaban Coura, Bamako, Mali</span>
              </li>
              <li>
                <Phone size={15} aria-hidden />
                <span>
                  <a href="tel:+8618851725957" dir="ltr">+86 188 5172 5957</a>
                  <a href="tel:+22376696177" dir="ltr">+223 76 69 61 77</a>
                  <a href="tel:+22351005042" dir="ltr">+223 51 00 50 42</a>
                </span>
              </li>
              <li>
                <Mail size={15} aria-hidden />
                <a href="mailto:contact@chinalinkexpress.com">contact@chinalinkexpress.com</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <ul className="ft-more">
        {MORE_LINKS.map((link) => (
          <li key={link.href}>
            <Link href={`/${locale}/${link.href}`}>
              {'key' in link ? t(link.key) : link.labels[locale]}
            </Link>
          </li>
        ))}
      </ul>

      <div className="ft-giant" aria-hidden>
        CHINALINK
      </div>

      {/* ── legal ────────────────────────────────────────────────────────── */}
      <div className="ft-legal">
        <p>
          &copy; {year} ChinaLink Express. {t('footer.copyright')}
          {LEGAL_LINKS.map(({ key, href }) => (
            <span key={key}>
              {' · '}
              <Link href={`/${locale}/${href}`}>{t(key)}</Link>
            </span>
          ))}
        </p>
        {/* Agency credit. Its WhatsApp number was dropped: on every page it could be mistaken for ChinaLink's. */}
        <p>
          Made by{' '}
          <a href="https://nuvotech.tech" target="_blank" rel="noopener noreferrer">
            nuvotech.tech
          </a>
        </p>
      </div>
    </footer>
  );
}

export default SharedFooter;
