'use client';

import { cn } from '@/lib/utils';
import type { TimeRange } from '../types';

interface TimeRangeToggleProps {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
}

export function TimeRangeToggle({ value, onChange }: TimeRangeToggleProps) {
  return (
    <div
      className="flex gap-0.5 p-0.5 bg-muted/50 rounded-md w-fit"
      role="radiogroup"
      aria-label="Período"
    >
      <button
        type="button"
        role="radio"
        aria-checked={value === 'week'}
        onClick={() => onChange('week')}
        className={cn(
          'px-3 py-1.5 text-[0.8125rem] font-medium rounded transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-ring/40 focus:ring-offset-2',
          value === 'week'
            ? 'bg-card text-foreground shadow-[var(--shadow-xs)]'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        7 dias
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={value === 'month'}
        onClick={() => onChange('month')}
        className={cn(
          'px-3 py-1.5 text-[0.8125rem] font-medium rounded transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-ring/40 focus:ring-offset-2',
          value === 'month'
            ? 'bg-card text-foreground shadow-[var(--shadow-xs)]'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        30 dias
      </button>
    </div>
  );
}
