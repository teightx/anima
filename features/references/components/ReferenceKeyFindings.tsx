'use client';

import {
  QuietCard,
  QuietCardContent,
  SectionHeader,
} from '@/components/system';

interface ReferenceKeyFindingsProps {
  findings: string[];
}

export function ReferenceKeyFindings({ findings }: ReferenceKeyFindingsProps) {
  if (!findings || findings.length === 0) {
    return null;
  }

  return (
    <QuietCard>
      <SectionHeader title="Principais pontos" size="small" />
      <QuietCardContent>
        <ul className="space-y-2.5">
          {findings.map((finding, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-text-muted/40" />
              <span className="text-body-sm text-text-secondary leading-relaxed">{finding}</span>
            </li>
          ))}
        </ul>
      </QuietCardContent>
    </QuietCard>
  );
}
