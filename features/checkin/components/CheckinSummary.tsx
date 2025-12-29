'use client';

import type { DailyCheckIn } from '@/server/contracts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface CheckinSummaryProps {
  checkin: DailyCheckIn;
  dateLabel: string;
}

function MetricDisplay({
  label,
  value,
  max = 10,
}: {
  label: string;
  value: number;
  max?: number;
}) {
  const percentage = (value / max) * 100;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-[0.8125rem]">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium tabular-nums text-foreground">
          {value}
        </span>
      </div>
      <div className="h-1 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary/50 rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
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

export function CheckinSummary({ checkin, dateLabel }: CheckinSummaryProps) {
  return (
    <Card variant="static">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[0.9375rem] font-medium">
            Registro do dia
          </CardTitle>
          <Badge variant="muted" className="text-[0.6875rem]">
            {dateLabel}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main metrics */}
        <div className="space-y-3">
          <MetricDisplay label="Humor" value={checkin.moodScore} />
          <MetricDisplay label="Energia" value={checkin.energyScore} />
        </div>

        <Separator className="bg-border/40" />

        {/* Sleep info */}
        <div className="grid grid-cols-2 gap-4 text-[0.8125rem]">
          <div className="space-y-0.5">
            <span className="text-muted-foreground">Sono</span>
            <p className="font-medium">
              {checkin.sleepHours ? `${checkin.sleepHours}h` : '-'}
            </p>
          </div>
          <div className="space-y-0.5">
            <span className="text-muted-foreground">Qualidade</span>
            <p className="font-medium">
              {getSleepQualityLabel(checkin.sleepQuality)}
            </p>
          </div>
        </div>

        {/* Symptoms */}
        {checkin.symptoms && checkin.symptoms.length > 0 && (
          <>
            <Separator className="bg-border/40" />
            <div className="space-y-2">
              <span className="text-[0.8125rem] text-muted-foreground">
                Ocorrências
              </span>
              <div className="flex flex-wrap gap-1.5">
                {checkin.symptoms.map(symptom => (
                  <Badge
                    key={symptom.symptomId}
                    variant={
                      symptom.severity === 'high' ? 'destructive' : 'muted'
                    }
                    className="text-[0.6875rem]"
                  >
                    {symptom.name}
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Notes */}
        {checkin.notes && (
          <>
            <Separator className="bg-border/40" />
            <div className="space-y-1.5">
              <span className="text-[0.8125rem] text-muted-foreground">Observações</span>
              <p className="text-[0.8125rem] leading-relaxed">{checkin.notes}</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
