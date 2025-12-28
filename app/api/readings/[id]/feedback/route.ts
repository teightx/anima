import { NextRequest } from 'next/server';
import { dataset } from '@/server/mocks';
import { ok, fail, notFound, forcedError } from '@/app/api/_utils/response';
import { parseQueryDelayError, applyDelay } from '@/app/api/_utils/query';
import { setReadingFeedback } from '@/app/api/_utils/memory';

interface RouteContext {
  params: Promise<{ id: string }>;
}

const VALID_ACTIONS = ['useful', 'not_applicable', 'hidden'] as const;
type FeedbackAction = (typeof VALID_ACTIONS)[number];

export async function POST(request: NextRequest, context: RouteContext) {
  const { shouldError } = parseQueryDelayError(request);

  await applyDelay(request);

  if (shouldError) {
    return forcedError();
  }

  const { id } = await context.params;

  // Find reading
  const reading = dataset.readings.find(r => r.id === id);
  if (!reading) {
    return notFound(`Reading not found: ${id}`);
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail('Invalid JSON body', 'INVALID_BODY', 400);
  }

  const action = body.action as string;
  if (!action || !VALID_ACTIONS.includes(action as FeedbackAction)) {
    return fail(
      `Invalid action. Must be one of: ${VALID_ACTIONS.join(', ')}`,
      'INVALID_ACTION',
      400
    );
  }

  setReadingFeedback(id, action as FeedbackAction);

  return ok({
    readingId: id,
    action,
    updatedAt: new Date().toISOString(),
  });
}
