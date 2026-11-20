'use client';

/**
 * One delegated click listener for the whole site: every wa.me, tel: and app-store
 * link is counted and WhatsApp messages get a "Réf. site : <page>" tag, without
 * touching the ~30 places that render those links.
 *
 * Placement = the closest [data-cta], else the closest section with an id, else
 * header/footer. Capture phase, so the href is tagged before the browser follows it.
 */

import { useEffect } from 'react';
import { track, withSiteRef } from '@/lib/analytics';

function placementOf(el: Element): string {
  const cta = el.closest('[data-cta]')?.getAttribute('data-cta');
  if (cta) return cta;
  const section = el.closest('section[id]')?.id;
  if (section) return section;
  if (el.closest('footer')) return 'footer';
  if (el.closest('header, nav')) return 'nav';
  return 'page';
}

export function SiteEvents({ locale }: { locale: string }) {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.href;
      const path = window.location.pathname;
      const base = { placement: placementOf(link), page: path, locale };

      if (href.startsWith('https://wa.me/')) {
        link.href = withSiteRef(href, path, locale === 'fr' ? 'Bonjour ChinaLink Express' : 'Hello ChinaLink Express');
        track('whatsapp_click', { ...base, has_message: href.includes('text=') });
        const form = link.closest('[data-quote]')?.getAttribute('data-quote');
        if (form) track('quote_form_submitted', { ...base, form });
      } else if (href.startsWith('tel:')) {
        track('phone_click', { ...base, country: href.includes('+86') ? 'CN' : href.includes('+223') ? 'ML' : 'other' });
      } else if (/apps\.apple\.com|play\.google\.com/.test(href)) {
        track('app_store_click', { ...base, store: href.includes('apple') ? 'ios' : 'android' });
      }
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [locale]);

  return null;
}
