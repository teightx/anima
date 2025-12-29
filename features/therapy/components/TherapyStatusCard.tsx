'use client';

import {
  QuietCard,
  QuietCardHeader,
  QuietCardTitle,
  QuietCardDescription,
  QuietCardContent,
} from '@/components/system';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface TherapyStatusCardProps {
  enabled: boolean;
  onToggle: () => void;
  isUpdating: boolean;
}

export function TherapyStatusCard({
  enabled,
  onToggle,
  isUpdating,
}: TherapyStatusCardProps) {
  return (
    <QuietCard padding="none">
      <QuietCardHeader className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <QuietCardTitle>Compartilhar com profissional</QuietCardTitle>
            <QuietCardDescription>
              Configure quais dados serão visíveis para profissionais de saúde.
            </QuietCardDescription>
          </div>
          <Badge variant={enabled ? 'default' : 'secondary'}>
            {enabled ? 'Ativo' : 'Inativo'}
          </Badge>
        </div>
      </QuietCardHeader>
      <QuietCardContent className="px-5 pb-5">
        <Button
          variant={enabled ? 'outline' : 'default'}
          onClick={onToggle}
          disabled={isUpdating}
          className="w-full sm:w-auto"
        >
          {isUpdating
            ? 'Atualizando...'
            : enabled
              ? 'Desativar compartilhamento'
              : 'Ativar compartilhamento'}
        </Button>
      </QuietCardContent>
    </QuietCard>
  );
}
