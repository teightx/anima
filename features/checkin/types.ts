import type { SleepQuality, SymptomEntry } from '@/server/contracts';

// ============================================================================
// Check-in Wizard Types
// ============================================================================

export interface CheckinFormData {
  // Step 1: State
  moodScore: number;
  energyScore: number;
  anxietyLevel: number;

  // Step 2: Routine
  routineScore: number; // 0 = organized, 10 = chaotic

  // Step 3: Sleep & Events
  sleepHours: number;
  sleepQuality: SleepQuality;
  hadImpulse: boolean;
  hadCrisis: boolean;
  notes: string;
}

export const DEFAULT_FORM_DATA: CheckinFormData = {
  moodScore: 5,
  energyScore: 5,
  anxietyLevel: 3,
  routineScore: 5,
  sleepHours: 7,
  sleepQuality: 'fair',
  hadImpulse: false,
  hadCrisis: false,
  notes: '',
};

export type WizardStep = 1 | 2 | 3;

export interface WizardState {
  step: WizardStep;
  data: CheckinFormData;
  isSubmitting: boolean;
  error: string | null;
}

// Map form data to API payload
export function formDataToPayload(data: CheckinFormData) {
  const symptoms: SymptomEntry[] = [];

  // Add tension as symptom if above threshold
  if (data.anxietyLevel > 5) {
    symptoms.push({
      symptomId: 's-tension',
      name: 'Tensão',
      severity: data.anxietyLevel > 7 ? 'high' : 'medium',
    });
  }

  // Add impulse event as symptom
  if (data.hadImpulse) {
    symptoms.push({
      symptomId: 's-impulse',
      name: 'Impulso',
      severity: 'medium',
    });
  }

  // Add crisis event as symptom
  if (data.hadCrisis) {
    symptoms.push({
      symptomId: 's-crisis',
      name: 'Crise',
      severity: 'high',
    });
  }

  return {
    moodScore: data.moodScore,
    energyScore: data.energyScore,
    sleepQuality: data.sleepQuality,
    sleepHours: data.sleepHours,
    symptoms,
    notes: data.notes || undefined,
    activities: data.routineScore <= 3 ? ['organized_day'] : undefined,
  };
}
