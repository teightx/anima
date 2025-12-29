'use client';

import { cn } from '@/lib/utils';
import type { ViewMode } from '../types';

interface HistoryTabsProps {
  activeView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export function HistoryTabs({ activeView, onViewChange }: HistoryTabsProps) {
  return (
    <div className="flex gap-1 p-1 bg-muted rounded-lg w-fit" role="tablist">
      <button
        type="button"
        role="tab"
        aria-selected={activeView === 'calendar'}
        onClick={() => onViewChange('calendar')}
        className={cn(
          'px-4 py-2 text-sm font-medium rounded-md transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          activeView === 'calendar'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        Calendario
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={activeView === 'list'}
        onClick={() => onViewChange('list')}
        className={cn(
          'px-4 py-2 text-sm font-medium rounded-md transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          activeView === 'list'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        Lista
      </button>
    </div>
  );
}
