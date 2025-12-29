import type { DailyCheckIn } from '@/server/contracts';

// ============================================================================
// History Types
// ============================================================================

export type ViewMode = 'calendar' | 'list';

export interface DateRange {
  start: string; // YYYY-MM-DD
  end: string; // YYYY-MM-DD
}

export interface CheckinMap {
  [date: string]: DailyCheckIn;
}

/**
 * Convert array of checkins to a map by date
 */
export function checkinsToMap(checkins: DailyCheckIn[]): CheckinMap {
  const map: CheckinMap = {};
  for (const checkin of checkins) {
    map[checkin.date] = checkin;
  }
  return map;
}

/**
 * Get all days in a month as array of YYYY-MM-DD
 */
export function getDaysInMonth(year: number, month: number): string[] {
  const days: string[] = [];
  const date = new Date(year, month, 1);

  while (date.getMonth() === month) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    days.push(`${y}-${m}-${d}`);
    date.setDate(date.getDate() + 1);
  }

  return days;
}

/**
 * Get month info from date string
 */
export function getMonthInfo(dateStr: string): { year: number; month: number } {
  const date = new Date(dateStr + 'T00:00:00');
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
  };
}

/**
 * Format month for display
 */
export function formatMonth(
  year: number,
  month: number,
  locale = 'pt-BR'
): string {
  const date = new Date(year, month, 1);
  return date.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
}

/**
 * Get day of week for first day of month (0 = Sunday)
 */
export function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}
