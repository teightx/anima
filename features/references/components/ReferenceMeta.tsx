'use client';

import {
  QuietCard,
  QuietCardContent,
  MetaRow,
  MetaRowGroup,
  SectionHeader,
} from '@/components/system';
import type { ReferenceSource } from '../types';
import { formatEvidenceLevel, formatReferenceType } from '../helpers';

interface ReferenceMetaProps {
  reference: ReferenceSource;
}

export function ReferenceMeta({ reference }: ReferenceMetaProps) {
  return (
    <QuietCard>
      <SectionHeader title="Força da evidência" size="small" />
      <QuietCardContent>
        <MetaRowGroup direction="vertical" separator={false}>
          <MetaRow
            label="Tipo de estudo"
            value={formatReferenceType(reference.type)}
          />
          <MetaRow label="Ano" value={reference.year} />
          <MetaRow
            label="Nível de evidência"
            value={formatEvidenceLevel(reference.evidenceLevel)}
          />
          {reference.doi && (
            <MetaRow
              label="DOI"
              value={<span className="font-mono text-caption">{reference.doi}</span>}
            />
          )}
        </MetaRowGroup>
      </QuietCardContent>
    </QuietCard>
  );
}
