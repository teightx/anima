'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { getJSON, postJSON, type FetchOptions } from '@/lib/apiClient';
import { ErrorState } from '@/components/feedback';
import { useToast } from '@/components/feedback';
import type { ReadingWithFeedback, ReadingTab, ReadingPeriod, FeedbackAction, PageState } from '../types';
import { calculateDateRange, applyFilters, countByTab } from '../helpers';
import { CategoryTabs } from './CategoryTabs';
import { PeriodToggle } from './PeriodToggle';
import { ReadingCard } from './ReadingCard';
import { ReadingsSkeleton } from './ReadingsSkeleton';
import { EmptyReadings } from './EmptyReadings';

interface ReadingsClientProps {
  asOf: string;
  fetchOptions?: FetchOptions;
}

export function ReadingsClient({ asOf, fetchOptions }: ReadingsClientProps) {
  const [state, setState] = useState<PageState>('loading');
  const [readings, setReadings] = useState<ReadingWithFeedback[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [activeTab, setActiveTab] = useState<ReadingTab>('all');
  const [period, setPeriod] = useState<ReadingPeriod>('30d');
  const [showHidden, setShowHidden] = useState(false);

  const { success, error: showError } = useToast();

  // Load readings
  const loadReadings = useCallback(async () => {
    setState('loading');
    setError(null);

    const { start, end } = calculateDateRange(asOf, period);
    const url = `/api/readings?start=${start}&end=${end}`;
    
    const result = await getJSON<ReadingWithFeedback[]>(url, fetchOptions);

    if (result.ok) {
      setReadings(result.data);
      setState('loaded');
    } else {
      setError(result.error.message);
      setState('error');
    }
  }, [asOf, period, fetchOptions]);

  useEffect(() => {
    loadReadings();
  }, [loadReadings]);

  // Handle feedback
  const handleFeedback = useCallback(
    async (readingId: string, action: FeedbackAction): Promise<boolean> => {
      const result = await postJSON(
        `/api/readings/${readingId}/feedback`,
        { action },
        fetchOptions
      );

      if (result.ok) {
        // Update local state
        setReadings(prev =>
          prev.map(r =>
            r.id === readingId ? { ...r, feedback: action } : r
          )
        );

        if (action === 'useful') {
          success('Marcada como util');
        } else if (action === 'hidden') {
          success('Leitura ocultada');
        }
        return true;
      } else {
        showError('Nao foi possivel salvar');
        return false;
      }
    },
    [fetchOptions, success, showError]
  );

  // Filtered readings
  const filteredReadings = useMemo(() => {
    return applyFilters(readings, activeTab, showHidden);
  }, [readings, activeTab, showHidden]);

  // Counts for tabs
  const tabCounts = useMemo(() => {
    return countByTab(readings, showHidden);
  }, [readings, showHidden]);

  // Hidden count
  const hiddenCount = useMemo(() => {
    return readings.filter(r => r.feedback === 'hidden').length;
  }, [readings]);

  // Render
  if (state === 'loading') {
    return <ReadingsSkeleton />;
  }

  if (state === 'error') {
    return (
      <ErrorState
        title="Nao foi possivel carregar"
        description={error || 'Ocorreu um erro ao buscar as leituras.'}
        onRetry={loadReadings}
      />
    );
  }

  const isFiltered = activeTab !== 'all';

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="space-y-4">
        <CategoryTabs
          activeTab={activeTab}
          counts={tabCounts}
          onTabChange={setActiveTab}
        />
        <PeriodToggle
          period={period}
          onPeriodChange={setPeriod}
          showHidden={showHidden}
          onShowHiddenChange={setShowHidden}
          hiddenCount={hiddenCount}
        />
      </div>

      {/* Readings list */}
      {filteredReadings.length === 0 ? (
        <EmptyReadings isFiltered={isFiltered} />
      ) : (
        <div className="space-y-4">
          {filteredReadings.map(reading => (
            <ReadingCard
              key={reading.id}
              reading={reading}
              asOf={asOf}
              onFeedback={handleFeedback}
            />
          ))}
        </div>
      )}
    </div>
  );
}

