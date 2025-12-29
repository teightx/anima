'use client';

import { cn } from '@/lib/utils';
import type { ReadingTab } from '../types';
import { TAB_CONFIGS } from '../types';

interface CategoryTabsProps {
  activeTab: ReadingTab;
  counts: Record<ReadingTab, number>;
  onTabChange: (tab: ReadingTab) => void;
}

export function CategoryTabs({ activeTab, counts, onTabChange }: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {TAB_CONFIGS.map(config => {
        const count = counts[config.key];
        const isActive = activeTab === config.key;
        
        return (
          <button
            key={config.key}
            onClick={() => onTabChange(config.key)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[0.8125rem] font-medium transition-colors',
              isActive
                ? 'bg-secondary text-secondary-foreground'
                : 'bg-muted/50 text-muted-foreground hover:bg-muted/70 hover:text-foreground'
            )}
          >
            {config.label}
            {count > 0 && (
              <span
                className={cn(
                  'text-[0.6875rem] tabular-nums',
                  isActive ? 'text-secondary-foreground/60' : 'text-muted-foreground/70'
                )}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

