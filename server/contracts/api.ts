import { z } from 'zod';

// ============================================================================
// Common Types
// ============================================================================

/** ISO 8601 date string (YYYY-MM-DD) */
export type DateISO = string;

/** ISO 8601 datetime string */
export type DateTimeISO = string;

/** UUID string */
export type UUID = string;

// ============================================================================
// Enums
// ============================================================================

export const ConfidenceLevelSchema = z.enum(['low', 'medium', 'high']);
export type ConfidenceLevel = z.infer<typeof ConfidenceLevelSchema>;

export const SeverityLevelSchema = z.enum(['low', 'medium', 'high']);
export type SeverityLevel = z.infer<typeof SeverityLevelSchema>;

export const StatusSchema = z.enum(['active', 'inactive', 'archived']);
export type Status = z.infer<typeof StatusSchema>;

// ============================================================================
// API Response Wrappers
// ============================================================================

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  meta?: {
    page?: number;
    pageSize?: number;
    total?: number;
    timestamp?: DateTimeISO;
  };
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// ============================================================================
// Pagination
// ============================================================================

export const PaginationParamsSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
});

export type PaginationParams = z.infer<typeof PaginationParamsSchema>;

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

// ============================================================================
// Common Schemas
// ============================================================================

export const DateISOSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
export const DateTimeISOSchema = z.string().datetime();
export const UUIDSchema = z.string().uuid();
