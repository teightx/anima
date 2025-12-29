import type { ApiSuccessResponse, ApiErrorResponse } from '@/server/contracts';

// ============================================================================
// API Client
// ============================================================================

export type ApiResult<T> =
  | { ok: true; data: T; meta?: ApiSuccessResponse<T>['meta'] }
  | { ok: false; error: ApiErrorResponse['error'] };

export interface FetchOptions {
  delay?: number;
  error?: boolean;
}

/**
 * Build URL with test params (delay/error)
 */
function applyTestParams(url: string, options?: FetchOptions): string {
  if (!options) return url;

  const hasQuery = url.includes('?');
  const params: string[] = [];

  if (options.delay && options.delay > 0) {
    params.push(`delay=${options.delay}`);
  }
  if (options.error) {
    params.push('error=1');
  }

  if (params.length === 0) return url;

  const separator = hasQuery ? '&' : '?';
  return `${url}${separator}${params.join('&')}`;
}

/**
 * GET request with typed response
 */
export async function getJSON<T>(
  url: string,
  options?: FetchOptions
): Promise<ApiResult<T>> {
  try {
    const finalUrl = applyTestParams(url, options);

    const response = await fetch(finalUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    const json = await response.json();

    if (json.success === true) {
      return {
        ok: true,
        data: json.data as T,
        meta: json.meta,
      };
    }

    return {
      ok: false,
      error: json.error || { code: 'UNKNOWN', message: 'Unknown error' },
    };
  } catch (err) {
    return {
      ok: false,
      error: {
        code: 'NETWORK_ERROR',
        message: err instanceof Error ? err.message : 'Network error',
      },
    };
  }
}

/**
 * POST request with typed response
 */
export async function postJSON<T>(
  url: string,
  body: Record<string, unknown>,
  options?: FetchOptions
): Promise<ApiResult<T>> {
  try {
    const finalUrl = applyTestParams(url, options);

    const response = await fetch(finalUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const json = await response.json();

    if (json.success === true) {
      return {
        ok: true,
        data: json.data as T,
        meta: json.meta,
      };
    }

    return {
      ok: false,
      error: json.error || { code: 'UNKNOWN', message: 'Unknown error' },
    };
  } catch (err) {
    return {
      ok: false,
      error: {
        code: 'NETWORK_ERROR',
        message: err instanceof Error ? err.message : 'Network error',
      },
    };
  }
}

/**
 * Build API URL with optional query params
 */
export function buildApiUrl(
  path: string,
  params?: Record<string, string | number | undefined>
): string {
  const base = path.startsWith('/') ? path : `/${path}`;

  if (!params) return base;

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.set(key, String(value));
    }
  });

  const query = searchParams.toString();
  return query ? `${base}?${query}` : base;
}

/**
 * Parse test options from URL search params
 */
export function parseTestOptions(
  searchParams?: Record<string, string | string[] | undefined>
): FetchOptions {
  if (!searchParams) return {};

  const delayParam = searchParams.delay;
  const delay = Array.isArray(delayParam) ? delayParam[0] : delayParam;

  const errorParam = searchParams.error;
  const error = Array.isArray(errorParam) ? errorParam[0] : errorParam;

  return {
    delay: delay ? parseInt(delay, 10) : undefined,
    error: error === '1' || error === 'true',
  };
}
