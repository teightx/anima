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

  // Return summarized list (without abstract and keyFindings)
  const references = dataset.references.map(r => ({
    id: r.id,
    type: r.type,
    title: r.title,
    authors: r.authors,
    year: r.year,
    evidenceLevel: r.evidenceLevel,
    topics: r.topics,
  }));

  return ok(references, {
    total: references.length,
  });
}
