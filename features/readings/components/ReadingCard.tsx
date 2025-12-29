'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, ThumbsUp, EyeOff, X } from 'lucide-react';
import {
  QuietCard,
  QuietCardHeader,
  QuietCardTitle,
  QuietCardContent,
  FeedbackBar,
  FeedbackAction,
} from '@/components/system';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { ReadingWithFeedback, FeedbackAction as FeedbackActionType } from '../types';
import { ReadingMeta } from './ReadingMeta';

interface ReadingCardProps {
  reading: ReadingWithFeedback;
  asOf?: string;
  onFeedback: (readingId: string, action: FeedbackActionType) => Promise<boolean>;
}

export function ReadingCard({ reading, asOf, onFeedback }: ReadingCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [localFeedback, setLocalFeedback] = useState<FeedbackActionType | undefined>(
    reading.feedback
  );

  const isHidden = localFeedback === 'hidden';
  const isUseful = localFeedback === 'useful';
  const isNotApplicable = localFeedback === 'not_applicable';

  const handleFeedback = async (action: FeedbackActionType) => {
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
    <QuietCard
      padding="none"
      className={cn(
        'transition-opacity',
        isHidden && 'opacity-50'
      )}
    >
      <QuietCardHeader className="p-5 pb-3">
        <div className="flex items-start justify-between gap-4">
          <QuietCardTitle>{reading.title}</QuietCardTitle>
          {isHidden && (
            <Badge variant="secondary" className="shrink-0">
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
      </QuietCardHeader>

      <QuietCardContent className="px-5 space-y-4">
        {/* Summary - usa tipografia editorial */}
        <p className="prose-sm">{reading.summary}</p>

        {/* Detail (if available) */}
        {reading.detail && (
          <p className="text-body-sm text-text-muted border-l border-hairline pl-3">
            {reading.detail}
          </p>
        )}
      </QuietCardContent>

      {/* FeedbackBar */}
      <div className="px-5 pb-5">
        <FeedbackBar
          disabled={isUpdating}
          actions={
            <>
              <FeedbackAction
                icon={<ThumbsUp />}
                active={isUseful}
                onClick={() => handleFeedback('useful')}
                disabled={isUpdating || isUseful}
              >
                <span className="hidden sm:inline">Útil</span>
              </FeedbackAction>
              <FeedbackAction
                icon={<X />}
                active={isNotApplicable}
                onClick={() => handleFeedback('not_applicable')}
                disabled={isUpdating || isNotApplicable}
              >
                <span className="hidden sm:inline">Não se aplica</span>
              </FeedbackAction>
              <FeedbackAction
                icon={<EyeOff />}
                active={isHidden}
                onClick={() => handleFeedback('hidden')}
                disabled={isUpdating || isHidden}
              >
                <span className="hidden sm:inline">Arquivar</span>
              </FeedbackAction>
            </>
          }
          secondaryAction={
            referenceUrl && (
              <Link
                href={referenceUrl}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-body-sm font-medium text-text-muted hover:text-text-secondary transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Fonte
              </Link>
            )
          }
        />
      </div>
    </QuietCard>
  );
}
