import { z } from 'zod';
import type { DateTimeISO, UUID } from './api';

// ============================================================================
// Therapy Mode (State)
// ============================================================================

/**
 * TherapyMode represents the current interaction state with the AI companion.
 */

export const TherapyModeTypeSchema = z.enum([
  'companion', // General supportive conversation
  'reflection', // Guided self-reflection
  'crisis', // Crisis support mode
  'check_in', // Structured check-in
  'journal_assist', // Journaling assistance
]);
export type TherapyModeType = z.infer<typeof TherapyModeTypeSchema>;

export const TherapySessionSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  mode: TherapyModeTypeSchema,

  // Timeline
  startedAt: z.string().datetime(),
  endedAt: z.string().datetime().nullable(),

  // Content
  messageCount: z.number().int().min(0),
  summary: z.string().optional(),

  // Metadata
  wasHelpful: z.boolean().nullable(),
  feedbackNotes: z.string().optional(),
});

export type TherapySession = z.infer<typeof TherapySessionSchema>;

// ============================================================================
// Sharing Rules (Granular Control)
// ============================================================================

/**
 * SharingRules defines what data can be shared with healthcare providers
 * or other authorized parties.
 */

export const DataCategorySchema = z.enum([
  'check_ins',
  'journal_entries',
  'readings',
  'protocols',
  'therapy_sessions',
  'baseline',
]);
export type DataCategory = z.infer<typeof DataCategorySchema>;

export const SharingLevelSchema = z.enum([
  'none', // No access
  'summary', // Aggregated/anonymized data only
  'detailed', // Full access to category
]);
export type SharingLevel = z.infer<typeof SharingLevelSchema>;

export const ShareRecipientSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['therapist', 'psychiatrist', 'coach', 'family', 'other']),
  verifiedAt: z.string().datetime().nullable(),
});

export type ShareRecipient = z.infer<typeof ShareRecipientSchema>;

export const SharingRuleSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  recipientId: z.string().uuid(),

  // Permissions
  categories: z.record(DataCategorySchema, SharingLevelSchema),

  // Time bounds
  validFrom: z.string().datetime(),
  validUntil: z.string().datetime().nullable(),

  // Status
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type SharingRule = z.infer<typeof SharingRuleSchema>;

// ============================================================================
// Therapy API Contracts
// ============================================================================

export interface StartSessionRequest {
  userId: UUID;
  mode: TherapyModeType;
}

export interface StartSessionResponse {
  session: TherapySession;
}

export interface EndSessionRequest {
  sessionId: UUID;
  wasHelpful?: boolean;
  feedbackNotes?: string;
}

export interface EndSessionResponse {
  session: TherapySession;
}

export interface ListSessionsRequest {
  userId: UUID;
  mode?: TherapyModeType;
  startDate?: string;
  endDate?: string;
  page?: number;
  pageSize?: number;
}

export interface ListSessionsResponse {
  sessions: TherapySession[];
  total: number;
}

// ============================================================================
// Sharing API Contracts
// ============================================================================

export interface ListRecipientsRequest {
  userId: UUID;
}

export interface ListRecipientsResponse {
  recipients: ShareRecipient[];
}

export interface AddRecipientRequest {
  userId: UUID;
  name: string;
  email: string;
  role: ShareRecipient['role'];
}

export interface AddRecipientResponse {
  recipient: ShareRecipient;
}

export interface GetSharingRulesRequest {
  userId: UUID;
  recipientId?: UUID;
}

export interface GetSharingRulesResponse {
  rules: SharingRule[];
}

export interface UpdateSharingRuleRequest {
  ruleId: UUID;
  categories?: Record<DataCategory, SharingLevel>;
  validUntil?: string | null;
  isActive?: boolean;
}

export interface UpdateSharingRuleResponse {
  rule: SharingRule;
}

export interface CreateSharingRuleRequest {
  userId: UUID;
  recipientId: UUID;
  categories: Record<DataCategory, SharingLevel>;
  validUntil?: string;
}

export interface CreateSharingRuleResponse {
  rule: SharingRule;
}
