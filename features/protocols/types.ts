import type {
  Protocol,
  ProtocolRun,
  ProtocolStep,
  ProtocolCategory,
  TaskCompletion,
} from '@/server/contracts';

// ============================================================================
// Re-exports
// ============================================================================

export type {
  Protocol,
  ProtocolRun,
  ProtocolStep,
  ProtocolCategory,
  TaskCompletion,
};

// ============================================================================
// Display Types
// ============================================================================

export type ProtocolsPageState = 'loading' | 'loaded' | 'error';

/**
 * Protocol category display labels
 */
export const CATEGORY_LABELS: Record<ProtocolCategory, string> = {
  medication: 'Medicacao',
  therapy: 'Terapia',
  lifestyle: 'Estilo de vida',
  sleep: 'Sono',
  exercise: 'Exercicio',
  nutrition: 'Nutricao',
  mindfulness: 'Mindfulness',
  social: 'Social',
};

/**
 * Protocol with its active run (if any)
 */
export interface ProtocolWithRun {
  protocol: Protocol;
  activeRun: ProtocolRun | null;
}

/**
 * Task with completion status
 */
export interface TaskWithStatus {
  id: string;
  title: string;
  frequency: string;
  isRequired: boolean;
  isCompleted: boolean;
}

/**
 * Step with task statuses
 */
export interface StepWithProgress {
  id: string;
  order: number;
  title: string;
  description: string;
  tasks: TaskWithStatus[];
  completedCount: number;
  totalCount: number;
}

