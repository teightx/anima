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
      className="flex gap-1 p-1 bg-muted rounded-lg w-fit"
      role="radiogroup"
      aria-label="Periodo"
    >
      <button
        type="button"
        role="radio"
        aria-checked={value === 'week'}
        onClick={() => onChange('week')}
        className={cn(
          'px-4 py-2 text-sm font-medium rounded-md transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          value === 'week'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        Semana
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={value === 'month'}
        onClick={() => onChange('month')}
        className={cn(
          'px-4 py-2 text-sm font-medium rounded-md transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          value === 'month'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        Mes
      </button>
    </div>
  );
}
