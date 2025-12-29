'use client';

import { useState, useEffect } from 'react';
import {
  QuietCard,
  QuietCardContent,
  QuietCardHeader,
  QuietCardTitle,
  QuietCardFooter,
  InlineNote,
} from '@/components/system';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { getJSON, postJSON, type FetchOptions } from '@/lib/apiClient';
import { useToast } from '@/components/feedback';
import type { JournalEntry } from '@/server/contracts';

type CardState = 'loading' | 'empty' | 'editing' | 'saved' | 'error';

interface ContextCardProps {
  date: string;
  fetchOptions?: FetchOptions;
}

/**
 * ContextCard — Contexto do dia
 * 
 * Campo texto opcional e neutro para adicionar contexto factual.
 * Não é um diário terapêutico - apenas fatos, contexto, eventos.
 */
export function ContextCard({ date, fetchOptions }: ContextCardProps) {
  const [state, setState] = useState<CardState>('loading');
  const [entry, setEntry] = useState<JournalEntry | null>(null);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { success, error: showError } = useToast();

  useEffect(() => {
    async function loadContext() {
      setState('loading');

      const result = await getJSON<JournalEntry>(
        `/api/journal/${date}`,
        fetchOptions
      );

      if (result.ok) {
        setEntry(result.data);
        setContent(result.data.content);
        setState('saved');
      } else if (result.error.code === 'NOT_FOUND') {
        setEntry(null);
        setContent('');
        setState('empty');
      } else {
        setState('error');
      }
    }

    loadContext();
  }, [date, fetchOptions]);

  const handleStartEditing = () => {
    setState('editing');
  };

  const handleCancel = () => {
    if (entry) {
      setContent(entry.content);
      setState('saved');
    } else {
      setContent('');
      setState('empty');
    }
  };

  const handleSave = async () => {
    if (!content.trim()) {
      handleCancel();
      return;
    }

    setIsSubmitting(true);

    const result = await postJSON<JournalEntry>(
      `/api/journal/${date}`,
      {
        content: content.trim(),
        type: 'free_write',
      },
      fetchOptions
    );

    setIsSubmitting(false);

    if (result.ok) {
      setEntry(result.data);
      setState('saved');
      success('Contexto salvo');
    } else {
      showError('Não foi possível salvar');
    }
  };

  // Loading state
  if (state === 'loading') {
    return (
      <QuietCard loading>
        <QuietCardHeader>
          <Skeleton className="h-5 w-28" />
        </QuietCardHeader>
        <QuietCardContent>
          <Skeleton className="h-20 w-full" />
        </QuietCardContent>
      </QuietCard>
    );
  }

  // Error state
  if (state === 'error') {
    return (
      <QuietCard>
        <QuietCardHeader>
          <QuietCardTitle>Contexto do dia</QuietCardTitle>
        </QuietCardHeader>
        <QuietCardContent>
          <p className="text-body-sm text-text-muted">
            Não foi possível carregar o contexto.
          </p>
        </QuietCardContent>
      </QuietCard>
    );
  }

  // Empty state - show prompt to add context
  if (state === 'empty') {
    return (
      <QuietCard>
        <QuietCardHeader>
          <QuietCardTitle>Contexto do dia</QuietCardTitle>
        </QuietCardHeader>
        <QuietCardContent className="space-y-4">
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="O que vale lembrar sobre hoje (opcional). Fatos, contexto, eventos."
            rows={3}
            className="w-full px-3 py-2.5 text-body-sm border border-hairline bg-surface rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-border placeholder:text-text-muted/60"
          />
          <InlineNote size="small" hideIcon>
            Registro opcional. Dados utilizados apenas para contexto pessoal.
          </InlineNote>
        </QuietCardContent>
        {content.trim() && (
          <QuietCardFooter className="border-t border-hairline px-5 py-4">
            <Button onClick={handleSave} disabled={isSubmitting} size="sm">
              {isSubmitting ? 'Salvando...' : 'Salvar contexto'}
            </Button>
          </QuietCardFooter>
        )}
      </QuietCard>
    );
  }

  // Editing state
  if (state === 'editing') {
    return (
      <QuietCard>
        <QuietCardHeader>
          <QuietCardTitle>Contexto do dia</QuietCardTitle>
        </QuietCardHeader>
        <QuietCardContent className="space-y-4">
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="O que vale lembrar sobre hoje (opcional). Fatos, contexto, eventos."
            rows={4}
            className="w-full px-3 py-2.5 text-body-sm border border-hairline bg-surface rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-border placeholder:text-text-muted/60"
            autoFocus
          />
          <InlineNote size="small" hideIcon>
            Registro opcional. Dados utilizados apenas para contexto pessoal.
          </InlineNote>
        </QuietCardContent>
        <QuietCardFooter className="flex justify-between border-t border-hairline px-5 py-4">
          <Button variant="ghost" onClick={handleCancel} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={isSubmitting} size="sm">
            {isSubmitting ? 'Salvando...' : 'Salvar contexto'}
          </Button>
        </QuietCardFooter>
      </QuietCard>
    );
  }

  // Saved state - show content with edit option
  if (state === 'saved' && entry) {
    return (
      <QuietCard>
        <QuietCardHeader className="flex flex-row items-center justify-between">
          <QuietCardTitle>Contexto do dia</QuietCardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleStartEditing}
            className="text-text-muted"
          >
            Editar
          </Button>
        </QuietCardHeader>
        <QuietCardContent>
          <p className="text-body-sm text-text-primary leading-relaxed whitespace-pre-wrap">
            {entry.content}
          </p>
        </QuietCardContent>
      </QuietCard>
    );
  }

  return null;
}

