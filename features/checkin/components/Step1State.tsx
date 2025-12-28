'use client';

import type { CheckinFormData } from '../types';

interface Step1StateProps {
  data: CheckinFormData;
  onChange: (updates: Partial<CheckinFormData>) => void;
}

function SliderField({
  label,
  value,
  onChange,
  min = 0,
  max = 10,
  lowLabel,
  highLabel,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  lowLabel?: string;
  highLabel?: string;
}) {
  const id = label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
        <span className="text-sm font-medium text-muted-foreground tabular-nums">
          {value}
        </span>
      </div>
      <input
        type="range"
        id={id}
        min={min}
        max={max}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
      />
      {(lowLabel || highLabel) && (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{lowLabel}</span>
          <span>{highLabel}</span>
        </div>
      )}
    </div>
  );
}

export function Step1State({ data, onChange }: Step1StateProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-lg font-medium">Estado geral</h3>
        <p className="text-sm text-muted-foreground">
          Como voce esta se sentindo agora?
        </p>
      </div>

      <div className="space-y-6">
        <SliderField
          label="Humor"
          value={data.moodScore}
          onChange={value => onChange({ moodScore: value })}
          min={1}
          max={10}
          lowLabel="Muito baixo"
          highLabel="Muito alto"
        />

        <SliderField
          label="Energia"
          value={data.energyScore}
          onChange={value => onChange({ energyScore: value })}
          min={1}
          max={10}
          lowLabel="Sem energia"
          highLabel="Muita energia"
        />

        <SliderField
          label="Ansiedade"
          value={data.anxietyLevel}
          onChange={value => onChange({ anxietyLevel: value })}
          min={0}
          max={10}
          lowLabel="Nenhuma"
          highLabel="Intensa"
        />
      </div>
    </div>
  );
}
