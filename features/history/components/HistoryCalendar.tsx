'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { CheckinMap } from '../types';
import {
  getDaysInMonth,
  getMonthInfo,
  formatMonth,
  getFirstDayOfWeek,
} from '../types';
import { DayCell } from './DayCell';

interface HistoryCalendarProps {
  checkins: CheckinMap;
  asOf: string;
}

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

export function HistoryCalendar({ checkins, asOf }: HistoryCalendarProps) {
  const router = useRouter();
  const { year: initialYear, month: initialMonth } = getMonthInfo(asOf);

  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);

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

  const handleDayClick = (date: string) => {
    router.push(`/today?asOf=${date}`);
  };

  // Check if a date is today (relative to asOf)
  const isToday = (date: string) => date === asOf;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevMonth}
            aria-label="Mes anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <span className="text-sm font-medium capitalize">{monthLabel}</span>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleNextMonth}
            aria-label="Proximo mes"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {WEEKDAYS.map(day => (
            <div
              key={day}
              className="text-center text-xs text-muted-foreground py-1"
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
          {days.map(date => (
            <DayCell
              key={date}
              date={date}
              checkin={checkins[date]}
              isCurrentMonth={true}
              isToday={isToday(date)}
              onClick={() => handleDayClick(date)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
