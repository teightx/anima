'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FileText } from 'lucide-react';

/**
 * Indicador discreto de modo demo
 * Só aparece quando ?demo=1 está presente na URL
 */
export function DemoIndicator() {
  const searchParams = useSearchParams();
  const isDemo = searchParams.get('demo') === '1' || searchParams.get('demo') === 'true';

  if (!isDemo) {
    return null;
  }

  return (
    <Link
      href="/demo"
      className="inline-flex items-center gap-1.5 text-[0.6875rem] text-muted-foreground/60 hover:text-muted-foreground transition-colors"
      title="Ver roteiro da demo"
    >
      <FileText className="h-3 w-3" />
      <span>Roteiro</span>
    </Link>
  );
}

