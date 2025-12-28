import { z } from 'zod';
import type { DateTimeISO, UUID } from './api';

// ============================================================================
// Journal Entry
// ============================================================================

/**
 * JournalEntry represents a free-form journal entry.
 * Users can write about their thoughts, feelings, and experiences.
 */

export const JournalEntryTypeSchema = z.enum([
  'free_write',
  'prompted',
  'gratitude',
  'reflection',
]);
export type JournalEntryType = z.infer<typeof JournalEntryTypeSchema>;

export const JournalEntrySchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  type: JournalEntryTypeSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),

  // Content
  title: z.string().max(200).optional(),
  content: z.string().max(10000),
  promptId: z.string().uuid().optional(),

  // Metadata
  mood: z.number().int().min(1).max(10).optional(),
  tags: z.array(z.string()).optional(),
  isPrivate: z.boolean().default(true),
});

export type JournalEntry = z.infer<typeof JournalEntrySchema>;

// ============================================================================
// Journal Prompt
// ============================================================================

export const JournalPromptSchema = z.object({
  id: z.string().uuid(),
  category: z.string(),
  text: z.string(),
  isActive: z.boolean(),
});

export type JournalPrompt = z.infer<typeof JournalPromptSchema>;

// ============================================================================
// Journal API Contracts
// ============================================================================

export interface ListJournalEntriesRequest {
  userId: UUID;
  type?: JournalEntryType;
  startDate?: string;
  endDate?: string;
  page?: number;
  pageSize?: number;
}

export interface ListJournalEntriesResponse {
  entries: JournalEntry[];
  total: number;
}

export interface GetJournalEntryRequest {
  entryId: UUID;
}

export interface GetJournalEntryResponse {
  entry: JournalEntry;
}

export interface CreateJournalEntryRequest {
  userId: UUID;
  type: JournalEntryType;
  title?: string;
  content: string;
  promptId?: UUID;
  mood?: number;
  tags?: string[];
  isPrivate?: boolean;
}

export interface CreateJournalEntryResponse {
  entry: JournalEntry;
}

export interface UpdateJournalEntryRequest {
  entryId: UUID;
  title?: string;
  content?: string;
  mood?: number;
  tags?: string[];
  isPrivate?: boolean;
}

export interface UpdateJournalEntryResponse {
  entry: JournalEntry;
}

export interface DeleteJournalEntryRequest {
  entryId: UUID;
}

export interface DeleteJournalEntryResponse {
  success: boolean;
}

export interface GetRandomPromptRequest {
  category?: string;
}

export interface GetRandomPromptResponse {
  prompt: JournalPrompt;
}
