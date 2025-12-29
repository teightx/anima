'use client';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
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
    <div className="bg-popover border border-border/60 rounded-md px-3 py-2 shadow-[var(--shadow-md)]">
      <p className="text-[0.6875rem] text-muted-foreground">{label}</p>
      <p className="text-sm font-medium tabular-nums">{value}</p>
    </div>
  );
}

export function MetricChart({ config, data }: MetricChartProps) {
  const hasData = data.some(d => d.value !== null);

  if (!hasData) {
    return (
      <Card variant="static">
        <CardHeader className="pb-2">
          <CardTitle className="text-[0.8125rem] font-medium text-muted-foreground">
            {config.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-28 flex items-center justify-center text-[0.8125rem] text-muted-foreground/70">
            Sem registros neste período
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="static">
      <CardHeader className="pb-2">
        <CardTitle className="text-[0.8125rem] font-medium text-muted-foreground">
          {config.title}
          {config.unit && (
            <span className="ml-1 text-[0.6875rem] font-normal text-muted-foreground/70">
              ({config.unit})
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
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
                tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }}
                interval="preserveStartEnd"
                tickMargin={6}
              />
              <YAxis
                domain={[config.min, config.max]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }}
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
      </CardContent>
    </Card>
  );
}
