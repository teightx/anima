import type { ApiSuccessResponse, ApiErrorResponse } from '@/server/contracts';

// ============================================================================
// API Client
// ============================================================================

export type ApiResult<T> =
  | { ok: true; data: T; meta?: ApiSuccessResponse<T>['meta'] }
  | { ok: false; error: ApiErrorResponse['error'] };

/**
 * GET request with typed response
 */
export async function getJSON<T>(url: string): Promise<ApiResult<T>> {
  try {
    const response = await fetch(url, {
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
  body: Record<string, unknown>
): Promise<ApiResult<T>> {
  try {
    const response = await fetch(url, {
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
