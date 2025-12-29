'use client';

import { useState, useEffect, useCallback } from 'react';
import { getJSON, postJSON, type FetchOptions } from '@/lib/apiClient';
import { ErrorState } from '@/components/feedback';
import { useToast } from '@/components/feedback';
import type { Protocol, ProtocolRun as ProtocolRunType, ProtocolsPageState } from '../types';
import { ProtocolLibrary } from './ProtocolLibrary';
import { ProtocolRun } from './ProtocolRun';
import { ProtocolsSkeleton } from './ProtocolsSkeleton';

interface ProtocolsClientProps {
  fetchOptions?: FetchOptions;
}

export function ProtocolsClient({ fetchOptions }: ProtocolsClientProps) {
  const [state, setState] = useState<ProtocolsPageState>('loading');
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [runs, setRuns] = useState<ProtocolRunType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { success, error: showError } = useToast();

  // Selected protocol for detail view
  const [selectedProtocol, setSelectedProtocol] = useState<Protocol | null>(
    null
  );
  const [selectedRun, setSelectedRun] = useState<ProtocolRunType | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const loadData = useCallback(async () => {
    setState('loading');
    setError(null);

    // Load protocols and runs in parallel
    const [protocolsResult, runsResult] = await Promise.all([
      getJSON<Protocol[]>('/api/protocols', fetchOptions),
      getJSON<ProtocolRunType[]>('/api/protocols/runs', fetchOptions),
    ]);

    if (!protocolsResult.ok) {
      setError(protocolsResult.error.message);
      setState('error');
      return;
    }

    if (!runsResult.ok) {
      setError(runsResult.error.message);
      setState('error');
      return;
    }

    setProtocols(protocolsResult.data);
    setRuns(runsResult.data);
    setState('loaded');
  }, [fetchOptions]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSelectProtocol = (
    protocol: Protocol,
    run: ProtocolRunType | null
  ) => {
    setSelectedProtocol(protocol);
    setSelectedRun(run);
  };

  const handleBack = () => {
    setSelectedProtocol(null);
    setSelectedRun(null);
  };

  const handleTaskComplete = async (taskId: string) => {
    if (!selectedRun) return;

    setIsUpdating(true);

    const result = await postJSON<{ runId: string; taskId: string }>(
      `/api/protocols/runs/${selectedRun.id}/progress`,
      { taskId },
      fetchOptions
    );

    if (result.ok) {
      // Update local state
      setSelectedRun(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          completedTasks: [
            ...prev.completedTasks,
            { taskId, completedAt: new Date().toISOString() },
          ],
        };
      });

      // Also update runs list
      setRuns(prevRuns =>
        prevRuns.map(run => {
          if (run.id !== selectedRun.id) return run;
          return {
            ...run,
            completedTasks: [
              ...run.completedTasks,
              { taskId, completedAt: new Date().toISOString() },
            ],
          };
        })
      );

      success('Passo concluído');
    } else {
      showError('Nao foi possivel registrar');
    }

    setIsUpdating(false);
  };

  if (state === 'loading') {
    return <ProtocolsSkeleton />;
  }

  if (state === 'error') {
    return (
      <ErrorState
        title="Nao foi possivel carregar"
        description={error || 'Ocorreu um erro ao buscar os dados.'}
        onRetry={loadData}
      />
    );
  }

  // Detail view
  if (selectedProtocol) {
    return (
      <ProtocolRun
        protocol={selectedProtocol}
        run={selectedRun}
        onBack={handleBack}
        onTaskComplete={handleTaskComplete}
        isUpdating={isUpdating}
      />
    );
  }

  // Library view
  return (
    <ProtocolLibrary
      protocols={protocols}
      runs={runs}
      onSelectProtocol={handleSelectProtocol}
    />
  );
}

