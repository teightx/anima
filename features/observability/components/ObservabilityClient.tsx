'use client';

import { useState, useEffect, useMemo } from 'react';
import { getJSON, type FetchOptions } from '@/lib/apiClient';
import { ErrorState, EmptyState } from '@/components/feedback';
import type { DailyCheckIn } from '@/server/contracts';
import { TimeRangeToggle } from './TimeRangeToggle';
import { MetricChart } from './MetricChart';
import { ObservabilitySkeleton } from './ObservabilitySkeleton';
import {
  type TimeRange,
  type DateRange,
  METRIC_CONFIGS,
  buildWeeklyRange,
  buildMonthlyRange,
  mapCheckinsToSeries,
} from '../types';

type PageState = 'loading' | 'loaded' | 'error';

interface ObservabilityClientProps {
  asOf: string;
  fetchOptions?: FetchOptions;
}

export function ObservabilityClient({
  asOf,
  fetchOptions,
}: ObservabilityClientProps) {
  const [state, setState] = useState<PageState>('loading');
  const [checkins, setCheckins] = useState<DailyCheckIn[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<TimeRange>('week');

  const range: DateRange = useMemo(() => {
    return timeRange === 'week'
      ? buildWeeklyRange(asOf)
      : buildMonthlyRange(asOf);
  }, [asOf, timeRange]);

  useEffect(() => {
    async function loadCheckins() {
      setState('loading');
      setError(null);

      const url = `/api/checkins?start=${range.start}&end=${range.end}`;
      const result = await getJSON<DailyCheckIn[]>(url, fetchOptions);

      if (result.ok) {
        setCheckins(result.data);
        setState('loaded');
      } else {
        setError(result.error.message);
        setState('error');
      }
    }

    loadCheckins();
  }, [range, fetchOptions]);

  if (state === 'loading') {
    return <ObservabilitySkeleton />;
  }

  if (state === 'error') {
    return (
      <ErrorState
        title="Não foi possível carregar"
        description={error || 'Ocorreu um erro ao buscar os dados.'}
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (state === 'loaded' && checkins.length === 0) {
    return (
      <div className="space-y-4">
        <TimeRangeToggle value={timeRange} onChange={setTimeRange} />
        <EmptyState
          title="Sem registros neste período"
          description="Os dados aparecerão aqui conforme você registrar."
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <TimeRangeToggle value={timeRange} onChange={setTimeRange} />

      {METRIC_CONFIGS.map(config => (
        <MetricChart
          key={config.key}
          config={config}
          data={mapCheckinsToSeries(checkins, range, config.key)}
        />
      ))}
    </div>
  );
}
