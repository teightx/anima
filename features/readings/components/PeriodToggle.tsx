'use client';

import { Segmented, type SegmentedOption } from '@/components/system';
import { cn } from '@/lib/utils';
import type { ReadingPeriod } from '../types';

interface PeriodToggleProps {
  period: ReadingPeriod;
  onPeriodChange: (period: ReadingPeriod) => void;
  showHidden: boolean;
  onShowHiddenChange: (show: boolean) => void;
  hiddenCount: number;
}

const periodOptions: SegmentedOption<ReadingPeriod>[] = [
  { value: '7d', label: '7 dias' },
  { value: '30d', label: '30 dias' },
];

export function PeriodToggle({
  period,
  onPeriodChange,
  showHidden,
  onShowHiddenChange,
  hiddenCount,
}: PeriodToggleProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      {/* Period selector */}
      <Segmented
        options={periodOptions}
        value={period}
        onChange={onPeriodChange}
        aria-label="Período"
      />

      {/* Show hidden toggle */}
      {hiddenCount > 0 && (
        <button
          onClick={() => onShowHiddenChange(!showHidden)}
          className={cn(
            'text-body-sm font-medium transition-colors',
            showHidden
              ? 'text-text-primary'
              : 'text-text-muted hover:text-text-secondary'
          )}
        >
          {showHidden ? 'Ocultar arquivadas' : `Ver arquivadas (${hiddenCount})`}
        </button>
      )}
    </div>
  );
}
