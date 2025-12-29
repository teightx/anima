/**
 * Demo Mode — Ânima
 * 
 * Ativado por: ?demo=1
 * 
 * Comportamento:
 * - Força uso de dados seed
 * - Impede mutações destrutivas
 * - Mantém navegação completa
 * - Deixa claro que é ambiente de teste (discreto)
 */

// ============================================================================
// Client-side detection
// ============================================================================

/**
 * Check if demo mode is active from URL search params (client-side)
 */
export function isDemoMode(): boolean {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  return params.get('demo') === '1';
}

/**
 * Get demo query string to append to URLs
 */
export function getDemoQueryString(): string {
  return isDemoMode() ? '?demo=1' : '';
}

/**
 * Append demo param to a URL if in demo mode
 */
export function withDemoParam(url: string): string {
  if (!isDemoMode()) return url;
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}demo=1`;
}

// ============================================================================
// Server-side detection
// ============================================================================

/**
 * Check if demo mode is active from search params object (server-side)
 */
export function isDemoModeFromParams(params: { demo?: string } | undefined): boolean {
  return params?.demo === '1';
}

/**
 * Parse demo mode from request URL
 */
export function isDemoModeFromRequest(request: Request): boolean {
  const url = new URL(request.url);
  return url.searchParams.get('demo') === '1';
}

// ============================================================================
// Demo mode constants
// ============================================================================

export const DEMO_MODE = {
  /** Query param to activate demo mode */
  PARAM: 'demo',
  /** Value to activate demo mode */
  VALUE: '1',
  /** Full query string */
  QUERY: 'demo=1',
} as const;

