'use client';

import { cn } from '@/lib/utils';
import type { DailyCheckIn } from '@/server/contracts';

interface DayCellProps {
  date: string;
  checkin?: DailyCheckIn;
  isCurrentMonth: boolean;
  isToday: boolean;
  onClick: () => void;
}

export function DayCell({
  date,
  checkin,
  isCurrentMonth,
  isToday,
  onClick,
}: DayCellProps) {
  const day = parseInt(date.split('-')[2], 10);
  const hasCheckin = !!checkin;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'relative flex flex-col items-center justify-center p-2 rounded-md transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        isCurrentMonth
          ? 'text-foreground hover:bg-muted'
          : 'text-muted-foreground/50',
        isToday && 'ring-1 ring-primary/30',
        hasCheckin && isCurrentMonth && 'cursor-pointer',
        !hasCheckin && isCurrentMonth && 'cursor-pointer hover:bg-muted/50'
      )}
      aria-label={`${date}${hasCheckin ? ', com registro' : ', sem registro'}`}
    >
      <span className="text-sm tabular-nums">{day}</span>

      {/* Indicator dot for days with check-in */}
      {hasCheckin && isCurrentMonth && (
        <span className="absolute bottom-1 w-1 h-1 rounded-full bg-primary" />
      )}
    </button>
  );
}
