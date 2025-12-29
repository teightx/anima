'use client';

import { Badge } from '@/components/ui/badge';
import { formatConfidence, formatCategory, formatPeriodRange, formatDataPoints } from '../helpers';
import type { ReadingCategory } from '../types';

interface ReadingMetaProps {
  category: ReadingCategory;
  confidence: string;
  periodStart: string;
  periodEnd: string;
  dataPoints: number;
}

export function ReadingMeta({
  category,
  confidence,
  periodStart,
  periodEnd,
  dataPoints,
}: ReadingMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
      <Badge variant="outline" className="text-xs font-normal">
        {formatCategory(category)}
      </Badge>
      <Badge
        variant="secondary"
        className="text-xs font-normal"
      >
        {formatConfidence(confidence)}
      </Badge>
      <span className="hidden sm:inline">·</span>
      <span className="hidden sm:inline">
        {formatPeriodRange(periodStart, periodEnd)}
      </span>
      <span className="hidden sm:inline">·</span>
      <span className="hidden sm:inline">
        {formatDataPoints(dataPoints)}
      </span>
    </div>
  );
}

