import { PageHeader, PageContainer } from '@/components/layout';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ReadingsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Leituras"
        description="Insights e analises do seu bem-estar"
      />

      {/* Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Em desenvolvimento</CardTitle>
          <CardDescription>
            Esta secao apresentara interpretacoes e padroes identificados nos
            seus dados.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Insights Grid Placeholder */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
          <div className="space-y-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-24" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-20" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-3">
            <Skeleton className="h-4 w-18" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-28" />
          </div>
        </Card>
      </div>

      {/* Detailed Reading Placeholder */}
      <Card className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-24 w-full" />
        </div>
      </Card>
    </PageContainer>
  );
}
