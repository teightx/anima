'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface LoadingStateProps {
  message?: string;
  className?: string;
  variant?: 'skeleton' | 'spinner' | 'text';
}

export function LoadingState({
  message,
  className,
  variant = 'skeleton',
}: LoadingStateProps) {
  if (variant === 'text') {
    return (
      <div className={cn('flex items-center justify-center py-8', className)}>
        <p className="text-sm text-muted-foreground">{message || 'Carregando...'}</p>
      </div>
    );
  }

  if (variant === 'spinner') {
    return (
      <div className={cn('flex flex-col items-center justify-center py-8', className)}>
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted border-t-primary" />
        {message && (
          <p className="mt-3 text-sm text-muted-foreground">{message}</p>
        )}
      </div>
    );
  }

  // Default: skeleton
  return (
    <div className={cn('space-y-4', className)}>
      <Skeleton className="h-8 w-1/3" />
      <div className="space-y-3">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    </div>
  );
}

