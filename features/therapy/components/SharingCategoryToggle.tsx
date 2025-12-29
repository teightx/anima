'use client';

import { cn } from '@/lib/utils';
import type { SharingCategoryConfig } from '../types';

interface SharingCategoryToggleProps {
  category: SharingCategoryConfig;
  enabled: boolean;
  onToggle: (key: string, enabled: boolean) => void;
  disabled?: boolean;
}

export function SharingCategoryToggle({
  category,
  enabled,
  onToggle,
  disabled,
}: SharingCategoryToggleProps) {
  const handleClick = () => {
    if (!disabled) {
      onToggle(category.key, !enabled);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        'flex w-full items-center justify-between gap-4 rounded-lg border p-4 text-left transition-colors',
        disabled
          ? 'cursor-not-allowed opacity-50'
          : 'cursor-pointer hover:bg-accent/50',
        enabled ? 'border-primary/30 bg-primary/5' : 'border-border'
      )}
    >
      <div className="space-y-0.5">
        <p className="text-sm font-medium text-foreground">{category.title}</p>
        <p className="text-xs text-muted-foreground">{category.description}</p>
      </div>

      {/* Toggle visual */}
      <div
        className={cn(
          'relative h-6 w-11 shrink-0 rounded-full transition-colors',
          enabled ? 'bg-primary' : 'bg-muted'
        )}
      >
        <div
          className={cn(
            'absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform',
            enabled ? 'translate-x-6' : 'translate-x-1'
          )}
        />
      </div>
    </button>
  );
}

