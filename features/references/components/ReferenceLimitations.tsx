'use client';

import {
  QuietCard,
  QuietCardContent,
  SectionHeader,
} from '@/components/system';

interface ReferenceLimitationsProps {
  type: string;
  evidenceLevel: string;
}

/**
 * Generic limitations based on study type
 * In a real implementation, this would come from the API
 */
function getLimitations(type: string, evidenceLevel: string): string[] {
  const limitations: string[] = [];

  // Add type-based limitations
  switch (type) {
    case 'meta_analysis':
      limitations.push('Depende da qualidade dos estudos incluídos');
      limitations.push('Possível viés de publicação');
      break;
    case 'peer_reviewed':
      limitations.push('Resultados específicos para a população estudada');
      limitations.push('Requer replicação em outros contextos');
      break;
    case 'clinical_trial':
      limitations.push('Condições controladas podem diferir da prática');
      limitations.push('Tamanho amostral pode limitar generalização');
      break;
    case 'guideline':
      limitations.push('Recomendações gerais podem não se aplicar a todos os casos');
      break;
    case 'review_article':
      limitations.push('Não apresenta dados originais');
      limitations.push('Depende da literatura disponível na data de publicação');
      break;
    default:
      limitations.push('Considere o contexto original da pesquisa');
  }

  // Add evidence-level limitation
  if (evidenceLevel === 'low' || evidenceLevel === 'medium') {
    limitations.push('Nível de evidência requer interpretação cautelosa');
  }

  return limitations;
}

export function ReferenceLimitations({
  type,
  evidenceLevel,
}: ReferenceLimitationsProps) {
  const limitations = getLimitations(type, evidenceLevel);

  if (limitations.length === 0) {
    return null;
  }

  return (
    <QuietCard>
      <SectionHeader title="Limitações conhecidas" size="small" />
      <QuietCardContent>
        <ul className="space-y-2">
          {limitations.map((limitation, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-text-muted/30" />
              <span className="text-body-sm text-text-muted leading-relaxed">
                {limitation}
              </span>
            </li>
          ))}
        </ul>
      </QuietCardContent>
    </QuietCard>
  );
}
