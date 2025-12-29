'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, ThumbsUp, X, EyeOff } from 'lucide-react';
import {
  QuietCard,
  QuietCardHeader,
  QuietCardTitle,
  QuietCardContent,
  QuietCardFooter,
  FeedbackBar,
  FeedbackAction,
  MetaRow,
  MetaRowGroup,
  InlineNote,
} from '@/components/system';
import { cn } from '@/lib/utils';
import type { ObservationWithFeedback, FeedbackAction as FeedbackActionType } from '../types';
import { formatConfidence, formatPeriodRange, formatDataPoints } from '../helpers';

interface ObservationCardProps {
  observation: ObservationWithFeedback;
  asOf?: string;
  onFeedback: (observationId: string, action: FeedbackActionType) => Promise<boolean>;
}

export function ObservationCard({ observation, asOf, onFeedback }: ObservationCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [localFeedback, setLocalFeedback] = useState<FeedbackActionType | undefined>(
    observation.feedback
  );

  const isHidden = localFeedback === 'hidden';
  const isUseful = localFeedback === 'useful';
  const isNotApplicable = localFeedback === 'not_applicable';

  const handleFeedback = async (action: FeedbackActionType) => {
    const previousFeedback = localFeedback;
    setLocalFeedback(action);
    setIsUpdating(true);

    const success = await onFeedback(observation.id, action);

    if (!success) {
      setLocalFeedback(previousFeedback);
    }

    setIsUpdating(false);
  };

  const referenceUrl = observation.referenceId
    ? `/references/${observation.referenceId}${asOf ? `?asOf=${asOf}` : ''}`
    : null;

  return (
    <QuietCard
      padding="none"
      className={cn('transition-opacity', isHidden && 'opacity-50')}
    >
      <QuietCardHeader className="p-5 pb-3">
        <QuietCardTitle>{observation.title}</QuietCardTitle>
        
        <MetaRowGroup className="mt-3">
          <MetaRow
            label="Período analisado"
            value={formatPeriodRange(observation.periodStart, observation.periodEnd)}
          />
          <MetaRow label="Nº de registros" value={formatDataPoints(observation.dataPointsAnalyzed)} />
          <MetaRow
            label="Grau de certeza"
            value={formatConfidence(observation.confidence)}
          />
        </MetaRowGroup>
      </QuietCardHeader>

      <QuietCardContent className="px-5">
        <p className="text-body-sm text-text-secondary leading-relaxed">
          {observation.summary}
        </p>
      </QuietCardContent>

      <QuietCardFooter className="px-5 pb-5">
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
                Útil
              </FeedbackAction>
              <FeedbackAction
                icon={<X />}
                active={isNotApplicable}
                onClick={() => handleFeedback('not_applicable')}
                disabled={isUpdating || isNotApplicable}
              >
                Não se aplica
              </FeedbackAction>
              <FeedbackAction
                icon={<EyeOff />}
                active={isHidden}
                onClick={() => handleFeedback('hidden')}
                disabled={isUpdating || isHidden}
              >
                Ocultar
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
      </QuietCardFooter>

      <div className="px-5 pb-5">
        <InlineNote size="small">
          Observação descritiva baseada em dados. Não implica causa.
        </InlineNote>
      </div>
    </QuietCard>
  );
}

