import { z } from 'zod';
import type { DateTimeISO, UUID, ConfidenceLevel } from './api';
import { ConfidenceLevelSchema } from './api';

// ============================================================================
// Reference Source (Study Card)
// ============================================================================

/**
 * ReferenceSource represents a scientific study or article
 * that supports insights and recommendations.
 */

export const ReferenceTypeSchema = z.enum([
  'peer_reviewed',
  'meta_analysis',
  'clinical_trial',
  'review_article',
  'guideline',
  'book_chapter',
]);
export type ReferenceType = z.infer<typeof ReferenceTypeSchema>;

export const ReferenceSourceSchema = z.object({
  id: z.string().uuid(),
  type: ReferenceTypeSchema,

  // Citation info
  title: z.string(),
  authors: z.array(z.string()),
  journal: z.string().optional(),
  year: z.number().int().min(1900).max(2100),
  doi: z.string().optional(),
  url: z.string().url().optional(),

  // Content
  abstract: z.string().optional(),
  keyFindings: z.array(z.string()),

  // Metadata
  evidenceLevel: ConfidenceLevelSchema,
  topics: z.array(z.string()),
  createdAt: z.string().datetime(),
});

export type ReferenceSource = z.infer<typeof ReferenceSourceSchema>;

// ============================================================================
// Reference API Contracts
// ============================================================================

export interface ListReferencesRequest {
  topic?: string;
  type?: ReferenceType;
  page?: number;
  pageSize?: number;
}

export interface ListReferencesResponse {
  references: ReferenceSource[];
  total: number;
}

export interface GetReferenceRequest {
  referenceId: UUID;
}

export interface GetReferenceResponse {
  reference: ReferenceSource;
}

export interface SearchReferencesRequest {
  query: string;
  topics?: string[];
  types?: ReferenceType[];
  page?: number;
  pageSize?: number;
}

export interface SearchReferencesResponse {
  references: ReferenceSource[];
  total: number;
}
