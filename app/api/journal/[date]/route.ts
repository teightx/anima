import { NextRequest } from 'next/server';
import { dataset } from '@/server/mocks';
import type { JournalEntry } from '@/server/contracts';
import { ok, fail, notFound, forcedError } from '@/app/api/_utils/response';
import {
  parseQueryDelayError,
  applyDelay,
  isValidDateISO,
} from '@/app/api/_utils/query';
import {
  getJournalOverride,
  setJournalOverride,
} from '@/app/api/_utils/memory';

interface RouteContext {
  params: Promise<{ date: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  const { shouldError } = parseQueryDelayError(request);

  await applyDelay(request);

  if (shouldError) {
    return forcedError();
  }

  const { date } = await context.params;

  if (!isValidDateISO(date)) {
    return fail('Invalid date format. Use YYYY-MM-DD', 'INVALID_DATE', 400);
  }

  // Check memory first
  const override = getJournalOverride(date);
  if (override) {
    return ok(override);
  }

  // Find in dataset by date (match createdAt date)
  const entry = dataset.journals.find(j => j.createdAt.startsWith(date));

  if (!entry) {
    return notFound(`No journal entry found for date: ${date}`);
  }

  return ok(entry);
}

export async function POST(request: NextRequest, context: RouteContext) {
  const { shouldError } = parseQueryDelayError(request);

  await applyDelay(request);

  if (shouldError) {
    return forcedError();
  }

  const { date } = await context.params;

  if (!isValidDateISO(date)) {
    return fail('Invalid date format. Use YYYY-MM-DD', 'INVALID_DATE', 400);
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail('Invalid JSON body', 'INVALID_BODY', 400);
  }

  if (!body.content || typeof body.content !== 'string') {
    return fail('Content is required', 'MISSING_CONTENT', 400);
  }

  const now = new Date().toISOString();

  const entry: JournalEntry = {
    id: `je-new-${date}`,
    userId: dataset.user.id,
    type: (body.type as JournalEntry['type']) || 'free_write',
    createdAt: now,
    updatedAt: now,
    content: body.content as string,
    title: body.title as string | undefined,
    mood: body.mood as number | undefined,
    tags: body.tags as string[] | undefined,
    isPrivate: body.isPrivate !== false,
  };

  setJournalOverride(date, entry);

  return ok(entry);
}
