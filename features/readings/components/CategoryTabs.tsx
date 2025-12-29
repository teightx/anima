'use client';

import { Segmented, type SegmentedOption } from '@/components/system';
import type { ReadingTab } from '../types';
import { TAB_CONFIGS } from '../types';

interface CategoryTabsProps {
  activeTab: ReadingTab;
  counts: Record<ReadingTab, number>;
  onTabChange: (tab: ReadingTab) => void;
}

export function CategoryTabs({ activeTab, counts, onTabChange }: CategoryTabsProps) {
  const options: SegmentedOption<ReadingTab>[] = TAB_CONFIGS.map(config => ({
    value: config.key,
    label: config.label,
    count: counts[config.key] > 0 ? counts[config.key] : undefined,
  }));

  return (
    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
      <div className="min-w-max sm:min-w-0">
        <Segmented
          options={options}
          value={activeTab}
          onChange={onTabChange}
          aria-label="Categoria"
        />
      </div>
    </div>
  );
}
