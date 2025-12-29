'use client';

import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MetaRowGroup, MetaRow } from '@/components/system';
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
        <h1 className="text-h1">{reference.title}</h1>

        <MetaRowGroup>
          <MetaRow label="" value={formatAuthors(reference.authors)} />
          <MetaRow label="" value={reference.year} />
          {reference.journal && (
            <MetaRow label="" value={<span className="font-serif italic">{reference.journal}</span>} />
          )}
        </MetaRowGroup>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{formatReferenceType(reference.type)}</Badge>
          {reference.topics.slice(0, 3).map(topic => (
            <Badge key={topic} variant="outline">
              {topic}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
