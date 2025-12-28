'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface JournalViewerProps {
  content: string;
  onEdit: () => void;
}

export function JournalViewer({ content, onEdit }: JournalViewerProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm text-foreground whitespace-pre-wrap">{content}</p>
      </CardContent>

      <CardFooter className="border-t pt-4">
        <Button variant="ghost" size="sm" onClick={onEdit}>
          Editar
        </Button>
      </CardFooter>
    </Card>
  );
}
