import { PageHeader, PageContainer } from '@/components/layout';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProtocolsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Protocolos"
        description="Tratamentos e acompanhamentos ativos"
      />

      {/* Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Em desenvolvimento</CardTitle>
          <CardDescription>
            Esta secao permitira gerenciar protocolos de tratamento e
            medicacoes.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Active Protocols Placeholder */}
      <Card className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-4 w-36" />
          <div className="space-y-3">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </Card>

      {/* Schedule Placeholder */}
      <Card className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-4 w-28" />
          <div className="grid gap-3 sm:grid-cols-2">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
      </Card>
    </PageContainer>
  );
}
