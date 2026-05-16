/**
 * ComparisonForm Component
 *
 * Input form with weight slider, destination dropdown,
 * optional dimensions, and compare button.
 */

'use client';

import { useState, useCallback } from 'react';
import { DESTINATIONS } from '../data';

interface ComparisonFormProps {
  locale?: string;
  onCompare: (params: {
    weight: number;
    destinationCode: string;
    dimensions?: { length: number; width: number; height: number };
  }) => void;
}

export function ComparisonForm({ locale = 'fr', onCompare }: ComparisonFormProps) {
  const isEn = locale === 'en';

  const [weight, setWeight] = useState<number>(50);
  const [destinationCode, setDestinationCode] = useState<string>('ML');
  const [showDimensions, setShowDimensions] = useState(false);
  const [length, setLength] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [hasCompared, setHasCompared] = useState(false);

  const handleCompare = useCallback(() => {
    setHasCompared(true);
    const dimensions =
      showDimensions && length > 0 && width > 0 && height > 0
        ? { length, width, height }
        : undefined;
    onCompare({ weight, destinationCode, dimensions });
  }, [weight, destinationCode, showDimensions, length, width, height, onCompare]);

  const handleWeightSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(Number(e.target.value));
    if (hasCompared) {
      const dimensions =
        showDimensions && length > 0 && width > 0 && height > 0
          ? { length, width, height }
          : undefined;
      onCompare({ weight: Number(e.target.value), destinationCode, dimensions });
    }
  };

  const handleWeightInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val >= 1 && val <= 1000) {
      setWeight(val);
      if (hasCompared) {
        const dimensions =
          showDimensions && length > 0 && width > 0 && height > 0
            ? { length, width, height }
            : undefined;
        onCompare({ weight: val, destinationCode, dimensions });
      }
    }
  };

  const handleDestinationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDestinationCode(e.target.value);
    if (hasCompared) {
      const dimensions =
        showDimensions && length > 0 && width > 0 && height > 0
          ? { length, width, height }
          : undefined;
      onCompare({ weight, destinationCode: e.target.value, dimensions });
    }
  };

  const destination = DESTINATIONS.find((d) => d.code === destinationCode);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 md:p-8">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Weight */}
        <div className="md:col-span-2">
          <label className="mb-3 block text-sm font-semibold text-white">
            {isEn ? 'Package Weight' : 'Poids du colis'}
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={1}
              max={1000}
              value={weight}
              onChange={handleWeightSlider}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-blue-500"
            />
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                max={1000}
                value={weight}
                onChange={handleWeightInput}
                className="w-20 rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-right text-white focus:border-blue-500 focus:outline-none"
              />
              <span className="text-sm text-slate-400">kg</span>
            </div>
          </div>
          <div className="mt-1 flex justify-between text-xs text-slate-500">
            <span>1 kg</span>
            <span>1000 kg</span>
          </div>
        </div>

        {/* Destination */}
        <div>
          <label className="mb-3 block text-sm font-semibold text-white">
            {isEn ? 'Destination' : 'Destination'}
          </label>
          <select
            value={destinationCode}
            onChange={handleDestinationChange}
            className="w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
          >
            {DESTINATIONS.map((d) => (
              <option key={d.code} value={d.code}>
                {isEn ? d.name : d.nameFr}
              </option>
            ))}
          </select>
        </div>

        {/* Dimensions toggle */}
        <div className="flex items-end">
          <button
            type="button"
            onClick={() => setShowDimensions((prev) => !prev)}
            className="inline-flex items-center gap-2 text-sm text-blue-400 transition hover:text-blue-300"
          >
            <svg
              className={`h-4 w-4 transition-transform ${showDimensions ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
            {isEn
              ? showDimensions
                ? 'Hide dimensions'
                : 'Add dimensions (for sea freight)'
              : showDimensions
                ? 'Masquer les dimensions'
                : 'Ajouter des dimensions (pour le maritime)'}
          </button>
        </div>
      </div>

      {/* Dimensions inputs */}
      {showDimensions && (
        <div className="mt-6 grid grid-cols-3 gap-4 rounded-xl border border-white/5 bg-slate-900/50 p-4 transition-all">
          <div>
            <label className="mb-2 block text-xs font-medium text-slate-400">
              {isEn ? 'Length' : 'Longueur'} (cm)
            </label>
            <input
              type="number"
              min={0}
              max={500}
              value={length || ''}
              onChange={(e) => {
                setLength(Number(e.target.value));
                if (hasCompared) {
                  const dims =
                    Number(e.target.value) > 0 && width > 0 && height > 0
                      ? { length: Number(e.target.value), width, height }
                      : undefined;
                  onCompare({ weight, destinationCode, dimensions: dims });
                }
              }}
              placeholder="0"
              className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-medium text-slate-400">
              {isEn ? 'Width' : 'Largeur'} (cm)
            </label>
            <input
              type="number"
              min={0}
              max={500}
              value={width || ''}
              onChange={(e) => {
                setWidth(Number(e.target.value));
                if (hasCompared) {
                  const dims =
                    length > 0 && Number(e.target.value) > 0 && height > 0
                      ? { length, width: Number(e.target.value), height }
                      : undefined;
                  onCompare({ weight, destinationCode, dimensions: dims });
                }
              }}
              placeholder="0"
              className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-medium text-slate-400">
              {isEn ? 'Height' : 'Hauteur'} (cm)
            </label>
            <input
              type="number"
              min={0}
              max={500}
              value={height || ''}
              onChange={(e) => {
                setHeight(Number(e.target.value));
                if (hasCompared) {
                  const dims =
                    length > 0 && width > 0 && Number(e.target.value) > 0
                      ? { length, width, height: Number(e.target.value) }
                      : undefined;
                  onCompare({ weight, destinationCode, dimensions: dims });
                }
              }}
              placeholder="0"
              className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* Compare button */}
      <div className="mt-6">
        <button
          onClick={handleCompare}
          className="w-full rounded-xl bg-blue-600 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 hover:shadow-blue-500/30 active:scale-[0.99] md:w-auto"
        >
          {isEn ? 'Compare Rates' : 'Comparer les tarifs'}
        </button>
      </div>

      {/* Current selection summary */}
      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-400">
        <span className="rounded-full bg-white/5 px-3 py-1">
          {weight} kg
        </span>
        <span className="rounded-full bg-white/5 px-3 py-1">
          {isEn ? destination?.name : destination?.nameFr}
        </span>
        {showDimensions && length > 0 && width > 0 && height > 0 && (
          <span className="rounded-full bg-white/5 px-3 py-1">
            {length}×{width}×{height} cm
          </span>
        )}
      </div>
    </div>
  );
}
