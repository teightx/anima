import { NextRequest } from 'next/server';
import { dataset } from '@/server/mocks';
import { ok, forcedError } from '@/app/api/_utils/response';
import { parseQueryDelayError, applyDelay } from '@/app/api/_utils/query';

export async function GET(request: NextRequest) {
  const { shouldError } = parseQueryDelayError(request);

  await applyDelay(request);

  if (shouldError) {
    return forcedError();
  }

  return ok(dataset.user);
}
