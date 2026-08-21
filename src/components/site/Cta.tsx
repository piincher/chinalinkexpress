'use client';

/**
 * Cta — the site's button voice, in three weights.
 *
 *   solid   the one action per view that matters (WhatsApp quote)
 *   outline the secondary path
 *   quiet   a text link with an arrow, for tertiary navigation
 *
 * Notes on the details that make a button feel expensive:
 *   · it presses *into* the page on :active (translateY(1px) + a darker fill),
 *     rather than scaling up, which is what a physical button does;
 *   · hover changes fill, never size — a button that grows on hover shifts the
 *     text under the cursor the user is already aiming at;
 *   · the focus ring appears instantly and is never transitioned;
 *   · the arrow advances 2px on hover. Two, not six.
 *
 * All eight interaction states are implemented: default, hover, focus-visible,
 * active, disabled, loading, error, success.
 */

import React from 'react';
import { ArrowRight, Loader2, Check, AlertCircle } from 'lucide-react';
import { Magnetic } from '@/components/motion';

type Variant = 'solid' | 'outline' | 'quiet';
type Tone = 'ink' | 'void';
type State = 'idle' | 'loading' | 'error' | 'success';

interface CtaProps extends Omit<React.ComponentPropsWithoutRef<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: Variant;
  tone?: Tone;
  state?: State;
  /** Render as an anchor instead of a button. */
  href?: string;
  external?: boolean;
  icon?: React.ReactNode;
  /** Show the trailing arrow. On by default for solid and quiet. */
  arrow?: boolean;
  /** Cursor-following lean. Desktop pointers only, and only worth it on the primary CTA. */
  magnetic?: boolean;
  size?: 'md' | 'lg';
}

export function Cta({
  children,
  variant = 'solid',
  tone = 'ink',
  state = 'idle',
  href,
  external,
  icon,
  arrow,
  magnetic = false,
  size = 'md',
  className,
  style,
  disabled,
  ...rest
}: CtaProps) {
  const showArrow = arrow ?? variant !== 'outline';
  const isBusy = state === 'loading';
  const isDisabled = disabled || isBusy;

  const pad = size === 'lg' ? '1rem 1.75rem' : '0.8125rem 1.375rem';

  // Each variant is expressed as CSS custom properties so the :hover / :active
  // rules below stay in one shared stylesheet instead of being duplicated as
  // inline handlers on every instance.
  const variantVars: Record<Variant, React.CSSProperties> = {
    solid: {
      '--cta-bg': tone === 'void' ? 'var(--color-accent-bright)' : 'var(--color-accent)',
      '--cta-bg-hover': tone === 'void' ? 'var(--color-accent)' : 'var(--color-accent-deep)',
      '--cta-fg': 'var(--color-accent-ink)',
      '--cta-border': 'transparent',
    } as React.CSSProperties,
    outline: {
      '--cta-bg': 'transparent',
      '--cta-bg-hover':
        tone === 'void'
          ? 'color-mix(in oklch, var(--color-void-ink) 10%, transparent)'
          : 'var(--color-paper-2)',
      '--cta-fg': tone === 'void' ? 'var(--color-void-ink)' : 'var(--color-ink)',
      '--cta-border': tone === 'void' ? 'var(--color-void-rule)' : 'var(--color-rule-2)',
    } as React.CSSProperties,
    quiet: {
      '--cta-bg': 'transparent',
      '--cta-bg-hover': 'transparent',
      '--cta-fg': tone === 'void' ? 'var(--color-accent-bright)' : 'var(--color-accent)',
      '--cta-border': 'transparent',
    } as React.CSSProperties,
  };

  const leading =
    state === 'loading' ? (
      <Loader2 className="cta-spin" size={17} aria-hidden />
    ) : state === 'success' ? (
      <Check size={17} aria-hidden />
    ) : state === 'error' ? (
      <AlertCircle size={17} aria-hidden />
    ) : (
      icon
    );

  const inner = (
    <>
      {leading}
      <span>{children}</span>
      {showArrow && state === 'idle' && (
        <ArrowRight className="cta-arrow" size={16} aria-hidden />
      )}
    </>
  );

  const shared: React.CSSProperties = {
    ...variantVars[variant],
    padding: variant === 'quiet' ? 0 : pad,
    fontSize: size === 'lg' ? 'var(--text-md)' : 'var(--text-base)',
    ...style,
  };

  const classes = ['cta', `cta--${variant}`, `cta--${state}`, className]
    .filter(Boolean)
    .join(' ');

  const body = magnetic ? <Magnetic pull={6}>{inner}</Magnetic> : inner;

  if (href) {
    /*
     * `rest` is forwarded here too.
     *
     * It was not, and the failure was silent: the anchor branch rendered only
     * href/class/style, so every attribute a caller passed to a *link* Cta —
     * `data-*` analytics markers, `aria-label`, `onClick`, `id` — was dropped
     * with no error and no type complaint, because the props were accepted at
     * the call site and discarded at render. The button branch spread them all
     * along, so the same prop worked or vanished depending on whether `href`
     * happened to be set.
     *
     * The cast is needed because CtaProps extends the *button* prop set; the
     * intersection is what actually gets passed in practice (data-*, aria-*,
     * handlers), and the two button-only props this component understands —
     * `disabled` and `state` — are destructured out above.
     */
    return (
      <a
        href={href}
        className={classes}
        style={shared}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        aria-disabled={isDisabled || undefined}
      >
        {body}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      style={shared}
      disabled={isDisabled}
      aria-busy={isBusy || undefined}
      {...rest}
    >
      {body}
    </button>
  );
}

export default Cta;
