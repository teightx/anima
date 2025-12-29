'use client';

import { ArrowLeft } from 'lucide-react';
import {
  QuietCard,
  QuietCardHeader,
  QuietCardTitle,
  QuietCardDescription,
  QuietCardContent,
  SectionHeader,
  InlineNote,
  MetaRow,
  MetaRowGroup,
} from '@/components/system';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Protocol, ProtocolRun as ProtocolRunType } from '../types';
import { formatCategory, formatDuration, getStepsWithProgress } from '../helpers';
import { ProtocolChecklist } from './ProtocolChecklist';
import { ProtocolProgress } from './ProtocolProgress';

interface ProtocolRunProps {
  protocol: Protocol;
  run: ProtocolRunType | null;
  onBack: () => void;
  onTaskComplete: (taskId: string) => Promise<void>;
  isUpdating: boolean;
}

export function ProtocolRun({
  protocol,
  run,
  onBack,
  onTaskComplete,
  isUpdating,
}: ProtocolRunProps) {
  const steps = getStepsWithProgress(protocol, run);
  const isActive = !!run;

  const handleTaskToggle = async (taskId: string, completed: boolean) => {
    if (completed) {
      await onTaskComplete(taskId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Button variant="ghost" size="sm" onClick={onBack} className="-ml-2">
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </Button>

      {/* Header */}
      <QuietCard>
        <QuietCardHeader>
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-2">
              <QuietCardTitle className="text-h3">{protocol.name}</QuietCardTitle>
              <MetaRowGroup separator={false}>
                <Badge variant="secondary">{formatCategory(protocol.category)}</Badge>
                <MetaRow label="" value={formatDuration(protocol.durationDays)} />
              </MetaRowGroup>
            </div>
            {isActive && (
              <Badge variant="outline" className="shrink-0">
                Em andamento
              </Badge>
            )}
          </div>
          <QuietCardDescription className="mt-3">
            {protocol.description}
          </QuietCardDescription>
        </QuietCardHeader>

        {/* Progress */}
        {run && (
          <QuietCardContent className="pt-0">
            <ProtocolProgress protocol={protocol} run={run} />
          </QuietCardContent>
        )}
      </QuietCard>

      {/* Checkpoints */}
      {isActive ? (
        <QuietCard>
          <SectionHeader title="Checkpoints" size="small" />
          <QuietCardContent>
            <ProtocolChecklist
              steps={steps}
              onTaskToggle={handleTaskToggle}
              isLoading={isUpdating}
            />
          </QuietCardContent>
        </QuietCard>
      ) : (
        <QuietCard>
          <QuietCardHeader>
            <QuietCardTitle>Estrutura do plano</QuietCardTitle>
            <QuietCardDescription>
              Este plano contém {protocol.steps.length} passo
              {protocol.steps.length !== 1 ? 's' : ''}.
            </QuietCardDescription>
          </QuietCardHeader>
          <QuietCardContent className="space-y-4">
            {protocol.steps.map(step => (
              <div key={step.id} className="space-y-1">
                <p className="text-body-sm font-medium text-text-primary">
                  {step.order}. {step.title}
                </p>
                <p className="text-caption text-text-muted">
                  {step.description}
                </p>
                <p className="text-caption text-text-muted">
                  {step.tasks.length} passo{step.tasks.length !== 1 ? 's' : ''}
                </p>
              </div>
            ))}
          </QuietCardContent>
        </QuietCard>
      )}

      {/* Disclaimer obrigatório */}
      <InlineNote>
        Planos são estruturas opcionais de organização. Não constituem tratamento ou recomendação.
      </InlineNote>
    </div>
  );
}
