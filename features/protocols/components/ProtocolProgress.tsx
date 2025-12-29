'use client';

import type { Protocol, ProtocolRun } from '../types';
import { formatProgress, getProgressPercentage } from '../helpers';

interface ProtocolProgressProps {
  protocol: Protocol;
  run: ProtocolRun;
}

export function ProtocolProgress({ protocol, run }: ProtocolProgressProps) {
  const totalTasks = protocol.steps.reduce(
    (sum, step) => sum + step.tasks.length,
    0
  );
  const completedTasks = run.completedTasks.length;
  const progress = getProgressPercentage(protocol, run);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Progresso geral</span>
        <span className="font-medium text-foreground">
          {formatProgress(completedTasks, totalTasks)}
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary/60 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      {progress === 100 && (
        <p className="text-sm text-muted-foreground">
          Todos os passos foram concluídos.
        </p>
      )}
    </div>
  );
}

