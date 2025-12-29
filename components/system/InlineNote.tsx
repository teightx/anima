'use client';

import * as React from 'react';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * InlineNote — Avisos silenciosos e disclaimers do Ânima
 * 
 * Características:
 * - Fundo: --surface-2
 * - Texto: --text-muted
 * - Ícone opcional discreto
 * - Nunca vermelho/amarelo "alerta"
 * 
 * Estados: loading, empty (sem conteúdo = não renderiza)
 */

interface InlineNoteProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Conteúdo do aviso */
  children: React.ReactNode;
  /** Ícone customizado (padrão: Info) */
  icon?: React.ReactNode;
  /** Ocultar ícone */
  hideIcon?: boolean;
  /** Tamanho */
  size?: 'default' | 'small';
  /** Estado de carregamento */
  loading?: boolean;
}

const InlineNote = React.forwardRef<HTMLDivElement, InlineNoteProps>(
  (
    {
      className,
      children,
      icon,
      hideIcon = false,
      size = 'default',
      loading = false,
      ...props
    },
    ref
  ) => {
    // Não renderiza se não há conteúdo
    if (!children && !loading) {
      return null;
    }

    const IconComponent = icon ?? <Info className="h-3.5 w-3.5" />;

    return (
      <div
        ref={ref}
        data-slot="inline-note"
        data-loading={loading || undefined}
        className={cn(
          'flex items-start gap-3 rounded-lg bg-surface-2',
          size === 'default' && 'p-4',
          size === 'small' && 'p-3',
          loading && 'animate-pulse',
          className
        )}
        role="note"
        {...props}
      >
        {!hideIcon && (
          <span
            className={cn(
              'shrink-0 text-text-muted/60',
              size === 'default' && 'mt-0.5',
              size === 'small' && 'mt-px'
            )}
            aria-hidden="true"
          >
            {loading ? (
              <div className="h-3.5 w-3.5 rounded bg-surface-2" />
            ) : (
              IconComponent
            )}
          </span>
        )}
        <div
          className={cn(
            'flex-1 min-w-0',
            size === 'default' && 'text-body-sm text-text-muted leading-relaxed',
            size === 'small' && 'text-caption text-text-muted'
          )}
        >
          {loading ? (
            <div className="space-y-1.5">
              <div className="h-3 w-3/4 rounded bg-surface" />
              <div className="h-3 w-1/2 rounded bg-surface" />
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    );
  }
);
InlineNote.displayName = 'InlineNote';

export { InlineNote };

