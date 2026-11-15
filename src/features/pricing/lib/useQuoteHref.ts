'use client';

import { useTranslations } from 'next-intl';
import { WHATSAPP_URL, WHATSAPP_SALES, whatsappUrl } from '@/constants/contact';

export type QuoteMode = 'standard' | 'express' | 'electronics' | 'phones' | 'sea';

/**
 * The calculators' "request a quote" link: WhatsApp with the estimate already
 * written (same message as the homepage estimator), so the request reaches the
 * team with the figures instead of an empty chat. No price yet → plain chat.
 */
export function useQuoteHref() {
  const t = useTranslations('estimator');
  return (mode: QuoteMode, quantity: number, unit: 'kg' | 'piece' | 'cbm', price: number) =>
    price > 0
      ? whatsappUrl(WHATSAPP_SALES, t('whatsapp', {
          mode: t(`modes.${mode}`),
          quantity: quantity.toLocaleString('fr-FR', { maximumFractionDigits: 3 }),
          unit: t(`units.${unit}`),
          price: Math.round(price).toLocaleString('fr-FR').replace(/\s/g, ' '),
        }))
      : WHATSAPP_URL;
}
