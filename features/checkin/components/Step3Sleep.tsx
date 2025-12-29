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
  { value: 'good', label: 'Bom' },
  { value: 'excellent', label: 'Ótimo' },
];

export function Step3Sleep({ data, onChange }: Step3SleepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-base font-medium">Sono e ocorrências</h3>
        <p className="text-sm text-muted-foreground">
          Dados sobre descanso e eventos observados.
        </p>
      </div>

      <div className="space-y-5">
        {/* Sleep hours */}
        <div className="space-y-2">
          <label
            htmlFor="sleep-hours"
            className="text-sm text-muted-foreground"
          >
            Duração do sono
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
              className="w-20 px-3 py-2 text-sm border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring/40"
              aria-describedby="sleep-hours-hint"
            />
            <span className="text-sm text-muted-foreground">horas</span>
          </div>
        </div>

        {/* Sleep quality */}
        <div className="space-y-2">
          <span className="text-sm text-muted-foreground">
            Qualidade percebida
          </span>
          <div
            className="flex gap-1.5"
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
                  'flex-1 px-2.5 py-2 text-[0.8125rem] rounded-md border transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-ring/40 focus:ring-offset-2',
                  data.sleepQuality === value
                    ? 'bg-secondary text-secondary-foreground border-secondary'
                    : 'bg-background border-input hover:bg-muted/50'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Events */}
        <div className="space-y-3 pt-4 border-t border-border/50">
          <span className="text-sm text-muted-foreground">
            Ocorrências
          </span>

          <div className="space-y-2.5">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={data.hadImpulse}
                onChange={e => onChange({ hadImpulse: e.target.checked })}
                className="w-4 h-4 mt-0.5 rounded border-input text-primary focus:ring-ring/40"
              />
              <span className="text-sm text-foreground leading-snug">
                Impulso ou urgência atípica
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={data.hadCrisis}
                onChange={e => onChange({ hadCrisis: e.target.checked })}
                className="w-4 h-4 mt-0.5 rounded border-input text-primary focus:ring-ring/40"
              />
              <span className="text-sm text-foreground leading-snug">
                Episódio de instabilidade
              </span>
            </label>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <label
            htmlFor="notes"
            className="text-sm text-muted-foreground"
          >
            Observações
          </label>
          <textarea
            id="notes"
            value={data.notes}
            onChange={e => onChange({ notes: e.target.value })}
            placeholder="Contexto adicional, se relevante..."
            rows={3}
            className="w-full px-3 py-2 text-sm border border-input bg-background rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring/40"
          />
        </div>
      </div>
    </div>
  );
}
