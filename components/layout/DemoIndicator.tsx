'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Info } from 'lucide-react';

/**
 * Indicador discreto de modo demo
 * Só aparece quando ?demo=1 está presente na URL
 * 
 * Comunica: "Isso é demonstração" de forma discreta mas clara
 */
export function DemoIndicator() {
  const searchParams = useSearchParams();
  const isDemo = searchParams.get('demo') === '1' || searchParams.get('demo') === 'true';

  if (!isDemo) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Link
        href="/demo"
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-hairline text-[0.75rem] text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors shadow-[var(--shadow-soft)]"
        title="Ambiente de demonstração"
      >
        <Info className="h-3 w-3" />
        <span>Dados de exemplo</span>
      </Link>
    </div>
  );
}

