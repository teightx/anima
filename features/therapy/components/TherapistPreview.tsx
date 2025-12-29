'use client';

import { User } from 'lucide-react';
import {
  QuietCard,
  QuietCardHeader,
  QuietCardTitle,
  QuietCardDescription,
  QuietCardContent,
  InlineNote,
} from '@/components/system';
import { Badge } from '@/components/ui/badge';
import type { DataCategory } from '../types';
import { SHARING_CATEGORIES } from '../types';

interface TherapistPreviewProps {
  enabledCategories: Record<DataCategory, boolean>;
  therapyEnabled: boolean;
}

export function TherapistPreview({
  enabledCategories,
  therapyEnabled,
}: TherapistPreviewProps) {
  const sharedCategories = SHARING_CATEGORIES.filter(
    cat => enabledCategories[cat.key]
  );

  if (!therapyEnabled) {
    return (
      <QuietCard className="border-dashed">
        <QuietCardHeader>
          <QuietCardTitle>Visualização do profissional</QuietCardTitle>
          <QuietCardDescription>
            Ative o compartilhamento para configurar quais dados serão visíveis.
          </QuietCardDescription>
        </QuietCardHeader>
      </QuietCard>
    );
  }

  return (
    <QuietCard>
      <QuietCardHeader>
        <QuietCardTitle>Visualização do profissional</QuietCardTitle>
        <QuietCardDescription>
          Pré-visualização de como seus dados serão apresentados.
        </QuietCardDescription>
      </QuietCardHeader>
      <QuietCardContent className="space-y-4">
        {/* Professional placeholder */}
        <div className="flex items-center gap-3 rounded-lg bg-surface-2 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface">
            <User className="h-5 w-5 text-text-muted" />
          </div>
          <div>
            <p className="text-body-sm font-medium text-text-primary">
              Profissional vinculado
            </p>
            <p className="text-caption text-text-muted">
              Nenhum profissional vinculado ainda
            </p>
          </div>
        </div>

        {/* Shared data preview */}
        {sharedCategories.length > 0 ? (
          <div className="space-y-3">
            <p className="text-caption font-medium text-text-muted">
              Dados compartilhados
            </p>
            <div className="space-y-2">
              {sharedCategories.map(category => (
                <div
                  key={category.key}
                  className="rounded-lg border border-hairline bg-surface-2/30 p-3"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-body-sm text-text-primary">
                      {category.title}
                    </p>
                    <Badge variant="secondary">Resumo</Badge>
                  </div>
                  <p className="mt-1 text-caption text-text-muted">
                    {getPreviewText(category.key)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <InlineNote hideIcon>
            Nenhuma categoria selecionada para compartilhamento
          </InlineNote>
        )}
      </QuietCardContent>
    </QuietCard>
  );
}

function getPreviewText(category: DataCategory): string {
  switch (category) {
    case 'baseline':
      return 'Informações gerais de perfil e histórico';
    case 'check_ins':
      return 'Médias de humor, energia e sono ao longo do tempo';
    case 'journal_entries':
      return 'Temas recorrentes e tendências identificadas';
    case 'readings':
      return 'Lista de observações recebidas e interações';
    case 'protocols':
      return 'Planos em andamento e taxas de aderência';
    case 'therapy_sessions':
      return 'Quantidade de sessões e temas abordados';
    default:
      return 'Dados agregados desta categoria';
  }
}
