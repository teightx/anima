'use client';

import {
  QuietCard,
  QuietCardHeader,
  QuietCardTitle,
  QuietCardDescription,
  QuietCardContent,
  MetaRow,
} from '@/components/system';
import type { DataCategory } from '../types';
import { SHARING_CATEGORIES } from '../types';
import { SharingCategoryToggle } from './SharingCategoryToggle';

interface SharingRulesPanelProps {
  enabledCategories: Record<DataCategory, boolean>;
  onCategoryToggle: (category: DataCategory, enabled: boolean) => void;
  disabled?: boolean;
}

export function SharingRulesPanel({
  enabledCategories,
  onCategoryToggle,
  disabled,
}: SharingRulesPanelProps) {
  const handleToggle = (key: string, enabled: boolean) => {
    onCategoryToggle(key as DataCategory, enabled);
  };

  const sharedCount = Object.values(enabledCategories).filter(Boolean).length;

  return (
    <QuietCard padding="none">
      <QuietCardHeader className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <QuietCardTitle>Regras de compartilhamento</QuietCardTitle>
            <QuietCardDescription>
              Controle quais informações podem ser visualizadas por profissionais
              autorizados.
            </QuietCardDescription>
          </div>
          {sharedCount > 0 && (
            <MetaRow
              label=""
              value={`${sharedCount} de ${SHARING_CATEGORIES.length}`}
            />
          )}
        </div>
      </QuietCardHeader>
      <QuietCardContent className="px-5 pb-5">
        <div className="space-y-3">
          {SHARING_CATEGORIES.map(category => (
            <SharingCategoryToggle
              key={category.key}
              category={category}
              enabled={enabledCategories[category.key]}
              onToggle={handleToggle}
              disabled={disabled}
            />
          ))}
        </div>
      </QuietCardContent>
    </QuietCard>
  );
}
