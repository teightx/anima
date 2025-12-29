'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * SectionHeader — Cabeçalho de seção do Ânima
 * 
 * Características:
 * - Título + subtítulo opcionais
 * - Alinhamento consistente
 * - Ações secundárias à direita
 * - Tipografia do sistema
 * 
 * Estados: loading, disabled
 */

interface SectionHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Título da seção */
  title: string;
  /** Subtítulo opcional */
  subtitle?: string;
  /** Ações à direita */
  actions?: React.ReactNode;
  /** Tamanho do título */
  size?: 'default' | 'small';
  /** Estado de carregamento */
  loading?: boolean;
  /** Estado desabilitado */
  disabled?: boolean;
}

const SectionHeader = React.forwardRef<HTMLElement, SectionHeaderProps>(
  (
    {
      className,
      title,
      subtitle,
      actions,
      size = 'default',
      loading = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    return (
      <header
        ref={ref}
        data-slot="section-header"
        data-loading={loading || undefined}
        data-disabled={disabled || undefined}
        className={cn(
          'flex items-start justify-between gap-4',
          size === 'default' && 'mb-4',
          size === 'small' && 'mb-3',
          loading && 'animate-pulse',
          disabled && 'opacity-50',
          className
        )}
        {...props}
      >
        <div className="space-y-0.5 min-w-0">
          {loading ? (
            <>
              <div className="h-5 w-32 rounded bg-surface-2" />
              {subtitle && <div className="h-4 w-48 rounded bg-surface-2 mt-1" />}
            </>
          ) : (
            <>
              <h2
                className={cn(
                  size === 'default' && 'text-h4',
                  size === 'small' && 'text-body-sm font-medium text-text-muted'
                )}
              >
                {title}
              </h2>
              {subtitle && (
                <p className="text-body-sm text-text-muted">{subtitle}</p>
              )}
            </>
          )}
        </div>
        {actions && !loading && (
          <div className="flex items-center gap-2 shrink-0">{actions}</div>
        )}
      </header>
    );
  }
);
SectionHeader.displayName = 'SectionHeader';

export { SectionHeader };

