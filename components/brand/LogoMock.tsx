'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * LogoMock — Logo tipográfico provisório do Ânima
 * 
 * Características:
 * - Apenas tipográfico, sem símbolo
 * - Mesma fonte da UI (sans base)
 * - Peso semi-bold com tracking aberto
 * - Ponto discreto como gesto visual
 * - Sem sombra, usa --text-primary
 * 
 * Gesto visual escolhido: ponto após o nome "Ânima."
 * Marca presença sem parecer definitivo.
 * 
 * Onde aplicar:
 * - Sidebar (topo)
 * - Header da landing
 * - Footer simples
 * 
 * Onde NÃO aplicar:
 * - Como ícone
 * - Como watermark
 * - Como elemento gráfico repetido
 */

interface LogoMockProps {
  /** Se deve ser um link (default: false) */
  asLink?: boolean;
  /** URL do link (se asLink=true) */
  href?: string;
  /** Tamanho do logo */
  size?: 'default' | 'small' | 'large';
  /** Mostrar ponto (gesto visual) */
  showDot?: boolean;
  /** Classes adicionais */
  className?: string;
}

export function LogoMock({
  asLink = false,
  href = '/',
  size = 'default',
  showDot = true,
  className,
}: LogoMockProps) {
  const textClasses = cn(
    'font-semibold tracking-[0.03em] text-text-primary',
    size === 'small' && 'text-h4',
    size === 'default' && 'text-h3',
    size === 'large' && 'text-h1',
    className
  );

  const content = (
    <span className={textClasses}>
      Ânima
      {showDot && (
        <span className="text-primary opacity-70">.</span>
      )}
    </span>
  );

  if (asLink) {
    return (
      <Link href={href} className="inline-block" aria-label="Ânima - Ir para início">
        {content}
      </Link>
    );
  }

  return <div className="inline-block">{content}</div>;
}

