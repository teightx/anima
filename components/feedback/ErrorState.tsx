'use client';

import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
  title = 'Nao foi possivel carregar',
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
          'flex flex-col items-center justify-center rounded-lg bg-destructive/5 px-6 py-8 text-center',
          className
        )}
      >
        <AlertCircle className="h-8 w-8 text-destructive/60" />
        <p className="mt-3 text-sm font-medium text-foreground">{title}</p>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry} className="mt-4">
            {retryLabel}
          </Button>
        )}
      </div>
    );
  }

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-destructive/60 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <CardTitle className="text-base">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      {onRetry && (
        <div className="px-6 pb-6">
          <Button variant="outline" size="sm" onClick={onRetry}>
            {retryLabel}
          </Button>
        </div>
      )}
    </Card>
  );
}

