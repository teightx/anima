import type { JournalEntry, JournalEntryType } from '@/server/contracts';

// ============================================================================
// Journal Form Types
// ============================================================================

export interface JournalFormData {
  content: string;
  title?: string;
  type: JournalEntryType;
}

export const DEFAULT_JOURNAL_FORM: JournalFormData = {
  content: '',
  type: 'free_write',
};

// Map form data to API payload
export function formDataToPayload(data: JournalFormData) {
  return {
    content: data.content,
    title: data.title || undefined,
    type: data.type,
  };
}

// Map API response to form data
export function entryToFormData(entry: JournalEntry): JournalFormData {
  return {
    content: entry.content,
    title: entry.title,
    type: entry.type,
  };
}
