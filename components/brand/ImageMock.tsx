'use client';

import { cn } from '@/lib/utils';

/**
 * ImageMock — Placeholder visual provisório do Ânima
 * 
 * Objetivo: "Isso é um produto real, mesmo sem branding final."
 * 
 * Variantes:
 * - surface: gradiente sutil básico
 * - material: textura tátil com ruído e sombras orgânicas
 * - editorial: composição com blocos e jogo de luz
 * 
 * Regras:
 * - Sem pessoas, sem texto, sem emoção explícita
 * - Cores: escala de cinza, azul suave, bege frio
 * - Deve parecer produto em construção, não layout vazio
 */

interface ImageMockProps {
  /** Ratio da imagem */
  ratio?: '16:9' | '4:3' | '1:1' | '3:2' | '21:9';
  /** Variante visual */
  variant?: 'surface' | 'material' | 'editorial';
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
  '21:9': 'aspect-[21/9]',
};

export function ImageMock({
  ratio = '16:9',
  variant = 'material',
  className,
  alt = 'Visual provisório',
}: ImageMockProps) {
  return (
    <div
      className={cn(
        'relative w-full rounded-xl overflow-hidden',
        ratioClasses[ratio],
        'shadow-[var(--shadow-soft)]',
        className
      )}
      role="img"
      aria-label={alt}
    >
      {variant === 'surface' && <SurfaceVariant />}
      {variant === 'material' && <MaterialVariant />}
      {variant === 'editorial' && <EditorialVariant />}
      
      {/* Borda suave */}
      <div className="absolute inset-0 border border-hairline rounded-xl pointer-events-none" />
    </div>
  );
}

/**
 * Surface — Gradiente básico sutil
 */
function SurfaceVariant() {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(145deg, 
            hsl(var(--surface)) 0%, 
            hsl(var(--surface-2)) 50%,
            hsl(var(--surface)) 100%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(circle at 30% 40%, hsl(var(--primary) / 0.06) 0%, transparent 50%)`,
        }}
      />
    </>
  );
}

/**
 * Material — Textura tátil com ruído e sombras orgânicas
 * Sensação de papel, cerâmica ou tecido
 */
function MaterialVariant() {
  return (
    <>
      {/* Base warm */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(165deg,
            hsl(40 25% 96%) 0%,
            hsl(35 20% 93%) 35%,
            hsl(30 18% 91%) 65%,
            hsl(35 22% 94%) 100%)`,
        }}
      />
      
      {/* Luz lateral suave */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 15% 20%, hsl(45 30% 98% / 0.9) 0%, transparent 50%),
            radial-gradient(ellipse 60% 50% at 85% 75%, hsl(220 15% 88% / 0.4) 0%, transparent 45%)
          `,
        }}
      />
      
      {/* Sombra orgânica */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 40% 35% at 70% 30%, hsl(220 20% 50% / 0.04) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 25% 70%, hsl(220 20% 50% / 0.03) 0%, transparent 55%)
          `,
        }}
      />
      
      {/* Noise texture - papel/tecido */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'multiply',
        }}
      />
      
      {/* Subtle fold/crease */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `linear-gradient(105deg,
            transparent 0%,
            transparent 48%,
            hsl(220 15% 75% / 0.3) 49%,
            hsl(220 15% 75% / 0.15) 50%,
            hsl(45 20% 98% / 0.2) 51%,
            transparent 52%,
            transparent 100%)`,
        }}
      />
    </>
  );
}

/**
 * Editorial — Composição com blocos e jogo de luz
 * Aspecto de revista/publicação
 */
function EditorialVariant() {
  return (
    <>
      {/* Base */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg,
            hsl(220 18% 96%) 0%,
            hsl(215 15% 94%) 100%)`,
        }}
      />
      
      {/* Bloco superior esquerdo */}
      <div
        className="absolute top-[8%] left-[6%] w-[42%] h-[55%] rounded-lg"
        style={{
          background: `linear-gradient(155deg,
            hsl(35 22% 92%) 0%,
            hsl(30 18% 88%) 100%)`,
          boxShadow: `
            0 4px 12px hsl(220 20% 50% / 0.08),
            0 1px 3px hsl(220 20% 50% / 0.05)
          `,
        }}
      />
      
      {/* Bloco direito alto */}
      <div
        className="absolute top-[12%] right-[6%] w-[38%] h-[35%] rounded-lg"
        style={{
          background: `linear-gradient(135deg,
            hsl(210 25% 94%) 0%,
            hsl(215 20% 90%) 100%)`,
          boxShadow: `
            0 3px 10px hsl(220 20% 50% / 0.06),
            0 1px 2px hsl(220 20% 50% / 0.04)
          `,
        }}
      />
      
      {/* Bloco inferior direito */}
      <div
        className="absolute bottom-[10%] right-[8%] w-[35%] h-[40%] rounded-lg"
        style={{
          background: `linear-gradient(145deg,
            hsl(40 20% 95%) 0%,
            hsl(35 15% 91%) 100%)`,
          boxShadow: `
            0 5px 15px hsl(220 20% 50% / 0.07),
            0 2px 4px hsl(220 20% 50% / 0.04)
          `,
        }}
      />
      
      {/* Linhas editoriais */}
      <div className="absolute bottom-[15%] left-[6%] w-[40%] space-y-2">
        <div className="h-[3px] w-[80%] rounded-full bg-text-muted/10" />
        <div className="h-[3px] w-[60%] rounded-full bg-text-muted/08" />
        <div className="h-[3px] w-[70%] rounded-full bg-text-muted/06" />
      </div>
      
      {/* Luz diagonal */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: `linear-gradient(125deg,
            hsl(45 30% 98% / 0.4) 0%,
            transparent 40%,
            transparent 60%,
            hsl(220 20% 85% / 0.15) 100%)`,
        }}
      />
      
      {/* Noise sutil */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'multiply',
        }}
      />
    </>
  );
}
