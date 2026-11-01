'use client';

import Image from 'next/image';
import { ArrowUpRight, Download, Send, PackageCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Band, Shell } from '@/components/site';

const EXAMPLE_IMAGE = '/images/shipping-mark-example.png';

export function ShippingMarkExampleSection() {
  const t = useTranslations('shippingMarkExample');
  const steps = [
    { key: 'get', Icon: Download },
    { key: 'send', Icon: Send },
    { key: 'attach', Icon: PackageCheck },
  ] as const;

  return (
    <Band id="shipping-mark" tone="paper">
      <Shell>
        <div className="shipping-mark-example">
          <div className="shipping-mark-example-copy">
            <p className="shipping-mark-example-label">{t('label')}</p>
            <h2>{t('title')}</h2>
            <p className="shipping-mark-example-description">{t('description')}</p>
            <ol className="shipping-mark-example-steps">
              {steps.map(({ key, Icon }) => (
                <li key={key}>
                  <Icon size={22} aria-hidden />
                  <div><h3>{t(`${key}Title`)}</h3><p>{t(`${key}Description`)}</p></div>
                </li>
              ))}
            </ol>
            <a href={EXAMPLE_IMAGE} target="_blank" rel="noopener noreferrer" className="shipping-mark-example-open">
              {t('enlarge')}<ArrowUpRight size={18} aria-hidden />
            </a>
          </div>
          <figure className="shipping-mark-example-figure">
            <figcaption className="shipping-mark-example-banner">{t('dummyLabel')}</figcaption>
            <a href={EXAMPLE_IMAGE} target="_blank" rel="noopener noreferrer" aria-label={t('enlarge')}>
              <Image src={EXAMPLE_IMAGE} alt={t('imageAlt')} width={1200} height={1697} sizes="(max-width: 767px) 100vw, 470px" style={{ width:'100%', height:'auto', display:'block' }} />
            </a>
            <p className="shipping-mark-example-note">{t('dummyNote')}</p>
          </figure>
        </div>
      </Shell>
    </Band>
  );
}
