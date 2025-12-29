'use client';

import type { CheckinFormData } from '../types';

interface Step2RoutineProps {
  data: CheckinFormData;
  onChange: (updates: Partial<CheckinFormData>) => void;
}

/**
 * Step2Routine — Estrutura do dia
 * 
 * Campo: Organização (estruturado → disperso)
 * Linguagem neutra e descritiva
 */
export function Step2Routine({ data, onChange }: Step2RoutineProps) {
  const id = 'routine-score';

  const getStructureLabel = (score: number): string => {
    if (score <= 3) return 'Dia com estrutura definida.';
    if (score <= 6) return 'Estrutura parcial.';
    if (score <= 8) return 'Estrutura reduzida.';
    return 'Sem estrutura percebida.';
  };

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h3 className="text-h4">Estrutura do dia</h3>
        <p className="text-body-sm text-text-muted">
          Como você percebe a organização do dia.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor={id} className="text-body-sm text-text-muted">
              Organização
            </label>
            <span className="text-body-sm font-medium text-text-primary tabular-nums min-w-[1.5rem] text-right">
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
          <div className="flex justify-between text-overline text-text-muted/70 normal-case tracking-normal">
            <span>Estruturado</span>
            <span>Disperso</span>
          </div>
        </div>

        <div className="pt-3 border-t border-hairline">
          <p className="text-body-sm text-text-muted">
            {getStructureLabel(data.routineScore)}
          </p>
        </div>
      </div>
    </div>
  );
}
