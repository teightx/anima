'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Segmented — Controle segmentado único do Ânima
 * 
 * Características:
 * - Substitui tabs dispersas
 * - Fundo discreto
 * - Item ativo sem destaque agressivo
 * - Funciona em desktop e mobile
 * 
 * Estados: loading, disabled
 */

interface SegmentedOption<T extends string> {
  value: T;
  label: string;
  /** Contador opcional */
  count?: number;
  /** Desabilitar opção individual */
  disabled?: boolean;
}

interface SegmentedProps<T extends string> {
  /** Opções disponíveis */
  options: SegmentedOption<T>[];
  /** Valor selecionado */
  value: T;
  /** Callback de mudança */
  onChange: (value: T) => void;
  /** Tamanho */
  size?: 'default' | 'small';
  /** Estado de carregamento */
  loading?: boolean;
  /** Estado desabilitado (todo o componente) */
  disabled?: boolean;
  /** Classes adicionais */
  className?: string;
  /** Label para acessibilidade */
  'aria-label'?: string;
}

function Segmented<T extends string>({
  options,
  value,
  onChange,
  size = 'default',
  loading = false,
  disabled = false,
  className,
  'aria-label': ariaLabel,
}: SegmentedProps<T>) {
  return (
    <div
      data-slot="segmented"
      data-loading={loading || undefined}
      data-disabled={disabled || undefined}
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        'inline-flex items-center rounded-lg bg-surface-2/60 p-1',
        'flex-nowrap shrink-0',
        loading && 'animate-pulse pointer-events-none',
        disabled && 'opacity-50 pointer-events-none',
        className
      )}
    >
      {options.map((option) => {
        const isActive = value === option.value;
        const isDisabled = disabled || option.disabled;

        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-disabled={isDisabled}
            disabled={isDisabled}
            onClick={() => !isDisabled && onChange(option.value)}
            className={cn(
              // Base
              'relative inline-flex items-center justify-center gap-1.5',
              'font-medium transition-all duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/35 focus-visible:ring-offset-1',
              
              // Sizing
              size === 'default' && 'px-3 py-1.5 text-body-sm rounded-md',
              size === 'small' && 'px-2.5 py-1 text-caption rounded',
              
              // States
              isActive
                ? 'bg-surface-2 text-text-primary font-medium shadow-[var(--shadow-subtle)]'
                : 'text-text-muted hover:text-text-secondary',
              
              // Disabled
              isDisabled && 'cursor-not-allowed opacity-50'
            )}
          >
            <span>{option.label}</span>
            {option.count !== undefined && (
              <span
                className={cn(
                  'tabular-nums',
                  isActive ? 'text-text-muted' : 'text-text-muted/60'
                )}
              >
                {option.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
Segmented.displayName = 'Segmented';

export { Segmented };
export type { SegmentedOption, SegmentedProps };

