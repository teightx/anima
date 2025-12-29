'use client';

import { Segmented, type SegmentedOption } from '@/components/system';
import type { ViewMode } from '../types';

interface HistoryTabsProps {
  activeView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

const options: SegmentedOption<ViewMode>[] = [
  { value: 'calendar', label: 'Calendário' },
  { value: 'list', label: 'Lista' },
];

export function HistoryTabs({ activeView, onViewChange }: HistoryTabsProps) {
  return (
    <Segmented
      options={options}
      value={activeView}
      onChange={onViewChange}
      aria-label="Modo de visualização"
    />
  );
}
