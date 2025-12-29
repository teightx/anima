'use client';

import { FileSearch } from 'lucide-react';
import { EmptyState } from '@/components/feedback';

interface EmptyReadingsProps {
  isFiltered?: boolean;
}

export function EmptyReadings({ isFiltered }: EmptyReadingsProps) {
  return (
    <EmptyState
      icon={<FileSearch className="h-5 w-5 text-muted-foreground" />}
      title={isFiltered ? 'Nenhuma leitura nesta categoria' : 'Nenhuma leitura neste periodo'}
      description={
        isFiltered
          ? 'Tente outra categoria ou ajuste o periodo de busca.'
          : 'Leituras serao geradas conforme voce registra dados. Continue fazendo seus check-ins.'
      }
    />
  );
}

