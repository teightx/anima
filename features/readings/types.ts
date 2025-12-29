import type { Reading, ReadingCategory } from '@/server/contracts';

// ============================================================================
// Re-exports
// ============================================================================

export type { Reading, ReadingCategory };

// ============================================================================
// Extended Reading with feedback
// ============================================================================

export type FeedbackAction = 'useful' | 'not_applicable' | 'hidden';

export interface ReadingWithFeedback extends Reading {
  feedback?: FeedbackAction;
}

// ============================================================================
// UI Types
// ============================================================================

export type ReadingTab = 'all' | 'sleep' | 'stability' | 'routine' | 'consistency';
export type ReadingPeriod = '7d' | '30d';
export type PageState = 'loading' | 'loaded' | 'error';

// ============================================================================
// Tab Configuration
// ============================================================================

export interface TabConfig {
  key: ReadingTab;
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
    key: 'stability',
    label: 'Estabilidade',
    categories: ['mood_pattern', 'symptom_trend'],
  },
  {
    key: 'routine',
    label: 'Rotina',
    categories: ['activity_impact'],
  },
  {
    key: 'consistency',
    label: 'Consistencia',
    categories: ['general_insight'],
  },
];

// ============================================================================
// Confidence/Severity Labels
// ============================================================================

export const CONFIDENCE_LABELS: Record<string, string> = {
  low: 'Baixa',
  medium: 'Media',
  high: 'Alta',
};

export const CATEGORY_LABELS: Record<ReadingCategory, string> = {
  mood_pattern: 'Humor',
  sleep_correlation: 'Sono',
  symptom_trend: 'Sintomas',
  medication_effect: 'Medicacao',
  activity_impact: 'Atividade',
  general_insight: 'Geral',
};

