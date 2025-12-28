import { NextRequest } from 'next/server';
import { dataset } from '@/server/mocks';
import { ok, fail, notFound, forcedError } from '@/app/api/_utils/response';
import {
  parseQueryDelayError,
  applyDelay,
  isValidDateISO,
} from '@/app/api/_utils/query';
import {
  getCheckinOverride,
  setCheckinOverride,
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

  const checkin = dataset.checkins.find(c => c.date === date);

  if (!checkin) {
    return notFound(`No check-in found for date: ${date}`);
  }

  // Apply any in-memory overrides
  const override = getCheckinOverride(date);
  const result = override ? { ...checkin, ...override } : checkin;

  return ok(result);
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

  // Find existing checkin or create base
  const existing = dataset.checkins.find(c => c.date === date);
  const existingOverride = getCheckinOverride(date);

  const now = new Date().toISOString();

  if (existing) {
    // Update existing
    const updates = {
      ...existingOverride,
      ...body,
      updatedAt: now,
    };
    setCheckinOverride(date, updates);

    return ok({ ...existing, ...updates });
  } else {
    // Create new (in memory only)
    const newCheckin = {
      id: `ci-new-${date}`,
      userId: dataset.user.id,
      date,
      createdAt: now,
      updatedAt: now,
      moodScore: 5,
      energyScore: 5,
      sleepQuality: 'fair' as const,
      symptoms: [],
      ...body,
    };
    setCheckinOverride(date, newCheckin);

    return ok(newCheckin);
  }
}
