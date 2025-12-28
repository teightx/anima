import { NextRequest } from 'next/server';
import { dataset } from '@/server/mocks';
import { ok, notFound, forcedError } from '@/app/api/_utils/response';
import { parseQueryDelayError, applyDelay } from '@/app/api/_utils/query';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  const { shouldError } = parseQueryDelayError(request);

  await applyDelay(request);

  if (shouldError) {
    return forcedError();
  }

  const { id } = await context.params;

  const reference = dataset.references.find(r => r.id === id);

  if (!reference) {
    return notFound(`Reference not found: ${id}`);
  }

  return ok(reference);
}
