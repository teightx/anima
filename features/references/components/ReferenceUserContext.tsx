'use client';

import {
  QuietCard,
  QuietCardContent,
  SectionHeader,
} from '@/components/system';

export function ReferenceUserContext() {
  return (
    <QuietCard>
      <SectionHeader title="Relação com seus registros" size="small" />
      <QuietCardContent>
        <p className="text-body-sm text-text-secondary leading-relaxed">
          Análise descritiva baseada nos dados registrados. Frequência, período e ocorrência dos padrões observados.
        </p>
      </QuietCardContent>
    </QuietCard>
  );
}
