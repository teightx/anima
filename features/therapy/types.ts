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
    description: 'Informacoes iniciais e perfil de saude',
  },
  {
    key: 'check_ins',
    title: 'Check-ins diarios',
    description: 'Registros de humor, energia e sono',
  },
  {
    key: 'journal_entries',
    title: 'Diario',
    description: 'Anotacoes e reflexoes pessoais',
  },
  {
    key: 'readings',
    title: 'Leituras',
    description: 'Insights e analises recebidas',
  },
  {
    key: 'protocols',
    title: 'Protocolos',
    description: 'Progresso em protocolos ativos',
  },
  {
    key: 'therapy_sessions',
    title: 'Sessoes de apoio',
    description: 'Historico de conversas com o Anima',
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
  none: 'Nao compartilhar',
  summary: 'Resumo',
  detailed: 'Detalhado',
};

