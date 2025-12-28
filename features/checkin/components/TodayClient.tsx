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
import { getJSON } from '@/lib/apiClient';
import { formatDisplayDate, getRelativeDay } from '@/lib/appDate';
import type { DailyCheckIn } from '@/server/contracts';
import { CheckinWizard } from './CheckinWizard';
import { CheckinSummary } from './CheckinSummary';
import { JournalSection } from '@/features/journal';

type PageState = 'loading' | 'empty' | 'has-data' | 'wizard' | 'error';

interface TodayClientProps {
  date: string;
  asOf: string;
}

export function TodayClient({ date, asOf }: TodayClientProps) {
  const [state, setState] = useState<PageState>('loading');
  const [checkin, setCheckin] = useState<DailyCheckIn | null>(null);
  const [error, setError] = useState<string | null>(null);

  const dateLabel = getRelativeDay(date, asOf);
  const displayDate = formatDisplayDate(date);

  useEffect(() => {
    async function loadCheckin() {
      setState('loading');
      setError(null);

      const result = await getJSON<DailyCheckIn>(`/api/checkins/${date}`);

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
  }, [date]);

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

  // Empty state (no check-in for this date)
  if (state === 'empty') {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Sem registro</CardTitle>
                <CardDescription className="mt-1">
                  {displayDate}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <div className="px-6 pb-6">
            <p className="text-sm text-muted-foreground mb-4">
              Nenhum check-in registrado para este dia.
            </p>
            <Button onClick={handleStartWizard}>Registrar agora</Button>
          </div>
        </Card>
      </div>
    );
  }

  // Wizard state
  if (state === 'wizard') {
    return (
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          Registrando: {displayDate}
        </div>
        <CheckinWizard date={date} onSuccess={handleWizardSuccess} />
      </div>
    );
  }

  // Has data state
  if (state === 'has-data' && checkin) {
    return (
      <div className="space-y-6">
        <CheckinSummary checkin={checkin} dateLabel={dateLabel} />
        <JournalSection date={date} />
      </div>
    );
  }

  return null;
}
