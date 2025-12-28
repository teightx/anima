import { NextRequest } from 'next/server';
import { dataset } from '@/server/mocks';
import { ok, fail, notFound, forcedError } from '@/app/api/_utils/response';
import { parseQueryDelayError, applyDelay } from '@/app/api/_utils/query';
import {
  addProtocolTaskCompletion,
  getProtocolProgress,
} from '@/app/api/_utils/memory';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, context: RouteContext) {
  const { shouldError } = parseQueryDelayError(request);

  await applyDelay(request);

  if (shouldError) {
    return forcedError();
  }

  const { id } = await context.params;

  // Find run
  const run = dataset.protocolRuns.find(r => r.id === id);
  if (!run) {
    return notFound(`Protocol run not found: ${id}`);
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail('Invalid JSON body', 'INVALID_BODY', 400);
  }

  const taskId = body.taskId as string;
  if (!taskId) {
    return fail('taskId is required', 'MISSING_TASK_ID', 400);
  }

  // Verify task exists in protocol
  const protocol = dataset.protocols.find(p => p.id === run.protocolId);
  if (!protocol) {
    return fail('Protocol not found for this run', 'PROTOCOL_NOT_FOUND', 500);
  }

  const taskExists = protocol.steps.some(step =>
    step.tasks.some(t => t.id === taskId)
  );
  if (!taskExists) {
    return fail(`Task not found in protocol: ${taskId}`, 'TASK_NOT_FOUND', 400);
  }

  // Add to memory
  addProtocolTaskCompletion(id, taskId);

  // Build response with updated progress
  const memoryProgress = getProtocolProgress(id);
  const completedTasks = [
    ...run.completedTasks,
    ...memoryProgress
      .filter(tid => !run.completedTasks.some(t => t.taskId === tid))
      .map(tid => ({
        taskId: tid,
        completedAt: new Date().toISOString(),
      })),
  ];

  return ok({
    runId: id,
    taskId,
    completedAt: new Date().toISOString(),
    totalCompleted: completedTasks.length,
  });
}
