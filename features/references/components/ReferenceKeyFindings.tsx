'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface ReferenceKeyFindingsProps {
  findings: string[];
}

export function ReferenceKeyFindings({ findings }: ReferenceKeyFindingsProps) {
  if (!findings || findings.length === 0) {
    return null;
  }

  return (
    <Card variant="static">
      <CardHeader className="pb-3">
        <CardTitle className="text-[0.8125rem] font-medium text-muted-foreground">
          Principais observações
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2.5">
          {findings.map((finding, index) => (
            <li
              key={index}
              className="flex items-start gap-3"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/40" />
              <span className="font-serif text-[0.9375rem] leading-relaxed text-foreground">{finding}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

