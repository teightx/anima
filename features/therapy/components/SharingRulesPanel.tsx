'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
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
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-base">Regras de compartilhamento</CardTitle>
            <CardDescription>
              Controle quais informacoes podem ser visualizadas por
              profissionais autorizados.
            </CardDescription>
          </div>
          {sharedCount > 0 && (
            <span className="text-xs text-muted-foreground">
              {sharedCount} de {SHARING_CATEGORIES.length}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}

