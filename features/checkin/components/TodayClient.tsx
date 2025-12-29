'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  QuietCard,
  QuietCardContent,
  QuietCardHeader,
  QuietCardTitle,
  SectionHeader,
  InlineNote,
} from '@/components/system';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { getJSON, type FetchOptions } from '@/lib/apiClient';
import { ErrorState } from '@/components/feedback';
import { formatDisplayDate } from '@/lib/appDate';
import type { DailyCheckIn } from '@/server/contracts';
import { CheckinWizard } from './CheckinWizard';
import { CheckinSummary } from './CheckinSummary';
import { ContextCard } from './ContextCard';

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

  const displayDate = formatDisplayDate(date);
  const recordsUrl = `/history?asOf=${asOf}&view=calendar`;

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

  const handleCancelWizard = () => {
    if (checkin) {
      setState('has-data');
    } else {
      setState('empty');
    }
  };

  // Loading state
  if (state === 'loading') {
    return (
      <div className="page-stack">
        {/* Registro skeleton */}
        <QuietCard loading>
          <QuietCardHeader>
            <Skeleton className="h-5 w-32" />
          </QuietCardHeader>
          <QuietCardContent className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </QuietCardContent>
        </QuietCard>

        {/* Contexto skeleton */}
        <QuietCard loading>
          <QuietCardHeader>
            <Skeleton className="h-5 w-28" />
          </QuietCardHeader>
          <QuietCardContent>
            <Skeleton className="h-20 w-full" />
          </QuietCardContent>
        </QuietCard>
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
      <div className="page-stack">
        {/* Empty registro card */}
        <QuietCard>
          <QuietCardContent className="py-8 text-center">
            <QuietCardTitle className="text-text-primary">
              Sem registro para esta data
            </QuietCardTitle>
            <p className="mt-2 text-body-sm text-text-muted max-w-sm mx-auto">
              Se quiser, faça um registro rápido. Você também pode apenas
              consultar os Registros.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button onClick={handleStartWizard}>Registrar agora</Button>
              <Button variant="ghost" asChild>
                <Link href={recordsUrl}>Ver Registros</Link>
              </Button>
            </div>
          </QuietCardContent>
        </QuietCard>

        {/* Contexto card (always available) */}
        <ContextCard date={date} fetchOptions={fetchOptions} />
      </div>
    );
  }

  // Wizard state
  if (state === 'wizard') {
    return (
      <div className="page-stack">
        <SectionHeader
          title="Registro do dia"
          subtitle={displayDate}
          size="small"
        />
        <CheckinWizard
          date={date}
          onSuccess={handleWizardSuccess}
          onCancel={handleCancelWizard}
          fetchOptions={fetchOptions}
        />
      </div>
    );
  }

  // Has data state
  if (state === 'has-data' && checkin) {
    return (
      <div className="page-stack">
        {/* Registro do dia */}
        <CheckinSummary
          checkin={checkin}
          onEdit={handleStartWizard}
        />

        {/* Contexto do dia */}
        <ContextCard date={date} fetchOptions={fetchOptions} />
      </div>
    );
  }

  return null;
}
