'use client';

import { useMemo } from 'react';
import {
  QuietCard,
  QuietCardContent,
  MetaRow,
  MetaRowGroup,
} from '@/components/system';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { ErrorState, EmptyState } from '@/components/feedback';
import type { DailyCheckIn } from '@/server/contracts';
import { cn } from '@/lib/utils';

interface ListViewProps {
  checkins: DailyCheckIn[];
  asOf: string;
  isLoading: boolean;
  error: string | null;
  onDayClick: (date: string) => void;
  onRetry: () => void;
}

function formatListDate(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00');
  return date.toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

function getSleepQualityLabel(quality: string): string {
  const labels: Record<string, string> = {
    poor: 'Ruim',
    fair: 'Regular',
    good: 'Bom',
    excellent: 'Ótimo',
  };
  return labels[quality] || quality;
}

function getCompletionBadge(checkin: DailyCheckIn): { label: string; variant: 'muted' | 'secondary' } {
  const hasContext = checkin.notes && checkin.notes.length > 0;
  const hasSymptoms = checkin.symptoms && checkin.symptoms.length > 0;
  
  if (hasContext || hasSymptoms) {
    return { label: 'Completo', variant: 'secondary' };
  }
  return { label: 'Básico', variant: 'muted' };
}

export function ListView({
  checkins,
  asOf,
  isLoading,
  error,
  onDayClick,
  onRetry,
}: ListViewProps) {
  // Ordenar por data decrescente
  const sortedCheckins = useMemo(() => {
    return [...checkins].sort((a, b) => b.date.localeCompare(a.date));
  }, [checkins]);

  // Loading
  if (isLoading) {
    return (
      <QuietCard loading padding="none">
        <QuietCardContent>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i}>
              {i > 0 && <Separator />}
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-48" />
              </div>
            </div>
          ))}
        </QuietCardContent>
      </QuietCard>
    );
  }

  // Error
  if (error) {
    return (
      <ErrorState
        title="Não foi possível carregar"
        description={error}
        onRetry={onRetry}
      />
    );
  }

  // Empty
  if (sortedCheckins.length === 0) {
    return (
      <EmptyState
        title="Nenhum registro encontrado"
        description="Registre seu primeiro dia para ver o histórico aqui."
        action={{
          label: 'Registrar hoje',
          onClick: () => onDayClick(asOf),
        }}
      />
    );
  }

  return (
    <QuietCard padding="none">
      <QuietCardContent>
        {sortedCheckins.map((checkin, index) => {
          const isToday = checkin.date === asOf;
          const badge = getCompletionBadge(checkin);

          return (
            <div key={checkin.id}>
              {index > 0 && <Separator />}
              <button
                type="button"
                onClick={() => onDayClick(checkin.date)}
                className={cn(
                  'w-full p-4 text-left transition-colors',
                  'hover:bg-surface-2/50 focus-visible:outline-none focus-visible:bg-surface-2'
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          'text-body-sm font-medium capitalize',
                          isToday ? 'text-primary' : 'text-text-primary'
                        )}
                      >
                        {formatListDate(checkin.date)}
                      </span>
                      {isToday && (
                        <Badge variant="secondary" className="text-[10px]">
                          Hoje
                        </Badge>
                      )}
                    </div>
                    <MetaRowGroup>
                      <MetaRow label="Humor" value={`${checkin.moodScore}/10`} />
                      <MetaRow label="Energia" value={`${checkin.energyScore}/10`} />
                      {checkin.sleepHours && (
                        <MetaRow label="Sono" value={`${checkin.sleepHours}h`} />
                      )}
                    </MetaRowGroup>
                  </div>

                  <Badge variant={badge.variant} className="shrink-0">
                    {badge.label}
                  </Badge>
                </div>
              </button>
            </div>
          );
        })}
      </QuietCardContent>
    </QuietCard>
  );
}

