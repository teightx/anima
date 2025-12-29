'use client';

import { useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import {
  QuietCard,
  QuietCardContent,
  SectionHeader,
  Segmented,
  InlineNote,
  MetaRow,
  MetaRowGroup,
  type SegmentedOption,
} from '@/components/system';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorState, EmptyState } from '@/components/feedback';
import type { DailyCheckIn } from '@/server/contracts';
import type { TrendsPeriod } from '../../types';
import { TRENDS_PERIODS, getPeriodLabel } from '../../types';

interface TrendsViewProps {
  checkins: DailyCheckIn[];
  period: TrendsPeriod;
  onPeriodChange: (period: TrendsPeriod) => void;
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

interface ChartDataPoint {
  date: string;
  label: string;
  value: number | null;
}

interface MetricConfig {
  key: keyof Pick<DailyCheckIn, 'moodScore' | 'energyScore' | 'sleepHours'>;
  title: string;
  color: string;
  min: number;
  max: number;
  unit?: string;
}

const MAIN_METRICS: MetricConfig[] = [
  { key: 'sleepHours', title: 'Sono', color: 'hsl(var(--primary))', min: 0, max: 12, unit: 'h' },
  { key: 'energyScore', title: 'Energia', color: 'hsl(200, 22%, 50%)', min: 0, max: 10 },
  { key: 'moodScore', title: 'Humor', color: 'hsl(210, 20%, 55%)', min: 0, max: 10 },
];

function formatChartDate(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00');
  return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' });
}

function prepareChartData(
  checkins: DailyCheckIn[],
  metricKey: keyof DailyCheckIn
): ChartDataPoint[] {
  return checkins
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(c => ({
      date: c.date,
      label: formatChartDate(c.date),
      value: c[metricKey] as number | null,
    }));
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value?: number | null }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  const value = payload[0].value;
  if (value === null || value === undefined) return null;

  return (
    <div className="bg-surface border border-hairline rounded-lg px-3 py-2 shadow-[var(--shadow-soft)]">
      <p className="text-overline text-text-muted uppercase tracking-wider">
        {label}
      </p>
      <p className="text-body-sm font-medium tabular-nums text-text-primary">
        {value}
      </p>
    </div>
  );
}

function MetricChart({ config, data }: { config: MetricConfig; data: ChartDataPoint[] }) {
  const hasData = data.some(d => d.value !== null);
  const title = config.unit ? `${config.title} (${config.unit})` : config.title;

  if (!hasData) {
    return (
      <QuietCard>
        <SectionHeader title={title} size="small" className="mb-2" />
        <QuietCardContent>
          <div className="h-28 flex items-center justify-center text-body-sm text-text-muted">
            Sem dados neste período
          </div>
        </QuietCardContent>
      </QuietCard>
    );
  }

  return (
    <QuietCard>
      <SectionHeader title={title} size="small" className="mb-2" />
      <QuietCardContent>
        <div className="h-28">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 6, right: 6, bottom: 6, left: -20 }}
            >
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 9, fill: 'hsl(var(--text-muted))' }}
                interval="preserveStartEnd"
                tickMargin={6}
              />
              <YAxis
                domain={[config.min, config.max]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 9, fill: 'hsl(var(--text-muted))' }}
                width={28}
                tickMargin={4}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke={config.color}
                strokeWidth={1.25}
                dot={{ r: 2, fill: config.color, strokeWidth: 0 }}
                activeDot={{ r: 3.5, fill: config.color, strokeWidth: 0 }}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </QuietCardContent>
    </QuietCard>
  );
}

export function TrendsView({
  checkins,
  period,
  onPeriodChange,
  isLoading,
  error,
  onRetry,
}: TrendsViewProps) {
  const periodOptions: SegmentedOption<TrendsPeriod>[] = TRENDS_PERIODS.map(p => ({
    value: p.value,
    label: p.label,
  }));

  // Preparar dados para cada métrica
  const chartDataMap = useMemo(() => {
    const map: Record<string, ChartDataPoint[]> = {};
    MAIN_METRICS.forEach(metric => {
      map[metric.key] = prepareChartData(checkins, metric.key);
    });
    return map;
  }, [checkins]);

  // Loading
  if (isLoading) {
    return (
      <div className="page-stack">
        <div className="flex justify-end">
          <Skeleton className="h-9 w-40" />
        </div>
        {MAIN_METRICS.map(metric => (
          <QuietCard key={metric.key} loading>
            <SectionHeader title={metric.title} size="small" className="mb-2" />
            <QuietCardContent>
              <Skeleton className="h-28 w-full" />
            </QuietCardContent>
          </QuietCard>
        ))}
      </div>
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

  // Empty - dados insuficientes
  if (checkins.length < 2) {
    return (
      <div className="page-stack">
        <div className="flex justify-end">
          <Segmented
            options={periodOptions}
            value={period}
            onChange={onPeriodChange}
            size="small"
            aria-label="Período"
          />
        </div>
        <EmptyState
          title="Dados insuficientes para tendências"
          description="Registre alguns dias para visualizar variações ao longo do tempo."
        />
      </div>
    );
  }

  return (
    <div className="page-stack">
      {/* Period selector + meta */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <MetaRowGroup>
          <MetaRow label="Período" value={getPeriodLabel(period)} />
          <MetaRow label="Registros" value={`${checkins.length} pontos`} />
        </MetaRowGroup>
        <Segmented
          options={periodOptions}
          value={period}
          onChange={onPeriodChange}
          size="small"
          aria-label="Período"
        />
      </div>

      {/* SectionHeader com texto descritivo integrado */}
      <SectionHeader
        title="Tendências"
        subtitle="Visualize suas tendências ao longo do tempo"
        size="small"
      />

      {/* Main metrics */}
      {MAIN_METRICS.map(metric => (
        <MetricChart
          key={metric.key}
          config={metric}
          data={chartDataMap[metric.key]}
        />
      ))}

      {/* Disclaimer */}
      <InlineNote size="small">
        Visualizações descritivas ao longo do tempo. Não implicam causa.
      </InlineNote>
    </div>
  );
}

