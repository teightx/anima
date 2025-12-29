'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { getJSON, type FetchOptions } from '@/lib/apiClient';
import { ErrorState, EmptyState } from '@/components/feedback';
import { formatDisplayDate, getRelativeDay } from '@/lib/appDate';
import type { DailyCheckIn } from '@/server/contracts';
import { CheckinWizard } from './CheckinWizard';
import { CheckinSummary } from './CheckinSummary';
import { JournalSection } from '@/features/journal';

type PageState = 'loading' | 'empty' | 'has-data' | 'wizard' | 'error';

interface TodayClientProps {
  date: string;
  asOf: string;
  fetchOptions?: FetchOptions;
}

export function TodayClient({ date, asOf, fetchOptions }: TodayClientProps) {
  const [state, setState] = useState<PageState>('loading');
  const [checkin, setCheckin] = useState<DailyCheckIn | null>(null);
  const [error, setError] = useState<string | null>(null);

  const dateLabel = getRelativeDay(date, asOf);
  const displayDate = formatDisplayDate(date);

  useEffect(() => {
    async function loadCheckin() {
      setState('loading');
      setError(null);

      const result = await getJSON<DailyCheckIn>(
        `/api/checkins/${date}`,
        fetchOptions
      );

      if (result.ok) {
        setCheckin(result.data);
        setState('has-data');
      } else if (result.error.code === 'NOT_FOUND') {
        setCheckin(null);
        setState('empty');
      } else {
        setError(result.error.message);
        setState('error');
      }
    }

    loadCheckin();
  }, [date, fetchOptions]);

  const handleStartWizard = () => {
    setState('wizard');
  };

  const handleWizardSuccess = (newCheckin: DailyCheckIn) => {
    setCheckin(newCheckin);
    setState('has-data');
  };

  // Loading state
  if (state === 'loading') {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-48 mt-2" />
          </CardHeader>
        </Card>
        <Card className="p-6">
          <div className="space-y-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-4 w-32" />
          </div>
        </Card>
      </div>
    );
  }

  // Error state
  if (state === 'error') {
    return (
      <ErrorState
        title="Não foi possível carregar"
        description={error || 'Ocorreu um erro ao buscar os dados.'}
        onRetry={() => window.location.reload()}
      />
    );
  }

  // Empty state (no check-in for this date)
  if (state === 'empty') {
    return (
      <div className="space-y-4">
        <EmptyState
          title="Sem registro"
          description={`Nenhum registro para ${displayDate}.`}
          action={{
            label: 'Registrar',
            onClick: handleStartWizard,
          }}
        />
      </div>
    );
  }

  // Wizard state
  if (state === 'wizard') {
    return (
      <div className="space-y-4">
        <div className="text-[0.8125rem] text-muted-foreground">
          Registrando: {displayDate}
        </div>
        <CheckinWizard
          date={date}
          onSuccess={handleWizardSuccess}
          fetchOptions={fetchOptions}
        />
      </div>
    );
  }

  // Has data state
  if (state === 'has-data' && checkin) {
    return (
      <div className="space-y-6">
        <CheckinSummary checkin={checkin} dateLabel={dateLabel} />
        <JournalSection date={date} fetchOptions={fetchOptions} />
      </div>
    );
  }

  return null;
}
