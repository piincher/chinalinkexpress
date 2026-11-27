/**
 * "Comment utiliser l'application" — every core client screen, in the order a
 * client meets it, on one vertical line. Server component: zero client JS.
 * Screens are real app renders with demo data (public/media/app/guide/*.webp,
 * exported at 640px from chinalink-video-studio/public/generated/<video>/screens).
 */

import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { Band, SectionHead, Shell } from '@/components/site';
import { BUSINESS_INFO, generateHowToSchema } from '@/config/seo-advanced';
import type { Locale } from '@/i18n/config';

// `paper`: the supplier sheet is an A4-like document, not a phone screen.
const GUIDE_STEPS = [
  { key: 'account', src: 'compte' },
  { key: 'address', src: 'adresse-envoi' },
  { key: 'sheet', src: 'fiche', paper: true },
  { key: 'home', src: 'accueil' },
  { key: 'goods', src: 'marchandises' },
  { key: 'detail', src: 'detail' },
  { key: 'warehouse3d', src: 'entrepot-3d' },
  { key: 'custody', src: 'chaine' },
  { key: 'shipments', src: 'expeditions' },
  { key: 'container', src: 'carte' },
  { key: 'orders', src: 'commandes' },
  { key: 'points', src: 'points' },
  { key: 'notifications', src: 'notifications' },
] as const;

const imgPath = (src: string) => `/media/app/guide/${src}.webp`;

export async function AppGuideLine({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'appPage.guide' });

  const schema = generateHowToSchema(
    t('metaName'),
    t('intro'),
    GUIDE_STEPS.map(({ key, src }) => ({
      name: t(`steps.${key}.title`),
      text: `${t(`steps.${key}.text`)} ${t(`steps.${key}.do`)}`,
      image: `${BUSINESS_INFO.url}${imgPath(src)}`,
    })),
    locale,
  );

  return (
    <Band tone="paper-2" id="mode-emploi">
      <Shell>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <SectionHead label={t('eyebrow')} title={t('title')} lede={t('intro')} />

        <ol className="app-guide">
          {GUIDE_STEPS.map((step, i) => {
            const title = t(`steps.${step.key}.title`);
            return (
              <li key={step.key} id={`app-${step.key}`} className="app-guide-step">
                <span className="app-guide-num" aria-hidden>{i + 1}</span>
                <div className="app-guide-copy">
                  <h3>{title}</h3>
                  <p>{t(`steps.${step.key}.text`)}</p>
                  <p className="app-guide-do">
                    <ArrowRight size={16} aria-hidden />
                    <span>
                      <span className="sr-only">{t('doLabel')} </span>
                      {t(`steps.${step.key}.do`)}
                    </span>
                  </p>
                </div>
                <div className={'paper' in step ? 'app-guide-paper' : 'app-guide-phone'}>
                  <Image
                    src={imgPath(step.src)}
                    alt={title}
                    fill
                    sizes="(max-width: 47.5rem) 60vw, 16rem"
                  />
                </div>
              </li>
            );
          })}
        </ol>
      </Shell>
    </Band>
  );
}
