import type { ObservationWithFeedback, ObservationTab, ReadingCategory } from './types';
import { TAB_CONFIGS, CONFIDENCE_LABELS } from './types';

// ============================================================================
// Filter Helpers
// ============================================================================

/**
 * Filter observations by tab
 */
export function filterByTab(
  observations: ObservationWithFeedback[],
  tab: ObservationTab
): ObservationWithFeedback[] {
  if (tab === 'all') {
    return observations;
  }

  const config = TAB_CONFIGS.find(t => t.key === tab);
  if (!config || config.categories.length === 0) {
    return observations;
  }

  return observations.filter(r => config.categories.includes(r.category));
}

/**
 * Filter out hidden observations unless showHidden is true
 */
export function filterHidden(
  observations: ObservationWithFeedback[],
  showHidden: boolean
): ObservationWithFeedback[] {
  if (showHidden) {
    return observations;
  }
  return observations.filter(r => r.feedback !== 'hidden');
}

/**
 * Apply all filters
 */
export function applyFilters(
  observations: ObservationWithFeedback[],
  tab: ObservationTab,
  showHidden: boolean
): ObservationWithFeedback[] {
  let filtered = filterHidden(observations, showHidden);
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
 * Count observations per tab
 */
export function countByTab(
  observations: ObservationWithFeedback[],
  showHidden: boolean
): Record<ObservationTab, number> {
  const visible = filterHidden(observations, showHidden);
  
  return {
    all: visible.length,
    sleep: visible.filter(r => r.category === 'sleep_correlation').length,
    routine: visible.filter(r => r.category === 'activity_impact').length,
    stability: visible.filter(r => 
      r.category === 'mood_pattern' || r.category === 'symptom_trend'
    ).length,
    consistency: visible.filter(r => r.category === 'general_insight').length,
  };
}

