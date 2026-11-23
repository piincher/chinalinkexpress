'use client';

/**
 * Uganda pricing — coming soon (owner 2026-11-24). Air and sea prices to
 * Kampala are not published yet, so the calculator and /tarifs show this panel
 * instead of Bamako numbers. One action: a WhatsApp quote.
 */

import { useTranslations } from 'next-intl';
import { MapPin, MessageCircle, Plane, Ship } from 'lucide-react';
import { Cta } from '@/components/site';
import { HERO_WHATSAPP_URL } from '@/views/landing/constants';

export function UgandaSoon() {
  const t = useTranslations('pricing.uganda');
  return (
    <div className="ug-soon">
      <div className="ug-soon-head">
        <span className="ug-soon-pin" aria-hidden><MapPin size={22} /></span>
        <div>
          <strong className="ug-soon-title">{t('title')}</strong>
          <span className="ug-soon-badge">{t('soon')}</span>
        </div>
      </div>
      <ul className="ug-soon-modes">
        <li><Plane size={18} aria-hidden /> {t('air')} <em>{t('soon')}</em></li>
        <li><Ship size={18} aria-hidden /> {t('sea')} <em>{t('soon')}</em></li>
      </ul>
      <p className="ug-soon-text">{t('text')}</p>
      <Cta
        href={HERO_WHATSAPP_URL}
        external
        variant="solid"
        arrow={false}
        data-cta="uganda-quote-whatsapp"
        icon={<MessageCircle size={18} aria-hidden />}
      >
        {t('cta')}
      </Cta>
    </div>
  );
}
