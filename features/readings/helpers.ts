import type { ReadingWithFeedback, ReadingTab, ReadingCategory, ReadingPeriod } from './types';
import { TAB_CONFIGS, CONFIDENCE_LABELS, CATEGORY_LABELS } from './types';

// ============================================================================
// Date Helpers
// ============================================================================

/**
 * Calculate date range based on period and asOf date
 */
export function calculateDateRange(
  asOf: string,
  period: ReadingPeriod
): { start: string; end: string } {
  const end = new Date(asOf);
  const daysBack = period === '7d' ? 7 : 30;
  const start = new Date(end);
  start.setDate(start.getDate() - daysBack);

  return {
    start: start.toISOString().split('T')[0],
    end: asOf,
  };
}

// ============================================================================
// Filter Helpers
// ============================================================================

/**
 * Filter readings by tab
 */
export function filterByTab(
  readings: ReadingWithFeedback[],
  tab: ReadingTab
): ReadingWithFeedback[] {
  if (tab === 'all') {
    return readings;
  }

  const config = TAB_CONFIGS.find(t => t.key === tab);
  if (!config || config.categories.length === 0) {
    return readings;
  }

  return readings.filter(r => config.categories.includes(r.category));
}

/**
 * Filter out hidden readings unless showHidden is true
 */
export function filterHidden(
  readings: ReadingWithFeedback[],
  showHidden: boolean
): ReadingWithFeedback[] {
  if (showHidden) {
    return readings;
  }
  return readings.filter(r => r.feedback !== 'hidden');
}

/**
 * Apply all filters
 */
export function applyFilters(
  readings: ReadingWithFeedback[],
  tab: ReadingTab,
  showHidden: boolean
): ReadingWithFeedback[] {
  let filtered = filterHidden(readings, showHidden);
  filtered = filterByTab(filtered, tab);
  return filtered;
}

// ============================================================================
// Format Helpers
// ============================================================================

/**
 * Format confidence level for display
 */
export function formatConfidence(confidence: string): string {
  return CONFIDENCE_LABELS[confidence] || confidence;
}

/**
 * Format category for display
 */
export function formatCategory(category: ReadingCategory): string {
  return CATEGORY_LABELS[category] || category;
}

/**
 * Format period range for display
 */
export function formatPeriodRange(start: string, end: string): string {
  const startDate = new Date(start);
  const endDate = new Date(end);
  
  const formatDate = (d: Date) => {
    return d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' });
  };
  
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

/**
 * Format data points analyzed
 */
export function formatDataPoints(count: number): string {
  return `${count} registro${count !== 1 ? 's' : ''}`;
}

// ============================================================================
// Count Helpers
// ============================================================================

/**
 * Count readings per tab
 */
export function countByTab(
  readings: ReadingWithFeedback[],
  showHidden: boolean
): Record<ReadingTab, number> {
  const visible = filterHidden(readings, showHidden);
  
  return {
    all: visible.length,
    sleep: visible.filter(r => r.category === 'sleep_correlation').length,
    stability: visible.filter(r => 
      r.category === 'mood_pattern' || r.category === 'symptom_trend'
    ).length,
    routine: visible.filter(r => r.category === 'activity_impact').length,
    consistency: visible.filter(r => r.category === 'general_insight').length,
  };
}

