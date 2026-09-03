'use client';

import { useTranslations } from 'next-intl';
import type { OccasionCardProps } from './components/OccasionCard';

/**
 * The card's strings, resolved once.
 *
 * `OccasionCard` takes its labels as props rather than calling `useTranslations`
 * itself: it is rendered from two surfaces (the home band and the calendar
 * page) and this keeps the translation namespace in one place instead of
 * letting the two drift into slightly different wordings of the same deadline.
 */
export const useOccasionLabels = (): OccasionCardProps['labels'] => {
  const t = useTranslations('occasions');
  return {
    air: t('air'),
    sea: t('sea'),
    shipBy: (date: string) => t('shipBy', { date }),
    daysLeft: (days: number) => t('daysLeft', { days }),
    closed: t('closed'),
    estimated: t('estimated'),
    allClosed: t('allClosed'),
    inDays: (days: number) => t('inDays', { days }),
  };
};

export default useOccasionLabels;
