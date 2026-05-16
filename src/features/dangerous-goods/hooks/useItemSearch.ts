/**
 * useItemSearch Hook
 *
 * React hook for searching and filtering dangerous goods items.
 * Supports bilingual search (English and French), category filtering,
 * and grouping results by status.
 */

'use client';

import { useState, useMemo, useCallback } from 'react';
import { DANGEROUS_GOODS_ITEMS } from '../data';
import { DangerousGoodsItem, ItemStatus } from '../types';

interface GroupedResults {
  allowed: DangerousGoodsItem[];
  restricted: DangerousGoodsItem[];
  prohibited: DangerousGoodsItem[];
  'permit-required': DangerousGoodsItem[];
}

interface UseItemSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  filteredItems: DangerousGoodsItem[];
  groupedItems: GroupedResults;
  hasResults: boolean;
  totalCount: number;
  statusCounts: Record<ItemStatus, number>;
  clearSearch: () => void;
}

const STATUS_ORDER: ItemStatus[] = ['allowed', 'restricted', 'permit-required', 'prohibited'];

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .trim();
}

function matchesQuery(item: DangerousGoodsItem, searchQuery: string): boolean {
  const normalizedQuery = normalizeText(searchQuery);
  if (!normalizedQuery) return true;

  const terms = normalizedQuery.split(/\s+/).filter(Boolean);
  if (terms.length === 0) return true;

  const searchableText = `${normalizeText(item.name)} ${normalizeText(item.nameFr)} ${normalizeText(item.category)} ${normalizeText(item.categoryFr)} ${normalizeText(item.description)} ${normalizeText(item.descriptionFr)}`;

  return terms.every((term) => searchableText.includes(term));
}

function matchesCategory(item: DangerousGoodsItem, category: string): boolean {
  if (category === 'all') return true;
  return item.category === category;
}

export function useItemSearch(): UseItemSearchReturn {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredItems = useMemo(() => {
    return DANGEROUS_GOODS_ITEMS.filter((item) => {
      const matchesSearch = matchesQuery(item, query);
      const matchesCat = matchesCategory(item, activeCategory);
      return matchesSearch && matchesCat;
    }).sort((a, b) => {
      const statusDiff = STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status);
      if (statusDiff !== 0) return statusDiff;
      return a.name.localeCompare(b.name);
    });
  }, [query, activeCategory]);

  const groupedItems = useMemo<GroupedResults>(() => {
    const groups: GroupedResults = {
      allowed: [],
      restricted: [],
      prohibited: [],
      'permit-required': [],
    };
    for (const item of filteredItems) {
      groups[item.status].push(item);
    }
    return groups;
  }, [filteredItems]);

  const statusCounts = useMemo(() => {
    const counts: Record<ItemStatus, number> = {
      allowed: 0,
      restricted: 0,
      prohibited: 0,
      'permit-required': 0,
    };
    for (const item of filteredItems) {
      counts[item.status]++;
    }
    return counts;
  }, [filteredItems]);

  const hasResults = filteredItems.length > 0;
  const totalCount = filteredItems.length;

  const clearSearch = useCallback(() => {
    setQuery('');
    setActiveCategory('all');
  }, []);

  return {
    query,
    setQuery,
    activeCategory,
    setActiveCategory,
    filteredItems,
    groupedItems,
    hasResults,
    totalCount,
    statusCounts,
    clearSearch,
  };
}
