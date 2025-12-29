'use client';

import { useRouter } from 'next/navigation';
import {
  QuietCard,
  QuietCardContent,
  MetaRow,
  MetaRowGroup,
} from '@/components/system';
import { Separator } from '@/components/ui/separator';
import type { DailyCheckIn } from '@/server/contracts';
import { formatDisplayDate } from '@/lib/appDate';

interface HistoryListProps {
  checkins: DailyCheckIn[];
}

function getSleepQualityLabel(quality: string): string {
  const labels: Record<string, string> = {
    poor: 'Ruim',
    fair: 'Regular',
    good: 'Boa',
    excellent: 'Ótima',
  };
  return labels[quality] || quality;
}

export function HistoryList({ checkins }: HistoryListProps) {
  const router = useRouter();

  if (checkins.length === 0) {
    return (
      <QuietCard>
        <p className="text-body-sm text-text-muted text-center">
          Nenhum registro encontrado no período.
        </p>
      </QuietCard>
    );
  }

  const handleClick = (date: string) => {
    router.push(`/today?asOf=${date}`);
  };

  return (
    <QuietCard padding="none">
      <QuietCardContent>
        {checkins.map((checkin, index) => (
          <div key={checkin.id}>
            {index > 0 && <Separator />}
            <button
              type="button"
              onClick={() => handleClick(checkin.date)}
              className="w-full p-4 text-left hover:bg-surface-2/50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ring"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1.5">
                  <p className="text-body-sm font-medium text-text-primary">
                    {formatDisplayDate(checkin.date)}
                  </p>
                  <MetaRowGroup>
                    <MetaRow label="Humor" value={`${checkin.moodScore}/10`} />
                    <MetaRow label="Energia" value={`${checkin.energyScore}/10`} />
                    {checkin.sleepHours && (
                      <MetaRow label="Sono" value={`${checkin.sleepHours}h`} />
                    )}
                  </MetaRowGroup>
                </div>

                <div className="text-caption text-text-muted">
                  {getSleepQualityLabel(checkin.sleepQuality)}
                </div>
              </div>
            </button>
          </div>
        ))}
      </QuietCardContent>
    </QuietCard>
  );
}
