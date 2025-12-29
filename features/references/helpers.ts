import type { ReferenceSource, ReferenceType } from './types';
import { REFERENCE_TYPE_LABELS, EVIDENCE_LEVEL_LABELS } from './types';

// ============================================================================
// Reference Helpers
// ============================================================================

/**
 * Format reference type for display
 */
export function formatReferenceType(type: ReferenceType): string {
  return REFERENCE_TYPE_LABELS[type] || type;
}

/**
 * Format evidence level for display
 */
export function formatEvidenceLevel(level: string): string {
  return EVIDENCE_LEVEL_LABELS[level] || level;
}

/**
 * Format authors for display
 * - 1 author: "Walker, M."
 * - 2 authors: "Walker, M. e Chen, L."
 * - 3+ authors: "Walker, M., Chen, L. et al."
 */
export function formatAuthors(authors: string[]): string {
  if (authors.length === 0) return '';
  if (authors.length === 1) return authors[0];
  if (authors.length === 2) return `${authors[0]} e ${authors[1]}`;
  return `${authors[0]}, ${authors[1]} et al.`;
}

/**
 * Build external URL for reference
 */
export function buildExternalUrl(reference: ReferenceSource): string | null {
  if (reference.url) return reference.url;
  if (reference.doi) return `https://doi.org/${reference.doi}`;
  return null;
}

/**
 * Format citation for display
 */
export function formatCitation(reference: ReferenceSource): string {
  const parts: string[] = [];

  // Authors
  parts.push(formatAuthors(reference.authors));

  // Year
  parts.push(`(${reference.year})`);

  // Title
  parts.push(reference.title);

  // Journal
  if (reference.journal) {
    parts.push(reference.journal);
  }

  return parts.join('. ') + '.';
}

