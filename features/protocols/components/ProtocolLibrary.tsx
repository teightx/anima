'use client';

import {
  QuietCard,
  QuietCardHeader,
  QuietCardTitle,
  QuietCardDescription,
  SectionHeader,
  InlineNote,
} from '@/components/system';
import { EmptyState } from '@/components/feedback';
import type { Protocol, ProtocolRun } from '../types';
import { ProtocolCard } from './ProtocolCard';

interface ProtocolLibraryProps {
  protocols: Protocol[];
  runs: ProtocolRun[];
  onSelectProtocol: (protocol: Protocol, run: ProtocolRun | null) => void;
}

export function ProtocolLibrary({
  protocols,
  runs,
  onSelectProtocol,
}: ProtocolLibraryProps) {
  // Find active run for each protocol
  const getActiveRun = (protocolId: string): ProtocolRun | null => {
    return runs.find(r => r.protocolId === protocolId && r.status === 'active') || null;
  };

  // Separate protocols with active runs from inactive ones
  const activeProtocols = protocols.filter(p => getActiveRun(p.id));
  const availableProtocols = protocols.filter(p => !getActiveRun(p.id));

  if (protocols.length === 0) {
    return (
      <div className="page-stack">
        <EmptyState
          title="Nenhum plano ativo no momento"
          description="Planos são estruturas opcionais de organização."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Active protocols */}
      {activeProtocols.length > 0 && (
        <div className="space-y-3">
          <SectionHeader title="Em andamento" size="small" />
          <div className="grid gap-4 sm:grid-cols-2">
            {activeProtocols.map(protocol => (
              <ProtocolCard
                key={protocol.id}
                protocol={protocol}
                activeRun={getActiveRun(protocol.id)}
                onSelect={() =>
                  onSelectProtocol(protocol, getActiveRun(protocol.id))
                }
              />
            ))}
          </div>
        </div>
      )}

      {/* Available protocols */}
      {availableProtocols.length > 0 && (
        <div className="space-y-3">
          <SectionHeader title="Disponíveis" size="small" />
          <div className="grid gap-4 sm:grid-cols-2">
            {availableProtocols.map(protocol => (
              <ProtocolCard
                key={protocol.id}
                protocol={protocol}
                activeRun={null}
                onSelect={() => onSelectProtocol(protocol, null)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer obrigatório */}
      <InlineNote>
        Planos são estruturas opcionais de organização. Não constituem tratamento ou recomendação.
      </InlineNote>
    </div>
  );
}
