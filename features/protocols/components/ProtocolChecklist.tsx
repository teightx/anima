'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { StepWithProgress } from '../types';

interface ProtocolChecklistProps {
  steps: StepWithProgress[];
  onTaskToggle: (taskId: string, completed: boolean) => void;
  isLoading: boolean;
}

export function ProtocolChecklist({
  steps,
  onTaskToggle,
  isLoading,
}: ProtocolChecklistProps) {
  const [pendingTasks, setPendingTasks] = useState<Set<string>>(new Set());

  const handleToggle = async (taskId: string, currentlyCompleted: boolean) => {
    if (isLoading || pendingTasks.has(taskId)) return;

    // Only allow completing (not uncompleting)
    if (currentlyCompleted) return;

    setPendingTasks(prev => new Set(prev).add(taskId));
    await onTaskToggle(taskId, !currentlyCompleted);
    setPendingTasks(prev => {
      const next = new Set(prev);
      next.delete(taskId);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {steps.map(step => (
        <div key={step.id} className="space-y-3">
          <div>
            <h3 className="text-sm font-medium text-foreground">{step.title}</h3>
            <p className="text-xs text-muted-foreground">{step.description}</p>
          </div>

          <div className="space-y-2">
            {step.tasks.map(task => {
              const isPending = pendingTasks.has(task.id);

              return (
                <button
                  key={task.id}
                  type="button"
                  onClick={() => handleToggle(task.id, task.isCompleted)}
                  disabled={task.isCompleted || isPending}
                  className={cn(
                    'flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-colors',
                    task.isCompleted
                      ? 'border-border/50 bg-muted/30'
                      : 'border-border hover:bg-accent/50',
                    isPending && 'opacity-50'
                  )}
                >
                  <div
                    className={cn(
                      'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors',
                      task.isCompleted
                        ? 'border-primary/50 bg-primary/20'
                        : 'border-muted-foreground/30'
                    )}
                  >
                    {task.isCompleted && (
                      <Check className="h-3 w-3 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <p
                      className={cn(
                        'text-sm',
                        task.isCompleted
                          ? 'text-muted-foreground line-through'
                          : 'text-foreground'
                      )}
                    >
                      {task.title}
                    </p>
                    {!task.isRequired && (
                      <p className="text-xs text-muted-foreground">Opcional</p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

