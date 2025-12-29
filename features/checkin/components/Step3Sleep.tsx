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

/**
 * Step3Sleep — Sono e ocorrências
 * 
 * Campos: Duração, qualidade, ocorrências, observações
 * Linguagem neutra e descritiva
 */
export function Step3Sleep({ data, onChange }: Step3SleepProps) {
  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h3 className="text-h4">Sono e ocorrências</h3>
        <p className="text-body-sm text-text-muted">
          Dados sobre descanso e eventos observados.
        </p>
      </div>

      <div className="space-y-5">
        {/* Sleep hours */}
        <div className="space-y-2">
          <label
            htmlFor="sleep-hours"
            className="text-body-sm text-text-muted"
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
              className="w-20 px-3 py-2 text-body-sm border border-hairline bg-surface rounded-lg focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-border"
              aria-describedby="sleep-hours-hint"
            />
            <span className="text-body-sm text-text-muted">horas</span>
          </div>
        </div>

        {/* Sleep quality */}
        <div className="space-y-2">
          <span className="text-body-sm text-text-muted">
            Qualidade percebida
          </span>
          <div
            className="grid grid-cols-4 gap-1.5"
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
                  'px-2 py-2 text-body-sm rounded-lg border transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-ring/40 focus:ring-offset-1',
                  data.sleepQuality === value
                    ? 'bg-surface-2 text-text-primary border-border'
                    : 'bg-surface border-hairline hover:bg-surface-2/50 text-text-muted'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Ocorrências */}
        <div className="space-y-3 pt-3 border-t border-hairline">
          <span className="text-body-sm text-text-muted">
            Ocorrências
          </span>

          <div className="space-y-2.5">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={data.hadImpulse}
                onChange={e => onChange({ hadImpulse: e.target.checked })}
                className="w-4 h-4 mt-0.5 rounded border-hairline text-primary focus:ring-ring/40"
              />
              <span className="text-body-sm text-text-primary leading-snug">
                Impulso ou urgência atípica
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={data.hadCrisis}
                onChange={e => onChange({ hadCrisis: e.target.checked })}
                className="w-4 h-4 mt-0.5 rounded border-hairline text-primary focus:ring-ring/40"
              />
              <span className="text-body-sm text-text-primary leading-snug">
                Episódio de instabilidade
              </span>
            </label>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <label
            htmlFor="notes"
            className="text-body-sm text-text-muted"
          >
            Observações
          </label>
          <textarea
            id="notes"
            value={data.notes}
            onChange={e => onChange({ notes: e.target.value })}
            placeholder="Contexto adicional, se relevante..."
            rows={2}
            className="w-full px-3 py-2.5 text-body-sm border border-hairline bg-surface rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-border placeholder:text-text-muted/60"
          />
        </div>
      </div>
    </div>
  );
}
