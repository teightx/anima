// ============================================================================
// Records Types
// ============================================================================

export type RecordsView = 'calendar' | 'list' | 'trends';
export type TrendsPeriod = '7' | '30' | '90';

export interface RecordsViewOption {
  value: RecordsView;
  label: string;
}

export const VIEW_OPTIONS: RecordsViewOption[] = [
  { value: 'calendar', label: 'Calendário' },
  { value: 'list', label: 'Lista' },
  { value: 'trends', label: 'Tendências' },
];

export interface TrendsPeriodOption {
  value: TrendsPeriod;
  label: string;
  days: number;
}

export const TRENDS_PERIODS: TrendsPeriodOption[] = [
  { value: '7', label: '7 dias', days: 7 },
  { value: '30', label: '30 dias', days: 30 },
  { value: '90', label: '90 dias', days: 90 },
];

export function getPeriodDays(period: TrendsPeriod): number {
  const option = TRENDS_PERIODS.find(p => p.value === period);
  return option?.days ?? 30;
}

export function getPeriodLabel(period: TrendsPeriod): string {
  const option = TRENDS_PERIODS.find(p => p.value === period);
  return option?.label ?? '30 dias';
}

