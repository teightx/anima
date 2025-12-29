'use client';

import { User } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
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
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="text-base">Visualizacao do profissional</CardTitle>
          <CardDescription>
            Ative o modo terapia para configurar o que sera visivel para
            profissionais de saude.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Visualizacao do profissional</CardTitle>
        <CardDescription>
          Pre-visualizacao de como seus dados serao apresentados.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Professional placeholder */}
        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
            <User className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              Profissional vinculado
            </p>
            <p className="text-xs text-muted-foreground">
              Nenhum profissional vinculado ainda
            </p>
          </div>
        </div>

        {/* Shared data preview */}
        {sharedCategories.length > 0 ? (
          <div className="space-y-3">
            <p className="text-xs font-medium text-muted-foreground">
              Dados compartilhados
            </p>
            <div className="space-y-2">
              {sharedCategories.map(category => (
                <div
                  key={category.key}
                  className="rounded-lg border border-border/50 bg-muted/30 p-3"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-foreground">{category.title}</p>
                    <Badge variant="secondary" className="text-xs">
                      Resumo
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {getPreviewText(category.key)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-border p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Nenhuma categoria selecionada para compartilhamento
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function getPreviewText(category: DataCategory): string {
  switch (category) {
    case 'baseline':
      return 'Informacoes gerais de perfil e historico de saude';
    case 'check_ins':
      return 'Medias de humor, energia e sono ao longo do tempo';
    case 'journal_entries':
      return 'Temas recorrentes e tendencias identificadas';
    case 'readings':
      return 'Lista de leituras recebidas e interacoes';
    case 'protocols':
      return 'Protocolos em andamento e taxas de aderencia';
    case 'therapy_sessions':
      return 'Quantidade de sessoes e temas abordados';
    default:
      return 'Dados agregados desta categoria';
  }
}

