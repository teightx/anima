'use client';

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
} from '@/components/system';
import type { DataPoint, MetricConfig } from '../types';

interface MetricChartProps {
  config: MetricConfig;
  data: DataPoint[];
}

interface CustomTooltipPayload {
  value?: number | null;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: CustomTooltipPayload[];
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

export function MetricChart({ config, data }: MetricChartProps) {
  const hasData = data.some(d => d.value !== null);

  const title = config.unit ? `${config.title} (${config.unit})` : config.title;

  if (!hasData) {
    return (
      <QuietCard>
        <SectionHeader title={title} size="small" className="mb-2" />
        <QuietCardContent>
          <div className="h-28 flex items-center justify-center text-body-sm text-text-muted">
            Sem registros neste período
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
