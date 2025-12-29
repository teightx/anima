'use client';

import { useState, useEffect, useCallback } from 'react';
import { Info } from 'lucide-react';
import { getJSON, postJSON, type FetchOptions } from '@/lib/apiClient';
import { ErrorState } from '@/components/feedback';
import type { TherapyState, DataCategory } from '../types';
import {
  getEnabledCategoriesFromRules,
  buildCategoriesFromState,
} from '../helpers';
import { TherapyStatusCard } from './TherapyStatusCard';
import { SharingRulesPanel } from './SharingRulesPanel';
import { TherapistPreview } from './TherapistPreview';
import { TherapySkeleton } from './TherapySkeleton';

// Default recipient ID for demo purposes
const DEFAULT_RECIPIENT_ID = 'therapist-demo-001';

interface TherapyClientProps {
  fetchOptions?: FetchOptions;
}

type PageState = 'loading' | 'loaded' | 'error';

export function TherapyClient({ fetchOptions }: TherapyClientProps) {
  const [state, setState] = useState<PageState>('loading');
  const [therapyEnabled, setTherapyEnabled] = useState(false);
  const [enabledCategories, setEnabledCategories] = useState<
    Record<DataCategory, boolean>
  >({
    baseline: false,
    check_ins: false,
    journal_entries: false,
    readings: false,
    protocols: false,
    therapy_sessions: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const loadData = useCallback(async () => {
    setState('loading');
    setError(null);

    const result = await getJSON<TherapyState>('/api/therapy', fetchOptions);

    if (!result.ok) {
      setError(result.error.message);
      setState('error');
      return;
    }

    setTherapyEnabled(result.data.enabled);
    setEnabledCategories(getEnabledCategoriesFromRules(result.data.sharingRules));
    setState('loaded');
  }, [fetchOptions]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleToggleTherapy = async () => {
    setIsUpdating(true);

    const result = await postJSON<{ enabled: boolean }>(
      '/api/therapy/activate',
      { enabled: !therapyEnabled },
      fetchOptions
    );

    if (result.ok) {
      setTherapyEnabled(result.data.enabled);

      // Reset categories when disabling
      if (!result.data.enabled) {
        setEnabledCategories({
          baseline: false,
          check_ins: false,
          journal_entries: false,
          readings: false,
          protocols: false,
          therapy_sessions: false,
        });
      }
    }

    setIsUpdating(false);
  };

  const handleCategoryToggle = async (
    category: DataCategory,
    enabled: boolean
  ) => {
    const newCategories = { ...enabledCategories, [category]: enabled };
    setEnabledCategories(newCategories);

    // Save to API
    const categoriesPayload = buildCategoriesFromState(newCategories);

    await postJSON(
      '/api/therapy/sharing-rules',
      {
        recipientId: DEFAULT_RECIPIENT_ID,
        categories: categoriesPayload,
      },
      fetchOptions
    );
  };

  if (state === 'loading') {
    return <TherapySkeleton />;
  }

  if (state === 'error') {
    return (
      <ErrorState
        title="Não foi possível carregar"
        description={error || 'Ocorreu um erro ao buscar os dados.'}
        onRetry={loadData}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Status card */}
      <TherapyStatusCard
        enabled={therapyEnabled}
        onToggle={handleToggleTherapy}
        isUpdating={isUpdating}
      />

      {/* Sharing rules */}
      <SharingRulesPanel
        enabledCategories={enabledCategories}
        onCategoryToggle={handleCategoryToggle}
        disabled={!therapyEnabled}
      />

      {/* Therapist preview */}
      <TherapistPreview
        enabledCategories={enabledCategories}
        therapyEnabled={therapyEnabled}
      />

      {/* Consent notice */}
      <div className="flex items-start gap-3 rounded-lg bg-muted/30 p-4">
        <Info className="h-3.5 w-3.5 shrink-0 text-muted-foreground/60 mt-0.5" />
        <div className="space-y-1">
          <p className="text-[0.75rem] font-medium text-muted-foreground">
            Controle e consentimento
          </p>
          <p className="text-[0.75rem] text-muted-foreground/70 leading-relaxed">
            Você controla quais dados são compartilhados. Nenhuma informação
            é enviada sem autorização. Acesso pode ser alterado a qualquer momento.
          </p>
        </div>
      </div>
    </div>
  );
}

