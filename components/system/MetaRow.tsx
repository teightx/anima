'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * MetaRow — Linha compacta de metadados do Ânima
 * 
 * Características:
 * - Label + valor
 * - Espaçamento pequeno
 * - Tipografia secundária
 * - Layout horizontal silencioso
 * 
 * Estados: loading, empty
 */

interface MetaRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Label do metadado */
  label: string;
  /** Valor do metadado */
  value: React.ReactNode;
  /** Ícone opcional antes do label */
  icon?: React.ReactNode;
  /** Estado de carregamento */
  loading?: boolean;
}

const MetaRow = React.forwardRef<HTMLDivElement, MetaRowProps>(
  ({ className, label, value, icon, loading = false, ...props }, ref) => {
    // Não renderiza se o valor está vazio
    if (!value && !loading) {
      return null;
    }

    return (
      <div
        ref={ref}
        data-slot="meta-row"
        data-loading={loading || undefined}
        className={cn(
          'flex items-center gap-1.5 text-caption',
          loading && 'animate-pulse',
          className
        )}
        {...props}
      >
        {icon && (
          <span className="text-text-muted/60 shrink-0" aria-hidden="true">
            {icon}
          </span>
        )}
        {loading ? (
          <>
            <span className="h-3 w-12 rounded bg-surface-2" />
            <span className="h-3 w-16 rounded bg-surface-2" />
          </>
        ) : (
          <>
            <span className="text-text-muted">{label}</span>
            <span className="text-text-secondary">{value}</span>
          </>
        )}
      </div>
    );
  }
);
MetaRow.displayName = 'MetaRow';

/**
 * MetaRowGroup — Agrupa múltiplos MetaRows
 */
interface MetaRowGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Direção do layout */
  direction?: 'horizontal' | 'vertical';
  /** Separador entre items */
  separator?: boolean;
}

const MetaRowGroup = React.forwardRef<HTMLDivElement, MetaRowGroupProps>(
  (
    { className, children, direction = 'horizontal', separator = true, ...props },
    ref
  ) => {
    const items = React.Children.toArray(children).filter(Boolean);

    return (
      <div
        ref={ref}
        data-slot="meta-row-group"
        className={cn(
          'flex flex-wrap',
          direction === 'horizontal' && 'items-center gap-x-3 gap-y-1',
          direction === 'vertical' && 'flex-col gap-1.5',
          className
        )}
        {...props}
      >
        {items.map((child, index) => (
          <React.Fragment key={index}>
            {child}
            {separator && direction === 'horizontal' && index < items.length - 1 && (
              <span className="text-hairline" aria-hidden="true">
                ·
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }
);
MetaRowGroup.displayName = 'MetaRowGroup';

export { MetaRow, MetaRowGroup };

