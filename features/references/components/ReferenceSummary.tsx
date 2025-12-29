'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface ReferenceSummaryProps {
  abstract: string | undefined;
}

export function ReferenceSummary({ abstract }: ReferenceSummaryProps) {
  if (!abstract) {
    return null;
  }

  return (
    <Card variant="static">
      <CardHeader className="pb-3">
        <CardTitle className="text-[0.8125rem] font-medium text-muted-foreground">
          Resumo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="prose-editorial">{abstract}</p>
      </CardContent>
    </Card>
  );
}

