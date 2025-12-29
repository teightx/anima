'use client';

import type { CheckinFormData } from '../types';

interface Step2RoutineProps {
  data: CheckinFormData;
  onChange: (updates: Partial<CheckinFormData>) => void;
}

export function Step2Routine({ data, onChange }: Step2RoutineProps) {
  const id = 'routine-score';

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-base font-medium">Estrutura do dia</h3>
        <p className="text-sm text-muted-foreground">
          Como você percebe a organização do dia.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label htmlFor={id} className="text-sm text-muted-foreground">
              Organização
            </label>
            <span className="text-sm font-medium text-foreground tabular-nums min-w-[1.5rem] text-right">
              {data.routineScore}
            </span>
          </div>
          <input
            type="range"
            id={id}
            min={0}
            max={10}
            value={data.routineScore}
            onChange={e => onChange({ routineScore: Number(e.target.value) })}
            className="w-full"
            aria-valuemin={0}
            aria-valuemax={10}
            aria-valuenow={data.routineScore}
          />
          <div className="flex justify-between text-[0.6875rem] text-muted-foreground/70">
            <span>Estruturado</span>
            <span>Disperso</span>
          </div>
        </div>

        <div className="pt-4 border-t border-border/50">
          <p className="text-[0.8125rem] text-muted-foreground leading-relaxed">
            {data.routineScore <= 3 && 'Dia com estrutura definida.'}
            {data.routineScore > 3 &&
              data.routineScore <= 6 &&
              'Estrutura parcial.'}
            {data.routineScore > 6 &&
              data.routineScore <= 8 &&
              'Estrutura reduzida.'}
            {data.routineScore > 8 && 'Sem estrutura percebida.'}
          </p>
        </div>
      </div>
    </div>
  );
}
