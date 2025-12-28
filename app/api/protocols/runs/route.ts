import { NextRequest } from 'next/server';
import { dataset } from '@/server/mocks';
import { ok, forcedError } from '@/app/api/_utils/response';
import { parseQueryDelayError, applyDelay } from '@/app/api/_utils/query';
import { getProtocolProgress } from '@/app/api/_utils/memory';

export async function GET(request: NextRequest) {
  const { shouldError } = parseQueryDelayError(request);

  await applyDelay(request);

  if (shouldError) {
    return forcedError();
  }

  // Return all runs with merged memory progress
  const runs = dataset.protocolRuns.map(run => {
    const memoryProgress = getProtocolProgress(run.id);

    if (memoryProgress.length > 0) {
      // Merge memory progress with existing completions
      const completedTasks = [
        ...run.completedTasks,
        ...memoryProgress
          .filter(taskId => !run.completedTasks.some(t => t.taskId === taskId))
          .map(taskId => ({
            taskId,
            completedAt: new Date().toISOString(),
          })),
      ];

      return { ...run, completedTasks };
    }

    return run;
  });

  return ok(runs, {
    total: runs.length,
  });
}
