import type { Reading, ReadingCategory } from '@/server/contracts';

// ============================================================================
// Re-exports
// ============================================================================

export type { Reading, ReadingCategory };

// ============================================================================
// Extended Reading with feedback
// ============================================================================

export type FeedbackAction = 'useful' | 'not_applicable' | 'hidden';

export interface ObservationWithFeedback extends Reading {
  feedback?: FeedbackAction;
}

// ============================================================================
// UI Types
// ============================================================================

export type ObservationTab = 'all' | 'sleep' | 'routine' | 'stability' | 'consistency';
export type PageState = 'loading' | 'loaded' | 'error';

// ============================================================================
// Tab Configuration
// ============================================================================

export interface TabConfig {
  key: ObservationTab;
  label: string;
  categories: ReadingCategory[];
}

export const TAB_CONFIGS: TabConfig[] = [
  {
    key: 'all',
    label: 'Todas',
    categories: [],
  },
  {
    key: 'sleep',
    label: 'Sono',
    categories: ['sleep_correlation'],
  },
  {
    key: 'routine',
    label: 'Rotina',
    categories: ['activity_impact'],
  },
  {
    key: 'stability',
    label: 'Estabilidade',
    categories: ['mood_pattern', 'symptom_trend'],
  },
  {
    key: 'consistency',
    label: 'Consistência',
    categories: ['general_insight'],
  },
];

// ============================================================================
// Confidence/Severity Labels
// ============================================================================

export const CONFIDENCE_LABELS: Record<string, string> = {
  low: 'baixo',
  medium: 'médio',
  high: 'alto',
};

export const CATEGORY_LABELS: Record<ReadingCategory, string> = {
  mood_pattern: 'Humor',
  sleep_correlation: 'Sono',
  symptom_trend: 'Sintomas',
  medication_effect: 'Medicação',
  activity_impact: 'Atividade',
  general_insight: 'Geral',
};

