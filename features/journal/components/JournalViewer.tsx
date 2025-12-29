'use client';

import {
  QuietCard,
  QuietCardContent,
  QuietCardFooter,
} from '@/components/system';
import { Button } from '@/components/ui/button';

interface JournalViewerProps {
  content: string;
  onEdit: () => void;
}

export function JournalViewer({ content, onEdit }: JournalViewerProps) {
  return (
    <QuietCard padding="none">
      <QuietCardContent className="p-5">
        <p className="text-body-sm text-text-primary whitespace-pre-wrap leading-relaxed">
          {content}
        </p>
      </QuietCardContent>

      <QuietCardFooter className="border-t border-hairline px-5 py-4">
        <Button variant="ghost" size="sm" onClick={onEdit}>
          Editar
        </Button>
      </QuietCardFooter>
    </QuietCard>
  );
}
