import type { DailyCheckIn } from '@/server/contracts';

// ============================================================================
// Observability Types
// ============================================================================

export type TimeRange = 'week' | 'month';

export interface DateRange {
  start: string; // YYYY-MM-DD
  end: string; // YYYY-MM-DD
}

export interface DataPoint {
  date: string;
  value: number | null;
  label: string; // formatted day (e.g., "30 dez")
}

export type MetricKey = 'mood' | 'energy' | 'sleep';

export interface MetricConfig {
  key: MetricKey;
  title: string;
  min: number;
  max: number;
  unit?: string;
  color: string;
}

export const METRIC_CONFIGS: MetricConfig[] = [
  { key: 'mood', title: 'Humor', min: 0, max: 10, color: 'hsl(210, 28%, 52%)' },
  {
    key: 'energy',
    title: 'Energia',
    min: 0,
    max: 10,
    color: 'hsl(180, 25%, 45%)',
  },
  {
    key: 'sleep',
    title: 'Sono',
    min: 0,
    max: 12,
    unit: 'h',
    color: 'hsl(220, 25%, 55%)',
  },
];

// ============================================================================
// Date Range Helpers
// ============================================================================

/**
 * Build a weekly range ending on asOf
 */
export function buildWeeklyRange(asOf: string): DateRange {
  const end = new Date(asOf + 'T00:00:00');
  const start = new Date(end);
  start.setDate(start.getDate() - 6);

  return {
    start: toISODate(start),
    end: toISODate(end),
  };
}

/**
 * Build a monthly range ending on asOf
 */
export function buildMonthlyRange(asOf: string): DateRange {
  const end = new Date(asOf + 'T00:00:00');
  const start = new Date(end);
  start.setDate(start.getDate() - 29);

  return {
    start: toISODate(start),
    end: toISODate(end),
  };
}

function toISODate(date: Date): string {
  return date.toISOString().split('T')[0];
}

// ============================================================================
// Data Mapping
// ============================================================================

/**
 * Generate all dates in range
 */
export function getDatesInRange(range: DateRange): string[] {
  const dates: string[] = [];
  const current = new Date(range.start + 'T00:00:00');
  const end = new Date(range.end + 'T00:00:00');

  while (current <= end) {
    dates.push(toISODate(current));
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

/**
 * Format date for chart label
 */
export function formatChartLabel(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  const day = date.getDate();
  const month = date.toLocaleDateString('pt-BR', { month: 'short' });
  return `${day} ${month.replace('.', '')}`;
}

/**
 * Extract metric value from checkin
 */
function getMetricValue(
  checkin: DailyCheckIn | undefined,
  metric: MetricKey
): number | null {
  if (!checkin) return null;

  switch (metric) {
    case 'mood':
      return checkin.moodScore ?? null;
    case 'energy':
      return checkin.energyScore ?? null;
    case 'sleep':
      return checkin.sleepHours ?? null;
    default:
      return null;
  }
}

/**
 * Map checkins to a data series for a specific metric
 */
export function mapCheckinsToSeries(
  checkins: DailyCheckIn[],
  range: DateRange,
  metric: MetricKey
): DataPoint[] {
  const checkinMap = new Map<string, DailyCheckIn>();
  for (const c of checkins) {
    checkinMap.set(c.date, c);
  }

  const dates = getDatesInRange(range);

  return dates.map(date => ({
    date,
    value: getMetricValue(checkinMap.get(date), metric),
    label: formatChartLabel(date),
  }));
}
