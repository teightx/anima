'use client';

import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  title = 'Sem dados',
  description = 'Nenhum registro encontrado neste periodo.',
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center rounded-xl border border-dashed border-hairline overflow-hidden px-6 py-14 text-center',
        className
      )}
    >
      {/* Background visual sutil - presença mock */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(145deg, 
              hsl(var(--surface-2)) 0%, 
              hsl(var(--surface)) 50%,
              hsl(var(--surface-2)) 100%
            )
          `,
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 20% 30%, hsl(var(--primary) / 0.04) 0%, transparent 50%),
            radial-gradient(ellipse 50% 50% at 80% 70%, hsl(var(--text-muted) / 0.03) 0%, transparent 50%)
          `,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface/80 border border-hairline backdrop-blur-sm">
          {icon || <FileText className="h-5 w-5 text-text-muted" />}
        </div>
        <h3 className="mt-4 text-h4">{title}</h3>
        <p className="mt-1.5 text-body-sm text-text-muted max-w-sm">
          {description}
        </p>
        {action && (
          <Button
            variant="outline"
            size="sm"
            onClick={action.onClick}
            className="mt-4"
          >
            {action.label}
          </Button>
        )}
      </div>
    </div>
  );
}

