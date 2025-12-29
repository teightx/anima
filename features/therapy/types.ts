import type {
  DataCategory,
  SharingLevel,
  SharingRule,
  TherapySession,
} from '@/server/contracts';

// ============================================================================
// Re-exports
// ============================================================================

export type { DataCategory, SharingLevel, SharingRule, TherapySession };

// ============================================================================
// Component Types
// ============================================================================

export type TherapyPageState = 'loading' | 'loaded' | 'error';

/**
 * Therapy state from API
 */
export interface TherapyState {
  enabled: boolean;
  currentMode: string | null;
  sessions: TherapySession[];
  sharingRules: SharingRule[];
}

/**
 * Sharing category display config
 */
export interface SharingCategoryConfig {
  key: DataCategory;
  title: string;
  description: string;
}

/**
 * All sharing categories with display info
 */
export const SHARING_CATEGORIES: SharingCategoryConfig[] = [
  {
    key: 'baseline',
    title: 'Baseline',
    description: 'Informações iniciais e perfil',
  },
  {
    key: 'check_ins',
    title: 'Check-ins diários',
    description: 'Registros de humor, energia e sono',
  },
  {
    key: 'journal_entries',
    title: 'Contexto do dia',
    description: 'Anotações e contexto pessoal',
  },
  {
    key: 'readings',
    title: 'Observações',
    description: 'Observações derivadas dos registros',
  },
  {
    key: 'protocols',
    title: 'Planos',
    description: 'Progresso em planos ativos',
  },
  {
    key: 'therapy_sessions',
    title: 'Sessões de apoio',
    description: 'Histórico de conversas com o Ânima',
  },
];

/**
 * Default sharing levels (all none)
 */
export const DEFAULT_SHARING_LEVELS: Record<DataCategory, SharingLevel> = {
  baseline: 'none',
  check_ins: 'none',
  journal_entries: 'none',
  readings: 'none',
  protocols: 'none',
  therapy_sessions: 'none',
};

/**
 * Sharing level display labels
 */
export const SHARING_LEVEL_LABELS: Record<SharingLevel, string> = {
  none: 'Não compartilhar',
  summary: 'Resumo',
  detailed: 'Detalhado',
};

