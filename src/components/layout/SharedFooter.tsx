/**
 * Site footer.
 *
 * The old one was the single most recognisable template shape on the web: five
 * equal columns of links, a row of circular social buttons that each turned a
 * different brand colour on hover (blue, pink, dark blue), a blue-to-cyan
 * gradient wordmark, and a centred copyright line. Symmetric, evenly weighted,
 * and identical to ten thousand other sites.
 *
 * This one is asymmetric on purpose. A statement block carries the left — the
 * wordmark set large, the positioning line, and the one action worth taking.
 * The links keep every destination the old footer had, because they are load
 * bearing for SEO on a site with sixty routes, but they are set quietly at the
 * right where a directory belongs rather than competing with the statement.
 *
 * It sits on the void band, which gives the page a deliberate close: the
 * document opens dark on the warehouse and ends dark on the wordmark.
 *
 * Social links keep their icons and lose the coloured hover chips — a footer is
 * not the place to reproduce three other companies' brand colours.
 */

'use client';

import Link from 'next/link';
import { Facebook, Linkedin, Instagram, Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
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

const SERVICE_LINKS = [
  { labelKey: 'services.items.sourcing.title', href: '/services/sourcing' },
  {
    labels: { fr: 'Agent sourcing Chine', en: 'China sourcing agent' },
    href: '/services/agent-sourcing-chine',
    locales: ['fr', 'en'],
  },
  {
    labels: { fr: 'Achat Alibaba Mali', en: 'Alibaba buying agent' },
    href: '/services/achat-alibaba-mali',
    locales: ['fr', 'en'],
  },
  { labelKey: 'services.items.airFreight.title', href: '/services/air-freight' },
  { labelKey: 'services.items.seaFreight.title', href: '/services/sea-freight' },
  { labelKey: 'services.items.payment.title', href: '/services/paiement-fournisseur-chine', locales: ['fr', 'en'] },
  {
    labelKey: 'services.features.sourcing.supplierVerification',
    href: '/services/verification-fournisseur-chine',
    locales: ['fr', 'en'],
  },
  {
    labels: { fr: 'Cargo Chine Mali', en: 'China to Mali cargo' },
    href: '/cargo-chine-mali',
    locales: ['fr', 'en'],
  },
] as const;

const PAGE_LINKS = [
  { key: 'navigation.about', href: '#about' },
  { key: 'navigation.blog', href: 'blog' },
  { key: 'navigation.faq', href: 'faq' },
  { key: 'navigation.contact', href: '#contact' },
  { key: 'navigation.privacy', href: 'privacy' },
  { key: 'navigation.terms', href: 'terms' },
] as const;

const TOOL_LINKS = [
  { key: 'navigation.calculator', href: 'calculateur' },
  { key: 'navigation.compareShipping', href: 'comparateur-transport' },
  { key: 'navigation.checkProduct', href: 'verifier-produit' },
] as const;

export function SharedFooter({ locale, className }: SharedFooterProps) {
  const t = useTranslations();
  const year = getCurrentYear();

  return (
    <footer className={cn('band-void ft', className)}>
      <div className="ft-shell">
        {/* ── statement ──────────────────────────────────────────────────── */}
        <div className="ft-statement">
          <Link href={`/${locale}/`} className="ft-wordmark">
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
          <div>
            <h2 className="ft-h">{t('footer.services')}</h2>
            <ul className="ft-list">
              {SERVICE_LINKS.map((link) => {
                // `locales` is a readonly tuple of the locales a link is
                // written for, so it is narrower than Locale. Widen for the
                // membership test rather than narrowing `locale`.
                const only = 'locales' in link ? (link.locales as readonly string[]) : null;
                if (only && !only.includes(locale)) return null;
                const label =
                  'labelKey' in link && link.labelKey
                    ? t(link.labelKey)
                    : (link as { labels: Record<string, string> }).labels[locale] ?? '';
                if (!label) return null;
                return (
                  <li key={link.href}>
                    <Link href={`/${locale}${link.href}`}>{label}</Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h2 className="ft-h">{t('footer.links')}</h2>
            <ul className="ft-list">
              {PAGE_LINKS.map(({ key, href }) => (
                <li key={key}>
                  <Link href={`/${locale}/${href}`}>{t(key)}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="ft-h">{t('navigation.tools')}</h2>
            <ul className="ft-list">
              {TOOL_LINKS.map(({ key, href }) => (
                <li key={key}>
                  <Link href={`/${locale}/${href}`}>{t(key)}</Link>
                </li>
              ))}
            </ul>
          </div>

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
                  <a href="tel:+8618851725957">+86 188 5172 5957</a>
                  <a href="tel:+22376696177">+223 76 69 61 77</a>
                </span>
              </li>
              <li>
                <Mail size={15} aria-hidden />
                <a href="mailto:contact@chinalinkexpress.com">contact@chinalinkexpress.com</a>
              </li>
              <li>
                <Clock size={15} aria-hidden />
                <span>
                  <span>{t('contact.info.hoursWeekday')}</span>
                  <span>{t('contact.info.hoursSaturday')}</span>
                  <span>{t('contact.info.hoursSunday')}</span>
                </span>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* ── legal ────────────────────────────────────────────────────────── */}
      <div className="ft-legal">
        <p>
          &copy; {year} ChinaLink Express. {t('footer.copyright')}
        </p>
        {/*
          The agency credit. Its number is nuvotech's own, not ChinaLink's — an
          earlier pass at consolidating phone numbers wrongly pointed this at the
          sales line while the visible text still read the agency's, so the link
          and its label disagreed. Both are the agency's again.
        */}
        <p>
          Made by{' '}
          <a href="https://nuvotech.tech" target="_blank" rel="noopener noreferrer">
            nuvotech.tech
          </a>{' '}
          ·{' '}
          <a href="https://wa.me/8617865673053" target="_blank" rel="noopener noreferrer">
            +86 178 6567 3053
          </a>
        </p>
      </div>
    </footer>
  );
}

export default SharedFooter;
