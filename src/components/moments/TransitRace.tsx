'use client';

/**
 * TransitRace — air and sea leave China together; the day counter runs.
 *
 * The windows come from TRANSIT_DAYS, the figures quoted to clients — no
 * invented transit time. Each vehicle stops at its window's upper bound, and
 * the whole run lasts 5 s for the slowest leg, so the plane's arrival at day 21
 * against the ship's at day 75 is shown at true proportion.
 *
 * The vehicles move by CSS keyframes; JS only counts the days, and only during
 * the one run.
 */

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { TRANSIT_DAYS } from '@/constants/companyFacts';
import { MomentPanel } from './MomentPanel';
import { useMomentInView, momentClass } from './useMomentInView';

const RUN_MS = 5000;
const END = TRANSIT_DAYS.SEA.max;

const PLANE = 'M2 13l9-2.2V5.5a1.5 1.5 0 013 0v5.3l8 2.2v2l-8-1.4v4l2 1.4v1.5l-3.5-.9-3.5.9v-1.5l2-1.4v-4L2 15z';
const SHIP = 'M3 14h18l-2.5 5h-13zM6 13V8h4v5zm5 0V5h4v8zm5 0V9h3v4z';

export function TransitRace() {
  const t = useTranslations('moments.race');
  const [ref, state] = useMomentInView<HTMLDivElement>();
  const [day, setDay] = useState<number>(END);

  // Armed but not yet started: the vehicles sit at the start, so the counter does too.
  useEffect(() => {
    if (state.armed && !state.played) setDay(0);
  }, [state.armed, state.played]);

  useEffect(() => {
    if (!state.played) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / RUN_MS);
      setDay(Math.round(k * END));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [state.played]);

  const lanes = [
    { key: 'air', path: PLANE, fill: 'var(--color-accent-bright)', ...TRANSIT_DAYS.AIR },
    { key: 'sea', path: SHIP, fill: 'var(--color-warning)', ...TRANSIT_DAYS.SEA },
  ];

  return (
    <MomentPanel eyebrow={t('eyebrow')} title={t('title')} body={t('body')} stageLabel={t('stage')} ground="void">
      <div ref={ref} className={`mo-pad ${momentClass('mo-race', state)}`}>
        {lanes.map((lane) => {
          const arrived = day >= lane.max;
          const style = {
            '--to': `${(lane.max / END) * 100}%`,
            '--dur': `${(lane.max / END) * RUN_MS}ms`,
          } as React.CSSProperties;
          return (
            <div key={lane.key} className="mo-lane">
              <div className="mo-lane-head">
                <b>{t(`${lane.key}.name`)}</b>
                <span className="mo-mono">
                  {arrived ? t('arrived', { min: lane.min, max: lane.max }) : t('day', { day })}
                </span>
              </div>
              <div className="mo-rail">
                <span className="mo-runner" style={style}>
                  <svg viewBox="0 0 24 24" aria-hidden>
                    <path d={lane.path} fill={lane.fill} />
                  </svg>
                </span>
              </div>
            </div>
          );
        })}
        <div className="mo-race-ends mo-mono">
          <span>{t('from')}</span>
          <span className="mo-figure" style={{ color: 'var(--color-void-ink)' }}>
            J+{day}
          </span>
          <span>Bamako</span>
        </div>
      </div>
    </MomentPanel>
  );
}
