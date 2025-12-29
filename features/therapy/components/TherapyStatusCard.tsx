'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
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
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-base">Modo Terapia</CardTitle>
            <CardDescription>
              Quando ativo, permite configurar o compartilhamento de dados com
              profissionais de saude.
            </CardDescription>
          </div>
          <Badge variant={enabled ? 'default' : 'secondary'}>
            {enabled ? 'Ativo' : 'Inativo'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Button
          variant={enabled ? 'outline' : 'default'}
          onClick={onToggle}
          disabled={isUpdating}
          className="w-full sm:w-auto"
        >
          {isUpdating
            ? 'Atualizando...'
            : enabled
              ? 'Desativar'
              : 'Ativar modo terapia'}
        </Button>
      </CardContent>
    </Card>
  );
}

