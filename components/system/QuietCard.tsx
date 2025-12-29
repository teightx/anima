'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * QuietCard — Card base do Ânima
 * 
 * Características:
 * - Background: --surface
 * - Borda: --hairline
 * - Sombra mínima: --shadow-subtle
 * - Radius consistente
 * - Padding confortável
 * - Sem hover exagerado
 * 
 * Estados: loading, disabled
 */

interface QuietCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Estado de carregamento */
  loading?: boolean;
  /** Estado desabilitado */
  disabled?: boolean;
  /** Padding interno */
  padding?: 'default' | 'compact' | 'spacious' | 'none';
  /** Permite hover sutil */
  interactive?: boolean;
}

const QuietCard = React.forwardRef<HTMLDivElement, QuietCardProps>(
  (
    {
      className,
      children,
      loading = false,
      disabled = false,
      padding = 'default',
      interactive = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        data-slot="quiet-card"
        data-loading={loading || undefined}
        data-disabled={disabled || undefined}
        className={cn(
          // Base
          'rounded-xl border bg-surface',
          'border-hairline',
          'shadow-[var(--shadow-subtle)]',
          
          // Padding
          padding === 'default' && 'p-5',
          padding === 'compact' && 'p-4',
          padding === 'spacious' && 'p-6',
          padding === 'none' && 'p-0',
          
          // Interactive hover
          interactive && [
            'transition-[box-shadow,border-color] duration-150',
            'hover:shadow-[var(--shadow-soft)]',
            'hover:border-border',
          ],
          
          // States
          loading && 'animate-pulse pointer-events-none',
          disabled && 'opacity-50 pointer-events-none',
          
          className
        )}
        aria-busy={loading}
        aria-disabled={disabled}
        {...props}
      >
        {children}
      </div>
    );
  }
);
QuietCard.displayName = 'QuietCard';

/**
 * QuietCardHeader — Cabeçalho interno do QuietCard
 */
const QuietCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5', className)}
    {...props}
  />
));
QuietCardHeader.displayName = 'QuietCardHeader';

/**
 * QuietCardTitle — Título do QuietCard
 */
const QuietCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-h4', className)}
    {...props}
  />
));
QuietCardTitle.displayName = 'QuietCardTitle';

/**
 * QuietCardDescription — Descrição do QuietCard
 */
const QuietCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-body-sm text-text-muted', className)}
    {...props}
  />
));
QuietCardDescription.displayName = 'QuietCardDescription';

/**
 * QuietCardContent — Conteúdo do QuietCard
 */
const QuietCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('', className)} {...props} />
));
QuietCardContent.displayName = 'QuietCardContent';

/**
 * QuietCardFooter — Rodapé do QuietCard
 */
const QuietCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-4', className)}
    {...props}
  />
));
QuietCardFooter.displayName = 'QuietCardFooter';

export {
  QuietCard,
  QuietCardHeader,
  QuietCardTitle,
  QuietCardDescription,
  QuietCardContent,
  QuietCardFooter,
};

