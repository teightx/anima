'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
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
    excellent: 'Otima',
  };
  return labels[quality] || quality;
}

export function HistoryList({ checkins }: HistoryListProps) {
  const router = useRouter();

  if (checkins.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-sm text-muted-foreground text-center">
          Nenhum registro encontrado no periodo.
        </p>
      </Card>
    );
  }

  const handleClick = (date: string) => {
    router.push(`/today?asOf=${date}`);
  };

  return (
    <Card>
      <CardContent className="p-0">
        {checkins.map((checkin, index) => (
          <div key={checkin.id}>
            {index > 0 && <Separator />}
            <button
              type="button"
              onClick={() => handleClick(checkin.date)}
              className="w-full p-4 text-left hover:bg-muted/50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ring"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    {formatDisplayDate(checkin.date)}
                  </p>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>Humor: {checkin.moodScore}/10</span>
                    <span>Energia: {checkin.energyScore}/10</span>
                    {checkin.sleepHours && (
                      <span>Sono: {checkin.sleepHours}h</span>
                    )}
                  </div>
                </div>

                <div className="text-right text-xs text-muted-foreground">
                  {getSleepQualityLabel(checkin.sleepQuality)}
                </div>
              </div>
            </button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
