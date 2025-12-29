'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
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
  fetchOptions?: FetchOptions;
}

export function CheckinWizard({
  date,
  onSuccess,
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
    if (step > 1) {
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

  return (
    <Card>
      <CardContent className="pt-6">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2, 3].map(s => (
            <div
              key={s}
              className={`w-2 h-2 rounded-full transition-colors ${
                s === step ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
          <span className="ml-2 text-xs text-muted-foreground">{step}/3</span>
        </div>

        {/* Step content */}
        {step === 1 && <Step1State data={data} onChange={updateData} />}
        {step === 2 && <Step2Routine data={data} onChange={updateData} />}
        {step === 3 && <Step3Sleep data={data} onChange={updateData} />}

        {/* Error message */}
        {error && (
          <div className="mt-4 p-3 text-sm text-destructive bg-destructive/10 rounded-md">
            {error}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between border-t pt-4">
        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={step === 1 || isSubmitting}
        >
          Voltar
        </Button>

        {step < 3 ? (
          <Button onClick={handleNext}>Avancar</Button>
        ) : (
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Registrando...' : 'Registrar'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
