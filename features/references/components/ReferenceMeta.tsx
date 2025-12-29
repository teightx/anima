'use client';

import { Card, CardContent } from '@/components/ui/card';
import type { ReferenceSource } from '../types';
import { formatEvidenceLevel } from '../helpers';

interface ReferenceMetaProps {
  reference: ReferenceSource;
}

export function ReferenceMeta({ reference }: ReferenceMetaProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium text-muted-foreground">
              Nivel de evidencia
            </dt>
            <dd className="mt-1 text-sm text-foreground">
              {formatEvidenceLevel(reference.evidenceLevel)}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-muted-foreground">Ano</dt>
            <dd className="mt-1 text-sm text-foreground">{reference.year}</dd>
          </div>
          {reference.doi && (
            <div className="sm:col-span-2">
              <dt className="text-xs font-medium text-muted-foreground">DOI</dt>
              <dd className="mt-1 text-sm text-foreground font-mono">
                {reference.doi}
              </dd>
            </div>
          )}
        </dl>
      </CardContent>
    </Card>
  );
}

