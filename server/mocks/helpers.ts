import type { DailyCheckIn, Reading } from '@/server/contracts';
import { dataset } from './dataset';

// ============================================================================
// Check-in Helpers
// ============================================================================

/**
 * Get the last N days of check-ins, ordered by date descending
 */
export function getLastNDays(
  checkins: DailyCheckIn[],
  n: number
): DailyCheckIn[] {
  return [...checkins].sort((a, b) => b.date.localeCompare(a.date)).slice(0, n);
}

/**
 * Get a check-in by date (YYYY-MM-DD)
 */
export function getCheckinByDate(date: string): DailyCheckIn | undefined {
  return dataset.checkins.find(c => c.date === date);
}

/**
 * Get all check-ins within a date range (inclusive)
 */
export function getCheckinsByRange(
  startDate: string,
  endDate: string
): DailyCheckIn[] {
  return dataset.checkins.filter(c => c.date >= startDate && c.date <= endDate);
}

/**
 * Get check-ins for a specific week (0-indexed from start)
 */
export function getCheckinsByWeek(weekIndex: number): DailyCheckIn[] {
  const startDay = weekIndex * 7;
  const endDay = startDay + 6;

  return dataset.checkins.filter(c => {
    const day = parseInt(c.date.split('-')[2]) - 1; // Convert to 0-indexed
    return day >= startDay && day <= endDay;
  });
}

/**
 * Calculate average mood for a set of check-ins
 */
export function calculateAverageMood(checkins: DailyCheckIn[]): number {
  if (checkins.length === 0) return 0;
  const sum = checkins.reduce((acc, c) => acc + c.moodScore, 0);
  return Math.round((sum / checkins.length) * 10) / 10;
}

/**
 * Calculate average energy for a set of check-ins
 */
export function calculateAverageEnergy(checkins: DailyCheckIn[]): number {
  if (checkins.length === 0) return 0;
  const sum = checkins.reduce((acc, c) => acc + c.energyScore, 0);
  return Math.round((sum / checkins.length) * 10) / 10;
}

/**
 * Calculate average sleep hours for a set of check-ins
 */
export function calculateAverageSleep(checkins: DailyCheckIn[]): number {
  const withSleep = checkins.filter(c => c.sleepHours !== undefined);
  if (withSleep.length === 0) return 0;
  const sum = withSleep.reduce((acc, c) => acc + (c.sleepHours ?? 0), 0);
  return Math.round((sum / withSleep.length) * 10) / 10;
}

/**
 * Get dates with gaps (no check-in recorded)
 */
export function getGapDates(): string[] {
  const allDates = new Set(dataset.checkins.map(c => c.date));
  const gaps: string[] = [];

  // Check each day in the range
  if (dataset.checkins.length === 0) return gaps;

  const sortedCheckins = [...dataset.checkins].sort((a, b) =>
    a.date.localeCompare(b.date)
  );
  const startDate = new Date(sortedCheckins[0].date);
  const endDate = new Date(sortedCheckins[sortedCheckins.length - 1].date);

  const current = new Date(startDate);
  while (current <= endDate) {
    const dateStr = current.toISOString().split('T')[0];
    if (!allDates.has(dateStr)) {
      gaps.push(dateStr);
    }
    current.setDate(current.getDate() + 1);
  }

  return gaps;
}

// ============================================================================
// Reading Helpers
// ============================================================================

/**
 * Get readings within a date range (based on createdAt)
 */
export function getReadingsByRange(
  startDate: string,
  endDate: string
): Reading[] {
  return dataset.readings.filter(r => {
    const created = r.createdAt.split('T')[0];
    return created >= startDate && created <= endDate;
  });
}

/**
 * Get readings by category
 */
export function getReadingsByCategory(
  category: Reading['category']
): Reading[] {
  return dataset.readings.filter(r => r.category === category);
}

/**
 * Get unread readings
 */
export function getUnreadReadings(): Reading[] {
  return dataset.readings.filter(r => r.status === 'new');
}

/**
 * Get reading by ID
 */
export function getReadingById(id: string): Reading | undefined {
  return dataset.readings.find(r => r.id === id);
}

/**
 * Get reference source for a reading
 * Note: In this mock, references are not directly linked via ID in the Reading type,
 * but we can match by topic/category for demonstration
 */
export function getReferencesForReading(reading: Reading) {
  const topicMap: Record<string, string[]> = {
    sleep_correlation: ['sono', 'regularidade'],
    mood_pattern: ['humor', 'variabilidade', 'estabilidade'],
    symptom_trend: ['sintomas', 'fadiga'],
    medication_effect: ['medicacao', 'aderencia'],
    activity_impact: ['exercicio', 'atividade-fisica'],
    general_insight: ['automonitoramento', 'metodologia', 'lacunas'],
  };

  const topics = topicMap[reading.category] || [];
  return dataset.references.filter(ref =>
    ref.topics.some(t => topics.includes(t))
  );
}

// ============================================================================
// Protocol Helpers
// ============================================================================

/**
 * Get active protocol runs
 */
export function getActiveProtocolRuns() {
  return dataset.protocolRuns.filter(r => r.status === 'active');
}

/**
 * Get protocol by ID
 */
export function getProtocolById(id: string) {
  return dataset.protocols.find(p => p.id === id);
}

/**
 * Calculate protocol progress percentage
 */
export function calculateProtocolProgress(runId: string): number {
  const run = dataset.protocolRuns.find(r => r.id === runId);
  if (!run) return 0;

  const protocol = getProtocolById(run.protocolId);
  if (!protocol) return 0;

  const totalTasks = protocol.steps.reduce(
    (acc, step) => acc + step.tasks.filter(t => t.isRequired).length,
    0
  );

  if (totalTasks === 0) return 100;

  const completedRequired = run.completedTasks.length;
  return Math.round((completedRequired / totalTasks) * 100);
}

// ============================================================================
// Reference Helpers
// ============================================================================

/**
 * Get reference by ID
 */
export function getReferenceById(id: string) {
  return dataset.references.find(r => r.id === id);
}

/**
 * Get references by topic
 */
export function getReferencesByTopic(topic: string) {
  return dataset.references.filter(r => r.topics.includes(topic));
}

// ============================================================================
// Stats Helpers
// ============================================================================

/**
 * Get summary statistics for the dataset
 */
export function getDatasetStats() {
  const totalDays = 30;
  const recordedDays = dataset.checkins.length;
  const gapDays = totalDays - recordedDays;
  const completionRate = Math.round((recordedDays / totalDays) * 100);

  return {
    totalDays,
    recordedDays,
    gapDays,
    completionRate,
    avgMood: calculateAverageMood(dataset.checkins),
    avgEnergy: calculateAverageEnergy(dataset.checkins),
    avgSleep: calculateAverageSleep(dataset.checkins),
    totalReadings: dataset.readings.length,
    unreadReadings: getUnreadReadings().length,
    totalProtocols: dataset.protocols.length,
    activeRuns: getActiveProtocolRuns().length,
    journalEntries: dataset.journals.length,
  };
}
