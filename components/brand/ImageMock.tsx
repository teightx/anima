'use client';

import { cn } from '@/lib/utils';

/**
 * ImageMock — Placeholder visual provisório do Ânima
 * 
 * Regra de ouro: Nada de stock humano agora.
 * 
 * Usar apenas:
 * - Superfícies (papel, cerâmica, vidro fosco, tecido)
 * - Luz difusa, lateral, sem contraste forte
 * - Cores: escala de cinza, azul muito suave, bege frio
 * - Formato: imagens estáticas, sem pessoas, sem texto embutido, sem emoção explícita
 * 
 * Implementação:
 * - Background com gradiente sutil
 * - Noise leve
 * - Ou imagem abstrata local (futuro)
 */

interface ImageMockProps {
  /** Ratio da imagem */
  ratio?: '16:9' | '4:3' | '1:1' | '3:2';
  /** Variante visual */
  variant?: 'surface' | 'light' | 'texture';
  /** Classes adicionais */
  className?: string;
  /** Alt text para acessibilidade */
  alt?: string;
}

const ratioClasses = {
  '16:9': 'aspect-video',
  '4:3': 'aspect-[4/3]',
  '1:1': 'aspect-square',
  '3:2': 'aspect-[3/2]',
};

const variantStyles = {
  surface: {
    background: 'linear-gradient(135deg, hsl(var(--surface-2)) 0%, hsl(var(--surface)) 100%)',
    noise: 'radial-gradient(circle at 20% 50%, hsl(var(--text-muted) / 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 50%, hsl(var(--text-muted) / 0.02) 0%, transparent 50%)',
  },
  light: {
    background: 'linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--surface-2)) 50%, hsl(var(--background)) 100%)',
    noise: 'radial-gradient(circle at 30% 40%, hsl(var(--primary) / 0.04) 0%, transparent 60%)',
  },
  texture: {
    background: 'linear-gradient(180deg, hsl(var(--surface-2)) 0%, hsl(var(--surface)) 30%, hsl(var(--surface-2)) 100%)',
    noise: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--text-muted) / 0.01) 2px, hsl(var(--text-muted) / 0.01) 4px)',
  },
};

export function ImageMock({
  ratio = '16:9',
  variant = 'surface',
  className,
  alt = 'Placeholder visual',
}: ImageMockProps) {
  const style = variantStyles[variant];

  return (
    <div
      className={cn(
        'relative w-full rounded-lg overflow-hidden',
        ratioClasses[ratio],
        'bg-surface-2',
        className
      )}
      role="img"
      aria-label={alt}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: style.background,
        }}
      />
      
      {/* Noise/texture overlay */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: style.noise,
        }}
      />
      
      {/* Subtle border */}
      <div className="absolute inset-0 border border-hairline rounded-lg pointer-events-none" />
    </div>
  );
}

