import { NextRequest } from 'next/server';

/**
 * Sleep for a specified number of milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Parse common query parameters for delay and error simulation
 */
export function parseQueryDelayError(request: NextRequest): {
  delay: number;
  shouldError: boolean;
} {
  const searchParams = request.nextUrl.searchParams;

  const delayParam = searchParams.get('delay');
  const delay = delayParam
    ? Math.max(0, Math.min(10000, parseInt(delayParam, 10) || 0))
    : 0;

  const errorParam = searchParams.get('error');
  const shouldError = errorParam === '1' || errorParam === 'true';

  return { delay, shouldError };
}

/**
 * Apply delay if specified
 */
export async function applyDelay(request: NextRequest): Promise<void> {
  const { delay } = parseQueryDelayError(request);
  if (delay > 0) {
    await sleep(delay);
  }
}

/**
 * Parse date range from query parameters with defaults
 */
export function parseDateRange(
  request: NextRequest,
  defaultDays: number = 30
): { start: string; end: string } {
  const searchParams = request.nextUrl.searchParams;

  const today = new Date();
  const defaultEnd = today.toISOString().split('T')[0];

  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - defaultDays);
  const defaultStart = startDate.toISOString().split('T')[0];

  const start = searchParams.get('start') || defaultStart;
  const end = searchParams.get('end') || defaultEnd;

  return { start, end };
}

/**
 * Validate date format (YYYY-MM-DD)
 */
export function isValidDateISO(date: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
}

/**
 * Validate UUID format
 */
export function isValidUUID(id: string): boolean {
  // Accept both standard UUIDs and our mock format (prefix-XXXX-...)
  return /^[a-z0-9-]+$/.test(id) && id.length >= 8;
}
