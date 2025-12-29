'use client';

import {
  QuietCard,
  QuietCardHeader,
  QuietCardTitle,
  QuietCardDescription,
  QuietCardContent,
  MetaRow,
  MetaRowGroup,
} from '@/components/system';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Protocol, ProtocolRun } from '../types';
import {
  formatCategory,
  formatDuration,
  countTotalTasks,
  getProgressPercentage,
  formatProgress,
} from '../helpers';

interface ProtocolCardProps {
  protocol: Protocol;
  activeRun: ProtocolRun | null;
  onSelect: () => void;
}

export function ProtocolCard({
  protocol,
  activeRun,
  onSelect,
}: ProtocolCardProps) {
  const isActive = !!activeRun;
  const totalTasks = countTotalTasks(protocol);
  const completedTasks = activeRun?.completedTasks.length || 0;
  const progress = getProgressPercentage(protocol, activeRun);

  return (
    <QuietCard
      interactive
      padding="none"
      className="cursor-pointer"
      onClick={onSelect}
    >
      <QuietCardHeader className="p-5 pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-2">
            <QuietCardTitle>{protocol.name}</QuietCardTitle>
            <MetaRowGroup separator={false}>
              <Badge variant="muted">{formatCategory(protocol.category)}</Badge>
              <MetaRow label="" value={formatDuration(protocol.durationDays)} />
            </MetaRowGroup>
          </div>
          {isActive && (
            <Badge variant="outline" className="shrink-0">
              Em andamento
            </Badge>
          )}
        </div>
      </QuietCardHeader>
      <QuietCardContent className="px-5 pb-5 space-y-3">
        <QuietCardDescription className="line-clamp-2">
          {protocol.description}
        </QuietCardDescription>

        {isActive ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-body-sm">
              <span className="text-text-muted">Progresso</span>
              <span className="font-medium tabular-nums">
                {formatProgress(completedTasks, totalTasks)}
              </span>
            </div>
            <div className="h-1 w-full rounded-full bg-surface-2">
              <div
                className="h-full rounded-full bg-primary/50 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <Button variant="ghost" size="sm" className="w-full">
              Continuar
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-caption text-text-muted">
              {totalTasks} passos
            </span>
            <Button variant="ghost" size="sm">
              Ver detalhes
            </Button>
          </div>
        )}
      </QuietCardContent>
    </QuietCard>
  );
}
