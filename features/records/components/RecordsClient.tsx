'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Segmented, type SegmentedOption } from '@/components/system';
import { getJSON, type FetchOptions } from '@/lib/apiClient';
import type { DailyCheckIn } from '@/server/contracts';
import type { RecordsView, TrendsPeriod } from '../types';
import { VIEW_OPTIONS, getPeriodDays } from '../types';
import { CalendarView } from './views/CalendarView';
import { ListView } from './views/ListView';
import { TrendsView } from './views/TrendsView';

interface RecordsClientProps {
  asOf: string;
  initialView: RecordsView;
  fetchOptions?: FetchOptions;
}

export function RecordsClient({
  asOf,
  initialView,
  fetchOptions,
}: RecordsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [view, setView] = useState<RecordsView>(initialView);
  const [trendsPeriod, setTrendsPeriod] = useState<TrendsPeriod>('30');
  const [checkins, setCheckins] = useState<DailyCheckIn[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Calcula range de datas baseado na view e período
  const getDateRange = useCallback(() => {
    const endDate = asOf;
    const startDate = new Date(asOf);
    
    if (view === 'trends') {
      startDate.setDate(startDate.getDate() - getPeriodDays(trendsPeriod) + 1);
    } else {
      // Para calendário e lista, buscar 60 dias
      startDate.setDate(startDate.getDate() - 59);
    }
    
    return {
      start: startDate.toISOString().split('T')[0],
      end: endDate,
    };
  }, [asOf, view, trendsPeriod]);

  // Carregar dados
  const loadCheckins = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const { start, end } = getDateRange();
    const url = `/api/checkins?start=${start}&end=${end}`;
    
    const result = await getJSON<DailyCheckIn[]>(url, fetchOptions);

    if (result.ok) {
      setCheckins(result.data);
    } else {
      setError(result.error.message);
    }

    setIsLoading(false);
  }, [getDateRange, fetchOptions]);

  useEffect(() => {
    loadCheckins();
  }, [loadCheckins]);

  // Atualizar URL quando view muda
  const handleViewChange = (newView: RecordsView) => {
    setView(newView);
    
    const params = new URLSearchParams(searchParams.toString());
    params.set('view', newView);
    
    router.push(`/records?${params.toString()}`, { scroll: false });
  };

  // Navegar para um dia específico
  const handleDayClick = (date: string) => {
    const params = new URLSearchParams();
    params.set('asOf', date);
    router.push(`/today?${params.toString()}`);
  };

  // Options para o Segmented
  const viewOptions: SegmentedOption<RecordsView>[] = VIEW_OPTIONS.map(opt => ({
    value: opt.value,
    label: opt.label,
  }));

  return (
    <div className="page-stack">
      {/* View Switcher - Fixo, nunca se move */}
      <div className="shrink-0">
        <Segmented
          options={viewOptions}
          value={view}
          onChange={handleViewChange}
          aria-label="Modo de visualização"
        />
      </div>

      {/* View Content */}
      {view === 'calendar' && (
        <CalendarView
          checkins={checkins}
          asOf={asOf}
          isLoading={isLoading}
          error={error}
          onDayClick={handleDayClick}
          onRetry={loadCheckins}
        />
      )}

      {view === 'list' && (
        <ListView
          checkins={checkins}
          asOf={asOf}
          isLoading={isLoading}
          error={error}
          onDayClick={handleDayClick}
          onRetry={loadCheckins}
        />
      )}

      {view === 'trends' && (
        <TrendsView
          checkins={checkins}
          period={trendsPeriod}
          onPeriodChange={setTrendsPeriod}
          isLoading={isLoading}
          error={error}
          onRetry={loadCheckins}
        />
      )}
    </div>
  );
}

