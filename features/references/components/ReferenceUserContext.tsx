'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export function ReferenceUserContext() {
  return (
    <Card variant="ghost" className="border border-dashed border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-[0.8125rem] font-medium text-muted-foreground">
          Relação com seus registros
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-[0.8125rem] text-muted-foreground/70 leading-relaxed">
          Esta seção contextualiza o estudo com seus dados ao longo do tempo.
          Disponível em breve.
        </p>
      </CardContent>
    </Card>
  );
}

