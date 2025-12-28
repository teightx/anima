'use client';

import type { SleepQuality } from '@/server/contracts';
import type { CheckinFormData } from '../types';
import { cn } from '@/lib/utils';

interface Step3SleepProps {
  data: CheckinFormData;
  onChange: (updates: Partial<CheckinFormData>) => void;
}

const SLEEP_QUALITIES: { value: SleepQuality; label: string }[] = [
  { value: 'poor', label: 'Ruim' },
  { value: 'fair', label: 'Regular' },
  { value: 'good', label: 'Boa' },
  { value: 'excellent', label: 'Otima' },
];

export function Step3Sleep({ data, onChange }: Step3SleepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-lg font-medium">Sono e eventos</h3>
        <p className="text-sm text-muted-foreground">
          Informacoes sobre seu sono e eventos relevantes.
        </p>
      </div>

      <div className="space-y-6">
        {/* Sleep hours */}
        <div className="space-y-2">
          <label
            htmlFor="sleep-hours"
            className="text-sm font-medium text-foreground"
          >
            Horas de sono
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              id="sleep-hours"
              min={0}
              max={24}
              step={0.5}
              value={data.sleepHours}
              onChange={e => onChange({ sleepHours: Number(e.target.value) })}
              className="w-24 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              aria-describedby="sleep-hours-hint"
            />
            <span className="text-sm text-muted-foreground">horas</span>
          </div>
          <p id="sleep-hours-hint" className="text-xs text-muted-foreground">
            Tempo total de sono na ultima noite
          </p>
        </div>

        {/* Sleep quality */}
        <div className="space-y-2">
          <span className="text-sm font-medium text-foreground">
            Qualidade do sono
          </span>
          <div
            className="flex gap-2"
            role="radiogroup"
            aria-label="Qualidade do sono"
          >
            {SLEEP_QUALITIES.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={data.sleepQuality === value}
                onClick={() => onChange({ sleepQuality: value })}
                className={cn(
                  'flex-1 px-3 py-2 text-sm rounded-md border transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                  data.sleepQuality === value
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background border-input hover:bg-muted'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Events */}
        <div className="space-y-3 pt-4 border-t border-border">
          <span className="text-sm font-medium text-foreground">
            Eventos relevantes
          </span>

          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={data.hadImpulse}
                onChange={e => onChange({ hadImpulse: e.target.checked })}
                className="w-4 h-4 rounded border-input text-primary focus:ring-ring"
              />
              <span className="text-sm text-foreground">
                Houve impulso ou urgencia incomum
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={data.hadCrisis}
                onChange={e => onChange({ hadCrisis: e.target.checked })}
                className="w-4 h-4 rounded border-input text-primary focus:ring-ring"
              />
              <span className="text-sm text-foreground">
                Houve momento de crise ou descontrole
              </span>
            </label>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <label
            htmlFor="notes"
            className="text-sm font-medium text-foreground"
          >
            Observacoes (opcional)
          </label>
          <textarea
            id="notes"
            value={data.notes}
            onChange={e => onChange({ notes: e.target.value })}
            placeholder="Algo relevante sobre o dia..."
            rows={3}
            className="w-full px-3 py-2 text-sm border border-input bg-background rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
    </div>
  );
}
