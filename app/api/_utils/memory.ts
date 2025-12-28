import type {
  DailyCheckIn,
  JournalEntry,
  SharingRule,
} from '@/server/contracts';

/**
 * In-memory storage for development/testing
 * Data persists only during the server runtime
 */

// Check-in overrides (date -> checkin)
const checkinOverrides = new Map<string, Partial<DailyCheckIn>>();

// Journal entries created/updated (date -> entry)
const journalOverrides = new Map<string, JournalEntry>();

// Reading feedback (id -> feedback)
const readingFeedback = new Map<
  string,
  { action: 'useful' | 'not_applicable' | 'hidden'; updatedAt: string }
>();

// Protocol run progress (runId -> taskIds completed)
const protocolProgress = new Map<string, Set<string>>();

// Therapy state
let therapyEnabled = false;

// Sharing rules
const sharingRulesStore: SharingRule[] = [];

// ============================================================================
// Check-in Memory
// ============================================================================

export function getCheckinOverride(
  date: string
): Partial<DailyCheckIn> | undefined {
  return checkinOverrides.get(date);
}

export function setCheckinOverride(
  date: string,
  data: Partial<DailyCheckIn>
): void {
  const existing = checkinOverrides.get(date) || {};
  checkinOverrides.set(date, { ...existing, ...data });
}

// ============================================================================
// Journal Memory
// ============================================================================

export function getJournalOverride(date: string): JournalEntry | undefined {
  return journalOverrides.get(date);
}

export function setJournalOverride(date: string, entry: JournalEntry): void {
  journalOverrides.set(date, entry);
}

// ============================================================================
// Reading Feedback Memory
// ============================================================================

export function getReadingFeedback(
  id: string
): { action: string; updatedAt: string } | undefined {
  return readingFeedback.get(id);
}

export function setReadingFeedback(
  id: string,
  action: 'useful' | 'not_applicable' | 'hidden'
): void {
  readingFeedback.set(id, {
    action,
    updatedAt: new Date().toISOString(),
  });
}

// ============================================================================
// Protocol Progress Memory
// ============================================================================

export function getProtocolProgress(runId: string): string[] {
  const progress = protocolProgress.get(runId);
  return progress ? Array.from(progress) : [];
}

export function addProtocolTaskCompletion(runId: string, taskId: string): void {
  if (!protocolProgress.has(runId)) {
    protocolProgress.set(runId, new Set());
  }
  protocolProgress.get(runId)!.add(taskId);
}

// ============================================================================
// Therapy Memory
// ============================================================================

export function isTherapyEnabled(): boolean {
  return therapyEnabled;
}

export function setTherapyEnabled(enabled: boolean): void {
  therapyEnabled = enabled;
}

// ============================================================================
// Sharing Rules Memory
// ============================================================================

export function getSharingRules(): SharingRule[] {
  return [...sharingRulesStore];
}

export function addSharingRule(rule: SharingRule): void {
  // Remove existing rule for same recipient if exists
  const index = sharingRulesStore.findIndex(
    r => r.recipientId === rule.recipientId
  );
  if (index >= 0) {
    sharingRulesStore[index] = rule;
  } else {
    sharingRulesStore.push(rule);
  }
}

// ============================================================================
// Reset (for testing)
// ============================================================================

export function resetMemory(): void {
  checkinOverrides.clear();
  journalOverrides.clear();
  readingFeedback.clear();
  protocolProgress.clear();
  therapyEnabled = false;
  sharingRulesStore.length = 0;
}
