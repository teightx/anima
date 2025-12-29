'use client';

import {
  QuietCard,
  QuietCardContent,
  SectionHeader,
} from '@/components/system';

interface ReferenceSummaryProps {
  abstract: string | undefined;
}

export function ReferenceSummary({ abstract }: ReferenceSummaryProps) {
  if (!abstract) {
    return null;
  }

  return (
    <QuietCard>
      <SectionHeader title="O que diz o estudo" size="small" />
      <QuietCardContent>
        <div className="prose prose-sm text-text-secondary leading-relaxed">{abstract}</div>
      </QuietCardContent>
    </QuietCard>
  );
}
