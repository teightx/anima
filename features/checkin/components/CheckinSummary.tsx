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
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium tabular-nums">
          {value}/{max}
        </span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all"
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
    good: 'Boa',
    excellent: 'Otima',
  };
  return labels[quality] || quality;
}

export function CheckinSummary({ checkin, dateLabel }: CheckinSummaryProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Registro do dia
          </CardTitle>
          <Badge variant="secondary" className="text-xs">
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

        <Separator />

        {/* Sleep info */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Sono</span>
            <p className="font-medium">
              {checkin.sleepHours ? `${checkin.sleepHours}h` : '-'}
            </p>
          </div>
          <div>
            <span className="text-muted-foreground">Qualidade</span>
            <p className="font-medium">
              {getSleepQualityLabel(checkin.sleepQuality)}
            </p>
          </div>
        </div>

        {/* Symptoms */}
        {checkin.symptoms && checkin.symptoms.length > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">
                Sintomas registrados
              </span>
              <div className="flex flex-wrap gap-1.5">
                {checkin.symptoms.map(symptom => (
                  <Badge
                    key={symptom.symptomId}
                    variant={
                      symptom.severity === 'high' ? 'destructive' : 'secondary'
                    }
                    className="text-xs"
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
            <Separator />
            <div className="space-y-1">
              <span className="text-sm text-muted-foreground">Observacoes</span>
              <p className="text-sm">{checkin.notes}</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
