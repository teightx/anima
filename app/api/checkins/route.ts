import { NextRequest } from 'next/server';
import { dataset } from '@/server/mocks';
import { ok, forcedError } from '@/app/api/_utils/response';
import {
  parseQueryDelayError,
  applyDelay,
  parseDateRange,
} from '@/app/api/_utils/query';
import { getCheckinOverride } from '@/app/api/_utils/memory';

export async function GET(request: NextRequest) {
  const { shouldError } = parseQueryDelayError(request);

  await applyDelay(request);

  if (shouldError) {
    return forcedError();
  }

  const { start, end } = parseDateRange(request, 30);

  // Filter checkins by date range
  const checkins = dataset.checkins
    .filter(c => c.date >= start && c.date <= end)
    .map(c => {
      // Apply any in-memory overrides
      const override = getCheckinOverride(c.date);
      if (override) {
        return { ...c, ...override };
      }
      return c;
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  return ok(checkins, {
    total: checkins.length,
  });
}
