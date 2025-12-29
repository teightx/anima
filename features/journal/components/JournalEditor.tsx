'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  QuietCard,
  QuietCardContent,
  QuietCardFooter,
} from '@/components/system';

interface JournalEditorProps {
  initialContent?: string;
  isSubmitting: boolean;
  error: string | null;
  onSave: (content: string) => void;
  onCancel?: () => void;
}

export function JournalEditor({
  initialContent = '',
  isSubmitting,
  error,
  onSave,
  onCancel,
}: JournalEditorProps) {
  const [content, setContent] = useState(initialContent);

  const handleSubmit = () => {
    if (content.trim()) {
      onSave(content.trim());
    }
  };

  const hasChanges = content.trim() !== initialContent.trim();
  const canSave = content.trim().length > 0 && hasChanges && !isSubmitting;

  return (
    <QuietCard padding="none">
      <QuietCardContent className="p-5">
        <div className="space-y-3">
          <label htmlFor="journal-content" className="sr-only">
            Anotação do dia
          </label>
          <textarea
            id="journal-content"
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Se quiser, registre algo que não aparece nos números."
            rows={5}
            disabled={isSubmitting}
            className="w-full px-3 py-2 text-body-sm border border-border bg-surface rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring/40 disabled:opacity-50"
            aria-describedby={error ? 'journal-error' : undefined}
          />

          {error && (
            <p
              id="journal-error"
              className="text-body-sm text-danger"
              role="alert"
            >
              {error}
            </p>
          )}
        </div>
      </QuietCardContent>

      <QuietCardFooter className="flex justify-between border-t border-hairline px-5 py-4">
        {onCancel ? (
          <Button variant="ghost" onClick={onCancel} disabled={isSubmitting}>
            Cancelar
          </Button>
        ) : (
          <div />
        )}

        <Button onClick={handleSubmit} disabled={!canSave}>
          {isSubmitting ? 'Salvando...' : 'Salvar anotação'}
        </Button>
      </QuietCardFooter>
    </QuietCard>
  );
}
