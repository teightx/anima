import { NextRequest } from 'next/server';
import { dataset } from '@/server/mocks';
import { ok, forcedError } from '@/app/api/_utils/response';
import {
  parseQueryDelayError,
  applyDelay,
  parseDateRange,
} from '@/app/api/_utils/query';
import { getReadingFeedback } from '@/app/api/_utils/memory';

export async function GET(request: NextRequest) {
  const { shouldError } = parseQueryDelayError(request);

  await applyDelay(request);

  if (shouldError) {
    return forcedError();
  }

  const { start, end } = parseDateRange(request, 30);

  // Filter readings by date range (based on createdAt)
  const readings = dataset.readings
    .filter(r => {
      const created = r.createdAt.split('T')[0];
      return created >= start && created <= end;
    })
    .map(r => {
      // Add feedback if exists
      const feedback = getReadingFeedback(r.id);
      if (feedback) {
        return { ...r, feedback };
      }
      return r;
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return ok(readings, {
    total: readings.length,
  });
}
