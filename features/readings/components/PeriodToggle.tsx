'use client';

import { cn } from '@/lib/utils';
import type { ReadingPeriod } from '../types';

interface PeriodToggleProps {
  period: ReadingPeriod;
  onPeriodChange: (period: ReadingPeriod) => void;
  showHidden: boolean;
  onShowHiddenChange: (show: boolean) => void;
  hiddenCount: number;
}

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
      <div className="inline-flex rounded-md bg-muted/50 p-0.5">
        <button
          onClick={() => onPeriodChange('7d')}
          className={cn(
            'rounded px-3 py-1.5 text-[0.8125rem] font-medium transition-colors',
            period === '7d'
              ? 'bg-card text-foreground shadow-[var(--shadow-xs)]'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          7 dias
        </button>
        <button
          onClick={() => onPeriodChange('30d')}
          className={cn(
            'rounded px-3 py-1.5 text-[0.8125rem] font-medium transition-colors',
            period === '30d'
              ? 'bg-card text-foreground shadow-[var(--shadow-xs)]'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          30 dias
        </button>
      </div>

      {/* Show hidden toggle */}
      {hiddenCount > 0 && (
        <button
          onClick={() => onShowHiddenChange(!showHidden)}
          className={cn(
            'text-[0.8125rem] transition-colors',
            showHidden
              ? 'text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {showHidden ? 'Ocultar arquivadas' : `Ver arquivadas (${hiddenCount})`}
        </button>
      )}
    </div>
  );
}

