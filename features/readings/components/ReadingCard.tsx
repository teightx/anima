'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, ThumbsUp, EyeOff, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { ReadingWithFeedback, FeedbackAction } from '../types';
import { ReadingMeta } from './ReadingMeta';

interface ReadingCardProps {
  reading: ReadingWithFeedback;
  asOf?: string;
  onFeedback: (readingId: string, action: FeedbackAction) => Promise<boolean>;
}

export function ReadingCard({ reading, asOf, onFeedback }: ReadingCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [localFeedback, setLocalFeedback] = useState<FeedbackAction | undefined>(
    reading.feedback
  );

  const isHidden = localFeedback === 'hidden';
  const isUseful = localFeedback === 'useful';
  const isNotApplicable = localFeedback === 'not_applicable';

  const handleFeedback = async (action: FeedbackAction) => {
    // Optimistic update
    const previousFeedback = localFeedback;
    setLocalFeedback(action);
    setIsUpdating(true);

    const success = await onFeedback(reading.id, action);

    if (!success) {
      // Revert on failure
      setLocalFeedback(previousFeedback);
    }

    setIsUpdating(false);
  };

  // Build reference URL preserving asOf (only if reading has a referenceId)
  const referenceUrl = reading.referenceId
    ? `/references/${reading.referenceId}${asOf ? `?asOf=${asOf}` : ''}`
    : null;

  return (
    <Card
      className={cn(
        'transition-opacity',
        isHidden && 'opacity-50'
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-base font-medium leading-snug">
            {reading.title}
          </CardTitle>
          {isHidden && (
            <Badge variant="secondary" className="shrink-0 text-xs">
              Oculta
            </Badge>
          )}
        </div>
        <ReadingMeta
          category={reading.category}
          confidence={reading.confidence}
          periodStart={reading.periodStart}
          periodEnd={reading.periodEnd}
          dataPoints={reading.dataPointsAnalyzed}
        />
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Summary */}
        <p className="font-serif text-[0.9375rem] text-foreground/90 leading-relaxed">
          {reading.summary}
        </p>

        {/* Detail (if available) */}
        {reading.detail && (
          <p className="text-[0.8125rem] text-muted-foreground leading-relaxed border-l border-border/60 pl-3">
            {reading.detail}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          {/* Feedback buttons */}
          <div className="flex items-center gap-1.5">
            <Button
              variant={isUseful ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => handleFeedback('useful')}
              disabled={isUpdating || isUseful}
              className="h-7 gap-1.5 text-[0.75rem]"
            >
              <ThumbsUp className="h-3 w-3" />
              <span className="hidden sm:inline">Útil</span>
            </Button>
            <Button
              variant={isNotApplicable ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => handleFeedback('not_applicable')}
              disabled={isUpdating || isNotApplicable}
              className="h-7 gap-1.5 text-[0.75rem]"
            >
              <X className="h-3 w-3" />
              <span className="hidden sm:inline">Não se aplica</span>
            </Button>
            <Button
              variant={isHidden ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => handleFeedback('hidden')}
              disabled={isUpdating || isHidden}
              className="h-7 gap-1.5 text-[0.75rem]"
            >
              <EyeOff className="h-3 w-3" />
              <span className="hidden sm:inline">Arquivar</span>
            </Button>
          </div>

          {/* Source link */}
          {referenceUrl && (
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="h-8 gap-1.5 text-muted-foreground"
            >
              <Link href={referenceUrl}>
                <ExternalLink className="h-3.5 w-3.5" />
                Fonte
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

