// ============================================================================
// Application Date Helpers
// ============================================================================

/**
 * Default reference date for the mock dataset
 * Last day with data in the mock dataset
 */
export const DEFAULT_AS_OF = '2024-12-30';

/**
 * Get the reference date from search params
 * Falls back to DEFAULT_AS_OF if not provided or invalid
 */
export function getAsOfDate(
  searchParams?: Record<string, string | string[] | undefined>,
  fallback: string = DEFAULT_AS_OF
): string {
  if (!searchParams) return fallback;

  const asOf = searchParams.asOf;
  const value = Array.isArray(asOf) ? asOf[0] : asOf;

  if (!value) return fallback;

  // Validate format YYYY-MM-DD
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return fallback;
  }

  return value;
}

/**
 * Convert a Date object to ISO date string (YYYY-MM-DD)
 */
export function toISODate(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Parse an ISO date string to Date object
 */
export function parseISODate(dateStr: string): Date {
  return new Date(dateStr + 'T00:00:00');
}

/**
 * Format date for display (localized)
 */
export function formatDisplayDate(
  dateStr: string,
  locale: string = 'pt-BR'
): string {
  const date = parseISODate(dateStr);
  return date.toLocaleDateString(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}

/**
 * Get relative day description
 */
export function getRelativeDay(dateStr: string, asOf: string): string {
  if (dateStr === asOf) return 'Hoje';

  const date = parseISODate(dateStr);
  const ref = parseISODate(asOf);
  const diffDays = Math.round(
    (ref.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 1) return 'Ontem';
  if (diffDays === -1) return 'Amanha';
  if (diffDays > 0) return `${diffDays} dias atras`;
  return `Em ${Math.abs(diffDays)} dias`;
}
