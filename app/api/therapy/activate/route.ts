import { NextRequest } from 'next/server';
import { ok, fail, forcedError } from '@/app/api/_utils/response';
import { parseQueryDelayError, applyDelay } from '@/app/api/_utils/query';
import { setTherapyEnabled, isTherapyEnabled } from '@/app/api/_utils/memory';

export async function POST(request: NextRequest) {
  const { shouldError } = parseQueryDelayError(request);

  await applyDelay(request);

  if (shouldError) {
    return forcedError();
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail('Invalid JSON body', 'INVALID_BODY', 400);
  }

  const enabled = body.enabled;
  if (typeof enabled !== 'boolean') {
    return fail('enabled must be a boolean', 'INVALID_ENABLED', 400);
  }

  setTherapyEnabled(enabled);

  return ok({
    enabled: isTherapyEnabled(),
    activatedAt: enabled ? new Date().toISOString() : null,
  });
}
