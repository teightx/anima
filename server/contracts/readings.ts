import { z } from 'zod';
import type { DateTimeISO, UUID, ConfidenceLevel } from './api';
import { ConfidenceLevelSchema } from './api';

// ============================================================================
// Reading (Insight/Leitura)
// ============================================================================

/**
 * Reading represents an AI-generated insight or analysis
 * based on user data patterns and trends.
 */

export const ReadingCategorySchema = z.enum([
  'mood_pattern',
  'sleep_correlation',
  'symptom_trend',
  'medication_effect',
  'activity_impact',
  'general_insight',
]);
export type ReadingCategory = z.infer<typeof ReadingCategorySchema>;

export const ReadingStatusSchema = z.enum([
  'new',
  'viewed',
  'acknowledged',
  'dismissed',
]);
export type ReadingStatus = z.infer<typeof ReadingStatusSchema>;

export const ReadingSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  category: ReadingCategorySchema,
  status: ReadingStatusSchema,
  createdAt: z.string().datetime(),
  viewedAt: z.string().datetime().nullable(),

  // Content
  title: z.string(),
  summary: z.string(),
  detail: z.string().optional(),

  // Analysis metadata
  confidence: ConfidenceLevelSchema,
  dataPointsAnalyzed: z.number().int().positive(),
  periodStart: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  periodEnd: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),

  // References
  relatedCheckInIds: z.array(z.string().uuid()).optional(),
  relatedJournalIds: z.array(z.string().uuid()).optional(),
});

export type Reading = z.infer<typeof ReadingSchema>;

// ============================================================================
// Reading API Contracts
// ============================================================================

export interface ListReadingsRequest {
  userId: UUID;
  category?: ReadingCategory;
  status?: ReadingStatus;
  page?: number;
  pageSize?: number;
}

export interface ListReadingsResponse {
  readings: Reading[];
  total: number;
  unreadCount: number;
}

export interface GetReadingRequest {
  readingId: UUID;
}

export interface GetReadingResponse {
  reading: Reading;
}

export interface MarkReadingViewedRequest {
  readingId: UUID;
}

export interface MarkReadingViewedResponse {
  reading: Reading;
}

export interface UpdateReadingStatusRequest {
  readingId: UUID;
  status: ReadingStatus;
}

export interface UpdateReadingStatusResponse {
  reading: Reading;
}
