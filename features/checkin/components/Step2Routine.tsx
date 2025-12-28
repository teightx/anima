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
        <h3 className="text-lg font-medium">Organizacao do dia</h3>
        <p className="text-sm text-muted-foreground">
          Como foi a estrutura do seu dia ate agora?
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor={id} className="text-sm font-medium text-foreground">
              Nivel de organizacao
            </label>
            <span className="text-sm font-medium text-muted-foreground tabular-nums">
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
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            aria-valuemin={0}
            aria-valuemax={10}
            aria-valuenow={data.routineScore}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Organizado</span>
            <span>Caotico</span>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            {data.routineScore <= 3 && 'Dia bem estruturado e planejado.'}
            {data.routineScore > 3 &&
              data.routineScore <= 6 &&
              'Dia com estrutura moderada.'}
            {data.routineScore > 6 &&
              data.routineScore <= 8 &&
              'Dia com pouca estrutura.'}
            {data.routineScore > 8 && 'Dia sem estrutura definida.'}
          </p>
        </div>
      </div>
    </div>
  );
}
