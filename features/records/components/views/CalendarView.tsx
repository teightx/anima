'use client';

import { useState, useMemo } from 'react';
import {
  QuietCard,
  QuietCardContent,
  QuietCardHeader,
} from '@/components/system';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ErrorState, EmptyState } from '@/components/feedback';
import type { DailyCheckIn } from '@/server/contracts';
import { cn } from '@/lib/utils';

interface CalendarViewProps {
  checkins: DailyCheckIn[];
  asOf: string;
  isLoading: boolean;
  error: string | null;
  onDayClick: (date: string) => void;
  onRetry: () => void;
}

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

function getMonthInfo(dateStr: string) {
  const date = new Date(dateStr + 'T12:00:00');
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
  };
}

function getDaysInMonth(year: number, month: number): string[] {
  const days: string[] = [];
  const daysCount = new Date(year, month + 1, 0).getDate();
  
  for (let day = 1; day <= daysCount; day++) {
    const date = new Date(year, month, day);
    days.push(date.toISOString().split('T')[0]);
  }
  
  return days;
}

function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function formatMonth(year: number, month: number): string {
  const date = new Date(year, month);
  return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
}

export function CalendarView({
  checkins,
  asOf,
  isLoading,
  error,
  onDayClick,
  onRetry,
}: CalendarViewProps) {
  const { year: initialYear, month: initialMonth } = getMonthInfo(asOf);
  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);

  const checkinMap = useMemo(() => {
    const map: Record<string, DailyCheckIn> = {};
    checkins.forEach(c => {
      map[c.date] = c;
    });
    return map;
  }, [checkins]);

  const days = getDaysInMonth(year, month);
  const firstDayOffset = getFirstDayOfWeek(year, month);
  const monthLabel = formatMonth(year, month);

  const handlePrevMonth = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  };

  // Loading
  if (isLoading) {
    return (
      <QuietCard loading>
        <QuietCardHeader className="p-5 pb-2">
          <Skeleton className="h-5 w-32 mx-auto" />
        </QuietCardHeader>
        <QuietCardContent className="px-5 pb-5">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {WEEKDAYS.map(day => (
              <Skeleton key={day} className="h-6 w-full" />
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 35 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded" />
            ))}
          </div>
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

  // Verificar se há registros no mês atual
  const hasRecordsInMonth = days.some(date => checkinMap[date]);

  return (
    <QuietCard padding="none">
      <QuietCardHeader className="p-5 pb-2">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevMonth}
            aria-label="Mês anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <span className="text-body-sm font-medium capitalize">{monthLabel}</span>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleNextMonth}
            aria-label="Próximo mês"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </QuietCardHeader>

      <QuietCardContent className="px-5 pb-5">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {WEEKDAYS.map(day => (
            <div
              key={day}
              className="text-center text-caption text-text-muted py-1"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for offset */}
          {Array.from({ length: firstDayOffset }).map((_, i) => (
            <div key={`empty-${i}`} className="p-2" />
          ))}

          {/* Day cells */}
          {days.map(date => {
            const hasCheckin = !!checkinMap[date];
            const isToday = date === asOf;
            const dayNum = new Date(date + 'T12:00:00').getDate();

            return (
              <button
                key={date}
                type="button"
                onClick={() => onDayClick(date)}
                className={cn(
                  'relative p-2 text-body-sm rounded-md transition-colors',
                  'hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40',
                  isToday && 'font-medium text-primary',
                  !isToday && hasCheckin && 'text-text-primary',
                  !isToday && !hasCheckin && 'text-text-muted'
                )}
              >
                {dayNum}
                {/* Indicador de registro */}
                {hasCheckin && (
                  <span
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary/50"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Empty state for month */}
        {!hasRecordsInMonth && (
          <div className="mt-4 pt-4 border-t border-hairline text-center">
            <p className="text-body-sm text-text-muted">
              Nenhum registro neste mês.
            </p>
          </div>
        )}
      </QuietCardContent>
    </QuietCard>
  );
}

