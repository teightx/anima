'use client';

import { Info } from 'lucide-react';

export function ReferenceDisclaimer() {
  return (
    <div className="flex items-start gap-3 rounded-lg bg-muted/30 p-4">
      <Info className="h-3.5 w-3.5 shrink-0 text-muted-foreground/60 mt-0.5" />
      <p className="text-[0.75rem] text-muted-foreground/70 leading-relaxed">
        Informação apresentada para fins educacionais. Não substitui avaliação
        de profissional de saúde.
      </p>
    </div>
  );
}

