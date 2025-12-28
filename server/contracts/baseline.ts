import { z } from 'zod';
import type { DateISO, DateTimeISO, UUID } from './api';

// ============================================================================
// Baseline Assessment
// ============================================================================

/**
 * Baseline represents the initial comprehensive assessment
 * completed when a user starts using the application.
 */

export const BaselineStatusSchema = z.enum([
  'not_started',
  'in_progress',
  'completed',
]);
export type BaselineStatus = z.infer<typeof BaselineStatusSchema>;

export const BaselineSectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  completed: z.boolean(),
  completedAt: z.string().datetime().nullable(),
  answers: z.record(z.string(), z.unknown()),
});

export type BaselineSection = z.infer<typeof BaselineSectionSchema>;

export const BaselineSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  status: BaselineStatusSchema,
  startedAt: z.string().datetime(),
  completedAt: z.string().datetime().nullable(),
  sections: z.array(BaselineSectionSchema),
  version: z.number().int().positive(),
});

export type Baseline = z.infer<typeof BaselineSchema>;

// ============================================================================
// Baseline API Contracts
// ============================================================================

export interface GetBaselineRequest {
  userId: UUID;
}

export interface GetBaselineResponse {
  baseline: Baseline | null;
}

export interface StartBaselineRequest {
  userId: UUID;
}

export interface StartBaselineResponse {
  baseline: Baseline;
}

export interface UpdateBaselineSectionRequest {
  baselineId: UUID;
  sectionId: string;
  answers: Record<string, unknown>;
}

export interface UpdateBaselineSectionResponse {
  section: BaselineSection;
  baseline: Baseline;
}

export interface CompleteBaselineRequest {
  baselineId: UUID;
}

export interface CompleteBaselineResponse {
  baseline: Baseline;
}
