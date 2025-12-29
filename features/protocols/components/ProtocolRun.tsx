'use client';

import { ArrowLeft } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
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
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1">
              <CardTitle className="text-lg">{protocol.name}</CardTitle>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-xs">
                  {formatCategory(protocol.category)}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {formatDuration(protocol.durationDays)}
                </span>
              </div>
            </div>
            {isActive && (
              <Badge variant="outline" className="shrink-0">
                Em andamento
              </Badge>
            )}
          </div>
          <CardDescription className="mt-2">
            {protocol.description}
          </CardDescription>
        </CardHeader>

        {/* Progress */}
        {run && (
          <CardContent>
            <ProtocolProgress protocol={protocol} run={run} />
          </CardContent>
        )}
      </Card>

      {/* Checklist */}
      {isActive ? (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tarefas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ProtocolChecklist
              steps={steps}
              onTaskToggle={handleTaskToggle}
              isLoading={isUpdating}
            />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Estrutura do protocolo</CardTitle>
            <CardDescription>
              Este protocolo contem {protocol.steps.length} etapa
              {protocol.steps.length !== 1 && 's'}.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {protocol.steps.map(step => (
              <div key={step.id} className="space-y-1">
                <p className="text-sm font-medium text-foreground">
                  {step.order}. {step.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {step.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  {step.tasks.length} tarefa{step.tasks.length !== 1 && 's'}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Info disclaimer */}
      <div className="rounded-lg bg-muted/50 p-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          Protocolos sao ferramentas de apoio e nao substituem acompanhamento
          profissional. Voce pode pausar ou encerrar a qualquer momento sem
          penalidade.
        </p>
      </div>
    </div>
  );
}

