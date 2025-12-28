import { NextResponse } from 'next/server';
import type { ApiSuccessResponse, ApiErrorResponse } from '@/server/contracts';

/**
 * Create a success response following ApiResponse<T> pattern
 */
export function ok<T>(
  data: T,
  meta?: ApiSuccessResponse<T>['meta']
): NextResponse<ApiSuccessResponse<T>> {
  const response: ApiSuccessResponse<T> = {
    success: true,
    data,
  };

  if (meta) {
    response.meta = meta;
  }

  return NextResponse.json(response, { status: 200 });
}

/**
 * Create an error response following ApiResponse pattern
 */
export function fail(
  message: string,
  code: string,
  status: number = 400,
  details?: Record<string, string[]>
): NextResponse<ApiErrorResponse> {
  const response: ApiErrorResponse = {
    success: false,
    error: {
      code,
      message,
    },
  };

  if (details) {
    response.error.details = details;
  }

  return NextResponse.json(response, { status });
}

/**
 * Create a 404 Not Found response
 */
export function notFound(
  message: string = 'Resource not found'
): NextResponse<ApiErrorResponse> {
  return fail(message, 'NOT_FOUND', 404);
}

/**
 * Create a forced error response (for testing)
 */
export function forcedError(): NextResponse<ApiErrorResponse> {
  return fail('Forced error', 'FORCED_ERROR', 500);
}

/**
 * Create a 500 Internal Server Error response
 */
export function serverError(
  message: string = 'Internal server error'
): NextResponse<ApiErrorResponse> {
  return fail(message, 'INTERNAL_ERROR', 500);
}
