'use client';

import type { DailyCheckIn } from '@/server/contracts';
import {
  QuietCard,
  QuietCardHeader,
  QuietCardTitle,
  QuietCardContent,
  MetaRow,
  MetaRowGroup,
} from '@/components/system';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface CheckinSummaryProps {
  checkin: DailyCheckIn;
  onEdit?: () => void;
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
      <div className="flex items-center justify-between text-body-sm">
        <span className="text-text-muted">{label}</span>
        <span className="font-medium tabular-nums text-text-primary">
          {value}
        </span>
      </div>
      <div className="h-1 bg-surface-2 rounded-full overflow-hidden">
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

export function CheckinSummary({ checkin, onEdit }: CheckinSummaryProps) {
  return (
    <QuietCard>
      <QuietCardHeader className="flex flex-row items-center justify-between pb-3">
        <QuietCardTitle>Registro do dia</QuietCardTitle>
        {onEdit && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            className="text-text-muted"
          >
            Editar
          </Button>
        )}
      </QuietCardHeader>
      <QuietCardContent className="space-y-4">
        {/* Main metrics */}
        <div className="space-y-3">
          <MetricDisplay label="Humor" value={checkin.moodScore} />
          <MetricDisplay label="Energia" value={checkin.energyScore} />
        </div>

        <Separator />

        {/* Sleep info */}
        <MetaRowGroup direction="horizontal">
          <MetaRow
            label="Sono"
            value={checkin.sleepHours ? `${checkin.sleepHours}h` : '-'}
          />
          <MetaRow
            label="Qualidade"
            value={getSleepQualityLabel(checkin.sleepQuality)}
          />
        </MetaRowGroup>

        {/* Symptoms */}
        {checkin.symptoms && checkin.symptoms.length > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              <span className="text-body-sm text-text-muted">Ocorrências</span>
              <div className="flex flex-wrap gap-1.5">
                {checkin.symptoms.map(symptom => (
                  <Badge
                    key={symptom.symptomId}
                    variant={symptom.severity === 'high' ? 'destructive' : 'muted'}
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
            <div className="space-y-1.5">
              <span className="text-body-sm text-text-muted">Observações</span>
              <p className="text-body-sm leading-relaxed text-text-primary">
                {checkin.notes}
              </p>
            </div>
          </>
        )}
      </QuietCardContent>
    </QuietCard>
  );
}
