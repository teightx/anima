import { NextRequest } from 'next/server';
import { dataset } from '@/server/mocks';
import { ok, forcedError } from '@/app/api/_utils/response';
import { parseQueryDelayError, applyDelay } from '@/app/api/_utils/query';
import { isTherapyEnabled, getSharingRules } from '@/app/api/_utils/memory';

export async function GET(request: NextRequest) {
  const { shouldError } = parseQueryDelayError(request);

  await applyDelay(request);

  if (shouldError) {
    return forcedError();
  }

  const enabled = isTherapyEnabled() || dataset.therapy.enabled;
  const sharingRules = getSharingRules();

  return ok({
    enabled,
    currentMode: dataset.therapy.currentMode,
    sessions: dataset.therapy.sessions,
    sharingRules,
  });
}
