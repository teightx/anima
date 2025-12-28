import { PageHeader, PageContainer } from '@/components/layout';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function HistoryPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Historico"
        description="Visualize sua jornada ao longo do tempo"
      />

      {/* Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Em desenvolvimento</CardTitle>
          <CardDescription>
            Esta secao exibira graficos e registros historicos de seus dados.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Chart Placeholder */}
      <Card className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-48 w-full" />
        </div>
      </Card>

      {/* Records List Placeholder */}
      <Card className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-4 w-32" />
          <div className="space-y-3">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
      </Card>
    </PageContainer>
  );
}
