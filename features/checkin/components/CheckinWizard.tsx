'use client';

import { useState } from 'react';
import {
  QuietCard,
  QuietCardContent,
  QuietCardFooter,
  InlineNote,
} from '@/components/system';
import { Button } from '@/components/ui/button';
import { postJSON, type FetchOptions } from '@/lib/apiClient';
import type { DailyCheckIn } from '@/server/contracts';
import {
  type CheckinFormData,
  type WizardStep,
  DEFAULT_FORM_DATA,
  formDataToPayload,
} from '../types';
import { Step1State } from './Step1State';
import { Step2Routine } from './Step2Routine';
import { Step3Sleep } from './Step3Sleep';

interface CheckinWizardProps {
  date: string;
  onSuccess: (checkin: DailyCheckIn) => void;
  onCancel?: () => void;
  fetchOptions?: FetchOptions;
}

/**
 * CheckinWizard — Registro rápido em 3 passos
 * 
 * Estrutura:
 * 1. Núcleo: Humor, Energia, Tensão
 * 2. Estrutura: Organização do dia
 * 3. Sono: Duração, qualidade, ocorrências
 * 
 * Regras:
 * - Cada passo cabe sem rolagem no mobile
 * - Botões sempre na mesma posição (rodapé)
 * - Progress discreto
 * - Sem mensagens emocionais
 */
export function CheckinWizard({
  date,
  onSuccess,
  onCancel,
  fetchOptions,
}: CheckinWizardProps) {
  const [step, setStep] = useState<WizardStep>(1);
  const [data, setData] = useState<CheckinFormData>(DEFAULT_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateData = (updates: Partial<CheckinFormData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const handleBack = () => {
    if (step === 1 && onCancel) {
      onCancel();
    } else if (step > 1) {
      setStep((step - 1) as WizardStep);
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep((step + 1) as WizardStep);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    const payload = formDataToPayload(data);
    const result = await postJSON<DailyCheckIn>(
      `/api/checkins/${date}`,
      payload,
      fetchOptions
    );

    setIsSubmitting(false);

    if (result.ok) {
      onSuccess(result.data);
    } else {
      setError(result.error.message);
    }
  };

  const stepLabels = ['Núcleo', 'Estrutura', 'Sono'];

  return (
    <QuietCard padding="none">
      <QuietCardContent className="p-5">
        {/* Step indicator - discreto */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            {[1, 2, 3].map(s => (
              <div
                key={s}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  s === step ? 'bg-primary' : s < step ? 'bg-primary/40' : 'bg-surface-2'
                }`}
              />
            ))}
          </div>
          <span className="text-caption text-text-muted">
            {step}/3 · {stepLabels[step - 1]}
          </span>
        </div>

        {/* Step content */}
        {step === 1 && <Step1State data={data} onChange={updateData} />}
        {step === 2 && <Step2Routine data={data} onChange={updateData} />}
        {step === 3 && <Step3Sleep data={data} onChange={updateData} />}

        {/* Error message */}
        {error && (
          <div className="mt-4">
            <InlineNote>{error}</InlineNote>
          </div>
        )}
      </QuietCardContent>

      <QuietCardFooter className="flex justify-between border-t border-hairline px-5 py-4">
        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={isSubmitting}
        >
          {step === 1 && onCancel ? 'Cancelar' : 'Voltar'}
        </Button>

        {step < 3 ? (
          <Button onClick={handleNext}>Avançar</Button>
        ) : (
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar registro'}
          </Button>
        )}
      </QuietCardFooter>
    </QuietCard>
  );
}
