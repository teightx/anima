import { z } from 'zod';
import type { DateISO, DateTimeISO, UUID } from './api';

// ============================================================================
// Protocol (Library Definition)
// ============================================================================

/**
 * Protocol represents a treatment protocol or intervention template.
 * These are predefined programs that users can start and follow.
 */

export const ProtocolCategorySchema = z.enum([
  'medication',
  'therapy',
  'lifestyle',
  'sleep',
  'exercise',
  'nutrition',
  'mindfulness',
  'social',
]);
export type ProtocolCategory = z.infer<typeof ProtocolCategorySchema>;

export const ProtocolFrequencySchema = z.enum([
  'daily',
  'weekly',
  'biweekly',
  'monthly',
  'as_needed',
]);
export type ProtocolFrequency = z.infer<typeof ProtocolFrequencySchema>;

export const ProtocolStepSchema = z.object({
  id: z.string(),
  order: z.number().int().positive(),
  title: z.string(),
  description: z.string(),
  durationDays: z.number().int().positive().optional(),
  tasks: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      frequency: ProtocolFrequencySchema,
      isRequired: z.boolean(),
    })
  ),
});

export type ProtocolStep = z.infer<typeof ProtocolStepSchema>;

export const ProtocolSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  category: ProtocolCategorySchema,

  // Structure
  durationDays: z.number().int().positive().optional(),
  steps: z.array(ProtocolStepSchema),

  // Metadata
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),

  // References
  referenceIds: z.array(z.string().uuid()).optional(),
});

export type Protocol = z.infer<typeof ProtocolSchema>;

// ============================================================================
// Protocol Run (User Execution)
// ============================================================================

/**
 * ProtocolRun represents a user's active execution of a protocol.
 */

export const ProtocolRunStatusSchema = z.enum([
  'active',
  'paused',
  'completed',
  'abandoned',
]);
export type ProtocolRunStatus = z.infer<typeof ProtocolRunStatusSchema>;

export const TaskCompletionSchema = z.object({
  taskId: z.string(),
  completedAt: z.string().datetime(),
  notes: z.string().optional(),
});

export type TaskCompletion = z.infer<typeof TaskCompletionSchema>;

export const ProtocolRunSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  protocolId: z.string().uuid(),
  status: ProtocolRunStatusSchema,

  // Timeline
  startedAt: z.string().datetime(),
  pausedAt: z.string().datetime().nullable(),
  completedAt: z.string().datetime().nullable(),
  expectedEndDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),

  // Progress
  currentStepIndex: z.number().int().min(0),
  completedTasks: z.array(TaskCompletionSchema),

  // User data
  notes: z.string().optional(),
});

export type ProtocolRun = z.infer<typeof ProtocolRunSchema>;

// ============================================================================
// Protocol API Contracts
// ============================================================================

export interface ListProtocolsRequest {
  category?: ProtocolCategory;
  page?: number;
  pageSize?: number;
}

export interface ListProtocolsResponse {
  protocols: Protocol[];
  total: number;
}

export interface GetProtocolRequest {
  protocolId: UUID;
}

export interface GetProtocolResponse {
  protocol: Protocol;
}

export interface StartProtocolRequest {
  userId: UUID;
  protocolId: UUID;
}

export interface StartProtocolResponse {
  run: ProtocolRun;
}

export interface GetActiveRunsRequest {
  userId: UUID;
}

export interface GetActiveRunsResponse {
  runs: ProtocolRun[];
}

export interface UpdateProtocolRunRequest {
  runId: UUID;
  status?: ProtocolRunStatus;
  currentStepIndex?: number;
  notes?: string;
}

export interface UpdateProtocolRunResponse {
  run: ProtocolRun;
}

export interface CompleteTaskRequest {
  runId: UUID;
  taskId: string;
  notes?: string;
}

export interface CompleteTaskResponse {
  run: ProtocolRun;
  taskCompletion: TaskCompletion;
}
