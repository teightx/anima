'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * FeedbackBar — Barra fixa de ações do Ânima
 * 
 * Características:
 * - Layout horizontal estável
 * - Ações textuais (sem ícones soltos)
 * - Estados silenciosos
 * - Feedback via toast curto
 * 
 * Estados: loading, disabled
 */

interface FeedbackBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Ações à esquerda (feedback buttons) */
  actions?: React.ReactNode;
  /** Ação à direita (link/button secundário) */
  secondaryAction?: React.ReactNode;
  /** Estado de carregamento */
  loading?: boolean;
  /** Estado desabilitado */
  disabled?: boolean;
}

const FeedbackBar = React.forwardRef<HTMLDivElement, FeedbackBarProps>(
  (
    { className, actions, secondaryAction, loading = false, disabled = false, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        data-slot="feedback-bar"
        data-loading={loading || undefined}
        data-disabled={disabled || undefined}
        className={cn(
          'flex flex-wrap items-center justify-between gap-3 pt-4',
          'border-t border-hairline',
          loading && 'animate-pulse pointer-events-none',
          disabled && 'opacity-50 pointer-events-none',
          className
        )}
        {...props}
      >
        {/* Ações principais */}
        <div className="flex items-center gap-1.5">
          {loading ? (
            <>
              <div className="h-7 w-16 rounded bg-surface-2" />
              <div className="h-7 w-20 rounded bg-surface-2" />
            </>
          ) : (
            actions
          )}
        </div>

        {/* Ação secundária */}
        {secondaryAction && !loading && (
          <div className="flex items-center">{secondaryAction}</div>
        )}
      </div>
    );
  }
);
FeedbackBar.displayName = 'FeedbackBar';

/**
 * FeedbackAction — Botão de ação dentro do FeedbackBar
 */
interface FeedbackActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Ícone antes do label */
  icon?: React.ReactNode;
  /** Se a ação está ativa/selecionada */
  active?: boolean;
  /** Variante do botão */
  variant?: 'default' | 'muted';
}

const FeedbackAction = React.forwardRef<HTMLButtonElement, FeedbackActionProps>(
  (
    { className, children, icon, active = false, variant = 'default', disabled, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        data-slot="feedback-action"
        data-active={active || undefined}
        className={cn(
          // Base
          'inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md',
          'text-body-sm font-medium transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/35',
          
          // Variants
          variant === 'default' && [
            active
              ? 'bg-surface-2 text-text-primary'
              : 'text-text-muted hover:bg-surface-2 hover:text-text-secondary',
          ],
          variant === 'muted' && [
            'text-text-muted hover:text-text-secondary',
          ],
          
          // Disabled
          disabled && 'cursor-not-allowed opacity-50',
          
          className
        )}
        {...props}
      >
        {icon && (
          <span className="shrink-0 [&>svg]:h-3.5 [&>svg]:w-3.5" aria-hidden="true">
            {icon}
          </span>
        )}
        <span>{children}</span>
      </button>
    );
  }
);
FeedbackAction.displayName = 'FeedbackAction';

export { FeedbackBar, FeedbackAction };

