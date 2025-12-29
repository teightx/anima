'use client';

import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  QuietCard,
  QuietCardHeader,
  QuietCardTitle,
  QuietCardDescription,
} from '@/components/system';
import { cn } from '@/lib/utils';

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
  variant?: 'card' | 'inline';
}

export function ErrorState({
  title = 'Não foi possível carregar',
  description = 'Ocorreu um erro ao buscar os dados.',
  onRetry,
  retryLabel = 'Tentar novamente',
  className,
  variant = 'card',
}: ErrorStateProps) {
  if (variant === 'inline') {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center rounded-lg bg-danger-muted/30 px-6 py-8 text-center',
          className
        )}
      >
        <AlertCircle className="h-8 w-8 text-danger-muted-foreground/60" />
        <p className="mt-3 text-h4">{title}</p>
        <p className="mt-1 text-caption text-text-muted">{description}</p>
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry} className="mt-4">
            {retryLabel}
          </Button>
        )}
      </div>
    );
  }

  return (
    <QuietCard padding="none" className={cn(className)}>
      <QuietCardHeader className="p-5">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-danger-muted-foreground/60 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <QuietCardTitle>{title}</QuietCardTitle>
            <QuietCardDescription>{description}</QuietCardDescription>
          </div>
        </div>
      </QuietCardHeader>
      {onRetry && (
        <div className="px-5 pb-5">
          <Button variant="outline" size="sm" onClick={onRetry}>
            {retryLabel}
          </Button>
        </div>
      )}
    </QuietCard>
  );
}
