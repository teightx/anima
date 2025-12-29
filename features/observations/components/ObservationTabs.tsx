'use client';

import { Segmented, type SegmentedOption } from '@/components/system';
import type { ObservationTab } from '../types';
import { TAB_CONFIGS } from '../types';

interface ObservationTabsProps {
  activeTab: ObservationTab;
  counts: Record<ObservationTab, number>;
  onTabChange: (tab: ObservationTab) => void;
}

export function ObservationTabs({ activeTab, counts, onTabChange }: ObservationTabsProps) {
  const options: SegmentedOption<ObservationTab>[] = TAB_CONFIGS.map(config => ({
    value: config.key,
    label: config.label,
  }));

  return (
    <Segmented
      options={options}
      value={activeTab}
      onChange={onTabChange}
      aria-label="Categoria de observação"
    />
  );
}

