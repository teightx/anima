'use client';

import { useState, useEffect } from 'react';
import { getJSON, type FetchOptions } from '@/lib/apiClient';
import { ErrorState, EmptyState } from '@/components/feedback';
import type { DailyCheckIn } from '@/server/contracts';
import { HistoryTabs } from './HistoryTabs';
import { HistoryCalendar } from './HistoryCalendar';
import { HistoryList } from './HistoryList';
import { HistorySkeleton } from './HistorySkeleton';
import { type ViewMode, type CheckinMap, checkinsToMap } from '../types';

type PageState = 'loading' | 'loaded' | 'error';

interface HistoryClientProps {
  asOf: string;
  startDate: string;
  endDate: string;
  fetchOptions?: FetchOptions;
}

export function HistoryClient({
  asOf,
  startDate,
  endDate,
  fetchOptions,
}: HistoryClientProps) {
  const [state, setState] = useState<PageState>('loading');
  const [checkins, setCheckins] = useState<DailyCheckIn[]>([]);
  const [checkinMap, setCheckinMap] = useState<CheckinMap>({});
  const [error, setError] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<ViewMode>('calendar');

  useEffect(() => {
    async function loadCheckins() {
      setState('loading');
      setError(null);

      const url = `/api/checkins?start=${startDate}&end=${endDate}`;
      const result = await getJSON<DailyCheckIn[]>(url, fetchOptions);

      if (result.ok) {
        const sortedCheckins = [...result.data].sort((a, b) =>
          b.date.localeCompare(a.date)
        );
        setCheckins(sortedCheckins);
        setCheckinMap(checkinsToMap(result.data));
        setState('loaded');
      } else {
        setError(result.error.message);
        setState('error');
      }
    }

    loadCheckins();
  }, [startDate, endDate, fetchOptions]);

  if (state === 'loading') {
    return <HistorySkeleton />;
  }

  if (state === 'error') {
    return (
      <ErrorState
        title="Nao foi possivel carregar"
        description={error || 'Ocorreu um erro ao buscar os dados.'}
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (state === 'loaded' && checkins.length === 0) {
    return (
      <div className="space-y-4">
        <HistoryTabs activeView={activeView} onViewChange={setActiveView} />
        <EmptyState
          title="Sem registros neste periodo"
          description="Os dados aparecerao aqui conforme voce fizer check-ins."
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <HistoryTabs activeView={activeView} onViewChange={setActiveView} />

      {activeView === 'calendar' && (
        <HistoryCalendar checkins={checkinMap} asOf={asOf} />
      )}

      {activeView === 'list' && <HistoryList checkins={checkins} />}
    </div>
  );
}
