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
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-body-sm text-text-muted">
          {label}
        </label>
        <span className="text-body-sm font-medium text-text-primary tabular-nums min-w-[1.5rem] text-right">
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
        className="w-full"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
      />
      {(lowLabel || highLabel) && (
        <div className="flex justify-between text-overline text-text-muted/70 normal-case tracking-normal">
          <span>{lowLabel}</span>
          <span>{highLabel}</span>
        </div>
      )}
    </div>
  );
}

/**
 * Step1State — Núcleo do registro
 * 
 * Campos: Humor, Energia, Tensão
 * Linguagem neutra e descritiva
 */
export function Step1State({ data, onChange }: Step1StateProps) {
  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h3 className="text-h4">Estado percebido</h3>
        <p className="text-body-sm text-text-muted">
          Como você percebe este momento.
        </p>
      </div>

      <div className="space-y-4">
        <SliderField
          label="Humor"
          value={data.moodScore}
          onChange={value => onChange({ moodScore: value })}
          min={1}
          max={10}
          lowLabel="Baixo"
          highLabel="Alto"
        />

        <SliderField
          label="Energia"
          value={data.energyScore}
          onChange={value => onChange({ energyScore: value })}
          min={1}
          max={10}
          lowLabel="Baixa"
          highLabel="Alta"
        />

        <SliderField
          label="Tensão"
          value={data.anxietyLevel}
          onChange={value => onChange({ anxietyLevel: value })}
          min={0}
          max={10}
          lowLabel="Ausente"
          highLabel="Presente"
        />
      </div>
    </div>
  );
}
