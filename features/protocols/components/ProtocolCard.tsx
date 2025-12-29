'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
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
    <Card
      className="cursor-pointer"
      onClick={onSelect}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1.5">
            <CardTitle className="text-[0.9375rem]">{protocol.name}</CardTitle>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="muted" className="text-[0.6875rem]">
                {formatCategory(protocol.category)}
              </Badge>
              <span className="text-[0.6875rem] text-muted-foreground/70">
                {formatDuration(protocol.durationDays)}
              </span>
            </div>
          </div>
          {isActive && (
            <Badge variant="outline" className="shrink-0 text-[0.6875rem]">
              Em andamento
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <CardDescription className="line-clamp-2 text-[0.8125rem]">
          {protocol.description}
        </CardDescription>

        {isActive ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[0.8125rem]">
              <span className="text-muted-foreground">Progresso</span>
              <span className="font-medium tabular-nums">
                {formatProgress(completedTasks, totalTasks)}
              </span>
            </div>
            <div className="h-1 w-full rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary/50 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <Button variant="ghost" size="sm" className="w-full text-[0.8125rem]">
              Continuar
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-[0.75rem] text-muted-foreground/70">
              {totalTasks} etapas
            </span>
            <Button variant="ghost" size="sm" className="text-[0.8125rem]">
              Ver detalhes
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

