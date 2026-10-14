'use client';

/**
 * WhatsAppThread — the updates a client receives, appearing in order.
 *
 * Wording follows the operation's rules: the greeting the dispatcher adds and
 * the automatic-message footer. The client and dates are examples, captioned.
 */

import React from 'react';
import { useTranslations } from 'next-intl';
import { MomentPanel } from './MomentPanel';
import { useMomentInView, momentClass } from './useMomentInView';

interface Message {
  text: string;
  time: string;
}

export function WhatsAppThread() {
  const t = useTranslations('moments.whatsapp');
  const [ref, state] = useMomentInView<HTMLDivElement>();
  const messages = (t.raw('messages') as Message[]) ?? [];

  return (
    <MomentPanel eyebrow={t('eyebrow')} title={t('title')} body={t('body')} stageLabel={t('stage')} caption={t('caption')}>
      <div ref={ref} className={`mo-pad ${momentClass('mo-chat', state)}`}>
        {messages.map((m, i) => (
          <p key={m.time} className="mo-bubble" style={{ margin: 0, '--i': i } as React.CSSProperties}>
            {m.text}
            <em>{t('footer')}</em>
            <time>{m.time}</time>
          </p>
        ))}
      </div>
    </MomentPanel>
  );
}
