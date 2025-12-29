'use client';

import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { ReferenceSource } from '../types';
import { formatReferenceType, formatAuthors, buildExternalUrl } from '../helpers';

interface ReferenceHeaderProps {
  reference: ReferenceSource;
  backHref: string;
}

export function ReferenceHeader({ reference, backHref }: ReferenceHeaderProps) {
  const externalUrl = buildExternalUrl(reference);

  return (
    <div className="space-y-4">
      {/* Back navigation */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" asChild className="-ml-2">
          <Link href={backHref}>
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
        </Button>

        {externalUrl && (
          <Button variant="outline" size="sm" asChild>
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
            >
              Ver fonte
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
        )}
      </div>

      {/* Title and metadata */}
      <div className="space-y-3">
        <h1 className="text-xl font-semibold leading-tight text-foreground">
          {reference.title}
        </h1>

        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>{formatAuthors(reference.authors)}</span>
          <span className="text-border">·</span>
          <span>{reference.year}</span>
          {reference.journal && (
            <>
              <span className="text-border">·</span>
              <span className="italic">{reference.journal}</span>
            </>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{formatReferenceType(reference.type)}</Badge>
          {reference.topics.slice(0, 3).map(topic => (
            <Badge key={topic} variant="outline" className="text-xs">
              {topic}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

