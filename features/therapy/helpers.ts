import type { DataCategory, SharingLevel, SharingRule } from './types';
import { SHARING_LEVEL_LABELS, DEFAULT_SHARING_LEVELS } from './types';

// ============================================================================
// Helpers
// ============================================================================

/**
 * Format sharing level for display
 */
export function formatSharingLevel(level: SharingLevel): string {
  return SHARING_LEVEL_LABELS[level] || level;
}

/**
 * Check if a category is being shared
 */
export function isCategoryShared(
  rules: SharingRule[],
  category: DataCategory
): boolean {
  for (const rule of rules) {
    if (rule.isActive && rule.categories[category] !== 'none') {
      return true;
    }
  }
  return false;
}

/**
 * Get sharing level for a category from rules
 */
export function getCategoryLevel(
  rules: SharingRule[],
  category: DataCategory
): SharingLevel {
  for (const rule of rules) {
    if (rule.isActive && rule.categories[category]) {
      return rule.categories[category];
    }
  }
  return 'none';
}

/**
 * Build categories record from sharing state
 */
export function buildCategoriesFromState(
  enabledCategories: Record<DataCategory, boolean>
): Record<DataCategory, SharingLevel> {
  const categories = { ...DEFAULT_SHARING_LEVELS };

  for (const [key, enabled] of Object.entries(enabledCategories)) {
    categories[key as DataCategory] = enabled ? 'summary' : 'none';
  }

  return categories;
}

/**
 * Extract enabled categories from rules
 */
export function getEnabledCategoriesFromRules(
  rules: SharingRule[]
): Record<DataCategory, boolean> {
  const enabled: Record<DataCategory, boolean> = {
    baseline: false,
    check_ins: false,
    journal_entries: false,
    readings: false,
    protocols: false,
    therapy_sessions: false,
  };

  for (const rule of rules) {
    if (rule.isActive) {
      for (const [key, level] of Object.entries(rule.categories)) {
        if (level !== 'none') {
          enabled[key as DataCategory] = true;
        }
      }
    }
  }

  return enabled;
}

/**
 * Count shared categories
 */
export function countSharedCategories(
  rules: SharingRule[]
): number {
  const enabled = getEnabledCategoriesFromRules(rules);
  return Object.values(enabled).filter(Boolean).length;
}

