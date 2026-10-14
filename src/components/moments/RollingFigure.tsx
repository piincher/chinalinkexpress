'use client';

/**
 * RollingFigure — a formatted figure whose digits roll to their new value.
 *
 * Each digit is a 0–9 strip in a one-line window, moved with translateY, so a
 * price change costs a handful of composited transforms. Separators and the
 * currency stay static text. Columns are keyed from the right, so 99 000 →
 * 126 000 rolls the units in place instead of shifting every column.
 *
 * Screen readers get the plain value once; the strips are aria-hidden.
 */

import React from 'react';
import './moments.css';

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export function RollingFigure({ value, className }: { value: string; className?: string }) {
  const chars = Array.from(value);

  return (
    <span className={className} aria-label={value} role="text">
      <span className="mo-roll" aria-hidden>
        {chars.map((ch, i) => {
          const key = chars.length - i;
          if (!/\d/.test(ch)) return <span key={`s${key}`}>{ch}</span>;
          return (
            <span key={`d${key}`} className="mo-roll-col">
              <span className="mo-roll-strip" style={{ transform: `translateY(-${Number(ch)}em)` }}>
                {DIGITS.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
