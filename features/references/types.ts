import type { ReferenceSource, ReferenceType } from '@/server/contracts';

// ============================================================================
// Reference Display Types
// ============================================================================

export type { ReferenceSource, ReferenceType };

/**
 * Reference type display labels
 */
export const REFERENCE_TYPE_LABELS: Record<ReferenceType, string> = {
  peer_reviewed: 'Artigo revisado por pares',
  meta_analysis: 'Meta-analise',
  clinical_trial: 'Ensaio clinico',
  review_article: 'Artigo de revisao',
  guideline: 'Diretriz clinica',
  book_chapter: 'Capitulo de livro',
};

/**
 * Evidence level display labels
 */
export const EVIDENCE_LEVEL_LABELS: Record<string, string> = {
  high: 'Alta',
  medium: 'Media',
  low: 'Baixa',
};

/**
 * Page state for reference detail
 */
export type ReferencePageState = 'loading' | 'loaded' | 'error' | 'not_found';

