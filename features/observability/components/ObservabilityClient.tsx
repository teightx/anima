'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getJSON, type FetchOptions } from '@/lib/apiClient';
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
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Erro ao carregar</CardTitle>
          <CardDescription>{error || 'Erro desconhecido'}</CardDescription>
        </CardHeader>
        <div className="px-6 pb-6">
          <Button variant="outline" onClick={() => window.location.reload()}>
            Tentar novamente
          </Button>
        </div>
      </Card>
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
