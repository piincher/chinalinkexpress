'use client';

import { CheckCircle2, AlertTriangle, Ban, FileCheck } from 'lucide-react';
import { STATUS_CONFIGS } from '../data';

const statusIcons = {
  allowed: CheckCircle2,
  restricted: AlertTriangle,
  prohibited: Ban,
  'permit-required': FileCheck,
};

const statusColors = {
  allowed: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  restricted: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  prohibited: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  'permit-required': 'text-blue-400 bg-blue-500/10 border-blue-500/20',
};

interface StatusLegendProps {
  locale?: string;
}

export function StatusLegend({ locale = 'fr' }: StatusLegendProps) {
  const isEn = locale === 'en';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {(Object.values(STATUS_CONFIGS) as Array<{
        status: keyof typeof statusIcons;
        label: string;
        labelFr: string;
        description: string;
        descriptionFr: string;
      }>).map((config) => {
        const Icon = statusIcons[config.status];
        return (
          <div
            key={config.status}
            className={`rounded-xl border p-4 ${statusColors[config.status]}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon className="w-5 h-5" />
              <span className="font-semibold text-sm">
                {isEn ? config.label : config.labelFr}
              </span>
            </div>
            <p className="text-xs opacity-80">
              {isEn ? config.description : config.descriptionFr}
            </p>
          </div>
        );
      })}
    </div>
  );
}
