import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Densidade do conteúdo (ritmo vertical) */
  density?: 'default' | 'compact' | 'spacious';
}

/**
 * PageContainer — Container de conteúdo de página do Ânima
 * 
 * Aplica ritmo vertical consistente entre seções.
 * Usar dentro do Shell, após o PageHeader.
 * 
 * Densidade:
 * - default: gap de 24px (section-gap)
 * - compact: gap de 16px (content-gap)
 * - spacious: gap de 32px (page-gap)
 */
export function PageContainer({
  children,
  className,
  density = 'default',
}: PageContainerProps) {
  return (
    <div
      className={cn(
        density === 'default' && 'page-stack',
        density === 'compact' && 'page-stack-compact',
        density === 'spacious' && 'page-stack-spacious',
        className
      )}
    >
      {children}
    </div>
  );
}
