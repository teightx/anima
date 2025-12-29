'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { getJSON, postJSON, type FetchOptions } from '@/lib/apiClient';
import { ErrorState, EmptyState, useToast } from '@/components/feedback';
import type { ObservationWithFeedback, ObservationTab, PageState, FeedbackAction } from '../types';
import { applyFilters, countByTab } from '../helpers';
import { ObservationTabs } from './ObservationTabs';
import { ObservationCard } from './ObservationCard';
import { ObservationsSkeleton } from './ObservationsSkeleton';

interface ObservationsClientProps {
  asOf: string;
  fetchOptions?: FetchOptions;
}

export function ObservationsClient({ asOf, fetchOptions }: ObservationsClientProps) {
  const [state, setState] = useState<PageState>('loading');
  const [observations, setObservations] = useState<ObservationWithFeedback[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const [activeTab, setActiveTab] = useState<ObservationTab>('all');
  const [showHidden, setShowHidden] = useState(false);

  const { success, error: showError } = useToast();

  const loadObservations = useCallback(async () => {
    setState('loading');
    setError(null);

    const startDate = new Date(asOf);
    startDate.setDate(startDate.getDate() - 30);
    const start = startDate.toISOString().split('T')[0];
    
    const url = `/api/readings?start=${start}&end=${asOf}`;
    const result = await getJSON<ObservationWithFeedback[]>(url, fetchOptions);

    if (result.ok) {
      setObservations(result.data);
      setState('loaded');
    } else {
      setError(result.error.message);
      setState('error');
    }
  }, [asOf, fetchOptions]);

  useEffect(() => {
    loadObservations();
  }, [loadObservations]);

  const handleFeedback = useCallback(
    async (observationId: string, action: FeedbackAction): Promise<boolean> => {
      const result = await postJSON(
        `/api/readings/${observationId}/feedback`,
        { action },
        fetchOptions
      );

      if (result.ok) {
        setObservations(prev =>
          prev.map(o =>
            o.id === observationId ? { ...o, feedback: action } : o
          )
        );

        if (action === 'useful') {
          success('Marcada como útil');
        } else if (action === 'hidden') {
          success('Observação ocultada');
        }
        return true;
      } else {
        showError('Não foi possível salvar');
        return false;
      }
    },
    [fetchOptions, success, showError]
  );

  const filteredObservations = useMemo(() => {
    return applyFilters(observations, activeTab, showHidden);
  }, [observations, activeTab, showHidden]);

  const tabCounts = useMemo(() => {
    return countByTab(observations, showHidden);
  }, [observations, showHidden]);

  if (state === 'loading') {
    return <ObservationsSkeleton />;
  }

  if (state === 'error') {
    return (
      <ErrorState
        title="Não foi possível carregar"
        description={error || 'Ocorreu um erro ao buscar as observações.'}
        onRetry={loadObservations}
      />
    );
  }

  const isFiltered = activeTab !== 'all';

  return (
    <div className="page-stack">
      {/* Filters */}
      <ObservationTabs
        activeTab={activeTab}
        counts={tabCounts}
        onTabChange={setActiveTab}
      />

      {/* Observations list */}
      {filteredObservations.length === 0 ? (
        <EmptyState
          title="Nenhuma observação disponível neste período"
          description={
            isFiltered
              ? 'Tente selecionar outra categoria ou período.'
              : 'As observações aparecerão aqui conforme você registrar dados.'
          }
        />
      ) : (
        <div className="space-y-4">
          {filteredObservations.map(observation => (
            <ObservationCard
              key={observation.id}
              observation={observation}
              asOf={asOf}
              onFeedback={handleFeedback}
            />
          ))}
        </div>
      )}
    </div>
  );
}

