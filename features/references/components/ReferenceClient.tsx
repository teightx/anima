'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getJSON, type FetchOptions } from '@/lib/apiClient';
import { ErrorState, EmptyState } from '@/components/feedback';
import type { ReferenceSource } from '@/server/contracts';
import type { ReferencePageState } from '../types';
import { ReferenceHeader } from './ReferenceHeader';
import { ReferenceSummary } from './ReferenceSummary';
import { ReferenceKeyFindings } from './ReferenceKeyFindings';
import { ReferenceMeta } from './ReferenceMeta';
import { ReferenceLimitations } from './ReferenceLimitations';
import { ReferenceUserContext } from './ReferenceUserContext';
import { ReferenceDisclaimer } from './ReferenceDisclaimer';
import { ReferenceSkeleton } from './ReferenceSkeleton';

interface ReferenceClientProps {
  referenceId: string;
  backHref: string;
  fetchOptions?: FetchOptions;
}

export function ReferenceClient({
  referenceId,
  backHref,
  fetchOptions,
}: ReferenceClientProps) {
  const [state, setState] = useState<ReferencePageState>('loading');
  const [reference, setReference] = useState<ReferenceSource | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadReference() {
      setState('loading');
      setError(null);

      const url = `/api/references/${referenceId}`;
      const result = await getJSON<ReferenceSource>(url, fetchOptions);

      if (result.ok) {
        setReference(result.data);
        setState('loaded');
      } else {
        if (result.error.code === 'NOT_FOUND') {
          setState('not_found');
        } else {
          setError(result.error.message);
          setState('error');
        }
      }
    }

    loadReference();
  }, [referenceId, fetchOptions]);

  if (state === 'loading') {
    return <ReferenceSkeleton />;
  }

  if (state === 'not_found') {
    return (
      <div className="space-y-6">
        <Button variant="ghost" size="sm" asChild className="-ml-2">
          <Link href={backHref}>
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
        </Button>

        <EmptyState
          title="Fonte não encontrada"
          description="A referência solicitada não existe ou foi removida."
          icon={<FileQuestion className="h-5 w-5 text-muted-foreground" />}
        />
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className="space-y-6">
        <Button variant="ghost" size="sm" asChild className="-ml-2">
          <Link href={backHref}>
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
        </Button>

        <ErrorState
          title="Não foi possível carregar"
          description={error || 'Ocorreu um erro ao buscar os dados.'}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  if (!reference) {
    return null;
  }

  return (
    <div className="space-y-6">
      <ReferenceHeader reference={reference} backHref={backHref} />

      <ReferenceSummary abstract={reference.abstract} />

      <ReferenceKeyFindings findings={reference.keyFindings} />

      <ReferenceLimitations
        type={reference.type}
        evidenceLevel={reference.evidenceLevel}
      />

      <ReferenceMeta reference={reference} />

      <ReferenceUserContext />

      <ReferenceDisclaimer />
    </div>
  );
}

