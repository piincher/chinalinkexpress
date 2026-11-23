'use client';

/**
 * « Comment ça marche » — the same four steps as the hero's icon strip, on one
 * vertical line that fills as you scroll (owner 2026-11-24, same as /services),
 * one real photo each (stills from the site's own footage), title + a few words.
 * Owner rules: minimum text, no platform names, Bamako (Mali, West Africa) AND
 * Kampala (Uganda, East Africa) on the last step.
 */

import React, { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Band, Shell, Figure } from '@/components/site';
import { SectionHead } from '@/components/site/SectionHead';
import { useFlowLine } from '@/components/motion/useFlowLine';

const STEPS = [
  // Owner's own photo of Yiwu International Trade Market (2026-11-24), plate blurred.
  { key: 'source', src: '/media/steps/yiwu-market.webp' },
  { key: 'ship', src: '/media/steps/expedition.webp' },
  { key: 'clear', src: '/media/steps/dedouanement.webp' },
  { key: 'deliver', src: '/media/steps/livraison.webp' },
] as const;

export function HowItWorksSection() {
  const t = useTranslations('home');
  const ref = useRef<HTMLOListElement>(null);
  useFlowLine(ref);

  return (
    <Band id="parcours" tone="paper-2">
      <Shell>
        <SectionHead title={t('howTitle')} />
        <ol ref={ref} className="how-flow flow-line">
          {STEPS.map(({ key, src }, i) => (
            <li key={key} className="how-row">
              <span className="flow-node">{String(i + 1).padStart(2, '0')}</span>
              <Figure
                src={src}
                alt={t(`steps.${key}`)}
                focal="45%"
                className="how-photo"
                sizes="(max-width: 760px) 80vw, 28rem"
                style={{ borderRadius: 14 }}
              />
              <div className="how-text">
                <strong>{t(`steps.${key}`)}</strong>
                <span>{t(`stepsSub.${key}`)}</span>
              </div>
            </li>
          ))}
        </ol>
      </Shell>
    </Band>
  );
}
