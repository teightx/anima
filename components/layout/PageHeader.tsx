import { Suspense } from 'react';
import { cn } from '@/lib/utils';
import { DemoIndicator } from './DemoIndicator';

interface PageHeaderProps {
  /** Título da página (obrigatório) */
  title: string;
  /** Subtítulo/descrição (opcional) */
  description?: string;
  /** Ações à direita (botões, toggles) */
  actions?: React.ReactNode;
  /** Classes adicionais */
  className?: string;
  /** Conteúdo adicional (deprecated: use actions) */
  children?: React.ReactNode;
}

/**
 * PageHeader — Cabeçalho oficial de página do Ânima
 * 
 * Características:
 * - Título com tipografia h1
 * - Subtítulo opcional em texto secundário
 * - Ações à direita quando existirem
 * - Separação clara do conteúdo (header-gap)
 * - Sem breadcrumbs
 * 
 * Usado em todas as telas principais:
 * Hoje, Registros, Observações, Planos, Configurações, Referências
 */
export function PageHeader({
  title,
  description,
  actions,
  className,
  children,
}: PageHeaderProps) {
  const actionContent = actions || children;

  return (
    <header className={cn('header-gap', className)}>
      <div className="flex items-start justify-between gap-4">
        {/* Título e descrição */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-h1 truncate">{title}</h1>
            <Suspense fallback={null}>
              <DemoIndicator />
            </Suspense>
          </div>
          {description && (
            <p className="mt-1.5 text-body-sm text-text-muted max-w-2xl">
              {description}
            </p>
          )}
        </div>

        {/* Ações */}
        {actionContent && (
          <div className="flex items-center gap-2 shrink-0 pt-0.5">
            {actionContent}
          </div>
        )}
      </div>
    </header>
  );
}
