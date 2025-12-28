// ============================================================================
// Mock Data - Central Export
// ============================================================================

export { dataset } from './dataset';
export type { Dataset } from './dataset';

export {
  // Check-in helpers
  getLastNDays,
  getCheckinByDate,
  getCheckinsByRange,
  getCheckinsByWeek,
  calculateAverageMood,
  calculateAverageEnergy,
  calculateAverageSleep,
  getGapDates,
  // Reading helpers
  getReadingsByRange,
  getReadingsByCategory,
  getUnreadReadings,
  getReadingById,
  getReferencesForReading,
  // Protocol helpers
  getActiveProtocolRuns,
  getProtocolById,
  calculateProtocolProgress,
  // Reference helpers
  getReferenceById,
  getReferencesByTopic,
  // Stats
  getDatasetStats,
} from './helpers';
