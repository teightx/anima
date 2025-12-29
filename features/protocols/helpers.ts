import type {
  Protocol,
  ProtocolRun,
  ProtocolCategory,
  StepWithProgress,
} from './types';
import { CATEGORY_LABELS } from './types';

// ============================================================================
// Helpers
// ============================================================================

/**
 * Format category for display
 */
export function formatCategory(category: ProtocolCategory): string {
  return CATEGORY_LABELS[category] || category;
}

/**
 * Format duration for display
 */
export function formatDuration(days: number | undefined): string {
  if (!days) return 'Duracao variavel';
  if (days === 1) return '1 dia';
  if (days < 7) return `${days} dias`;
  const weeks = Math.floor(days / 7);
  const remainingDays = days % 7;
  if (remainingDays === 0) {
    return weeks === 1 ? '1 semana' : `${weeks} semanas`;
  }
  return `${weeks} semana${weeks > 1 ? 's' : ''} e ${remainingDays} dia${remainingDays > 1 ? 's' : ''}`;
}

/**
 * Get all tasks from a protocol
 */
export function getAllTasks(
  protocol: Protocol
): { stepId: string; taskId: string; title: string }[] {
  const tasks: { stepId: string; taskId: string; title: string }[] = [];

  for (const step of protocol.steps) {
    for (const task of step.tasks) {
      tasks.push({
        stepId: step.id,
        taskId: task.id,
        title: task.title,
      });
    }
  }

  return tasks;
}

/**
 * Count total tasks in a protocol
 */
export function countTotalTasks(protocol: Protocol): number {
  return protocol.steps.reduce((sum, step) => sum + step.tasks.length, 0);
}

/**
 * Get progress percentage
 */
export function getProgressPercentage(
  protocol: Protocol,
  run: ProtocolRun | null
): number {
  if (!run) return 0;

  const total = countTotalTasks(protocol);
  if (total === 0) return 0;

  const completed = run.completedTasks.length;
  return Math.round((completed / total) * 100);
}

/**
 * Get steps with completion status
 */
export function getStepsWithProgress(
  protocol: Protocol,
  run: ProtocolRun | null
): StepWithProgress[] {
  const completedTaskIds = new Set(
    run?.completedTasks.map(t => t.taskId) || []
  );

  return protocol.steps.map(step => {
    const tasks = step.tasks.map(task => ({
      id: task.id,
      title: task.title,
      frequency: task.frequency,
      isRequired: task.isRequired,
      isCompleted: completedTaskIds.has(task.id),
    }));

    const completedCount = tasks.filter(t => t.isCompleted).length;

    return {
      id: step.id,
      order: step.order,
      title: step.title,
      description: step.description,
      tasks,
      completedCount,
      totalCount: tasks.length,
    };
  });
}

/**
 * Check if a run is still active
 */
export function isRunActive(run: ProtocolRun): boolean {
  return run.status === 'active';
}

/**
 * Format progress text
 */
export function formatProgress(completed: number, total: number): string {
  return `${completed} de ${total}`;
}

