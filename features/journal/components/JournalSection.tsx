'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { getJSON, postJSON, type FetchOptions } from '@/lib/apiClient';
import type { JournalEntry } from '@/server/contracts';
import { JournalEditor } from './JournalEditor';
import { JournalViewer } from './JournalViewer';

type SectionState = 'loading' | 'empty' | 'editing' | 'saved' | 'error';

interface JournalSectionProps {
  date: string;
  fetchOptions?: FetchOptions;
}

export function JournalSection({ date, fetchOptions }: JournalSectionProps) {
  const [state, setState] = useState<SectionState>('loading');
  const [entry, setEntry] = useState<JournalEntry | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadJournal() {
      setState('loading');
      setError(null);

      const result = await getJSON<JournalEntry>(
        `/api/journal/${date}`,
        fetchOptions
      );

      if (result.ok) {
        setEntry(result.data);
        setState('saved');
      } else if (result.error.code === 'NOT_FOUND') {
        setEntry(null);
        setState('empty');
      } else {
        setError(result.error.message);
        setState('error');
      }
    }

    loadJournal();
  }, [date, fetchOptions]);

  const handleStartEditing = () => {
    setState('editing');
  };

  const handleCancel = () => {
    if (entry) {
      setState('saved');
    } else {
      setState('empty');
    }
  };

  const handleSave = async (content: string) => {
    setIsSubmitting(true);
    setError(null);

    const result = await postJSON<JournalEntry>(
      `/api/journal/${date}`,
      {
        content,
        type: 'free_write',
      },
      fetchOptions
    );

    setIsSubmitting(false);

    if (result.ok) {
      setEntry(result.data);
      setState('saved');
    } else {
      setError(result.error.message);
    }
  };

  // Loading state
  if (state === 'loading') {
    return (
      <section className="space-y-3" aria-label="Anotacoes do dia">
        <h2 className="text-sm font-medium text-muted-foreground">
          Anotacoes do dia
        </h2>
        <Card className="p-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </Card>
      </section>
    );
  }

  // Error state
  if (state === 'error') {
    return (
      <section className="space-y-3" aria-label="Anotacoes do dia">
        <h2 className="text-sm font-medium text-muted-foreground">
          Anotacoes do dia
        </h2>
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Erro ao carregar</CardTitle>
            <CardDescription>{error || 'Erro desconhecido'}</CardDescription>
          </CardHeader>
          <div className="px-6 pb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.reload()}
            >
              Tentar novamente
            </Button>
          </div>
        </Card>
      </section>
    );
  }

  // Empty state
  if (state === 'empty') {
    return (
      <section className="space-y-3" aria-label="Anotacoes do dia">
        <h2 className="text-sm font-medium text-muted-foreground">
          Anotacoes do dia
        </h2>
        <Button
          variant="outline"
          className="w-full justify-start text-muted-foreground"
          onClick={handleStartEditing}
        >
          Adicionar anotacao
        </Button>
      </section>
    );
  }

  // Editing state
  if (state === 'editing') {
    return (
      <section className="space-y-3" aria-label="Anotacoes do dia">
        <h2 className="text-sm font-medium text-muted-foreground">
          Anotacoes do dia
        </h2>
        <JournalEditor
          initialContent={entry?.content || ''}
          isSubmitting={isSubmitting}
          error={error}
          onSave={handleSave}
          onCancel={entry ? handleCancel : undefined}
        />
      </section>
    );
  }

  // Saved state
  if (state === 'saved' && entry) {
    return (
      <section className="space-y-3" aria-label="Anotacoes do dia">
        <h2 className="text-sm font-medium text-muted-foreground">
          Anotacoes do dia
        </h2>
        <JournalViewer content={entry.content} onEdit={handleStartEditing} />
      </section>
    );
  }

  return null;
}
