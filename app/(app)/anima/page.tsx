import { PageHeader, PageContainer } from '@/components/layout';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ThemeToggle } from '@/components/theme';

export default function AnimaPage() {
  return (
    <PageContainer>
      <PageHeader title="Anima" description="Seu companheiro de jornada" />

      {/* Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Em desenvolvimento</CardTitle>
          <CardDescription>
            Esta secao oferecera interacoes personalizadas e suporte ao seu
            bem-estar.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Settings Section - Mobile Theme Toggle Access */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Configuracoes</CardTitle>
          <CardDescription>
            Ajustes de preferencias do aplicativo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium text-foreground">Tema</p>
              <p className="text-xs text-muted-foreground">
                Alterar aparencia do aplicativo
              </p>
            </div>
            <ThemeToggle />
          </div>
        </CardContent>
      </Card>

      {/* Companion Placeholder */}
      <Card className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-4 w-32" />
          <div className="flex items-start gap-4">
            <Skeleton className="h-12 w-12 rounded-full shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Actions Placeholder */}
      <Card className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-4 w-28" />
          <div className="grid gap-3 sm:grid-cols-2">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </Card>
    </PageContainer>
  );
}
