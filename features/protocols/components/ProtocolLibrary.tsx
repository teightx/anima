'use client';

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Nenhum protocolo disponivel</CardTitle>
          <CardDescription>
            Novos protocolos serao adicionados em breve.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Active protocols */}
      {activeProtocols.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground">
            Em andamento
          </h2>
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
          <h2 className="text-sm font-medium text-muted-foreground">
            Disponiveis
          </h2>
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
    </div>
  );
}

