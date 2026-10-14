/**
 * MomentPanel — the frame every explanatory moment sits in.
 *
 * Words on one side, the moving picture on a void stage on the other; stacks
 * below 900px. It carries its own tokens so it reads the same on the redesigned
 * pages and on the older Tailwind pages it is dropped into.
 */

import React from 'react';
import './moments.css';

interface MomentPanelProps {
  eyebrow: string;
  title: string;
  body: string;
  /** Short mono caption in the stage bar, e.g. "exemple". */
  caption?: string;
  stageLabel: string;
  children: React.ReactNode;
  /** Put the stage on the left. */
  flip?: boolean;
  /** 'void' when the page behind is always dark, whatever the theme. */
  ground?: 'paper' | 'void';
}

export function MomentPanel({ eyebrow, title, body, caption, stageLabel, children, flip, ground = 'paper' }: MomentPanelProps) {
  return (
    <section className={ground === 'void' ? 'mo-panel-band mo-panel-band--void' : 'mo-panel-band'}>
      <div className={flip ? 'mo-panel mo-panel--flip' : 'mo-panel'}>
        <div className="mo-panel-copy">
          <p className="mo-eyebrow">{eyebrow}</p>
          <h2 className="mo-title">{title}</h2>
          <p className="mo-body">{body}</p>
        </div>
        <figure className="mo-stage">
          <figcaption className="mo-stage-bar">
            <span>{stageLabel}</span>
            {caption ? <span>{caption}</span> : null}
          </figcaption>
          {children}
        </figure>
      </div>
    </section>
  );
}
