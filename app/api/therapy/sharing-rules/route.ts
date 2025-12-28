import { NextRequest } from 'next/server';
import type {
  SharingRule,
  DataCategory,
  SharingLevel,
} from '@/server/contracts';
import { dataset } from '@/server/mocks';
import { ok, fail, forcedError } from '@/app/api/_utils/response';
import { parseQueryDelayError, applyDelay } from '@/app/api/_utils/query';
import { addSharingRule, getSharingRules } from '@/app/api/_utils/memory';

export async function GET(request: NextRequest) {
  const { shouldError } = parseQueryDelayError(request);

  await applyDelay(request);

  if (shouldError) {
    return forcedError();
  }

  return ok(getSharingRules());
}

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

  // Validate required fields
  if (!body.recipientId || typeof body.recipientId !== 'string') {
    return fail('recipientId is required', 'MISSING_RECIPIENT_ID', 400);
  }

  if (!body.categories || typeof body.categories !== 'object') {
    return fail('categories is required', 'MISSING_CATEGORIES', 400);
  }

  const now = new Date().toISOString();

  const rule: SharingRule = {
    id: `sr-${Date.now()}`,
    userId: dataset.user.id,
    recipientId: body.recipientId as string,
    categories: body.categories as Record<DataCategory, SharingLevel>,
    validFrom: now,
    validUntil: (body.validUntil as string) || null,
    isActive: true,
    createdAt: now,
    updatedAt: now,
  };

  addSharingRule(rule);

  return ok(rule);
}
